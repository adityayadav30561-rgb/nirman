"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { contactWays, fromQuoteBar, locations, serviceOptions, steps, timelines, type ServiceKey } from "@/content/quote";

/*
 * The four-step quote form (docs/sections/p3-get-a-quote.md).
 * - Step 1 needs at least one service; step 4 needs a name and a valid
 *   email; everything else is optional.
 * - Pre-fills service and timeline from the homepage quote bar
 *   (?service=...&timeline=...), read once in the browser so the page stays
 *   static.
 * - No lead API yet (BUILD-PLAN S1): Submit opens the visitor's email app
 *   with everything filled in, then goes to /thank-you/?via=email, which
 *   says to press Send. No fake "sent" state.
 * - Framer Motion slides between steps (off under reduced motion); focus
 *   moves to the new step's heading; Enter in a one-line field goes on.
 * `size="big"` gives larger tiles and type for the one-step-per-screen look.
 */

const noop = () => () => {};

type Data = {
  services: ServiceKey[] | null; // null: not touched yet, use the pre-fill
  timeline: string | null;
  url: string;
  about: string;
  location: string;
  budget: string;
  discuss: boolean;
  name: string;
  business: string;
  email: string;
  phone: string;
  via: string;
};

const empty: Data = { services: null, timeline: null, url: "", about: "", location: "", budget: "", discuss: false, name: "", business: "", email: "", phone: "", via: "WhatsApp" };

