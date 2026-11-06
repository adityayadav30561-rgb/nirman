# Build plan (rebuild from 2026-11-06)

Replaces the old phase plan (`docs/archive/PLAN-v2.md`). Pages and content:
`docs/PAGE-PLAN.md`. Look and motion: `docs/REFERENCE-VIDEO.md`. How each
section is designed: `docs/DESIGN-PROTOCOL.md` (3 to 4 variants, pick the
best). Tick a task only when it is built, verified, recorded and pushed.

## H: Homepage (section by section, in page order)

- [x] H0 Foundations: minimal app, Poppins, v4 tokens, bounded scale
- [x] H1 Header and hero (`docs/sections/01-hero.md`), with the hand, clouds
      and measured entrance
- [x] H2 Facts band (blue): 2 h reply, 48 h proposal, 3 to 6 wk website,
      100% your code and data (`02-facts.md`, variant B)
- [x] H3 What we do: four services with icons and buttons (`03-services.md`,
      variant D, editorial list)
- [ ] H4 Where we work: dotted world map in code, India office plus markets
      we serve (US, UAE, UK), Service / Timeline / Get a quote bar
      (`04-map.md`)
- [ ] H5 Nirman CRM: chat bubbles and CRM cards, Book a demo (`05-crm.md`)
- [ ] H6 Results: SAMPLE cards in a sliding row (`06-results.md`)
- [ ] H7 Questions: email + Submit, FAQ rows with FAQ markup
      (`07-questions.md`)
- [ ] H8 Footer (blue) (`08-footer.md`)
- [ ] H9 Whole-page review at 375 / 768 / 1440 / 1920
      (`00-page-review.md`); homepage metadata and JSON-LD
- [x] H10 Shared reveal-on-scroll component (REFERENCE-VIDEO 4.3):
      `components/reveal.tsx` + `rv-icon` / `rv-text` in globals.css, built
      with H3; reuse for every later section

## P: Other pages (option B, 18 pages; order can change with the user)

- [ ] P1 `/services/` and the four service pages (one template)
- [ ] P2 `/nirman-crm/` (screens from `design-handoff/crm-screens.html`)
- [ ] P3 `/get-a-quote/` multi-step form and `/thank-you/`
- [ ] P4 `/contact/`, `/about/`
- [ ] P5 `/work/` (SAMPLE), `/industries/`
- [ ] P6 `/tools/`, `/tools/seo-audit/`
- [ ] P7 `/blog/`, `/privacy-policy/`, `/terms/`

## S: Systems and launch

- [ ] S1 Lead capture (form API, email), spam protection
- [ ] S2 SEO infrastructure: page registry, metadata, OG image, robots,
      sitemap, llms.txt, JSON-LD (see `docs/REDESIGN.md` sections 8 and 12)
- [ ] S3 Accessibility and performance pass (Lighthouse at least 95)
- [ ] S4 Launch checklist (domain, analytics, real contact details)
