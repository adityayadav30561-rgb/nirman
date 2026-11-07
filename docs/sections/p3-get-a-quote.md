# P3 Get a quote (`/get-a-quote/`) and Thank you (`/thank-you/`)

Status: built and verified (2026-11-07), variant B
Routes: `nirman-site/src/app/get-a-quote/page.tsx`, `src/app/thank-you/page.tsx`
Form: `src/components/quote/quote-form.tsx`; copy `src/content/quote.ts`

## Job
Where every "Get a quote" button lands (header, hero, map quote bar,
footer). Make asking for a quote quick and calm, set expectations, collect
what the team needs for the first call.

## Content (PAGE-PLAN section 3, handoff)
- Four steps: 1 what you need (multi-select: website, online store, SEO,
  custom software, mobile app, Nirman CRM, custom CRM, WhatsApp and email
  marketing, not sure); 2 details (what to build, current site, timeline,
  location); 3 budget, optional, typed by the visitor (**no figures from
  us**), or "discuss on the call", with Skip; 4 contact (name, email
  required; business, WhatsApp/phone optional; reply by WhatsApp, email or
  call).
- What happens next, approved facts only: reply within 2 working hours
  (IST), a short call, written proposal within 48 hours, you own
  everything.
- Pre-fill: `?service=` and `?timeline=` from the homepage quote bar
  (`content/map.ts` values mapped in `fromQuoteBar`).

## Variants (layout around the same form)
| Variant | Idea | Motion |
|---|---|---|
| A | Split: intro + sticky "what happens next" left, form card right | Reveal; Framer step slide |
| B | Centred: heading, one form card, next steps as four tiles below | same |
| C | One big question per screen, large tiles, promises as a strip | same, larger type |
| D | Dark aside with intro and next steps, pale form side | same |

Built on `/lab/quote/` (deleted). Sheets `shots/p3-quote-{1440,375}.jpg`
(A to D left to right, step 1).

## Scores (70-point rubric)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 5 | 5 | 4 | 5 |
| Fit with the reference (2) | 4 | 4 | 3 | 4 |
| Motion fit (2) | 3 | 3 | 3 | 3 |
| Conversion (2) | 5 | 5 | 5 | 4 |
| Mobile quality (2) | 4 | 5 | 4 | 3 |
| Distinctiveness (1) | 3 | 3 | 4 | 4 |
| Accessibility (1) | 5 | 5 | 5 | 5 |
| Performance cost (1) | 5 | 5 | 5 | 5 |
| **Total /70** | 60 | **62** | 56 | 57 |

## Choice
**B**, chosen by Claude per the protocol (2026-11-07); runner-up A. On
phones B shows the form first (A and D push it below the promises). Build
addition: the four "what happens next" tiles sit on an ink band (the user
dislikes all-white pages, 2026-11-06), with a pale gap before the footer.

## Build notes
- Form: Framer slide between steps (off under reduced motion); progress
  text "Step n of 4" and bars; validation messages in a `role=alert` line;
  Enter in one-line fields moves on; focus moves to each new step's heading
  via a callback ref (works with and without animation); Back keeps
  answers.
- Pre-fill uses `useSyncExternalStore` on `location.search` (server
  snapshot "", no hydration mismatch, page stays static); the visitor's own
  edits win. (React lint forbids setState in an effect for this.)
- Submit: no lead API yet (S1). Opens the email app with every answer
  (`location.assign(mailto:)`), then `/thank-you/?via=email`, which asks the
  visitor to press Send and gives the address. No fake "sent" state.
- `/thank-you/`: `noindex, nofollow`.
- Metadata and BreadcrumbList JSON-LD on `/get-a-quote/`.
- Verified (Playwright, production build): empty step 1 shows "Choose at
  least one option."; `?service=SEO&timeline=1+to+3+months` pre-selects
  both; steps 2 to 4; Skip; contact validation; Back keeps the name; submit
  lands on `/thank-you/?via=email`; focus on the step heading (also with
  reduced motion); 375, 768, 1440, 1920 no horizontal scroll, all reveals
  end visible, no console errors. `tsc`, `lint`, `build` pass.
- Gotcha: a stale `next start` on port 3000 kept serving a deleted build
  (500s, steps not rendering). Kill `next-server` before restarting
  (ARCHITECTURE 42).
