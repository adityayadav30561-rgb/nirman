# Nirman website v3: redesign plan

Development document for the full redesign. Read this before building any v3
page. Status: **plan for review**, written 2026-10-27. `homepage1` (route
`/homepage1/`, linked in the header) is the first design built from it.

Related docs: `docs/handoff.md` (business rules, still binding),
`docs/DESIGN.md` (how v2 is built today), `docs/DECISIONS.md` (what the user
decided), `docs/sitemap-v3.json` (the page list below, machine readable).

## Contents

1. Why we are redesigning, and the goals
2. Hard rules (unchanged)
3. Design principles
4. Sitemap
5. Navigation and menus
6. Homepage plan
7. Page templates
8. SEO, AEO and GEO
9. Technical plan
10. Build plan
11. Inputs needed from the client
12. QA checklist (every page)
13. Decisions to confirm

---

## 1. Why we are redesigning, and the goals

What v2 got wrong:

- **39 pages, several vague.** One "Industries" page with eight cards, one
  "CRM" page, no resources section. A page that tries to rank for everything
  ranks for nothing.
- **Scale grew without limit.** The root font size followed the screen width,
  so on a 27-inch monitor every box, heading and button grew about 75 percent.
- **Links looked like text.** Navigation actions were highlighted words
  instead of buttons, so what is clickable was unclear.
- **SEO added per page, late.** Metadata and schema came after the design.

Goals for v3 (each one is checkable):

| Goal | How we check it |
|---|---|
| Every page has one clear search intent and a unique job | Sitemap table, section 4: one topic per URL |
| Looks good on every screen from 360px to 3840px | Test matrix, section 3.2 |
| Anything clickable looks clickable | Section 3.1 rules, lint check |
| Found in Google and quoted by AI answers | Section 8 spec, QA checklist |
| Fast | LCP 2.0 s or better on a mid-range phone, INP 200 ms or better, CLS 0.05 or less |
| Accessible | WCAG 2.2 AA, Lighthouse accessibility 95 or better |
| Honest | No invented clients, results or prices; samples are labelled |

## 2. Hard rules (unchanged from the client)

1. **No prices** for our services anywhere. Every service ends in "Get a quote".
2. **Not offered:** PPC and Google Ads, social media marketing. No pages, menu
   items, copy or mockups that suggest them.
3. **No WhatsApp, Instagram or Facebook logos** in our own artwork. A generic
   chat-bubble icon stands in.
4. **Every Nirman CRM call to action is "Book a demo".** No signup, no trial.
5. **Do not invent** clients, results, testimonials or statistics. Use clearly
   marked placeholders (`SAMPLE`) until real ones arrive.
6. **URLs:** lowercase, hyphens, trailing slash.
7. English only; India plus international audience; one office, in India.

## 3. Design principles

These apply to every v3 page. When a rule and a design idea disagree, the rule
wins; change the rule here first if it is wrong.

### 3.1 Links are buttons

The user's first rule. Anything that navigates and is not inside a sentence is
a button.

| Rule | Detail |
|---|---|
| **L1. Navigation is a button** | Pill shape, label always visible, at least 44px tall (WCAG 2.2 minimum is 24px; we use 44px), clear hover, focus and pressed states. Semantics stay correct: an `<a>` styled as a button for navigation, a `<button>` for actions. |
| **L2. Five variants, no more** | **Primary** (ink fill, the one main action), **Accent** (marigold fill, top conversion action in the header and final CTA only), **Secondary** (outline), **Tonal** (soft pillar-colour fill; child-service links, chips), **Quiet** (transparent, fills on hover; menus, footer, breadcrumbs). On dark backgrounds: Light, Ghost, Mint (CRM). |
| **L3. Cards** | The whole card is clickable (stretched link on the heading) **and** carries a visible Tonal button such as "See local SEO". No bare "Read more". |
| **L4. Text links only in prose** | Inside running paragraphs and lists of content, links are underlined (never colour alone), 3:1 contrast against the surrounding text, external links get an icon. Nowhere else. |
| **L5. Lists of links are button lists** | Footer columns, breadcrumbs, table of contents, tags, categories, pagination: Quiet or Tonal buttons, never bare coloured words. |
| **L6. Labels** | Verb plus object: "Get a quote", "See SEO services", "Book a demo". Never "Click here" or a lone "Learn more". The fixed vocabulary: **Get a quote**, **Book a call**, **Book a demo** (Nirman CRM only), **Free SEO audit**. |
| **L7. Density** | One Primary per section, two buttons side by side at most, a group of Tonal buttons may wrap. |
| **L8. Contextual primary** | The header's main button is "Get a quote"; on `/nirman-crm/*` it becomes "Book a demo". |

### 3.2 Bounded responsive scale

The user's second rule: **look good on every screen, not identical on every
screen.** Sizes grow with the screen only up to a ceiling.

- **Root size (interim, applied 2026-10-27):** phone `clamp(14px, 100vw/24.375, 18px)`,
  tablet `clamp(13px, 100vw/48, 18px)`, desktop `clamp(13px, 100vw/90, 17px)`.
  1rem is 16px at 390, 768 and 1440, and **stops at 17px** from 1530px up.
