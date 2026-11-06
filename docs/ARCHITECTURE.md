# Architecture, file map and gotchas

## Folders (rebuild, 2026-11-06)

```
E:\nirman2\
  CLAUDE.md                 session instructions (auto-loaded)
  docs\                     STATUS, BUILD-PLAN, DECISIONS, DESIGN, DESIGN-PROTOCOL,
                            PAGE-PLAN, REFERENCE-VIDEO, REDESIGN (SEO/QA standards),
                            handoff (business rules), this file
  docs\sections\            one design record per section (+ shots\ screenshots)
  docs\archive\             old v2 plan, design and status (history only)
  tools\shots\              headless-Edge screenshot scripts (see README)
  tools\video\              reference-video analysis scripts (see README)
  design-handoff\           CRM screens HTML + design tokens the user liked (v2 look)
  .claude\launch.json       dev server config for the app preview
  .claude\skills\           nirman-start, nirman-wrap (session start / end)
  old-site\                 old v2 app, gitignored, local only
  nirman-site\              the Next.js app
    src\app\                layout.tsx (Poppins, metadata, header), page.tsx (homepage),
                            globals.css (tokens, container, motion system), favicon.ico
    src\components\         site-header.tsx (client, GSAP entrance), logo.tsx
    src\components\motion\  gsap.ts (plugins), hero-, facts-, services-, map-motion (client)
    src\components\home\    hero.tsx, phone-screen.tsx, cloud.tsx, facts.tsx, services.tsx,
                            service-icons.tsx, map.tsx, world-map.tsx, quote-bar.tsx
    src\components\ui\      button.tsx (ButtonLink), select.tsx (Select, client, Framer Motion)
    src\components\lab\     section variants while choosing (protocol); dev-only
    src\content\            site.ts (brand, placeholders), nav.ts, image-credits.ts, facts.ts,
                            services.ts, map.ts, world-dots.json (generated)
    scripts\cut-hand.py     builds the hero hand layers from the Unsplash photo
    scripts\make-world-dots.mjs  builds content/world-dots.json (Natural Earth land, hex grid)
    public\images\hero\     hand-back.webp, hand-front.webp
```

## Stack

Next.js 16.4.2 (App Router, Turbopack, `cacheComponents: true`,
`partialPrefetching: true`), React 19.3, Tailwind 4 (`@theme` in CSS),
TypeScript, ESLint 9 flat config, lucide-react icons, GSAP 3.15.0 (pinned) +
@gsap/react, Framer Motion (`motion` 13.5.1, pinned). Packages that publish
often: pin a release at least two weeks old. Images via
`next/image` (`images.qualities: [70, 80]`; pass `quality={80}`; use
`preload`, not the deprecated `priority`).

## Client vs server components

Client (`"use client"`): site-header, ui/select and `components/motion/*`. Everything else is a server component.

## Gotchas (add new ones here)

Gotchas 3-29 come from the old v2 site; some mention code that is now in
`old-site/`. The general lessons still apply. Newest: 30-38.

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
23. **Share image is `/og.png`, not `opengraph-image`.** The file convention
    serves an extensionless URL, which `trailingSlash` 308-redirects (dev and
    prod). `app/og.png/route.tsx` (static `ImageResponse`) avoids that; root
    metadata points at `site.ogImage`. Metadata merges shallowly, so any page
    that sets `openGraph`/`twitter` must include `site.ogImage` again (P3.2
    helper does this). Satori needs TTF/OTF; no brand TTF is local, so the
    image uses the bundled Geist font.
24. **Every page goes in `src/content/pages.ts` first.** Sitemap, llms.txt,
    stub breadcrumbs and `registryMetadata(path)` read it; `registryMetadata`
    and `StubPage` throw if a path is missing. Replacing a stub: keep
    `registryMetadata("/path/")` (or `pageMetadata()` for custom titles) and
    swap `<StubPage>` for the real page. Check nested canonicals keep the
    trailing slash (they do with `alternates.canonical: path`).
25. **Arbitrary px values do not scale inside a `Stage`.** Only Tailwind
    spacing (and `fs-*`, radii) resolve to design px there; `w-[70px]` or
    `grid-cols-[1fr_70px]` stay real px and break the composition when it
    scales. Use spacing numbers (`w-70`) or `fr` ratios in grid templates.
