# Architecture, file map and gotchas

## Folders

```
E:\nirman2\
  CLAUDE.md                 session instructions (auto-loaded)
  docs\                     plan, status, decisions, design, this file, handoff copy
  tools\shots\              headless-Edge screenshot scripts: shotsec, shotjs, eval, evalasync (see README)
  .claude\launch.json       dev server config for the app preview
  nirman-site\              the Next.js app
    src\app\                layout.tsx (fonts, metadata, header/footer/widgets for every page),
                            page.tsx (homepage sections + JSON-LD), not-found.tsx (404), globals.css
    src\components\         hero, nirman-crm, work, process, why-us, final-cta, logo, photo, stage,
                            site-header (dropdowns + mobile menu), site-footer, site-widgets
                            (cookie banner, consult pop-up, WhatsApp button, phone sticky bar)
    src\components\services services grid: services.tsx (grid + intro), service-copy.tsx
                            (ServiceCard + tones), seo/web/automation/software/apps/marketing.tsx
    src\components\mockups\ frames.tsx (Device, PhoneFrame), concept-site.tsx, charts.tsx, art.tsx
    src\components\ui\      button.ts (helper), button-link, container, section, heading, card, chip,
                            breadcrumbs
    src\content\            site.ts (brand, contact placeholders, all nav data), home.ts (homepage
                            copy, SAMPLE data), photos.ts, devices.ts
    src\lib\stored.ts       localStorage hook (consent, dismissed pop-ups)
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

Client (`"use client"`): site-header, site-widgets, nirman-crm, process, final-cta, lib/stored.
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
14. **Unlayered CSS beats Tailwind utilities.** The `.anim-*` classes in
    globals.css are unlayered, so `[animation-duration:..]` on the same element
    does nothing. Use `.anim-pop` (0.18s) for menus, or add a new class.
15. **`hidden` loses to `button()`'s `inline-flex`.** To hide a button below a
    breakpoint use `max-xl:hidden` (etc.), not `hidden xl:inline-flex`.
16. **Header uses `usePathname`** and sits in `<Suspense>` in `layout.tsx`
    (Next 16 + cacheComponents: dynamic routes would otherwise block
    prerendering). Fallback = `<SiteHeader pathname={null} />`.
17. **localStorage state** uses `useStored()` (`src/lib/stored.ts`,
    `useSyncExternalStore`); ESLint here rejects setState inside effects.
    `writeStored` fires a `nirman-storage` event so all hooks update.
18. Screenshot scripts: `shotjs.mjs` loads a URL, runs a JS file (open a menu,
    set localStorage), screenshots. Don't `location.reload()` inside the JS file;
    the evaluation context dies.
19. **Hero height is tied to the photo.** Desktop `#top` is `46vw + 4rem`
    because the desk photo's bottom sits at ~46.1vw (Stage scales by width).
    Replace or re-crop the photo → re-measure `img.getBoundingClientRect().bottom
    / innerWidth` and update the class in `hero.tsx`.
20. **`flex-1` collapses inputs in a column flex** (basis 0 beats `h-14`). Use
    `w-full sm:flex-1` when a row stacks on phones (see `free-tools.tsx`).
21. **`LineChart gridLines={0}`** used to emit NaN `<line>` attributes (now
    guarded in `charts.tsx`); keep the guard if the chart is rewritten.
22. **Preview scrolling:** right after `navigate`, a `scrollTo` in the same
    batch is often undone by load-time scroll restoration. Scroll in a
    separate call (or use the wheel) before screenshots.
