const { chromium } = require('playwright');
const out = process.argv[2];
const sites = { aarika: 'https://aarikafabriccare.com/', easyweb: 'https://www.easywebsolns.com/', blueorbit: 'https://blueorbitdigi.com/', vana: 'https://vana-blond.vercel.app/', guru: 'https://guruindiancuisine.vercel.app/', sitco: 'https://sitcobusiness.com/', ashville: 'https://ashvillebaga.com/' };
(async () => {
  const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
  for (const [k, url] of Object.entries(sites)) {
    for (const [tag, vp] of [['d', { width: 1440, height: 900 }], ['m', { width: 390, height: 780 }]]) {
      const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: tag === 'm', hasTouch: tag === 'm' });
      const pg = await ctx.newPage();
      try { await pg.goto(url, { waitUntil: 'load', timeout: 60000 }); await pg.waitForTimeout(6000); await pg.screenshot({ path: `${out}/${k}-${tag}.png` }); console.log(k, tag, 'ok'); }
      catch (e) { console.log(k, tag, 'ERR', String(e).slice(0, 120)); }
      await ctx.close();
    }
  }
  await b.close();
})();
