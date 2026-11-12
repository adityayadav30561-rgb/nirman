"""Make the site's logo files from the user's logo (docs/sections/s6-brand-contact.md).

Usage (from the repo root):  python tools/brand/make-logo.py <logo on white background>

Writes nirman-site/public/images/brand/nirman-logo.png (black wordmark, for light
backgrounds), nirman-logo-light.png (white wordmark, stronger gold, for the ink
bands), and the browser icons nirman-site/src/app/icon.png, apple-icon.png and
favicon.ico (a round monogram: the logo's gold double ring with its "N").
The "N" crop box below fits the 1774 x 887 source of 2026-11-12; check it if the
source changes.
"""
import sys
import numpy as np
from PIL import Image, ImageDraw

SRC = sys.argv[1]
OUT = "nirman-site/public/images/brand/"
APP = "nirman-site/src/app/"
N_BOX = (395, 330, 600, 560)

src = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)
# colour to alpha against white: alpha from the darkest channel, colour un-premultiplied
a = np.clip((255 - src.min(axis=2)) / 255, 0, 1)
a = np.clip((a - 0.06) / 0.94, 0, 1)
safe = np.maximum(a, 1e-3)[..., None]
rgb = np.clip((src - (1 - safe) * 255) / safe, 0, 255)
logo = Image.fromarray(np.dstack([rgb, a * 255]).astype(np.uint8), "RGBA")
b = logo.getbbox()
logo = logo.crop((b[0] - 12, b[1] - 12, b[2] + 12, b[3] + 12))

arr = np.asarray(logo).astype(np.float32)
c = arr[..., :3]
sat = c.max(axis=2) - c.min(axis=2)
light = arr.copy()
light[..., :3][(c.max(axis=2) < 110) & (sat < 45)] = 255  # black wordmark to white
light[..., 3][sat >= 45] = np.clip(light[..., 3][sat >= 45] * 1.45, 0, 255)  # stronger gold
for img, name in ((logo, "nirman-logo.png"), (Image.fromarray(light.astype(np.uint8), "RGBA"), "nirman-logo-light.png")):
    img.resize((int(img.width * 330 / img.height), 330), Image.LANCZOS).save(OUT + name, optimize=True)

# monogram icon
n_alpha = np.where(src.max(axis=2) - src.min(axis=2) > 45, 0, a)
N = np.zeros((*a.shape, 4), np.uint8)
N[..., :3] = 18
N[..., 3] = (n_alpha * 255).astype(np.uint8)
n_img = Image.fromarray(N, "RGBA").crop(N_BOX)
n_img = n_img.crop(n_img.getbbox())


def icon(size, bg=True):
    s = size * 4
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    gold = (196, 145, 48, 255)
    if bg:
        d.ellipse((0, 0, s - 1, s - 1), fill=(255, 255, 255, 255))
    w1 = max(4, int(s * 0.035))
    d.ellipse((w1 * 1.2, w1 * 1.2, s - w1 * 1.2, s - w1 * 1.2), outline=gold, width=w1)
    inset = int(s * 0.12)
    d.ellipse((inset, inset, s - inset, s - inset), outline=gold, width=max(2, int(s * 0.018)))
    nh = int(s * 0.52)
    n = n_img.resize((int(n_img.width * nh / n_img.height), nh), Image.LANCZOS)
    im.alpha_composite(n, ((s - n.width) // 2 + int(s * 0.01), (s - n.height) // 2))
    return im.resize((size, size), Image.LANCZOS)


icon(512).save(APP + "icon.png", optimize=True)
icon(512).save(APP + "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
apple = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
apple.alpha_composite(icon(164), (8, 8))
apple.convert("RGB").save(APP + "apple-icon.png", optimize=True)
print("done")
