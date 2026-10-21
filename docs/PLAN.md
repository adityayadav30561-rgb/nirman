# Nirman website: phased implementation plan

Source of business rules: `docs/handoff.md` (copy of `E:\nirman\HANDOFF.md`).
Source of design: the existing site in `nirman-site/` (see `docs/DESIGN.md`).
Progress is tracked in `docs/STATUS.md`, not here. This file changes only
when the plan itself changes.

**How to use:** each phase is sized for one or two sessions. Do tasks in
order unless marked parallel. A task is done when its acceptance check passes.
Read only the phase you are working on.

Task IDs (`P2.3`) are referenced from STATUS.md and commit messages.

---

## Phase 0: Alignment and project setup (1 session)

Goal: one codebase, one source of truth, no conflicts left open.

- **P0.1** `git init` at `E:\nirman2` with a root `.gitignore` (node_modules,
  .next, design-assets/raw is kept). First commit = current state.
- **P0.2** Move nav/contact data to the handoff shape. Port
  `E:\nirman\website\src\lib\site.ts` (`serviceGroups`, `toolLinks`,
  `mainNav`, contact placeholders) into `nirman-site/src/content/site.ts`,
  keeping our `site` object. Read site URL from `NEXT_PUBLIC_SITE_URL`
  (fallback `https://www.example.com`); add `.env.example`.
- **P0.3** Port homepage copy/data from `E:\nirman\website\src\content\home.ts`
  into `nirman-site/src/content/home.ts` (services, crmFeatures, crmCallouts,
  journey, caseStudies, team, testimonials, faqs). Keep `SAMPLE` markers.
- **P0.4** Set `trailingSlash: true` in `next.config.ts`.
- **P0.5** Resolve the open questions in "Conflicts" below with the user;
  record answers in `docs/DECISIONS.md`.
- **P0.6** Delete unused files: `public/{file,globe,next,vercel,window}.svg`,
  unused art in `src/components/mockups/art.tsx` (check imports first).

Acceptance: build passes; git has an initial commit; DECISIONS.md answers
every conflict below.

### Conflicts between the current homepage and the handoff (all resolved 2026-10-21; outcomes in DECISIONS.md, all followed the recommendation)

| # | Current site | Handoff rule | Recommendation |
|---|---|---|---|
| C1 | "Digital marketing" card shows Meta/Instagram ads, Google Search ads | No PPC or social media marketing | Rebuild as **WhatsApp & email marketing via CRM** (campaign, broadcast, drip mockups) |
| C2 | Tools strip shows Meta and WhatsApp logos | No WhatsApp/Instagram/Facebook logos in our art | Remove those logos |
| C3 | 6 service cards (SEO, Web, CRM, Software, Apps, Marketing) | 4 pillars (SEO, Web, Software incl. CRM/web apps/mobile, Marketing) | Keep the 6-card 2-2-2 grid, label each card with its pillar, link to the pillar hub |
| C4 | Hero: "Build better. Grow smarter." + Explore services / Discuss project | Hero: "The digital studio that builds it smart." + Get a free SEO audit / Book a consultation + "Free 15-minute call. No obligation." | User chose the current headline in this design session; keep it, adopt the handoff's two CTAs and note |
| C5 | CRM CTAs "Explore Nirman CRM" / "Request a demo" | Every CRM CTA is "Book a demo" | Change to "Book a demo" (+ "Need a custom CRM?") |
| C6 | Process has 6 stages | Journey has 5 stages | Ask user; default to handoff's 5 |
| C7 | Nav is in-page anchors | Multi-page nav with dropdowns | Phase 1 builds the real header |
| C8 | Root font scaling per device class (phone/tablet/desktop) | Old site: clamp(16px,100vw/90,40px) | Keep the current per-device system (user asked for it) |
| C9 | Sections: why-us, final CTA | Planned order adds Team, Free tools, Testimonials, FAQ | Phase 2 adds them |

---

## Phase 1: Design system and layout shell (1-2 sessions)

Goal: every future page is built from shared parts that already look right.

- **P1.1** Extract primitives into `src/components/ui/`: `Container`,
  `Section` (vertical rhythm, tone backgrounds), `Heading` (display/heading/title
  scales), `Button` (existing `button()` helper as a component too),
  `Card`, `Chip`, `Breadcrumbs`. Document each in DESIGN.md.
