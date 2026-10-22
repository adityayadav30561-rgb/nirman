"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { site } from "@/content/site";
import { sendLead, type Lead } from "@/lib/lead";
import { button } from "./ui/button";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{8,20}$/;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get("name") ?? "").trim();
  const email = String(f.get("email") ?? "").trim();
  const phone = String(f.get("phone") ?? "").trim();
  const message = String(f.get("message") ?? "").trim();
  if (!name) e.name = "Please tell us your name.";
  if (!email) e.email = "Please add your email so we can reply.";
  else if (!EMAIL.test(email)) e.email = "That email address doesn't look right. Check for typos.";
  if (phone && !PHONE.test(phone)) e.phone = "Use digits with your country code, for example +91 98765 43210.";
  if (message.length < 10) e.message = "Tell us a little about what you need (a sentence or two is fine).";
  return e;
}

/**
 * Short quote form at the bottom of every service page (P4.7). It validates on
 * submit and hands the lead to `sendLead`, which opens the visitor's email app
 * until the Phase 5 API exists.
 */
export function QuoteForm({ service, source }: { service: string; source: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = (["name", "email", "phone", "message"] as Field[]).find((k) => found[k]);
    if (first) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const lead: Lead = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message")).trim(),
      whatsapp: data.get("whatsapp") === "on",
      service,
      source,
    };
    sendLead(lead);
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex h-full flex-col justify-center rounded-[2rem] bg-surface p-7 text-ink shadow-lift sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-forest">
          <Mail className="size-5" aria-hidden />
        </span>
        <p className="heading mt-5 text-[1.8rem] leading-tight">Your email is ready to send</p>
        <p className="mt-3 max-w-[30rem] leading-[1.6] text-ink-2">
          Your email app should have opened with your enquiry filled in. Press send and we&rsquo;ll reply within 2 working
          hours (IST).
        </p>
        <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-[1.6] text-ink-3">
          Nothing opened? Email us at{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className={`${button("secondary", "md")} mt-6 w-fit`}>
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label={`Quote request for ${service}`} className="rounded-[2rem] bg-surface p-6 text-ink shadow-lift sm:p-9">
      <p className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-[0.85rem] text-ink-2">
        <Check className="size-3.5 text-forest" strokeWidth={3} aria-hidden />
        About: <span className="font-medium text-ink">{service}</span>
      </p>
      <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <Input name="name" label="Your name" autoComplete="name" error={errors.name} required />
        <Input name="email" label="Email" type="email" autoComplete="email" error={errors.email} required />
        <Input
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          hint="With country code, e.g. +91"
          error={errors.phone}
        />
        <Input name="company" label="Company" autoComplete="organization" hint="Optional" />
        <div className="sm:col-span-2">
          <Label htmlFor="q-message" required>
            What do you need?
          </Label>
          <textarea
            id="q-message"
            name="message"
            rows={4}
            aria-required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "q-message-error" : undefined}
            placeholder="A few lines about your business, your goal and any deadline."
            className={`${field(!!errors.message)} h-auto resize-y py-3`}
          />
          <ErrorText id="q-message-error">{errors.message}</ErrorText>
        </div>
      </div>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.95rem] leading-snug text-ink-2">
        <input name="whatsapp" type="checkbox" className="mt-0.5 size-5 shrink-0 accent-forest" />
        You can contact me on WhatsApp about this enquiry
      </label>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className={button("primary", "lg")}>
          Send my enquiry
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className="max-w-[20rem] text-[0.85rem] leading-snug text-ink-3">This opens your email app with your details filled in.</p>
      </div>
      <p className="mt-5 text-[0.8rem] leading-snug text-ink-3">
        We only use your details to reply to this enquiry. See our{" "}
        <Link href="/privacy-policy/" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function field(invalid: boolean) {
  return `block h-12 w-full rounded-xl bg-paper px-4 text-[1rem] text-ink placeholder:text-ink-3 outline-none ring-1 transition-shadow focus-visible:ring-2 ${
    invalid ? "ring-signal-red focus-visible:ring-signal-red" : "ring-ink/12 focus-visible:ring-ink"
  }`;
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.95rem] font-medium">
      {children}
      {required && (
        <span className="text-signal-red" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.875rem] text-signal-red">
      {children}
    </p>
  );
}

function Input({
  name,
  label,
  type = "text",
  autoComplete,
  hint,
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}) {
  const id = `q-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={field(!!error)}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.85rem] text-ink-3">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}
