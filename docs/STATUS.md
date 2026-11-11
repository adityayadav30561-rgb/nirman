# Status

Read this first in every session. Update it after every finished task and at
the end of every session. Keep it under about 60 lines. Older history:
`docs/archive/STATUS-v2.md`.

## Where we are (2026-11-06)

- **Rebuild from scratch.** The user rejected the old site (still in GitHub
  commit `2eba621`, tag `archive/v2`; local copy `E:\nirman2\old-site\`,
  gitignored). All page-plan decisions are made (`docs/DECISIONS.md`):
  18 pages, full-width page, keyword headline, Poppins, four true facts,
  SAMPLE results, artwork built in code or downloaded with permission.
- **Homepage:** header and hero done and verified (`docs/sections/01-hero.md`):
  hand holding a code-built Nirman CRM phone, clouds, a calm GSAP load
  entrance and scroll parallax. Facts band
  done (`docs/sections/02-facts.md`): 4 variants, B chosen 49/60. What we
  do done (`docs/sections/03-services.md`): 4 variants, D (editorial list)
  chosen 52/60; 3D-style icons in SVG. Where we work done
  (`docs/sections/04-map.md`): 4 variants incl. a Three.js globe, A (flat
  dotted map, GSAP reveal from India) chosen 54/70. Nirman CRM **redone** after user
  feedback ("no screens"; `docs/sections/05-crm.md` round 2): C, a blue
  product band naming Nirman CRM, real screens built in code
  (`src/components/crm/`: Inbox, Pipeline, Follow-ups, Dashboard, phone)
  with tabs, chosen 59/70. Results done (`docs/sections/06-results.md`): B (spotlight
  with tabs, all SAMPLE) chosen 55/70. Questions done
  (`docs/sections/07-questions.md`): A (reference layout, accordion, FAQPage
  JSON-LD; email opens a mailto until S1) chosen 60/70. Footer done (`docs/sections/08-footer.md`): A
  (reference blue panel, generic social icons as placeholders) chosen 59/70.
  **The homepage now has every section.**
- **Motion rule (user, 2026-11-06):** only GSAP, Framer Motion or Three.js
  (DESIGN-PROTOCOL section 5). CSS keyframe motion removed; hero back to the
  calm first entrance plus scroll parallax; facts and services use GSAP
  scroll reveals (`src/components/motion/`).
- **Design protocol in force** (`docs/DESIGN-PROTOCOL.md`): for every new
  section build 3 to 4 variants on `/lab/<section>/`, screenshot, score,
  choose the best, record it in `docs/sections/`, then build it.
- **Everything is on GitHub** (`origin` main); commit and push after every
  verified task so any session or account can continue.

- **Colours (user, 2026-11-06): no blue anywhere.** Bands (facts, CRM,
  footer) are ink `#121418`; accent is burnt orange `#c2410c` (DESIGN
  tokens). Section records written before this still mention blue; the
  code is the truth.

- **No "SAMPLE" labels (user, 2026-11-06).** CRM screens = the real CRM
  design. The placeholder testimonials were removed on 2026-11-10 (Results
  now shows real SEO figures).

## Next task

**SEO audit round 2 (2026-11-11):** a much richer scanning stage (site in
a tilting phone inside a radar, a frame and tag over what is being read, a
live log, six area rings; all from real observations) and the page
rewritten for "free SEO audit tool, no signup, no login"
(`docs/sections/p6-seo-audit.md` round 2). Ranking for that phrase needs
links and time, not only the page.

**Free SEO audit built (2026-11-11):** `/tools/seo-audit/` audits any
address (about 40 checks, six areas), shows the visitor's site being
scanned, then the score, and gives the PDF report in exchange for email
and phone (lead emailed to contact@nirmandigital.com).
`docs/sections/p6-seo-audit.md`. The Google PageSpeed key is set on Vercel and a
live audit returned speed scores and the screenshot.

**Tracking (2026-11-11):** Google Tag Manager `GTM-5H9HWP85` and the Search
Console verification tag are in the root layout (ids in `content/site.ts`;
from the user's SEO person). The privacy policy says so. A cookie consent banner
(Consent Mode v2) holds measurement cookies until the visitor agrees
(`docs/sections/s5-consent.md`).

**Live (2026-11-11):** the site is on Vercel (project `nirman-site`, Hobby
plan, deploys from `main`) at **https://www.nirmandigital.com** (apex
redirects to www; DNS at GoDaddy). `NEXT_PUBLIC_SITE_URL` is set there.
Sanity CORS allows the domain, so `/studio/` can log in. Checked live: main
pages 200 with the right canonical, blog empty state, unknown blog address
404, `/studio/` shows Sanity's login. **Fixed 2026-11-11:** real email and phone, privacy
policy and terms, sitemap, robots, llms.txt, a 404 page, and no link to an
unbuilt page (`docs/sections/p7b-legal.md`). **Forms (S1) live 2026-11-11:** they send through
`/api/lead/` and Resend to contact@nirmandigital.com
(`docs/sections/s1-forms.md`); the user confirmed a test email arrived.
WhatsApp on Contact is on (same number as the phone). **Still open:** the SEO audit tool
(P6; the header button is "Book a demo" until then); office address,
WhatsApp number and social profiles (hidden until given); legal review of
the two legal pages. Not set
yet on Vercel: `SANITY_REVALIDATE_SECRET` and the Sanity webhook.

