# P6 Free SEO audit (`/tools/seo-audit/`)

Status: **live with Google PageSpeed (2026-11-11).** `PAGESPEED_API_KEY`
is set on Vercel; a live audit returned speed scores and the phone
screenshot in about 20 seconds, and a PDF was downloaded from the live
site. Without the key the audit still runs but marks speed "not measured". `/tools/` redirects here
(one tool for now).

## Round 3, 2026-11-12 (user): AEO and GEO audited, in the PDF and in the score
The single "AI search readiness" area (10%) is replaced by two scored
areas. Weights now: crawling 20, speed 20, content 15, **AEO 15, GEO 15**,
mobile 8, structured data 7 (`CATS` in `lib/audit/types.ts`). The result
and the PDF cover also show three scores: **SEO** (weighted average of the
five classic areas), **AEO** and **GEO** (`pillarsOf` in `checks.ts`).
Report version is 2; older sealed reports are refused (run again).

**AEO, answer engines** (featured snippets, People Also Ask, AI Overviews,
voice): question headings (a "?" or a question word followed by a verb;
"What you can count on" is not a question), a 15 to 120 word answer after
each, FAQPage / QAPage / HowTo data, content lists and tables (menus not
counted), average sentence length (20 words or fewer), nosnippet /
max-snippet:0 / data-nosnippet (Google applies these to AI Overviews too),
breadcrumb data.

**GEO, generative engines** (ChatGPT, Claude, Perplexity, Gemini, Copilot):
AI search crawlers allowed (OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
Claude-User, PerplexityBot, Perplexity-User, bingbot), AI training
crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot;
blocking is a legitimate choice, so a warning, not a failure), text without
JavaScript, business identity completeness (logo, contact, address,
sameAs), author or About page, a date within 12 months, sentences with
figures, links to sources, llms.txt, semantic HTML.

Everything is measured on the main content (nav, header, footer and
asides excluded). The PDF method page explains AEO and GEO and says plainly
that there is no published formula: these are readiness checks based on
Google's snippet and AI-feature documentation, the crawler documentation of
OpenAI, Anthropic, Perplexity and Microsoft, and the GEO paper (Aggarwal
and others, 2024). They do not measure actual citations.

Tested on real pages before shipping: an Ahrefs blog article (AEO 79, GEO
90), nirmandigital.com (AEO 96, GEO 85), badowl.in (AEO 38: no questions
or lists), example.com (AEO 40, GEO 40). The tool page has a new "AEO and
GEO audit" section and updated copy ("around 50 checks", "seven areas").
Full flow re-tested at 1440 and 375 (`tools/shots/audit-flow.cjs`).
Our own pages lose GEO points for: no Organization data outside the
homepage, no visible dates, no links to sources.

## Round 2, 2026-11-11 (user): a far richer scan, and a page written for search
User: the first scanning animation was "basic"; the page should be found
for "free SEO audit tool" and "free SEO audit tool no signup / no login".

### Scanning stage (`components/audit/scan-stage.tsx`)
Three parts that all show the same real work:
- **The site** in a phone that tilts slowly inside a radar (rings, a sweep,
  orbiting dots, pulses). A frame glides over the part of the page being
  read (address bar, picture, heading, text, button, images, whole page)
  and a tag beside it types what was found there.
- **A live log**: every observation with the second it was made.
- **The six areas**: a ring spins while an area is read ("reading 3 of 7")
  and closes with a tick when done.
