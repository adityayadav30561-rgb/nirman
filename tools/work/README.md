# Work page assets

`capture-sites.cjs <outDir>`: opens each client site (list inside the file)
with Playwright and saves a desktop (1440 x 900 @2x) and a phone (390 x 780
@2x) screenshot. Resize to 1600 x 1000 and 520 x 1040 WebP and save as
`nirman-site/public/images/work/site-<key>.webp` and `site-<key>-m.webp`.
Sites with an intro animation (Vana, EasyWebSolns) need a longer wait
(about 16 s) before the screenshot. Cloud sessions need each site's host in
the environment's allowed hosts.

After replacing an image under the same name, delete
`nirman-site/.next/cache/images` (the dev server keeps serving the old one).

`capture-sections.cjs <outDir>`: scrolls each site slowly so scroll-in
content appears, then saves four desktop and two phone screenshots at set
depths (`<key>-d2..d5.png`, `<key>-m2..m3.png`). Look at each before using
it: leave out shots that show a client's prices or services we do not
offer. It takes about twelve minutes for seven sites; run it in the
background.
