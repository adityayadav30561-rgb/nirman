// Renders the site's share image (Open Graph / Twitter) to
// src/app/opengraph-image.png with headless Chromium, using the real logo
// mark and Poppins (docs/sections/00-page-review.md). Re-run after changing
// the headline or colours:  NODE_PATH=$(npm root -g) node scripts/make-og.mjs
// (next/og's renderer dropped parts of the logo, so this is a static file.)
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Playwright is installed globally in cloud sessions (NODE_PATH), so load it the CommonJS way.
const load = createRequire(import.meta.url);
const { chromium } = load("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:Poppins,sans-serif;color:#fff;
       background:linear-gradient(160deg,#1d2027,#121418);padding:80px;
       display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:18px;font-size:42px;font-weight:600;letter-spacing:-1.2px}
  h1{font-size:70px;line-height:1.12;font-weight:600;letter-spacing:-2px;max-width:960px}
  .bar{margin-top:30px;height:8px;width:260px;border-radius:8px;background:#f26b2b}
  .foot{font-size:26px;color:rgba(255,255,255,.82)}
</style></head><body>
  <div class="brand">
    <svg width="64" height="64" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill="#ffffff"/>
      <path d="M9 24V11.5A3.5 3.5 0 0 1 12.5 8h7a3.5 3.5 0 0 1 3.5 3.5V24" fill="none" stroke="#05070c" stroke-width="3"/>
      <rect x="13" y="20" width="6" height="4" rx="1" fill="#f26b2b"/>
    </svg>
    nirman
  </div>
  <div><h1>Websites, SEO and software that grow your business.</h1><div class="bar"></div></div>
  <div class="foot">Websites · SEO · Custom software · Nirman CRM · India and worldwide</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(here, "..", "src", "app", "opengraph-image.png");
  await p.screenshot({ path: out });
  await b.close();
  console.log("wrote", out);
})();
