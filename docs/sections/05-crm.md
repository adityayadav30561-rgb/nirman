# 05 Nirman CRM

Status: built and verified (2026-11-06), variant B
Page: / (homepage), under "Where we work"
Component (after choice): `src/components/home/crm.tsx`

## Job
Introduce Nirman's own product: every enquiry (website form, WhatsApp,
email) lands in one place, gets a fast reply and a follow-up, so none goes
cold. One action only: **Book a demo** (client rule: no signup, no trial).

## Content (PAGE-PLAN section 2 row 6; draft copy)
- Heading: "Every lead, answered and followed up."
- Sentence: "Nirman CRM brings your website forms, WhatsApp and email into
  one inbox, replies in minutes and reminds your team to follow up, so no
  enquiry goes cold."
- Proof points (product behaviour, not results): one inbox for forms,
  WhatsApp and email; instant auto-reply; leads assigned to the right person;
  follow-up reminders.
- Visual events (labelled "Sample data"): "New lead: website form",
  "Auto-reply sent", "Assigned to Priya", "Replied in 2 min", "Follow-up
  at 4 pm".
- Button: dark "Book a demo" -> `/nirman-crm/#book-a-demo`.
- No WhatsApp, Instagram or Facebook logos: generic chat, mail and phone
  icons only.

## Reference (REFERENCE-VIDEO 2 row 6; frames 9.2 to 11.6 s)
Heading, grey sentence and dark button on the left; on the right a pale-blue
rounded plate with a large central avatar ringed by small round avatars,
dark speech bubbles ("Join us!!", "Welcome!!") and small white circles with
social icons, plus a loose drawn line. The heading and button fade in from
grey; the avatars rise into place and the bubbles pop in.

## Assets
- Avatars: initials in coloured circles, **built in code** (now).
- Optional upgrade: 3D-style cartoon avatars like the reference: prompt
  **A05-1** in `docs/ASSET-REQUESTS.md` (ChatGPT, one sheet of 6). Not
  needed to ship; swap in if the user generates it.
- CRM cards, chat bubbles, icons: **built in code** (style from
  `design-handoff/crm-screens.html`, recoloured to the v4 tokens).

## Variants (each with its motion concept)
| Variant | Idea | Motion concept |
|---|---|---|
| A | Reference: text left; right, a "hub" plate: Nirman CRM mark in the centre, lead avatars around, dark event bubbles, channel icons | GSAP: plate scales in, connector lines draw from the hub, avatars rise in a stagger, bubbles pop; gentle idle float |
| B | Conversation to CRM: a chat thread (lead asks, auto-reply, agent reply in 2 min) overlapping a CRM lead card | GSAP ScrollTrigger scrub: messages appear one by one as you scroll, with typing dots; lead card fills in |
| C | Mini pipeline board (New, Replied, Proposal, Won) with a lead card travelling across | GSAP pin + scrub: the card moves column to column as you scroll |
| D | Heading centred; three cards (Capture, Reply, Follow up) each with a small live UI | GSAP stagger in; Framer Motion micro-interactions on hover |

Built on `/lab/crm/` (2026-11-06). Shots: `shots/05-crm-{a,b,c,d}-1440.jpg`
and `-375.jpg`. Lab fixes before scoring: A's chat icon moved off the "New
lead" bubble; B's lead card moved down so it no longer covered the "Replied
in 2 min" message.

## Scores (70-point rubric)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 3 | 5 | 4 | 5 |
| Fit with the reference (2) | 5 | 3 | 2 | 2 |
| Motion fit (2) | 5 | 4 | 4 | 3 |
| Conversion (2) | 4 | 4 | 4 | 4 |
| Mobile quality (2) | 3 | 4 | 3 | 2 |
| Distinctiveness (1) | 4 | 4 | 3 | 2 |
| Accessibility (1) | 3 | 4 | 4 | 4 |
| Performance cost (1) | 5 | 5 | 5 | 5 |
| **Total /70** | 55 | **58** | 50 | 48 |

Notes: A is the reference and moves best (avatars rise, lines draw, bubbles
pop) but is abstract, and its bubbles crowd at 375px. B shows exactly what
the CRM does in one glance (lead asks, instant auto-reply, a person replies
in 2 minutes, the lead card shows stage, owner and follow-up) and stays
readable on phones (950px). C is tidy but far from the reference. D is clear
but a generic card grid and 1,377px tall on phones.

## Choice
**B**, chosen by Claude per the protocol (2026-11-06); runner-up A. In the
build B borrows A's reference look: the pale-blue rounded plate behind the
cards and a few floating channel icons (form, chat, mail). The user may
override.

## Build notes
- Components: `src/components/home/crm.tsx` (section), motion
  `src/components/motion/crm-motion.tsx`, content `src/content/crm.ts`
  (intro, four points, sample leads and events). Only CTA: "Book a demo" ->
  `/nirman-crm/#book-a-demo`.
- Layout: text, four check points and the button left; right, the pale-blue
  plate (from A) with three channel icons (form, chat, mail; generic, no
  brand logos), the chat card (3 messages, "Sample data") and the lead card
  (stage, owner, follow-up) overlapping its bottom-left.
- Motion: text once at 75% (heading lines rise via SplitText, sentence,
  points, button). Conversation scrubbed to scroll from the stage's top at
  80% to its centre at 60% of the screen (chosen so it completes even when
  this is the last section): plate and icons, chat card, message 1, typing
  dots, auto-reply, typing dots, Priya's reply, lead card. Typing dots are
  `hidden` in the markup; GSAP toggles them.
- Verified at 1440 (end 2,191px, page scrolls to 2,238px) and 375 (end
  3,344px of 3,373px); no horizontal scroll. Lab code deleted; shots kept.
- Avatar upgrade prompt A05-1 is logged in ASSET-REQUESTS (optional).
