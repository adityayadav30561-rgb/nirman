# 04 Where we work

Status: built and verified (2026-11-06), variant A
Page: / (homepage), under "What we do"
Component (after choice): `src/components/home/map.tsx`

## Job
Show that a team in India serves businesses abroad (US, UAE, UK) without
friction (remote, calls in their time zone), and turn interest into a quote
request with two quick choices.

## Content (PAGE-PLAN section 2 row 5)
- Heading (draft): "A team in India, working in your time zone."
- Sentence (draft): "We serve businesses in India, the US, the UAE and the UK
  remotely, with calls in your working hours and a written plan before we
  start."
- Pins: **India (our office)**; **markets we serve**: United States, UAE,
  United Kingdom. Never "our clients in" (no client list yet).
- Time zones (facts): India IST UTC+5:30; UAE UTC+4 (1 h 30 m behind
  India); UK UTC+0 / +1 in summer (4 h 30 m to 5 h 30 m behind); US Eastern
  UTC-5 / -4 (9 h 30 m to 10 h 30 m behind), Pacific UTC-8 / -7.
- Quote bar (works without JS: a GET form to `/get-a-quote/`): Service
  (Websites, SEO, Custom software, Marketing automation, Not sure yet),
  Timeline (As soon as possible, In 1 to 3 months, In 3 to 6 months, Just
  exploring), round "Get a quote" button.

## Reference (REFERENCE-VIDEO 2 row 5; frames 6.0 to 9.6 s)
Large pale-blue hex-dot world map on the left (about 55% of the width), photo
pins (one big, several small, small orange glow under each), heading,
sentence and a pill search bar (Location, Date, round dark button) on the
right, a loose drawn loop top right. The heading fades in as the section
arrives, the bar last.

## Assets
- Dotted map: **built in code** from Natural Earth 110m land (public domain)
  via `world-atlas` by `scripts/make-world-dots.mjs` ->
  `src/content/world-dots.json` (1,990 dots, hex grid, 2.8 degrees, 84N to 56S).
- Pins and their mini screens: **built in code** (no photos needed).
- Globe (variant B): **built in code** with Three.js.
- Nothing to request from the user for this section.

## Variants (each with its motion concept; GSAP / Framer / Three only)
| Variant | Idea | Motion concept |
|---|---|---|
| A | Reference: flat dot map left, pins with mini screens, text and bar right | GSAP: map revealed by a circle growing from India (SVG mask), India pin drops in, arcs draw to each market, market pins pop, heading then bar |
| B | Three.js dotted globe with India facing you, arcs to the markets, text and bar beside | Three: slow idle spin; GSAP ScrollTrigger scrubs the globe from showing the US to centring India as you scroll; arcs grow |
| C | Wide flat map, pinned while you scroll through four stops (India, UAE, UK, US), each with a time-zone card | GSAP: pin + scrub, map pans and zooms per stop, cards slide in |
| D | Map as a backdrop band, four local-time cards (live clocks) with overlap bars, bar below | GSAP reveal; Framer Motion for the ticking clock digits |