**Blog on Sanity, connected (2026-11-11)** to the user's project
`iymga1c7`. **First article published (2026-11-11)**, "How to Choose an SEO
Company for UK Photography Websites"; it was hidden because blog data was
cached for a day and the webhook is not set up. Fixed: blog data now
refreshes every 10 minutes (`src/sanity/blog.ts`), webhook optional.
**Waiting for the user** (steps 3 to 6 in `docs/sections/p7-blog.md`): add
the site's address under CORS origins so `/studio/` can log in, write the
first categories and an article, and (once the site has a public address)
add the publish webhook. Then Claude checks a real article on the site
and adds "Blog" to the header menu.

**Homepage proof (2026-11-10):** hero has a second button ("See our work");
new **Selected work** section after What we do (a row of six real projects
that moves sideways on scroll, `docs/sections/09-work.md`); **Results**
now shows real SEO figures for five named clients instead of placeholder
quotes (`docs/sections/06-results.md` round 2). Homepage order: hero,
facts, services, work, map, CRM, results, questions. Other homepage ideas
offered and not yet picked: pictures in the services list, a larger map,
a "How we work" strip.

**Hero phone screen redone (2026-11-10):** a real-looking Nirman CRM app
screen instead of the orange one (`docs/sections/01-hero.md`, end). The
user asked what else to improve on the homepage; suggestions were given in
chat and wait for the user's pick.

**Project pages redone as case studies (2026-11-10, round 3):** the user
found the 15 `/work/<kind>/<project>/` pages to be bare screenshot dumps.
Each now has an overview, a numbered walk through the screenshots with a
note per screen, a dark band (phones / how to read the figures / tech) and
"More <kind>" cards (`docs/sections/p5-work.md` round 3; text in
`content/work.ts`). Awaiting the user's verdict.

**P5a done (2026-11-10):** `/work/` with the user's real websites, SEO
figures and apps, as screenshots only (no outside links): selected work,
a list page per kind and a page per project, 19 pages; the user will send
more projects (how to add one: `docs/sections/p5-work.md`). P4 (`/contact/`, `/about/`)
and the realistic-mockup redesign of the services pages were done just
before; the user has not yet given a verdict on those. Next: **P5b
`/industries/`**, then P6 `/tools/` and `/tools/seo-audit/`. Also worth
doing now that real work exists: replace the homepage "Results"
placeholders with figures from `content/work.ts` (ask the user first).

## Open questions for the user

- Confirm the Nirman CRM claims taken from the handoff: Meta lead ads,
  IndiaMART / JustDial, payment links, API and webhooks, data import and
  export, official WhatsApp Business Platform (`src/content/crm-page.ts`).

- Real contact details, domain, and which social profiles exist (all
  placeholders: `src/content/site.ts`; footer icons are generic with `#`
  links in `src/content/footer.ts`).

- **Photo credits:** the two photos in the services mockups (clinic,
  coffee) came from the user without page links; add the Unsplash links and
  authors to `src/content/image-credits.ts` (launch check).

- **For Contact and About from the client:** phone, WhatsApp number,
  email, office address, team (names, roles, photos), booking link, and a
  check of the About story (`src/content/pages.ts`).

- **Work page:** confirm each client may be named with its figures; real
  domains for the two `vercel.app` sites; see the list at the end of
  `docs/sections/p5-work.md`.

## Half-finished work

None.

## Where things are recorded

| File | What |
|---|---|
| `CLAUDE.md` | rules, start/end of session steps (auto-loaded) |
| `docs/STATUS.md` | this file: position, next task, open questions |
| `docs/BUILD-PLAN.md` | all tasks with ticks |
| `docs/DECISIONS.md` | every user decision (date, what, why) |
| `docs/DESIGN-PROTOCOL.md` | design principles and the 3-4 variant process |
| `docs/sections/` | one record per section: brief, variants, scores, choice |
| `docs/DESIGN.md` | current tokens, type, components, motion classes |
| `docs/ASSET-REQUESTS.md` | images/media the user generates from Claude's prompts (pending, received, used) |
| `docs/PAGE-PLAN.md` | pages and what goes on each |
| `docs/REFERENCE-VIDEO.md` | the reference's layout and measured motion |
| `docs/ARCHITECTURE.md` | file map and gotchas (read gotchas 30-38) |
| `tools/video/README.md` | how to measure the reference video |

## Last session (2026-11-06)

Planned the rebuild (PAGE-PLAN, REFERENCE-VIDEO), removed the old site,
built header and hero with the hand, clouds and a measured entrance; wrote
the design protocol, build plan and current design docs; built the facts
band (B) and What we do (D) through the protocol; at the user's request
calmed the hero and moved all motion to GSAP; added the asset-prompt rule
(ChatGPT/Gemini); built Where we work (A, dotted map), Nirman CRM (B), Results (B) and
Questions (A) and the Footer (A), in a cloud session with Playwright shots;
pushed to GitHub.
