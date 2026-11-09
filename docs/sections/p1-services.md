# P1 Services hub and the four service pages

## Redesign, 2026-11-09 (user: "doesn't look even a little good; make them extremely good, top to bottom")
Status: built and verified. This section is the truth; everything below it
is history (the screens, tour and cards it describes were deleted).

**What was wrong:** the pictures were whole dashboards shrunk until the text
was unreadable and mostly empty; every section was a heading over plain
cards; all four pages looked the same.

**Idea:** show a few large UI pieces a visitor can read instead of whole
screens, and give each section its own layout and motion.

### Variants (built on `/lab/svc/` with the SEO content; lab deleted)
| Section | Variants | Scores /70 | Chosen |
|---|---|---|---|
| Hero (`shots/p1r-hero-1440.jpg`, `-375.jpg`; A, B, C left to right) | A ink, centred, picture below; B pale warm split; C ink split with a grid, accent phrase and a running row of sub-services | A 57, B 58, **C 63** | **C**: headline, action and picture all above the fold; keeps the dark top the user chose on the CRM page |
| What is included (`shots/p1r-included-1440.jpg`; A, B, C left to right) | A bento of pictures; B tabs with one large stage; C alternating rows | **A 62**, B 53, C 56 | **A**: everything visible at once, works on phones without interaction |
Other sections were designed once (no competing idea worth a lab round) and
are recorded here: who it is for, steps, what you get, quote, cross links.

### Page order (service pages)
1. **Hero C** (`service-hero.tsx`): breadcrumb, h1 with `accent` phrase in
   orange, line, Get a quote (to `#quote`), three points as chips, the
   service's Scene on the right, Ticker of sub-services along the bottom.
2. **What is included** (`ServiceIncluded`): bento, one picture per item.
   5 items: 7+5 then 4+4+4 columns; 4 items: 7+5 then 5+7. Tints warm / ink /
   stone. Heading from `includedTitle`.
3. **Who it is for**: warm band (`bg-wash`), four columns with big light
   numerals and a top rule that turns orange on hover.
4. **How it works**: ink band; numbered circles on a line that fills with
   orange as you scroll (across on desktop, down on phones); "You receive"
   cards.
5. **What you get**: one white panel split 2 x 2; under it "Tools we use"
   as an endless row of chips.
6. **Questions** (homepage accordion). 7. **Get a quote**: ink panel with the
   three promises and the form (service preset). 8. **Works even better
   together**: links to the other three services (3D icons).

### Hub `/services/`
Ink hero (centred h1 with accent, Get a quote, four jump links with the 3D
icons, the four true facts as a strip); four service panels with different
looks (white, ink, warm, white), each with its Scene, all sub-services as
chips and an Explore button; How we work (same steps band); Questions; ink
call-to-action panel.

### Files
- `components/services/kit.tsx`: drawing kit (Scene, Vis, Panel, Tag, Ring,
  Trend, Bars, Phone, Browser, ...). Sizes in em; a Scene scales with its
  width (container units), a Vis uses a clamped readable size.
- `components/services/visuals/{seo,web,software,marketing}.tsx`: one hero
  Scene and one picture per included item; `service-art.tsx` maps them.
  Demo businesses (Sunrise Dental Clinic, Masala Box, FixIt Pro) show the
  kind of work; they are not clients. No prices, no WhatsApp logo (messages
  are plain chat bubbles).
- `components/services/service-motion.tsx`: all motion (GSAP). `gs-hide`
  calm load fade-up; `.rv` batched scroll reveal; `[data-depth]` parallax
  inside `.sv-stage`; `.sv-anim` starts `.an-pop`, `.an-bar`, `.an-grow`,
  `.an-ring`, `.an-wipe` when it enters; `.sp-track` steps line (scrub);
  `Ticker` endless rows. Reduced motion: everything in its final state.
- Copy: `content/service-pages.ts` gained `accent` and `includedTitle`.

### Verified (Playwright, production build)
Five pages at 375, 768, 1024, 1440 and 1920: no horizontal scroll, one h1,
every reveal ends visible, JSON-LD present, service preset ticked; reduced
motion shows everything; `/services/ppc/` and `/lab/svc/` are 404. `tsc`,
`lint`, `build` pass. Final sheets: `shots/p1r-seo-1440.jpg`,
`p1r-seo-375.jpg`, `p1r-hub-1440.jpg`.

---

## Redo, 2026-11-07 (user: "the services page doesn't look any good, no real screens, very weak sections")
- **Real screens built in code** (`src/components/services/screens/`), in
  `frames.tsx` (BrowserFrame and PhoneFrame, em-scaled like the CRM
  AppFrame):
  - SEO (`seo.tsx`): overview dashboard (visitors, top-10 keywords, calls,
    weekly chart, keyword positions), technical audit (health ring, fixed
    and next-week items), local maps results with calls/directions/views,
    AI assistant answer citing the business, content plan table.
  - Websites (`web.tsx`): full clinic homepage, mobile booking pages (phone),
    online store product page with cart, launch check (scores, timings,
    checklist), page editor with search preview.
  - Software (`software.tsx`): field-service portal (jobs, statuses, live
    job map), customer app (phone), connected apps with activity. CRM
    development and automation reuse the Nirman CRM Pipeline and
    Automations screens.
  - Marketing: Nirman CRM Inbox, Campaigns, Automations, Leads.
  Demo businesses (Sunrise Dental Clinic, Masala Box, FixIt Pro) are
  illustrations of what we build, not clients.
- **Hero** (`service-hero.tsx`): the CRM-page hero pattern the user chose
  (ink, centred, big screen that flattens on scroll, phone at the corner).
- **What is included** (`service-tour.tsx`): the CRM feature-tour pattern
  (sticky story, the screen switches per sub-service; crops on phones).
  `service-screens.tsx` maps each included item to its screen.
- Hub rows show each service's hero screen.
- Patterns reused from the CRM page because the user approved them there;
  no new lab round. Old bento/visual code deleted.
- Verified: five pages at 375 to 1920 (no overflow, reveals visible, one
  h1, preset, JSON-LD, no console errors), each tour step's screen captured
  and checked for empty space, `/services/ppc/` 404.

---

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
