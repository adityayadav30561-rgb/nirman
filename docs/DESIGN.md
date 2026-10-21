# Design system (current, approved by the user)

The handoff deliberately excludes design. This file is the design source of
truth. Code lives in `nirman-site/src/app/globals.css` and `src/components/`.
When you add a pattern, add a line here.

## Principles the user asked for (keep them)

- **Real assets, not drawn ones.** Real photos (Unsplash, self-hosted) and real
  device photos with our UI on the screens. Do not draw devices, illustrations
  or fake photos in CSS/SVG.
- **Colourful, not monochrome.** Each service owns a colour; panels use bold
  colour blocks on a warm ivory page.
- **Full width.** Every section spans the same nearly-full-width container.
- **Same look per device class.** Phones all look alike, tablets alike,
  desktops alike, at any resolution (fluid root scale below).
- **No hollow minimalism.** Every section shows something concrete (mockup,
  photo, data). Avoid generic AI-template patterns (floating blobs, icon-card
  grids, gradient washes).
- **Equal-size blocks** in grids (the services 2-2-2 grid).
- Motion is restrained: one hero load sequence, scroll-driven process, user-
  triggered transitions. Respect `prefers-reduced-motion`.

## Fluid scale (important)

`globals.css` sets `html { font-size }` per device class so 1rem tracks the
viewport width:

| Class | Width | 1rem |
|---|---|---|
| Phone | < 640px | clamp(14px, 100vw/24.375, 18px) → 16px at 390 |
| Tablet | 640–1023px | 100vw/48 → 16px at 768 |
| Desktop | ≥ 1024px | max(13px, 100vw/90) → 16px at 1440 |

Use **rem** (and Tailwind spacing, which is rem) for everything. px values do
not scale. Media-query breakpoints still use the browser default rem, so
`sm/md/lg` switch at the usual pixel widths.

## Tokens (`@theme` in globals.css)

- Page: `paper #f6f2ea`, `paper-2`, `paper-3`, `surface #fff`.
- Ink: `ink #16181b`, `ink-2 #474c52`, `ink-3 #80868c`, `line`.
- Service colours (soft variant `-soft`, darker `-2`):
  - SEO: `cobalt #3346d3`
  - Websites: `coral #ec6a4c`
  - CRM / Nirman CRM: `forest #123b32`, `mint #9fdcb8`
  - Software: `ink` panel with `peacock #1f6f78` accents
  - Mobile apps: `marigold #f4b23e`
  - Marketing: rose `#f8dde6` panel, `#d9668f` accent
  - Extra: `lilac` (process section background)
- Shadows: `shadow-panel`, `shadow-scene`, `shadow-device`, `shadow-lift`.

## Type

- Display/headings: **Mona Sans** (variable, width axis), utilities
  `display` (wdth 118, weight 760), `heading` (wdth 112, 700), `title` (106, 650).
- Body: **Funnel Sans**.
- Both via `next/font/google` in `src/app/layout.tsx`.
- Mockup headlines inside a Stage use `.mock-display`.
- The user explicitly likes this typography; do not change fonts.

## Layout

- `container-site` utility: full width, `max-width 124rem`, side padding
  1rem / 1.5rem / clamp(2rem, 3vw, 4rem). Use it for every section.
- Rounded panels `rounded-[2rem]`–`[2.5rem]`; buttons are pills.
- Buttons: `button(variant, size)` in `src/components/ui/button.ts`;
  variants `primary` (ink→cobalt hover), `accent` (marigold), `secondary`,
  `light`, `ghostLight`.

## Shared building blocks (`src/components/ui/`, Phase 1)

| Component | Use |
|---|---|
| `Container` | `container-site` wrapper; `as` prop for the tag |
| `Section` | page band: `tone` paper/surface/lilac/mint/ink/forest, `space` none/md/lg, `labelledBy` |
| `Heading` | `level` 1-4, `size` hero/section/sub/card (Mona Sans voices) |
| `ButtonLink` | link styled by `button(variant,size)`; next/link for internal paths |
| `Card` | rounded colour block, `tone` = service colours, surface, paper, ink, forest |
| `Chip` | pill label with optional colour `dot` |
| `Breadcrumbs` | visible trail + BreadcrumbList JSON-LD; Home first, current page last |

Pillar colours in menus/footer: SEO cobalt, Web coral, Software peacock,
Marketing `#d9668f` (`pillarDots` arrays in header and footer).

## Site chrome (every page, from `layout.tsx`)

- **Header**: floating pill; transparent at top, frosted after 24px scroll or
  when a menu is open. Services opens a 4-column mega menu + "Not sure" strip;
  Free tools opens a list. Hover (80ms open / 180ms close) or click; Escape and
  outside click close. "Free SEO audit" shows from 1280px, "Get a quote" from
  640px. Phones: full-screen sheet with nested accordions + 3 buttons.
