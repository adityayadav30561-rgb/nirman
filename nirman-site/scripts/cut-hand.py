"""Cut the hand out of the white-background photo and split it into layers.

back  = whole hand (and phone body), greyscale, transparent background
front = only skin pixels that lie over the phone (thumb/fingertips), so they
        can sit above the HTML phone screen
Prints the phone rectangle as percentages of the crop for CSS placement.
"""
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

src, out_dir = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.int16)
H, W, _ = a.shape
mn = a.min(axis=2)
mx = a.max(axis=2)

# background candidates: very light and nearly neutral
cand = (mn >= 238) & ((mx - mn) <= 10)

# flood fill from the borders through candidates
bg = np.zeros((H, W), bool)
q = deque()
for x in range(W):
    for y in (0, H - 1):
        if cand[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
for y in range(H):
    for x in (0, W - 1):
        if cand[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < H and 0 <= nx < W and cand[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True; q.append((ny, nx))

alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8))
# soften the edge: shrink 1px then blur
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))

# phone rectangle from the dark bezel
lum = a.mean(axis=2)
dark = lum < 60
ys, xs = np.where(dark[:1400])
px0, py0, px1, py1 = int(np.percentile(xs, 0.5)), int(ys.min()), int(np.percentile(xs, 99.5)), 1408

# Front layer: the photo's own right-hand bezel plus the fingertips over it.
# Per row, start just right of the photo's light screen and keep everything
# to the right (bezel, fingers). Rows 680 to 1300 cover the fingers; both cut
# lines fall on solid bezel, so they hide against the HTML phone's bezel.
FY0, FY1 = 680, 1300
front_mask = np.zeros((H, W), np.uint8)
ends = []
for y in range(FY0, FY1):
    row = lum[y, 1040:px1 + 40]
    light = np.where(row > 200)[0]
    # last light (screen) pixel left of the bezel
    screen_end = 1040 + int(light[light < (px1 - 1040 - 20)].max()) if len(light[light < (px1 - 1040 - 20)]) else px1 - 30
    ends.append(screen_end)
# The photo's screen edge is x~1097 on clean rows; start just right of it.
# The HTML phone's bezel is 4.8% of its width, so its screen ends at
# 1130 - 0.048 * 647 = 1099 and this strip always lands on bezel.
XS = 1099
front_mask[FY0:FY1, XS:] = 255
print("photo screen right edge, rows %d-%d: min %d max %d (phone right %d, width %d)" % (FY0, FY1, min(ends), max(ends), px1, px1 - px0))
print("our bezel must be >= %.2f%% of phone width" % (100 * (px1 - min(ends)) / (px1 - px0)))
front = Image.fromarray(front_mask).filter(ImageFilter.GaussianBlur(0.8))
front_np = np.minimum(np.asarray(front), np.asarray(alpha))
# report the photo's bezel thickness at a clean row
row = lum[640]
dk = np.where(row < 60)[0]
print("bezel right row640", dk.max() - (1040 + int(np.where(lum[640, 1040:1100] > 200)[0].max())))

# greyscale with a little contrast, like the reference illustration
grey = im.convert("L")
grey = grey.point(lambda v: max(0, min(255, int((v - 128) * 1.08 + 132))))
rgb = Image.merge("RGB", (grey, grey, grey))

# crop to content
amask = np.asarray(alpha) > 8
ys, xs = np.where(amask)
cx0, cy0, cx1, cy1 = xs.min(), ys.min(), xs.max() + 1, H
pad = 8
cx0, cy0, cx1 = max(0, cx0 - pad), max(0, cy0 - pad), min(W, cx1 + pad)

def save(alpha_np, name):
    img = rgb.copy()
    img.putalpha(Image.fromarray(alpha_np.astype(np.uint8)))
    img = img.crop((cx0, cy0, cx1, cy1))
    target_w = 960
    img = img.resize((target_w, round(img.height * target_w / img.width)), Image.LANCZOS)
    img.save(f"{out_dir}/{name}.webp", "WEBP", quality=82, method=6)
    return img.size

size = save(np.asarray(alpha), "hand-back")
save(front_np, "hand-front")
cw, ch = cx1 - cx0, cy1 - cy0
print("crop", cx0, cy0, cx1, cy1, "out", size)
print("phone px", px0, py0, px1, py1)
print("phone %% left=%.2f top=%.2f width=%.2f height=%.2f" % (
    100 * (px0 - cx0) / cw, 100 * (py0 - cy0) / ch, 100 * (px1 - px0) / cw, 100 * (py1 - py0) / ch))
print("aspect", (px1 - px0) / (py1 - py0), "crop aspect", cw / ch)
print("front px", int((front_np > 128).sum()))
