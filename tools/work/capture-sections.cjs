// Scrolls each site slowly (so scroll-in content appears), then saves viewport shots at set depths.
const { chromium } = require('playwright');
const out = process.argv[2];
const sites = { aarika: 'https://aarikafabriccare.com/', easyweb: 'https://www.easywebsolns.com/', blueorbit: 'https://blueorbitdigi.com/', vana: 'https://vana-blond.vercel.app/', guru: 'https://guruindiancuisine.vercel.app/', sitco: 'https://sitcobusiness.com/', ashville: 'https://ashvillebaga.com/' };
(async () => {
  const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
  for (const [k, url] of Object.entries(sites)) for (const [tag, vp, depths] of [['d', { width: 1440, height: 900 }, [0.2, 0.4, 0.6, 0.8]], ['m', { width: 390, height: 780 }, [0.3, 0.6]]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: tag === 'm' ? 2 : 1.5, isMobile: tag === 'm', hasTouch: tag === 'm' });
    const pg = await ctx.newPage();
    try {
      await pg.goto(url, { waitUntil: 'load', timeout: 60000 }); await pg.waitForTimeout(tag === 'd' && (k === 'vana' || k === 'easyweb') ? 14000 : 6000);
      let h = await pg.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 350) { await pg.mouse.wheel(0, 350); await pg.waitForTimeout(220); h = await pg.evaluate(() => document.documentElement.scrollHeight); }
      for (let i = 0; i < depths.length; i++) {
        const y = Math.round((h - vp.height) * depths[i]);
        await pg.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await pg.waitForTimeout(1800);
        await pg.screenshot({ path: `${out}/${k}-${tag}${i + 2}.png` });
      }
      console.log(k, tag, h);
    } catch (e) { console.log(k, tag, 'ERR', String(e).slice(0, 120)); }
    await ctx.close();
  }
  await b.close();
})();
