// Watches the phone for the whole audit: its box must stay phone-sized at every sample.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const w of [1440, 1261, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem('nirman-consent', JSON.stringify({ analytics: false, ads: false, t: Date.now() })));
    const p = await ctx.newPage();
    await p.goto('http://localhost:3000/tools/seo-audit/', { waitUntil: 'networkidle' });
    await p.locator('input[name="url"]').click(); await p.keyboard.type('nirmandigital.com'); await p.keyboard.press('Enter');
    let max = 0, min = 1e9, n = 0, shotAt = 0;
    const t0 = Date.now();
    while (Date.now() - t0 < 45000) {
      const r = await p.evaluate(() => { const e = document.querySelector('.sc-tilt'); if (!e) return null; const b = e.getBoundingClientRect(); return { w: b.width, h: b.height }; });
      if (!r) { if (n > 20) break; await p.waitForTimeout(100); continue; }
      n++; max = Math.max(max, r.w, r.h / 2); min = Math.min(min, r.w);
      if (n === 60) { await p.screenshot({ path: `tilt-${w}.png` }); shotAt = Date.now() - t0; }
      await p.waitForTimeout(110);
    }
    console.log(JSON.stringify({ viewport: w, samples: n, seconds: Math.round((Date.now() - t0) / 1000), widthMin: Math.round(min), widthOrHalfHeightMax: Math.round(max), ok: max < 330 && min > 150 }));
    await ctx.close();
  }
  await b.close();
})();
