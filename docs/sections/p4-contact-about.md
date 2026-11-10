# P4 Contact and About

Status: built and verified (2026-11-10)
Routes: `/contact/` (`src/app/contact/page.tsx`), `/about/`
(`src/app/about/page.tsx`). Copy: `src/content/pages.ts`. Parts:
`src/components/pages/` (contact-form, contact-parts, world-clocks).
Motion: `ServiceMotion` (same hooks as the services pages).

## Job
Contact: let a visitor reach us in under a minute by the channel they
prefer, and know when we will answer. About: say who Nirman is and why one
team for everything is better, show the work, and send people on to a quote
or a Nirman CRM demo.

## Rules that shaped the content
Nothing invented (CLAUDE.md). The client has not yet sent the phone,
WhatsApp number, office address, team or founding story, so:
- phone, WhatsApp, email and address are placeholders in `content/site.ts`
  (`whatsapp`, `address` added); the office shows as "India";
- **no team block, no founding year, no office hours, no booking embed**
  (PAGE-PLAN lists team and booking; add them when the client sends them);
- the story says only what is true of the offer: four services from one
  team, our own product Nirman CRM, "Nirman" means "to build";
- promises are the approved facts (2 h reply, 48 h proposal, ownership).
- WhatsApp row uses a plain chat icon (no logo: client rule).

## Variants (built on `/lab/p4/`; lab deleted)
Sheets: `shots/p4-contact-1440.jpg`, `p4-contact-375.jpg`,
`p4-about-1440.jpg`, `p4-about-375.jpg` (A, B, C left to right).

| Page | Variants | Scores /70 | Chosen |
|---|---|---|---|
| Contact | A short ink hero, then channels and form on the pale page; B one ink stage, headline and channels left, form card right; C pale, centred, channels as four cards over the form | A 55, **B 62**, C 54 | **B**: headline, every channel and the form are all above the fold |
| About hero | A centred ink hero over the four kinds of work as pictures; B ink split with one picture (same as a service hero); C pale editorial with a very large headline | **A 60**, B 56, C 57 | **A**: shows all four kinds of work at once and does not repeat the service-page hero |

## Contact page
1. Ink stage (B): eyebrow, h1 "Talk to us about your website, SEO or
   software", line with the 2-hour promise, four channels (call, WhatsApp,
   email, office), form card (name, email, phone optional, topic, message).
   The form opens the visitor's email app, then `/thank-you/?via=email`
   (no lead API until S1), same as the quote form.
2. Right now: live clocks for India (office), UAE, UK, US and the visitor
   (`world-clocks.tsx`, real times from the browser).
3. What happens next: three steps on the warm band.
4. Two onward cards: Get a quote (ink) and Book a demo (Nirman CRM).
JSON-LD: ContactPage, BreadcrumbList.

## About page
1. Hero A: h1 "We are Nirman. We build what grows your business online.",
   line, four linked tiles with the service pictures (realistic mockups).
2. Our story: "One team, instead of four vendors", three paragraphs.
3. How we treat every project: four principles on the warm band.
4. How we work: the five-step ink band (shared with the services hub).
5. Our own product: Nirman CRM panel with the real Dashboard screen,
   Book a demo.
6. Where we work: the homepage map section with the quote bar (Get a quote).
JSON-LD: AboutPage, BreadcrumbList.

## Verified
Playwright on the production build at 375, 768, 1024, 1440, 1920: no
horizontal scroll, one h1, all reveals end visible, JSON-LD present;
reduced motion shows everything. `tsc`, `lint`, `build` pass. Final sheet:
`shots/p4-final-1440.jpg`.

## Client to send
Phone, WhatsApp number, email, office address (then add a map and the
LocalBusiness JSON-LD), team names, roles and photos, a booking link if
they use one, and a check of the story text in `content/pages.ts`.