Built on `/lab/map/` (2026-11-06). Shots: `shots/04-map-{a,b,c,d}-1440.jpg`
and `-375.jpg` (desktop scaled to 800px wide). Lab fixes before scoring:
UAE label moved left of its pin (it overlapped India's), globe rendered
`flat` (no tone mapping) and the camera moved back, map backdrop in D made
visible.

## Scores (70-point rubric, motion row included)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 4 | 4 | 3 | 5 |
| Fit with the reference (2) | 5 | 3 | 3 | 2 |
| Motion fit (2) | 4 | 5 | 4 | 3 |
| Conversion (2) | 4 | 4 | 3 | 4 |
| Mobile quality (2) | 2 | 3 | 2 | 4 |
| Distinctiveness (1) | 3 | 5 | 4 | 4 |
| Accessibility (1) | 4 | 4 | 3 | 4 |
| Performance cost (1) | 5 | 2 | 4 | 5 |
| **Total /70** | **54** | 53 | 44 | **54** |

Notes: A is the reference and its motion plan (map revealed by a circle
growing from India, arcs drawing to each market) fits it best, but on phones
the map is tiny and the labels crowd. B (Three.js globe) is the most striking
and has the best motion, but costs WebGL plus about 150 KB of JS and
overflowed on phones. C hides the map behind its card and makes people
scroll a long way. D states the time-zone promise most clearly and is the
best on phones, but the map is only a faint backdrop.

## Choice
**A**, chosen by Claude per the protocol (2026-11-06): tie with D at 54/70,
broken in favour of the variant closer to the reference. Its weak point is
fixed in the build by borrowing from B and D: on phones the pins drop their
name chips and a short list of the four places with their time differences
sits under the map. Runner-up B (globe); the user may override.

## Build notes
- Components: `src/components/home/map.tsx` (section), `world-map.tsx`
  (flat dotted map, pins, arcs, reveal mask; `maskId` must be page-unique),
  `quote-bar.tsx` (GET form to `/get-a-quote/?service=&timeline=`; native
  selects with a chevron). Content `src/content/map.ts` (places with
  coordinates, time zones, time differences, label side), data
  `src/content/world-dots.json` (rebuild: `node scripts/make-world-dots.mjs`).
- Map-data packages are dev-only and pinned: `world-atlas` 2.0.2,
  `topojson-client` 3.1.0, `d3-geo` 3.1.1 (3.1.2 was 3 days old). Three.js and
  @react-three/fiber were installed for variant B and removed after the choice.
- Pin labels sit beside the pins (UAE on the left, the others on the right),
  so each pin's dot marks the exact place. On phones the labels hide and a
  place list with time differences shows under the map.
- Layout: text column 0.95fr from 1024px so the longest select option fits
  (157px available for "Marketing automation" at 1440); selects 0.82rem.
- Motion (`components/motion/map-motion.tsx`, GSAP, once at 75%): map
  revealed by a mask circle growing from India (1.4 s), India pin drops in
  (back ease, 0.25 s), arcs draw to UAE, UK, US 0.25 s apart and each pin pops
  in as its arc lands, heading lines rise (SplitText), sentence fades up, bar
  rises at 1.2 s, phone place list staggers in; then India's pin pulses
  gently.
- Fixes after user review (2026-11-06): (1) the map was cut at the top: the
  dot grid started at 78N and lost Greenland and the Canadian Arctic; now
  84N to 56S (1,990 dots, viewBox 360 x 140, aspect follows the data);
  (2) the native browser dropdowns looked out of place: replaced by the
  site's own `components/ui/select.tsx` (custom listbox, keyboard support,
  Framer Motion open/close; values in hidden inputs, so the GET form is
  unchanged). Columns now 1:1 from 1024px so every option fits (170px for
  "Marketing automation" at 1440); on phones the Get a quote button sits
  full width under the two fields. The section no longer clips overflow,
  so the open list is never cut off.
- Second fix (user: "still cropped"): the data was complete; the flat top
  came from the equirectangular grid, which stretches the Arctic so the
  northern coasts line up into a straight edge. The dots are now laid out
  on an even hex grid in the **Natural Earth projection** (rounded outline,
  compact poles, Greenland its own shape): `scripts/make-world-dots.mjs`
  saves the projected x, y plus the projection's scale and translate
  (1,742 dots, viewBox 360 x 158.1); `world-map.tsx` rebuilds the same
  projection with `d3-geo` (now a runtime dependency, used only in this
  server component, so nothing extra reaches the browser) to place pins,
  arcs and the reveal mask.
- Verified: 1440 (sequence reaches its end state; no horizontal scroll),
  768 (labels clear of each other), 375 (place list, 855px tall). Lab code
  deleted; shots kept.
