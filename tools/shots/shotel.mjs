// Capture whole elements by id on any page of the dev server.
// node shotel.mjs <width> <path> <outDir> <prefix> id1 id2 ...
// Example: node tools/shots/shotel.mjs 1440 /lab/facts/ C:/tmp/shots 02-facts var-a var-b
// Writes <outDir>/<prefix>-<id>-<width>.png, each clipped to the element's box.
// Needs headless Edge on port 9333 (see README step 1).
import { writeFileSync } from "node:fs";
const [W, path, outDir, prefix, ...ids] = process.argv.slice(2);
// Skip Edge's own pages (e.g. edge://sync-confirmation-dialog); open a tab if none is usable.
let t = (await (await fetch("http://127.0.0.1:9333/json/list")).json()).find(
  (x) => x.type === "page" && !x.url.startsWith("edge://"),
);
if (!t) t = await (await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const p = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (p.has(m.id)) { p.get(m.id)(m); p.delete(m.id); }
});
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; p.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: Number(W), height: 900, deviceScaleFactor: 1, mobile: Number(W) < 768 });
await send("Page.navigate", { url: `http://localhost:3000${path}` });
await sleep(4000);
for (const sid of ids) {
  let b = null;
  // wait up to ~20 s for the element (first compile of a dev route is slow)
  for (let tries = 0; tries < 20 && !b; tries++) {
    const r0 = await send("Runtime.evaluate", {
      expression: `(() => { const e = document.getElementById('${sid}'); if (!e) return location.href + ' | no #${sid}'; const r = e.getBoundingClientRect(); return JSON.stringify({ x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }); })()`,
      returnByValue: true,
    });
    const v = r0.result?.result?.value;
    if (typeof v === "string" && v.startsWith("{")) b = JSON.parse(v);
    else { if (tries === 19) console.error("not found:", v ?? JSON.stringify(r0)); await sleep(1000); }
  }
  if (!b) continue;
  const r = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: b.x, y: b.y, width: b.w, height: b.h, scale: 1 },
  });
  writeFileSync(`${outDir}/${prefix}-${sid}-${W}.png`, Buffer.from(r.result.data, "base64"));
}
console.log("done");
ws.close();
