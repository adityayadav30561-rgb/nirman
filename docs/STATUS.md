# Status

Update this file at the end of every session and after each finished task.
Keep it under ~80 lines: it is read at the start of every session.

## Current position

- **Phase:** 2 (Homepage aligned to the handoff), not started.
- **Next task:** P2.1 hero CTAs from `content/home.ts` `hero` (decision C4).
  Then P2.2 services grid (C1 marketing card rebuild, C2 remove Meta/WhatsApp
  logos, C3 pillar tags + hub links).
- **Blockers:** none for Phases 2–4. Client inputs pending (list at the end of
  PLAN.md) block parts of Phases 5, 7, 9, 11.

## Done so far

- Homepage design complete and approved (see `docs/DESIGN.md`).
- Phase 0: git, handoff data ported, trailing slashes, decisions C1–C9.
- Phase 1: UI primitives, multi-page header with Services mega menu + Tools
  dropdown + mobile accordion menu, 4-column footer, WhatsApp button, phone
  sticky bar, consult pop-up, cookie banner, 404 page. All mounted in
  `layout.tsx` for every page. Checked at 390 / 1024 / 1440.
- Homepage sections still show pre-decision content (Phase 2 fixes it).

## Phase checklist

- [x] Phase 0: Alignment and setup
- [x] Phase 1: Design system and layout shell
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

- [ ] P2.1 Hero: "Get a free SEO audit" + "Book a consultation" + note (C4)
- [ ] P2.2 Services grid: C1 WhatsApp & email card, C2 logos, C3 pillar tags/links
- [ ] P2.3 Nirman CRM section: "Book a demo" + "Need a custom CRM?" (C5), features/callouts
- [ ] P2.4 Case studies section from `content/home.ts` (SAMPLE), "See all our work"
- [ ] P2.5 Process: handoff's 5 stages (C6), keep horizontal scroll
- [ ] P2.6 New sections: Team, Free tools strip, Testimonials, FAQ + CTA (FAQPage JSON-LD)
- [ ] P2.7 Final section order (see PLAN.md Phase 2)

## Half-finished work

None.

## Notes for the next session

- Lighthouse accessibility score (Phase 1 acceptance, target ≥ 95) was not
  measured; check it in Phase 11 or with Chrome DevTools.
- Header/footer links to `/services/...`, `/tools/...`, `/crm/` etc. 404 until
  the P3.4 stub pages exist. Expected.
- `site.bookingUrl` is still `#contact`; switch to `/book-a-call/` after P3.4.
- Old homepage-only anchor nav (`nav`, `services` in site.ts) has been removed.

## Last session (2026-10-21)

Phase 1 done. New: `src/components/ui/*` primitives, `site-header.tsx`
rewrite (mega menu, tools dropdown, mobile accordions, Suspense-wrapped
`usePathname`), `site-footer.tsx` rewrite, `site-widgets.tsx`,
`lib/stored.ts`, `app/not-found.tsx`, `.anim-pop` CSS class,
`tools/shots/shotjs.mjs` + `evalasync.mjs`. Gotchas 14–18 added.
tsc, lint, build pass.