- **Footer**: ink panel, six-colour stripe; columns brand, Services (pillar +
  3 children), Product & tools, Company, Contact; bottom bar legal links.
- **Widgets**: WhatsApp button (forest circle, generic chat icon, md and up),
  phone sticky bar (Call / WhatsApp / Get a quote), consult card (after 90% of
  the first screen, hidden while the cookie banner shows, dismissal stored),
  cookie banner (ink card, Accept all / Only necessary, key `nirman-consent`).
- Menus fade in with `.anim-pop` (0.18s).

## Mockup system

- **`Stage`** (`src/components/stage.tsx`): container that scales a fixed-size
  composition to its width. Inside it Tailwind spacing = 1 design px
  (`w-560` = 560 design px) and `.fs-N` sets font size in design px. Props
  `w,h` (below lg) and `wLg,hLg` (lg and up). Nested Stages are safe.
- **`Device`** / **`PhoneFrame`** (`src/components/mockups/frames.tsx`): real
  device photos (`iphone`, `iphone-alt`, `macbook`, `macbook-alt`, `imac`) with
  transparent glass. Children render on the screen, clipped by an exact glass
  mask so UI fills edge to edge. Data in `src/content/devices.ts`.
- Device images are cut by `nirman-site/scripts/make-device-cutouts.py` from
  originals in `nirman-site/design-assets/raw/` (sources/licences in
  `design-assets/README.md`).
- Concept screens: `mockups/concept-site.tsx` (architecture studio desktop +
  mobile, ceramics store), CRM screens in `hero.tsx` and `nirman-crm.tsx`,
  service mockups in `components/services/*.tsx`. Brands inside mockups are
  concepts and the page says so.
- Charts: `mockups/charts.tsx` (`LineChart`, `Sparkline`, `Bars`, `Donut`).

## Photography

- 27 Unsplash photos self-hosted in `nirman-site/public/photos/`, catalogued in
  `src/content/photos.ts` (key, src, original Unsplash id, alt text).
- Use `<Photo name="key" sizes="…" />` (`src/components/photo.tsx`, next/image).
- People photos are atmosphere only; never captioned as our team or clients.

## Section patterns in use

| Section | Pattern |
|---|---|
| Hero | Desktop height = photo height (`46vw + 4rem`), not 100svh; text left (42%), photo scene right (60%): real iMac desk photo with our website on the iMac, MacBook with Nirman CRM, iPhone with shop app; fades into the page. Phones: both CTAs share one row |
| Services | 2-2-2 grid of equal `ServiceCard`s (tone colour, chip, pillar tag, title, body, 4 points, "Explore <pillar>" hub link, mockup bleeding off the bottom) |
| Nirman CRM | Deep forest band, interactive dashboard with tabs Dashboard/Pipeline/Leads/Follow-ups/Reports; 2 callout cards + 6 features below |
| Our work | Editorial case-study blocks (wide, 7/5 pair, wide compact), each with 2 metric tiles, all tagged "Sample case study"; "See all our work" |
| Process | Pinned section; vertical scroll moves 5 stage cards horizontally; clickable stage rail sized to the stage count |
| Team | Sample team grid (initials avatars), then "What working with us is like": photo + weekly-update mockup, 6 reasons |
| Free tools | Marigold-soft panel: SEO audit URL form left, list of the other 5 tools right |
| Testimonials | 3 quote cards (peacock / surface / lilac), "Sample quotes" tag, logo placeholder slots |
| FAQ | Sticky title left, `<details>` accordion right (plus icon rotates to a cross) |
| Final CTA | Coral panel, goal chips that pre-fill a mailto, contact card |
| Footer | Ink panel with six-colour stripe |
| Service page | `components/service-page.tsx` (redesigned 2026-10-21): hero (hubs only: pillar dot label; H1, outcome, Get a quote + Free SEO audit/Book a call, homepage card mockup) → **Who it's for** (`service-audience.tsx`: vertical tabs per kind of business + large photo with a "Their customers search" bar and a "What changes" card; phones get swipeable photo cards) → What's included (6-col grid, leading pairs) or, on hubs, cards per child service with that service's mockup (`card.art`) on a pillar-soft panel, no people photos → **How it works** (`service-process.tsx`: pinned photo + mockup panel crossfades as the steps scroll past; phones stack each step with its visual) → **What you get** (`service-reports.tsx`: report tabs with a large mockup from `service-art.tsx`) + Results (SAMPLE) + Tools we use (Simple Icons logos, lettered tile fallback) → FAQ → coral quote band. No engagement models or related links (user decision). |
