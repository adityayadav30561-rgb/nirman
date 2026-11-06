"""Track hero elements in the reference video, relative to the card.
Units: px on a 1440-wide desktop page (card width -> 1440)."""
import sys
import cv2
import numpy as np

video = sys.argv[1]
t0, t1, step = float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
cap = cv2.VideoCapture(video)
fps = cap.get(cv2.CAP_PROP_FPS)


def card_box(g):
    # card is lighter than the stage; scan a middle row and column
    row = g[270].astype(int)
    xs = np.where(row > 236)[0]
    col = g[:, 360].astype(int)
    ys = np.where(col > 236)[0]
    if len(xs) < 50 or len(ys) < 50:
        return None
    return xs.min(), ys.min(), xs.max(), ys.max()


print("t     cardL cardW | phone cx   cy   ang  w    h   | h1L  h1dark | navL | loginL | btnLum")
t = t0
while t <= t1 + 1e-6:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps)))
    ok, fr = cap.read()
    t += step
    if not ok:
        continue
    g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
    cb = card_box(g)
    if cb is None:
        print(f"{t-step:.2f}  no card"); continue
    cl, ct, cr, cbm = cb
    cw = cr - cl
    k = 1440.0 / cw

    def X(x):
        return (x - cl) * k

    def Y(y):
        return (y - ct) * k

    # phone: very dark pixels in the right part of the card, below the nav row
    reg = g[ct + int(0.12 * cw * 0.59):cbm, cl + int(0.55 * cw):cr]
    m = (reg < 50).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    ph = "     -    -    -    -    -  "
    if cnts:
        c = max(cnts, key=cv2.contourArea)
        if cv2.contourArea(c) > 300:
            (cx, cy), (w, h), ang = cv2.minAreaRect(c)
            if w > h:
                w, h = h, w
                ang -= 90
            # OpenCV angle -> clockwise tilt of the phone's long axis from vertical
            if ang < -45:
                ang += 90
            if ang > 45:
                ang -= 90
            cx += cl + int(0.55 * cw); cy += ct + int(0.12 * cw * 0.59)
            ph = f"{X(cx):6.0f} {Y(cy):5.0f} {ang:5.1f} {w*k:4.0f} {h*k:4.0f}"

    # headline: dark text pixels in the left half, H1 band
    hy0, hy1 = ct + int(0.20 * cw * 0.59), ct + int(0.62 * cw * 0.59)
    hreg = g[hy0:hy1, cl:cl + int(0.5 * cw)]
    hm = hreg < 150
    if hm.sum() > 30:
        xs = np.where(hm.any(axis=0))[0]
        h1L = X(cl + xs.min())
        h1dark = np.percentile(hreg[hm], 5)
    else:
        h1L, h1dark = float("nan"), float("nan")

    # nav row: grey text in the middle band; login pill: dark in the right band
    ny0, ny1 = ct + int(0.035 * cw * 0.59), ct + int(0.11 * cw * 0.59)
    nreg = g[ny0:ny1, cl + int(0.25 * cw):cl + int(0.62 * cw)]
    nx = np.where((nreg < 200).any(axis=0))[0]
    navL = X(cl + int(0.25 * cw) + nx.min()) if len(nx) else float("nan")
    lreg = g[ny0:ny1, cl + int(0.62 * cw):cr - 2]
    lx = np.where((lreg < 90).sum(axis=0) > 3)[0]
    loginL = X(cl + int(0.62 * cw) + lx.min()) if len(lx) else float("nan")

    # get started button: darkness of the button area (dark pill under subtitle)
    by0, by1 = ct + int(0.78 * cw * 0.59), ct + int(0.90 * cw * 0.59)
    breg = g[by0:by1, cl + int(0.08 * cw):cl + int(0.18 * cw)]
    btn = np.percentile(breg, 10)

    print(f"{t-step:.2f} {cl:5d} {cw:5d} | {ph} | {h1L:5.0f} {h1dark:5.0f} | {navL:5.0f} | {loginL:5.0f} | {btn:5.0f}")