export function QuoteForm({ size = "card", tone = "light" }: { size?: "card" | "big"; tone?: "light" | "dark" }) {
  const id = useId();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [raw, setD] = useState<Data>(empty);
  // pre-fill from the homepage quote bar: read the URL as an external store
  // (server snapshot "", so hydration matches), used until the visitor edits
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const pre = useMemo(() => {
    const p = new URLSearchParams(search);
    const s = fromQuoteBar[p.get("service") ?? ""];
    const t = p.get("timeline") ?? "";
    return { services: s ? [s] : [], timeline: timelines.includes(t) ? t : "" };
  }, [search]);
  const d = { ...raw, services: raw.services ?? pre.services, timeline: raw.timeline ?? pre.timeline };
  const [error, setError] = useState("");
  const moved = useRef(false);
  const big = size === "big";

  // focus each new step's heading as it mounts (after a move, not on first
  // load); works with and without the slide animation
  // React calls this ref again on every re-render (each keystroke), so only
  // focus once per step, or typing would lose focus after one letter.
  const focusedStep = useRef(0);
  const focusHeading = (el: HTMLHeadingElement | null) => {
    if (el && moved.current && focusedStep.current !== step) {
      focusedStep.current = step;
      el.focus();
    }
  };

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const toggle = (k: ServiceKey) => set("services", d.services.includes(k) ? d.services.filter((s) => s !== k) : [...d.services, k]);

  const check = (s: number) => {
    if (s === 0 && d.services.length === 0) return "Choose at least one option.";
    if (s === 3 && !d.name.trim()) return "Please add your name.";
    if (s === 3 && !/^\S+@\S+\.\S+$/.test(d.email)) return "Please add an email address like name@company.com.";
    return "";
  };

  const go = (to: number) => {
    if (to > step) {
      const e = check(step);
      setError(e);
      if (e) return;
    } else setError("");
    moved.current = true;
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) return go(step + 1);
    const err = check(step);
    setError(err);
    if (err) return;
    const lines = [
      `Services: ${d.services.map((k) => serviceOptions.find((o) => o.key === k)?.label).join(", ")}`,
      `Current website: ${d.url || "-"}`,
      `About the project: ${d.about || "-"}`,
      `Timeline: ${d.timeline || "-"}`,
      `Location: ${d.location || "-"}`,
      `Budget: ${d.discuss ? "Prefer to discuss" : d.budget || "-"}`,
      "",
      `Name: ${d.name}`,
      `Business: ${d.business || "-"}`,
      `Email: ${d.email}`,
      `WhatsApp / phone: ${d.phone || "-"}`,
      `Reply by: ${d.via}`,
    ];
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Quote request from ${d.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`);
    setTimeout(() => router.push("/thank-you/?via=email"), 600);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step < steps.length - 1) go(step + 1);
      else submit(e as unknown as FormEvent);
    }
  };

  const dark = tone === "dark";
  const field = `w-full rounded-xl bg-surface px-4 text-[0.95rem] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-brand ${big ? "h-14" : "h-12"}`;
  const label = `mb-1.5 block text-[0.85rem] font-medium ${dark ? "text-white/90" : "text-ink"}`;
  const pill = (on: boolean) =>
    `min-h-11 rounded-full px-4 text-[0.88rem] font-medium ring-1 transition-colors ${on ? "bg-ink-2 text-white ring-ink-2" : dark ? "bg-white/8 text-white ring-white/20 hover:ring-white/50" : "bg-surface text-ink ring-line hover:ring-ink/40"}`;
  const S = steps[step];

  return (
    <form onSubmit={submit} noValidate aria-labelledby={`${id}-h`}>
      {/* progress */}
      <div className="flex items-center justify-between gap-4">
        <p className={`text-[0.8rem] font-semibold ${dark ? "text-white/80" : "text-brand"}`}>
          Step {step + 1} of {steps.length} · {S.label}
        </p>
        <ol className="flex gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <li key={s.key} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "w-8 bg-brand" : `w-4 ${dark ? "bg-white/20" : "bg-ink/15"}`}`} />
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.fieldset
          key={step}
          custom={dir}
          initial={reduce ? false : { opacity: 0, x: 24 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: -24 * dir }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <legend className="sr-only">{S.title}</legend>
          <h2 id={`${id}-h`} ref={focusHeading} tabIndex={-1} className={`font-semibold tracking-[-0.02em] outline-none ${big ? "text-[clamp(1.6rem,3vw,2.3rem)] leading-tight" : "text-[1.35rem]"} ${dark ? "text-white" : "text-ink"}`}>
            {S.title}
          </h2>
          <p className={`mt-1.5 text-[0.92rem] ${dark ? "text-white/80" : "text-muted"}`}>{S.line}</p>

          <div className="mt-6">
            {step === 0 && (
              <ul className={`grid gap-2.5 ${big ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
                {serviceOptions.map((o) => {
                  const on = d.services.includes(o.key);
                  return (
                    <li key={o.key}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(o.key)}
                        className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${big ? "min-h-24" : "min-h-16"} ${
                          on ? "bg-[#fdf1ea] ring-2 ring-brand" : dark ? "bg-white/6 ring-white/15 hover:ring-white/40" : "bg-surface ring-line hover:ring-ink/30"
                        }`}
                      >
                        <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ring-1 transition-colors ${on ? "bg-brand text-white ring-brand" : "ring-ink/30"}`}>
                          {on && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                        </span>
                        <span className="leading-tight">
                          <span className={`block font-semibold ${on || !dark ? "text-ink" : "text-white"}`}>{o.label}</span>
                          <span className={`mt-1 block text-[0.8rem] ${on || !dark ? "text-muted" : "text-white/70"}`}>{o.line}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div>
                  <label htmlFor={`${id}-about`} className={label}>
                    What would you like built or improved?
                  </label>
                  <textarea id={`${id}-about`} rows={4} value={d.about} onChange={(e) => set("about", e.target.value)} className={`${field} h-auto py-3`} placeholder="For example: a website for our clinic with online booking" />
                </div>
                <div>
                  <label htmlFor={`${id}-url`} className={label}>
                    Your current website <span className={dark ? "text-white/60" : "text-muted"}>(if any)</span>
                  </label>
                  <input id={`${id}-url`} type="url" inputMode="url" value={d.url} onChange={(e) => set("url", e.target.value)} onKeyDown={onEnter} placeholder="www.example.com" className={field} />
                </div>
                <fieldset>
                  <legend className={label}>When would you like to start?</legend>
                  <div className="flex flex-wrap gap-2">
                    {timelines.map((t) => (
                      <button key={t} type="button" aria-pressed={d.timeline === t} onClick={() => set("timeline", t)} className={pill(d.timeline === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={label}>Where is your business?</legend>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((t) => (
                      <button key={t} type="button" aria-pressed={d.location === t} onClick={() => set("location", t)} className={pill(d.location === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <div>
                  <label htmlFor={`${id}-budget`} className={label}>
                    Your budget <span className={dark ? "text-white/60" : "text-muted"}>(optional, any currency)</span>
                  </label>
                  <input id={`${id}-budget`} value={d.budget} disabled={d.discuss} onChange={(e) => set("budget", e.target.value)} onKeyDown={onEnter} className={`${field} disabled:opacity-50`} />
                </div>
                <label className={`flex min-h-11 cursor-pointer items-center gap-3 text-[0.92rem] ${dark ? "text-white/90" : "text-ink"}`}>
                  <input type="checkbox" checked={d.discuss} onChange={(e) => set("discuss", e.target.checked)} className="size-5 accent-[#c2410c]" />
                  I would rather discuss it on the call
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className={label}>Your name</label>
                  <input id={`${id}-name`} autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} onKeyDown={onEnter} aria-invalid={error.includes("name") || undefined} className={field} />
                </div>
                <div>
                  <label htmlFor={`${id}-biz`} className={label}>
                    Business name <span className={dark ? "text-white/60" : "text-muted"}>(optional)</span>
                  </label>
                  <input id={`${id}-biz`} autoComplete="organization" value={d.business} onChange={(e) => set("business", e.target.value)} onKeyDown={onEnter} className={field} />
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className={label}>Email</label>
                  <input id={`${id}-email`} type="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} onKeyDown={onEnter} aria-invalid={error.includes("email") || undefined} className={field} />
                </div>
                <div>
                  <label htmlFor={`${id}-phone`} className={label}>
                    WhatsApp or phone <span className={dark ? "text-white/60" : "text-muted"}>(optional)</span>
                  </label>
                  <input id={`${id}-phone`} type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} onKeyDown={onEnter} placeholder="+91" className={field} />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className={label}>How should we reply?</legend>
                  <div className="flex flex-wrap gap-2">
                    {contactWays.map((t) => (
                      <button key={t} type="button" aria-pressed={d.via === t} onClick={() => set("via", t)} className={pill(d.via === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
          </div>
        </motion.fieldset>
      </AnimatePresence>

      <p role="alert" className="mt-4 min-h-5 text-[0.85rem] font-medium text-[#b4234a]">
        {error}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className={`inline-flex h-12 items-center gap-2 rounded-full px-5 text-[0.9rem] font-medium ring-1 transition-colors ${dark ? "text-white ring-white/30 hover:bg-white/10" : "text-ink ring-line hover:ring-ink/40"}`}>
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>
        )}
        <button
          type="submit"
          className={`inline-flex h-12 items-center gap-2 rounded-full px-7 text-[0.9rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark ? "bg-white text-ink hover:bg-wash focus-visible:outline-white" : "bg-ink-2 text-white hover:bg-brand focus-visible:outline-brand"
          }`}
        >
          {step < steps.length - 1 ? "Next" : "Get a quote"}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        {step === 2 && (
          <button type="button" onClick={() => go(3)} className={`h-12 px-2 text-[0.88rem] font-medium underline-offset-4 hover:underline ${dark ? "text-white/80" : "text-muted"}`}>
            Skip
          </button>
        )}
      </div>
      {step === steps.length - 1 && (
        <p className={`mt-3 text-[0.78rem] ${dark ? "text-white/75" : "text-muted"}`}>Opens your email app with your answers filled in; online sending is coming.</p>
      )}
    </form>
  );
}
