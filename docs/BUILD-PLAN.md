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
- [x] H3b Motion rework (user rule): CSS keyframes removed; GSAP for header,
      hero (calm load + scroll parallax), facts and services; protocol
      section 5 (GSAP / Framer Motion / Three.js only)
- [x] H4 Where we work: dotted world map in code, India office plus markets
      we serve (US, UAE, UK), Service / Timeline / Get a quote bar
      (`04-map.md`, variant A, GSAP map reveal)
- [x] H5 Nirman CRM: chat bubbles and CRM cards, Book a demo (`05-crm.md`,
      variant B, scroll-played conversation)
- [x] H5b Nirman CRM redo (user: "no screens"): blue product band with real
      product screens in code, tabs + phone (`05-crm.md` round 2, variant C)
- [x] H6b Results redone with real SEO figures, and H9 Selected work added (2026-11-10; `06-results.md` round 2, `09-work.md`)
- [x] H6 Results: SAMPLE testimonials (`06-results.md`, variant B,
      spotlight with business-type tabs)
- [x] H7 Questions: email + Submit, FAQ rows with FAQ markup
      (`07-questions.md`)
- [x] H8 Footer (blue) (`08-footer.md`)
- [x] H9 Whole-page review at 375 / 768 / 1440 / 1920
      (`00-page-review.md`); homepage metadata and JSON-LD
- [x] H10 Shared motion setup: `components/motion/gsap.ts` + one client
      wrapper per section (replaced the first CSS `Reveal`, 2026-11-06)

## P: Other pages (option B, 18 pages; order can change with the user)

- [x] P1 `/services/` and the four service pages (one template; `docs/sections/p1-services.md`)
- [x] P2 `/nirman-crm/` (`docs/sections/p2-crm-page.md`; real CRM design, 8 screens)
- [x] P3 `/get-a-quote/` multi-step form and `/thank-you/` (`docs/sections/p3-get-a-quote.md`)
- [x] P4 `/contact/`, `/about/` (`docs/sections/p4-contact-about.md`; team, address and booking wait for the client)
- [x] P5a `/work/` with real work from the user: selected work, three list pages, fifteen project pages, redone as case studies in round 3 (`docs/sections/p5-work.md`)
- [ ] P5b `/industries/` (**dropped for now**, user 2026-11-11: links removed)
- [x] P6 `/tools/seo-audit/`: free SEO audit with scanning animation, score, gated PDF report (`docs/sections/p6-seo-audit.md`); `/tools/` redirects to it. Needs `PAGESPEED_API_KEY` on Vercel for the speed part.
- [x] P7a `/blog/` on Sanity: list, category and article pages, the editor at `/studio/`, publish hook (`docs/sections/p7-blog.md`). **Waits for the user's Sanity project ID to go live.**
- [x] P7b `/privacy-policy/`, `/terms/` (general texts, not lawyer-reviewed; `docs/sections/p7b-legal.md`)

## S: Systems and launch

- [x] S1 Lead capture: `/api/lead/` emails every form through Resend, with spam protection and an email-app fallback (`docs/sections/s1-forms.md`). Live since 2026-11-11.
- [x] S2a sitemap, robots, llms.txt, 404 page (2026-11-11; `docs/sections/p7b-legal.md`)
- [ ] S2 SEO infrastructure (rest): page registry, metadata, OG image, robots,
      sitemap, llms.txt, JSON-LD (see `docs/REDESIGN.md` sections 8 and 12)
- [x] S5 Cookie consent banner with Google Consent Mode v2 (`docs/sections/s5-consent.md`)
- [ ] S3 Accessibility and performance pass (Lighthouse at least 95)
- [ ] S4 Launch checklist (domain, analytics, real contact details).
      (The placeholder testimonials are gone since 2026-11-10: Results now
      shows real SEO figures. Still to confirm: each named client agrees.)
