"""Crop the hero's phone area from the reference video at several times,
upscaled 3x, to study the clouds (shape, position, motion)."""
import sys
import cv2
import numpy as np

video, out = sys.argv[1], sys.argv[2]
cap = cv2.VideoCapture(video)
fps = cap.get(cv2.CAP_PROP_FPS)
times = [float(t) for t in sys.argv[3].split(",")]
# card at 2.6s spans x 51..668, y 88..451 in the 720x540 frame (sheet coords /2)
x0, y0, x1, y1 = [int(v) for v in sys.argv[4].split(",")]
tiles = []
for t in times:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps)))
    ok, fr = cap.read()
    if not ok:
        continue
    crop = fr[y0:y1, x0:x1]
    crop = cv2.resize(crop, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
    cv2.putText(crop, f"{t:.2f}s", (8, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
    tiles.append(crop)
rows = [np.hstack(tiles[i:i + 3]) for i in range(0, len(tiles), 3) if len(tiles[i:i + 3]) == 3]
cv2.imwrite(out, np.vstack(rows))
print(fps, len(tiles))
