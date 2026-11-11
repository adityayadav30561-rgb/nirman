"use client";

import { useId, useState, type FormEvent } from "react";
import { mailtoLead, sendLead, Trap } from "@/lib/lead";

/*
 * Book a demo form (docs/sections/p2-crm-page.md). Submit sends through
 * /api/lead/ (lib/lead.tsx, docs/sections/s1-forms.md) and shows "Request
 * sent" in place; if sending is not possible it opens the visitor's email
 * app. Later: also post the lead into Nirman CRM.
 */
const field =
  "h-12 w-full rounded-xl bg-surface px-4 text-[0.95rem] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-brand";

export function DemoForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const dark = tone === "dark";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state !== "idle") return;
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError("Please fill in your name, business and a valid email or WhatsApp number.");
      (f.querySelector(":invalid") as HTMLElement | null)?.focus();
      return;
    }
    setError("");
    const d = new FormData(f);
    const lines = ["Name", "Business", "WhatsApp", "Email", "Team size", "Message"].map((k) => `${k}: ${d.get(k.toLowerCase().replace(" ", "-")) ?? ""}`);
    setState("sending");
    void sendLead("demo", { name: String(d.get("name")), email: String(d.get("email")), lines }).then((sent) => {
      if (sent) return setState("sent");
      mailtoLead("Nirman CRM demo request", lines);
      setState("idle");
    });
  };

  const label = `mb-1.5 block text-[0.8rem] font-medium ${dark ? "text-white/90" : "text-ink"}`;
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <Trap />
      <div>
        <label htmlFor={`${id}-n`} className={label}>Your name</label>
        <input id={`${id}-n`} name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-b`} className={label}>Business name</label>
        <input id={`${id}-b`} name="business" required autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-w`} className={label}>WhatsApp number</label>
        <input id={`${id}-w`} name="whatsapp" type="tel" required autoComplete="tel" placeholder="+91" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-e`} className={label}>Email</label>
        <input id={`${id}-e`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-t`} className={label}>Team size</label>
        <select id={`${id}-t`} name="team-size" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b7079%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}>
          <option>Just me</option>
          <option>2 to 5 people</option>
          <option>6 to 20 people</option>
          <option>More than 20</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-m`} className={label}>
          How do you handle leads today? <span className={dark ? "text-white/70" : "text-muted"}>(optional)</span>
        </label>
        <textarea id={`${id}-m`} name="message" rows={3} className={`${field} h-auto py-3`} />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={state !== "idle"}
          aria-busy={state === "sending" || undefined}
          className={`inline-flex h-12 items-center justify-center rounded-full px-8 disabled:opacity-60 text-[0.9rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark ? "bg-white text-ink hover:bg-wash focus-visible:outline-white" : "bg-ink-2 text-white hover:bg-brand focus-visible:outline-brand"
          }`}
        >
          {state === "sending" ? "Sending" : state === "sent" ? "Request sent" : "Book a demo"}
        </button>
        <p className={`text-[0.78rem] ${dark ? "text-white/80" : "text-muted"}`} aria-live="polite">
          {error || (state === "sent" ? "Thank you. We will write to you within 2 working hours (IST) to fix a time." : "We reply within 2 working hours (IST) to fix a time.")}
        </p>
      </div>
    </form>
  );
}
