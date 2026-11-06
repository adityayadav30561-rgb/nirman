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
  chosen 52/60; 3D-style icons in SVG. Where we work done
  (`docs/sections/04-map.md`): 4 variants incl. a Three.js globe, A (flat
  dotted map, GSAP reveal from India) chosen 54/70. Nirman CRM **redone** after user
  feedback ("no screens"; `docs/sections/05-crm.md` round 2): C, a blue
  product band naming Nirman CRM, real screens built in code
  (`src/components/crm/`: Inbox, Pipeline, Follow-ups, Dashboard, phone)
  with tabs, chosen 59/70. Results done (`docs/sections/06-results.md`): B (spotlight
  with tabs, all SAMPLE) chosen 55/70. Questions done
  (`docs/sections/07-questions.md`): A (reference layout, accordion, FAQPage
  JSON-LD; email opens a mailto until S1) chosen 60/70. Footer done (`docs/sections/08-footer.md`): A
  (reference blue panel, generic social icons as placeholders) chosen 59/70.
  **The homepage now has every section.**
- **Motion rule (user, 2026-11-06):** only GSAP, Framer Motion or Three.js
  (DESIGN-PROTOCOL section 5). CSS keyframe motion removed; hero back to the
  calm first entrance plus scroll parallax; facts and services use GSAP
  scroll reveals (`src/components/motion/`).
- **Design protocol in force** (`docs/DESIGN-PROTOCOL.md`): for every new
  section build 3 to 4 variants on `/lab/<section>/`, screenshot, score,
  choose the best, record it in `docs/sections/`, then build it.
- **Everything is on GitHub** (`origin` main); commit and push after every
  verified task so any session or account can continue.

- **Colours (user, 2026-11-06): no blue anywhere.** Bands (facts, CRM,
  footer) are ink `#121418`; accent is burnt orange `#c2410c` (DESIGN
  tokens). Section records written before this still mention blue; the
  code is the truth.

- **No "SAMPLE" labels (user, 2026-11-06).** CRM screens = the real CRM
  design. Testimonials are unlabelled placeholders: replace before launch
  (S4 blocker).

## Next task

**Homepage is complete** (H9 review done: `docs/sections/00-page-review.md`).
Next: **P2 `/nirman-crm/`** (recommended first: the CRM screens already
exist in `src/components/crm/`, and every "Book a demo" button points
there). Then P1 services, P3 get-a-quote. Each page follows the protocol
(variants per section on `/lab/`). Read PAGE-PLAN section 3 for the page's
sections first. The user may choose a different order.

## Open questions for the user

- Real contact details, domain, and which social profiles exist (all
  placeholders: `src/content/site.ts`; footer icons are generic with `#`
  links in `src/content/footer.ts`).

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
| `docs/ASSET-REQUESTS.md` | images/media the user generates from Claude's prompts (pending, received, used) |
| `docs/PAGE-PLAN.md` | pages and what goes on each |
| `docs/REFERENCE-VIDEO.md` | the reference's layout and measured motion |
| `docs/ARCHITECTURE.md` | file map and gotchas (read gotchas 30-38) |
| `tools/video/README.md` | how to measure the reference video |

## Last session (2026-11-06)

Planned the rebuild (PAGE-PLAN, REFERENCE-VIDEO), removed the old site,
built header and hero with the hand, clouds and a measured entrance; wrote
the design protocol, build plan and current design docs; built the facts
band (B) and What we do (D) through the protocol; at the user's request
calmed the hero and moved all motion to GSAP; added the asset-prompt rule
(ChatGPT/Gemini); built Where we work (A, dotted map), Nirman CRM (B), Results (B) and
Questions (A) and the Footer (A), in a cloud session with Playwright shots;
pushed to GitHub.
