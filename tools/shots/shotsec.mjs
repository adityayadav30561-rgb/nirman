// Capture specific sections: node shotsec.mjs <width> <outDir> id1[:offset[:height]] ...
import { writeFileSync } from "node:fs";
const [W, outDir, ...ids] = process.argv.slice(2);
const t = (await (await fetch("http://127.0.0.1:9333/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0; const p = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (p.has(m.id)) { p.get(m.id)(m); p.delete(m.id); } });
const send = (method, params = {}) => new Promise((res) => { const i = ++id; p.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: Number(W), height: 900, deviceScaleFactor: 1, mobile: Number(W) < 768 });
await send("Page.navigate", { url: "http://localhost:3000/" });
await sleep(6000);
for (const spec of ids) {
  const [sid, off = "0", hh = "900"] = spec.split(":");
  await send("Emulation.setDeviceMetricsOverride", { width: Number(W), height: Number(hh), deviceScaleFactor: 1, mobile: Number(W) < 768 });
  await send("Runtime.evaluate", { expression: `document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, document.getElementById('${sid}').getBoundingClientRect().top + scrollY + ${off})` });
  await sleep(2500);
  const r = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${outDir}/${sid}-${off}-${W}.png`, Buffer.from(r.result.data, "base64"));
}
console.log("done"); ws.close();
