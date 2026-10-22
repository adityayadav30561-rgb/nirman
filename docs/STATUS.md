# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** 5 (Lead capture), not started. Phase 4 done (19 service pages).
- **Next task:** P5.1 `app/api/lead/route.ts` (zod, rate limit, Turnstile,
  CRM endpoint with log + email fallback). Then swap the body of
  `sendLead()` in `src/lib/lead.ts` to POST there: the service page form
  (`components/quote-form.tsx`) already sends a `Lead` through it.
- **Blockers:** Phase 5 needs the CRM endpoint, booking tool and Turnstile
  keys from the client (build with stubs/env flags until then). Client inputs pending (list at the end of
  PLAN.md) block parts of Phases 5, 7, 9, 11.

## Done so far

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
