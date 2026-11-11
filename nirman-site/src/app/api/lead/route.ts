import { site } from "@/content/site";

/*
 * Receives every form on the site (quote, contact, demo, question) and
 * emails it to site.email through Resend (docs/sections/s1-forms.md).
 * - RESEND_API_KEY (secret, on the host) must be set; without it this
 *   answers 503 and the form falls back to opening the visitor's email app.
 * - LEAD_FROM is the sender, an address on the domain verified in Resend
 *   (default: website@<the site's domain>). Replies go to the visitor.
 * - RESEND_API_URL is only for tests (a stand-in service).
 * - Spam protection: a hidden field people never fill, a minimum time on
 *   the page, size limits and a per-address rate limit. Suspected spam gets
 *   a normal "ok" so a bot learns nothing, but no email is sent.
 * The address must end in a slash: /api/lead/
 */

const KINDS = { quote: "Quote request", contact: "Message", demo: "Nirman CRM demo request", question: "Question" } as const;
type Kind = keyof typeof KINDS;

const recent = new Map<string, number[]>(); // per server instance; enough to stop a burst
function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < 600_000);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 5;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "bad-request" }, { status: 400 });
  }
  const kind = data.kind as Kind;
  const email = clean(data.email, 200);
  const name = clean(data.name, 120).replace(/[\r\n]/g, " ");
  const lines = Array.isArray(data.lines) ? data.lines.slice(0, 40).map((l) => clean(l, 3000)) : [];
  if (!(kind in KINDS) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !lines.length) return Response.json({ ok: false, error: "bad-request" }, { status: 400 });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const seconds = typeof data.seconds === "number" ? data.seconds : 0;
  const spam = clean(data.trap, 200) !== "" || seconds < 3 || tooMany(ip);
  if (spam) return Response.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, error: "not-configured" }, { status: 503 });

  const from = process.env.LEAD_FROM || `website@${new URL(site.url).hostname.replace(/^www\./, "")}`;
  const subject = `${KINDS[kind]}${name ? ` from ${name}` : ""}`;
  const text = [...lines, "", `Sent from ${clean(data.page, 300) || site.url}`].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#121418"><h2 style="margin:0 0 12px">${esc(subject)}</h2>${lines.map((l) => (l ? `<div>${esc(l).replace(/^([^:]{1,40}:)/, "<b>$1</b>")}</div>` : "<br>")).join("")}<p style="color:#6b7079;font-size:13px;margin-top:20px">Sent from ${esc(clean(data.page, 300) || site.url)}. Reply to this email to answer ${esc(name || email)}.</p></div>`;

  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from: `${site.name} website <${from}>`, to: [site.email], reply_to: email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Lead: Resend answered", res.status, (await res.text()).slice(0, 300));
      return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("Lead: could not reach Resend.", e instanceof Error ? e.message : e);
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
