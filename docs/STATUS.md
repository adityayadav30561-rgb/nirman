# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** 1 (Design system and layout shell), not started.
- **Next task:** P1.1 extract UI primitives into `src/components/ui/`
  (Container, Section, Heading, Button, Card, Chip, Breadcrumbs). Read
  `docs/DESIGN.md` "Tokens", "Type", "Layout" first.
- **Blockers:** none for Phases 1–4. Client inputs pending (list at the end of
  PLAN.md) block parts of Phases 5, 7, 9, 11.

## Done so far

- Homepage design complete and approved (see `docs/DESIGN.md`).
- Phase 0 complete: git repo, handoff nav/contact data and homepage copy
  ported, trailing slashes on, conflicts C1–C9 decided, unused files removed.
- The homepage components do NOT use `content/home.ts` yet and still show
  the pre-decision content (marketing ads card, Meta/WhatsApp logos, old hero
  buttons, 6 process stages, "Request a demo"). Phase 2 applies C1–C6.

## Phase checklist

- [x] Phase 0: Alignment and setup (P0.1–P0.6)
- [ ] Phase 1: Design system and layout shell
- [ ] Phase 2: Homepage aligned to handoff
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

- [ ] P1.1 UI primitives in `src/components/ui/` (+ document in DESIGN.md)
- [ ] P1.2 Header with Services/Tools dropdowns + mobile full-screen menu
      (data: `serviceGroups`, `toolLinks`, `mainNav` in `content/site.ts`)
- [ ] P1.3 Footer, 4 columns + bottom bar (`companyLinks`, `legalLinks`)
- [ ] P1.4 Floating WhatsApp button (generic chat icon) + mobile sticky bar
- [ ] P1.5 ConsultCard pop-up (after hero, dismissal in localStorage)
- [ ] P1.6 Cookie consent banner
- [ ] P1.7 not-found.tsx (404)

## Half-finished work

None.

## Notes for the next session

- `content/site.ts` now has the handoff nav data (`serviceGroups`, `toolLinks`,
  `mainNav`, `companyLinks`, `legalLinks`) plus the old homepage anchors
  (`nav`, `services`) that the current header/footer still use. Remove the old
  ones when P1.2/P1.3 replace them.
- `site.bookingUrl` is still `#contact`; switch to `/book-a-call/` once that
  route exists (P3.4 stub).
- Linked pages (`/services/...`, `/tools/...`, `/crm/`) don't exist until the
  P3.4 stubs, so new header links will 404 until then. That is expected.

## Last session (2026-10-21)

Phase 0 finished. P0.1 git (c18f9d2). P0.5 decisions (see DECISIONS.md).
P0.2 `content/site.ts` merged with handoff nav data, `NEXT_PUBLIC_SITE_URL`,
`.env.example`, `phoneHref`/`whatsappHref`/`copyrightYear`. P0.3
`content/home.ts` (hero, pillars, cardPillar map, crm, features, journey,
SAMPLE case studies/team/testimonials, FAQs). P0.4 `trailingSlash: true`
(verified /about -> 308 /about/). P0.6 removed starter SVGs, unused drawn art,
`Panel`, `Sparkline`. tsc, lint, build pass.
