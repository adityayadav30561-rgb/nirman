// Screenshot a page after optionally running JS (e.g. open a menu).
// usage: node shotjs.mjs <width> <height> <url> <out.png> [script.js] [scrollY]
// Needs headless Edge on port 9333 (see README.md).
import { readFileSync, writeFileSync } from "node:fs";

const [W, H, url, out, jsFile, scrollY = "0"] = process.argv.slice(2);
const t = (await (await fetch("http://127.0.0.1:9333/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const p = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (p.has(m.id)) {
    p.get(m.id)(m);
    p.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    p.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: 1, mobile: +W < 768 });
await send("Page.navigate", { url });
await sleep(5000);
await send("Runtime.evaluate", { expression: `document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, ${scrollY})` });
await sleep(800);
if (jsFile) {
  const r = await send("Runtime.evaluate", { expression: readFileSync(jsFile, "utf8"), awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) console.error(r.result.exceptionDetails.text);
  await sleep(800);
}
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
console.log("saved", out);
ws.close();
