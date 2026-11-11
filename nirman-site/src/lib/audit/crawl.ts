import { parse, type HTMLElement } from "node-html-parser";
import { AuditError, safeFetch, type Fetched } from "@/lib/audit/safe-fetch";

/*
 * What the audit reads from a site (docs/sections/p6-seo-audit.md): the page
 * itself, how http and the www / non-www twin behave, robots.txt, the
 * sitemap and llms.txt. Only facts are collected here; judging them is
 * checks.ts.
 */

export const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"] as const;

export type Crawl = {
  requested: string;
  finalUrl: string;
  host: string;
  status: number;
  ms: number;
  bytes: number;
  truncated: boolean;
  chain: { url: string; status: number }[];
  headers: { contentType: string; encoding: string; xRobots: string; hsts: boolean; cacheControl: string };
  /** does http:// end on https://? null: could not tell */
  httpUpgrades: boolean | null;
  /** the www / non-www twin of the host: where it ends up */
  twin: { host: string; reachable: boolean; sameSite: boolean } | null;
  page: {
    title: string;
    description: string;
    robots: string;
    canonical: string;
    lang: string;
    viewport: string;
    charset: boolean;
    h1: string[];
    headings: { level: number; text: string }[];
    words: number;
    images: { total: number; missingAlt: number; examples: string[] };
    links: { internal: number; external: number; noText: number };
    og: { title: string; description: string; image: string };
    twitterCard: string;
    favicon: string;
    themeColor: string;
    jsonLd: { blocks: number; invalid: number; types: string[] };
    hreflang: number;
    mixed: string[];
  };
  robots: { exists: boolean; status: number; sitemaps: string[]; googlebotAllowed: boolean; blockedAi: string[]; mentionsAi: boolean };
  sitemap: { url: string; exists: boolean; urls: number; isIndex: boolean; valid: boolean };
  llms: boolean;
};

const txt = (s: string | undefined | null) => (s || "").replace(/\s+/g, " ").trim();
const meta = (root: HTMLElement, sel: string) => txt(root.querySelector(sel)?.getAttribute("content"));
const absolute = (href: string, base: string) => {
  try {
    return new URL(href, base).href;
  } catch {
    return "";
  }
};

/** robots.txt: is `path` allowed for this crawler? The most specific matching group wins, then the longest matching rule (Allow on a tie), as Google reads it. */
export function robotsAllows(body: string, agent: string, path: string): boolean {
  type Group = { agents: string[]; rules: { allow: boolean; path: string }[] };
  const groups: Group[] = [];
  let cur: Group | null = null;
  let lastWasAgent = false;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) groups.push((cur = { agents: [], rules: [] }));
      cur.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if ((key === "allow" || key === "disallow") && cur) {
      lastWasAgent = false;
      if (value) cur.rules.push({ allow: key === "allow", path: value });
    } else lastWasAgent = false;
  }
  const a = agent.toLowerCase();
  const group = groups.find((g) => g.agents.includes(a)) || groups.find((g) => g.agents.includes("*"));
  if (!group) return true;
  let best: { allow: boolean; len: number } | null = null;
  for (const r of group.rules) {
    const re = new RegExp(`^${r.path.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$")}`);
    if (!re.test(path)) continue;
    const len = r.path.length;
    if (!best || len > best.len || (len === best.len && r.allow)) best = { allow: r.allow, len };
  }
  return best ? best.allow : true;
}

