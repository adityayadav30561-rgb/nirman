"""Grid of crops from the reference video.
args: video out t0 t1 step x0,y0,x1,y1 cols scale"""
import sys
import cv2
import numpy as np

video, out, t0, t1, step, box, cols, scale = sys.argv[1:9]
t0, t1, step, cols, scale = float(t0), float(t1), float(step), int(cols), float(scale)
x0, y0, x1, y1 = [int(v) for v in box.split(",")]
cap = cv2.VideoCapture(video)
fps = cap.get(cv2.CAP_PROP_FPS)
tiles = []
t = t0
while t <= t1 + 1e-6:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps)))
    ok, fr = cap.read()
    if ok:
        c = fr[y0:y1, x0:x1]
        c = cv2.resize(c, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
        cv2.rectangle(c, (0, 0), (78, 22), (0, 0, 0), -1)
        cv2.putText(c, f"{t:.2f}", (4, 17), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)
        tiles.append(c)
    t += step
while len(tiles) % cols:
    tiles.append(np.full_like(tiles[0], 255))
rows = [np.hstack(tiles[i:i + cols]) for i in range(0, len(tiles), cols)]
cv2.imwrite(out, np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 85])
print(len(tiles), fps)
