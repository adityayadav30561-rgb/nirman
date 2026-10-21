# Nirman website: session instructions

This file is loaded into every session automatically. Keep it short. Detail
lives in `docs/`; read only the part you need.

## What this is

Marketing website for **Nirman**, a digital agency (SEO, websites, custom
software incl. mobile apps, WhatsApp/email marketing) and its own product
**Nirman CRM**. Next.js 16 + Tailwind 4 + TypeScript, in `nirman-site/`.
The design was built in an earlier session; business rules come from
`docs/handoff.md`. India + international audience, English only.

## Start of every session (do this first, nothing else)

1. Read `docs/STATUS.md` (current phase, next task, blockers). It is short.
2. Open **only** the current phase section of `docs/PLAN.md` (grep for the
   phase heading; do not read the whole file).
3. Read `docs/ARCHITECTURE.md` / `docs/DESIGN.md` / `docs/handoff.md` only
   for the section the task needs (grep the heading, then read that range).
4. Tell the user in one or two lines where things stand and what you will do.

## While working

- One task at a time from the plan. Tick it in `docs/STATUS.md` as soon as it
  is done and verified, so a cleared session never redoes work.
- Record any decision the user makes in `docs/DECISIONS.md` (date, decision,
  why) the moment it is made.
- New gotcha discovered? Add it to `docs/ARCHITECTURE.md` "Gotchas".
- Keep context small: `grep`/`head` instead of reading whole files; read
  files by line range; send broad code searches to the `cavecrew-investigator`
  subagent; prefer `ctx_*` tools (context-mode plugin) for long command
  output; downscale screenshots (see `tools/shots/README.md`).
- Do not paste large files or logs into replies.

## End of every session ("wrap up", or before the user clears)

1. Update `docs/STATUS.md`: done this session, exact next step, open
   questions, anything half-finished (file + what is left).
2. Make sure `npx tsc --noEmit`, `npm run lint` and `npm run build` pass, or
   note in STATUS why not.
3. Commit if the user approves (git repo at `E:\nirman2`).

## Hard rules (from the client; never break)

- **No prices** for our services anywhere. Every service ends in "Get a quote".
- **Not offered:** PPC / Google Ads, social media marketing. No pages, menu
  items, copy or mockups that suggest them.
- No WhatsApp / Instagram / Facebook logos in our own artwork.
- Every Nirman CRM call to action is **"Book a demo"** (no signup, no trial).
- Do not invent clients, results, testimonials or stats. Use clearly marked
  placeholders (`SAMPLE` / "Placeholder") until real ones are supplied.
- URLs: lowercase, hyphens, trailing slash.

## Commands (run in `nirman-site/`)

`npm run dev` (port 3000; the app preview uses `E:\nirman2\.claude\launch.json`)
· `npx tsc --noEmit` · `npm run lint` · `npm run build`
· `python scripts/make-device-cutouts.py` (rebuild device mockup images)

## Next.js 16 warning

APIs differ from older Next.js. Before writing Next-specific code (routing,
caching, metadata, route handlers, proxy), read the matching guide in
`nirman-site/node_modules/next/dist/docs/` (grep it, read the section).
