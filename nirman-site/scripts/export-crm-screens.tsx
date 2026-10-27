/*
 * Exports the five Nirman CRM screens from the homepage as one standalone
 * HTML file (design hand-off). Renders the real component for each tab, so
 * the export always matches the site.
 *
 * Run from nirman-site/ after `npm run build` (it reuses the built CSS):
 *   npx tsx scripts/export-crm-screens.tsx
 * Output: ../design-handoff/crm-screens.html
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { NirmanCrm } from "../src/components/nirman-crm";

const tabs = [
  ["dashboard", "Dashboard", "What a sales head sees first thing in the morning."],
  ["pipeline", "Pipeline", "Deals by stage, with value and age."],
  ["leads", "Leads", "Lead list with the selected lead's history."],
  ["followups", "Follow-ups", "Today's follow-ups across WhatsApp, calls and email."],
  ["reports", "Reports", "Conversion, sources and team performance."],
] as const;

/** Returns the element starting at the first `<div class="stage` with balanced divs. */
function cutStage(html: string) {
  const start = html.indexOf('<div class="stage');
  if (start < 0) throw new Error("stage not found");
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error("unbalanced stage markup");
}

// Site CSS from the production build, minus next/font's self-hosted faces
// (the export loads the same fonts from Google Fonts instead).
const cssDir = join(".next", "static", "chunks");
const css = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(cssDir, f), "utf8"))
  .join("\n")
  .replace(/@font-face\s*{[^}]*}/g, "");

const screens = tabs
  .map(
    ([id, label, note]) => `
    <section class="x-screen" id="${id}">
      <header class="x-head"><h2>${label}</h2><p>${note}</p></header>
      <div class="x-frame">${cutStage(renderToStaticMarkup(<NirmanCrm initialTab={id} />))}</div>
    </section>`,
  )
  .join("\n");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nirman CRM screens</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300..800&family=Mona+Sans:wdth,wght@75..125,200..900&display=swap" rel="stylesheet">
<style>
${css}
/* Export page chrome. The screens use the site's own classes above. */
:root { --font-mona: "Mona Sans"; --font-funnel: "Funnel Sans"; }
html { font-size: 16px !important; }
body { margin: 0; background: #0b2620; color: #f6f2ea; font-family: "Funnel Sans", system-ui, sans-serif; }
.x-wrap { max-width: 1320px; margin: 0 auto; padding: 48px 40px 96px; }
.x-wrap > h1 { font: 760 44px/1 "Mona Sans", sans-serif; font-variation-settings: "wdth" 118; letter-spacing: -0.035em; margin: 0; }
.x-intro { max-width: 46rem; color: rgb(246 242 234 / 0.7); line-height: 1.6; }
.x-nav { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 8px; }
.x-nav a { color: #f6f2ea; text-decoration: none; padding: 8px 16px; border-radius: 999px; background: rgb(255 255 255 / 0.06); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12); font-size: 15px; }
.x-nav a:hover { background: #9fdcb8; color: #0b2620; }
.x-screen { margin-top: 56px; scroll-margin-top: 24px; }
.x-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 16px; }
.x-head h2 { font: 650 24px/1.1 "Mona Sans", sans-serif; font-variation-settings: "wdth" 106; margin: 0; color: #9fdcb8; }
.x-head p { margin: 0; color: rgb(246 242 234 / 0.55); font-size: 15px; }
.x-frame { width: 100%; max-width: 1240px; }
</style>
</head>
<body>
<main class="x-wrap">
  <h1>Nirman CRM screens</h1>
  <p class="x-intro">The five CRM views from the Nirman homepage, rendered from the live components at their desktop size (1240 &times; 590). Open on a screen at least 1024px wide. Names, companies and figures are sample data. Colours, type and sizes are documented in design-system.html.</p>
  <nav class="x-nav">${tabs.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav>
${screens}
</main>
</body>
</html>
`;

mkdirSync(join("..", "design-handoff"), { recursive: true });
writeFileSync(join("..", "design-handoff", "crm-screens.html"), page);
console.log(`wrote design-handoff/crm-screens.html (${Math.round(page.length / 1024)} KB, ${tabs.length} screens)`);
