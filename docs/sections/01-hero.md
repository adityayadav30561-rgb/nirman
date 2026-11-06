# 01 Header and hero

Status: built and verified (2026-11-06). **Built before the design protocol
existed**, so no variants were explored: it follows the reference video
directly, as the user asked. Run the protocol on it later only if the user
asks.
Page: / (homepage)
Components: `src/components/site-header.tsx`, `src/components/home/hero.tsx`,
`phone-screen.tsx`, `cloud.tsx`, `src/components/ui/button.tsx`,
`src/content/nav.ts`; motion in `src/app/globals.css`.

## Job
Say in one glance what Nirman does (websites, SEO, software) and get the
visitor to "Get a quote", with the product (Nirman CRM) visible.

## Content
- Header: logo; Home, Services (dropdown: SEO, Websites, Custom software,
  Marketing automation, All services), Nirman CRM, Work, About, Contact; dark
  "Get a quote" and outline "Free SEO audit". Phones: menu button.
- H1 "Websites, SEO and / software that grow / your business." with blue
  sparks (after "and"; after "SEO" on phones) and an orange underline under
  "your business."
- Subtitle: what Nirman is, India and abroad. Button: Get a quote.
- Right: greyscale hand (Unsplash u1b6E6IkSGQ, cut out by
  `nirman-site/scripts/cut-hand.py`) holding an HTML Nirman CRM phone screen
  (labelled "Sample data"), soft rings, a drawn loop, clouds.

## Reference
REFERENCE-VIDEO section 2 rows 1-2 (layout) and section 4.2 (measured
entrance).

## Build notes
- Layout: one column on phones (text, then hand); two columns from 768px.
  Hand widths 18.5 / 20 / 25 / 28.75rem; the phone screen is designed once at
  the xl size and scaled by `--s`.
- Phone over photo: percent box in `hero.tsx`; bezel 4.8% of the phone width
  so the fingertip layer (`hand-front.webp`) always lands on bezel.
- Motion (all from T0 = `--t0` 0.1 s after load): H1 slides in from 1.75em
  left and darkens from 55%; nav slides in from the right, logo from the
  left; header buttons slide in from off-right at +0.15 and +0.45 s; button
  grey to dark; sparks +0.25 to +0.75 s; underline +0.45 to +0.65 s; phone
  path `phone-move` / `phone-tilt` (1.6 s, overshoot left at +0.65 s, rest
  tilt +4deg), then `phone-float`; near clouds ride the same path
  (`clouds-follow`), then drift.
- Verified at 375, 768, 1009, 1440 by pausing and seeking animations.
