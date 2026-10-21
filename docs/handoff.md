# Nirman Website — Developer Handoff (everything except design)

This document covers the business decisions, site structure, content, features, tech stack, code layout and known gotchas for the Nirman company website. **Visual design is deliberately left out**: colours, fonts, illustrations, section look and animations are being redone in a new session. Treat anything visual in the current code as disposable.

Related files in `E:\nirman\`:
- `WEBSITE_PLAN.md`: the original full plan (sitemap, page blueprints, tools spec). This handoff supersedes it where they differ.
- `ASSETS_NEEDED.md`: art asset list for the old design. Ignore for the new design.
- `website/`: the Next.js project.

---

## 1. Business decisions (locked)

| Topic | Decision |
|---|---|
| Company | **Nirman** |
| Domain | Not shared yet. Read from `NEXT_PUBLIC_SITE_URL` (placeholder `https://www.example.com`). |
| Services | SEO, website design & development, custom software (CRM, web apps, **mobile apps**), WhatsApp & email marketing via CRM |
| Not offered | PPC / Google Ads, social media marketing. Don't add pages, menu items or art that suggest them. |
| Own product | **Nirman CRM**: a ready product with WhatsApp and email built in. **Demo only** (no self-signup, no free trial). Custom CRM builds are also sold as a service. |
| Market | India + international (US, UAE, UK, etc.). Single English site, no hreflang. |
| Offices | **India only**: one address, one phone. International clients are served remotely. |
| Pricing | **No prices anywhere.** No pricing page, no cost calculator. Every service ends in "Get a quote". |
| Proof assets | Case studies with numbers, testimonials, and client logos exist (not yet supplied). No certifications or badges yet. |
| Industries featured | Real estate, healthcare/clinics, education, e-commerce/retail, manufacturing/B2B, hospitality/travel, finance/insurance, local services |
| Blog / CMS | **Sanity** (decided, not yet installed) |
| Tech | **Next.js** (App Router) + Tailwind |

**Pending from the client:** domain, WhatsApp number and main phone, office address, real case studies (with screenshots), real team (names, roles, photos), testimonials, client logos.

---

## 2. Sitemap (~40 pages at launch)

### Core pages
| Page | URL | Notes |
|---|---|---|
| Home | `/` | |
| About | `/about/` | |
| Contact | `/contact/` | Short form + booking embed |
| Get a quote | `/get-a-quote/` | Multi-step form, replaces a pricing page |
| Our work | `/work/` | Case study list with filters |
| Case study detail | `/work/[slug]/` | From CMS |
| Industries | `/industries/` | Single page, 8 industries |
| Blog list | `/blog/` | From CMS |
| Blog post | `/blog/[slug]/` | From CMS |
| Book a call / demo | `/book-a-call/` | Calendar embed; used for CRM demos too |
| Careers | `/careers/` | Optional |
| Privacy policy | `/privacy-policy/` | |
| Terms | `/terms/` | |
| Thank you | `/thank-you/` | After any form |
| 404 | not-found | |

### Product
| Page | URL |
|---|---|
| Nirman CRM | `/crm/` |

Phase 2: `/crm/features/`, `/crm/integrations/`.

### Services (18 pages; 4 hubs + 14 detail pages)
| Pillar | Page | URL |
|---|---|---|
| SEO | SEO services (hub) | `/services/seo/` |
| | Local SEO & Google Business Profile | `/services/seo/local-seo/` |
| | E-commerce SEO | `/services/seo/ecommerce-seo/` |
| | Technical SEO & site audit | `/services/seo/technical-seo/` |
| | AI search optimization (GEO/AEO) | `/services/seo/ai-search-optimization/` |
| Web | Website design & development (hub) | `/services/web/` |
| | Website design | `/services/web/website-design/` |
| | Website development | `/services/web/website-development/` |
| | E-commerce websites (Shopify/WooCommerce) | `/services/web/ecommerce-websites/` |
| | WordPress development | `/services/web/wordpress-development/` |
| | Redesign & maintenance | `/services/web/redesign-maintenance/` |
| Software | Custom software (hub) | `/services/software/` |
| | CRM development | `/services/software/crm-development/` |
| | Web apps & SaaS | `/services/software/web-apps/` |
| | Mobile app development | `/services/software/mobile-apps/` |
| | Automation & integrations | `/services/software/automation-integrations/` |
| Marketing | Marketing automation via CRM (hub) | `/services/marketing/` |
| | WhatsApp marketing | `/services/marketing/whatsapp-marketing/` |
| | Email marketing | `/services/marketing/email-marketing/` |

