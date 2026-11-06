# Page plan: how many pages, what is on each, what goes where

Status: **all decisions made 2026-11-06** (section 4; option B, 18 pages).
Only the old-site delete (item 8) waits on the user. Nothing here is built.
It replaces section 4 of `docs/REDESIGN.md` (the 95-page sitemap), which was
never approved. The look and motion come from `docs/REFERENCE-VIDEO.md`.
Business rules (`docs/handoff.md`) still apply: no prices, no PPC or social
media marketing, no WhatsApp/Instagram/Facebook logos, CRM calls to action say
"Book a demo", nothing invented (samples are labelled), URLs lowercase with a
trailing slash.

## 1. Choose the size

| Option | Pages | Good for | Cost |
|---|---|---|---|
| **A. Small** | 8 | Launch fast, one strong homepage, everything else short | Few search entry points; each service is only a section |
| **B. Focused (recommended)** | 18 | One page per service line and per key topic; each page rich, none vague | About 2 weeks of content after the homepage |
| **C. Large** | about 50 | Wide search coverage (every service, industry and CRM feature has its own page) | Content for 50 pages; risk of thin pages |

Option B list (each row says what the page is *for*):

| # | URL | Page | Job |
|---|---|---|---|
| 1 | `/` | Home | Say what Nirman is, show all four services and the CRM, get a quote |
| 2 | `/services/` | All services | Compare the four service lines side by side |
| 3 | `/services/seo/` | SEO | Local, e-commerce, technical and AI-search SEO in one page |
| 4 | `/services/websites/` | Websites | Design, development, e-commerce, WordPress, redesign and care |
| 5 | `/services/software/` | Custom software | CRM, web apps and SaaS, mobile apps, automation |
| 6 | `/services/marketing/` | Marketing automation | WhatsApp and email campaigns and follow-ups via Nirman CRM |
| 7 | `/nirman-crm/` | Nirman CRM | The product, with screens; the only call to action is Book a demo |
| 8 | `/industries/` | Industries | Eight sectors, a short section each, linking to the right service |
| 9 | `/work/` | Our work | Case studies (SAMPLE until real ones arrive) |
| 10 | `/about/` | About | Story, how we work, team, countries served |
| 11 | `/contact/` | Contact | Short form, phone, WhatsApp link, address, booking |
| 12 | `/get-a-quote/` | Get a quote | Multi-step form |
| 13 | `/tools/` | Free tools | Hub for the free tools |
| 14 | `/tools/seo-audit/` | Free SEO audit | The flagship tool |
| 15 | `/blog/` | Blog | Articles later; the page exists from day one |
| 16 | `/privacy-policy/` | Privacy policy | Legal |
| 17 | `/terms/` | Terms | Legal |
| 18 | `/thank-you/` | Thank you | After a form; not indexed |

## 2. Homepage: what goes where (follows the reference, section for section)

Order, content and assets. Wording is a draft for the user to change.

| # | Section | Content for Nirman | Artwork | Buttons |
|---|---|---|---|---|
| 1 | **Header** | Logo; nav: Home, Services (menu: SEO, Websites, Software, Marketing), Nirman CRM, Work, About, Contact; right: outline "Free SEO audit", dark "Get a quote" | Logo | Both header buttons |
| 2 | **Hero** | H1 (3 lines, with blue sparks and an orange underline under the last key words). Candidates: "Websites, SEO and software that grow your business." or "Build better. Grow smarter." Grey 2-line subtitle that says what Nirman is. Dark button "Get a quote" | A hand holding a phone; the phone shows Nirman CRM / a client site (built in code) | Get a quote |
| 3 | **Facts band** (blue) | Four facts with big numbers: **2 h** reply during working hours; **48 h** written proposal; **3 to 6 wk** a typical business website; **100%** your code, content and data | none | none |
| 4 | **What we do** | Heading "Everything your business needs to grow online." Four items with an icon each: Websites, SEO, Custom software, Marketing automation. One grey line each | Four icons (3D style) | A small dark button under each, to its service page |
| 5 | **Where we work** | Dotted world map with pins for India (our office) and the **markets we serve**: the US, the UAE, the UK. Pins say "markets we serve", never "our clients in", because those are target markets until the client lists real ones. Heading and sentence: a team in India that serves businesses abroad remotely, with calls in your time zone. A search-style bar: Service, Timeline, round "Get a quote" button | Dotted map generated in code; pins show small website and CRM screens | The bar's button |
| 6 | **Nirman CRM** | Heading "Every lead, answered and followed up." Sentence on WhatsApp and email built in. A cluster of chat bubbles and CRM cards (a lead arrives, assigned, replied in 2 minutes). Dark button "Book a demo" | HTML cards and chat bubbles; a generic chat icon (no logos) | Book a demo |
| 7 | **Results** | Heading "Results our customers can see." Three cards in a row with quote mark, 3 lines, avatar initials, name, role, rating. Arrows slide the row. **SAMPLE label until real quotes exist** | Initials avatars | Previous, Next |
| 8 | **Questions** | Heading "Got a question for Nirman?" Email field joined to a "Submit" button. Right: three to six questions with blue arrows that open short answers (also the FAQ markup for search) | none | Submit; each question row |
| 9 | **Footer** (blue) | Logo and a 3-line blurb; columns: Company, Services, Resources, Contact info; round social icons for the profiles we really have (LinkedIn when it exists); copyright | none | Footer buttons |