What is shown are **signals**: raw observations from step 1
(`signalsOf` in `lib/audit/checks.ts`: "Title: 65 characters", "Sitemap:
index of sitemaps"), never a verdict or a fix; those stay in the PDF.
During Google's speed test the log and the frame narrate what Lighthouse
does (simulated phone, slow 4G, LCP, CLS, TBT, accessibility, real-visitor
data), then the real screenshot replaces the sketch. Each area stays on
screen long enough to show its signals (`hold` in `audit-tool.tsx`).
**The real site from the start (2026-11-12, user: "why doesn't the
animation show the site in the starting").** The real screenshot comes from
Google's speed test, so it only arrived near the end. Now the phone loads
the **live site itself** in a frame as soon as step 1 answers (about 2.5
to 3.5 s after pressing the button), when the site allows framing:
`frameable` in `crawl.ts` is true when the final page is https, answers
200, and has no `X-Frame-Options` header and no CSP `frame-ancestors`
rule. The frame is 390 px wide and scaled to the phone, cannot be clicked
and is sandboxed (`allow-scripts allow-same-origin` only, so it cannot
navigate our page). Sites that forbid framing (most Shopify stores, for
example) keep the sketch and then Google's screenshot. The caption under
the phone says which one is showing. The PDF always uses Google's
screenshot.

**Bug fixed the same day:** the phone's 3D depth was being animated with
the tilt and the phone stretched across the screen every few seconds (the
user reported it). Depth is now a fixed CSS perspective; the phone's box
was sampled about 220 times through a whole audit at 1440, 1261 and 375
wide and stays phone-sized (`tools/shots/audit-tilt.cjs`).
One design, built directly on the user's brief (no variants). GSAP: tilt,
radar, rings, typing. Framer Motion: frame, tag, log lines. Reduced motion:
no tilt, radar or typing; the log still fills. Shot:
`shots/p6-audit-scan-r2.jpg`.

### Page content for search (`content/audit-page.ts`, `app/tools/seo-audit/`)
- Title "Free SEO Audit Tool: No Signup, No Login | Nirman" (49
  characters), description 157 characters, h1 "Free SEO audit tool. No
  signup, no login."
- Sections: every check by area (about 40, named), "No signup, no login:
  what you get free" (free with no details / free for email and phone),
  "How to run a free SEO audit", "How the SEO score is worked out", twelve
  questions (FAQPage JSON-LD), Get a quote. About 1,450 words.
- JSON-LD: WebApplication (free, feature list), BreadcrumbList, FAQPage.
- Internal links: header button, footer ("Free SEO audit tool"), the SEO
  service page's questions section, sitemap and llms.txt.
**Keep it honest:** "no signup, no login" is true of running the audit and
seeing the score; the copy says everywhere that the PDF asks for an email
and a phone number. Do not remove that sentence, and do not claim results.
**Ranking cannot be promised from the page alone.** "Free SEO audit tool"
is contested by large, long-established tools; what moves a new domain is
links to this page, time and use. The long-tail "no signup / no login"
searches are the realistic first target.

## What the visitor does (user brief, 2026-11-11)
1. Enters a website address.
2. Watches it being audited: their own site in a phone under a scan beam,
   six areas ticking off.
3. Sees the score out of 100, the score by area and how many checks
   passed. The rest of the report is a locked, blurred stack of pages.
4. Presses "Download the audit report": a dialog asks for email and phone
   (name optional). On submit the PDF downloads and the enquiry is emailed
   to contact@nirmandigital.com with the score and the top issues.

## How it works
Three server steps, so the animation has real things to show and the
findings stay behind the form:
- `POST /api/audit/` (`{url}`): `lib/audit/crawl.ts` reads the page, its
  redirect chain, the http:// address, the www / non-www twin, robots.txt,
  the sitemap and llms.txt. Answers with public facts (title, heading,
  icon, preview picture, theme colour) and a sealed ticket. 6 audits per
  visitor per 10 minutes.
- `POST /api/audit/finish/` (`{ticket}`): `lib/audit/psi.ts` asks Google
  PageSpeed Insights (Lighthouse on a simulated mid-range phone, plus
  28-day real-visitor data when Google has it) for speed, accessibility,
  best practices and the screenshot; `lib/audit/checks.ts` judges
  everything. Answers with the summary (scores and counts) in the clear and
  the full report sealed. Up to about 50 s (`maxDuration` 60).
- `POST /api/audit/report/` (`{report, email, phone, name}`): validates,
  emails the lead (`lib/send-email.ts`), renders the PDF
  (`lib/audit/pdf.tsx`, `@react-pdf/renderer`, Poppins from
  `public/fonts/`) and returns it. If the email fails the visitor still
  gets the PDF and the failure is logged.

**Sealing** (`lib/audit/seal.ts`): AES-256-GCM with `AUDIT_SECRET` (falls
back to `RESEND_API_KEY`). The findings never reach the browser readable,
so the blur hides nothing that could be un-blurred; the blurred pages are
placeholders. Sealed data cannot be altered and expires (ticket 15 min,
report 24 h).

**Safety** (`lib/audit/safe-fetch.ts`): visitors type addresses that our
server then fetches, so every request and every redirect hop must be
http(s) on port 80 or 443 and resolve only to public IPs (private, loopback,
link-local and metadata ranges are refused); bodies are capped (2.5 MB) and
timed (9 s). Do not replace this with a plain `fetch`.

## The checks (about 43 with speed, 34 without)
Six areas with weights for the overall score: crawling and indexing 25,
on-page content 20, speed and Core Web Vitals 25, mobile and experience
10, structured data and sharing 10, AI search readiness 10. Each check is
pass (1), improve (0.5) or fix (0), weighted inside its area; "note"
checks are not scored. Thresholds are Google's published ones (Core Web
Vitals, Lighthouse bands). Every finding quotes what was read from the
site. If the page does not answer 200, only reachability checks are
reported and the score is capped at 20. If speed could not be measured
the speed area has no score and is left out of the overall score.
The page copy says "around 40 checks": keep that true if checks change.

Verified against real sites: nirmandigital.com (98), badowl.in (found 6 of
11 JSON-LD blocks really invalid: raw line breaks in strings), example.com
(thin page, no sitemap), wikipedia.org (no device-width viewport), a
parked domain (no content in the HTML).

## Design (protocol)
Result layout, sheets `shots/p6-audit-result-1440.jpg`, `-375.jpg` (A, B, C):
| Variant | Idea | Score /70 |
|---|---|---|
| **A** | score ring, verdict and bars on the left; the locked report in a card on the right | **63** |
| B | centred ring, six score tiles, report strip below | 56 |
| C | report pages first, score in the heading | 52 |
**A chosen:** the score is the first thing read, the bars explain it, and
the report card holds the one action. B needs a scroll to reach the
button; C buries the score. The scanning stage and dialog were built
directly (one design each). Final shot: `shots/p6-audit-final-1440.jpg`.
Motion: Framer Motion between phases and for the dialog; GSAP for the scan
beam, score ring and bars; all off under reduced motion.

## Page
Ink hero holding the tool (it owns the h1 in each phase), then "Six areas,
around 40 checks", "How it works", questions (FAQPage JSON-LD) and Get a
quote. Words: `src/content/audit-page.ts`. The header's second button is
"Free SEO audit" again; footer, sitemap, llms.txt and the privacy policy
are updated (the policy now covers the audit and Google PageSpeed).
`?url=example.com` pre-fills the address box.

## Verified
Production build with stand-ins: whole flow in a browser at 1440 and 375
(sketch, real screenshot swap, score, dialog validation, PDF download,
lead email content); findings do not appear anywhere in the page before
download; refusals for private, local, odd-port and non-existent
addresses, forged tickets and the rate limit; the no-speed path; link
crawl (35 pages, none broken). `tsc`, `lint`, `build` pass.
After the key was added, a live audit confirmed the real Google response
(speed scored, screenshot returned).

## Settings on Vercel
- `PAGESPEED_API_KEY`: Google Cloud console, enable "PageSpeed Insights
  API", create an API key (restrict it to that API). Free: 25,000 tests a
  day.
- `AUDIT_SECRET` (optional), `PAGESPEED_API_URL` (tests only).
Try the engine without the site: `npx tsx scripts/audit-try.mts <address>`
in `nirman-site/`.

## Later
More tools on `/tools/`; emailing the PDF to the visitor; auditing several
pages; storing leads in Nirman CRM.
