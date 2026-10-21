# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** 4 (Service pages, 18), not started.
- **Next task:** P4.1 content model `src/content/services/*.ts` (one file per
  pillar: hub + children). Service routes already exist as stubs; replace
  each `page.tsx`. Use `registryMetadata()` + `serviceLd`/`faqPageLd`/
  `Breadcrumbs` from P3.
- **Blockers:** none for Phase 4. Client inputs pending (list at the end of
  PLAN.md) block parts of Phases 5, 7, 9, 11.

## Done so far

- Homepage design complete and approved (see `docs/DESIGN.md`).
- Phase 0: git, handoff data ported, trailing slashes, decisions C1–C9.
- Phase 1: UI primitives, multi-page header with Services mega menu + Tools
  dropdown + mobile accordion menu, 4-column footer, WhatsApp button, phone
  sticky bar, consult pop-up, cookie banner, 404 page. All mounted in
  `layout.tsx` for every page. Checked at 390 / 1024 / 1440.
- Phase 2: homepage follows the handoff (C1–C6, C9). All copy/data from
  `content/home.ts`; samples labelled on page. 4 SAMPLE case studies,
  5-stage process, Team (with old Why us), Free tools, Testimonials, FAQ.
- Phase 3: SEO foundation.
  - Page registry `src/content/pages.ts`: all 39 handoff §2 pages with path,
    title (= H1), description, section, noindex. Single source for metadata,
    sitemap, llms.txt and stubs. Add new pages here first.
  - `src/lib/seo.ts`: `pageMetadata()`, `registryMetadata(path)`, JSON-LD
    builders (Organization, ProfessionalService, WebSite, Service,
    SoftwareApplication, WebApplication, FAQPage, BreadcrumbList, Article);
    `<JsonLd>` in `components/json-ld.tsx`. Placeholder contact values are
    left out of JSON-LD automatically.
  - Share image `/og.png` (route handler, gotcha 23). `robots.txt` (AI
    crawlers named and allowed), `sitemap.xml` (38 URLs), `llms.txt`.
  - 38 stub routes via `components/stub-page.tsx` (breadcrumbs, H1,
    "Coming soon", Get a quote / Book a demo for CRM).
  - Acceptance script passed: 39 pages 200, unique titles + descriptions,
    one H1 each, canonical with trailing slash, thank-you noindex; all 40
    homepage internal links resolve (closes the deferred Phase 2 item).

## Phase checklist

- [x] Phase 0: Alignment and setup
- [x] Phase 1: Design system and layout shell
- [x] Phase 2: Homepage aligned to handoff
- [x] Phase 3: SEO foundation
- [ ] Phase 4: Service pages (18)
- [ ] Phase 5: Lead capture
- [ ] Phase 6: Nirman CRM page
- [ ] Phase 7: Free SEO audit
- [ ] Phase 8: Client-side tools + hub
- [ ] Phase 9: Sanity, blog, case studies
- [ ] Phase 10: Remaining pages
- [ ] Phase 11: Launch readiness

## Current phase tasks

- [ ] P4.1 Content model `src/content/services/*.ts`
- [ ] P4.2 Service page template + hub variant
- [ ] P4.3 SEO pillar content (hub + 4)
- [ ] P4.4 Web pillar (hub + 5)
- [ ] P4.5 Software pillar (hub + 4)
- [ ] P4.6 Marketing pillar (hub + 2)
- [ ] P4.7 Short quote form on each page (mailto fallback until Phase 5)

## Half-finished work

None.

## Notes for the next session

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

## Last session (2026-10-21)

Phase 3 done (P3.1–P3.4, uncommitted at time of writing): metadata, OG image,
seo helpers, robots/sitemap/llms.txt, page registry, 38 stubs;
`site.bookingUrl` now `/book-a-call/`. tsc, lint, build pass (44 static
routes).