- **Target in R1:** a fixed 16px root (so the visitor's browser font-size
  setting is respected) with fluid tokens: `--step-0` to `--step-6` using
  `clamp(min, preferred, max)` for type and `--space-*` for spacing, each with a
  ceiling. Retire per-device root scaling.
- **Container:** `container-site` is capped at `96rem` (about 1630px). Section
  backgrounds run full width; content never does. Text measure: 65 to 75
  characters (`max-w-prose`-style), hero copy 36rem.
- **No raw `vw` sizes.** Heights and widths use `rem`, `clamp()` with a rem
  ceiling, aspect ratios, or container query units (`cqw`) inside a capped
  container. A check in CI greps for `[0-9]vw` outside `clamp(`/`min(`.
- **Breakpoints:** 360, 640, 768, 1024, 1280, 1536. Layout changes at 640 and
  1024. From 1536 upward only the side margins grow.
- **Grids:** 4 columns on phones, 6 on tablets, 12 on desktop. Equal-size cards
  in a row; the leading rows take the pairs so no row ends with an orphan.
- **Mockups** (`Stage`) scale to their container, so they obey the same cap.
- **Test matrix** for every template: 360x740, 390x844, 768x1024, 1024x768,
  1280x720, 1440x900, 1920x1080, 2560x1440, 3840x2160.

### 3.3 Layout and rhythm

- 4px spacing unit. Section padding `clamp(4rem, 8vw, 7.5rem)` top and bottom.
- Radius: panels 2 to 2.5rem, cards 1.5 to 2rem, controls pill. App mockups use
  the CRM radius scale (2 to 16px).
- One H1 per page, then H2 sections in order; never skip a level.
- **Say it once.** No label above an H1 that repeats the title or breadcrumb
  (decision 2026-10-22). No section that repeats the header menu.
- Equal-size blocks in grids; no tabs that hide primary content.

### 3.4 Colour and type (kept from v2)

- Warm paper `#f6f2ea`, ink `#16181b`, forest `#123b32` with mint `#9fdcb8` for
  Nirman CRM. Each service owns a colour: SEO cobalt, Websites coral, Software
  peacock, Marketing rose, Mobile apps marigold. Colour carries meaning, not
  decoration. Full values: `design-handoff/tokens.css`.
- Mona Sans (display, numbers) and Funnel Sans (body, UI). Figures use tabular
  digits. Display sizes always carry a rem ceiling.

### 3.5 Imagery, video and HTML screens

- **Product proof is code.** Dashboards, reports, phones and chats are built in
  HTML (`service-art.tsx`, `nirman-crm.tsx`), not stock screenshots.
- **Photos are atmosphere,** self-hosted, never captioned as our team or
  clients. No stock photos of random people inside service tiles.
- **Video is ambient:** muted, looping, short (under 10 s), at most two per
  page, under 6 MB each, with a poster. It starts only when visible, is paused
  off screen, and is replaced by the poster on phones, with Save-Data on, or
  with reduced motion. Never autoplay with sound. Nothing important lives only
  in a video.
- Every image has useful alt text, or empty alt when decorative.
- Sample content (names, figures, brands in mockups) is labelled on the page.

### 3.6 Motion

Purposeful and quiet: one entrance per section, user-triggered transitions,
scroll-linked movement only where it explains (process steps). All motion off
under `prefers-reduced-motion`.

### 3.7 Accessibility

WCAG 2.2 AA. Visible focus ring, keyboard path through every menu and tab set,
contrast 4.5:1 for text and 3:1 for controls, target size 44px, no information
by colour alone, forms with real labels and error text, skip link, landmarks.

### 3.8 Writing

- Plain words, short sentences, active voice.
- **Spelling:** URLs and the keyword in page titles follow what searchers type
  (US "optimization"); body copy uses the Indian/British spelling already on the
  site ("optimise", "customise"). Pick one per context and do not mix inside a
  sentence.
- **Answer first:** the opening paragraph answers the page's question.
- Outcomes before features. No hype words, no unsupported superlatives.
- Never promise rankings or results.

---

## 4. Sitemap

v2 has 39 registered pages. v3 plans **95 static pages** (39 launch core, 41 to write for launch, 15 after launch) plus CMS pages (case studies, posts, guides, glossary terms, authors).

| Section | Pages | L1 launch core | L2 write for launch | L3 after launch |
|---|---|---|---|---|
| Home | 1 | 1 | 0 | 0 |
| Services (4 pillars) | 32 | 19 | 13 | 0 |
| Nirman CRM (own product) | 22 | 2 | 15 | 5 |
| Industries | 9 | 1 | 4 | 4 |
| Work | 1 | 1 | 0 | 0 |
| Resources and tools | 17 | 8 | 4 | 5 |
| Company and contact | 8 | 5 | 2 | 1 |
| Legal and utility | 5 | 2 | 3 | 0 |
| **Total static pages** | **95** | **39** | **41** | **15** |

**Tiers.** L1 = launch core (exists today or must exist at launch). L2 = new,
intent-specific pages to write before or at launch. L3 = after launch, or
depends on content the client has not supplied yet.

**Quality gate.** A page is published only when it has a unique H1, a
direct-answer opening, at least one original element (screen, report, table or
example), five or more FAQs, and passes section 12. Pages in a tier that is not
ready stay out of navigation, out of `sitemap.xml` and out of `llms.txt`.
Stubs are never indexed.

