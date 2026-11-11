# P7b Privacy policy, terms, sitemap and robots

Status: built and verified (2026-11-11). User request, the day the site
went live.

## Legal pages
`/privacy-policy/` and `/terms/`: text in `src/content/legal.ts`, one
template in `src/components/pages/legal.tsx` (ink header with title and
date; numbered sections; contents list and an "Also read" card stay in
view on the right, the same aside as the article page). One layout, no
variants: plain reading pages built from the article layout already chosen
through the protocol.

The user asked for general texts for a digital agency. They are written to
match what the site really does (forms collect name, email, phone, business
and project details; no tracking cookies today; no prices published; SEO
results not guaranteed; work figures are specific clients' results).
**Not reviewed by a lawyer.** For the client to supply or decide: the
registered business name and address, the city whose courts apply, and a
legal review. **Keep the texts true:** when analytics, cookies, payments or
accounts are added to the site, update the matching section and the
`UPDATED` date.

## Search files
- `/sitemap.xml` (`src/app/sitemap.ts`): fixed pages from
  `src/content/pages-index.ts`, the 15 work projects from `content/work.ts`,
  and blog categories and articles from Sanity. `/blog/` is listed only
  once an article exists; articles marked "hide from Google" are left out.
  **Add a new fixed page to `pages-index.ts` when you add its folder.**
- `/robots.txt` (`src/app/robots.ts`): everything open except `/studio/`,
  `/api/`, `/thank-you/`; points to the sitemap.
- `/llms.txt` (`src/app/llms.txt/route.ts`): the same pages as plain text
  for AI assistants, with the facts that matter (no prices, no PPC or
  social media marketing, CRM by demo).
- `src/app/not-found.tsx`: a designed 404 page with ways back.

## Links and contact details changed the same day
- Real details in `content/site.ts`: `contact@nirmandigital.com`,
  `+91 88583 49017`, default address `https://www.nirmandigital.com`.
- Removed until the pages exist: Industries (user: remove), Free tools and
  Free SEO audit (BUILD-PLAN P6). The header's second button is now
  "Book a demo" (`/nirman-crm/#book-a-demo`); it becomes "Free SEO audit"
  again when the tool is built.
- The WhatsApp row on Contact is back (user confirmed the phone number is
  also on WhatsApp). Hidden until real: the three footer social icons
  (their `href` is `#`).

## Verified
Production build: a crawl from the homepage follows every internal link
(32 pages), all answer 200, no `#`, `example.com` or placeholder numbers in
any link; sitemap has 31 addresses; legal pages and Contact at 375, 768
and 1440 pass the usual checks; an unknown address answers 404 with the
new page. `tsc`, `lint`, `build` pass. Shot: none kept (text pages).
