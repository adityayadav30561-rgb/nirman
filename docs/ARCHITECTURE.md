# Architecture, file map and gotchas

## Folders

```
E:\nirman2\
  CLAUDE.md                 session instructions (auto-loaded)
  docs\                     plan, status, decisions, design, this file, handoff copy
  tools\shots\              headless-Edge screenshot scripts (see README)
  .claude\launch.json       dev server config for the app preview
  nirman-site\              the Next.js app
    src\app\                layout.tsx (fonts, metadata), page.tsx (homepage + JSON-LD), globals.css
    src\components\         hero, site-header, site-footer, nirman-crm, work, process, why-us,
                            final-cta, logo, photo, stage
    src\components\services services grid: services.tsx (grid + intro), service-copy.tsx
                            (ServiceCard + tones), seo/web/automation/software/apps/marketing.tsx
    src\components\mockups\ frames.tsx (Device, PhoneFrame, Panel), concept-site.tsx, charts.tsx, art.tsx
    src\components\ui\      button.ts
    src\content\            site.ts (brand, contact placeholders, nav), photos.ts, devices.ts
    scripts\                make-device-cutouts.py
    design-assets\raw\      original device photos (not served)
    public\photos\          self-hosted Unsplash photos
    public\assets\          device cutouts + glass masks, hero photo
```

Old project (reference only, do not edit): `E:\nirman\website\` has the
handoff's `site.ts` nav data, `content/home.ts` copy, and asset scripts
(`scripts/cutout.py`, `split-sheet.py`, `process-assets.mjs`).

## Stack

Next.js 16.4.2 (App Router, Turbopack, `cacheComponents: true`,
`partialPrefetching: true`), React 19.3, Tailwind 4 (`@theme` in CSS),
TypeScript, ESLint 9 flat config, lucide-react icons. Node 24. Images via
`next/image` built-in optimiser (`images.qualities: [70, 80]`).

## Client vs server components

Client (`"use client"`): site-header, nirman-crm, process, final-cta.
Everything else is a server component. Server components can pass JSX to
client components as props.

## Gotchas (add new ones here)

1. **Next 16 is different.** Read `nirman-site/node_modules/next/dist/docs/`
   before Next-specific code. `next lint` is gone; `middleware` is `proxy`;
   request APIs are async; `images.qualities` is required.
2. **Stale CSS on the E: drive.** The dev server sometimes keeps serving an
   old stylesheet after `globals.css` edits. Stop the preview, delete
   `nirman-site/.next/dev`, start again. Verify with `getComputedStyle`.
3. **Dev overlay "N Issues"** often shows stale errors from earlier hot
   reloads (imports that no longer exist). Trust `tsc` and `npm run build`.
4. **No non-ASCII characters in CSS comments** (handoff: Turbopack dropped
   rules after box-drawing characters).
5. **Stage CSS variables inherit.** `Stage` always sets `--w-lg/--h-lg` so a
   nested Stage does not pick up its parent's sizes. Keep it that way.
6. **Mockup `lg:` classes are viewport-based**, not container-based: a mockup
   inside a small card still uses its `lg` layout on desktop. Size the
   Stage (`wLg`) for the lg composition and let it scale.
7. **Sticky inside `overflow-x: clip` works**; `overflow: hidden` on an
   ancestor would break the pinned process section.
8. **Unsplash hotlinking was slow** from this network; photos are now
   self-hosted. Download new photos into `public/photos/` and add them to
   `content/photos.ts`.
9. Raw `<img>` is used for device cutouts and tool logos with an eslint
   disable comment; everything else uses `next/image`.
10. **Windows line endings** in shell pipelines break URL lists; strip `\r`.
11. Screenshots: use `tools/shots/` (the in-app browser pane is too small).
12. **Windows paths in Python/shell strings:** `E:\nirman` contains `\n`, which
    Python turns into a newline. Edit docs with the Edit tool, or use `/` paths
    (`E:/nirman`) in scripts.
13. Git: repo at `E:\nirman2`, `.gitattributes` forces LF; `core.autocrlf=false`.