**No doorway pages.** There are deliberately no "SEO agency in <city>" or
"developers in <country>" pages: one office, and near-duplicate location pages
are a spam risk. International reach is covered by `/services/seo/international-seo/`,
the About page and structured data (`areaServed`).

**Page-to-page overlap.** `/industries/<x>/` is the full-service view for a
sector; `/nirman-crm/for/<x>/` is the product view for the same sector. They
share a cross-link, never copy.

### 4.1 Home

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/` | Home | home | Nirman: SEO, websites, software and CRM | Entity definition above the fold; links every pillar. |

### 4.2 Services (4 pillars)

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L2 | `/services/` | All services | hub | digital services overview | Index of the four pillars; helps brand + category queries. |
| L1 | `/services/seo/` | SEO services | hub | SEO services | Pillar hub. |
| L1 | `/services/seo/local-seo/` | Local SEO | service | local SEO services |  |
| L2 | `/services/seo/google-business-profile/` | Google Business Profile management | service | Google Business Profile optimization | Split from local SEO to own the GBP queries. |
| L1 | `/services/seo/ecommerce-seo/` | E-commerce SEO | service | e-commerce SEO |  |
| L1 | `/services/seo/technical-seo/` | Technical SEO and site audit | service | technical SEO audit |  |
| L2 | `/services/seo/content-seo/` | SEO content writing | service | SEO content writing |  |
| L2 | `/services/seo/international-seo/` | International SEO | service | international SEO | Serves the India + overseas audience; no per-country doorway pages. |
| L1 | `/services/seo/ai-search-optimization/` | AI search optimization (GEO and AEO) | service | generative engine optimization | Flagship differentiator. |
| L1 | `/services/web/` | Website design and development | hub | website design and development | Pillar hub. |
| L1 | `/services/web/website-design/` | Website design | service | website design services |  |
| L1 | `/services/web/website-development/` | Website development | service | website development company |  |
| L2 | `/services/web/nextjs-development/` | Next.js development | service | Next.js development | Developer-intent page. |
| L1 | `/services/web/ecommerce-websites/` | E-commerce websites | service | e-commerce website development | Overview; platform pages below. |
| L2 | `/services/web/shopify-development/` | Shopify development | service | Shopify development services |  |
| L2 | `/services/web/woocommerce-development/` | WooCommerce development | service | WooCommerce development |  |
| L1 | `/services/web/wordpress-development/` | WordPress development | service | WordPress development services |  |
| L2 | `/services/web/landing-pages/` | Landing page design | service | landing page design |  |
| L1 | `/services/web/redesign-maintenance/` | Website redesign and maintenance | service | website redesign and maintenance |  |
| L1 | `/services/software/` | Custom software development | hub | custom software development | Pillar hub. |
| L1 | `/services/software/crm-development/` | CRM development | service | custom CRM development | Points to Nirman CRM; CTA wording per CRM rule. |
| L1 | `/services/software/web-apps/` | Web apps and SaaS development | service | web app and SaaS development |  |
| L1 | `/services/software/mobile-apps/` | Mobile app development | service | mobile app development |  |
| L1 | `/services/software/automation-integrations/` | Automation and integrations | service | business process automation |  |
| L2 | `/services/software/internal-tools/` | Internal tools and dashboards | service | internal tools development |  |
| L2 | `/services/software/customer-portals/` | Customer portals | service | customer portal development |  |
| L1 | `/services/marketing/` | Marketing automation via CRM | hub | marketing automation | Pillar hub. No PPC or social media marketing, ever. |
| L1 | `/services/marketing/whatsapp-marketing/` | WhatsApp marketing | service | WhatsApp marketing | No WhatsApp logos in our artwork. |
| L2 | `/services/marketing/whatsapp-business-api/` | WhatsApp Business API | service | WhatsApp Business API setup |  |
| L1 | `/services/marketing/email-marketing/` | Email marketing | service | email marketing services |  |
| L2 | `/services/marketing/email-automation/` | Email automation | service | email marketing automation |  |
| L2 | `/services/marketing/lead-nurturing/` | Lead nurturing | service | lead nurturing automation |  |

### 4.3 Nirman CRM (own product)

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/nirman-crm/` | Nirman CRM | product | CRM software with WhatsApp and email | Product page. Current route is /crm/; rename and 301. |
| L2 | `/nirman-crm/features/` | Nirman CRM features | hub | CRM features |  |
| L2 | `/nirman-crm/features/lead-management/` | Lead management | feature | CRM lead management |  |
| L2 | `/nirman-crm/features/sales-pipeline/` | Sales pipeline | feature | sales pipeline CRM |  |
| L2 | `/nirman-crm/features/whatsapp-integration/` | WhatsApp in your CRM | feature | WhatsApp CRM integration |  |
| L2 | `/nirman-crm/features/email-integration/` | Email in your CRM | feature | CRM with email integration |  |
| L2 | `/nirman-crm/features/follow-up-automation/` | Follow-up automation | feature | CRM follow-up automation |  |
| L2 | `/nirman-crm/features/reports-and-analytics/` | Reports and analytics | feature | CRM reports and analytics |  |
| L2 | `/nirman-crm/features/team-and-permissions/` | Team and permissions | feature | CRM user roles and permissions |  |
| L2 | `/nirman-crm/for/` | Nirman CRM by industry | hub | CRM for small business by industry |  |
| L2 | `/nirman-crm/for/real-estate/` | Nirman CRM for real estate | usecase | CRM for real estate | Industry pipeline stages and screens; distinct from /industries/. |
| L2 | `/nirman-crm/for/healthcare/` | Nirman CRM for clinics and healthcare | usecase | CRM for clinics | Industry pipeline stages and screens; distinct from /industries/. |
| L2 | `/nirman-crm/for/education/` | Nirman CRM for education | usecase | CRM for coaching and education | Industry pipeline stages and screens; distinct from /industries/. |
| L2 | `/nirman-crm/for/manufacturing/` | Nirman CRM for manufacturers and B2B | usecase | CRM for manufacturers | Industry pipeline stages and screens; distinct from /industries/. |
| L3 | `/nirman-crm/for/hospitality-travel/` | Nirman CRM for hospitality and travel | usecase | CRM for hotels and travel agencies | Industry pipeline stages and screens; distinct from /industries/. |
| L3 | `/nirman-crm/for/finance-insurance/` | Nirman CRM for finance and insurance | usecase | CRM for insurance agents | Industry pipeline stages and screens; distinct from /industries/. |
| L3 | `/nirman-crm/for/ecommerce/` | Nirman CRM for e-commerce | usecase | CRM for online stores | Industry pipeline stages and screens; distinct from /industries/. |
| L3 | `/nirman-crm/for/local-services/` | Nirman CRM for local services | usecase | CRM for service businesses | Industry pipeline stages and screens; distinct from /industries/. |
| L2 | `/nirman-crm/integrations/` | Nirman CRM integrations | listing | CRM integrations | Website forms, Meta lead ads, payment gateways, IndiaMART/JustDial if relevant. |
| L2 | `/nirman-crm/security/` | Security and data ownership | trust | CRM data security | Trust page for buyers. |
| L1 | `/nirman-crm/book-a-demo/` | Book a Nirman CRM demo | form | book a CRM demo | Replaces /book-a-call/?type=crm-demo. Demo only: no signup, no trial. |
| L3 | `/nirman-crm/vs-spreadsheets/` | Nirman CRM vs spreadsheets | comparison | CRM vs Excel | Competitor-name comparisons need legal review before any are written. |

