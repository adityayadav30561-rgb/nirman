# 07 Questions (FAQ)

Status: built and verified (2026-11-06), variant A
Page: / (homepage), under Results, above the footer
Component (after choice): `src/components/home/questions.tsx`

## Job
Answer the questions people have before they get in touch (cost, time,
SEO, CRM, abroad, ownership), give them a quick way to ask anything else,
and output FAQPage markup for search and answer engines.

## Content (PAGE-PLAN section 2 row 8; `src/content/faq.ts`)
- Heading "Got a question for Nirman?"; sentence "Leave your email and we
  will write back within 2 working hours (IST)."
- Email field joined to a dark "Submit" pill. No lead API yet (task S1):
  Submit opens the visitor's email app with a prepared message to
  `site.email` (placeholder), and the note under the field says so. No fake
  success state. Invalid email: inline message, `aria-invalid`.
- Six questions with short answers. Client rules: no prices (cost answer:
  "scope decides the cost... proposal within 48 hours" + Get a quote); no
  PPC or social media; CRM answer links "Book a demo". Only approved
  figures (2 h, 48 h, 3 to 6 wk: DECISIONS 2026-11-06). The SEO answer has
  no timeframe (none approved).

## Reference (REFERENCE-VIDEO 2 row 8; 14.0 to 16.6 s)
Heading with an orange spark, grey sentence, pill email field + dark
Submit; right: a sentence and three question rows with thin dividers and a
blue arrow at the right. Motion: the input and rows fade in with a short
stagger. Not re-measured this session (the video is not in the cloud
checkout); the REFERENCE-VIDEO description was used.

## Assets
None: all in code (spark and arrows are inline SVG).

## Variants (each with its motion concept)
| Variant | Idea | Motion concept |
|---|---|---|
| A | Reference: heading + email left, accordion rows right | GSAP entrance (spark draw, staggered fade-up); Framer Motion accordion height + arrow turn |
| B | Editorial: heading across, numbered rows in two columns, email in a dark band | Same GSAP entrance; Framer accordion |
| C | Conversation: questions as chips, answer appears as a reply bubble from Nirman, email under it | Framer AnimatePresence: question bubble, then the answer rises after 0.35 s |
| D | All open: sticky heading + email, every answer visible; each lights up as it scrolls through the middle | GSAP ScrollTrigger scrub on opacity |

Built on `/lab/questions/` (2026-11-06). Shots: `shots/07-questions-{a,b,c,d}-1440.jpg`
and `-375.jpg` (A and B with the first row open). All four were live.

## Scores (70-point rubric)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 5 | 4 | 4 | 4 |
| Fit with the reference (2) | 5 | 3 | 2 | 3 |
| Motion fit (2) | 3 | 3 | 4 | 4 |
| Conversion (2) | 4 | 4 | 3 | 4 |
| Mobile quality (2) | 4 | 4 | 3 | 3 |
| Distinctiveness (1) | 3 | 3 | 5 | 3 |
| Accessibility (1) | 5 | 4 | 3 | 3 |
| Performance cost (1) | 5 | 5 | 4 | 4 |
| **Total /70** | **60** | 52 | 48 | 50 |

Notes: A reads in seconds and keeps the email field next to the heading,
as in the reference. B's two columns split one list in half and its dark
band competes with the blue footer that follows. C is the most distinctive
but hides all answers but one, and on phones the answer sits below six
chips, out of view after a tap. D is long on phones and its dimmed answers
fail contrast while scrolling.

## Choice
**A**, chosen by Claude per the protocol (2026-11-06); runner-up B. Build
additions: SplitText heading reveal (like Results), closed answers stay in
the HTML (`inert`, height 0) so crawlers and the JSON-LD agree, FAQPage
JSON-LD from the same list. The user may override.

## Build notes
- Components: `home/questions.tsx` (section, server, JSON-LD),
  `home/question-list.tsx` (client accordion, Framer Motion),
  `home/email-ask.tsx` (client form, mailto), motion
  `motion/questions-motion.tsx` (GSAP once at 75%), content `content/faq.ts`.
- Accordion: `h3 > button[aria-expanded][aria-controls]`, panel
  `role=region` labelled by the button; one open at a time; reduced motion
  switches instantly. Rows are at least 64px tall.
- Grid uses `grid-cols-1` on phones (without it the implicit column took
  the min-content width and overflowed at 375).
- Verified (Playwright, dev server): 375, 768, 1440, 1920 and reduced
  motion: no horizontal scroll, entrance starts hidden and ends visible,
  Enter opens a row, closed panels inert at 0px, one FAQPage block with 6
  questions, invalid email shows the message, no console errors. `tsc`,
  `lint`, `build` pass. The mailto hand-off itself was not exercised in the
  headless browser.
