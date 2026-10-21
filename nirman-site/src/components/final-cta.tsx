"use client";

import { useState } from "react";
import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ElevationDrawing } from "./mockups/art";
import { button } from "./ui/button";

const goals = [
  "Get more enquiries",
  "Launch a new website",
  "Organise sales with a CRM",
  "Replace spreadsheets with software",
  "Launch a mobile app",
  "Run better ad campaigns",
];

export function FinalCta() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (g: string) => setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));

  const subject = picked.length ? `Project inquiry: ${picked.join(", ")}` : "Project inquiry";
  const body = [
    "Hello,",
    "",
    picked.length ? `We'd like help to: ${picked.join("; ")}.` : "We'd like to discuss a project.",
    "",
    "About our business:",
    "",
    "Timeline and budget (if known):",
  ].join("\n");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 pb-5">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-coral text-white">
          <ElevationDrawing className="pointer-events-none absolute -bottom-4 right-[-8%] w-[min(66rem,130%)] text-white/25 lg:right-[-3%]" />
          <div className="relative grid gap-x-14 gap-y-12 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-12 lg:px-16 lg:py-20">
            <div className="lg:col-span-7">
              <h2 id="contact-title" className="display text-[clamp(2.7rem,6vw,5.2rem)]">
                Have a business goal? Let&apos;s build the right solution.
              </h2>
              <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-white/85">
                Tell us what you want to achieve. We&apos;ll help you identify the right digital solution for your business.
              </p>

              <fieldset className="mt-10">
                <legend className="text-[1rem] font-medium">What would you like to achieve?</legend>
                <p className="mt-1 text-[0.9rem] text-white/75">Choose any that apply. We&apos;ll add them to your email.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {goals.map((g) => {
                    const on = picked.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(g)}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] transition-colors ${
                          on ? "bg-ink text-white" : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
                        }`}
                      >
                        {on && <Check className="size-4 text-marigold" strokeWidth={2.6} />}
                        {g}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={mailto} className={button("primary", "lg")}>
                  Start a project inquiry
                </a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={button("ghostLight", "lg")}>
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <address className="rounded-[2rem] bg-surface p-6 not-italic text-ink shadow-lift sm:p-8">
                <p className="title text-[1.35rem]">Prefer to talk first?</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">Book a discovery call, or reach us directly.</p>
                <a href={site.bookingUrl} className={`${button("accent", "md")} mt-5 w-full`}>
                  Book a discovery call
                </a>
                <ul className="mt-6 divide-y divide-ink/8 border-t border-ink/8 text-[0.95rem]">
                  <ContactRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
                  <ContactRow icon={Phone} label="Phone" value={site.phone} href={site.phoneHref} />
                  <ContactRow icon={MapPin} label="Office" value={site.address} />
                </ul>
                <p className="mt-4 text-[0.8rem] text-ink-3">Contact details shown are placeholders.</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-coral-soft text-coral-2">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8rem] text-ink-3">{label}</span>
        <span className="block break-words">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-3 py-3.5 transition-colors hover:text-coral-2">
          {inner}
        </a>
      ) : (
        <span className="flex items-center gap-3 py-3.5">{inner}</span>
      )}
    </li>
  );
}