- **P1.2** Header per handoff §3: Logo · Services ▾ · Nirman CRM · Free tools ▾
  · Our work · About · Blog · [Free SEO audit] · [Get a quote]. Services
  dropdown = 4 columns + "Not sure?" strip; Tools dropdown = 6 tools + "All
  free tools". Hide "Free SEO audit" below 1280px. Mobile full-screen menu with
  accordion. Keyboard and screen-reader accessible.
- **P1.3** Footer per handoff §3 (4 columns + bottom bar with Sitemap link).
- **P1.4** Floating WhatsApp button; mobile sticky bar (Call / WhatsApp / Get a
  quote). WhatsApp button uses a generic chat icon, not the WhatsApp logo.
- **P1.5** `ConsultCard` pop-up: appears after scrolling past the hero, never on
  entry, dismissal remembered in localStorage.
- **P1.6** Cookie consent banner (minimal, stores choice; analytics load only
  after consent, wired in Phase 11).
- **P1.7** `not-found.tsx` (404) in the new design.

Acceptance: header/footer/mobile menu work at 390, 768, 1440, 1920; Lighthouse
accessibility ≥ 95 on the homepage; no layout shift from the pop-up.

---

## Phase 2: Homepage aligned to the handoff (1 session)

Goal: the homepage follows the handoff's content and order with our design.

- **P2.1** Hero: apply C4 decision (CTAs → `/tools/seo-audit/` and `/book-a-call/`).
- **P2.2** Services grid: apply C1, C2, C3; cards link to `/services/<pillar>/`.
- **P2.3** Nirman CRM section: features/callouts from `content/home.ts`, apply C5.
- **P2.4** Case studies section: data from `content/home.ts` (SAMPLE), 4 items,
  2 metrics each, "See all our work" → `/work/`.
- **P2.5** Journey/process: apply C6.
- **P2.6** New sections in our design: Team, Free tools strip, Testimonials,
  FAQ + final CTA (FAQPage JSON-LD).
- **P2.7** Final order: Hero → Services → Nirman CRM → Case studies → Journey →
  Team → Free tools → Testimonials → FAQ + CTA → Footer.

Acceptance: no forbidden content (grep for "Meta", "Google Ads", "Instagram",
"₹" in our own service copy); all homepage links resolve (even if to stub pages).

---

## Phase 3: SEO foundation (1 session)

- **P3.1** Root metadata: title template `"%s | Nirman"`, `metadataBase` from
  `NEXT_PUBLIC_SITE_URL`, default OG image.
- **P3.2** `src/lib/seo.ts`: helpers for page metadata and JSON-LD builders
  (Organization, LocalBusiness, Service, SoftwareApplication, FAQPage,
  BreadcrumbList, Article, WebApplication).
- **P3.3** `app/sitemap.ts`, `app/robots.ts` (allow AI crawlers), `public/llms.txt`
  (or a route).
- **P3.4** Stub routes for every URL in handoff §2 (title + H1 + "coming soon")
  so links and the sitemap are complete early.

Acceptance: `/sitemap.xml`, `/robots.txt`, `/llms.txt` render; every page has a
unique title/description and one H1 (script check).

---

## Phase 4: Service pages, 18 total (2 sessions)

- **P4.1** Content model `src/content/services/*.ts` (one file per pillar with
  hub + children): H1, outcome line, who it's for, deliverables, process with
  timeline, tech stack, result snippets, engagement models, "what affects
  cost", FAQs, related services/tools.
- **P4.2** Service page template (handoff §5) + hub variant (child-service
  cards instead of deliverables). Reuse the matching homepage mockup as the
  hero visual.
- **P4.3** Write content for SEO pillar (hub + 4).
- **P4.4** Web pillar (hub + 5).
- **P4.5** Software pillar (hub + 4).
- **P4.6** Marketing pillar (hub + 2).
- **P4.7** Short quote form at the bottom of each page (posts via Phase 5 API;
  until then, disabled with a mailto fallback).

Acceptance: 18 pages render with Service + FAQPage + BreadcrumbList JSON-LD;
no prices; each links hub ↔ children ↔ related tool.

---

## Phase 5: Lead capture (1-2 sessions)