### Free tools (hub + 6)
| Tool | URL |
|---|---|
| Tools hub | `/tools/` |
| Free SEO audit (flagship) | `/tools/seo-audit/` |
| Meta tag & SERP preview | `/tools/serp-preview/` |
| Schema markup generator | `/tools/schema-generator/` |
| Sitemap & robots.txt generator | `/tools/sitemap-generator/` |
| Google Business Profile checker | `/tools/gbp-checker/` |
| WhatsApp link & QR generator | `/tools/whatsapp-link/` |

URL rules: lowercase, hyphens, **trailing slash**, no `.php`.

---

## 3. Navigation

**Header (desktop):** Logo · Services ▾ · Nirman CRM · Free tools ▾ · Our work · About · Blog · [Free SEO audit] · [Get a quote]
- The Services dropdown has 4 columns (SEO / Web / Software / Marketing) plus a strip: "Not sure? Run a free SEO audit or book a 15-minute call".
- The Free tools dropdown lists the 6 tools plus "All free tools".
- Below 1280px the "Free SEO audit" link is hidden for space; the header otherwise fits on one line at 1024px.
- **Mobile:** a Menu button opens a full-screen menu: accordion of service groups, main links, then buttons for Get a quote, Free SEO audit and WhatsApp.

**Footer:** 4 columns: Services, Product & tools, Company (About, Our work, Industries, Blog, Careers, Contact, Get a quote), Contact details (phone, email, address, WhatsApp). Bottom bar: © year, Privacy, Terms, Sitemap.

All nav data lives in `src/lib/site.ts` (`serviceGroups`, `toolLinks`, `mainNav`).

---

## 4. Homepage (content and order)

Current order in `src/app/page.tsx`:

1. **Hero:** headline "The digital studio that builds it smart.", a one-paragraph intro, buttons "Get a free SEO audit" and "Book a consultation", and the note "Free 15-minute call. No obligation."
2. **Services:** the 4 service pillars, each with a title, one line and 3 quick links.
3. **Nirman CRM:** title, subtitle, a "dashboard" with 6 features (Lead capture, WhatsApp inbox, Email campaigns, Sales pipeline, Automations, Reports), 2 callouts ("WhatsApp-first", "Fits your process"), buttons "Book a demo" and "Need a custom CRM?".
4. **Client case studies:** 4 case studies (2 per "book"): picture, client, industry, 2-line description, 2 metrics. Button "See all our work".
5. **Our development journey:** 5 steps (Consultation & discovery → Architecture & design → Code & build → Quality check & launch → Ongoing support & growth).

**Built but not on the page yet** (components exist in `src/components/home/`): Free tools strip (`FreeTools.tsx`), Team (`Team.tsx`), Testimonials (`Testimonials.tsx`), FAQ + final CTA (`FaqCta.tsx`, which outputs FAQPage JSON-LD). The Footer and the consult pop-up card are also unmounted from `layout.tsx` for now.

**Planned final order:** Hero → Services → Nirman CRM → Case studies → Journey → Team → Free tools → Testimonials → FAQ + CTA → Footer.

All homepage copy and data live in `src/content/home.ts`: `services`, `crmFeatures`, `crmCallouts`, `journey`, `caseStudies`, `team`, `testimonials`, `faqs`. Items marked `SAMPLE` are placeholders; `<SampleTag />` shows a "sample data" badge in dev only.

---

## 5. Other page blueprints (content only)

