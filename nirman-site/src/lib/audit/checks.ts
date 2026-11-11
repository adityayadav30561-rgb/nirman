import type { Crawl } from "@/lib/audit/crawl";
import { CATS, type CatKey, type CatScore, type Check, type PageFacts, type Report, type Signal, type SpeedData, type Status, type Summary } from "@/lib/audit/types";

/*
 * Judging what the crawl found (docs/sections/p6-seo-audit.md). Every check
 * says what was seen on the site (`found`), why it matters (`why`) and, when
 * it is not a pass, what to do (`fix`). Thresholds follow Google's published
 * guidance: Core Web Vitals (LCP 2.5 s / 4 s, CLS 0.1 / 0.25, INP 200 / 500
 * ms), Lighthouse score bands (90 / 50), and how Search shows titles and
 * descriptions. Weights say how much a check counts inside its category.
 * No check invents anything: if something could not be measured it is
 * marked "info" and left out of the score.
 */

const s = (ms: number) => `${(ms / 1000).toFixed(1)} s`;
const kb = (b: number) => (b >= 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
const band = (v: number, good: number, ok: number): Status => (v <= good ? "pass" : v <= ok ? "warn" : "fail");
const scoreBand = (v: number): Status => (v >= 90 ? "pass" : v >= 50 ? "warn" : "fail");
const quote = (t: string, n = 90) => `"${t.length > n ? `${t.slice(0, n)}…` : t}"`;

export function runChecks(c: Crawl, sp: SpeedData): Check[] {
  const out: Check[] = [];
  const add = (cat: CatKey, id: string, weight: number, title: string, status: Status, found: string, why: string, fix?: string) => out.push({ id, cat, title, status, weight, found, why, fix: status === "pass" ? undefined : fix });
  const p = c.page;
  const final = new URL(c.finalUrl);
  const https = final.protocol === "https:";
  const ok = c.status >= 200 && c.status < 300;

  // ---------- Crawling and indexing
  add("index", "status", 10, "The page loads", ok ? "pass" : "fail", `The server answered ${c.status}.`, "Search engines only list pages that answer with a normal 200 status.", "Find out why the server answers with an error and fix it; until then the page cannot rank.");
  add("index", "https", 8, "Secure address (HTTPS)", https ? "pass" : "fail", https ? "The site is served over HTTPS." : "The site is served over plain HTTP.", "Browsers mark HTTP sites as not secure and Google prefers HTTPS pages.", "Install an SSL certificate (free with most hosts) and serve every page over https://.");
  if (https)
    add("index", "http-redirect", 5, "HTTP redirects to HTTPS", c.httpUpgrades === null ? "info" : c.httpUpgrades ? "pass" : "fail", c.httpUpgrades === null ? "We could not test the http:// address." : c.httpUpgrades ? "The http:// address redirects to https://." : "The http:// address does not redirect to https://.", "Without the redirect the site exists twice and old links land on the insecure copy.", "Add a permanent (301) redirect from http:// to https:// on the server or at the host.");
  if (c.twin)
    add("index", "www", 4, "One address for www and non-www", !c.twin.reachable ? "warn" : c.twin.sameSite ? "pass" : "warn", !c.twin.reachable ? `${c.twin.host} does not answer.` : c.twin.sameSite ? `${c.twin.host} redirects to ${final.hostname}.` : `${c.twin.host} and ${final.hostname} both serve the site separately.`, "People type both forms. If one is dead they see an error; if both work without a redirect, Google sees two copies.", `Point ${c.twin.host} at the site and redirect it (301) to ${final.hostname}.`);
  const hops = c.chain.length;
  add("index", "redirects", 3, "Short redirect chain", hops <= 1 ? "pass" : hops === 2 ? "warn" : "fail", hops === 0 ? "The address loads without a redirect." : `${hops} redirect${hops > 1 ? "s" : ""} before the page: ${[...c.chain.map((h) => new URL(h.url).host + new URL(h.url).pathname), final.host + final.pathname].join(" → ").slice(0, 220)}.`, "Each extra redirect slows the first visit and wastes crawl time.", "Redirect straight to the final address in one step.");
  const noindex = /noindex/.test(p.robots) || /noindex/.test(c.headers.xRobots);
  add("index", "indexable", 10, "The page may be indexed", noindex ? "fail" : "pass", noindex ? `The page tells search engines not to list it (${/noindex/.test(p.robots) ? `robots meta tag: ${p.robots}` : `X-Robots-Tag header: ${c.headers.xRobots}`}).` : "No noindex instruction in the page or its headers.", "A noindex instruction removes the page from Google completely.", "Remove noindex from the robots meta tag or the X-Robots-Tag header, unless hiding this page is intended.");
  add("index", "robots", 6, "robots.txt allows Google", !c.robots.exists ? "warn" : c.robots.googlebotAllowed ? "pass" : "fail", !c.robots.exists ? `No robots.txt was found (the server answered ${c.robots.status || "nothing"}).` : c.robots.googlebotAllowed ? "robots.txt exists and lets Googlebot read this page." : "robots.txt blocks Googlebot from this page.", "robots.txt tells crawlers where they may go; a wrong line can hide the whole site.", !c.robots.exists ? "Add a robots.txt at the root of the site that allows crawling and names your sitemap." : "Remove or narrow the Disallow rule that matches this page.");
  add("index", "sitemap", 6, "XML sitemap", c.sitemap.exists && c.sitemap.valid ? (c.robots.sitemaps.length ? "pass" : "warn") : "fail", c.sitemap.exists && c.sitemap.valid ? `A sitemap was found at ${c.sitemap.url} (${c.sitemap.isIndex ? "an index of sitemaps" : `${c.sitemap.urls} addresses`})${c.robots.sitemaps.length ? " and robots.txt points to it." : ", but robots.txt does not mention it."}` : c.sitemap.exists ? `${c.sitemap.url} answers, but it is not a valid XML sitemap.` : `No sitemap was found at ${c.sitemap.url}.`, "A sitemap is how search engines find every page quickly, especially new ones.", c.sitemap.exists && c.sitemap.valid ? "Add a line to robots.txt: Sitemap: followed by the sitemap's full address." : "Create an XML sitemap listing every public page, put it at /sitemap.xml, name it in robots.txt and submit it in Google Search Console.");
  let canonStatus: Status = "pass";
  let canonFound = `The canonical address is ${p.canonical}.`;
  if (!p.canonical) {
    canonStatus = "warn";
    canonFound = "The page has no canonical tag.";
  } else {
    try {
      const can = new URL(p.canonical, c.finalUrl);
      const same = can.hostname === final.hostname && can.pathname.replace(/\/$/, "") === final.pathname.replace(/\/$/, "");
      if (can.hostname.replace(/^www\./, "") !== final.hostname.replace(/^www\./, "")) {
        canonStatus = "fail";
        canonFound = `The canonical tag points to another site: ${can.href}.`;
      } else if (!same) {
        canonStatus = "warn";
        canonFound = `The canonical tag points to a different address: ${can.href}.`;
      } else if (!/^https?:\/\//i.test(p.canonical)) {
        canonStatus = "warn";
        canonFound = `The canonical tag is a relative address (${p.canonical}).`;
      }
    } catch {
      canonStatus = "warn";
      canonFound = `The canonical tag is not a valid address (${p.canonical.slice(0, 80)}).`;
    }
  }
  add("index", "canonical", 6, "Canonical address", canonStatus, canonFound, "The canonical tag tells Google which address is the real one when a page can be reached several ways.", "Add a canonical link tag with the page's own full https:// address.");
  const rawText = p.words;
  add("index", "rendered", 7, "Content is in the HTML", rawText >= 150 ? "pass" : rawText >= 40 ? "warn" : "fail", `${rawText} words of text are in the HTML the server sends, before any JavaScript runs.`, "Google can run JavaScript but does it later and less reliably; most other crawlers, including AI assistants, do not run it at all.", "Render the main content on the server (or pre-render it) so the text is in the first HTML response.");

  // ---------- On-page content
  const tl = p.title.length;
  add("content", "title", 10, "Page title", !tl ? "fail" : tl < 25 || tl > 65 ? "warn" : "pass", !tl ? "The page has no title tag." : `${quote(p.title)} (${tl} characters).`, "The title is the blue link in search results and the strongest on-page signal of what the page is about.", !tl ? "Add a title of about 50 to 60 characters that names what you offer and where." : tl < 25 ? "The title is short: use about 50 to 60 characters to say what you offer and for whom." : "The title is long and will be cut off in results: keep the important words in the first 60 characters.");
  const dl = p.description.length;
  add("content", "description", 7, "Meta description", !dl ? "fail" : dl < 70 || dl > 165 ? "warn" : "pass", !dl ? "The page has no meta description." : `${quote(p.description, 120)} (${dl} characters).`, "The description is the text under the title in search results; a clear one earns more clicks.", !dl ? "Add a description of 120 to 160 characters that says what the visitor gets and invites the click." : dl < 70 ? "The description is short: use 120 to 160 characters." : "The description is long and will be cut off: keep it under 160 characters.");
  add("content", "h1", 8, "One main heading (H1)", p.h1.length === 1 ? "pass" : p.h1.length === 0 ? "fail" : "warn", p.h1.length === 0 ? "The page has no H1 heading." : p.h1.length === 1 ? `One H1: ${quote(p.h1[0])}.` : `${p.h1.length} H1 headings: ${p.h1.slice(0, 3).map((h) => quote(h, 40)).join(", ")}.`, "The H1 tells visitors and search engines the page's main topic. One clear H1 is the convention every tool expects.", p.h1.length === 0 ? "Add one H1 that says what the page offers, using the words people search for." : "Keep one H1 for the main topic and turn the others into H2 headings.");
  const levels = p.headings.map((h) => h.level);
  const skipped = levels.some((l, i) => i > 0 && l - levels[i - 1] > 1);
  const h2 = levels.filter((l) => l === 2).length;
  add("content", "headings", 4, "Heading structure", h2 === 0 ? "warn" : skipped ? "warn" : "pass", `${p.headings.length} headings (${h2} at H2 level)${skipped ? "; some levels are skipped (for example an H4 straight after an H2)" : ""}.`, "Headings in order let readers, screen readers and search engines follow the page like an outline.", h2 === 0 ? "Break the page into sections with H2 headings that describe each part." : "Use heading levels in order: H2 for sections, H3 inside them, without skipping.");
  add("content", "words", 6, "Enough text to rank", p.words >= 300 ? "pass" : p.words >= 120 ? "warn" : "fail", `About ${p.words} words of visible text.`, "A page needs enough words to show what it is about and to answer a search; very thin pages rarely rank.", "Add useful text: what you offer, for whom, where, and answers to the questions customers ask.");
  if (p.images.total > 0) {
    const pct = Math.round(((p.images.total - p.images.missingAlt) / p.images.total) * 100);
    add("content", "alt", 6, "Image descriptions (alt text)", pct >= 90 ? "pass" : pct >= 60 ? "warn" : "fail", `${p.images.total - p.images.missingAlt} of ${p.images.total} images have an alt attribute${p.images.missingAlt ? ` (missing, for example: ${p.images.examples.join(", ")})` : ""}.`, "Alt text is how search engines and blind visitors know what a picture shows; it also feeds image search.", "Give every meaningful image a short alt description; give purely decorative ones an empty alt.");
  } else add("content", "alt", 0, "Image descriptions (alt text)", "info", "No images were found in the HTML.", "Alt text is how search engines and blind visitors know what a picture shows.");
  add("content", "lang", 3, "Page language declared", p.lang ? "pass" : "warn", p.lang ? `The page declares its language as "${p.lang}".` : "The html tag has no lang attribute.", "The language tells browsers, translators and screen readers how to treat the text.", 'Add a lang attribute to the html tag, for example lang="en".');
  add("content", "links", 5, "Internal links", p.links.internal >= 5 ? (p.links.noText > 2 ? "warn" : "pass") : p.links.internal >= 1 ? "warn" : "fail", `${p.links.internal} links to other pages of the site, ${p.links.external} to other sites${p.links.noText ? `; ${p.links.noText} links have no text` : ""}.`, "Internal links are how visitors and crawlers move through the site, and their text tells Google what the target page is about.", p.links.internal < 5 ? "Link from this page to your main service and contact pages with descriptive link text." : "Give every link readable text (or an aria-label on icon links).");

  // ---------- Speed and Core Web Vitals
  if (sp.available) {
    add("speed", "performance", 12, "Google Lighthouse performance score", scoreBand(sp.performance ?? 0), `${sp.performance} out of 100 on a simulated mid-range phone${sp.lighthouseVersion ? ` (Lighthouse ${sp.lighthouseVersion})` : ""}.`, "This is Google's own lab measure of loading speed. Slow pages lose visitors before they see anything.", "Start with the largest items below (main picture, scripts), then re-test.");
    if (sp.lcpMs !== undefined) add("speed", "lcp", 9, "Largest Contentful Paint (LCP)", band(sp.lcpMs, 2500, 4000), `${s(sp.lcpMs)} until the main content appears (good: up to 2.5 s).`, "LCP is the Core Web Vital for loading: how long until the visitor sees the main part of the page.", "Compress and correctly size the main image, preload it, and remove render-blocking scripts and styles.");
    if (sp.cls !== undefined) add("speed", "cls", 6, "Cumulative Layout Shift (CLS)", band(sp.cls, 0.1, 0.25), `${sp.cls.toFixed(2)} (good: up to 0.10).`, "CLS is the Core Web Vital for stability: content that jumps while loading makes people tap the wrong thing.", "Give images, embeds and ads fixed dimensions and avoid inserting content above what is already shown.");
    if (sp.tbtMs !== undefined) add("speed", "tbt", 6, "Total Blocking Time (TBT)", band(sp.tbtMs, 200, 600), `${Math.round(sp.tbtMs)} ms during which the page could not respond (good: up to 200 ms).`, "TBT is the lab stand-in for responsiveness (INP): long JavaScript tasks make taps feel dead.", "Remove unused JavaScript, defer third-party scripts and split long tasks.");
    if (sp.field?.overall) {
      const o = sp.field.overall;
      const bits = [sp.field.lcpMs !== undefined ? `LCP ${s(sp.field.lcpMs)}` : "", sp.field.inpMs !== undefined ? `INP ${sp.field.inpMs} ms` : "", sp.field.cls !== undefined ? `CLS ${sp.field.cls.toFixed(2)}` : ""].filter(Boolean).join(", ");
      add("speed", "field", 10, "Core Web Vitals for real visitors", o === "FAST" ? "pass" : o === "AVERAGE" ? "warn" : "fail", `Google's 28-day data from real Chrome visitors rates the page ${o === "FAST" ? "good" : o === "AVERAGE" ? "as needing improvement" : "poor"} (${bits}).`, "This is what your actual visitors experienced, and it is the data Google uses as a ranking signal.", "Fix the lab items in this section; real-visitor data follows over the next 28 days.");
    } else add("speed", "field", 0, "Core Web Vitals for real visitors", "info", "Google does not have enough real-visitor data for this page yet (common for newer or low-traffic sites).", "Real-visitor Core Web Vitals are a Google ranking signal once enough data exists.");
    if (sp.bytes !== undefined) add("speed", "weight", 4, "Page weight", band(sp.bytes, 1_600_000, 3_500_000), `${kb(sp.bytes)} downloaded${sp.requests ? ` in ${sp.requests} requests` : ""}.`, "Heavy pages are slow and costly on mobile data, which most visitors in India use.", "Convert images to WebP or AVIF at the size they are shown, and remove unused scripts, fonts and plugins.");
  } else add("speed", "performance", 0, "Google Lighthouse performance score", "info", "The speed test could not be run this time, so this section is based on two server checks only.", "Lighthouse is Google's own lab measure of loading speed.");
  const enc = c.headers.encoding.toLowerCase();
  add("speed", "compression", 4, "Text compression", /br|gzip|zstd|deflate/.test(enc) ? "pass" : "fail", enc ? `The HTML is sent compressed (${enc}).` : "The HTML is sent uncompressed.", "Compression shrinks HTML, CSS and JavaScript by 60 to 80 percent for free.", "Turn on Brotli or gzip compression on the server or at the host.");
  add("speed", "response", 5, "Server response time", band(c.ms, 800, 1800), `The server delivered the page in ${s(c.ms)} to our test server, including redirects.`, "Everything else waits for the server; Google recommends a first response under 0.8 s.", "Use caching or a CDN, and check slow database queries or an overloaded hosting plan.");

  // ---------- Mobile and experience
  const vp = /width\s*=\s*device-width/i.test(p.viewport);
  add("mobile", "viewport", 8, "Mobile viewport", vp ? "pass" : "fail", vp ? "The page sets a mobile viewport." : p.viewport ? `The viewport tag is "${p.viewport}", which does not adapt to the phone's width.` : "The page has no viewport tag, so phones show a shrunken desktop layout.", "Google indexes the mobile version of a site. Without a proper viewport the page is not mobile friendly.", 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and make the layout responsive.');
  if (sp.available && sp.accessibility !== undefined) add("mobile", "a11y", 6, "Accessibility (Lighthouse)", sp.accessibility >= 90 ? "pass" : sp.accessibility >= 70 ? "warn" : "fail", `${sp.accessibility} out of 100.`, "Contrast, labels and tap sizes decide whether everyone can use the site, and they overlap heavily with what search engines can understand.", "Fix colour contrast, add labels to form fields and buttons, and make tap targets at least 44 pixels.");
  if (sp.available && sp.bestPractices !== undefined) add("mobile", "best", 4, "Best practices (Lighthouse)", sp.bestPractices >= 90 ? "pass" : sp.bestPractices >= 70 ? "warn" : "fail", `${sp.bestPractices} out of 100.`, "Covers browser errors, outdated libraries and unsafe patterns that erode trust in the site.", "Open the page in Chrome's Lighthouse panel and fix the listed errors, starting with console errors.");
  if (https) add("mobile", "mixed", 5, "No insecure resources", p.mixed.length ? "fail" : "pass", p.mixed.length ? `The secure page loads items over plain http://, for example ${p.mixed[0]}.` : "Everything referenced in the HTML loads over https://.", "Browsers block or warn about insecure items on a secure page, which can break images and scripts.", "Change those addresses to https:// or host the files yourself.");
  add("mobile", "favicon", 3, "Site icon (favicon)", p.favicon ? "pass" : "warn", p.favicon ? "The page declares a site icon." : "No icon is declared in the page.", "The icon appears in browser tabs and next to your result in Google on phones.", "Add a square icon (at least 48 by 48 pixels) with a link rel=\"icon\" tag.");
  add("mobile", "charset", 2, "Character encoding declared", p.charset || /charset=/i.test(c.headers.contentType) ? "pass" : "warn", p.charset || /charset=/i.test(c.headers.contentType) ? "The character encoding is declared." : "No character encoding is declared.", "Without it, browsers may show broken characters, especially in Hindi and other non-English text.", 'Add <meta charset="utf-8"> at the top of the head.');
  if (sp.available && sp.lighthouseSeoFails?.length) add("mobile", "lh-seo", 5, "Lighthouse SEO checks", "warn", `Google Lighthouse flagged: ${sp.lighthouseSeoFails.join("; ")}.`, "These are Google's own basic SEO checks on the rendered page.", "Fix each flagged item; they are usually small template changes.");

  // ---------- Structured data and sharing
  const ld = p.jsonLd;
  add("rich", "jsonld", 8, "Structured data (JSON-LD)", ld.invalid ? "fail" : ld.blocks ? "pass" : "warn", ld.invalid ? `${ld.invalid} of ${ld.blocks} structured data blocks contain invalid JSON and are ignored by Google.` : ld.blocks ? `${ld.blocks} block${ld.blocks > 1 ? "s" : ""} found, describing: ${ld.types.slice(0, 8).join(", ") || "no named types"}.` : "No structured data was found.", "Structured data tells search engines in their own vocabulary who you are and what the page offers; it unlocks rich results.", ld.invalid ? "Fix the JSON syntax (test it with Google's Rich Results Test)." : "Add JSON-LD describing your organisation and, where it fits, services, products, FAQs and breadcrumbs.");
  const org = ld.types.some((t) => /Organization|LocalBusiness|Corporation|Store|Restaurant|ProfessionalService|MedicalBusiness|Person/i.test(t));
  add("rich", "org", 5, "Business identity in structured data", org ? "pass" : "warn", org ? `The page identifies the business (${ld.types.filter((t) => /Organization|LocalBusiness|Corporation|Store|Restaurant|ProfessionalService|MedicalBusiness|Person/i.test(t)).slice(0, 3).join(", ")}).` : "No Organization or LocalBusiness data was found.", "This is how Google connects the site to your business name, logo, contact details and, for local firms, your map listing.", "Add Organization (or LocalBusiness) JSON-LD with name, logo, address, phone and links to your profiles.");
  const ogOk = !!p.og.title && !!p.og.description;
  add("rich", "og", 6, "Link preview text (Open Graph)", ogOk ? "pass" : "warn", ogOk ? "Open Graph title and description are set." : `Missing: ${[!p.og.title && "og:title", !p.og.description && "og:description"].filter(Boolean).join(" and ")}.`, "These control how the page looks when shared on WhatsApp, LinkedIn and other apps.", "Add og:title and og:description meta tags to every page.");
  add("rich", "og-image", 6, "Link preview picture", p.og.image ? "pass" : "warn", p.og.image ? "A preview picture (og:image) is set." : "No preview picture (og:image) is set.", "A shared link with a picture gets far more attention than a bare address.", "Add an og:image of 1200 by 630 pixels.");
  add("rich", "twitter", 2, "Large preview card", p.twitterCard ? "pass" : "warn", p.twitterCard ? `twitter:card is "${p.twitterCard}".` : "No twitter:card tag.", "Some apps use this tag to decide between a small and a large preview.", 'Add <meta name="twitter:card" content="summary_large_image">.');

  // ---------- AI search readiness
  add("ai", "ai-bots", 8, "AI assistants may read the site", c.robots.blockedAi.length ? "warn" : "pass", c.robots.blockedAi.length ? `robots.txt blocks: ${c.robots.blockedAi.join(", ")}.` : c.robots.mentionsAi ? "robots.txt names AI crawlers and allows them." : "robots.txt does not block any of the main AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).", "ChatGPT, Claude, Perplexity and Google's AI answers can only recommend a business whose pages they are allowed to read.", "If the block is not deliberate, remove those Disallow rules so AI assistants can read and cite the site.");
  add("ai", "ai-html", 8, "Readable without JavaScript", rawText >= 150 ? "pass" : rawText >= 40 ? "warn" : "fail", `${rawText} words are available to crawlers that do not run JavaScript.`, "AI crawlers fetch the raw HTML and do not run scripts; text that only appears after JavaScript is invisible to them.", "Server-render or pre-render the page so its text is in the HTML.");
  add("ai", "llms", 3, "llms.txt guide", c.llms ? "pass" : "warn", c.llms ? "An llms.txt file is present." : "No llms.txt file was found.", "llms.txt is a new, optional convention: a plain-text summary of the site for AI assistants. It is cheap to add and not yet a ranking factor.", "Add /llms.txt with a short description of the business and links to the main pages.");
  const faq = ld.types.some((t) => /FAQPage|QAPage|HowTo/i.test(t));
  const qHeads = p.headings.filter((h) => /\?\s*$/.test(h.text)).length;
  add("ai", "answers", 5, "Question-and-answer content", faq || qHeads >= 2 ? "pass" : "warn", faq ? "The page has FAQ structured data." : qHeads >= 2 ? `${qHeads} headings are phrased as questions.` : "No FAQ data and no headings phrased as questions were found.", "AI answers and Google's question boxes quote pages that state a question and answer it directly.", "Add a short questions section answering what customers ask, with each question as a heading and FAQ structured data.");
  add("ai", "entity", 4, "Clear business description", org && dl >= 70 ? "pass" : "warn", org && dl >= 70 ? "The page has both a description and business structured data for assistants to quote." : `Missing: ${[!org && "business structured data", dl < 70 && "a full meta description"].filter(Boolean).join(" and ")}.`, "Assistants summarise a business from its description and structured data; without them they guess or skip it.", "Add a clear meta description and Organization structured data.");

  return out;
}

const VALUE: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0, info: 0 };

/** `speedMeasured` false: the speed category gets no score (two server checks alone would flatter it) and is left out of the overall score. */
export function scoreCats(checks: Check[], speedMeasured = true): { cats: CatScore[]; overall: number } {
  const cats = CATS.map((c) => {
    const mine = checks.filter((k) => k.cat === c.key);
    const scored = c.key === "speed" && !speedMeasured ? [] : mine.filter((k) => k.status !== "info" && k.weight > 0);
    const total = scored.reduce((n, k) => n + k.weight, 0);
    return { key: c.key, label: c.label, score: total ? Math.round((scored.reduce((n, k) => n + k.weight * VALUE[k.status], 0) / total) * 100) : null, pass: mine.filter((k) => k.status === "pass").length, warn: mine.filter((k) => k.status === "warn").length, fail: mine.filter((k) => k.status === "fail").length };
  });
  const usable = cats.filter((c) => c.score !== null);
  const weight = usable.reduce((n, c) => n + CATS.find((x) => x.key === c.key)!.weight, 0);
  const overall = weight ? Math.round(usable.reduce((n, c) => n + (c.score as number) * CATS.find((x) => x.key === c.key)!.weight, 0) / weight) : 0;
  return { cats, overall };
}

export function factsOf(c: Crawl): PageFacts {
  return { host: c.host, finalUrl: c.finalUrl, title: c.page.title, description: c.page.description, h1: c.page.h1[0] || "", favicon: c.page.favicon, ogImage: c.page.og.image, themeColor: /^#[0-9a-f]{3,8}$/i.test(c.page.themeColor) ? c.page.themeColor : "" };
}

/** Raw observations for the scanning animation, in the order the areas are checked. No verdicts. */
export function signalsOf(c: Crawl): Signal[] {
  const p = c.page;
  const short = (t: string, n = 44) => (t.length > n ? `${t.slice(0, n)}…` : t);
  const out: Signal[] = [
    { id: "status", cat: "index", label: "Server", value: `${c.status} in ${s(c.ms)}`, zone: "bar" },
    { id: "https", cat: "index", label: "Connection", value: c.finalUrl.startsWith("https://") ? "HTTPS, secure" : "HTTP, not secure", zone: "bar" },
    { id: "redirects", cat: "index", label: "Redirects", value: c.chain.length ? `${c.chain.length} before the page` : "none", zone: "bar" },
    { id: "robots", cat: "index", label: "robots.txt", value: c.robots.exists ? "found" : "not found" },
    { id: "sitemap", cat: "index", label: "Sitemap", value: c.sitemap.exists && c.sitemap.valid ? (c.sitemap.isIndex ? "index of sitemaps" : `${c.sitemap.urls} addresses`) : "not found" },
    { id: "canonical", cat: "index", label: "Canonical", value: p.canonical ? short(p.canonical.replace(/^https?:\/\//, ""), 36) : "not set", zone: "page" },
    { id: "title", cat: "content", label: "Title", value: p.title ? `${p.title.length} characters` : "missing", zone: "bar" },
    { id: "description", cat: "content", label: "Description", value: p.description ? `${p.description.length} characters` : "missing", zone: "text" },
    { id: "h1", cat: "content", label: "Main heading", value: p.h1.length ? short(p.h1[0], 34) : "none found", zone: "heading" },
    { id: "headings", cat: "content", label: "Headings", value: `${p.headings.length} found`, zone: "lines" },
    { id: "words", cat: "content", label: "Visible text", value: `${p.words} words`, zone: "lines" },
    { id: "images", cat: "content", label: "Images", value: `${p.images.total} found`, zone: "tiles" },
    { id: "links", cat: "content", label: "Links", value: `${p.links.internal} internal, ${p.links.external} external`, zone: "button" },
    { id: "viewport", cat: "mobile", label: "Mobile viewport", value: p.viewport ? "declared" : "not declared", zone: "page" },
    { id: "lang", cat: "mobile", label: "Language", value: p.lang || "not declared", zone: "page" },
    { id: "icon", cat: "mobile", label: "Site icon", value: p.favicon ? "found" : "not found", zone: "bar" },
    { id: "jsonld", cat: "rich", label: "Structured data", value: p.jsonLd.blocks ? `${p.jsonLd.blocks} block${p.jsonLd.blocks > 1 ? "s" : ""}` : "none", zone: "page" },
    { id: "og", cat: "rich", label: "Link preview", value: p.og.image ? "picture set" : "no picture", zone: "picture" },
    { id: "ai-bots", cat: "ai", label: "AI crawlers", value: c.robots.blockedAi.length ? `${c.robots.blockedAi.length} blocked` : "allowed" },
    { id: "llms", cat: "ai", label: "llms.txt", value: c.llms ? "found" : "not found" },
    { id: "raw", cat: "ai", label: "Text without JavaScript", value: `${p.words} words`, zone: "lines" },
  ];
  return out;
}

export function buildReport(c: Crawl, sp: SpeedData, date: string): Report {
  // An error page is not the site: with a failed load only the reachability checks are meaningful.
  const all = runChecks(c, sp);
  const checks = c.status >= 200 && c.status < 300 ? all : all.filter((k) => k.cat === "index" && ["status", "https", "http-redirect", "www", "redirects", "robots", "sitemap"].includes(k.id));
  const { cats, overall } = scoreCats(checks, sp.available);
  return { v: 1, url: c.requested, facts: factsOf(c), date, overall: c.status >= 200 && c.status < 300 ? overall : Math.min(overall, 20), cats, checks, speed: sp };
}

export function summarise(r: Report): Summary {
  const count = (st: Status) => r.checks.filter((k) => k.status === st).length;
  return { facts: r.facts, date: r.date, overall: r.overall, cats: r.cats, totals: { pass: count("pass"), warn: count("warn"), fail: count("fail"), checks: r.checks.filter((k) => k.status !== "info").length }, speedAvailable: r.speed.available, screenshot: r.speed.screenshot };
}

/** What to fix first: failures before warnings, heavier checks first. */
export function priorities(r: Report, n = 5): Check[] {
  const catWeight = (k: Check) => CATS.find((c) => c.key === k.cat)!.weight;
  return r.checks.filter((k) => k.status === "fail" || k.status === "warn").sort((a, b) => (a.status === b.status ? b.weight * catWeight(b) - a.weight * catWeight(a) : a.status === "fail" ? -1 : 1)).slice(0, n);
}

export { verdictOf as verdict } from "@/lib/audit/types";
