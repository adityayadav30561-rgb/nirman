"""Track the reference's Features section (icons shrink into place, then text).
Per frame: heading top (anchor), each colourful icon blob (centre, width)
relative to the heading, and text darkness per column. Units: 1440px page.
usage: python track_features.py VIDEO t0 t1 step"""
import sys
import cv2
import numpy as np

video = sys.argv[1]
t0, t1, step = float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
cap = cv2.VideoCapture(video)
fps = cap.get(cv2.CAP_PROP_FPS)

print("t    | headTop | icons (x, y rel. heading, width) ... | text dark px per column (3)")
t = t0
while t <= t1 + 1e-6:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps)))
    ok, fr = cap.read()
    tt = t
    t += step
    if not ok:
        continue
    g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(int)
    b, gg, r = [fr[..., i].astype(int) for i in range(3)]
    row = g[270]
    xs = np.where(row > 236)[0]
    if len(xs) < 50:
        continue
    cl, cr = xs.min(), xs.max()
    cw = cr - cl
    k = 1440.0 / cw
    blue = (b - r > 120) & (b > 170)
    band_rows = np.where(blue[:, cl:cr].mean(axis=1) > 0.6)[0]
    band_bottom = band_rows.max() if len(band_rows) else -1
    # heading: dark, non-blue pixels in the left text column, below the band
    hx0, hx1 = cl + int(0.04 * cw), cl + int(0.30 * cw)
    dark = (g < 90) & ~blue
    rows = [y for y in range(max(band_bottom + 4, 0), g.shape[0]) if dark[y, hx0:hx1].sum() > 4]
    if not rows:
        print(f"{tt:.2f} | no heading"); continue
    htop = rows[0]
    # colourful blobs to the right of the heading, near the heading's rows
    sat = (fr.max(axis=2).astype(int) - fr.min(axis=2).astype(int)) > 70
    y0, y1 = max(htop - 60, band_bottom + 4), min(htop + 80, g.shape[0])
    x0 = cl + int(0.30 * cw)
    m = sat[y0:y1, x0:cr].astype(np.uint8)
    n, lab, stats, cent = cv2.connectedComponentsWithStats(m, 8)
    blobs = []
    for i in range(1, n):
        x, y, w, h, a = stats[i]
        if a < 30:
            continue
        cx, cy = cent[i]
        blobs.append(((x0 + cx - cl) * k, (y0 + cy - htop) * k, w * k, a))
    blobs.sort()
    # merge blobs closer than 60px (one icon can split into parts)
    merged = []
    for bl in blobs:
        if merged and abs(bl[0] - merged[-1][0]) < 60:
            p = merged[-1]
            tot = p[3] + bl[3]
            merged[-1] = ((p[0] * p[3] + bl[0] * bl[3]) / tot, (p[1] * p[3] + bl[1] * bl[3]) / tot, max(p[2], bl[2]), tot)
        else:
            merged.append(bl)
    icons = " ".join(f"({x:4.0f},{y:4.0f},{w:3.0f})" for x, y, w, a in merged[:4])
    # text darkness: dark pixels in each column's text area (below the final icons)
    cols = [(0.33, 0.47), (0.50, 0.64), (0.66, 0.80)]
    tx = []
    for a_, b_ in cols:
        reg = g[htop + 10:htop + 75, cl + int(a_ * cw):cl + int(b_ * cw)]
        tx.append(int((reg < 150).sum()))
    print(f"{tt:.2f} | {htop*k - 0:6.0f} | {icons:60s} | {tx}")
