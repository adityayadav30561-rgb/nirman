# P1 Services hub and the four service pages

Status: built and verified (2026-11-07)
Routes: `/services/`, `/services/websites/`, `/services/seo/`,
`/services/software/`, `/services/marketing/` (fixed folders in
`nirman-site/src/app/services/`, each rendering the shared template)
Template: `src/components/services/service-page.tsx` (sections),
`service-route.tsx` (route body, metadata, JSON-LD), `service-visuals.tsx`
(hero pictures). Copy: `src/content/service-pages.ts`.

## Job
Explain each service line clearly, show who it is for and what is
included, set expectations (how it works, what you get), and end in Get a
quote (client rule) with the service already ticked.

## Template sections (PAGE-PLAN section 3)
1. Hero: eyebrow, keyword headline, line, Get a quote (scrolls to the form
   on the page), three points, a picture built in code (websites: a
   clinic site in a browser with mobile and speed checks; SEO: a search
   results page with the business on top and a local map card; software:
   the Nirman CRM Leads screen + phone; marketing: Campaigns screen + phone).
2. Who it is for: four kinds of business.
3. What is included: the handoff's sub-services as cards (option B: no
   sub-pages).
4. How it works: five steps, each with "You receive".
5. What you get + Tools we use (text chips, no logos: assets rule).
6. Questions (FAQPage JSON-LD).
7. Get a quote: the four-step form with the service preset.
Left out on purpose: the plan's "sample results" block (no real results;
no SAMPLE labels allowed, user 2026-11-06). Add when real case studies exist.

## Variants (built on `/lab/svc/` with the SEO content; deleted)
Sheets: `shots/p1-svc-{hero,inc,steps}-{1440,375}.jpg` (A, B, C left to right).

| Section | Variants | Scores /70 | Chosen |
|---|---|---|---|
| Hero | A pale split; B ink split; C centred, picture on an ink plate below | A 58, **B 61**, C 56 | **B** (dark top, as the user asked on the CRM page) |
| What is included | A numbered cards; B rows; C bento, first card a large ink tile | A 57, B 55, **C 58** | **C** |
| How it works | A horizontal timeline; B ink band, numbered list, "You receive" chips; C five cards | A 56, **B 60**, C 55 | **B** |
Who it is for, what you get and questions reuse proven patterns (CRM page
audience cards, homepage Questions), recorded rather than re-run.

## Hub `/services/`
Ink hero (title, line, Get a quote); four equal rows in white cards
(eyebrow, headline, line, who it is for, three included items, "Explore"
button, the service picture, alternating sides); How we work (five steps,
same ink band); Questions (homepage FAQ); "Not sure which service you
need?" card with Get a quote.

## Build notes
- Fixed route folders, not `[slug]`: with Cache Components `dynamicParams`
  is unavailable and `notFound()` in a `[slug]` page answered **200** (soft
  404). Now `/services/ppc/` and any other path are real 404s (verified).
- JSON-LD per service page: Service (with OfferCatalog of the included
  sub-services; no prices), FAQPage, BreadcrumbList. Hub: BreadcrumbList.
- Quote form `preset` prop ticks the page's service (URL `?service=` still
  wins).
- SEO picture: the results card keeps space at the bottom so the map card
  never covers a result.
- Verified (Playwright, production build): all five pages at 375, 768,
  1440, 1920: no horizontal scroll, every reveal ends visible, one h1,
  preset ticked, JSON-LD present, no console errors. `tsc`, `lint`,
  `build` pass.

## Client to confirm
Tools listed (Ahrefs, Screaming Frog, React Native, PostgreSQL, Google
Sheets, Shopify/WooCommerce), and copy claims per service in
`content/service-pages.ts`.
