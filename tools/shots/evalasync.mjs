// Evaluate an async JS file in the current headless page: node evalasync.mjs file.js
import { readFileSync } from "node:fs";
const expr = readFileSync(process.argv[2], "utf8");
const t = (await (await fetch("http://127.0.0.1:9333/json/list")).json()).find((x) => x.type === "page");
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id === 1) { console.log(m.result.result?.value ?? JSON.stringify(m.result)); ws.close(); } });
ws.send(JSON.stringify({ id: 1, method: "Runtime.evaluate", params: { expression: expr, awaitPromise: true, returnByValue: true } }));
