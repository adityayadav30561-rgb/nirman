"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { contactPage } from "@/content/pages";
import { mailtoLead, sendLead, Trap } from "@/lib/lead";

/*
 * Short contact form (docs/sections/p4-contact-about.md). Send goes through
 * /api/lead/ (lib/lead.tsx, docs/sections/s1-forms.md), then /thank-you/;
 * if sending is not possible it opens the visitor's email app, the same
 * flow as the quote form. Never a false "sent".
 */
const field =
  "h-12 w-full rounded-xl bg-white px-4 text-[0.95rem] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-brand";
const label = "mb-1.5 block text-[0.8rem] font-medium text-ink";

export function ContactForm() {
  const id = useId();
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      setError("Please add your name, a valid email and a short message.");
      (f.querySelector(":invalid") as HTMLElement | null)?.focus();
      return;
    }
    setError("");
    const d = new FormData(f);
    const lines = [`Name: ${d.get("name")}`, `Email: ${d.get("email")}`, `Phone: ${d.get("phone") || "-"}`, `About: ${d.get("service")}`, "", `${d.get("message")}`];
    setSending(true);
    void sendLead("contact", { name: String(d.get("name")), email: String(d.get("email")), lines }).then((sent) => {
      if (sent) return router.push("/thank-you/");
      mailtoLead(`Message from ${d.get("name")}`, lines);
      setTimeout(() => router.push("/thank-you/?via=email"), 600);
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <Trap />
      <div>
        <label htmlFor={`${id}-n`} className={label}>Your name</label>
        <input id={`${id}-n`} name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-e`} className={label}>Email</label>
        <input id={`${id}-e`} name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-p`} className={label}>Phone or WhatsApp <span className="font-normal text-muted">(optional)</span></label>
        <input id={`${id}-p`} name="phone" type="tel" autoComplete="tel" placeholder="With country code" className={field} />
      </div>
      <div>
        <label htmlFor={`${id}-s`} className={label}>What is it about?</label>
        <span className="relative block">
          <select id={`${id}-s`} name="service" defaultValue="Not sure yet" className={`${field} appearance-none pr-10`}>
            {contactPage.services.map((o) => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
        </span>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-m`} className={label}>Your message</label>
        <textarea id={`${id}-m`} name="message" rows={4} required placeholder="A few lines about your business and what you need" className={`${field} h-auto py-3`} />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" disabled={sending} aria-busy={sending || undefined} className="inline-flex h-12 shrink-0 disabled:opacity-60 items-center justify-center gap-2 rounded-full bg-ink-2 px-8 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          {sending ? "Sending" : "Send message"}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className={`text-[0.78rem] ${error ? "font-medium text-brand" : "text-muted"}`} aria-live="polite">
          {error || "We reply within 2 working hours (IST)."}
        </p>
      </div>
    </form>
  );
}
