import { crawl } from "../src/lib/audit/crawl";
import { buildReport, summarise, priorities } from "../src/lib/audit/checks";
for (const u of process.argv.slice(2)) {
  const t = Date.now();
  try {
    const c = await crawl(u);
    const r = buildReport(c, { available: false }, new Date().toISOString());
    const s = summarise(r);
    console.log(`\n${u} -> ${c.finalUrl} ${c.status} in ${Date.now() - t}ms  overall ${s.overall}  ${JSON.stringify(s.totals)}`);
    console.log(s.cats.map((x) => `${x.key}:${x.score}`).join("  "));
    console.log(priorities(r, 4).map((k) => ` - [${k.status}] ${k.title}: ${k.found}`).join("\n"));
    if (process.env.CAT) console.log(r.checks.filter((k) => process.env.CAT!.split(",").includes(k.cat)).map((k) => `   ${k.cat} [${k.status}] ${k.title}: ${k.found}`).join("\n"));
  } catch (e) { console.log(u, "ERR", (e as Error).message); }
}
