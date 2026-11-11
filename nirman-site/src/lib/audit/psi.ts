import type { SpeedData } from "@/lib/audit/types";

/*
 * Speed, Core Web Vitals and a screenshot from Google PageSpeed Insights
 * (Lighthouse on a simulated mid-range phone, plus 28 days of real Chrome
 * visitors when Google has enough of them). Needs PAGESPEED_API_KEY (free,
 * Google Cloud); without a key Google refuses most requests. When it cannot
 * be used the audit still runs and says the speed part is missing.
 */
type Audit = { score?: number | null; numericValue?: number; title?: string; details?: { data?: string; items?: unknown[] } };
type Psi = {
  error?: { message?: string; code?: number };
  loadingExperience?: { overall_category?: string; metrics?: Record<string, { percentile?: number; category?: string }> };
  lighthouseResult?: { lighthouseVersion?: string; categories?: Record<string, { score?: number | null; auditRefs?: { id: string }[] }>; audits?: Record<string, Audit> };
};

export async function pageSpeed(url: string, timeoutMs = 50_000): Promise<SpeedData> {
  const api = new URL(process.env.PAGESPEED_API_URL || "https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) api.searchParams.append("category", c);
  const key = process.env.PAGESPEED_API_KEY;
  if (key) api.searchParams.set("key", key);
  let data: Psi;
  try {
    const res = await fetch(api, { signal: AbortSignal.timeout(timeoutMs) });
    data = (await res.json()) as Psi;
    if (!res.ok || data.error) {
      console.error("Audit: PageSpeed answered", res.status, (data.error?.message || "").slice(0, 200));
      return { available: false, reason: res.status === 429 ? "quota" : "error" };
    }
  } catch (e) {
    console.error("Audit: PageSpeed failed.", e instanceof Error ? e.message : e);
    return { available: false, reason: "timeout" };
  }
  const lh = data.lighthouseResult;
  const audits = lh?.audits || {};
  const cat = (k: string) => (typeof lh?.categories?.[k]?.score === "number" ? Math.round((lh.categories[k].score as number) * 100) : undefined);
  const num = (k: string) => (typeof audits[k]?.numericValue === "number" ? (audits[k].numericValue as number) : undefined);
  if (cat("performance") === undefined) return { available: false, reason: "error" };
  const fm = data.loadingExperience?.metrics || {};
  const field = Object.keys(fm).length
    ? { overall: data.loadingExperience?.overall_category, lcpMs: fm.LARGEST_CONTENTFUL_PAINT_MS?.percentile, inpMs: fm.INTERACTION_TO_NEXT_PAINT?.percentile, cls: typeof fm.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile === "number" ? fm.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : undefined }
    : undefined;
  const seoFails = (lh?.categories?.seo?.auditRefs || []).map((r) => audits[r.id]).filter((a) => a && a.score === 0 && a.title).map((a) => String(a.title).replace(/`/g, "").slice(0, 120)).slice(0, 8);
  const shot = audits["final-screenshot"]?.details?.data;
  return {
    available: true,
    performance: cat("performance"),
    accessibility: cat("accessibility"),
    bestPractices: cat("best-practices"),
    seo: cat("seo"),
    lcpMs: num("largest-contentful-paint"),
    cls: num("cumulative-layout-shift"),
    tbtMs: num("total-blocking-time"),
    fcpMs: num("first-contentful-paint"),
    speedIndexMs: num("speed-index"),
    bytes: num("total-byte-weight"),
    requests: Array.isArray(audits["network-requests"]?.details?.items) ? audits["network-requests"].details.items.length : undefined,
    field,
    lighthouseSeoFails: seoFails,
    lighthouseVersion: lh?.lighthouseVersion,
    screenshot: typeof shot === "string" && shot.startsWith("data:image/") && shot.length < 400_000 ? shot : undefined,
  };
}
