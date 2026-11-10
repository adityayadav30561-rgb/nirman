# 09 Selected work (homepage)

Status: built and verified (2026-11-10), variant B
Page: / (homepage), after What we do
Component: `src/components/home/work.tsx`; heading block shared with
Results in `proof-head.tsx`; motion `components/motion/proof-motion.tsx`;
which projects: `src/content/home-proof.ts`.

## Job
Show real projects early, so a visitor sees proof before reading further,
and send them to the case-study pages (`p5-work.md` round 3). User request
2026-11-10. Screenshots only, no links to client sites.

## Variants (built on `/lab/home2/`; deleted)
Sheets: `shots/09-work-1440.jpg`, `09-work-375.jpg` (A, B, C).

| Variant | Idea | Score /70 |
|---|---|---|
| A | the `/work/` cards again: one large site, two small, one app card | 55 |
| **B** | a row of large cards that moves sideways as the page scrolls | **62** |
| C | editorial numbered list with small thumbnails | 51 |
**B chosen:** six projects at full size in one screen of height, with the
richest scroll motion on the page; A is three screens tall and repeats
`/work/`; C makes the pictures, the actual proof, too small.

## Built
- Six cards: four websites (browser frame with the phone view at the
  corner) and two apps (the app's collage on an ink card), an app after
  every two sites; then a card with the count of projects on `/work/`.
  Each card is one link to its project page. "See all work" in the heading.
- Wide and tall enough screens (64rem by 44rem, motion allowed): the
  section pins and the row moves sideways with the scroll; a thin line
  shows progress. Otherwise: a swipe row with scroll snap.
- Reduced motion: no pin, the row scrolls by hand.

## Verified
Same checks as `06-results.md` round 2; the pin was stepped through at
1440 and 1920. Final shot: `shots/09-work-06-results-final-1440.jpg`.

## To confirm with the user
- Maharishi Ayurveda is a known brand: confirm the app may be shown by
  name on the homepage (same open point as on `/work/`).
