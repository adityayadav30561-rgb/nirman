// Shapes used by the free SEO audit (docs/sections/p6-seo-audit.md).

export type CatKey = "index" | "content" | "speed" | "mobile" | "rich" | "aeo" | "geo";
export type Status = "pass" | "warn" | "fail" | "info";

/** One thing the audit looked at. `found` is what we saw on the site; `fix` is what to do about it. */
export type Check = { id: string; cat: CatKey; title: string; status: Status; weight: number; found: string; why: string; fix?: string };

export type CatScore = { key: CatKey; label: string; score: number | null; pass: number; warn: number; fail: number };

/** Facts about the page that the scanning animation and the report cover use. */
export type PageFacts = {
  host: string;
  finalUrl: string;
  title: string;
  description: string;
  h1: string;
  favicon: string;
  ogImage: string;
  themeColor: string;
  /** the site lets other pages show it in a frame (no X-Frame-Options, no frame-ancestors rule) and is on https: the scan can show it live */
  frameable?: boolean;
};

/**
 * A raw observation shown while the audit runs (scanning animation): what was
 * read, never a verdict or a fix; those stay in the report. `zone` says which
 * part of the page sketch it belongs to.
 */
export type Signal = { id: string; cat: CatKey; label: string; value: string; zone?: "bar" | "picture" | "heading" | "text" | "button" | "lines" | "tiles" | "page" };

export type SpeedData = {
  /** false when Google's PageSpeed service could not be used; the report says so */
  available: boolean;
  reason?: string;
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
  lcpMs?: number;
  cls?: number;
  tbtMs?: number;
  fcpMs?: number;
  speedIndexMs?: number;
  bytes?: number;
  requests?: number;
  /** real visitors over the last 28 days (Chrome UX Report), when Google has enough data */
  field?: { overall?: string; lcpMs?: number; inpMs?: number; cls?: number };
  /** failed Lighthouse SEO audits, as titles */
  lighthouseSeoFails?: string[];
  lighthouseVersion?: string;
  screenshot?: string;
};

export type Report = {
  /** 2: AEO and GEO areas (2026-11-12). Older sealed reports are refused and the visitor runs the audit again. */
  v: 2;
  url: string;
  facts: PageFacts;
  date: string;
  overall: number;
  cats: CatScore[];
  checks: Check[];
  speed: SpeedData;
};

/** What the browser is shown before the form: scores and counts, never the findings. */
/** The overall score split three ways: classic search (the first five areas), answer engines and generative engines. null: not measured. */
export type Pillars = { seo: number | null; aeo: number | null; geo: number | null };

export type Summary = { facts: PageFacts; date: string; overall: number; pillars: Pillars; cats: CatScore[]; totals: { pass: number; warn: number; fail: number; checks: number }; speedAvailable: boolean; screenshot?: string };

/** Weights add up to 100. AEO and GEO together are 30 (user, 2026-11-12: the score should be based on them). */
export const CATS: { key: CatKey; label: string; weight: number; line: string }[] = [
  { key: "index", label: "Crawling and indexing", weight: 20, line: "Can Google reach the site, read it and list it?" },
  { key: "content", label: "On-page content", weight: 15, line: "Titles, descriptions, headings, text and image descriptions." },
  { key: "speed", label: "Speed and Core Web Vitals", weight: 20, line: "How fast the page loads on a phone, measured by Google Lighthouse." },
  { key: "mobile", label: "Mobile and experience", weight: 8, line: "Phone layout, accessibility and safe loading." },
  { key: "rich", label: "Structured data and sharing", weight: 7, line: "What search results and shared links can show about you." },
  { key: "aeo", label: "Answer engines (AEO)", weight: 15, line: "Can Google's answer boxes, AI Overviews and voice assistants lift a direct answer from the page?" },
  { key: "geo", label: "Generative engines (GEO)", weight: 15, line: "Can ChatGPT, Claude, Perplexity and Gemini read the site, trust it and cite it?" },
];

/** Green from 90, amber from 50, red below: Lighthouse's own bands. */
export const scoreColour = (n: number) => (n >= 90 ? "#1f8a55" : n >= 50 ? "#c77700" : "#b42318");
export const verdictOf = (score: number) => (score >= 90 ? "Excellent" : score >= 75 ? "Good" : score >= 50 ? "Needs work" : "Needs urgent attention");

/** What the scanning animation names while each area is being checked (names only, never results). */
export const STAGE_CHECKS: Record<CatKey, string[]> = {
  index: ["Server response", "HTTPS", "Redirects", "robots.txt", "XML sitemap", "Canonical address", "Indexing rules"],
  content: ["Page title", "Meta description", "Headings", "Visible text", "Image descriptions", "Internal links"],
  speed: ["Google Lighthouse on a phone", "Largest Contentful Paint", "Layout shift", "Blocking time", "Real-visitor data", "Page weight"],
  mobile: ["Viewport", "Accessibility", "Best practices", "Insecure resources"],
  rich: ["JSON-LD", "Business identity", "Link previews"],
  aeo: ["Questions people ask", "Direct answers", "FAQ data", "Lists and tables", "Sentence length", "Snippet rules"],
  geo: ["AI search crawlers", "Readable without JavaScript", "Business identity", "Authorship", "Freshness", "Facts and figures", "Cited sources"],
};
