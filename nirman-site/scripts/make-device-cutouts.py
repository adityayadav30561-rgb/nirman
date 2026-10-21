"""Cut real device photos out of their backgrounds.

Run: python scripts/make-device-cutouts.py  (needs Pillow and numpy)

Reads the original downloads in design-assets/raw and writes transparent
WebP cutouts to public/assets/devices, printing each screen rectangle in
cutout pixel coordinates.
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "design-assets" / "raw"
OUT = ROOT / "public" / "assets" / "devices"
OUT.mkdir(parents=True, exist_ok=True)
meta = {}


def phone(src, name, screen):
    """Flood the background from the corners; the dark frame stops the fill."""
    im = Image.open(RAW / src).convert("RGB")
    lum = im.convert("L")
    w, h = im.size
    # 255 = could be background (bright or shadow), 0 = dark phone frame
    bin_ = lum.point(lambda v: 255 if v > 95 else 0)
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(bin_, corner, 128, thresh=0)
    mask = np.asarray(bin_) != 128
    ys, xs = np.where(mask)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    alpha = Image.fromarray((mask * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.8))
    rgba = im.copy()
    rgba.putalpha(alpha)
    rgba = rgba.crop((x0, y0, x1, y1))
    rgba.save(OUT / f"{name}.webp", quality=92, method=6)
    sx0, sy0, sx1, sy1 = screen
    meta[name] = {
        "w": int(x1 - x0),
        "h": int(y1 - y0),
        "screen": [int(sx0 - x0), int(sy0 - y0), int(sx1 - sx0), int(sy1 - sy0)],
    }


def laptop():
    """Polygon mask: rounded lid plus the base traced row by row. The camera
    sits slightly right of centre, so the two sides of the base differ."""
    im = Image.open(RAW / "macbook-front.jpg").convert("RGB")
    w, h = im.size
    lid = (343, 124, 1468, 858)
    left = [(347, 858), (328, 905), (282, 945), (239, 1005), (197, 1065), (154, 1125), (112, 1185), (92, 1214), (104, 1236)]
    right = [(1598, 1236), (1617, 1214), (1614, 1190), (1573, 1100), (1533, 1010), (1496, 930), (1484, 905), (1470, 858)]
    s = 3  # supersample for clean edges
    m = Image.new("L", (w * s, h * s), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([lid[0] * s, lid[1] * s, lid[2] * s, (lid[3] + 6) * s], radius=22 * s, fill=255)
    d.polygon([(x * s, y * s) for x, y in left + right], fill=255)
    m = m.resize((w, h), Image.LANCZOS)
    rgba = im.copy()
    rgba.putalpha(m)
    box = (70, 110, 1745, 1246)
    rgba = rgba.crop(box)
    rgba.save(OUT / "macbook.webp", quality=92, method=6)
    screen = (374, 175, 1439, 826)
    meta["macbook"] = {
        "w": box[2] - box[0],
        "h": box[3] - box[1],
        "screen": [screen[0] - box[0], screen[1] - box[1], screen[2] - screen[0], screen[3] - screen[1]],
    }


phone("iphone-front.jpg", "iphone", (624, 151, 981, 930))
phone("iphone-front-alt.jpg", "iphone-alt", (610, 161, 978, 887))
laptop()

# Hero photo: keep the full photograph, recompressed for the web.
hero = Image.open(RAW / "hero-imac-desk.jpg").convert("RGB")
hero.save(OUT.parent / "hero-imac-desk.webp", quality=82, method=6)
meta["hero"] = {"w": hero.width, "h": hero.height, "imacGlass": [[485, 100], [1856, 109], [491, 928], [1846, 918]]}

print(json.dumps(meta, indent=1))
for f in sorted(OUT.parent.rglob("*.webp")):
    print(f.name, f.stat().st_size)


def punch_screen(name):
    """Flood the bright glass from the screen centre and make it transparent,
    so a UI can sit behind the real bezel, notch and rounded corners."""
    im = Image.open(OUT / f"{name}.webp").convert("RGBA")
    rgba = np.asarray(im).astype(float)
    lum = Image.fromarray((rgba[..., :3] @ [0.299, 0.587, 0.114]).clip(0, 255).astype("uint8"))
    x, y, w, h = meta[name]["screen"]
    bin_ = lum.point(lambda v: 255 if v > 150 else 0)
    ImageDraw.floodfill(bin_, (x + w // 2, y + h // 2), 128, thresh=0)
    glass = np.asarray(bin_) == 128
    ys, xs = np.where(glass)
    meta[name]["screen"] = [int(xs.min()), int(ys.min()), int(xs.max() - xs.min() + 1), int(ys.max() - ys.min() + 1)]
    # grow the glass by 2px and soften so anti-aliased rims blend into the UI
    g = Image.fromarray((glass * 255).astype("uint8")).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1))
    rgba[..., 3] *= 1 - np.asarray(g) / 255
    Image.fromarray(rgba.clip(0, 255).astype("uint8"), "RGBA").save(OUT / f"{name}.webp", quality=92, method=6)
    save_mask(name, g)


def save_mask(name, glass):
    """Alpha mask of the screen glass, the exact complement of the punched
    pixels, so the UI can be clipped to the real screen shape."""
    a = np.asarray(glass).astype("uint8")
    m = Image.new("LA", glass.size, (0, 0))
    m.putalpha(Image.fromarray(a))
    m.save(OUT / f"{name}-screen.png", optimize=True)


for n in ("iphone", "iphone-alt", "macbook"):
    punch_screen(n)
print(json.dumps({k: v["screen"] for k, v in meta.items() if "screen" in v}))

def imac():
    """iMac cut from the hero photo: glass and chin, plus the stand.
    The display (inside the black border) is made transparent."""
    im = Image.open(RAW / "hero-imac-desk.jpg").convert("RGB")
    w, h = im.size
    s = 3
    m = Image.new("L", (w * s, h * s), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([490 * s, 99 * s, 1846 * s, 1046 * s], radius=16 * s, fill=255)
    stand = [(1018, 1040), (1298, 1040), (1306, 1112), (1312, 1199), (1004, 1199), (1008, 1112)]
    d.polygon([(x * s, y * s) for x, y in stand], fill=255)
    # display area, slightly rotated in the photo
    display = [(512, 128), (1829, 135), (1820, 892), (517, 901)]
    d.polygon([(x * s, y * s) for x, y in display], fill=0)
    dm = Image.new("L", (w * s, h * s), 0)
    ImageDraw.Draw(dm).polygon([(x * s, y * s) for x, y in display], fill=255)
    dm = dm.resize((w, h), Image.LANCZOS)
    m = m.resize((w, h), Image.LANCZOS)
    rgba = im.copy()
    rgba.putalpha(m)
    box = (476, 90, 1859, 1210)
    rgba.crop(box).save(OUT / "imac.webp", quality=92, method=6)
    save_mask("imac", dm.crop(box))
    meta["imac"] = {
        "w": box[2] - box[0],
        "h": box[3] - box[1],
        "screen": [512 - box[0], 128 - box[1], 1829 - 512, 901 - 128],
    }


def laptop_alt():
    """Second MacBook, shot at desk height in a meeting room."""
    im = Image.open(RAW / "macbook-front-alt.jpg").convert("RGB")
    w, h = im.size
    s = 3
    m = Image.new("L", (w * s, h * s), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([555 * s, 371 * s, 1448 * s, 1044 * s], radius=16 * s, fill=255)
    base = [(542, 1040), (1461, 1040), (1497, 1064), (1492, 1075), (511, 1075), (506, 1064)]
    d.polygon([(x * s, y * s) for x, y in base], fill=255)
    m = m.resize((w, h), Image.LANCZOS)
    rgba = im.copy()
    rgba.putalpha(m)
    box = (500, 362, 1504, 1080)
    rgba.crop(box).save(OUT / "macbook-alt.webp", quality=92, method=6)
    meta["macbook-alt"] = {"w": box[2] - box[0], "h": box[3] - box[1], "screen": [1000 - box[0] - 300, 700 - box[1] - 200, 600, 400]}


imac()
laptop_alt()
punch_screen("macbook-alt")
print(json.dumps({k: [v["w"], v["h"], v["screen"]] for k, v in meta.items() if k in ("imac", "macbook-alt")}))
