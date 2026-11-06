# 02 Facts band

Status: built and verified (2026-11-06), variant B
Page: / (homepage), directly under the hero
Component (after choice): `src/components/home/facts.tsx`

## Job
Right after the promise in the hero, give four concrete, checkable reasons
to trust Nirman, in one glance, without inventing any numbers.

## Content (PAGE-PLAN section 2 row 3; DECISIONS 2026-11-06)
| Big figure | Label |
|---|---|
| 2 h | reply in working hours (IST) |
| 48 h | written proposal after the call |
| 3 to 6 wk | a typical business website |
| 100% | your code, content and data |

Sources: 2 h and 48 h are in `docs/handoff.md` (contact and quote pages).
3 to 6 weeks and 100% ownership are our earlier drafted promises, approved by
the user as "four true facts" on 2026-11-06; **confirm with the client before
launch.** No count-up of fake totals, no ratings.

## Reference (measured 2026-11-06, clip 3.8 to 5.6 s)
- Full-width solid brand-blue band (`#025dde`), no rounding, about 163px tall
  at 1440.
- Four groups spread evenly across the content width, the first aligned with
  the page's left content edge. Each: a large, light-weight white numeral
  (about 58px) with a tiny two-line label to its right (white, about 75%
  opacity, about 13px). Thin light vertical dividers between groups.
- **Motion: none of its own.** No count-up, no stagger: the band is already
  complete when it scrolls into view (frames 4.10 to 4.85 s every 0.05 s show
  identical content). It only moves with the page scroll.

## Variants
Built in `src/components/lab/facts/variants.tsx`, shown on `/lab/facts/`
(2026-11-06). Desktop shots are the in-app browser's 1440px view scaled to
800px wide.

| Variant | Idea | Shots |
|---|---|---|
| A | Reference: full-bleed blue band, figure with a two-line label beside it, dividers | `shots/02-facts-a-1440.jpg`, `02-facts-a-375.jpg` |
| B | Same band with a lead-in heading "What you can count on" at left; figures stacked over labels | `shots/02-facts-b-1440.jpg`, `02-facts-b-375.jpg` |
| C | Rounded blue panel inside the page width (to overlap the hero), a line icon per fact | `shots/02-facts-c-1440.jpg`, `02-facts-c-375.jpg` |
| D | The facts as a journey: "You message us, You get a plan, Your site goes live, You own it all", joined by a line | `shots/02-facts-d-1440.jpg`, `02-facts-d-375.jpg` |

## Scores
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 4 | 5 | 4 | 4 |
| Fit with the reference (2) | 5 | 4 | 2 | 3 |
| Conversion (2) | 3 | 3 | 3 | 4 |
| Mobile quality (2) | 4 | 4 | 4 | 3 |
| Distinctiveness (1) | 2 | 3 | 3 | 5 |
| Accessibility (1) | 3 | 4 | 4 | 4 |
| Performance cost (1) | 5 | 5 | 5 | 5 |
| **Total /60** | 46 | **49** | 42 | 46 |

Notes: A is the reference but generic, and its 12px labels at 75% white are
weak on contrast. C breaks the full-bleed blue band that gives the reference
its rhythm. D is the most distinctive but 567px tall on phones, a lot for a
trust strip, and reads slower.

## Choice
**B**, chosen by Claude per the protocol (2026-11-06). It keeps the
reference's full-bleed blue band and light figures, but the lead-in heading
tells the visitor these are promises (not vanity stats), and figures stacked
over labels read faster and give the labels room to be larger. The user may
override.

## Build notes
- Component: `src/components/home/facts.tsx`, data `src/content/facts.ts`
  (the `step` field is only used by variant D; kept for a possible later
  use on the About page).
- Labels raised to white/85 and 0.8rem for contrast; heading is an `h2`
  (section `aria-labelledby`).
- Motion: none of its own, as measured. It scrolls in complete.
- Change after testing: at 768px the heading beside four columns left 115px
  per fact (3-line labels), so the heading sits above the figures until
  1024px and beside them from there (`lg:` grid). Heights: 312px at 375,
  216px at 768, 179px at 1440 and 1920.
- Verified at 375, 768, 1440, 1920: no horizontal scroll, figures' left edge
  lines up with the hero headline, width capped at 84rem.
- Lab code deleted after the choice; screenshots stay in `shots/`.
