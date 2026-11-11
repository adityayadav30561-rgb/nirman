import { cleanText as clean, clientIp, isEmail, rateLimiter, sendToTeam } from "@/lib/send-email";

/*
 * Receives every form on the site (quote, contact, demo, question) and
 * emails it to site.email through Resend (docs/sections/s1-forms.md).
 * - Sending is lib/send-email.ts. Without RESEND_API_KEY on the host this
 *   answers 503 and the form falls back to opening the visitor's email app.
 * - Spam protection: a hidden field people never fill, a minimum time on
 *   the page, size limits and a per-address rate limit. Suspected spam gets
 *   a normal "ok" so a bot learns nothing, but no email is sent.
 * The address must end in a slash: /api/lead/
 */

const KINDS = { quote: "Quote request", contact: "Message", demo: "Nirman CRM demo request", question: "Question" } as const;
type Kind = keyof typeof KINDS;

const tooMany = rateLimiter(5, 600_000);

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
  if (!(kind in KINDS) || !isEmail(email) || !lines.length) return Response.json({ ok: false, error: "bad-request" }, { status: 400 });

  const ip = clientIp(request);
  const seconds = typeof data.seconds === "number" ? data.seconds : 0;
  const spam = clean(data.trap, 200) !== "" || seconds < 3 || tooMany(ip);
  if (spam) return Response.json({ ok: true });

  const sent = await sendToTeam({ subject: `${KINDS[kind]}${name ? ` from ${name}` : ""}`, lines, replyTo: email, name, page: clean(data.page, 300) });
  if (sent === "not-configured") return Response.json({ ok: false, error: "not-configured" }, { status: 503 });
  if (sent === "failed") return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
