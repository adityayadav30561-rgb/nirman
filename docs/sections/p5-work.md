# P5 Our work

Status: built and verified (2026-11-10)
Route: `/work/` (`src/app/work/page.tsx`). Data: `src/content/work.ts`.
Cards: `src/components/work/cards.tsx`. Images: `public/images/work/`.
`/industries/` (the other half of P5) is not built yet.

## Job
Show real work so a visitor trusts the offer: sites they can open, search
figures from Google's own tools, apps they can try. Ends in Get a quote.

## Source of everything (user, 2026-11-10)
- **Websites:** seven links given in chat. Screenshots taken from the live
  sites that day (`tools/work/`). Name, kind and place come from each
  site's own title and description.
- **SEO:** `Seo_Portfolio.docx`: Google Analytics and Search Console
  screenshots for Kama Health India, Badowl, Khadi Organique, 7 Seas Matrix
  and Fresh Light Photography. Every figure on the page was read from those
  screenshots and keeps its source and period; the chart pictures are crops
  of the Search Console screenshots (sidebar and account details cut off).
- **Apps:** `portfolio-screenshots.zip` with a README: Maharishi Ayurveda,
  Event Intelligence India, Toys Cartel. The pictures are the supplied
  collages; descriptions and "built with" come from the README.
Nothing was invented, rounded up or renamed. No "SAMPLE" labels.

## Figures used (check against the document before changing)
| Client | Analytics | Search Console | AI answers |
|---|---|---|---|
| Badowl (badowl.in) | 1 Feb to 25 Sep 2026: 311K active users (+7,245.2%), 1.6M views, 6.2K purchases | 6 months: 5.33K clicks, 61.3K impressions, CTR 8.7%, position 7.5 | 3.64K impressions |
| Kama Health India | 1 Mar to 25 Sep 2026: 104K active users (+1,483.8%), 115K sessions, 50K engaged sessions | 6 months: 3.87K clicks, 66.9K impressions, CTR 5.8%, position 7.8 | 10.3K |
| Khadi Organique | 1 Mar to 31 Jul 2026: engagement 73.5%, 63K key events, 116K views | 6 months: 10.3K clicks, 1.19M impressions, CTR 0.9%, position 9.5 | 59.4K |
| 7 Seas Matrix | 1 Jan to 25 Sep 2026: 7K sessions (+292.4%), 5.6K active users (+417.9%) | 12 months: 2.38K clicks, 161K impressions, CTR 1.5%, position 19.2 | 7.37K |
| Fresh Light Photography | none supplied | 12 months: 1.76K clicks, 503K impressions, CTR 0.3%, position 14.3 | 19.3K |
Analytics figures count all visitors, not only those from search; the page
labels them "Google Analytics" for that reason.

## Variants (built on `/lab/work/`; lab deleted)
Sheets: `shots/p5-work-1440.jpg`, `p5-work-375.jpg` (A, B, C left to right).

| Variant | Idea | Score /70 |
|---|---|---|
| A | one uniform grid of 15 equal cards with filter chips (the PAGE-PLAN sketch) | 54 |
| **B** | three sections, each with the card that suits its content | **63** |
| C | editorial numbered list with small thumbnails | 50 |
**B chosen:** a site, a set of figures and an app need different things
(a screenshot and a link; numbers with their source; phone screens), and a
uniform card flattens all three. Jump links in the hero replace the filter.

## Page
1. Ink hero: h1, line, three count tiles (7 websites, 5 SEO projects, 3
   apps) that jump to the sections.
2. Websites: first site large with its phone view, six more in a grid; real
   screenshot in a browser frame, name, kind and place, "Visit site".
3. SEO (warm band): headline figure in orange with source and period, four
   more figures, the client's Search Console chart with a caption.
4. Apps: the app's collage full width, then kind, name, description, three
   points, "built with", "Try the live app".
5. Get a quote panel.
JSON-LD: CollectionPage with an ItemList of the sites and apps;
BreadcrumbList.

## Verified
Production build, Playwright at 375, 768, 1024, 1440, 1920: no horizontal
scroll, one h1, reveals end visible, JSON-LD present; reduced motion shows
everything. `tsc`, `lint`, `build` pass. Final sheet:
`shots/p5-final-1440.jpg`.

## To confirm with the user or client
- Each client agrees to be named and to have its analytics figures shown.
- What each SEO client's business is (not shown on the page: unknown).
- Two sites are on `vercel.app` preview addresses (Vana, Guru's Indian
  Cuisine); swap in the real domains when they exist.
- Blue Orbit Digi's homepage screenshot shows that company's own prices and
  mentions social media; those are the client's, not Nirman's.
- Maharishi Ayurveda is a known brand: confirm the app may be shown with
  its name.
- The homepage "Results" section still has placeholder testimonials (S4).