Motion for every section is in `REFERENCE-VIDEO.md` section 4: a hold on the
hero with the staggered entrance, then eased scroll with the reveal rule
(fade, rise 16 to 24 px, stagger 0.1 to 0.15 s), draw-in accents, and the
sliding results row.

## 3. The other pages (option B): sections in order

**All services `/services/`**: hero with one sentence; four equal rows (one per
service line: what it is, who it is for, three bullet outcomes, a dark button
to the page); "How we work" in five steps; Questions; Get a quote.

**SEO / Websites / Software / Marketing**: hero with a headline and a product
screen built in code; "Who it is for" (four kinds of business, each with a
line and what changes); "What is included" (the sub-services as cards, each
with a short paragraph; these replace separate sub-pages in option B); "How it
works" (five steps with what you receive); "What you get" (reports and screens
built in code); "Tools we use" (logos); sample results (marked); Questions;
quote form.

**Nirman CRM**: hero and the five CRM screens (dashboard, pipeline, leads,
follow-ups, reports, from `design-handoff/crm-screens.html`); problems it
solves; built-in WhatsApp and email; integrations; who it is for;
customisation (link to CRM development in Software); Questions; **Book a demo**
(every call to action on this page).

**Industries**: eight short sections (real estate, healthcare and clinics,
education, e-commerce and retail, manufacturing and B2B, hospitality and
travel, finance and insurance, local services). Each: the typical problem, the
service and CRM stages that fit, a Get a quote button.

**Our work**: filter chips (All, SEO, Web, Software, Apps, Marketing); case
cards with a headline number, tags and a Get a quote link. SAMPLE until real.

**About**: our story in a few lines; how we work (five steps); what you can
count on (the four facts); team (names and photos from the client); countries
we serve; Get a quote.

**Contact**: short form; phone; WhatsApp link; email; India address and map;
booking embed; "We reply within 2 working hours (IST)."

**Get a quote**: step 1 what you need (multi-select), step 2 details, step 3
budget (optional, no figures from us), step 4 contact; side panel "what
happens next"; ends on Thank you.

**Free tools and the SEO audit**: tools grid with one line each; the audit page
is the tool first, then how to read the result and what to fix.

**Blog**: list and category chips; articles later.

## 4. Decisions needed from the user

1. **Size: decided 2026-11-06, option B (18 pages).**
2. **Rendering: decided, full-width page** with the reference's motion.
3. **Hero headline: decided,** "Websites, SEO and software that grow your
   business."
4. **Facts band: decided,** the four true facts above.
5. **Results section: decided,** shown now with cards labelled SAMPLE.
6. **Typeface: decided, Poppins.**
7. **Artwork: decided,** Claude builds icons, map and screens in code,
   downloads a free-licence hand-with-phone photo (asks first), uses the
   current logo.
8. **Remove the old site:** nothing has been deleted. A safety check blocked
   the bulk delete, so you run it yourself (command in STATUS.md). The old code
   is safe in commit `2eba621` on GitHub (and the local tag `archive/v2`).
