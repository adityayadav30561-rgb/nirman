# Design protocol

How every section and every page of the Nirman site is designed. The user
set this rule on 2026-11-06. It applies to every session and every Claude
account: follow it without being asked.

Short version: **for each section, Claude builds 3 to 4 genuinely different
designs, screenshots them, scores them against the principles below, picks
the best, records why, and only then builds the winner into the page.
All motion is GSAP, Framer Motion or Three.js (section 5).**

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
7. **Motion: GSAP, Framer Motion or Three.js only** (user rule,
   2026-11-06). See section 5. Calm on load, richer on scroll; purposeful,
   no layout shift, and fully off under `prefers-reduced-motion`. The
   reference video inspires the feel; it is not copied frame for frame.

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
   the reference does (layout and motion from `docs/REFERENCE-VIDEO.md`),
   constraints, and the assets it needs. For any asset that cannot be built
   in code or downloaded, write the generation prompt now (section 6).
2. **Measure the reference** for that section if it moves (see
   `tools/video/README.md`); add the measured table to REFERENCE-VIDEO
   section 4.
3. **Build 3 to 4 variants.** They must differ in layout or idea, not just
   colour, and each comes with a motion concept built with the allowed
   libraries (section 5). Variant A stays closest to the reference; B to D
   explore alternatives (for example a different content arrangement, a stronger
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
| Motion fit | 2 | Scroll motion (GSAP / Framer / Three) that explains or delights, never in the way |
| Conversion | 2 | The main action is obvious and well placed |
| Mobile quality | 2 | Designed for 375px, not just stacked |
| Distinctiveness | 1 | Specific to Nirman, not a generic template |
| Accessibility | 1 | Contrast, order, focus and tap sizes are right |
| Performance cost | 1 | Little JS, light images, no layout shift |

Total = sum of score x weight (max 70 since the motion row was added on
2026-11-06; earlier records are out of 60). A variant that breaks a client
rule (principle 15) is out, whatever its score.

## 5. Motion (user rule, 2026-11-06)

**Allowed:** only these three, each for what it does best.
- **GSAP** (`gsap` 3.15.0 pinned, with ScrollTrigger and SplitText):
  load timelines, scroll-triggered reveals, scrubbed parallax, pinning,
  text line or word reveals, SVG line drawing. The default choice.
- **Framer Motion** (`motion` package, `motion/react`): component state
  motion, such as hover and tap, layout changes, tabs, accordions,
  enter and exit of menus and modals.
- **Three.js** (with `@react-three/fiber`): real 3D scenes, such as a globe,
  product objects or particles. Only where 3D adds meaning; lazy-load it,
  render on demand, and keep a static fallback image.

**Not allowed:** hand-written CSS `@keyframes` animations for sections, or
other animation libraries. CSS transitions are fine for simple hover or
focus colour changes. The only CSS keyframes left are the start-state
failsafes in `globals.css`.

**How to build it** (see `src/components/motion/`):
- Import from `components/motion/gsap.ts` (registers plugins once).
- One small client wrapper per section (`<XMotion>`) that renders the
  section element and runs `useGSAP` scoped to it; the section's markup
  stays a server component and marks targets with short class names.
- Wrap everything in `gsap.matchMedia().add(MOTION_OK, ...)`, so reduced
  motion gets the final state.
- Above the fold: set start states in CSS (`gs-hide`, `gs-ghost`,
  `gs-draw`, `gs-clip-x`, only under `html.js`) so nothing flashes before
  hydration; below the fold: `gsap.set` in the wrapper.
- Load motion stays calm (the user found the measured hero entrance too
  much); scroll motion carries the richness.
- Verify by seeking timelines (ARCHITECTURE gotcha 36), at 375, 768, 1440
  and 1920, and with reduced motion.

## 6. Assets Claude cannot make (user rule, 2026-11-06)

**Order of preference** for any image, video, texture or 3D model a
section needs:
1. **Build it in code** (SVG, HTML/CSS, canvas, Three.js): icons, UI
   screens, charts, maps, patterns, simple 3D.
2. **Download a free-licence asset**, only after asking the user (name the
   source, licence and size), and credit it in
   `src/content/image-credits.ts`.
3. **Ask the user to generate it:** write a detailed prompt (template below),
   show it in chat, and log it in `docs/ASSET-REQUESTS.md` with status
   `requested`. Meanwhile build the section with a clearly marked
   placeholder of the exact size, so layout and motion can be finished.

Write the prompt during the section's brief (step 1 of section 2), as soon as
it is clear the asset is needed, not at the end. One prompt per asset; when
a set must match (for example four icons), say so and give the shared style
in each prompt.

**Prompt template** (fill every line; keep it in the log exactly as given):

```md
### <ID, e.g. A04-1> <short name>
- Section and use: <section, where on the page, what it must communicate>
- Tool hint: <image model suited, e.g. Midjourney / DALL-E / Firefly / Ideogram; video: Runway / Sora; 3D: any GLB export>
- Size: <exact pixels, e.g. 2400 x 1600 px>, aspect <3:2>; minimum <1600 px wide>
- Type and format: <photo / 3D render / illustration / video / 3D model>;
  deliver <PNG with transparent background / JPG / WebP / MP4 H.264 10 s loop
  under 6 MB / GLB under 2 MB>
- Prompt: <one paragraph: subject, action, setting, composition and
  framing, camera angle and lens, lighting, mood, materials, level of
  detail, style references in words>
- Colours: <from DESIGN.md tokens, e.g. brand blue #025dde, page #f5f7f9,
  accent orange #f26b2b; neutral greys>
- Background: <transparent / plain #f5f7f9 / soft studio / blurred office>
- Negatives (must NOT appear): <the standard list below + anything specific>
- Variations: <how many, e.g. 3 options; or "one per item, same style">
- Acceptance check: <what Claude will check, e.g. "hand fully inside frame,
  edges clean for cut-out, no text">
- File name and place: <e.g. map-office-india.png; Claude saves it to
  public/images/map/>
```

**Standard negatives** (include in every prompt, then add specific ones):
no text, letters, numbers or captions; no logos or brand marks (especially
no WhatsApp, Instagram or Facebook logos); no watermarks or signatures; no
prices or currency symbols; no ads or PPC or social-media imagery; no real
people's recognisable faces unless asked; no distorted hands or extra
fingers; no blur, noise, artefacts or low resolution; no busy backgrounds;
no cropped edges on the main subject; no dark or moody palette (the site is
light and airy); no stock-photo clichés (handshakes, pointing at screens).

**On receiving the file:** check it against the acceptance line; if it
fails, say what is wrong and give a corrected prompt (keep the same ID with
a suffix, e.g. A04-1b). If it passes, process and use it, update the log
(`used`, file path) and the section record.

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

## Assets
Each asset: built in code / downloaded (source, licence) / requested from
the user (ID in ASSET-REQUESTS.md, status).

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
| Motion fit (2) | | | | |
| Total /70 | | | | |

## Choice
Winner and why (2-3 sentences). User override, if any.

## Build notes
Files, motion timings, anything a later session must know.
```
