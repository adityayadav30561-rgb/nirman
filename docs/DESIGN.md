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
- `home/cloud.tsx`: flat-bottomed cartoon cloud (white, blue-grey underside).
- `home/phone-screen.tsx`: Nirman CRM mobile UI in HTML (sample data).
- `logo.tsx`: plan-view mark (ink, orange threshold) + wordmark.

## Motion system (`globals.css`)

All entrance timing starts from `--t0` (0.1 s after load). Curves:
`--ease-cubic` (measured ease-out cubic) and `--ease-out`. Classes: `intro`
(fade), `logo-in`, `nav-in`, `cta-in`, `cta-dark-in`, `hero-h1`, `hero-btn`,
`draw` (SVG paths with `pathLength=1`, `--d` and `--dur`), `phone-enter`
(`phone-move` + `phone-tilt`), `phone-float`, `clouds-follow`, `cloud`,
`cloud-far`. Every class is switched off under `prefers-reduced-motion`.
Section reveals on scroll: `Reveal` + `rv-icon` / `rv-text` (paused start
state under `html.js`, running once `data-in`); `.draw` paths inside a
`Reveal` also wait for it. An inline script in `layout.tsx` adds `js` to
`<html>` before paint, so without JS content just shows.

## Artwork

- Hand: Unsplash u1b6E6IkSGQ, greyscale cut-out, credited in
  `src/content/image-credits.ts`.
- Product screens, icons, map and charts are built in code. No WhatsApp,
  Instagram or Facebook logos in our artwork.
