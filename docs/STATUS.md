# Status

Read this first in every session. Update it after every finished task and at
the end of every session. Keep it under about 60 lines. Older history:
`docs/archive/STATUS-v2.md`.

## Where we are (2026-11-06)

- **Rebuild from scratch.** The user rejected the old site (still in GitHub
  commit `2eba621`, tag `archive/v2`; local copy `E:\nirman2\old-site\`,
  gitignored). All page-plan decisions are made (`docs/DECISIONS.md`):
  18 pages, full-width page, keyword headline, Poppins, four true facts,
  SAMPLE results, artwork built in code or downloaded with permission.
- **Homepage:** header and hero done and verified (`docs/sections/01-hero.md`):
  hand holding a code-built Nirman CRM phone, clouds, a calm GSAP load
  entrance and scroll parallax. Facts band
  done (`docs/sections/02-facts.md`): 4 variants, B chosen 49/60. What we
  do done (`docs/sections/03-services.md`): 4 variants, D (editorial list)
  chosen 52/60; 3D-style icons in SVG.
- **Motion rule (user, 2026-11-06):** only GSAP, Framer Motion or Three.js
  (DESIGN-PROTOCOL section 5). CSS keyframe motion removed; hero back to the
  calm first entrance plus scroll parallax; facts and services use GSAP
  scroll reveals (`src/components/motion/`).
- **Design protocol in force** (`docs/DESIGN-PROTOCOL.md`): for every new
  section build 3 to 4 variants on `/lab/<section>/`, screenshot, score,
  choose the best, record it in `docs/sections/`, then build it.
- **Everything is on GitHub** (`origin` main); commit and push after every
  verified task so any session or account can continue.

## Next task

**H4 Where we work** (`docs/BUILD-PLAN.md`), following the protocol:
1. Brief `docs/sections/04-map.md` (PAGE-PLAN section 2 row 5: dotted world
   map in code, India office plus markets we serve US, UAE, UK; pins say
   "markets we serve"; Service / Timeline / Get a quote bar). Measure the
   map section in the video (about clip 6.0 to 9.4 s: pins pop in, big one
   first, search bar last) with `tools/video/` (adapt
   `track_features.py`; ask the user for the video if it is missing).
2. Lab pattern: `src/app/lab/<section>/page.tsx` (`notFound()` in
   production, noindex), variants in `src/components/lab/<section>/`, each
   wrapped in `id="var-x"`; give every SVG with gradients a unique id
   (gotcha 35). Shots per `tools/shots/README.md` section 5; wait about 2 s
   after showing a variant so its reveal finishes.
3. Each variant carries a motion concept (GSAP / Framer / Three; a globe
   in Three.js is a natural candidate here). Score on the 70-point rubric
   (motion row added), choose, record; build the winner with a
   `components/motion/map-motion.tsx` wrapper.

## Open questions for the user

- `muted` grey text is about 2.9:1 contrast (fails AA 4.5:1). Darken to
  about `#6b7079`, or keep the reference grey for short lines only?
- Real contact details, domain, and which social profiles exist (all
  placeholders in `src/content/site.ts`).

## Half-finished work

None.

## Where things are recorded

| File | What |
|---|---|
| `CLAUDE.md` | rules, start/end of session steps (auto-loaded) |
| `docs/STATUS.md` | this file: position, next task, open questions |
| `docs/BUILD-PLAN.md` | all tasks with ticks |
| `docs/DECISIONS.md` | every user decision (date, what, why) |
| `docs/DESIGN-PROTOCOL.md` | design principles and the 3-4 variant process |
| `docs/sections/` | one record per section: brief, variants, scores, choice |
| `docs/DESIGN.md` | current tokens, type, components, motion classes |
| `docs/PAGE-PLAN.md` | pages and what goes on each |
| `docs/REFERENCE-VIDEO.md` | the reference's layout and measured motion |
| `docs/ARCHITECTURE.md` | file map and gotchas (read gotchas 30-38) |
| `tools/video/README.md` | how to measure the reference video |

## Last session (2026-11-06)

Planned the rebuild (PAGE-PLAN, REFERENCE-VIDEO), removed the old site,
built header and hero with the hand, clouds and a measured entrance; wrote
the design protocol, build plan and current design docs; built the facts
band (B) and What we do (D) through the protocol; then, at the user's
request, calmed the hero and moved all motion to GSAP; pushed to GitHub.
