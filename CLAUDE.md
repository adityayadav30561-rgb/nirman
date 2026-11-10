# Nirman website: session instructions

This file is loaded into every session automatically. Keep it short. Detail
lives in `docs/`; read only the part you need. The user works from several
Claude sessions and accounts: **the docs and GitHub are the only memory**.

## What this is

Marketing website for **Nirman**, a digital agency (SEO, websites, custom
software incl. mobile apps, WhatsApp/email marketing) and its own product
**Nirman CRM**. Next.js 16 + Tailwind 4 + TypeScript, in `nirman-site/`.
Business rules: `docs/handoff.md`. India + international audience, English.

**Rebuild from scratch since 2026-11-06** (old site: commit `2eba621`, tag
`archive/v2`). Pages and content: `docs/PAGE-PLAN.md` (18 pages, decided).
Look and motion: the user's reference video, `docs/REFERENCE-VIDEO.md`.
Tasks: `docs/BUILD-PLAN.md`. SEO/QA standards: `docs/REDESIGN.md` sections 2,
3, 8, 12 (its sitemap is superseded).

## Start of every session (do this first)

1. `git pull` in `E:\nirman2` (another session may have pushed).
2. Read `docs/STATUS.md` (short): position, next task, open questions.
3. Read the next task in `docs/BUILD-PLAN.md`, and its section record in
   `docs/sections/` if one exists.
4. Before designing anything, read `docs/DESIGN-PROTOCOL.md`; for tokens and
   components, `docs/DESIGN.md`. Read other docs only for the part the task
   needs (grep the heading, then read that range).
5. Tell the user in one or two lines where things stand and what you will do.

## Design protocol (user rule, 2026-11-06)

Every section and page follows `docs/DESIGN-PROTOCOL.md`: best design
principles, and for each section **3 to 4 variants** built on the dev-only
`/lab/` route, screenshotted at 1440 and 375, scored, the best chosen and
recorded in `docs/sections/NN-name.md` (with screenshots in
`docs/sections/shots/`), then built. Show the user the choice; they may
override.

**Motion rule (user, 2026-11-06):** animation only with GSAP
(ScrollTrigger, SplitText), Framer Motion or Three.js; no CSS keyframe
animations for sections. Calm on load, richer on scroll. Details:
DESIGN-PROTOCOL section 5; code in `nirman-site/src/components/motion/`.

## Record everything (multi-session memory)

- After each finished, verified task: tick it in `docs/BUILD-PLAN.md`,
  update `docs/STATUS.md` (position, next task), then **commit and push to
  `origin` main** (user rule: every build goes to main). Cloud sessions on a
  `claude/...` branch also run `git push origin HEAD:main`.
- User decisions go into `docs/DECISIONS.md` (date, decision, why) the moment
  they are made. Section design choices go into `docs/sections/`.
- Measured motion goes into `docs/REFERENCE-VIDEO.md` section 4; new design
  tokens or components into `docs/DESIGN.md`; gotchas into
  `docs/ARCHITECTURE.md`.
- Never leave important state only in chat, the scratchpad or a local file
  outside the repo. Scripts that matter go in `tools/` or
  `nirman-site/scripts/`.
- Never commit the reference video, its frames, or `old-site/`.

## While working

- One task at a time from `docs/BUILD-PLAN.md`.
- Keep context small: `grep`/`head` instead of whole files; send broad code
  searches to the `cavecrew-investigator` subagent; prefer `ctx_*` tools for
  long output; downscale screenshots (`tools/shots/README.md`).
- After editing `globals.css`, restart the dev server with a clean `.next`
  (ARCHITECTURE gotcha 32). To check motion in the browser pane, see
  gotcha 36 (the pane can throttle animation).

## End of every session ("wrap up", or before the user clears)

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass (stop the dev
   server first), or note in STATUS why not.
2. Update `docs/STATUS.md`: done this session, exact next step, open
   questions, anything half-finished (file + what is left).
3. Commit and push to `origin` main (git repo at `E:\nirman2`).

## Hard rules (from the client; never break)

- **No prices** for our services anywhere. Every service ends in "Get a quote".
- **Not offered:** PPC / Google Ads, social media marketing. No pages, menu
  items, copy or mockups that suggest them.
- No WhatsApp / Instagram / Facebook logos in our own artwork.
- Every Nirman CRM call to action is **"Book a demo"** (no signup, no trial).
- Do not invent clients, results or stats. **No "SAMPLE" labels on the site**
  (user, 2026-11-06): the Nirman CRM screens are the real CRM design (the
  CRM will be updated to match), with demo data. The homepage has no
  testimonials since 2026-11-10: Results and Selected work show real
  projects and figures from `nirman-site/src/content/work.ts` only.
- URLs: lowercase, hyphens, trailing slash.
- Assets: build in code first; ask before downloading images and credit
  them in `nirman-site/src/content/image-credits.ts`; anything you cannot
  make or download, write a detailed generation prompt for the user to run
  in ChatGPT or Gemini (still images only; aspect, type, format, negatives) and log it in `docs/ASSET-REQUESTS.md`
  (DESIGN-PROTOCOL section 6).

## Commands (run in `nirman-site/`)

`npm run dev` (port 3000; the app preview uses `E:\nirman2\.claude\launch.json`)
· `npx tsc --noEmit` (run `npm run build` first after deleting `.next`)
· `npm run lint` · `npm run build`
· `python scripts/cut-hand.py <photo.png> public/images/hero` (hero hand layers)
· reference video analysis: `tools/video/README.md`

## Next.js 16 warning

APIs differ from older Next.js. Before writing Next-specific code (routing,
caching, metadata, route handlers, proxy), read the matching guide in
`nirman-site/node_modules/next/dist/docs/` (grep it, read the section).
