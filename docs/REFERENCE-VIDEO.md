# Reference video: what it shows and how it moves

Source: `928aca8b8e476ade2d17a603c7e62015_720w.mp4`, supplied by the user on
2026-11-06 (kept outside the repo; do not commit it or its frames: it is
someone else's work). 17.28 s, 720 x 540, **60 fps, 1037 frames**, loops.

This file is the build spec for the homepage. What is **measured** and what is
**read by eye** is marked on each item:

- **Measured** (computed from the decoded frames): frame rate and frame count;
  how much of the screen moves in each 0.2 s window; the vertical scroll
  speed (see the accuracy note in 4.1); the card rectangle; sampled colours at
  fixed pixels.
- **Estimate** (read from frame sheets at 0.1 to 0.2 s steps): tilt angles,
  scale changes, rise distances, stagger gaps, easing shapes, carousel timing,
  and anything about type and illustration style.

Before tuning the build to "exact", re-measure the estimates with denser
sampling (see section 8).

The reference is a motion-design showcase of a camping-booking site called
"Camply". We copy its **layout, rhythm and motion**, with Nirman's own words,
facts and artwork. We do not copy Camply's copy, 3D avatars, map pins, hand
photo or logo.

## 1. What the video is

A web page shown inside a floating, rounded "viewport card" on a soft
grey-blue stage. The card never moves or resizes during the scroll (it only
scales slightly in the intro). **The page scrolls inside the card**, and the
content of each section reveals as it arrives. Most of the motion is that
scroll plus staggered reveals; only a few things animate on their own.

The first 0.8 s and the last 0.3 s are the **loop seam** (the finished page
rushes away and the hero card returns). That is video editing, not website
behaviour: do not build it.

## 2. Page structure, top to bottom

| # | Section (reference) | What is in it | Seen at |
|---|---|---|---|
| 1 | Header | Logo (blue mark + wordmark), nav: Home, About, Pricing (with chevron), Contact, Blog; right: a dark pill button (Login) and an outline pill button (Register). Active nav item has a small underline dot | 1.0 to 3.4 s |
| 2 | Hero | H1 in 3 lines with hand-drawn accents (blue sparks at the end of line 1, orange underline under "Good Way!"), grey 2-line subtitle, dark pill button "Get Started". Right: a grayscale illustrated hand holding a phone whose screen shows the app UI | 1.0 to 3.4 s |
| 3 | Stats band | Full-width solid blue band, four stats separated by thin vertical lines: big number plus a tiny two-line label ("10 Years of Experience", "1K+ Camping Destination", "8K Happy Customer", "4,2 Overall Rating") | 4.0 to 5.8 s |
| 4 | Features | Heading left ("That The Way To Camp!", small blue spark before it) with a grey sentence; three 3D icons (globe, backpack, boarding pass) each with a bold title and 3 lines of grey text | 5.2 to 7.0 s |
| 5 | Map | Large dotted (hex-dot) world map, pale blue, with 3D photo pins (round image in a white pin with a small orange glow under it). Right: heading, sentence, and a search bar (Location, Date, round dark search button). A loose hand-drawn loop line in the top right | 6.0 to 9.4 s |
| 6 | Community | Heading left, grey sentence, dark pill button; right: a cluster of 3D cartoon avatars with chat bubbles ("Join us!!", "Welcome!!", "Hola!!") and three social-network icons on a pale blue rounded plate | 9.2 to 11.2 s |
| 7 | Testimonials | Heading with a loose curved line and two arrow buttons (prev, next); three cards in a row: blue quote mark, 3-line quote, avatar, name, role, five stars. The row slides sideways | 11.0 to 14.4 s |
| 8 | FAQ | Heading with an orange spark, grey sentence, a pill email field joined to a dark "Submit" button; right: a sentence and three question rows, each with a thin divider and a blue arrow at the right | 14.0 to 16.6 s |
| 9 | Footer | Solid blue panel (darker than the stats band): logo and 3-line blurb, four columns (Company, Resources, Support, Contact Info), round social icons, thin rule, copyright line | 15.6 to 17.0 s |

## 3. Visual design

**Stage and card**
- Stage: soft vertical gradient from `#d1d7e1` (top) to `#ccd2dc` (bottom).
- Card: 615 x 363 px inside the 720 x 540 frame (aspect about 1.69:1, like a
  1440 x 850 browser window shown at 43 percent). Corner radius about 12 px in
  the video (about 28 px at full size). Large soft shadow below, centred.
- The card is white with a faint pastel-blue wash. Sampled: top-left `#ebf4f9`,
  centre `#f5f7f9`, bottom `#f9fbfc`. Sections have almost no hard edges: the
  page reads as one pale surface, broken only by the blue bands.

**Colour (sampled)**
| Use | Value |
|---|---|
| Stage | `#d1d7e1` to `#ccd2dc` |
| Card background | `#f5f7f9`, with `#ebf4f9` wash at the top-left |
| Brand blue (stats band, quote marks, arrows) | `#025dde` |
| Footer blue | `#034fbf` (slightly darker, subtle gradient) |
| Headline ink | near black, `#05070c` |
| Grey body text | `#90949b` |
| Dark pill button | near black navy (**estimate** `#1b1f27`), white text |
| Accent orange (underline, sparks, pin glow) | **estimate** `#f26b2b` |
| Light blue spark strokes | **estimate** `#3b82f6` |

**Type.** One geometric sans family, mid weights (looks like Poppins
Medium/SemiBold; **to confirm**). H1 about 72 px at 1440 wide with generous
leading (about 1.45). Section headings about 2/3 of that size, same weight,
3 lines max, left aligned. Body text small and light grey, 2 to 3 lines. Stats
numbers large and light; their labels tiny. Buttons are small, centred text.

**Buttons.** Primary: dark pill, white label, no icon. Secondary: white pill
with a thin dark outline. Round dark icon button (search). Arrow buttons in
the testimonial header are line arrows, not filled.

**Hand-drawn accents.** Short blue "spark" strokes beside headings (two or
three tiny lines), an orange wavy underline under key words, a few thin loose
curved lines drifting across section backgrounds. They are drawn in with a
stroke animation.

**Artwork.** Grayscale hand holding a phone; 3D rendered icons; dotted map;
3D photo pins; 3D cartoon avatars with speech bubbles; social icons. Soft
shadows under every floating object.

## 4. Motion

### 4.1 The scroll (measured)

The page scrolls in one continuous, variable-speed move after a hold. Speed in
video pixels per frame (card height is 363 px, so divide by 363 to get card
heights; multiply by 60 for px per second):

| Time (s) | What the page is doing | Speed |
|---|---|---|
| 0.8 to 3.1 | **Hold** on the hero (this is when the intro reveals play) | 0 |
| 3.2 to 4.5 | Slow start | 1 to 2 |
| 4.6 to 5.9 | **Burst** past the stats band: eased in over about 0.4 s, peak at 5.0 s, long ease-out | peak 7.8 |
| 5.9 to 8.5 | Slow drift through Features and Map | 1 to 3 |
| 8.6 to 11.4 | Steady, faster drift (Map to Community to Testimonials) | 3 (constant) |
| 11.5 to 13.0 | **Slows to a stop** on Testimonials while the cards slide | 1 to 0 |
| 13.1 to 15.8 | Second pickup to FAQ and footer, peaks near 13.8 and 15.6 | peak 4 to 4.7 |
| 15.9 to 16.5 | Ease out onto the footer, hold to the end | 2 to 0 |

Cumulative scroll (video px): 3.8 s 49, 5.3 s 325, 5.8 s 427, 8.8 s 680,
11.3 s 1138, 12.8 s 1218, 13.8 s 1295, 15.8 s 1605, 16.8 s 1667. Total about
1667 px, which is **4.6 card heights**.

**Accuracy.** Scroll speed was measured as a whole number of video pixels per
frame (resolution plus or minus 1 px per frame, which is plus or minus 60
px/s). The flat plateaus (1.0 and 3.0) are rounding, not constant speed, and
the cumulative figures can be off by a few percent. Re-measure with sub-pixel
interpolation before tuning the scroll easing. The section times and the
overall shape (hold, bursts at section changes, slower drift between, a stop
on the testimonials) are reliable.

Reading: it behaves like a smooth-scroll site where the visitor scrolls with
momentum: short eased bursts at section changes, a slow constant drift while
reading a section, and one full stop to let the carousel play.

### 4.2 Hero entrance (MEASURED 2026-11-06, per-frame tracking)

Measured with `track_hero.py` (OpenCV, every 0.05 s, 60 fps source): card
edges, phone bezel (centre and angle via min-area rectangle), headline left
edge and darkness, first nav item, Login pill, button darkness. Positions are
relative to the card and converted to a 1440px page. The card itself moves
(presentation camera) until clip 1.0 s, so values before that are rough.

T0 = clip 0.85 s, the moment the phone first appears. Built in `globals.css`
with `--t0: 0.1s` after load.

| T0 + (s) | Event (measured) |
|---|---|
| 0 | Phone + hand at the right edge, tilted ~28deg; H1 at ~55% opacity and ~1.75em left of its place; nav row ~112px right of its place |
| 0 to 0.85 | H1 darkens to 100% |
| 0 to 1.15 | H1 slides right into place, ease-out cubic (offsets at +0.15/0.25/0.35/0.45/0.55 s: 82/56/37/23/14 px); nav row slides left on the same curve; logo drifts in from the left |
| 0 to 0.3 | Subtitle fades in (no movement) |
| 0.05 to 0.55 | Nav items fade in 0.1 s apart |
| 0.1 | Phone passes 205px right of rest, tilt 14deg; screen UI fades in |
| 0.15 / 0.45 | Login, then Register, slide in from off the right (~380px), ease-out cubic, 1.15 s; Login arrives grey and darkens |
| 0.2 | Phone crosses its rest position, tilt 4deg |
| 0.2 to 1.1 | "Get Started" appears grey, then darkens (lum 136 to 28) |
| 0.25 / 0.35 / 0.45 / 0.55 | Blue spark strokes 1, 2, 3, then the curl |
| 0.45 to 0.65 | Orange underline draws |
| 0.65 | Phone overshoot: 125px left, 70px down, tilt -8deg (top leans left) |
| 0.65 to 1.6 | Phone glides back right and up, tilt -8 to +4deg (0 at +1.0 s) |
| 1.6 on | Rest tilt +4deg; slow float (~25px left over ~0.5 s, tilt eases ~2deg, then back) |

Clouds near the phone ride in with it (same path, no tilt: they stay level).
Exact keyframes: `phone-move` / `phone-tilt` in `globals.css`.

The scroll in 4.1 begins about 2.4 s after the hero starts (clip 3.2 s); on
a real page the visitor scrolls, so this is only the pause before auto-motion
would start.

### 4.3 Section reveals (rule observed in every section)

When a section enters the lower part of the card (about 60 percent down):
- Each element fades in from 0 to 1 over about 0.5 to 0.6 s while rising
  about 16 to 24 px (**estimate**).
- Elements stagger about 0.1 to 0.15 s apart, in reading order (heading,
  sentence, button, then the artwork items one by one).
- Artwork items (3D icons, pins, avatars) scale up slightly as they fade in.
- Hand-drawn accents draw in after their heading has appeared.

All timings and distances in this section are **estimates**. Specific cases:
- **Features (MEASURED 2026-11-06, `tools/video/track_features.py`, clip
  5.0 to 6.4 s, 1440px units relative to the section heading):** the
  heading is static. The three icons first sit about **2x their final size**,
  60 to 80px right of and 45 to 80px below their final spot, in a wide row
  beside the heading. When the section top is about 80% down the screen they
  **shrink and glide into place over about 0.9 s, ease-in-out** (slow start,
  fastest in the middle), left to right about 0.1 s apart (icon 1 about
  5.2 to 5.9 s, icon 2 to 6.15 s, icon 3 to 6.3 s). Each title fades in as its
  icon lands, its description about 0.1 s later; no visible rise.
- **Map:** pins pop in with a small scale; the big centre pin is the largest
  and arrives first. The search bar fades in last.
- **Community:** the avatars rise from the bottom of the section into place
  and the speech bubbles pop in after them.
- **Testimonials:** the whole row of cards slides left by one card width over
  about 1.2 s (eased) at 12.2 to 13.4 s, with the incoming card fading in at
  the right edge; arrows are the controls.
- **FAQ:** the input and the three rows fade in with a short stagger; the
  arrows sit at the row ends.
- **Footer:** logo, blurb, columns and social icons fade in one after another
  over about 1 s as the blue panel rises into place.

### 4.4 Things that move on their own

- Phone in the hero: slow float and tilt change during the hold (small;
  estimate).
- Testimonial row: auto-advances by one card (estimate for timing).
- **Map pins:** measured between 7.6 and 8.9 s only, to whole video pixels:
  they moved exactly with the page. Movement under about 1 video px (about
  2 px on a desktop page) would not have been detected.
- **Avatars and speech bubbles: not measured.** Check them before deciding
  they are still (the 9.2 to 11.2 s window).
- Keep pins still apart from their entrance unless re-measurement says
  otherwise. A very slow float can be added as a design choice.

## 5. How this maps to a real website

The video presents a page inside a frame; a real visitor controls the scroll.
The build can be done two ways (**decided 2026-11-06: option 1, real page**):

1. **Real page, same feel (recommended).** Normal full-width page. Smooth
   scrolling with momentum, the same hero entrance on load, the same reveal
   rules and stagger on every section, draw-in accents, an auto-advancing
   testimonial carousel. The floating card and stage are dropped.
2. **Framed card.** The whole site lives inside a rounded card on the grey-blue
   stage, with the page scrolling inside it, exactly as shown. It looks like the
   video but wastes screen space and complicates SEO, mobile and accessibility.

## 6. Where the reference conflicts with Nirman's rules

| In the reference | Rule | What we do instead |
|---|---|---|
| Stats band "10 years, 1K+, 8K, 4,2" | Do not invent stats | Use true facts from the handoff: reply in 2 working hours, written proposal in 48 hours, a typical website in 3 to 6 weeks, you own your code and data. Or real figures once the client supplies them |
| Testimonial cards with names, roles, star ratings | Do not invent testimonials | Cards marked SAMPLE, or real quotes when supplied |
| Twitter, Instagram, TikTok icons on the avatar cluster | No WhatsApp, Instagram or Facebook logos in our artwork | Chat bubbles and a plain chat icon; no network logos |
| "Pricing" in the nav | No prices anywhere | "Pricing" becomes "Get a quote" (no page) |
| "Login / Register" | CRM is demo only: no signup, no trial | "Book a demo" and "Get a quote" |

## 7. Assets needed (and how we get each one)

| Asset | In the reference | Plan |
|---|---|---|
| Hand holding a phone | Grayscale illustrated hand, phone with app UI | **Ask the user** (transparent PNG), or a hand photo I download and cut out, with our CRM/site UI built in code on the screen |
| Phone screen UI | App screens | **Code** (HTML) |
| 3D icons (3) | Globe, backpack, boarding pass | **Ask the user**, or I use a free 3D icon set (checked licence), or build glossy icons in code. Icons would be Nirman's: website, search/SEO, chat/CRM, software |
| Dotted world map | Hex-dot map | **Code**: generated from free public-domain world geometry |
| Map pins with photos | Photo thumbnails | **Code**: pins show tiny UI screens (website, CRM, report) instead of landscapes |
| Avatars with chat bubbles | 3D cartoon people | **Code**: chat conversation UI (HTML), or ask for illustrations |
| Hand-drawn sparks, underlines, loops | SVG strokes | **Code** (SVG with draw-in animation) |
| Logo | Camply | Nirman's logo (existing mark, or **ask the user** for the file) |
| Photos | none | none needed |

## 8. Verification plan for the build

Capture the built page the same way as the reference (frame stepping in the
browser at 60 fps) and compare: hold lengths, the scroll speed curve, the hero
stagger times and the carousel timing, to within about 2 frames. First, extend
the analysis of the reference: sub-pixel scroll tracking; per-element position
and opacity tracking in the hero entrance and the carousel (0.016 s steps);
motion of avatars and bubbles in the community section.
