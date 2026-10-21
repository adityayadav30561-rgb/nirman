# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** 3 (SEO foundation), not started.
- **Next task:** P3.1 root metadata (title template `"%s | Nirman"`,
  `metadataBase` from `NEXT_PUBLIC_SITE_URL`, default OG image). Read the
  Next 16 metadata guide in `node_modules/next/dist/docs/` first.
- **Blockers:** none for Phases 3–4. Client inputs pending (list at the end of
  PLAN.md) block parts of Phases 5, 7, 9, 11.

## Done so far

- Homepage design complete and approved (see `docs/DESIGN.md`).
- Phase 0: git, handoff data ported, trailing slashes, decisions C1–C9.
- Phase 1: UI primitives, multi-page header with Services mega menu + Tools
  dropdown + mobile accordion menu, 4-column footer, WhatsApp button, phone
  sticky bar, consult pop-up, cookie banner, 404 page. All mounted in
  `layout.tsx` for every page. Checked at 390 / 1024 / 1440.
- Phase 2: homepage follows the handoff (C1–C6, C9). Order: Hero → Services →
  Nirman CRM → Our work → Process → Team → Free tools → Testimonials → FAQ →
  final CTA. All copy/data from `content/home.ts`; samples labelled on page.
  Key changes: marketing card is WhatsApp & email via Nirman CRM; no ads/
  social logos or mockup content; every card links to its pillar hub; CRM
  CTAs "Book a demo" / "Need a custom CRM?"; 4 SAMPLE case studies (clients
  1–2 renamed to the visuals' brands Mitti Ceramics, Neelgiri Retreat);
  5-stage process; `why-us.tsx` folded into `team.tsx`; new `free-tools.tsx`,
  `testimonials.tsx`, `faq.tsx` (FAQPage JSON-LD). `LineChart` NaN fix.

## Phase checklist

- [x] Phase 0: Alignment and setup
- [x] Phase 1: Design system and layout shell
- [x] Phase 2: Homepage aligned to handoff (one acceptance item deferred, below)
- [ ] Phase 3: SEO foundation
- [ ] Phase 4: Service pages (18)
- [ ] Phase 5: Lead capture
- [ ] Phase 6: Nirman CRM page
- [ ] Phase 7: Free SEO audit
- [ ] Phase 8: Client-side tools + hub
- [ ] Phase 9: Sanity, blog, case studies
- [ ] Phase 10: Remaining pages
- [ ] Phase 11: Launch readiness

## Current phase tasks

- [ ] P3.1 Root metadata: title template, `metadataBase`, default OG image
- [ ] P3.2 `src/lib/seo.ts` metadata + JSON-LD helpers
- [ ] P3.3 `app/sitemap.ts`, `app/robots.ts` (allow AI crawlers), `llms.txt`
- [ ] P3.4 Stub routes for every handoff §2 URL (title + H1 + "coming soon")

## Half-finished work

None.

## Notes for the next session

- **Phase 2 acceptance, deferred:** "all homepage links resolve". 38 internal
  URLs on `/` all 404 until P3.4 stubs exist (list = handoff §2 + `/sitemap.xml`).
  Re-run the link check after P3.4 (fetch every `a[href]`/`form[action]` on `/`).
  Forbidden-content grep passed: "Meta" only in "Meta tag & SERP preview";
  "₹" only inside client mockups.
- Footer social chips (LinkedIn, Instagram, X) are text-only `#` placeholders
  in `site.ts`; confirm with the client which profiles exist.
- FinalCta primary button is still a `mailto:`; replace with the quote form in
  Phase 5.
- Lighthouse accessibility (target ≥ 95) not measured yet; Phase 11.
- `site.bookingUrl` is still `#contact`; switch to `/book-a-call/` after P3.4.

## Last session (2026-10-21)

Phase 2 done (P2.1–P2.7). tsc, lint, build pass. Committed P2.1–P2.3 as
8c212f7; P2.4–P2.7 not committed yet.
