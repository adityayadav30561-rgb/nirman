# P5 Our work

## Round 3, 2026-11-10 (user): project pages are case studies, not galleries
Status: built and verified. This section is the truth for the project pages
(`/work/<kind>/<project>/`); round 2 below still holds for the structure.

User on the project pages: "it just looks like it only contains screens and
not good thought has been put on those pages". Each page was a hero, a row
of facts and a dump of screenshots.

### Variants (built on `/lab/proj2/` with AshVille Homes; deleted)
Sheets: `shots/p5-case-1440.jpg`, `p5-case-375.jpg` (A, B, C left to right).

| Variant | Idea | Score /70 |
|---|---|---|
| **A** | overview with a "what is in it" card, then a numbered walk: each screenshot beside a note on what it shows, sides swapping; phones on an ink band | **62** |
| B | project text fixed on the left while captioned screenshots scroll on the right | 55 |
| C | centred intro, then a bento grid of captioned screenshots | 50 |
**A chosen:** it is the only one that reads as a story and has rhythm (pale,
warm band, ink band). B leaves the left column empty for most of the page;
C is still a gallery with captions.

### What each project page shows now
Hero unchanged (ink, main picture hanging over the band). Then:
- **Website:** "What we built" (intro, facts, card "What is in the site"),
  "A walk through the site" (every screenshot numbered, with a title and
  two lines on what it shows and why), "On a phone" ink band (three phone
  views with a note, slight GSAP parallax).
- **SEO:** "What the numbers say" (one or two sentences made only of the
  figures; card "Where the figures come from"), "The evidence" (each Google
  screenshot beside what that report is, its period and its figures), ink
  band "Six terms, in plain words" (how to read the figures).
- **App:** "What the app does" (line, facts, card "Main features"), "How
  the app flows" (screens grouped into four or five steps a user takes,
  each with a note), ink band "What it is built with" with the second
  collage.
- Then "More <kind>" (two or three small cards and an "All" button) and
  Get a quote. The old "Next: <project>" button is gone.
Code: `src/components/work/shots.tsx` (`SiteStory`, `SeoStory`, `AppStory`)
and `project.tsx`. Motion: `ServiceMotion` (`.rv` reveals, `[data-depth]`
on the phones). Final sheet: `shots/p5-case-final-1440.jpg` (website, SEO,
app).

### Content rule for these pages
All text is in `src/content/work.ts`: `intro`, `tour`, `phone`, `has`
(sites); `summary` (SEO; plus shared `seoShotAbout`, `seoTerms`); `flow`
(apps). **Every sentence describes what a screenshot shows or restates a
supplied figure.** Nothing about a client's goals, our process on that
project or its results is invented; do not add such claims unless the user
supplies them.

### Adding a project (adds to step 1 of round 2)
In `content/work.ts` also write: for a site `intro`, `tour` (one entry per
screenshot; `shot: 0` is the homepage; this replaces `more`), `phone`,
`has`; for SEO `summary`; for an app `flow` (screen file names grouped
into steps). Steps 2 and 3 of round 2 are unchanged.

### Verified
Production build, all 15 project pages at 375, 768 and 1440: no horizontal
scroll, one h1, reveals end visible, no outside links, no broken images,
JSON-LD present. `tsc`, `lint`, `build` pass.

### To confirm with the user
- The walk-through texts (written from the screenshots).
- Phone screenshots of EasyWebSolns and Blue Orbit Digi show those
  clients' own prices (already so in round 2).

---

## Round 2, 2026-11-10 (user): screenshots only, more pages, room to grow
Status: built and verified. This section is the truth; below it is the
first version's record (its figures table and sources are still right).

User on seeing the first version: (1) show the work **as screenshots, with
no links** to the client sites or apps; (2) this is **selected** work and
much more will be added, so the section must be built for that; (3) it
needs **more pages**.

### Structure (19 pages)
- `/work/`: selected work. Three websites, three SEO projects, two apps,
  each section with a "See all" button.
- `/work/websites/`, `/work/seo/`, `/work/apps/`: every project of a kind,
  with tabs to switch kind.
- `/work/<kind>/<project>/`: one page per project (7 + 5 + 3).
No links to client sites or apps anywhere; the browser frame shows the
business name instead of an address. Cards say "View project".

### Project page: variants (built on `/lab/proj/` with AshVille Homes; deleted)
Sheets: `shots/p5-project-1440.jpg`, `p5-project-375.jpg` (A, B, C).

| Variant | Idea | Score /70 |
|---|---|---|
| **A** | ink hero, centred, the main picture hanging over the band; facts in a row; then every screenshot | **61** |
| B | pale page; facts fixed on the left while the screenshots scroll on the right | 59 |
| C | ink split hero with a phone; the rest as a sideways strip | 52 |
**A chosen:** strongest first screen and the same hero language as the
rest of the site; B's large pictures were kept by letting A's gallery use
the full page width. C hides most screenshots off-screen.

### What each project page shows
- **Website:** homepage in a browser frame, up to four more sections of the
  site, three phone views. Facts: client, business, where, what we did.
- **SEO:** four headline figures on a card, then each Google screenshot in
  full (Analytics, Search Console, AI answers) with its period and the
  figures typed out above it.
- **App:** the app's collage, every screen in order in phone frames with a
  label, the second collage. Facts: kind, built with, what we did.
- Then "All <kind>" and "Next: <project>", and Get a quote.
JSON-LD: CreativeWork + BreadcrumbList (project), CollectionPage + ItemList
(lists).

### Adding a project (this is how the section grows)
1. Add it to `src/content/work.ts` (`sites`, `seoCases` or `apps`; the
   first three, three and two of each list are the "selected" ones on
   `/work/`).
2. Put its images in `public/images/work/` using the same file names as the
   others (`site-<key>.webp`, `site-<key>-<n>.webp`, `site-<key>-m<n>.webp`;
   `seo-<key>.webp` and `seo-<key>-{ga,gsc,ai}.webp`; `app-<key>.webp`,
   `app-<key>-2.webp`, `app-<key>/<screen>.webp`). Tools: `tools/work/`.
3. Add a folder `src/app/work/<kind>/<slug>/page.tsx` copied from a
   neighbour (two lines differ). Fixed folders are deliberate: unknown
   addresses give a real 404 (ARCHITECTURE: a `[slug]` route answers 200).
When a list passes about twelve projects, add paging or filters to the
category page.

### Screenshots left out on purpose
Extra shots that show a client's own prices or services we do not offer
(Blue Orbit Digi's pricing and its social media and ads list;
EasyWebSolns' care-plan prices) and one blurred transition frame (Vana).
`more` in `content/work.ts` lists what is used.

### Verified
Production build: 19 pages at 375, 1024 and 1440: no horizontal scroll, one
h1, all reveals end visible, JSON-LD present; reduced motion shows
everything; `/work/websites/nope/` is 404; no outside links in the HTML.
`tsc`, `lint`, `build` pass. Sheet: `shots/p5-projects-1440.jpg`.

---

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