**Service page template** (all 18): hero (H1 with keyword, outcome line, Get a quote / Free audit) → who it's for and what changes → what's included (6–9 deliverables) → process (4–6 steps with timeline) → platforms / tech stack → 1–2 result snippets → **engagement models** instead of prices (fixed scope / monthly retainer / dedicated team, plus "what affects cost") → FAQ (6–8, FAQPage schema) → related services → short quote form. Hubs use the same template, with child-service cards in place of deliverables.

**Get a quote** (multi-step): 1) what you need (multi-select: SEO, Website, E-commerce, Software/web app, Mobile app, CRM (Nirman CRM or custom), WhatsApp/email marketing, Not sure) → 2) project details (URL, features, platform, timeline) → 3) budget range (optional; INR or USD by country) → 4) contact (name, email, phone with country code, WhatsApp opt-in, company, country) → submit → thank-you page with a booking embed. Side panel: what happens next (reply within 2 working hours, discovery call, proposal in 48 hours).

**Nirman CRM:** hero + Book a demo → problems it solves → features → built-in WhatsApp and email → integrations (website forms, Meta lead ads, payment gateways, IndiaMART/JustDial if relevant) → who it's for → customisation (link to CRM development) → testimonials → FAQ → Book a demo. **Every CTA is "Book a demo"** (to `/book-a-call/` with "CRM demo" preselected).

**Our work:** filter chips (All · SEO · Web · Software · Apps · Marketing); cards show logo, industry, country, headline metric, tags. **Detail page:** client → challenge → solution → results (numbers, screenshots) → testimonial → services used → CTA. HTML, not PDF.

**About:** story, mission/values, stats (one source of truth), countries served, leadership team, optional culture, CTA. Badges only once earned.

**Contact:** short form (name, email, phone with country code, service dropdown, message); phone, WhatsApp, email, India address + map, booking embed in the visitor's time zone; "We reply within 2 working hours (IST)".

**Industries:** one page, 8 cards. Each card: typical problem, which services or Nirman CRM fit, a linked case study.

---

## 6. Free tools

Rules: each tool must attract search traffic, tie to a service we sell, and end with a soft CTA. **No tool may show prices.**

**Free SEO audit (flagship), spec:**
- Input: URL (required), target keyword (optional).
- Checks, in 6 weighted pillars:
  - On-page (20%): title, meta description, H1, heading order, keyword use, word count, image alt text, links.
  - Technical (20%): HTTPS, status, redirects, canonical, noindex, robots.txt, sitemap.xml, URL structure.
  - Speed / Core Web Vitals (20%): LCP, INP, CLS, page weight, from the **Google PageSpeed Insights API** (free).
  - Mobile (15%): viewport, mobile PSI score, tap targets, font size.
  - Structured data (10%): JSON-LD detected, types, errors.
  - Social & AI readiness (15%): OG/Twitter tags, favicon, `llms.txt`, AI crawlers allowed in robots.txt.
- Output: score /100 with a grade, 6 pillar scores, and issues ranked Critical/High/Medium/Low, each with "why" and "how to fix". **The score shows without an email.**
- Lead capture: "Email / WhatsApp me the full PDF report" asks for name, email and WhatsApp number, and pushes the lead to Nirman CRM.
- Automation (also a live demo of Nirman CRM): lead saved with score, URL, issues and country → instant WhatsApp + email with the PDF → day 2 email "Top 3 fixes" → day 5 WhatsApp follow-up from sales → score under 50 tagged "hot lead".
- Abuse protection: per-IP rate limit, Cloudflare Turnstile (invisible), cache results 24h per URL.
- Server-side: Next.js route handler that fetches the HTML, parses it (cheerio), calls PSI and builds the PDF.

**Other tools (client-side, no backend):**
- **SERP preview:** title/description → Google desktop and mobile preview with pixel-length check.
- **Schema generator:** form → JSON-LD (Organization, LocalBusiness, FAQ, Product, Article).
- **Sitemap & robots.txt generator:** paste URLs → sitemap.xml; robots.txt builder including AI crawlers.
- **GBP checker:** about 20 weighted checks → score + fix list.
- **WhatsApp link & QR:** number + message → wa.me link + downloadable QR.

