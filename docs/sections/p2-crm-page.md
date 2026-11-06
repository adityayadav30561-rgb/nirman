# P2 Nirman CRM page (`/nirman-crm/`)

Status: built and verified (2026-11-06)
Route: `nirman-site/src/app/nirman-crm/page.tsx`
Components: `src/components/crm-page/` (hero, tour, sections, integrations
hub, demo form, window crop); screens `src/components/crm/`; copy
`src/content/crm-page.ts`; demo data `src/content/crm-screens.ts`.

## Job
Sell Nirman CRM: show the real product, what it changes, and get a demo
booked. Every call to action is **Book a demo** (client rule); no prices.

## Key user rule (2026-11-06)
"Don't write SAMPLE anywhere, because however you design the pages will be
the design we will update our CRM into." The screens are the **real Nirman
CRM design**: sidebar Dashboard, Inbox, Leads, Pipeline, Follow-ups,
Campaigns, Automations, Reports; Settings; user. Demo data, no labels.
Screen colours follow the site tokens (ink, burnt orange; no blue).

## Sections (PAGE-PLAN section 3) and choices
Variants built on `/lab/crm-page/` (deleted after the choice). Comparison
sheets: `shots/p2-crm-<section>-1440.jpg` and `-375.jpg` (variants left to
right). Scores on the 70-point rubric (DESIGN-PROTOCOL 3).

| # | Section | Variants (idea) | Scores | Chosen |
|---|---|---|---|---|
| 1 | Hero | A centred + window that flattens on scroll; B split + floating event cards; C ink launch, window rises from the bottom edge; D text + phone in front of a window | **A 58**, B 54, C 60, D 51 | **A** (user override 2026-11-06; C scored highest) |
| 2 | Problems | A before/after rows; B four cards; C numbered list | **A 56**, B 52, C 51 | **A** |
| 3 | Feature tour (7 features) | A tabs over one window; B sticky story, window switches as each step passes; C alternating rows | A 56, **B 63**, C 50 | **B** |
| 4 | WhatsApp and email | A two cards + campaigns window; B ink band, phone + email card; C window + two lists | A 53, **B 60**, C 49 | **B** |
| 5 | Integrations | A tiles; B hub with lines drawn in; C two-column list | **A 57, B 57**, C 50 | **B** (tie: closer to the reference's hub plate) |
| 6 | Who it is for | A six cards; B rows; C chips | **A 55**, B 53, C 45 | **A** |
| 7 | Customisation | A ink band; B centred; C pale card | **A 58**, B 52, C 54 | **A** |
| 8 | Questions | Homepage Questions pattern reused (consistency), no email field; Book a demo button | n/a | reuse |
| 9 | Book a demo | A steps + form card; B ink band form; C centred form | **A 60**, B 59, C 55 | **A** (B would sit dark against the dark footer) |

Rhythm (after the user chose hero A): pale hero, problems and tour, ink WhatsApp/email, pale
integrations and audiences, ink customisation, pale questions and demo, ink
footer.

## Motion
- Hero (A): calm load fade-up (`gs-hide` start states, no flash); the
  dashboard window starts tilted back (rotateX 14deg) and flattens as you
  scroll; the phone rises at its corner (both scrubbed).
- Tour: ScrollTrigger toggles per step (60% line), Framer cross-fade of the
  screen, position dots.
- Integrations: lines draw from the hub, nodes pop in (GSAP, once).
- Everything else: `components/motion/reveal.tsx` (GSAP `.rv` fade-up).
- Reduced motion: no transforms; the tour switches without the fade.

## Build notes
- Screens added for this page: Leads (table, score, timeline), Reports
  (KPIs, months, funnel, team), Campaigns (WhatsApp/email broadcasts,
  stats, WhatsApp preview, replies chart), Automations (no-code workflow,
  ready-made flows). Dashboard gained "Due today" and "Recent activity";
  Follow-ups gained "Tomorrow"; Leads a pagination row. App window aspect
  16:9.4 (was 16:10) so screens have no empty bottom.
- Phones: windows become readable crops without the sidebar
  (`window-crop.tsx`).
- Demo form (`demo-form.tsx`): name, business, WhatsApp, email, team size,
  message; no backend yet (S1), so it opens the visitor's email app and
  says so; inline validation message; `#book-a-demo` anchor (homepage CTA
  target).
- Metadata: absolute title, description, canonical, Open Graph; JSON-LD
  SoftwareApplication (no offers: no prices), FAQPage, BreadcrumbList.
- Verified (Playwright, dev): 375, 768, 1024, 1440, 1920, reduced motion:
  no horizontal scroll, every reveal ends visible, the tour shows Pipeline
  at step 3, JSON-LD present, no console errors. `tsc`, `lint`, `build` pass.

## Client to confirm (copy claims taken from the handoff)
Meta lead ads, IndiaMART and JustDial, payment links, API/webhooks, data
import, export, official WhatsApp Business Platform. Adjust
`content/crm-page.ts` if any is not offered.