- **P5.1** `app/api/lead/route.ts`: validates input (zod), adds source page,
  service tags and country, posts to `NIRMAN_CRM_ENDPOINT` (env; endpoint not
  defined yet, so log + email fallback), per-IP rate limit, Cloudflare
  Turnstile verification.
- **P5.2** `/get-a-quote/` multi-step form (handoff §5): needs → details →
  optional budget range (INR/USD by country) → contact → submit →
  `/thank-you/` with booking embed. Side panel "what happens next".
- **P5.3** `/contact/`: short form, contact details, map, booking embed,
  "We reply within 2 working hours (IST)".
- **P5.4** `/book-a-call/`: calendar embed; `?type=crm-demo` preselects CRM demo.
- **P5.5** `/thank-you/`.
- **P5.6** Auto-acknowledgement hooks (WhatsApp/email) as stubs behind env flags.

Acceptance: each form validates, shows errors clearly, submits to the API, and
lands on thank-you; API rejects bad input and over-limit IPs.

Needs from client: CRM endpoint, booking tool (Cal.com/Calendly), Turnstile keys.

---

## Phase 6: Nirman CRM page (1 session)

- **P6.1** `/crm/` per handoff §5 using the existing interactive CRM demo
  (Dashboard/Pipeline/Leads/Follow-ups/Reports) as the centrepiece.
- **P6.2** SoftwareApplication JSON-LD; every CTA "Book a demo" →
  `/book-a-call/?type=crm-demo`.

---

## Phase 7: Free SEO audit, flagship tool (2 sessions)

- **P7.1** Route handler: fetch HTML (timeout, size cap), parse with cheerio,
  checks per handoff §6 (6 weighted pillars), PageSpeed Insights API call
  (`PSI_API_KEY` env), score /100 + grade, issues ranked with why/how-to-fix.
- **P7.2** 24h result cache per URL; per-IP rate limit; Turnstile.
- **P7.3** UI: URL + optional keyword → progress → results (score shown
  without email).
- **P7.4** "Email / WhatsApp me the full PDF report": PDF generation, lead to
  CRM with score/URL/issues/country, hot-lead tag if score < 50.

---

## Phase 8: Client-side tools + tools hub (1-2 sessions)

- **P8.1** SERP preview (pixel-width check), **P8.2** Schema generator,
  **P8.3** Sitemap & robots.txt generator, **P8.4** GBP checker,
  **P8.5** WhatsApp link & QR generator (generic icon, not WhatsApp logo).
- **P8.6** `/tools/` hub: grouped cards, "No signup, free forever",
  recommended order, CTA "When tools aren't enough, get a quote".
- WebApplication JSON-LD on each tool; soft CTA to the related service.

---

## Phase 9: Sanity CMS, blog, case studies (2 sessions)

- **P9.1** Sanity project + schemas (post, caseStudy, teamMember, testimonial).
  Read Next 16 caching docs first (`cacheComponents` is on).
- **P9.2** `/blog/` and `/blog/[slug]/` (Article JSON-LD).
- **P9.3** `/work/` with filter chips and `/work/[slug]/` case study pages.
- **P9.4** Homepage team/testimonials/case studies switch from `content/home.ts`
  to Sanity.
- **P9.5** Webhook → on-demand revalidation.

Needs from client: Sanity account, real case studies, team, testimonials, logos.

---

## Phase 10: Remaining pages (1 session)

About, Industries (8 cards), Careers (optional), Privacy policy, Terms.

---

## Phase 11: Launch readiness (1 session)

- **P11.1** GA4, Search Console, Microsoft Clarity (after cookie consent).
- **P11.2** Core Web Vitals pass (LCP < 2.0s, CLS < 0.1, INP < 200ms):
  image sizes, font loading, JS weight; `npm run build` analysis.
- **P11.3** Accessibility pass (keyboard, contrast, reduced motion).
- **P11.4** Replace every placeholder in `content/site.ts` and every `SAMPLE`.
- **P11.5** Deploy (Vercel or VPS + Cloudflare), domain, redirects, final
  sitemap submission.

---

## Client inputs still pending (block specific tasks)

Domain · WhatsApp number · main phone · office address · CRM API endpoint ·
booking tool · real case studies with screenshots · team names/roles/photos ·
testimonials · client logos · Sanity account · PSI API key · Turnstile keys.
