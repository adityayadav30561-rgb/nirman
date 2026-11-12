import { priorities, verdict } from "@/lib/audit/checks";
import { renderReportPdf } from "@/lib/audit/pdf";
import { unseal } from "@/lib/audit/seal";
import type { Report } from "@/lib/audit/types";
import { cleanText, clientIp, isEmail, rateLimiter, sendToTeam } from "@/lib/send-email";

/*
 * Step 3 of the free SEO audit: the visitor's details in exchange for the
 * PDF. Checks the email and phone, emails the enquiry to the team (with the
 * score and the top issues, so the follow-up call starts informed), builds
 * the PDF from the sealed findings and returns it as a download. If the
 * email to the team cannot be sent the visitor still gets the report: the
 * failure is logged, not shown.
 */
export const maxDuration = 30;
const tooMany = rateLimiter(8, 600_000);

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {}
  const report = unseal<Report>(body.report);
  if (!report || report.v !== 2) return Response.json({ ok: false, error: "This audit has expired. Please run it again." }, { status: 400 });
  const email = cleanText(body.email, 200);
  const phone = cleanText(body.phone, 30);
  const name = cleanText(body.name, 120).replace(/[\r\n]/g, " ");
  const digits = phone.replace(/\D/g, "");
  if (!isEmail(email)) return Response.json({ ok: false, error: "Please enter a valid email address.", field: "email" }, { status: 400 });
  if (digits.length < 8 || digits.length > 15 || !/^[+\d][\d\s().-]*$/.test(phone)) return Response.json({ ok: false, error: "Please enter a valid phone number, with the country code if you are outside India.", field: "phone" }, { status: 400 });
  if (tooMany(clientIp(request))) return Response.json({ ok: false, error: "Too many downloads in a short time. Please try again in a few minutes." }, { status: 429 });

  const spam = cleanText(body.trap, 200) !== "";
  if (!spam) {
    const top = priorities(report, 5);
    const sent = await sendToTeam({
      subject: `SEO audit download: ${report.facts.host} (${report.overall}/100)`,
      name,
      replyTo: email,
      page: cleanText(body.page, 300),
      lines: [
        `Name: ${name || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Website: ${report.facts.finalUrl}`,
        `Score: ${report.overall}/100 (${verdict(report.overall)})`,
        `By area: ${report.cats.map((c) => `${c.label} ${c.score ?? "n/a"}`).join(", ")}`,
        "",
        "Top issues in their report:",
        ...top.map((k, i) => `${i + 1}. ${k.title}: ${k.found}`.slice(0, 400)),
      ],
    });
    if (sent !== "sent") console.error("Audit: lead for", report.facts.host, "was not emailed:", sent, { name, email, phone });
  }

  try {
    const pdf = await renderReportPdf(report, new URL(request.url).origin);
    const file = `seo-audit-${report.facts.host.replace(/[^a-z0-9.-]/gi, "")}.pdf`;
    return new Response(new Uint8Array(pdf), { headers: { "content-type": "application/pdf", "content-disposition": `attachment; filename="${file}"`, "cache-control": "no-store" } });
  } catch (e) {
    console.error("Audit: could not build the PDF.", e);
    return Response.json({ ok: false, error: "We could not build the report just now. Your details were received and we will email it to you." }, { status: 500 });
  }
}
