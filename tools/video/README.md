# Reference video tools

Scripts used to read the user's reference video (`docs/REFERENCE-VIDEO.md`)
frame by frame. Python 3 with `opencv-python` and `numpy` (`pip install
opencv-python numpy`).

**The video is NOT in the repo** (third-party, and the repo is public). On the
user's PC it is `C:\Users\ay817\Downloads\928aca8b8e476ade2d17a603c7e62015_720w.mp4`
(720x540, 60 fps, 17.28 s). In another session or on another machine, ask the
user for the file. Never commit the video or extracted frames; write outputs
to a scratch folder.

| Script | What it does | Example |
|---|---|---|
| `sheet.py` | Grid of crops at a fixed time step, time-stamped | `python sheet.py VIDEO out.jpg 0.8 2.5 0.1 0,40,720,500 4 0.75` (t0 t1 step box cols scale) |
| `crops.py` | Six upscaled (3x) crops at chosen times | `python crops.py VIDEO out.jpg 1.2,1.6,2.0,2.4,2.8,3.2 380,130,668,310` |
| `track_hero.py` | Per-frame tracking of the hero: card box, phone bezel centre and angle, H1 left edge and darkness, nav and Login positions, button darkness; in 1440px-page units | `python track_hero.py VIDEO 0.8 3.0 0.05` |

Coordinates are video pixels (720x540). The page sits in a floating card that
also moves (presentation camera) until about clip 1.0 s; `track_hero.py`
measures relative to the card, so values before 1.0 s are rough.

Method for a new section (used for the hero, 2026-11-06):
1. `sheet.py` over the section's time window (see REFERENCE-VIDEO section 2)
   to see what moves.
2. Write or adapt a tracker like `track_hero.py` for the moving elements.
3. Record the measured table in REFERENCE-VIDEO section 4.
4. Build keyframes from the table, then verify by pausing and seeking the
   page's animations (ARCHITECTURE gotcha 33) at the same times.

Related: `nirman-site/scripts/cut-hand.py` builds the hero hand layers from the
Unsplash photo (source:
`https://images.unsplash.com/photo-1691256676376-357c3aa66c89?w=1600&q=85&fm=png`).
