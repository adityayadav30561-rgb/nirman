# Design protocol

How every section and every page of the Nirman site is designed. The user
set this rule on 2026-11-06. It applies to every session and every Claude
account: follow it without being asked.

Short version: **for each section, Claude builds 3 to 4 genuinely different
designs, screenshots them, scores them against the principles below, picks
the best, records why, and only then builds the winner into the page.**

## 1. Principles (the bar every design must clear)

### Whole page
1. **One job per page, one main action.** Every service section ends in
   "Get a quote"; everything about Nirman CRM ends in "Book a demo". No
   competing calls to action in the same section.
2. **Clear hierarchy.** One H1 per page, one H2 per section, headings of at
   most 3 lines, a short grey supporting line, then the content. A visitor
   skimming only headings should get the story.
3. **Rhythm.** The page reads as one pale surface (`--color-page`) broken by
   solid blue bands, as in the reference. Alternate dense and airy sections;
   never two very similar layouts back to back.
4. **One grid.** `container-page` (max 84rem). Left edges line up from
   section to section. Same vertical spacing scale everywhere.
5. **Bounded scale.** Must look right from 375px phones to 27-inch screens:
   root font is capped at 17px and the container at 84rem, so nothing grows
   forever. Never size with bare `vw`.
6. **Mobile is designed, not squeezed.** Check 375, 768, 1024, 1440 and
   1920. No horizontal scroll. Tap targets at least 44px.
7. **Motion follows the reference video** (`docs/REFERENCE-VIDEO.md`):
   measured, purposeful, ease-out, no layout shift, and fully disabled under
   `prefers-reduced-motion`.

### Every section
8. **Concrete, not generic.** Each section shows something real: product UI
   built in code, true facts, real photos. Avoid AI-template looks (floating
   blobs, empty icon-card grids, vague gradients).
9. **Links are buttons.** Actions are real buttons (pill buttons from
   `components/ui/button.tsx`), not just highlighted text.
10. **Typography.** Poppins only; at most 3 weights; body text at least 15px;
    line length 45 to 75 characters.
11. **Colour from tokens only** (`globals.css` `@theme`). Brand blue for
    emphasis, orange only for drawn accents. Text contrast at least 4.5:1
    (3:1 for large headings).
12. **Accessible.** Semantic HTML, visible focus, keyboard reachable, alt
    text (empty for decoration), headings in order.
13. **Fast.** Server components by default; images WebP, sized, the hero
    image preloaded; no layout shift.
14. **Search-ready** (SEO, AEO, GEO): see `docs/REDESIGN.md` sections 2, 3, 8
    and 12 (still valid): answer-first copy, FAQ markup where questions exist,
    descriptive headings.
15. **Client rules** (CLAUDE.md, never break): no prices; no PPC or social
    media marketing; no WhatsApp, Instagram or Facebook logos in our artwork;
    CRM calls to action say "Book a demo"; nothing invented (samples are
    labelled SAMPLE); URLs lowercase with a trailing slash.

## 2. Process for each section

1. **Brief.** Create `docs/sections/NN-name.md` from the template in
   section 4: the section's job, its content (from `docs/PAGE-PLAN.md`), what
   the reference does (layout and motion from `docs/REFERENCE-VIDEO.md`), and
   constraints.
2. **Measure the reference** for that section if it moves (see
   `tools/video/README.md`); add the measured table to REFERENCE-VIDEO
   section 4.
3. **Build 3 to 4 variants.** They must differ in layout or idea, not just
   colour. Variant A stays closest to the reference; B to D explore
   alternatives (for example a different content arrangement, a stronger
   product visual, a more editorial layout). Build them as real components in
   `nirman-site/src/components/lab/<section>/` and show them on the dev-only
   route `/lab/<section>/` (it must return 404 in production and be
   `noindex`). Use real copy from PAGE-PLAN, not lorem ipsum.
4. **Visualise.** Screenshot each variant at 1440 and 375 (plus 768 if the
   layout changes there). Save downscaled JPEGs (about 1200px wide, under
   about 150 KB) to `docs/sections/shots/NN-name-<variant>-<width>.jpg`.
5. **Score** each variant 1 to 5 on the rubric in section 3 and write the
   table into the section file.
6. **Choose** the highest total; on a tie, pick the one closer to the
   reference. Write why in two or three sentences. Show the user the
   screenshots and the choice in chat; the user may override. Log the choice
   in `docs/DECISIONS.md` ("chosen by Claude per protocol" or "user
   override").
7. **Build the winner** into the page (`src/components/home/` or the page's
   folder), add the motion, then verify: 375, 768, 1440, 1920; reduced
   motion; animations checked by pausing and seeking (ARCHITECTURE gotcha 33);
   `tsc`, `lint`, `build`.
8. **Clean up.** Delete the losing variants' code from `components/lab/`
   (the screenshots and notes stay in docs). Tick the task in
   `docs/BUILD-PLAN.md`, update `docs/STATUS.md`, commit and push.
9. **Whole-page review** after every two or three sections: full-page
   screenshots at 1440 and 375; check rhythm, repetition, spacing, how often
   calls to action appear, and the transition between sections. Record it in
   `docs/sections/00-page-review.md` and fix what it finds.

## 3. Scoring rubric (1 to 5 each)

| Criterion | Weight | What a 5 looks like |
|---|---|---|
| Clarity and hierarchy | 3 | The point of the section is clear in 3 seconds |
| Fit with the reference look and motion | 2 | Feels like the same site as the reference video |
| Conversion | 2 | The main action is obvious and well placed |
| Mobile quality | 2 | Designed for 375px, not just stacked |
| Distinctiveness | 1 | Specific to Nirman, not a generic template |
| Accessibility | 1 | Contrast, order, focus and tap sizes are right |
| Performance cost | 1 | Little JS, light images, no layout shift |

Total = sum of score x weight (max 60). A variant that breaks a client rule
(principle 15) is out, whatever its score.

## 4. Section file template (`docs/sections/NN-name.md`)

```md
# NN Section name

Status: brief | variants built | chosen | built | verified
Page: / (homepage)    Component: src/components/home/<file>.tsx

## Job
One sentence: what this section must do for the visitor.

## Content
From PAGE-PLAN.md (headings, copy, data, artwork).

## Reference
Layout and motion from REFERENCE-VIDEO.md (section and table numbers).

## Variants
| Variant | Idea | Shots |
|---|---|---|
| A | closest to the reference | shots/NN-name-a-1440.jpg, -375.jpg |
| B | ... | ... |

## Scores
| Criterion (weight) | A | B | C | D |
|---|---|---|---|---|
| Clarity (3) | | | | |
| ... | | | | |
| Total /60 | | | | |

## Choice
Winner and why (2-3 sentences). User override, if any.

## Build notes
Files, motion timings, anything a later session must know.
```