**Phase 2 tools:** email subject line tester, UTM builder, keyword idea generator, page speed checker (PSI wrapper), lost-leads calculator (no prices).

**Tools hub:** grouped cards, "No signup, free forever", a recommended order (Audit → Fix meta → Add schema → Submit sitemap → Fix Google profile), and the CTA "When tools aren't enough, get a quote".

---

## 7. Leads, CRM and messaging

- **Every form** (quote, contact, service-page forms, audit report, demo booking) posts to **Nirman CRM** (API or webhook; endpoint not defined yet), with service tags, country and source page.
- Auto-acknowledgement on WhatsApp and email for each submission.
- WhatsApp: WhatsApp Business Cloud API (Meta), sent via Nirman CRM.
- Email: transactional via Resend or SES; marketing via Nirman CRM.
- Floating WhatsApp button (one number). On mobile, a sticky Call / WhatsApp / Get a quote bar.
- Consult pop-up: appears only after scrolling past the hero, never on entry, and stays closed once dismissed (remembered in localStorage). Component: `ConsultCard.tsx`.
- No entry or exit pop-ups. A cookie consent banner is needed (international visitors + analytics).

---

## 8. Blog and CMS (Sanity, not yet set up)

- **Sanity** hosted headless CMS (free tier) for blog posts, case studies, testimonials and team. Non-developers publish there.
- Suggested document types:
  - `post`: title, slug, excerpt, cover, body (portable text), category (SEO / Web / Software / Marketing / CRM), author, publishedAt, SEO title/description.
  - `caseStudy`: client, slug, industry, country, services[], summary, challenge, solution, results[{value, label}], screenshots[], testimonial, logo.
  - `teamMember`: name, role, photo, order.
  - `testimonial`: quote, name, role, company, caseStudy ref.
- Rendering: static generation with on-demand revalidation via a Sanity webhook → `revalidateTag`/`revalidatePath`. (Next 16: read `node_modules/next/dist/docs/` for the current caching APIs first.)
- Blog plan: 2 posts per week, in clusters matching the 4 pillars + Nirman CRM.
- Until Sanity is wired up, homepage case studies, team and testimonials come from `src/content/home.ts`.

---

## 9. SEO for our own site