### 4.4 Industries

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/industries/` | Industries we serve | hub | digital services by industry | Eight cards, each a button to its page. |
| L2 | `/industries/real-estate/` | Digital services for real estate | industry | digital marketing and software for real estate | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L2 | `/industries/healthcare-clinics/` | Digital services for healthcare and clinics | industry | digital marketing and software for healthcare and clinics | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L2 | `/industries/education/` | Digital services for education and coaching | industry | digital marketing and software for education and coaching | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L2 | `/industries/ecommerce-retail/` | Digital services for e-commerce and retail | industry | digital marketing and software for e-commerce and retail | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L3 | `/industries/manufacturing-b2b/` | Digital services for manufacturing and b2b | industry | digital marketing and software for manufacturing and b2b | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L3 | `/industries/hospitality-travel/` | Digital services for hospitality and travel | industry | digital marketing and software for hospitality and travel | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L3 | `/industries/finance-insurance/` | Digital services for finance and insurance | industry | digital marketing and software for finance and insurance | Full-service view: problems, recommended services, CRM fit, sample case study. |
| L3 | `/industries/local-services/` | Digital services for local services | industry | digital marketing and software for local services | Full-service view: problems, recommended services, CRM fit, sample case study. |

### 4.5 Work

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/work/` | Our work | listing | case studies | Filter chips by service and industry (filters are not indexed). |

### 4.6 Resources and tools

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L2 | `/resources/` | Resources | hub | digital growth resources | Landing page for blog, guides, glossary, FAQ and tools. |
| L1 | `/blog/` | Blog | listing | digital marketing and software blog | Posts and category pages come from the CMS. |
| L2 | `/guides/` | Guides | listing | in-depth guides | Long-form pillar guides from the CMS. |
| L2 | `/glossary/` | Glossary | listing | digital marketing glossary | Definition pages from the CMS; strong for AEO. |
| L2 | `/faq/` | Frequently asked questions | faq | questions about Nirman's services | Grouped by topic; every answer also lives on its service page. |
| L1 | `/tools/` | Free tools | hub | free SEO and marketing tools | No signup, free forever. |
| L1 | `/tools/seo-audit/` | Free SEO audit | tool | free SEO audit tool | Flagship; score shows without email. |
| L1 | `/tools/serp-preview/` | Meta tag and SERP preview | tool | SERP preview tool |  |
| L1 | `/tools/schema-generator/` | Schema markup generator | tool | schema markup generator |  |
| L1 | `/tools/sitemap-generator/` | Sitemap and robots.txt generator | tool | sitemap generator |  |
| L1 | `/tools/gbp-checker/` | Google Business Profile checker | tool | Google Business Profile checker |  |
| L1 | `/tools/whatsapp-link/` | WhatsApp link and QR code generator | tool | WhatsApp link generator |  |
| L3 | `/tools/email-subject-tester/` | Email subject line tester | tool | email subject line tester | Phase 2 tool. |
| L3 | `/tools/utm-builder/` | UTM link builder | tool | UTM builder | Phase 2 tool. |
| L3 | `/tools/keyword-ideas/` | Keyword idea generator | tool | keyword idea generator | Phase 2 tool. |
| L3 | `/tools/page-speed-checker/` | Page speed checker | tool | page speed checker | PageSpeed Insights wrapper. |
| L3 | `/tools/lost-leads-calculator/` | Lost leads calculator | tool | lead loss calculator | No prices of ours shown. |

