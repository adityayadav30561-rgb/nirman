import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/*
 * Fetching addresses that visitors type in, safely (docs/sections/
 * p6-seo-audit.md). The audit must never be usable to reach machines inside
 * a private network, so before every request, and again before every
 * redirect hop, the address must be http(s) on the standard port and every
 * IP its name resolves to must be a public one. Bodies are cut at a size
 * limit and every request has a time limit.
 */

export class AuditError extends Error {
  constructor(public code: "invalid" | "private" | "unreachable" | "timeout" | "too-many-redirects", message: string) {
    super(message);
  }
}

function v4Public(ip: string) {
  const [a, b, c] = ip.split(".").map(Number);
  if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
  if (a === 100 && b >= 64 && b <= 127) return false;
  if (a === 169 && b === 254) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 192 && b === 168) return false;
  if (a === 192 && b === 0 && (c === 0 || c === 2)) return false;
  if (a === 198 && (b === 18 || b === 19)) return false;
  if (a === 198 && b === 51 && c === 100) return false;
  if (a === 203 && b === 0 && c === 113) return false;
  return true;
}
export function isPublicIp(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return v4Public(ip);
  if (kind !== 6) return false;
  const v = ip.toLowerCase();
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return v4Public(mapped[1]);
  if (v === "::" || v === "::1") return false;
  if (/^f[cd]/.test(v) || /^fe[89ab]/.test(v) || v.startsWith("ff")) return false; // unique local, link local, multicast
  if (v.startsWith("2001:db8") || v.startsWith("64:ff9b") || v.startsWith("::ffff:")) return false;
  return true;
}

/** Throws unless the address is a public website address. */
export async function assertPublicUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new AuditError("invalid", "That does not look like a website address.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new AuditError("invalid", "Only http and https addresses can be audited.");
  if (url.username || url.password || (url.port && url.port !== "80" && url.port !== "443")) throw new AuditError("invalid", "That address cannot be audited.");
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (isIP(host)) {
    if (!isPublicIp(host)) throw new AuditError("private", "That address is not a public website.");
    return url;
  }
  if (!host.includes(".") || /\.(local|localhost|internal|lan|home|corp|test|invalid|example)$/.test(host) || host === "localhost") throw new AuditError("invalid", "Enter a public website address, like yourbusiness.com.");
  let found: { address: string }[];
  try {
    found = await lookup(host, { all: true });
  } catch {
    throw new AuditError("unreachable", `We could not find ${host}. Check the spelling.`);
  }
  if (!found.length || !found.every((a) => isPublicIp(a.address))) throw new AuditError("private", "That address is not a public website.");
  return url;
}

export type Fetched = { ok: boolean; status: number; url: string; chain: { url: string; status: number }[]; headers: Record<string, string>; body: string; bytes: number; ms: number; truncated: boolean };

const UA = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 NirmanSeoAudit/1.0 (+https://www.nirmandigital.com/tools/seo-audit/)";

/** GET with manual redirects (each hop checked), a time limit and a size limit. Never throws for HTTP errors; throws AuditError when the site cannot be reached at all. */
export async function safeFetch(raw: string, { maxBytes = 2_500_000, timeoutMs = 9000, maxRedirects = 6, follow = true }: { maxBytes?: number; timeoutMs?: number; maxRedirects?: number; follow?: boolean } = {}): Promise<Fetched> {
  const started = Date.now();
  const chain: { url: string; status: number }[] = [];
  let current = raw;
  const signal = AbortSignal.timeout(timeoutMs);
  for (let hop = 0; ; hop++) {
    const url = await assertPublicUrl(current);
    let res: Response;
    try {
      res = await fetch(url, { redirect: "manual", signal, headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5", "accept-language": "en" } });
    } catch (e) {
      if (signal.aborted) throw new AuditError("timeout", "The site took too long to answer.");
      throw new AuditError("unreachable", `We could not connect to ${url.hostname}.${e instanceof Error && /certificate|SSL|TLS/i.test(String((e as { cause?: unknown }).cause ?? e.message)) ? " Its security certificate may be invalid." : ""}`);
    }
    const location = res.headers.get("location");
    if (follow && res.status >= 300 && res.status < 400 && location) {
      chain.push({ url: url.href, status: res.status });
      await res.body?.cancel().catch(() => {});
      if (hop >= maxRedirects) throw new AuditError("too-many-redirects", "The site redirects too many times.");
      current = new URL(location, url).href;
      continue;
    }
    // read the body up to the limit
    let bytes = 0;
    let truncated = false;
    const parts: Uint8Array[] = [];
    const reader = res.body?.getReader();
    if (reader) {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > maxBytes) {
            truncated = true;
            parts.push(value.subarray(0, value.byteLength - (bytes - maxBytes)));
            await reader.cancel().catch(() => {});
            break;
          }
          parts.push(value);
        }
      } catch {
        if (signal.aborted) throw new AuditError("timeout", "The site took too long to answer.");
        truncated = true;
      }
    }
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => (headers[k] = v));
    return { ok: res.status >= 200 && res.status < 300, status: res.status, url: url.href, chain, headers, body: Buffer.concat(parts).toString("utf8"), bytes, ms: Date.now() - started, truncated };
  }
}

/** Turns what a visitor typed (domain, with or without https, with or without a path) into an address to audit. */
export function normaliseInput(input: string): string {
  let s = String(input || "").trim().replace(/\s+/g, "");
  if (!s || s.length > 300) throw new AuditError("invalid", "Enter your website address, like yourbusiness.com.");
  if (!/^https?:\/\//i.test(s)) s = `https://${s.replace(/^\/+/, "")}`;
  let url: URL;
  try {
    url = new URL(s);
  } catch {
    throw new AuditError("invalid", "That does not look like a website address.");
  }
  url.hash = "";
  return url.href;
}
