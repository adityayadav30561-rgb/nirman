import { site } from "@/content/site";

/*
 * One place that sends email for the site (docs/sections/s1-forms.md):
 * Resend's HTTP API, to site.email, with the visitor as Reply-To.
 * Returns "sent", "not-configured" (no RESEND_API_KEY on the host) or
 * "failed". RESEND_API_URL is only for tests.
 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const cleanText = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim().slice(0, max) : "");
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 200;

export async function sendToTeam({ subject, lines, replyTo, name, page }: { subject: string; lines: string[]; replyTo: string; name?: string; page?: string }): Promise<"sent" | "not-configured" | "failed"> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "not-configured";
  const from = process.env.LEAD_FROM || `website@${new URL(site.url).hostname.replace(/^www\./, "")}`;
  const where = page || site.url;
  const text = [...lines, "", `Sent from ${where}`].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#121418"><h2 style="margin:0 0 12px">${esc(subject)}</h2>${lines.map((l) => (l ? `<div>${esc(l).replace(/^([^:]{1,40}:)/, "<b>$1</b>")}</div>` : "<br>")).join("")}<p style="color:#6b7079;font-size:13px;margin-top:20px">Sent from ${esc(where)}. Reply to this email to answer ${esc(name || replyTo)}.</p></div>`;
  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from: `${site.name} website <${from}>`, to: [site.email], reply_to: replyTo, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return "sent";
    console.error("Email: Resend answered", res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.error("Email: could not reach Resend.", e instanceof Error ? e.message : e);
  }
  return "failed";
}

/** At most `max` hits per key in `windowMs`, per server instance: enough to stop a burst. */
export function rateLimiter(max: number, windowMs: number) {
  const recent = new Map<string, number[]>();
  return (key: string) => {
    const now = Date.now();
    const hits = (recent.get(key) || []).filter((t) => now - t < windowMs);
    hits.push(now);
    recent.set(key, hits);
    if (recent.size > 5000) recent.clear();
    return hits.length > max;
  };
}
export const clientIp = (request: Request) => (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