function readPage(html: string, finalUrl: string): Crawl["page"] {
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: true, noscript: false } });
  const head = root.querySelector("head") || root;
  const origin = new URL(finalUrl);

  const jsonLd = { blocks: 0, invalid: 0, types: [] as string[] };
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;
    const t = o["@type"];
    (Array.isArray(t) ? t : [t]).forEach((x) => typeof x === "string" && types.add(x));
    Object.values(o).forEach((v) => typeof v === "object" && walk(v));
  };
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    jsonLd.blocks++;
    try {
      walk(JSON.parse(s.textContent));
    } catch {
      jsonLd.invalid++;
    }
  }
  jsonLd.types = [...types].slice(0, 30);

  // visible text: the body without scripts, styles, templates and svg
  const body = root.querySelector("body");
  const clone = body ? parse(body.outerHTML, { comment: false }) : null;
  clone?.querySelectorAll("script,style,noscript,template,svg,iframe").forEach((n) => n.remove());
  const words = txt(clone?.textContent).split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

  const imgs = root.querySelectorAll("img");
  const missing = imgs.filter((i) => i.getAttribute("alt") === undefined && i.getAttribute("role") !== "presentation" && i.getAttribute("aria-hidden") !== "true");

  let internal = 0;
  let external = 0;
  let noText = 0;
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") || "";
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    const to = absolute(href, finalUrl);
    if (!to) continue;
    const base = origin.hostname.replace(/^www\./, "");
    const there = new URL(to).hostname;
    if (there === base || there.endsWith(`.${base}`)) internal++; // subdomains of the same site count as internal
    else external++;
    if (!txt(a.textContent) && !a.getAttribute("aria-label") && !a.getAttribute("title") && !a.querySelector("img[alt]")?.getAttribute("alt")) noText++;
  }

  const mixed: string[] = [];
  if (origin.protocol === "https:") {
    for (const el of root.querySelectorAll("img[src],script[src],link[rel=stylesheet][href],iframe[src],video[src],source[src]")) {
      const u = el.getAttribute("src") || el.getAttribute("href") || "";
      if (/^http:\/\//i.test(u) && mixed.length < 5) mixed.push(u.slice(0, 120));
    }
  }

  const icon = head.querySelector('link[rel~="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]')?.getAttribute("href");
  const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6").map((h) => ({ level: Number(h.tagName[1]), text: txt(h.textContent).slice(0, 120) }));
  return {
    title: txt(head.querySelector("title")?.textContent).slice(0, 300),
    description: meta(head, 'meta[name="description" i]').slice(0, 500),
    robots: [meta(head, 'meta[name="robots" i]'), meta(head, 'meta[name="googlebot" i]')].filter(Boolean).join(", ").toLowerCase(),
    canonical: txt(head.querySelector('link[rel="canonical" i]')?.getAttribute("href")),
    lang: txt(root.querySelector("html")?.getAttribute("lang")),
    viewport: meta(head, 'meta[name="viewport" i]'),
    charset: !!head.querySelector("meta[charset]") || /charset=/i.test(head.querySelector('meta[http-equiv="content-type" i]')?.getAttribute("content") || ""),
    h1: headings.filter((h) => h.level === 1).map((h) => h.text).slice(0, 6),
    headings: headings.slice(0, 60),
    words,
    images: { total: imgs.length, missingAlt: missing.length, examples: missing.slice(0, 3).map((i) => (i.getAttribute("src") || i.getAttribute("data-src") || "").split("?")[0].split("/").pop() || "image").map((s) => s.slice(0, 60)) },
    links: { internal, external, noText },
    og: { title: meta(head, 'meta[property="og:title"]'), description: meta(head, 'meta[property="og:description"]'), image: absolute(meta(head, 'meta[property="og:image"]'), finalUrl) },
    twitterCard: meta(head, 'meta[name="twitter:card"]'),
    favicon: icon ? absolute(icon, finalUrl) : "",
    themeColor: meta(head, 'meta[name="theme-color"]'),
    jsonLd,
    hreflang: head.querySelectorAll('link[rel="alternate"][hreflang]').length,
    mixed,
  };
}

const quiet = (p: Promise<Fetched>) => p.catch(() => null);