26. **Service page mockups** (`components/service-art.tsx`) are all 640 × 420
    design px so one mockup works in the process panel and the reports viewer.
    Server-render them and pass them to the client sections as `visual` props.
27. **Bounded scale.** `html` font-size is clamped per device class (desktop max
    17px) and `container-site` is capped at 96rem. Never size anything with a
    bare `vw` (it grows forever on 4K); use rem, `clamp()` with a rem ceiling,
    or `cqw` inside a capped `@container` wrapper (see `hero.tsx`).
28. **Downloads in this environment:** the context-mode hook blocks `curl` and
    `wget` in Bash. Use PowerShell `Invoke-WebRequest -UseBasicParsing` (without
    that switch Windows PowerShell 5.1 stops at an interactive prompt). Pexels'
    `/download/video/<id>/` redirect returns the *largest* file, so send a `HEAD`
    first and check `Content-Length`; there is no ffmpeg here to shrink files.
29. **Ambient video** (`home1/ambient-video.tsx`): poster always renders; the
    file loads only at 768px and up, without reduced motion or Save-Data, once
    visible. Keep clips under 6 MB.
30. **`LayoutProps` / `PageProps` are generated types.** After deleting
    `.next`, `npx tsc --noEmit` fails with "Cannot find name 'LayoutProps'"
    until `npm run build` or `npm run dev` regenerates `.next/types`. Run the
    build first, then tsc.
32. **Stale dev CSS.** The dev server does NOT pick up `globals.css` edits
    (no recompile; likely the custom `turbopack.rules` CSS loader in
    `next.config.ts`), and keeps serving old CSS even after a plain restart
    (persistent cache). After every CSS edit: stop the server, delete
    `nirman-site/.next`, start again. Running `npm run build` while the dev
    server runs can also leave it stale. TSX edits hot-reload fine.
33. **Checking animations frame by frame:** restart all CSS animations, pause
    them, then seek: set `style.animation='none'` on every element, force a
    reflow, clear it, then `document.getAnimations().forEach(a => { a.pause();
    a.currentTime = t * 1000 })`. Finished animations drop out of
    `getAnimations()`, so do this before they end.
34. **SVG draw-in:** `vectorEffect="non-scaling-stroke"` breaks
    `pathLength`-based dashes; and use `stroke-dasharray: 1 2` (gap longer
    than the path) so offset 1 hides the stroke completely.
31. **Bulk deletes are blocked** by the built-in safety check (`rm -rf` on
    several folders). Do not work around it: ask the user, or move folders to
    a gitignored archive with their approval (2026-11-06: `old-site/`).
35. **SVG gradient ids are global.** Two inline SVGs with the same
    `<linearGradient id>` share one definition; if the first copy sits in a
    hidden element (display: none), every other copy loses its fill. Give
    each icon instance a unique id prefix (`ServiceIcon uid`).
36. **The in-app browser pane can run the page as hidden**
    (`document.visibilityState` "hidden", about 3 frames a second), and
    GSAP's lag smoothing then makes animations crawl about 10x slower, so
    screenshots look frozen. To check motion: in dev, `window.__gsap` and
    `window.__ST` exist (`components/motion/gsap.ts`). Run
    `__gsap.ticker.lagSmoothing(0)`, or seek: `const r = __gsap.exportRoot();
    r.pause(); r.seek(t)` (load timelines only; it breaks scroll triggers, so
    reload afterwards). Read computed styles rather than trusting
    screenshots. Reloading restores the scroll position: set
    `history.scrollRestoration = 'manual'` and `scrollTo(0, 0)` first.
37. **CSS failsafe animations beat inline styles.** The `gs-*` failsafes
    (2.5 s) override GSAP's inline values once they fire, so only use them
    for properties GSAP has finished with by then (visibility, the hero's
    opacity and strokes). Never on anything scroll-triggered.
38. **Tailwind 4 `rotate-*` uses the CSS `rotate` property**, which stacks
    with GSAP's transform rotation. On GSAP targets use
    `[transform:rotate(8deg)]` instead.

