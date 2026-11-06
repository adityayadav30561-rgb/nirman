# 06 Results (sample testimonials)

Status: built and verified (2026-11-06), variant B
Page: / (homepage), under Nirman CRM
Component (after choice): `src/components/home/results.tsx`

## Job
Show the kind of outcomes customers talk about, as social proof, without
inventing anything. Until real quotes arrive, every card is clearly marked
**SAMPLE** (DECISIONS 2026-11-06, client rule: never invent clients,
results or testimonials).

## Content (PAGE-PLAN section 2 row 7; draft)
- Heading: "Results our customers can see." Sub-line: "Sample reviews for
  now: real client quotes will replace them."
- Six sample quotes, each with: quote, who (business type and city, no
  personal names), service tags, initials avatar. **No star ratings and no
  numbers** (they would read as real stats). A "SAMPLE" chip on every card.
- Controls: previous and next buttons (line arrows), keyboard and swipe.

## Reference (REFERENCE-VIDEO 2 row 7; frames 11.8 to 14.2 s)
Heading with a small blue spark on the left, thin line arrows on the right.
Three borderless "cards": blue quote mark, three-line quote, thin divider,
avatar, name, role, five stars. The row slides left by one card over about
1 s (12.4 to 13.3 s); the card leaving fades at the left edge, the next one
fades in at the right.

## Assets
All built in code (initials avatars). If real client photos or logos come
later, they replace the initials (ask the client; never generate faces of
"customers").

## Variants (each with its motion concept)
| Variant | Idea | Motion concept |
|---|---|---|
| A | Reference: heading + arrows, a row of three borderless quotes that slides one card at a time | Framer Motion: spring slide on arrows, drag/swipe, edge fades; slow auto-advance that pauses on hover/focus |
| B | Spotlight: one large quote, a list of the six business types beside it to switch | Framer Motion: AnimatePresence cross-fade and rise between quotes; auto-rotate |
| C | Two rows of cards drifting in opposite directions (marquee) | GSAP: endless loop whose speed follows scroll velocity; pauses on hover |
| D | Pinned horizontal strip: the section pins and the cards slide sideways as you scroll | GSAP: pin + scrub |

Built on `/lab/results/` (2026-11-06). Shots: `shots/06-results-{a,b,c,d}-1440.jpg`
and `-375.jpg`. A and B were live (Framer Motion); C and D static.

## Scores (70-point rubric)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 4 | 5 | 3 | 3 |
| Fit with the reference (2) | 5 | 3 | 3 | 3 |
| Motion fit (2) | 4 | 4 | 4 | 4 |
| Conversion (2) | 3 | 3 | 3 | 3 |
| Mobile quality (2) | 3 | 4 | 3 | 1 |
| Distinctiveness (1) | 3 | 4 | 3 | 3 |
| Accessibility (1) | 4 | 4 | 2 | 3 |
| Performance cost (1) | 4 | 4 | 4 | 4 |
| **Total /70** | 53 | **55** | 44 | 41 |

Notes: A is closest to the reference, but at 375px its edge fade clipped
the first letters of the quote. B reads best (one large quote; the list of
business types is also the navigation) and works on phones. C's moving text
is hard to read and needs a pause control. D's heading broke on phones.

## Choice
**B**, chosen by Claude per the protocol (2026-11-06); runner-up A. Build
additions: proper tabs keyboard pattern (arrow keys, Home, End), a thin
progress line under the active tab showing when the next review comes,
auto-rotate that pauses on hover, focus and when off screen. The user may
override.

## Build notes
- Components: `src/components/home/results.tsx` (section),
  `results-spotlight.tsx` (client: tabs + quote, Framer Motion),
  `quote-card.tsx` (borderless quote with SAMPLE chip), motion
  `src/components/motion/results-motion.tsx` (GSAP entrance), content
  `src/content/results.ts` (six sample quotes: business type and city, no
  names, no ratings, no numbers).
- Tabs: WAI-ARIA pattern (roving tabindex; arrows, Home, End), vertical list
  from 1024px, horizontal scroll strip on phones that keeps the active tab
  in view without scrolling the page. Auto-rotate 6 s with a progress line;
  pauses on hover, focus, off screen (IntersectionObserver) and under
  reduced motion; `aria-live` polite only when not rotating.
- Entrance (GSAP, once at 75%): spark, heading lines (SplitText), sub-line,
  tabs stagger, panel rises.
- Verified: 1440 (entrance completes, keyboard: ArrowDown and End select and
  move focus; rotation advances after 6 s), 375 (679px, no horizontal
  scroll). The lab carousel (variant A) was deleted with the lab.
