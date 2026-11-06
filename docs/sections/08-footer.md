# 08 Footer (blue)

Status: built and verified (2026-11-06), variant A
Page: every page (`src/app/layout.tsx`)
Component (after choice): `src/components/site-footer.tsx`

## Job
Close every page: say once more what Nirman is, give a route to every
main page, the contact details and the legal pages.

## Content (PAGE-PLAN section 2 row 9; `src/content/footer.ts`)
- Logo (links home) and a 3-line blurb (what Nirman does, incl. Nirman CRM).
- Columns: **Company** (About, Our work, Industries, Contact), **Services**
  (SEO, Websites, Custom software, Marketing automation, Nirman CRM),
  **Resources** (Free tools, Free SEO audit, Blog, Get a quote), **Contact
  info** (email, phone: placeholders from `site.ts`; "Reply within 2
  working hours (IST)", "India and worldwide").
- Round social icons: **generic icons, placeholder links** (user,
  2026-11-06: "use generic icons for now"); no brand logos (client rule).
  Replace `socialLinks` in `content/footer.ts` when real profiles exist.
- Thin rule; copyright; Privacy policy, Terms.
- No PPC or social media marketing links; no prices.

## Reference (REFERENCE-VIDEO 2 row 9; 15.6 to 17.0 s)
Solid blue panel, darker than the stats band (`#034fbf`, subtle gradient):
logo and 3-line blurb, four columns, round social icons, thin rule,
copyright. Motion: logo, blurb, columns and icons fade in one after another
over about 1 s as the blue panel rises into place.

## Assets
None: all in code (logo, generic SVG icons).

## Variants (each with its motion concept)
| Variant | Idea | Motion concept |
|---|---|---|
| A | Reference: rounded blue panel inset from the page edge, logo + blurb + icons left, four columns right | GSAP: panel rises 60px, items fade up in sequence (~1 s) |
| B | Closing call: large "Ready to build what comes next?" + Get a quote / Email us, columns below | GSAP SplitText word reveal, then items stagger |
| C | Giant "nirman" wordmark across the bottom, columns above | GSAP scrub: wordmark letters rise with scroll |
| D | Compact: logo + three link columns in one row, contact + icons in a second | Same as A |

Built on `/lab/footer/` (2026-11-06). Shots: `shots/08-footer-{a,b,c,d}-1440.jpg`
and `-375.jpg` (C caught mid-scrub). All four were live.

## Scores (70-point rubric)
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity and hierarchy (3) | 5 | 4 | 4 | 3 |
| Fit with the reference (2) | 5 | 3 | 3 | 3 |
| Motion fit (2) | 4 | 4 | 5 | 3 |
| Conversion (2) | 3 | 5 | 3 | 3 |
| Mobile quality (2) | 4 | 4 | 3 | 4 |
| Distinctiveness (1) | 3 | 3 | 5 | 2 |
| Accessibility (1) | 4 | 4 | 4 | 4 |
| Performance cost (1) | 5 | 5 | 4 | 5 |
| **Total /70** | **59** | 56 | 53 | 46 |

Notes: A is the reference and reads at a glance. B converts best, but a
second closing call right under the Questions email field makes two asks
back to back. C's wordmark is striking but crops on phones and adds no
information. D splits contact away from the other columns and the icons
float on their own.

## Choice
**A**, chosen by Claude per the protocol (2026-11-06); runner-up B. Build
additions: logo links home; all text at 85% white (the lighter top of the
gradient left 70-75% white below 4.5:1); links 44px tall.

## Build notes
- Components: `site-footer.tsx` (server, in `layout.tsx` after `<main>`),
  `footer-parts.tsx` (columns, contact, generic social icons, bottom bar;
  links are quiet pill buttons), motion `motion/footer-motion.tsx` (GSAP
  once at 90%; `ft-*` targets, not `f-*`, which the facts band uses),
  content `content/footer.ts`.
- Columns are `<nav aria-label>` with an `h2` each; icons have
  `aria-label`s that say "placeholder".
- Panel: `rounded-[2rem]` inset 12 to 16px from the viewport, gradient
  `#0458d4 -> #034fbf -> #03449f`.
- Verified (Playwright, dev server): 375, 768, 1024, 1440, 1920 and reduced
  motion: no horizontal scroll, items start hidden and end visible, panel
  ends at no transform, every link at least 44px tall, no console errors.
  After adding the footer to `layout.tsx` the dev server served the old
  layout until restarted with a clean `.next`. `tsc`, `lint`, `build` pass.
