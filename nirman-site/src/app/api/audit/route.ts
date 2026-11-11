import { crawl, type Crawl } from "@/lib/audit/crawl";
import { factsOf, signalsOf } from "@/lib/audit/checks";
import { AuditError, normaliseInput } from "@/lib/audit/safe-fetch";
import { seal } from "@/lib/audit/seal";
import { clientIp, rateLimiter } from "@/lib/send-email";

/*
 * Step 1 of the free SEO audit (docs/sections/p6-seo-audit.md): reads the
 * site (page, redirects, robots.txt, sitemap, llms.txt). Fast, a few
 * seconds. Answers with the page's public facts and raw observations
 * ("signals": what was read, never a verdict) for the scanning animation,
 * and a sealed ticket for step 2 (/api/audit/finish/), which runs the slow
 * Google speed test. Limited to 6 audits per visitor per 10 minutes.
 * The address must end in a slash: /api/audit/
 */
export const maxDuration = 30;
const tooMany = rateLimiter(6, 600_000);

export type Ticket = { crawl: Crawl };

export async function POST(request: Request) {
  let input = "";
  try {
    input = String(((await request.json()) as { url?: unknown }).url ?? "");
  } catch {}
  if (tooMany(clientIp(request))) return Response.json({ ok: false, error: "You have run several audits in a short time. Please try again in a few minutes." }, { status: 429 });
  try {
    const data = await crawl(normaliseInput(input));
    return Response.json({ ok: true, facts: factsOf(data), signals: data.status >= 200 && data.status < 300 ? signalsOf(data) : signalsOf(data).filter((x) => ["status", "https", "redirects", "robots", "sitemap"].includes(x.id)), status: data.status, ticket: seal({ crawl: data } satisfies Ticket) });
  } catch (e) {
    if (e instanceof AuditError) return Response.json({ ok: false, error: e.message }, { status: e.code === "invalid" || e.code === "private" ? 400 : 422 });
    console.error("Audit: crawl failed.", e);
    return Response.json({ ok: false, error: "Something went wrong while reading the site. Please try again." }, { status: 500 });
  }
}
