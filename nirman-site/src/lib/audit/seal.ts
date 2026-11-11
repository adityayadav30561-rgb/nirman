import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/*
 * Sealing audit data that travels through the browser (docs/sections/
 * p6-seo-audit.md). The full findings are the thing a visitor gives their
 * details for, so the browser only ever holds them encrypted (AES-256-GCM):
 * it gets the scores in the clear and hands the sealed findings back with
 * the form. Sealed data also cannot be altered, and expires after a day.
 * AUDIT_SECRET is the key; if it is not set, another server-only secret of
 * this site is used so sealing still works on every server instance.
 */
function key() {
  const secret = process.env.AUDIT_SECRET || process.env.RESEND_API_KEY || process.env.SANITY_REVALIDATE_SECRET || "nirman-audit-local-only";
  return createHash("sha256").update(`audit:${secret}`).digest();
}

export function seal(data: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify({ t: Date.now(), d: data }), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

export function unseal<T>(sealed: unknown, maxAgeMs = 86_400_000): T | null {
  if (typeof sealed !== "string" || sealed.length < 40 || sealed.length > 2_000_000) return null;
  try {
    const raw = Buffer.from(sealed, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const parsed = JSON.parse(Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8")) as { t: number; d: T };
    return Date.now() - parsed.t <= maxAgeMs ? parsed.d : null;
  } catch {
    return null;
  }
}
