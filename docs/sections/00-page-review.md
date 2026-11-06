# 00 Homepage review (H9)

Date: 2026-11-06. Full-page shots after the colour change (ink + burnt
orange): `shots/00-page-1440.jpg`, `shots/00-page-375.jpg`; also checked at
768 and 1920 (Playwright, scrolled through so every entrance ran).

## Are the sections enough? (brainstorm)
All nine planned sections are built: header, hero, facts, what we do, where
we work, Nirman CRM, results, questions, footer. Candidates considered and
**not added now**:
- *How we work / process*: the facts band already carries the steps (reply,
  plan, live, own it); a full process belongs on `/about/`.
- *Selected work / case studies*: nothing real yet; a second block of
  SAMPLE content would weaken trust. Add when real projects exist.
- *Industries strip*: useful for routing and search, but `/industries/`
  (P5) does the job without lengthening the homepage. Reconsider after P5.
- *Free SEO audit strip*: the tool does not exist yet (P6); the header
  button is enough. Add a strip when the tool ships.
- *Client logos / team*: none supplied (never invent).
- *Extra final call to action*: Questions is the closing ask; the hero and
  the map bar already offer Get a quote.
Verdict: the homepage is complete for now.

## Checks
| Check | Result |
|---|---|
| Rhythm | Pale hero, ink facts, pale services and map, ink CRM, pale results and questions, ink footer: three dark bands spaced evenly. OK |
| Repetition | Results (tabs + card) and Questions (two columns) differ enough. OK |
| Spacing | Sections use py-20 / lg:py-28 throughout. OK |
| Calls to action | Get a quote: header, hero, map bar; Book a demo: CRM only; Submit: questions; Explore buttons per service. Not overloaded. OK |
| No horizontal scroll | 375, 768, 1024, 1440, 1920. OK |
| Console | No errors in dev; production only 404 prefetches for pages not built yet (P tasks). OK |
| Client rules | No prices, no PPC/social media marketing, CRM = Book a demo, samples labelled, no brand logos. OK |

## Fixed in this review
1. **Grey text too faint:** `muted` `#90949b` (2.9:1) darkened to `#6b7079`
   (4.6:1). Closes the open contrast question; tell the user (they may ask
   for the lighter grey back on short lines).
2. **Facts lead-in wrapped** ("What you can count / on") at 1024 to 1440:
   column 13rem to 15rem.
3. **CRM phone clipped** at the band bottom before the parallax caught up:
   start offset 110px to 60px.
4. **Homepage metadata:** Open Graph (site name, locale `en_IN`, title,
   description), Twitter card, canonical `/`, share image
   `src/app/opengraph-image.png` (1200 x 630, real logo, Poppins; made by
   `nirman-site/scripts/make-og.mjs`).
5. **JSON-LD:** Organization + WebSite graph on the homepage (FAQPage is in
   Questions). Uses placeholder URL and email from `content/site.ts`.

## Left for later
- `site.url` is `https://www.example.com`: canonical, OG and JSON-LD URLs
  are placeholders until the domain is known (S4).
- The `og:image` URL has no trailing slash, so it answers with a 308 to
  `/opengraph-image/` (trailingSlash config). Crawlers follow it; revisit in
  S2.
- Hero load motion and the CRM parallax were not re-timed; unchanged since
  their sections were verified.
