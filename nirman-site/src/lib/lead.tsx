"use client";

import { site } from "@/content/site";

/*
 * Sending a form from the browser (docs/sections/s1-forms.md). sendLead
 * posts to /api/lead/; if that cannot send (no key on the host yet, or the
 * email service is down) the caller opens the visitor's email app with the
 * same text, so an enquiry is never lost.
 */
export type LeadKind = "quote" | "contact" | "demo" | "question";

const openedAt = Date.now();

/** A field people never see or fill; bots that fill every field give themselves away. */
export function Trap() {
  return (
    <div aria-hidden className="absolute -left-[200vw] size-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="company_site" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export async function sendLead(kind: LeadKind, lead: { name?: string; email: string; lines: string[] }): Promise<boolean> {
  try {
    const trap = document.querySelector<HTMLInputElement>('input[name="company_site"]')?.value || "";
    const res = await fetch("/api/lead/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, ...lead, trap, seconds: Math.round((Date.now() - openedAt) / 1000), page: window.location.href }),
    });
    return res.ok && ((await res.json()) as { ok?: boolean }).ok === true;
  } catch {
    return false;
  }
}

/** The fallback: the visitor's own email app, with the text filled in. */
export function mailtoLead(subject: string, lines: string[]) {
  window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`);
}
