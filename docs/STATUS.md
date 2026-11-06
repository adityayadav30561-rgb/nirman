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
  hand holding a code-built Nirman CRM phone, clouds, and an entrance
  animation measured frame by frame from the reference video.
- **Design protocol in force** (`docs/DESIGN-PROTOCOL.md`): for every new
  section build 3 to 4 variants on `/lab/<section>/`, screenshot, score,
  choose the best, record it in `docs/sections/`, then build it.
- **Everything is on GitHub** (`origin` main); commit and push after every
  verified task so any session or account can continue.

## Next task

**H2 Facts band** (`docs/BUILD-PLAN.md`), following the protocol:
1. Brief `docs/sections/02-facts.md`; measure the band's motion in the video
   (about clip 4.0 to 5.8 s) with `tools/video/` (ask the user for the video
   if it is not at the path in `tools/video/README.md`).
2. Create the dev-only `/lab/` route (404 in production, noindex), build 3 to
   4 variants, screenshot 1440 + 375, score, choose, record.
3. Build the winner plus the shared reveal-on-scroll component (H10).

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
| `docs/ARCHITECTURE.md` | file map and gotchas (read gotchas 30-34) |
| `tools/video/README.md` | how to measure the reference video |

## Last session (2026-11-06)

Planned the rebuild (PAGE-PLAN, REFERENCE-VIDEO), removed the old site,
built header and hero with the hand, clouds and a measured entrance; wrote
the design protocol, build plan and current design docs; pushed all to
GitHub.
