import { parse, type HTMLElement } from "node-html-parser";
import { AuditError, safeFetch, type Fetched } from "@/lib/audit/safe-fetch";

/*
 * What the audit reads from a site (docs/sections/p6-seo-audit.md): the page
 * itself, how http and the www / non-www twin behave, robots.txt, the
 * sitemap and llms.txt. Only facts are collected here; judging them is
 * checks.ts.
 */

/** Crawlers that fetch pages to answer or cite them live (AI search). Bing's index also feeds ChatGPT search and Copilot. */
export const SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "bingbot"] as const;
/** Crawlers that collect pages to train models. Blocking them is a legitimate choice; it does not stop AI search. */
export const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"] as const;
export const AI_BOTS = [...SEARCH_BOTS.filter((b) => b !== "bingbot"), ...TRAINING_BOTS] as const;

/** Answer engine signals (AEO): what an answer box, AI Overview or voice assistant can lift from the page. */
export type Aeo = {
  /** headings (and summary / dt elements) phrased as questions */
  questions: number;
  /** of those, how many are followed by an answer of 15 to 120 words */
  answered: number;
  /** question-answer pairs in FAQPage / QAPage structured data */
  faqPairs: number;
  examples: string[];
  lists: number;
  tables: number;
  sentences: number;
  avgSentence: number;
  nosnippet: boolean;
  maxSnippetZero: boolean;
  dataNosnippet: number;
  breadcrumbs: boolean;
};
/** Generative engine signals (GEO): whether AI assistants can read, trust and cite the page. */
export type Geo = {
  hasMain: boolean;
  sections: number;
  author: boolean;
  aboutLink: boolean;
  /** newest date the page states about itself (ISO), "" if none */
  newestDate: string;
  /** sentences in the main text that contain a figure */
  figures: number;
  /** links in the main text to other sites (sources) */
  citations: number;
  org: { found: boolean; logo: boolean; contact: boolean; address: boolean; sameAs: number };
};

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
  /** may the page be shown inside a frame on another site? (X-Frame-Options and CSP frame-ancestors) */
  frameable: boolean;
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
    aeo: Aeo;
    geo: Geo;
  };
  robots: { exists: boolean; status: number; sitemaps: string[]; googlebotAllowed: boolean; blockedSearch: string[]; blockedTraining: string[]; mentionsAi: boolean };
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
  const ld = { faqPairs: 0, breadcrumbs: false, author: false, dates: [] as string[], org: { found: false, logo: false, contact: false, address: false, sameAs: 0 } };
  const ORG = /Organization|LocalBusiness|Corporation|Store|Restaurant|ProfessionalService|MedicalBusiness|Hotel|LodgingBusiness|Dentist|Physician|Attorney|AutoDealer|RealEstateAgent|EducationalOrganization|NGO/i;
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;
    const t = o["@type"];
    const ts = (Array.isArray(t) ? t : [t]).filter((x): x is string => typeof x === "string");
    ts.forEach((x) => types.add(x));
    if (ts.includes("Question") && o.acceptedAnswer) ld.faqPairs++;
    if (ts.includes("BreadcrumbList")) ld.breadcrumbs = true;
    if (o.author) ld.author = true;
    for (const k of ["dateModified", "datePublished", "uploadDate"]) if (typeof o[k] === "string") ld.dates.push(o[k] as string);
    if (ts.some((x) => ORG.test(x))) {
      ld.org.found = true;
      if (o.logo || o.image) ld.org.logo = true;
      if (o.telephone || o.email || o.contactPoint) ld.org.contact = true;
      if (o.address || o.areaServed) ld.org.address = true;
      const same = o.sameAs;
      ld.org.sameAs = Math.max(ld.org.sameAs, Array.isArray(same) ? same.length : typeof same === "string" ? 1 : 0);
    }
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

  // ---------- AEO and GEO: read from the main content, without menus, header, footer and asides
  const CHROME = "nav,header,footer,aside,[role=navigation],[role=banner],[role=contentinfo]";
  const inChrome = (el: HTMLElement) => !!el.closest(CHROME);
  const scope = root.querySelector("main") || root.querySelector("body") || root;
  const count = (t: string) => t.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  // A question: ends with "?", or reads as one without the mark ("How to fix a slow site", "What is local SEO").
  // "What you can count on" is not a question: a question word must be followed by a verb or "to".
  const QWORD = /^(what|how|why|when|where|who|which)\s+(is|are|was|were|do|does|did|can|could|should|will|would|to|much|many|long|often|makes|happens)\b/i;
  const AUX = /^(can|could|does|do|did|is|are|should|will|would)\s+(i|you|we|it|my|your|the|a|an|this|they|there)\b/i;
  const isQuestion = (t: string) => t.length >= 6 && t.length <= 200 && (/\?\s*$/.test(t) || QWORD.test(t) || AUX.test(t));
  /** text of what follows a heading: its next siblings (climbing up to three levels) until the next heading */
  const after = (el: HTMLElement) => {
    let node: HTMLElement | null = el;
    for (let up = 0; up < 3 && node; up++) {
      let sib = node.nextElementSibling;
      const parts: string[] = [];
      while (sib && parts.join(" ").length < 1500) {
        if (/^H[1-6]$/.test(sib.tagName) || sib.querySelector("h1,h2,h3,h4")) break;
        parts.push(txt(sib.textContent));
        sib = sib.nextElementSibling;
      }
      if (parts.join("").length) return parts.join(" ");
      node = node.parentNode as HTMLElement | null;
      if (!node || node === scope) break;
    }
    return "";
  };
  let questions = 0;
  let answered = 0;
  const examples: string[] = [];
  for (const el of scope.querySelectorAll("h2,h3,h4,summary,dt")) {
    if (inChrome(el)) continue;
    const q = txt(el.textContent);
    if (!isQuestion(q)) continue;
    questions++;
    if (examples.length < 3) examples.push(q.slice(0, 90));
    const a = el.tagName === "SUMMARY" ? txt((el.parentNode as HTMLElement)?.textContent).slice(q.length) : el.tagName === "DT" ? txt(el.nextElementSibling?.textContent) : after(el);
    const n = count(txt(a));
    if (n >= 15 && n <= 120) answered++;
  }
  // a content list: at least three items of two or more words, and not a menu (items that are only a link)
  const lists = scope.querySelectorAll("ul,ol").filter((l) => {
    if (inChrome(l)) return false;
    const items = l.childNodes.filter((n): n is HTMLElement => (n as HTMLElement).tagName === "LI");
    const real = items.filter((li) => count(txt(li.textContent)) >= 2 && txt(li.textContent) !== txt(li.querySelector("a")?.textContent));
    return real.length >= 3;
  }).length;
  const tables = scope.querySelectorAll("table").filter((t) => !inChrome(t) && t.querySelectorAll("tr").length >= 2).length;
  const blocks = scope.querySelectorAll("p,li,td,dd,blockquote").filter((b) => !inChrome(b) && !b.querySelector("p,li")).map((b) => txt(b.textContent)).filter(Boolean);
  const sentences = blocks.join(" ").split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).map((x) => x.trim()).filter((x) => count(x) >= 4);
  const avgSentence = sentences.length ? Math.round(sentences.reduce((n, x) => n + count(x), 0) / sentences.length) : 0;
  const figures = sentences.filter((x) => /\d/.test(x.replace(/\b(19|20)\d{2}\b/g, ""))).length;
  const host = origin.hostname.replace(/^www\./, "");
  const SOCIAL = /(facebook|instagram|twitter|x\.com|linkedin|youtube|wa\.me|whatsapp|t\.me|pinterest|threads)/i;
  const citations = scope.querySelectorAll("a[href]").filter((a) => {
    if (inChrome(a)) return false;
    const to = absolute(a.getAttribute("href") || "", finalUrl);
    if (!/^https?:/.test(to)) return false;
    const h = new URL(to).hostname;
    return h !== host && !h.endsWith(`.${host}`) && !SOCIAL.test(h);
  }).length;
  const robotsMeta = [meta(head, 'meta[name="robots" i]'), meta(head, 'meta[name="googlebot" i]')].join(",").toLowerCase();
  const pageDates = [...ld.dates, meta(head, 'meta[property="article:modified_time"]'), meta(head, 'meta[property="article:published_time"]'), meta(head, 'meta[property="og:updated_time"]'), ...root.querySelectorAll("time[datetime]").map((t) => t.getAttribute("datetime") || "")]
    .map((d) => Date.parse(d))
    .filter((d) => Number.isFinite(d) && d <= Date.now() + 86_400_000 && d > Date.parse("2000-01-01"));
  const author = ld.author || !!meta(head, 'meta[name="author" i]') || !!root.querySelector('[rel~="author"],[itemprop="author"],.author,.byline');
  const aboutLink = root.querySelectorAll("a[href]").some((a) => /\/(about|about-us|team|who-we-are)(\/|$|\.)/i.test(absolute(a.getAttribute("href") || "", finalUrl).replace(/^https?:\/\/[^/]+/, "")));
  const aeo: Aeo = { questions, answered, faqPairs: ld.faqPairs, examples, lists, tables, sentences: sentences.length, avgSentence, nosnippet: /(^|[\s,])nosnippet/.test(robotsMeta), maxSnippetZero: /max-snippet\s*:\s*0\b/.test(robotsMeta), dataNosnippet: root.querySelectorAll("[data-nosnippet]").length, breadcrumbs: ld.breadcrumbs };
  const geo: Geo = { hasMain: !!root.querySelector("main,[role=main]"), sections: root.querySelectorAll("article,section").length, author, aboutLink, newestDate: pageDates.length ? new Date(Math.max(...pageDates)).toISOString() : "", figures, citations, org: ld.org };

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
    aeo,
    geo,
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
    frameable: final.protocol === "https:" && page.status >= 200 && page.status < 300 && isHtml && !page.headers["x-frame-options"] && !/frame-ancestors/i.test(page.headers["content-security-policy"] || "") && !/http-equiv=["']?content-security-policy["']?[^>]*frame-ancestors/i.test(page.body.slice(0, 20_000)),
    httpUpgrades: final.protocol !== "https:" ? false : http ? http.url.startsWith("https://") : null,
    twin: twin ? { host: twinHost, reachable: twin.status < 500, sameSite: new URL(twin.url).hostname === final.hostname } : final.hostname.split(".").length <= 3 ? { host: twinHost, reachable: false, sameSite: false } : null,
    page: isHtml ? readPage(page.body, page.url) : readPage("<html><head></head><body></body></html>", page.url),
    robots: { exists: robotsOk, status: robots?.status ?? 0, sitemaps, googlebotAllowed: robotsOk ? robotsAllows(robotsBody, "googlebot", path) : true, blockedSearch: robotsOk ? SEARCH_BOTS.filter((b) => !robotsAllows(robotsBody, b, path)) : [], blockedTraining: robotsOk ? TRAINING_BOTS.filter((b) => !robotsAllows(robotsBody, b, path)) : [], mentionsAi },
    sitemap: { url: sitemapUrl, exists: !!sm?.ok, urls: (smBody.match(/<loc>/gi) || []).length, isIndex: /<sitemapindex[\s>]/i.test(smBody), valid: smValid },
    llms: !!llms && llms.ok && !/<html|<!doctype/i.test(llms.body.slice(0, 300)) && llms.body.trim().length > 20,
  };
}
