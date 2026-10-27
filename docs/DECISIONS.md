# Decisions log

Newest first. One line per decision: date, decision, reason. Business rules
from the client are in `docs/handoff.md` §1 and are not repeated here.

| Date | Decision | Why |
|---|---|---|
| 2026-10-27 | Redesign the whole website (v3): ~95 intent-specific pages instead of 39, new navigation, new homepage, SEO/AEO/GEO built in from the start. Plan in `docs/REDESIGN.md`; page list in `docs/sitemap-v3.json` | User request; sitemap and tiers await the user's review |
| 2026-10-27 | Design principle: links are buttons. Navigation outside prose is a pill button (5 variants); text links only inside running paragraphs and always underlined | User request (REDESIGN §3.1) |
| 2026-10-27 | Responsive scale is bounded, not identical everywhere: 1rem stops at 17px, content container capped at 96rem (~1630px), no raw `vw` sizes. Looks good on every screen, not the same. Interim patch applied now; target is fixed 16px root + fluid tokens (R1) | User: boxes were too big on a 27-inch monitor |
| 2026-10-27 | `homepage1` is the first v3 homepage, a review route (`/homepage1/`, noindex) linked in the header until approved | User request |
| 2026-10-27 | Two ambient stock videos (Pexels licence, hands only, 1.8 MB and 4.8 MB) allowed on the homepage; rules in REDESIGN §3.5 | User asked for videos on the homepage |
| 2026-10-27 | Phase 5 (lead API) is paused; the R-phases replace Phases 5 to 11 | User wants the redesign first |
| 2026-10-22 | Hub service pages also drop the coloured-dot label above the H1; no service page has a label there now | User request: the H1 already names the page |
| 2026-10-21 | Hub service tiles show a code-built mockup of each service (e.g. Google Business Profile for local SEO), never photos of people | User request |
| 2026-10-21 | Detail service pages drop the "Part of <hub>" line above the H1; the breadcrumb already links the hub | User request |
| 2026-10-21 | Push the repo to GitHub: `origin` = https://github.com/adityayadav30561-rgb/nirman.git (public), branch main | User request |
| 2026-10-21 | Service pages (hubs and detail): remove "Ways to work with us" (engagement models, what affects cost) and "Related services and tools" | User request; overrides handoff §5 engagement-model block. Still no prices anywhere |
| 2026-10-21 | Service pages redesign: richer "Who it's for" (segments with photos), child-service cards with images, "How it works" with images and scroll motion, results with report mockups, tool logos | User: sections looked weak |
| 2026-10-21 | Download ~25–35 more Unsplash photos into public/photos for service pages | User approved |
| 2026-10-21 | Hero on phones: the two CTAs sit side by side in one row | User request |
| 2026-10-21 | Hero on desktop: height follows the photo (`46vw + 4rem`) instead of the full screen, to remove the empty band before Services on tall screens | User request; user approved the result |
| 2026-10-21 | C1: Marketing card becomes **WhatsApp & email marketing via Nirman CRM** (broadcast, campaign, drip, delivery/reply stats); no ads mockups | Handoff: no PPC or social media marketing |
| 2026-10-21 | C2: Remove Meta and WhatsApp logos from the tools strip and any of our art | Handoff rule |
| 2026-10-21 | C3: Keep 6 equal service cards (2-2-2): SEO, Websites, CRM, Custom software, Mobile apps, WhatsApp & email; each tagged with its pillar and linking to the pillar hub | User choice |
| 2026-10-21 | C4: Hero keeps "Build better. Grow smarter."; buttons "Get a free SEO audit" (to /tools/seo-audit/) and "Book a consultation" (to /book-a-call/); note "Free 15-minute call. No obligation." | User choice |
| 2026-10-21 | C5: Every Nirman CRM CTA is "Book a demo" (+ secondary "Need a custom CRM?") | Handoff rule |
| 2026-10-21 | C6: Process uses the handoff's 5 stages (Consultation & discovery, Architecture & design, Code & build, Quality check & launch, Ongoing support & growth); horizontal scroll stays | User choice |
| 2026-10-21 | C7: Real multi-page header with dropdowns, built in Phase 1 | Handoff nav spec |
| 2026-10-21 | C8: Keep per-device fluid root scaling (not the old site's clamp) | User request earlier |
| 2026-10-21 | C9: Homepage adds Team, Free tools, Testimonials, FAQ + CTA in Phase 2 | Handoff planned order |
| 2026-10-21 | Git repo at `E:\nirman2`, branch main, LF line endings via .gitattributes; repo-local identity vandanayadav771 | P0.1 |
| 2026-10-21 | Base project is `E:\nirman2\nirman-site` (new design); port content and nav data from `E:\nirman\website` | User choice; the new design supersedes the old one |
| 2026-10-21 | Installed context-mode plugin (user scope) to keep large tool output out of context | User asked for token-saving tools |
| 2026-10-21 | Work is split into phases in `docs/PLAN.md`; progress in `docs/STATUS.md`; sessions are cleared often | Keep context and token use low |
| 2026-10-21 | Per-device fluid root font scale (phone/tablet/desktop) | User: each device class must look the same at any resolution |
| 2026-10-21 | Container nearly full width (max 124rem) for every section | User: all sections full or nearly full width |
| 2026-10-21 | Services shown as a 2-2-2 grid of equal cards, nothing hidden | User: no tabs, no unequal blocks |
| 2026-10-21 | Process section scrolls horizontally while the page scrolls vertically | User request |
| 2026-10-21 | Nirman CRM demo has a Dashboard tab (default) | User request |
| 2026-10-21 | Hero is 100svh, no eyebrow line, no service label row | User request |
| 2026-10-21 | Photos and device mockups are real downloads (Unsplash/Pexels), self-hosted | User: no generated/drawn mockups |
| 2026-10-21 | Typography: Mona Sans (display) + Funnel Sans (body) | User likes it; keep |
| 2026-10-21 | Hero headline "Build better. Grow smarter." | User chose it (handoff suggests a different one: see PLAN conflict C4) |
