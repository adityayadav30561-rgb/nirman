# 03 What we do

Status: built and verified (2026-11-06), variant D
Page: / (homepage), under the facts band
Component (after choice): `src/components/home/services.tsx`

## Job
Show the four things Nirman does, so every visitor finds their need in a
few seconds and has one obvious next click to the right service page.

## Content (PAGE-PLAN section 2 row 4)
Heading: "Everything your business needs to grow online." Supporting line.
Four items, each with a 3D-style icon (built in code), a title, one grey
line and a small dark button to its page:

| Item | Line | Button |
|---|---|---|
| Websites | Fast, mobile-first websites and online stores that turn visitors into enquiries. | /services/websites/ |
| SEO | Local, technical and AI-search SEO, so customers find you before your competitors. | /services/seo/ |
| Custom software | CRMs, web apps and mobile apps built around the way your team works. | /services/software/ |
| Marketing automation | WhatsApp and email follow-ups that run on their own through Nirman CRM. | /services/marketing/ |

No prices; no PPC or social media marketing; no WhatsApp logo (the word is
fine). Copy is a draft for the user to change.

## Reference (REFERENCE-VIDEO 2 row 4 and 4.3 "Features", measured)
- Layout: heading block on the left (small blue spark before it, grey
  sentence), three columns to the right: 3D icon, bold title, three grey
  lines. Pale page background.
- Motion: icons start 2x large, below and right of their place, then shrink
  into place (about 0.9 s, ease-in-out, 0.1 s stagger, left to right), when
  the section is about 80% down the screen; each title then description fades
  in as its icon lands. Heading static.

## Variants
Built in `src/components/lab/services/variants.tsx`, shown on
`/lab/services/` (2026-11-06), all with the measured icon motion. Shots are
the final state after the animation (desktop scaled to 800px wide).

| Variant | Idea | Shots |
|---|---|---|
| A | Reference: heading block left, four columns (icon, title, line, button) | `shots/03-services-a-1440.jpg`, `-375.jpg` |
| B | Centred heading, four white cards in a row | `shots/03-services-b-1440.jpg`, `-375.jpg` |
| C | Heading left, 2 x 2 large tiles with a big icon top-right | `shots/03-services-c-1440.jpg`, `-375.jpg` |
| D | Heading left, editorial list: one row per service (icon, title + line, button) | `shots/03-services-d-1440.jpg`, `-375.jpg` |

## Scores
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 4 | 5 | 4 | 5 |
| Fit with the reference (2) | 5 | 3 | 3 | 3 |
| Conversion (2) | 4 | 4 | 4 | 4 |
| Mobile quality (2) | 3 | 3 | 2 | 5 |
| Distinctiveness (1) | 3 | 2 | 4 | 4 |
| Accessibility (1) | 4 | 4 | 3 | 4 |
| Performance cost (1) | 5 | 5 | 5 | 5 |
| **Total /60** | 48 | 46 | 42 | **52** |

Notes: A is the reference; its narrow heading wraps to four lines at 1440
and it runs 1298px tall on phones. B is a generic icon-card grid (the
protocol warns against it) and the longest on phones (1515px). C's text runs
under the big icons on phones. D reads fastest (title and line on one row),
is the shortest on phones (1034px, icon beside the text) and keeps the
reference's heading-left arrangement and icon motion.

## Choice
**D**, chosen by Claude per the protocol (2026-11-06); runner-up A. The
user may override (A is the most literal match to the video).

## Build notes
- Component `src/components/home/services.tsx`, data `src/content/services.ts`,
  icons `src/components/home/service-icons.tsx` (SVG, 3D style: gradient
  body, darker side face, gloss, contact shadow). Each `ServiceIcon` needs a
  unique `uid` (gradient ids are global; ARCHITECTURE gotcha 35).
- Motion: shared `components/reveal.tsx` (H10) + `rv-icon` / `rv-text` in
  `globals.css`: trigger at 80% of the screen, icons 2x to 1x with a
  below-right offset over 0.9 s ease-in-out, 0.1 s apart; title fades at
  +0.55 s, line and button at +0.65 s. Small blue spark draws on reveal.
  Checked: waiting state scale 2, about 1.3 at 0.45 s, settled by 2 s.
- Fix vs the lab: buttons right-aligned so they line up on desktop.
- Section heights: 1038px at 375, 757px at 768, 731px at 1440. Heading's left
  edge = hero H1's left edge (1920 check). No horizontal scroll.
- Status: built and verified 2026-11-06. Lab code deleted; shots kept.