- Unique title and description per page; one H1; clean URLs with trailing slashes.
- Root metadata in `src/app/layout.tsx`: `metadataBase` from `site.url`, title template `"%s | Nirman"`.
- JSON-LD: Organization, LocalBusiness (India office), Service (each service page), SoftwareApplication (Nirman CRM), FAQPage, BreadcrumbList, Article (blog), WebApplication (tools), Review/AggregateRating (real reviews only).
- `sitemap.xml`, `robots.txt` and `llms.txt` (use Next's `app/sitemap.ts` and `app/robots.ts`).
- Core Web Vitals targets: LCP < 2.0s, CLS < 0.1, INP < 200ms.
- Internal linking: hub ↔ child, service ↔ related tool ↔ case study ↔ blog, Nirman CRM ↔ CRM development ↔ WhatsApp/email marketing.
- Analytics: GA4, Search Console, Microsoft Clarity, Google Business Profile.

---

## 10. Tech stack and project

| Item | Value |
|---|---|
| Framework | **Next.js 16.4.2** (App Router, Turbopack), React 19.3 |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"` + `@theme` in `globals.css`) |
| Language | TypeScript |
| Lint | ESLint 9 flat config (`npm run lint`; `next lint` no longer exists) |
| next.config | `cacheComponents: true`, `partialPrefetching: true`, Tailwind loader rule for CSS |
| Fonts | `next/font/google` (self-hosted at build) |
| Hosting (plan) | Vercel, or a VPS + Cloudflare |
| Node | v24 locally |

**Commands** (run in `website/`):
- `npm run dev`: dev server on :3000. The desktop app's preview uses `E:\nirman\.claude\launch.json` (`npm --prefix website run dev`).
- `npm run build` / `npm start`
- `npm run lint`, `npx tsc --noEmit`
- `npm run assets`: converts art from `E:\nirman\assets-incoming\` into WebP in `public/assets/` (list in `scripts/process-assets.mjs`).

**Folder layout**
```
website/
  src/app/            layout.tsx (fonts, metadata, header), page.tsx (homepage), globals.css
  src/components/     Header, Footer, Logo, ConsultCard, SampleTag, PixelArt
  src/components/home Hero, Services, CrmSpotlight, CaseStudies, Journey, FreeTools, Team, Testimonials, FaqCta
  src/content/home.ts homepage copy + sample data
  src/lib/site.ts     contact details (placeholders) + all navigation data
  scripts/            asset tooling (see below)
  public/assets/      processed art (old design)
```

**Asset tooling** (reusable whatever the new design is):
- `scripts/cutout.py SRC DST [--black]`: removes the fake checkerboard (or black) "transparent" backgrounds that AI image tools paint in. Python + Pillow; run with `python -I`.
- `scripts/split-sheet.py SHEET PREFIX [gap]`: splits a sheet of several sprites into separate files.
- `scripts/process-assets.mjs`: resizes, crops (`extract`), trims and converts to WebP with sharp.
- `scripts/pixelate.mjs` / `portraits.mjs` / `src/lib/art-manifest.json` / `public/art/` / `art/src/`: the early code-drawn pixel art. **Obsolete; safe to delete** along with `PixelArt.tsx`, once nothing imports it (Footer, ConsultCard and Team still do).

**Not built yet:** every page except the homepage; all forms and the CRM integration; all free tools; Sanity; sitemap/robots/llms.txt; analytics; cookie banner; tests.

---

## 11. Gotchas (learned the hard way)

1. **Next.js 16 differs from older versions.** `website/AGENTS.md` says to read `node_modules/next/dist/docs/` before writing Next code. Notable changes: async request APIs only, `middleware` renamed to `proxy`, `next lint` removed, `next/image` defaults changed, `cacheComponents` on.
2. **The dev server on the E: drive often misses CSS edits** and keeps serving a stale stylesheet. If styles don't update, restart `npm run dev`. To check, fetch the CSS chunk and grep for the new rule.
3. **No non-ASCII characters in CSS comments.** Box-drawing characters like `─` made Turbopack silently drop every rule after them.
4. **Site-wide scaling:** `html { font-size: clamp(16px, 100vw/90, 40px) }`, so from 1440px up the whole rem-based site scales with screen width (same composition on a laptop and a 27" monitor). Use rem/em, not px caps, or things stop growing on big screens. Decide whether the new design keeps this.
5. **Header height** comes from CSS variables `--header-bar` / `--header-h`; the hero uses `100svh - var(--header-h)`.
6. Raw `<img>` is used for pre-optimised WebP art; ESLint's `no-img-element` is disabled per line with a reason.
7. **Content rules:** no prices anywhere; no PPC or social media services; no WhatsApp/Instagram/Facebook logos in our own art; CRM CTAs are "Book a demo" only.
8. Placeholders to replace before launch: everything in `src/lib/site.ts` (phone, WhatsApp, email, address, URL) and every `SAMPLE` block in `src/content/home.ts`.

---

## 12. Suggested build order (non-design)

1. Final design system and layout shell (new session).
2. Wire up `sitemap.ts`, `robots.ts`, `llms.txt` and per-page metadata.
3. Service page template + the 18 service pages (content in a `content/services/*.ts` or Sanity).
4. Get a quote + Contact + Book a call, with forms posting to the Nirman CRM endpoint.
5. Nirman CRM page.
6. Free SEO audit (route handler + PSI + PDF + CRM lead), then the 5 client-side tools.
7. Sanity: blog, case studies, team, testimonials; then the Our work pages.
8. About, Industries, legal pages, 404, thank-you.
9. Analytics, cookie consent, Core Web Vitals pass, launch checklist.
