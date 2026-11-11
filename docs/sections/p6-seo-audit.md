# P6 Free SEO audit (`/tools/seo-audit/`)

Status: built and tested with stand-ins for Google and the email service
(2026-11-11). **Speed, Core Web Vitals and the phone screenshot need the
user to add `PAGESPEED_API_KEY` on Vercel** (free Google key); without it
the audit runs but marks speed "not measured". `/tools/` redirects here
(one tool for now).

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
**Not tested:** a real Google PageSpeed response (needs the key).

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
