# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** rebuild from scratch (2026-11-06). Step 1 done: all PAGE-PLAN
  decisions made (see DECISIONS.md): 18 pages, full-width page, keyword
  headline, Poppins, four true facts, SAMPLE results, Claude builds/downloads
  artwork. Step 2: build the homepage from `docs/REFERENCE-VIDEO.md`.
- **Old site removed from the app:** moved (not deleted) to
  `E:\nirman2\old-site\` (gitignored; user approved the move; the user may
  delete it any time). Also in GitHub commit `2eba621` / local tag
  `archive/v2`.
- **New minimal app (done, verified):** `src/app/layout.tsx` (Poppins via
  next/font, metadata), `globals.css` (v4 tokens from the video, bounded
  scale clamp 15 to 17px), blank `page.tsx` (logo only), `src/content/site.ts`
  (brand + placeholders), `src/components/logo.tsx` (mark recoloured: ink +
  orange), favicon restored. tsc, lint, build pass; preview shows Poppins,
  page bg #f5f7f9, no console errors. OG image route and robots/sitemap not
  recreated yet (do with the SEO pass).
- **Header + hero (done, verified 1440 and 375):** `components/site-header.tsx`
  (client; nav from `content/nav.ts`, Services dropdown, mobile menu, active
  underline, CTAs Get a quote + Free SEO audit), `components/ui/button.tsx`,
  `components/home/hero.tsx` (3-line H1 with drawn blue sparks + orange
  underline, subtitle, Get a quote; phone stage with rings and drawn loop),
  `components/home/phone-screen.tsx` (Nirman CRM mobile UI in HTML, labelled
  "Sample data"). Entrance timing in `globals.css` per REFERENCE-VIDEO 4.2
  (backwards fill; reduced motion disables all). tsc, lint, build pass.
- **Hand in the hero (done, verified 1440 and 375):** Unsplash photo
  u1b6E6IkSGQ (free licence, credited in `src/content/image-credits.ts`),
  cut out by `scripts/cut-hand.py` (source photo kept outside the repo; rerun
  with `python scripts/cut-hand.py <photo.png> public/images/hero`) into
  `public/images/hero/hand-back.webp` + `hand-front.webp` (fingertips over the
  phone edge). HTML phone sits exactly over the photo's phone (percent
  coordinates in `hero.tsx`); screen designed at xl size and scaled by `--s`.
  Fix 2026-11-06: fingertip layer is now the photo's own right-bezel strip
  (x >= 1099, rows 680-1300), HTML bezel 4.8% of phone width, so no black
  line through the fingers. Responsive: two columns from 768px; hand widths
  18.5 / 20 / 25 / 28.75rem (base / sm / lg / xl); hand rises from the
  section bottom; rings centred on the phone. Checked 375, 768, 1009, 1440.
- **Clouds (done):** `components/home/cloud.tsx`; 5 around the phone in
  `hero.tsx` (3 behind, 2 in front, level, fade in 0.5-0.9 s then slow
  sideways drift; studied from video frames 1.2-3.2 s) and 2 in the app's sky
  on the phone screen. Sparks: after "SEO" on phones, after "and" from 768px.
- **Hero entrance rebuilt from measurements (done):** REFERENCE-VIDEO 4.2
  rewritten with per-frame tracking (scratchpad `track_hero.py`). H1 slides
  in from the left + darkens; nav slides in from the right, logo from the
  left; Login/Register slide in from off-right; phone swings in tilted,
  overshoots left (-8deg) and glides back to +4deg (dense keyframes
  `phone-move`/`phone-tilt`); near clouds ride with the phone; underline
  draw bug fixed. Verified by seeking paused animations at 1440 and 375.
- **Next task:** facts band (blue, four true facts), then What we do; reveal
  rule REFERENCE-VIDEO 4.3 (needs a small IntersectionObserver reveal
  component). Re-measure hero timings at 0.016 s steps when tuning "exact".
- **Not committed:** header + hero + hand. Never commit the reference video or its
  frames.

## Done so far

- Redesign v3 R0 (2026-10-27): `docs/REDESIGN.md` + `docs/sitemap-v3.json`
  (95 static pages: 39 L1, 41 L2, 15 L3); bounded scale applied (root max 17px,
  container 96rem, hero boxed with `cqw`); `/homepage1/` built (hero with video
  and animated HTML cards, promise strip, 4 pillar cards, video band, Nirman
  CRM screens, scroll process, industries, sample work, tools, AEO answers,
  quote form); new button variants (`tonal`, `quiet`, `tonalOn`, `mint`);
  shared `QuoteSection`; two Pexels clips in `public/videos`.

- Homepage design complete and approved (see `docs/DESIGN.md`).
- Phase 0: git, handoff data ported, trailing slashes, decisions C1–C9.
- Phase 1: UI primitives, header (mega menu, Tools dropdown, mobile menu),
  footer, WhatsApp button, sticky bar, pop-up, cookie banner, 404; all in
  `layout.tsx`. Checked at 390 / 1024 / 1440.
- Phase 2: homepage follows the handoff (C1–C6, C9); copy in
  `content/home.ts`; samples labelled on page.
- Phase 3: page registry `src/content/pages.ts` (39 pages: path, title = H1,
  description, noindex; add new pages here first, gotcha 24).
  `src/lib/seo.ts`: `pageMetadata()`, `registryMetadata(path)`, 9 JSON-LD
  builders; `<JsonLd>` in `components/json-ld.tsx`. `/og.png` (gotcha 23),
  robots (AI crawlers allowed), sitemap (38 URLs), llms.txt. 38 stubs via
  `components/stub-page.tsx`. Acceptance script passed (unique titles and
  descriptions, one H1, trailing-slash canonicals, homepage links resolve).

## Phase checklist

- [x] R0 Plan and homepage1 (awaiting review)
- [ ] R1 Foundations · [ ] R2 Homepage · [ ] R3 Templates · [ ] R4 Content
- [ ] R5 Systems (leads, CMS, tools) · [ ] R6 SEO infrastructure · [ ] R7 Launch

Old phases (kept for history; superseded from Phase 5 on):

- [x] Phase 0: Alignment and setup
- [x] Phase 1: Design system and layout shell
- [x] Phase 2: Homepage aligned to handoff
- [x] Phase 3: SEO foundation
- [x] Phase 4: Service pages (19)
- [ ] Phase 5: Lead capture
- [ ] Phase 6: Nirman CRM page
- [ ] Phase 7: Free SEO audit
- [ ] Phase 8: Client-side tools + hub
- [ ] Phase 9: Sanity, blog, case studies
- [ ] Phase 10: Remaining pages
- [ ] Phase 11: Launch readiness

## Current phase tasks

- [x] P4.1 Content model `src/content/services/*.ts` (types, shared engagement models,
  4 pillar files with structure only, index with build-time link checks)
- [x] P4.2 Service page template + hub variant (`components/service-page.tsx`;
  all 19 routes use it, stub until content exists)
- [x] P4.3 SEO pillar content (hub + 4)
- [x] P4.4 Web pillar (hub + 5)
- [x] Service page redesign for SEO + web (user request): Who it's for tabs,
  mockup hub tiles, scroll-driven How it works, What you get reports, tool
  logos; engagement models, related links and "Part of" line removed
- [x] P4.5 Software pillar (hub + 4) with 10 software mockups (`sw-*` in
  `service-art.tsx`); CRM page points to Nirman CRM ("Book a demo") in its FAQ
- [x] P4.6 Marketing pillar (hub + 2) with 8 marketing mockups (`mk-*`);
  WhatsApp stays a lettered tile in tool logos (C2)
- [x] P4.7 Short quote form on every service page (`quote-form.tsx`):
  validates, then `sendLead()` opens the email app pre-filled until Phase 5

## Half-finished work

None.

## Notes for the next session

- Phase 4 acceptance check passed for all 19 service pages (Service +
  BreadcrumbList + FAQPage JSON-LD, one H1, no stub). The only rupee figure
  is the sample "Consultation fee" inside the homepage clinic-app mockup
  (a client's app screen, not our price).

- Service page copy (all 19 pages) is my draft; the user has not
  reviewed it. Results are all `sample: true`. "Platforms and tools" lists
  (e.g. Screaming Frog, Justdial, Shiprocket) and process timings are my
  guesses: confirm with the client. Keep result metrics short ("1.7 s",
  detail in the label): long ones wrap in the tile.
- 28 new Unsplash photos in `public/photos` (catalogued in `photos.ts`);
  all are now in use.
  Tool logos load from cdn.simpleicons.org at runtime (as on the homepage).

- Page descriptions in `pages.ts` are my drafts; user has not reviewed them.
- Organization JSON-LD has no `logo` yet (needs a square PNG ≥ 112px).
- OG image uses bundled Geist; Mona Sans needs a TTF download (ask first).
- Sitemap has no `lastmod`; add real dates with the CMS in Phase 9, plus
  `/work/[slug]/` and `/blog/[slug]/` URLs.
- Footer social chips (LinkedIn, Instagram, X) are text-only `#` placeholders
  in `site.ts`; confirm with the client which profiles exist.
- FinalCta primary button is still a `mailto:`; replace with the quote form in
  Phase 5.
- Lighthouse accessibility (target ≥ 95) not measured yet; Phase 11.
- Not yet confirmed by the user (my calls, easy to revert): sample case-study
  clients 1–2 renamed to Mitti Ceramics / Neelgiri Retreat; old "Why us"
  section folded into Team instead of dropped.

## Last session (2026-10-21, later)

Phase 4: P4.1–P4.4 done, then the service page redesign the user asked for
(see DECISIONS). Repo pushed to GitHub (`origin`, main).

## Earlier session (2026-10-21)

Phase 3 done and committed (2f1dae6): root metadata + `/og.png` share
image, `src/lib/seo.ts` helpers + `<JsonLd>`, robots/sitemap/llms.txt,
page registry `pages.ts`, 38 stub routes; `site.bookingUrl` now
`/book-a-call/`. Why a registry: one list keeps metadata, sitemap, llms.txt
and stubs in sync. No user decisions this session. tsc, lint, build pass
(44 static routes).
