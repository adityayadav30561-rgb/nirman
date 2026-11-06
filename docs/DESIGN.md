# Design system (v4, rebuild from 2026-11-06)

The current look, taken from the user's reference video
(`docs/REFERENCE-VIDEO.md`). How new sections are designed:
`docs/DESIGN-PROTOCOL.md`. The old v2 system (ivory, Mona Sans) is in
`docs/archive/DESIGN-v2.md` for history only. When you add a pattern, add a
line here.

## Tokens (`@theme` in `nirman-site/src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `page` | `#f5f7f9` | page background (one pale surface) |
| `wash` | `#ebf4f9` | soft blue tint, hover backgrounds |
| `surface` | `#ffffff` | cards, menus |
| `ink` | `#05070c` | headings, main text |
| `ink-2` | `#1b1f27` | dark pill buttons |
| `muted` | `#90949b` | supporting grey text (see contrast note) |
| `line` | `#e3e7ed` | dividers |
| `brand` | `#025dde` | brand blue: bands, links, highlights |
| `brand-deep` | `#034fbf` | footer blue |
| `accent` | `#f26b2b` | orange, only for drawn accents |
| drawn blue | `#3b82f6` | hand-drawn sparks and loops |

**Contrast note (open):** `muted` on `page` is about 2.9:1, below the 4.5:1
the protocol asks for body text. It matches the reference. Decide with the
user: darken to about `#6b7079` (about 4.6:1) or keep for short lines only.

## Type

Poppins (next/font, weights 400, 500, 600, 700). H1 `clamp(3.2rem, 4.9vw,
4.25rem)` on desktop (72px at 1440), leading 1.3, tracking -0.025em,
semibold. Body 0.95rem, leading 1.75, `muted`. Section headings about two
thirds of the H1.

## Layout and scale

- Root font: `clamp(15px, 0.6vw + 10px, 17px)`; everything in rem, so the
  page stops growing on large screens.
- `container-page`: max 84rem, side padding 1.5rem (2.5rem from 768px).
- Breakpoints used: sm 640, md 768 (two columns start), lg 1024, xl 1280.

## Components

- `ui/button.tsx` `ButtonLink`: `dark` (ink-2 pill, white text, hover brand)
  and `outline`; sizes `sm` (header) and `md`.
- `site-header.tsx`: logo, nav with active underline, Services dropdown,
  header buttons, mobile menu.
- `home/facts.tsx`: full-bleed `brand` band; `h2` lead-in plus four light
  figures (value with a half-size unit) over 0.8rem labels at white/85; thin
  white/25 dividers; 2 x 2 on phones, one row from 768px, heading beside the
  row from 1024px. Data in `content/facts.ts`.
- `home/services.tsx`: "What we do": heading left (spark, `h2`, grey line),
  editorial list right: one row per service with `ServiceIcon`, title,
  line, right-aligned dark button with arrow. Data `content/services.ts`.
- `home/service-icons.tsx`: four 3D-style SVG icons (websites, seo,
  software, marketing); pass a page-unique `uid`.
- `reveal.tsx`: client wrapper (`as`, default `section`) that adds `data-in`
  when the element is about 80% down the screen; children animate with
  `rv-icon` / `rv-text` (set `--i` item index, `--j` 0 title / 1 line).
- `home/map.tsx` ("Where we work"), `home/world-map.tsx` (`WorldMap`,
  `MapPin`: hex-dot land map from Natural Earth in the Natural Earth
  projection (rounded outline), pins with side labels,
  India-to-market arcs, reveal mask) and `home/quote-bar.tsx` (`QuoteBar`:
  pill GET form with Service and Timeline selects and a dark Get a quote
  button; reusable on other pages).
- `home/results.tsx` + `home/results-spotlight.tsx` + `home/quote-card.tsx`:
  sample testimonials; tabs of business types switch one large quote (Framer
  Motion), every card with an orange SAMPLE chip.
- `home/questions.tsx` + `home/question-list.tsx` + `home/email-ask.tsx`:
  FAQ with FAQPage JSON-LD (content `content/faq.ts`); accordion rows with a
  blue arrow that turns down (Framer Motion height; closed answers stay in the
  HTML, `inert`); `EmailAsk` is the email pill joined to a dark Submit, which
  opens a mailto until the lead API exists.
- `home/crm.tsx` (Nirman CRM): text + four check points + Book a demo;
  pale-blue plate with channel icons, a sample chat card and a lead card.
- `ui/select.tsx` (`Select`): the site's dropdown, used instead of native
  `<select>` everywhere (user found the browser's list ugly). White
  rounded-2xl list with a soft shadow, rows highlight in `wash`, the chosen
  row in brand blue with a check; full keyboard support; Framer Motion
  open/close; hidden input carries the value for forms.
- `home/cloud.tsx`: flat-bottomed cartoon cloud (white, blue-grey underside).
- `home/phone-screen.tsx`: Nirman CRM mobile UI in HTML (sample data).
- `logo.tsx`: plan-view mark (ink, orange threshold) + wordmark.

## Motion system (GSAP; rules in DESIGN-PROTOCOL section 5)

All motion lives in `src/components/motion/` (GSAP 3.15.0 pinned, with
ScrollTrigger and SplitText; Framer Motion and Three.js allowed when they
fit). `gsap.ts` registers plugins and exports `MOTION_OK`; each section has a
client wrapper that renders its `<section>` and runs `useGSAP`:

| Wrapper | What it does |
|---|---|
| `site-header.tsx` (inline) | logo fades, nav items 0.1 s apart, dark button grey to dark, outline button |
| `hero-motion.tsx` | calm load: headline from a 40% ghost, phone swings in once (from 120% right, 20deg, to 8deg, no overshoot), subtitle and button fade, sparks, loop and underline draw, clouds fade in; then float and cloud drift. Scroll (scrubbed): text and phone rise, phone straightens, front clouds faster than back |
| `facts-motion.tsx` | once at 92%: band wipes open from the left, heading fades up, figures rise out of a mask 0.08 s apart, labels fade |
| `map-motion.tsx` | once at 75%: map revealed by a circle growing from India, India pin drops, arcs draw to each market and its pin pops, heading lines rise, bar rises; India pin pulses |
| `crm-motion.tsx` | text once at 75%; the sample conversation scrubbed to scroll (plate, icons, chat card, messages with typing dots, lead card) |
| `results-motion.tsx` | once at 75%: spark, heading lines, sub-line, tabs stagger, quote panel rises (quote switching is Framer Motion) |
| `questions-motion.tsx` | once at 75%: orange spark draws, heading lines, sentence and email field fade up, question rows stagger in (opening a row is Framer Motion) |
| `services-motion.tsx` | heading lines rise out of a mask (SplitText), spark draws; each row once at 85%: divider draws left to right, icon flips in (3D), title, line, then button |

Static start states in `globals.css` (only under `html.js` and
`prefers-reduced-motion: no-preference`): `gs-hide` (hidden), `gs-ghost`
(40% opacity), `gs-draw` (strokes hidden), `gs-clip-x` (clipped from the
right). The first three have a 2.5 s failsafe that shows them if GSAP never
runs. `.draw path` uses `stroke-dasharray: 1 2` with `pathLength=1`. A
`beforeInteractive` script in `layout.tsx` adds `js` to `<html>`.

## Artwork

- Hand: Unsplash u1b6E6IkSGQ, greyscale cut-out, credited in
  `src/content/image-credits.ts`.
- Product screens, icons, map and charts are built in code. No WhatsApp,
  Instagram or Facebook logos in our artwork.