export async function crawl(requested: string): Promise<Crawl> {
  // the page: https first; if https cannot be reached at all, try http
  let page: Fetched;
  try {
    page = await safeFetch(requested);
  } catch (e) {
    if (!(e instanceof AuditError) || e.code !== "unreachable" || !requested.startsWith("https://")) throw e;
    page = await safeFetch(requested.replace(/^https:/, "http:"));
  }
  const final = new URL(page.url);
  const origin = final.origin;
  const twinHost = final.hostname.startsWith("www.") ? final.hostname.slice(4) : `www.${final.hostname}`;
  const small = { maxBytes: 400_000, timeoutMs: 6000 };

  const [http, twin, robots, llms] = await Promise.all([
    final.protocol === "https:" ? quiet(safeFetch(`http://${final.hostname}/`, { ...small, maxBytes: 20_000 })) : Promise.resolve(null),
    final.hostname.split(".").length <= 3 ? quiet(safeFetch(`${final.protocol}//${twinHost}/`, { ...small, maxBytes: 20_000 })) : Promise.resolve(null),
    quiet(safeFetch(`${origin}/robots.txt`, small)),
    quiet(safeFetch(`${origin}/llms.txt`, { ...small, maxBytes: 50_000 })),
  ]);

  const robotsOk = !!robots && robots.ok && !/<html|<!doctype/i.test(robots.body.slice(0, 300));
  const robotsBody = robotsOk ? robots.body : "";
  const sitemaps = [...robotsBody.matchAll(/^\s*sitemap\s*:\s*(\S+)/gim)].map((m) => m[1]).slice(0, 5);
  let sitemapUrl = `${origin}/sitemap.xml`;
  try {
    if (sitemaps[0]) sitemapUrl = new URL(sitemaps[0], origin).href; // some sites write a relative address here
  } catch {}
  const sm = await quiet(safeFetch(sitemapUrl, { maxBytes: 1_500_000, timeoutMs: 7000 }));
  const smBody = sm?.ok ? sm.body : "";
  const smValid = /<(urlset|sitemapindex)[\s>]/i.test(smBody);

  const path = final.pathname + final.search;
  const mentionsAi = AI_BOTS.some((b) => new RegExp(`user-agent\\s*:\\s*${b}`, "i").test(robotsBody));
  const isHtml = /html/i.test(page.headers["content-type"] || "") || /<html/i.test(page.body.slice(0, 2000));

  return {
    requested,
    finalUrl: page.url,
    host: final.hostname,
    status: page.status,
    ms: page.ms,
    bytes: page.bytes,
    truncated: page.truncated,
    chain: page.chain,
    headers: { contentType: page.headers["content-type"] || "", encoding: page.headers["content-encoding"] || "", xRobots: (page.headers["x-robots-tag"] || "").toLowerCase(), hsts: !!page.headers["strict-transport-security"], cacheControl: page.headers["cache-control"] || "" },
    httpUpgrades: final.protocol !== "https:" ? false : http ? http.url.startsWith("https://") : null,
    twin: twin ? { host: twinHost, reachable: twin.status < 500, sameSite: new URL(twin.url).hostname === final.hostname } : final.hostname.split(".").length <= 3 ? { host: twinHost, reachable: false, sameSite: false } : null,
    page: isHtml ? readPage(page.body, page.url) : readPage("<html><head></head><body></body></html>", page.url),
    robots: { exists: robotsOk, status: robots?.status ?? 0, sitemaps, googlebotAllowed: robotsOk ? robotsAllows(robotsBody, "googlebot", path) : true, blockedAi: robotsOk ? AI_BOTS.filter((b) => !robotsAllows(robotsBody, b, path)) : [], mentionsAi },
    sitemap: { url: sitemapUrl, exists: !!sm?.ok, urls: (smBody.match(/<loc>/gi) || []).length, isIndex: /<sitemapindex[\s>]/i.test(smBody), valid: smValid },
    llms: !!llms && llms.ok && !/<html|<!doctype/i.test(llms.body.slice(0, 300)) && llms.body.trim().length > 20,
  };
}
