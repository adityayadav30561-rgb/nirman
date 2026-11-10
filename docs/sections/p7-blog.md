# P7 Blog (Sanity)

Status: built and verified with sample articles (2026-11-10). **Not yet
connected to a Sanity project**: the user creates it and sends the project
ID (steps below). Until then `/blog/` shows its empty state.
Routes: `/blog/`, `/blog/category/<name>/`, `/blog/<article>/`, the editor
at `/studio/`, the publish hook `/api/revalidate/`.
`/privacy-policy/` and `/terms/` (the rest of P7) are not built.

## Decision (user, 2026-11-10)
Blog on **Sanity** (hosted editor, free tier), as the handoff planned:
non-developers write and publish in a browser, two posts a week. The
alternative (Markdown files in the repo) was offered and not chosen.

## How it works
- **Editor ("Studio")**: part of this site, at `/studio/` (`sanity.config.ts`,
  `src/sanity/schema/`, `src/app/studio/`). Three lists: Articles,
  Categories, Authors. Labels and help texts are in plain words. Required
  for an article: title, address, summary (60 to 220 characters), category,
  date, main picture with a description, text. Optional: author, last
  updated, questions and answers, title and description for Google, "hide
  from Google". Text blocks: heading, small heading, quote, lists, bold,
  italic, link, picture (description required), highlighted note.
- **Reading** (`src/sanity/blog.ts`): plain HTTPS requests to Sanity's query
  API, cached for a day under the tag `blog`. An article shows once its
  date has passed (so a future date schedules it).
- **Publishing**: a Sanity webhook calls `/api/revalidate/`, which clears
  the tag; the new article shows within about a minute. Without the
  webhook it shows within a day.
- **If Sanity cannot be reached**: the blog shows as empty for about a
  minute and tries again. The site and its build never fail because of it
  (tested with an unreachable project).
- **Unknown addresses** answer a real 404 (`src/proxy.ts` asks Sanity
  whether the address exists before the page renders; ARCHITECTURE 48).
- **Search**: each article has its own title, description, canonical
  address, share picture (1200 by 630, cropped by Sanity), `BlogPosting`,
  `BreadcrumbList` and, if it has questions, `FAQPage` JSON-LD. The list
  pages have `Blog` / `CollectionPage` with an `ItemList`. The empty blog
  and the editor ask not to be indexed. Sitemap entries come with task S2.
- **Pictures** are resized by Sanity's image service (`components/blog/
  picture.tsx`), with a blurred preview while loading.

## Design (protocol)
Sample articles for design work only: `src/sanity/fixture.ts`, shown only
when `BLOG_FIXTURE=1` is set (never on the live site).

List page. Sheets: `shots/p7-blog-list-1440.jpg`, `-375.jpg` (A, B, C).
| Variant | Idea | Score /70 |
|---|---|---|
| **A** | ink hero with category chips, newest article large over the band, the rest in a grid | **62** |
| B | title fixed on the left, articles as rows with small pictures | 54 |
| C | mosaic of three picture tiles, then a four-column grid | 57 |
**A chosen:** same hero language as the work pages, one clear lead
article, pictures large enough to matter. B is plain and long; C puts
titles over pictures (hard to read on busy screenshots).

Article page. Sheets: `shots/p7-blog-post-1440.jpg`, `-375.jpg` (A, B, C).
| Variant | Idea | Score /70 |
|---|---|---|
| A | ink hero, picture over the band, one centred column | 56 |
| **B** | title and summary, wide picture, text left; contents list and a "Get a quote" box stay in view on the right | **63** |
| C | author and contents fixed on the left, text right | 55 |
**B chosen:** the contents list helps reading and search, and the quote
box keeps the page's one action in view without interrupting the text.

Built: `components/blog/` (`list.tsx`, `parts.tsx`, `body.tsx`,
`picture.tsx`, `reading.tsx`), `app/blog/`. Motion: `ServiceMotion`
reveals; a thin reading-progress line (GSAP, scrubbed); the contents list
marks the section being read. The list shows 12 cards, then 12 more per
press of "Show more articles" (all links are in the page from the start).
Final shot: `shots/p7-blog-final-1440.jpg`.

## Verified
Production builds: (1) no project set: empty state, `noindex`;
(2) `BLOG_FIXTURE=1`: list, category and article at 375, 768 and 1440: no
horizontal scroll, one h1, reveals end visible, JSON-LD present; unknown
article and category addresses answer 404; the hook answers 401 without
the secret and 200 with it; (3) an unreachable project: build passes, blog
empty, `/studio/` opens to Sanity's login screen. `tsc`, `lint`, `build`
pass. **Not tested:** a real Sanity project end to end (needs the ID).

## To connect it (user, then Claude)
1. User: create a free account at sanity.io, then a project (name
   "Nirman", dataset `production`, public). Send Claude the **project ID**
   (8 letters and digits, on sanity.io/manage; it is not a secret).
2. Claude: set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and
   `NEXT_PUBLIC_SANITY_DATASET=production`) in `nirman-site/.env.local`
   and on the host; allow `<id>.apicdn.sanity.io`, `<id>.api.sanity.io`
   and `cdn.sanity.io` for cloud sessions; test with a real article.
3. User, on sanity.io/manage, API, CORS origins: add the site's address
   (and `http://localhost:3000` for local work), with "Allow credentials"
   on. Without this the editor cannot log in.
4. User, on sanity.io/manage, API, Webhooks: add one. URL
   `https://<site>/api/revalidate/` (with the last slash), dataset
   `production`, trigger on create, update and delete, filter
   `_type in ["post", "category", "author"]`, HTTP header
   `Authorization: Bearer <a long random text>`. The same text goes into
   `SANITY_REVALIDATE_SECRET` on the host.
5. User: invite the writers on sanity.io/manage, Members.
6. Then: add "Blog" to the header menu (it is in the footer now; held back
   while the blog is empty) and write the first categories.

## Rules for writers (client rules still apply)
No prices for Nirman's services; nothing about PPC or social media
marketing as services; no invented clients, results or figures; no other
companies' logos in pictures. Every picture needs a description.