### 4.7 Company and contact

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/about/` | About Nirman | about | about Nirman | Story, values, countries served; stats from one source of truth. |
| L2 | `/about/how-we-work/` | How we work | about | our process | Five stages, what you receive at each, timelines. |
| L2 | `/about/team/` | Our team | about | Nirman team | Names, roles, photos: needs client input (E-E-A-T). |
| L1 | `/contact/` | Contact | form | contact Nirman | Short form, phone, WhatsApp, address, map, booking. |
| L1 | `/get-a-quote/` | Get a quote | form | get a quote | Multi-step form; no prices. |
| L1 | `/book-a-call/` | Book a call | form | book a discovery call | Calendar embed. |
| L1 | `/thank-you/` | Thank you | utility |  | noindex. |
| L3 | `/careers/` | Careers | about | Nirman careers | Only if the client hires; otherwise drop. |

### 4.8 Legal and utility

| Tier | URL | Page | Template | Primary topic | Notes |
|---|---|---|---|---|---|
| L1 | `/privacy-policy/` | Privacy policy | legal |  |  |
| L1 | `/terms/` | Terms of service | legal |  |  |
| L2 | `/cookie-policy/` | Cookie policy | legal |  | Linked from the consent banner. |
| L2 | `/accessibility/` | Accessibility statement | legal |  | WCAG 2.2 AA commitment and contact. |
| L2 | `/sitemap/` | Sitemap | utility |  | HTML sitemap for people and crawlers. |


### 4.9 Pages generated from the CMS (not counted above)

| Pattern | What | Source | Notes |
|---|---|---|---|
| `/work/[slug]/` | Case study | Sanity | Client, challenge, solution, results with numbers, services used, quote. |
| `/blog/[slug]/` | Blog post | Sanity | Article schema, author, reviewed date. |
| `/blog/category/[slug]/` | Blog category | Sanity | Indexed; unique intro text. |
| `/guides/[slug]/` | Guide | Sanity | Pillar content with table of contents. |
| `/glossary/[term]/` | Glossary term | Sanity | Definition first, DefinedTerm schema. |
| `/authors/[slug]/` | Author profile | Sanity | Person schema, credentials, articles. |

### 4.10 URL rules and redirects

- Lowercase, hyphenated, trailing slash, no dates in URLs, no file extensions.
- Depth at most three levels below the root.
- `/crm/` (v2) becomes `/nirman-crm/`; keep a permanent 301 from the old path.
- When a path changes, add the 301 in `next.config.ts` in the same commit.
- Filters (work by service, tools by type) are query strings, `noindex`,
  canonical to the unfiltered page.

---

## 5. Navigation and menus

### 5.1 Header (desktop)

Floating pill that turns frosted after a short scroll. Left: logo. Centre:

| Item | Opens | Contents (every entry is a button) |
|---|---|---|
| **Services** | Mega menu, 4 columns | One column per pillar (SEO, Websites, Software, Marketing): the hub as a Tonal button, then its children as Quiet buttons with a short descriptor. Bottom strip: "All services" and "Not sure where to start? Book a call". |
| **Nirman CRM** | Dropdown | Overview, Features (top four), Use cases by industry (top four), Integrations, Security, and a **Book a demo** button. |
| **Industries** | Dropdown, 2 columns | The eight industry pages with an icon each, then "All industries". |
| **Work** | Direct link | `/work/` |
| **Resources** | Dropdown | Blog, Guides, Glossary, FAQ, Free tools. Highlights **Free SEO audit**. |
| **Company** | Dropdown | About, How we work, Team, Contact. |

Right: **Free SEO audit** (Secondary, hidden below 1280px) and **Get a quote**
(Accent). On `/nirman-crm/*` the second becomes **Book a demo**.

Behaviour: hover opens after 80ms, closes after 180ms; click toggles; Escape and
outside click close; arrow keys move inside a menu; focus returns to the
trigger. A temporary review chip, **homepage1**, sits in the nav until the new
homepage is approved (remove then).

### 5.2 Mobile

Full-screen sheet. Accordions for Services, Nirman CRM, Industries, Resources,
Company; direct button rows for Work. Pinned at the bottom of the sheet:
Get a quote, Free SEO audit. A sticky bottom bar on every page: Call, Chat,
Get a quote (chat uses the generic icon, not the WhatsApp logo).

### 5.3 Footer

Ink panel with the six-colour stripe. Columns: **Nirman** (one-line definition,
phone, email, address, hours, opening promise "reply within 2 working hours"),
**Services** (the four hubs plus their top children), **Nirman CRM**,
**Industries**, **Resources**, **Company**. Bottom bar: privacy, terms, cookies,
accessibility, sitemap, social. All link lists are Quiet buttons.

### 5.4 Breadcrumbs

Quiet chips with a separator, on every page except home; the last chip is the
current page. Emits `BreadcrumbList` JSON-LD.

### 5.5 In-page navigation

Long pages (guides, CRM feature pages) get a sticky "On this page" list of
Quiet buttons. Contextual buttons inside content link sideways (for example the
technical SEO page offers "Run the free SEO audit").

---

## 6. Homepage plan

`/homepage1/` is the first build of this plan.

| # | Section | Job | Content | Assets | Buttons |
|---|---|---|---|---|---|
| 1 | **Hero** | Say what Nirman is in five seconds | H1 "Build better. Grow smarter."; a two-sentence entity definition (AEO); two buttons; a one-line promise | Looping muted video of analytics work, with three animated HTML cards on top (new lead, search ranking, speed score) | Get a quote, Free SEO audit |
| 2 | **Promise strip** | Remove the usual doubts | Four commitments: reply in 2 working hours, written proposal in 48 hours, you own your code and data, plain-language reports | Icons | none |
| 3 | **Services** | Show the four service lines, equally | Four equal pillar cards: outcome line, live mockup, three child buttons, one hub button | HTML mockups from the service pages | Explore SEO, Websites, Software, Marketing, plus 12 child buttons |
| 4 | **Statement band** | Pace the page, state the stance | One sentence: fast sites, SEO that answers questions, software that fits | Second looping video, dark tint | See our work, Talk to us |
| 5 | **Nirman CRM** | Introduce the product | The five interactive CRM screens, three callouts, six features | HTML screens (kept from v2) | Book a demo, Need a custom CRM? |
| 6 | **How we work** | Show a calm, visible process | Five steps; the picture panel stays pinned and changes as the steps scroll past | Photo plus a mockup of each step's deliverable | See how we work |
| 7 | **Industries** | Route visitors by sector | Eight equal button tiles with an icon and a one-line need | Icons | One button per industry, All industries |
| 8 | **Selected work** | Proof (marked SAMPLE until real) | Three case cards with headline metrics | Metric tiles | See all work |
| 9 | **Free tools** | Earn trust, capture intent | URL field for the SEO audit, five tool buttons | Icons | Run the audit, All free tools |
| 10 | **Quick answers** | AEO: direct answers to buyer questions | Eight questions, plain answers, `FAQPage` markup | none | Get a quote |
| 11 | **Final call to action** | Convert | Short quote form, three "what happens next" steps, phone and email buttons | none | Send my enquiry, Book a call |

Left out on purpose: testimonials and client logos (none are real yet; add a
section the day the client supplies them), a blog feed (no posts yet).

Homepage metadata: title "Nirman: SEO, websites, custom software and Nirman
CRM", the existing description, `Organization`, `WebSite`, `WebPage` and
`FAQPage` JSON-LD, one H1.

Assets used: two Pexels clips (free licence, no attribution needed):
`public/videos/hero-analytics.mp4` (1.8 MB, Pexels video 36435736) and
`public/videos/band-planning.mp4` (4.8 MB, Pexels video 5582829), each with a
poster. Photos from `public/photos`.

---

## 7. Page templates

Every template starts with: breadcrumb, H1, **answer block** (40 to 60 words
that answer the page's question and name Nirman), then the blocks below.

| Template | Blocks, in order |
|---|---|
| **Hub** (`/services/<x>/`) | Hero with mockup, who it is for, child-service cards (button each), how it works, what you get, results (SAMPLE), tools, FAQ, quote form |
| **Service** | Hero, who it is for (kinds of business), what is included, how it works (steps with mockups), what you get (reports), results, tools, FAQ, quote form. Already built in v2 (`service-page.tsx`) |
| **Industry** | Hero, the sector's typical problems, services we recommend (button cards), Nirman CRM for this sector, a sample case, FAQ, quote form |
| **CRM product** | Hero with Book a demo, problems it solves, the five screens, built-in WhatsApp and email, integrations, who it is for, customisation (link to CRM development), FAQ, Book a demo |
| **CRM feature** | Answer block, the feature's screen, how it works, outcomes, related features (buttons), FAQ, Book a demo |
| **CRM use case** | The sector's pipeline stages, a tailored screen, outcomes, FAQ, Book a demo |
| **Tool** | The tool first, then how to read the result, what to do next (buttons to services), FAQ |
| **Case study** | Client, challenge, solution, results with numbers, screenshots, quote, services used (buttons), next steps |
| **Article / guide** | Answer block, table of contents, sections with question headings, author and reviewed date, sources, related guides, call to action |
| **Glossary term** | Definition (40 words), longer explanation, an example, related terms, "how Nirman helps" button |
| **Form pages** | Short intro, form with inline validation, "what happens next", direct contact buttons |
| **Legal** | Plain-language text, last updated date |

Internal linking is handled by the breadcrumb, hub cards, contextual buttons in
content, the mega menu and the footer. v2 removed the "related services" block
(decision 2026-10-21) and v3 keeps it removed.

---

## 8. SEO, AEO and GEO

Built in from the first commit, not added afterwards.

### 8.1 Technical SEO

| Area | Standard |
|---|---|
| Rendering | Static generation or server rendering for every page; all text and links in the initial HTML; no content behind client-only fetches |
| Titles | Unique, 60 characters or fewer, topic first, " | Nirman" last. Title equals the H1 on service pages |
| Descriptions | Unique, 155 characters or fewer, benefit plus a reason to click |
| Canonical | Absolute, with trailing slash, self-referencing |
| Indexing | `robots` allows all pages except thank-you, search results and filters; one `sitemap.xml` with real `lastmod`; stubs excluded |
| Social | Open Graph and Twitter cards with `/og.png` or a per-page image |
| Headings | One H1, ordered levels, descriptive |
| Images | `next/image`, AVIF or WebP, explicit sizes, alt text, lazy except the LCP image |
| Fonts | Self-hosted through `next/font`, `display: swap`, subset |
| Speed budget | LCP 2.0 s or better, INP 200 ms or better, CLS 0.05 or less (mobile, p75); first load JS under 200 KB per route; video loaded after the page is interactive |
| Internationalisation | Single English site; `lang="en"`; no hreflang. `areaServed` in schema |
| Redirects and 404 | 301 for every renamed path; a 404 page with search and buttons |
| Monitoring | Search Console, Bing Webmaster Tools, GA4, Core Web Vitals field data |

### 8.2 Structured data

One `@graph` per page with stable `@id`s (`#organization`, `#website`, `#webpage`).

| Page type | Types |
|---|---|
| Every page | `Organization` (name, url, logo, `sameAs`, `contactPoint`, `areaServed`, `knowsAbout`), `WebSite`, `WebPage` (or `AboutPage`, `ContactPage`, `CollectionPage`), `BreadcrumbList` |
| Home | plus `FAQPage`, `ItemList` of services |
| Service and hub | `Service` (`provider`, `serviceType`, `areaServed`, **no `offers`, no price**), `FAQPage` |
| Nirman CRM | `SoftwareApplication` (`applicationCategory` BusinessApplication, no price), `FAQPage`, `VideoObject` when a demo video exists |
| Industry | `Service` list, `FAQPage` |
| Tool | `WebApplication` (`isAccessibleForFree`) |
| Case study | `Article` and `Organization` client mention |
| Article and guide | `Article` or `BlogPosting`, `Person` author, `datePublished`, `dateModified` |
| Glossary | `DefinedTerm` in a `DefinedTermSet` |
| Team and authors | `Person` with `jobTitle`, `worksFor`, `sameAs` |
| Office | `LocalBusiness` or `ProfessionalService` once the real address exists |
| Reviews | `Review` or `AggregateRating` **only** for real, verifiable reviews; never fabricated |

Validate with Google's Rich Results Test and Schema.org validator in CI where
possible. The visible FAQ text must match the `FAQPage` data exactly.

### 8.3 AEO: answer engine optimization

- **Answer block** first on every page: 40 to 60 words, self-contained, names
  Nirman, states who it is for and what they get.
- **Question headings.** H2/H3 phrased as people ask ("How long does a website
  take?"), the first sentence answers, the rest explains.
- **Definitions** in the form "X is...", **tables** for comparisons, **ordered
  lists** for steps, short paragraphs.
- **FAQ block** of 5 to 8 real questions per page, drawn from Search Console,
  sales calls and "People also ask".
- **Hubs for answers:** `/faq/` (grouped), `/glossary/`, `/guides/`.
- **Freshness:** "Reviewed <date>" on informational pages; real `dateModified`.

### 8.4 GEO: generative engine optimization

- **Entity clarity.** One canonical description of Nirman and Nirman CRM in
  `site.ts`, reused everywhere (name, what we do, where, who for). `/about/` is
  the entity home with `sameAs` links to LinkedIn and other real profiles.
- **Crawl access.** Keep the current policy: search and assistant crawlers
  (OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended,
  Applebot-Extended and others) are allowed. Publish `/llms.txt` (curated map,
  one line per key page) and `/llms-full.txt` (key pages as plain Markdown).
- **Quotable facts.** Short, sourced, dated statements ("A business website
  usually takes 3 to 6 weeks") in plain text, not images or video.
- **Named expertise.** Authors with bios and credentials; case studies with real
  numbers once supplied.
- **Corroboration off-site.** Consistent profiles on LinkedIn, Clutch,
  GoodFirms, G2 and Capterra (for the CRM), Google Business Profile once the
  address exists. Same name and description everywhere.
- **Original data** (later): anonymised, aggregated findings from the free SEO
  audit ("what we see across audited sites"), published as a dated guide.
- **Measure.** Each month run a fixed set of 20 buyer questions in ChatGPT,
  Perplexity, Gemini, Copilot and Google AI Overviews; record whether Nirman is
  named and linked; track AI referral visits in GA4. This is the same service we
  sell, applied to ourselves.

### 8.5 Internal linking rules

- Every page is reachable in three clicks from the home page.
- Hubs link to every child (button cards); children link up to the hub
  (breadcrumb) and sideways (contextual buttons).
- A script fails the build for any live page with fewer than three inbound
  internal links, or any link to a page that is not live.
- Anchor text is descriptive; no more than about 150 links per page.

---

## 9. Technical plan

- **Stack (unchanged):** Next.js 16 App Router, Tailwind 4, TypeScript,
  lucide-react, Sanity for the blog, guides, glossary, case studies and authors.
- **One registry.** `src/content/pages.ts` is generated from
  `docs/sitemap-v3.json` and gains `status: "live" | "planned"`, `tier`,
  `template`, `topic`. It feeds routes, navigation, breadcrumbs, `sitemap.xml`,
  `llms.txt`, the HTML sitemap and the link checker. Only `live` pages appear
  anywhere public.
- **UI kit** (`src/components/ui`): `Button`/`LinkButton` with the five
  variants, `Card` with stretched link, `Chip`, `Section`, `Container`,
  `Heading`, `Breadcrumbs`, `Prose` (the only place text links are allowed).
- **Templates** under `src/templates/` (one per row in section 7); pages are
  thin: metadata, JSON-LD and content objects.
- **Media:** `public/photos` (photos), `public/videos` (clips with posters),
  catalogues in `src/content/photos.ts` and `src/content/videos.ts`.
- **Mockups:** `service-art.tsx` and `nirman-crm.tsx` stay the home of HTML
  screens; new ones follow the 640 x 420 design-pixel convention.
- **Checks in CI:** `tsc`, lint, build, link checker, JSON-LD validation, a grep
  for raw `vw` and bare text links, and Lighthouse on key templates.
- **Forms:** one `/api/lead` route (validation, rate limit, Turnstile, CRM
  endpoint, email fallback). Until it exists, forms fall back to a pre-filled
  email.

---

## 10. Build plan

| Phase | Work | Done when |
|---|---|---|
| **R0** | This plan, `homepage1`, scale cap | You approve the sitemap and the homepage direction |
| **R1** Foundations | Tokens v3 and the fixed-16px fluid scale, UI kit with the five button variants, header and footer with mega menus, registry with `status`, lint and CI checks | Header and footer on every page follow section 3 and 5; matrix screenshots pass |
| **R2** Homepage | Take `homepage1` feedback, build the final `/`, remove the review chip | New home live, Lighthouse and schema pass |
| **R3** Templates | Hub, industry, CRM product, CRM feature, CRM use case, tool, listing, article, glossary, case study, form | Each template renders from content objects |
| **R4** Content | Write L1 gaps, then L2 pages in batches by pillar (SEO, Websites, Software, Marketing, CRM, Industries, Company). Each page ships with its own mockups, FAQs and answer block | Quality gate (section 4) passes for each page |
| **R5** Systems | Lead API and forms, booking, Sanity CMS, blog, guides, glossary, case studies, free tools and the SEO audit | Forms deliver to the CRM; CMS content publishes |
| **R6** SEO infrastructure | Full schema graph, `llms.txt` and `llms-full.txt`, sitemap `lastmod`, redirects, AI-visibility baseline | Rich Results Test clean; baseline recorded |
| **R7** Launch | Accessibility audit, performance pass, content and legal review, domain, analytics, redirects live | Launch checklist (old Phase 11) ticked |

How the old plan maps: Phase 5 (lead capture) is R5; Phase 6 (CRM page) is R3
and R4; Phases 7 and 8 (tools) and 9 (Sanity) are R5; Phase 10 is R4; Phase 11
is R7. Phases 0 to 4 are done and are reused by R1 to R4.

---

## 11. Inputs needed from the client

Domain and DNS access. Phone number, WhatsApp number, office address and
opening hours. Real case studies with numbers and screenshots. Testimonials and
client logos with permission. Team names, roles, photos and short bios (also
author profiles). Real social profiles. Whether to publish careers. Search
Console and Analytics access for the current site, if any. CRM endpoint,
booking tool (Cal.com or Calendly) and Cloudflare Turnstile keys. Legal text
for privacy, terms and cookies. Which competitors, if any, may be named in
comparison pages.

## 12. QA checklist (every page)

- One H1; answer block present; heading order correct.
- Title, description, canonical, Open Graph present and unique.
- JSON-LD valid; FAQ text equals FAQ schema.
- Every navigation element is a button (L1 to L7); text links only in prose.
- No prices, no PPC or social media marketing, no WhatsApp or Meta logos,
  CRM calls to action say "Book a demo", samples labelled.
- Alt text; contrast; keyboard path; focus visible; reduced motion respected.
- Checked at the full test matrix (section 3.2), no horizontal scroll.
- Lighthouse: performance and SEO 95 or better, accessibility 95 or better.
- At least three inbound internal links; no broken links.
- Spelling and consistent terminology.

## 13. Decisions to confirm

1. **Page plan:** 95 static pages in three tiers (section 4). Fewer, or go ahead?
2. **Rename `/crm/` to `/nirman-crm/`** with a 301 (brand plus keyword).
3. **Dedicated `/nirman-crm/book-a-demo/`** instead of `/book-a-call/?type=crm-demo`.
4. **Eight industry pages and eight CRM use cases** (four of each first).
5. **Careers page:** keep only if the client is hiring.
6. **No city or country pages** (doorway risk), as explained in section 4.
7. **Fixed 16px root with fluid tokens** in R1, replacing per-device root scaling.
8. **Brand identity unchanged** (colours, Mona Sans and Funnel Sans, CRM look).
9. **Stock video:** two ambient clips (Pexels licence) on the homepage; more only
   with the same rules.
10. **Hero headline:** keep "Build better. Grow smarter." (with the entity
    definition under it) or switch to a keyword-led H1.
