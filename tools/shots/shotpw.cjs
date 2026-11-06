// Element screenshots at 1440 and 375 with Playwright (tools/shots/README.md section 6).
// Usage: node shotpw.cjs <url> <outDir> <id> [<id> ...]
const { chromium } = require('playwright');
(async () => {
  const [url, out, ...ids] = process.argv.slice(2);
  const b = await chromium.launch();
  for (const w of [1440, 375]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: 'header{display:none!important}' });
    for (const id of ids) {
      const el = p.locator('#' + id);
      await el.scrollIntoViewIfNeeded();
      await p.mouse.wheel(0, 50); await p.waitForTimeout(1800);
      await el.screenshot({ path: `${out}/${id}-${w}.png` });
    }
    await p.close();
  }
  await b.close();
})();
