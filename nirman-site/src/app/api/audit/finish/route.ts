import type { Ticket } from "@/app/api/audit/route";
import { buildReport, summarise } from "@/lib/audit/checks";
import { pageSpeed } from "@/lib/audit/psi";
import { seal, unseal } from "@/lib/audit/seal";

/*
 * Step 2 of the free SEO audit: takes the sealed ticket from step 1, runs
 * Google's speed test (the slow part, up to about 50 seconds), judges
 * everything and answers with the scores in the clear and the full findings
 * sealed. The browser hands the sealed findings back with the visitor's
 * details to /api/audit/report/ to get the PDF. A ticket is valid for 15
 * minutes, so this cannot be called without a real step 1.
 */
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: { ticket?: unknown } = {};
  try {
    body = (await request.json()) as { ticket?: unknown };
  } catch {}
  const ticket = unseal<Ticket>(body.ticket, 900_000);
  if (!ticket?.crawl) return Response.json({ ok: false, error: "This audit has expired. Please run it again." }, { status: 400 });
  const loaded = ticket.crawl.status >= 200 && ticket.crawl.status < 300;
  const speed = loaded ? await pageSpeed(ticket.crawl.finalUrl) : { available: false, reason: "page-error" };
  const report = buildReport(ticket.crawl, speed, new Date().toISOString());
  return Response.json({ ok: true, summary: summarise(report), report: seal(report) });
}
