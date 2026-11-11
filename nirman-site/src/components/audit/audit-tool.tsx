"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, CircleAlert, Download, LoaderCircle, RotateCcw, Search, X } from "lucide-react";
import { CatBars, ReportPreview, ScoreRing, SitePhone } from "@/components/audit/pieces";
import { Trap } from "@/lib/lead";
import { CATS, STAGE_CHECKS, verdictOf, type PageFacts, type Summary } from "@/lib/audit/types";

/*
 * The free SEO audit, in the page's hero (docs/sections/p6-seo-audit.md).
 * Three phases:
 * - idle: the address box.
 * - scanning: the visitor's own site in a phone under a scan beam, with the
 *   six areas ticking off. Step 1 (/api/audit/) reads the site; step 2
 *   (/api/audit/finish/) runs Google's speed test, which is the long wait.
 *   When Google's screenshot arrives it replaces the sketch in the phone.
 * - done: the score, the score by area, and the PDF behind a short form
 *   (name optional, email, phone). The findings only exist in the PDF; the
 *   browser holds them sealed.
 * Motion: Framer Motion between phases and for the dialog; GSAP in pieces.tsx.
 */

type Phase = "idle" | "scanning" | "done";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const post = async (path: string, body: unknown) => {
  try {
    const res = await fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    return { res, data: res.headers.get("content-type")?.includes("json") ? ((await res.json()) as Record<string, unknown>) : null };
  } catch {
    return { res: null, data: null };
  }
};
const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } };

export function AuditTool() {
  const id = useId();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [facts, setFacts] = useState<PageFacts | null>(null);
  const [stage, setStage] = useState(0);
  const [shot, setShot] = useState<string | undefined>();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [sealed, setSealed] = useState("");
  const [dialog, setDialog] = useState(false);
  const run = useRef(0);
  const top = useRef<HTMLDivElement>(null);

  // ?url=example.com in the address pre-fills the box (links from elsewhere on the site)
  useEffect(() => {
    const given = new URLSearchParams(window.location.search).get("url");
    if (!given) return;
    const frame = requestAnimationFrame(() => setUrl(given.slice(0, 200)));
    return () => cancelAnimationFrame(frame);
  }, []);

  const start = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const address = url.trim();
      if (!/^(https?:\/\/)?[^\s/.]+\.[^\s]{2,}$/i.test(address)) return setError("Enter your website address, like yourbusiness.com.");
      const me = ++run.current;
      const alive = () => run.current === me;
      const pace = reduce ? 0.25 : 1;
      setError("");
      setFacts(null);
      setShot(undefined);
      setSummary(null);
      setStage(0);
      setPhase("scanning");
      top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

      const first = await post("/api/audit/", { url: address });
      if (!alive()) return;
      if (!first.data?.ok) {
        setPhase("idle");
        return setError(String(first.data?.error || "We could not reach the audit service. Please try again."));
      }
      setFacts(first.data.facts as PageFacts);
      const finishing = post("/api/audit/finish/", { ticket: first.data.ticket });
      await wait(1700 * pace);
      if (!alive()) return;
      setStage(1);
      await wait(1900 * pace);
      if (!alive()) return;
      setStage(2);
      const second = await finishing;
      if (!alive()) return;
      if (!second.data?.ok) {
        setPhase("idle");
        return setError(String(second.data?.error || "The audit could not be finished. Please try again."));
      }
      const sum = second.data.summary as Summary;
      setShot(sum.screenshot);
      await wait((sum.screenshot ? 2200 : 600) * pace);
      for (const next of [3, 4, 5, 6]) {
        if (!alive()) return;
        setStage(next);
        await wait(750 * pace);
      }
      if (!alive()) return;
      setSummary(sum);
      setSealed(String(second.data.report));
      setPhase("done");
    },
    [url, reduce],
  );

  const reset = () => {
    run.current++;
    setPhase("idle");
    setError("");
    setDialog(false);
  };

  return (
    <div ref={top} className="scroll-mt-24">
      <AnimatePresence mode="wait" initial={false}>
        {phase === "idle" && (
          <motion.div key="idle" {...(reduce ? {} : fade)} className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
            <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Free tool</p>
            <h1 id="audit-title" className="mt-4 text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.035em]">Free SEO audit for your website</h1>
            <p className="mt-5 max-w-[38rem] text-[1.05rem] text-white/75">Enter your address. In about a minute you get a score out of 100 across six areas, from around 40 checks and Google&rsquo;s own speed test on a phone.</p>
            <form onSubmit={start} noValidate className="mt-9 w-full max-w-[36rem]">
              <label htmlFor={`${id}-url`} className="sr-only">Your website address</label>
              <div className="flex h-16 items-center rounded-full bg-white p-2 pl-6 text-ink ring-1 ring-white/20 transition-shadow focus-within:ring-4 focus-within:ring-[#ff9a62]/50">
                <Search className="size-5 shrink-0 text-muted" aria-hidden />
                <input id={`${id}-url`} name="url" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="yourbusiness.com" value={url} onChange={(e) => setUrl(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={`${id}-note`} className="h-full min-w-0 flex-1 bg-transparent px-3 text-[1.05rem] outline-none placeholder:text-muted" />
                <button type="submit" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink-2 px-6 text-[0.95rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  <span className="hidden sm:inline">Run the audit</span>
                  <span className="sm:hidden">Audit</span>
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
              <p id={`${id}-note`} className={`mt-3 text-[0.85rem] ${error ? "font-medium text-[#ffb89a]" : "text-white/60"}`} aria-live="polite">
                {error ? <span className="inline-flex items-center gap-1.5"><CircleAlert className="size-4" aria-hidden />{error}</span> : "No sign-up needed to see your score."}
              </p>
            </form>
          </motion.div>
        )}

        {phase === "scanning" && <Scanning key="scan" facts={facts} host={url} stage={stage} shot={shot} onCancel={reset} reduce={!!reduce} />}

        {phase === "done" && summary && (
          <motion.div key="done" {...(reduce ? {} : fade)}>
            <Result summary={summary} onAgain={reset} onDownload={() => setDialog(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{dialog && summary && <DownloadDialog summary={summary} sealed={sealed} onClose={() => setDialog(false)} reduce={!!reduce} />}</AnimatePresence>
    </div>
  );
}

function Scanning({ facts, host, stage, shot, onCancel, reduce }: { facts: PageFacts | null; host: string; stage: number; shot?: string; onCancel: () => void; reduce: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 900);
    return () => clearInterval(t);
  }, []);
  const current = CATS[Math.min(stage, CATS.length - 1)];
  const names = STAGE_CHECKS[current.key];
  const shown = (facts?.host || host).replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const pct = Math.min(100, Math.round((stage / CATS.length) * 100));
  return (
    <motion.div {...(reduce ? {} : fade)} className="mx-auto grid max-w-[60rem] items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16">
      <div className="relative mx-auto w-[13.5rem] sm:w-[15.5rem]">
        <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.28),transparent)]" />
        <SitePhone facts={facts} screenshot={shot} scanning className="relative" />
        <AnimatePresence mode="wait">
          <motion.span key={`${stage}-${tick % names.length}`} initial={reduce ? false : { opacity: 0, x: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, x: -6 }} transition={{ duration: 0.3 }} aria-hidden className={`absolute z-10 hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-medium whitespace-nowrap text-ink shadow-[0_1rem_2rem_-0.75rem_rgba(0,0,0,0.6)] sm:flex ${tick % 2 ? "top-[24%] -right-20" : "bottom-[22%] -right-14"}`}>
            <span className="size-1.5 rounded-full bg-brand" />
            {names[tick % names.length]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div>
        <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Auditing now</p>
        <h1 id="audit-title" className="mt-3 text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.03em] break-words">{shown}</h1>
        <p className="mt-2 min-h-6 text-[0.95rem] text-white/70" aria-live="polite">
          {stage >= CATS.length ? "Working out your score" : stage === 2 ? "Google is loading the site on a phone. This is the slow part: up to a minute." : `Checking: ${names[tick % names.length]}`}
        </p>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Audit progress">
          <motion.div className="h-full origin-left rounded-full bg-[#ff9a62]" animate={{ width: `${Math.max(pct, 6)}%` }} transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }} />
        </div>
        <ol className="mt-6 flex flex-col">
          {CATS.map((c, i) => {
            const state = i < stage ? "done" : i === stage ? "now" : "wait";
            return (
              <li key={c.key} className={`flex items-center gap-3 border-b border-white/10 py-3 text-[0.95rem] transition-colors ${state === "wait" ? "text-white/40" : "text-white"}`}>
                <span className={`grid size-6 shrink-0 place-items-center rounded-full ${state === "done" ? "bg-[#1f8a55]" : state === "now" ? "bg-white/10" : "ring-1 ring-white/20"}`} aria-hidden>
                  {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : state === "now" ? <LoaderCircle className={`size-4 text-[#ff9a62] ${reduce ? "" : "animate-spin"}`} /> : null}
                </span>
                <span className={state === "now" ? "font-medium" : ""}>{c.label}</span>
                <span className="sr-only">{state === "done" ? "done" : state === "now" ? "in progress" : "waiting"}</span>
              </li>
            );
          })}
        </ol>
        <button type="button" onClick={onCancel} className="mt-5 inline-flex min-h-11 items-center text-[0.85rem] text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Cancel</button>
      </div>
    </motion.div>
  );
}

function Result({ summary, onAgain, onDownload }: { summary: Summary; onAgain: () => void; onDownload: () => void }) {
  const { facts, overall, cats, totals } = summary;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
      <div>
        <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase">Your SEO audit</p>
        <h1 id="audit-title" className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.1] font-semibold tracking-[-0.03em] break-words">{facts.host}</h1>
        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <ScoreRing score={overall} tone="dark" />
          <div>
            <p className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">{verdictOf(overall)}</p>
            <p className="mt-1.5 max-w-[22rem] text-[0.95rem] text-white/70">
              {totals.fail + totals.warn === 0 ? `All ${totals.checks} checks passed.` : `${totals.checks} checks: ${totals.pass} passed, ${totals.warn} to improve${totals.fail ? ` and ${totals.fail} to fix` : ""}.`}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-[0.8rem] font-medium">
              <li className="rounded-full bg-[#1f8a55]/20 px-3 py-1 text-[#7fe0ae]">{totals.pass} passed</li>
              <li className="rounded-full bg-[#c77700]/25 px-3 py-1 text-[#ffcf7a]">{totals.warn} to improve</li>
              <li className="rounded-full bg-[#b42318]/30 px-3 py-1 text-[#ffb0a8]">{totals.fail} to fix</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 max-w-[34rem]"><CatBars cats={cats} tone="dark" /></div>
        {!summary.speedAvailable && <p className="mt-4 max-w-[34rem] text-[0.82rem] text-white/55">Google&rsquo;s speed test could not be run this time, so speed is not part of the score. Run the audit again later to include it.</p>}
      </div>

      <div className="rounded-[2rem] bg-white/6 p-6 ring-1 ring-white/12 sm:p-8">
        <ReportPreview summary={summary} className="mx-auto w-full max-w-[26rem]" />
        <h2 className="mt-6 text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">The full report is ready</h2>
        <p className="mt-2 text-[0.95rem] text-white/70">Every check for {facts.host}: what we found, why it matters and how to fix it, with what to fix first.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={onDownload} className="inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-7 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Download className="size-4.5" aria-hidden />
            Download the audit report
          </button>
          <button type="button" onClick={onAgain} className="inline-flex h-13 items-center gap-2 rounded-full px-5 text-[0.9rem] font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <RotateCcw className="size-4" aria-hidden />
            Audit another site
          </button>
        </div>
        <p className="mt-3 text-[0.78rem] text-white/55">Free PDF. We ask for your email and phone number first.</p>
      </div>
    </div>
  );
}

function DownloadDialog({ summary, sealed, onClose, reduce }: { summary: Summary; sealed: string; onClose: () => void; reduce: boolean }) {
  const id = useId();
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const [error, setError] = useState("");
  const [file, setFile] = useState<{ href: string; name: string } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const opened = useRef(0);

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    opened.current = Date.now();
    box.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !box.current) return;
      const items = [...box.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([tabindex='-1'])")];
      const first = items[0];
      const last = items[items.length - 1];
      const to = e.shiftKey && document.activeElement === first ? last : !e.shiftKey && document.activeElement === last ? first : null;
      if (to) {
        e.preventDefault();
        to.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      before?.focus();
    };
  }, [onClose]);
  useEffect(() => () => void (file && URL.revokeObjectURL(file.href)), [file]);

  const save = (href: string, name: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const f = e.currentTarget;
    const d = new FormData(f);
    const email = String(d.get("email") || "").trim();
    const phone = String(d.get("phone") || "").trim();
    const bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? (["email", "Please enter a valid email address."] as const) : phone.replace(/\D/g, "").length < 8 ? (["phone", "Please enter your phone number."] as const) : null;
    if (bad) {
      setError(bad[1]);
      (f.elements.namedItem(bad[0]) as HTMLElement).focus();
      return;
    }
    setError("");
    setState("sending");
    const res = await fetch("/api/audit/report/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ report: sealed, name: String(d.get("name") || ""), email, phone, trap: String(d.get("company_site") || ""), seconds: Math.round((Date.now() - opened.current) / 1000), page: window.location.href }) }).catch(() => null);
    if (res?.ok && res.headers.get("content-type")?.includes("pdf")) {
      const href = URL.createObjectURL(await res.blob());
      const name = `seo-audit-${summary.facts.host}.pdf`;
      setFile({ href, name });
      save(href, name);
      return setState("done");
    }
    const data = res ? ((await res.json().catch(() => null)) as { error?: string } | null) : null;
    setError(data?.error || "We could not prepare the report. Please try again.");
    setState("form");
  };

  const field = "h-12 w-full rounded-xl bg-white px-4 text-[0.95rem] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-brand";
  const label = "mb-1.5 block text-[0.82rem] font-medium text-ink";
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#05070c]/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div ref={box} role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} className="relative max-h-[92svh] w-full max-w-[30rem] overflow-y-auto rounded-t-[1.75rem] bg-page p-7 text-ink shadow-[0_3rem_6rem_-2rem_rgba(0,0,0,0.7)] sm:rounded-[1.75rem] sm:p-9" initial={reduce ? false : { y: 40, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={reduce ? undefined : { y: 30, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-ink/6 hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"><X className="size-5" /></button>
        {state === "done" ? (
          <div>
            <span className="grid size-14 place-items-center rounded-full bg-[#e6f4ec] text-[#1f8a55]"><Check className="size-7" strokeWidth={2.6} aria-hidden /></span>
            <h2 id={`${id}-t`} className="mt-5 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">Your report is downloading</h2>
            <p className="mt-2 text-muted">It is a PDF named {file?.name}. If nothing happened, use the button below.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {file && <a href={file.href} download={file.name} className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-2/80 px-6 text-[0.9rem] font-medium transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><Download className="size-4" aria-hidden />Download again</a>}
              <Link href="/get-a-quote/?service=seo" className="inline-flex h-12 items-center gap-2 rounded-full bg-ink-2 px-6 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Get a quote to fix these<ArrowRight className="size-4" aria-hidden /></Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="relative">
            <Trap />
            <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase">Free report · PDF</p>
            <h2 id={`${id}-t`} className="mt-2 pr-8 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">Get the full report for {summary.facts.host}</h2>
            <p className="mt-2 text-[0.95rem] text-muted">Tell us how to reach you and the report downloads straight away.</p>
            <div className="mt-6 flex flex-col gap-4">
              <div><label htmlFor={`${id}-e`} className={label}>Email</label><input id={`${id}-e`} name="email" type="email" required autoComplete="email" placeholder="you@yourbusiness.com" className={field} /></div>
              <div><label htmlFor={`${id}-p`} className={label}>Phone or WhatsApp number</label><input id={`${id}-p`} name="phone" type="tel" required autoComplete="tel" placeholder="+91" className={field} /></div>
              <div><label htmlFor={`${id}-n`} className={label}>Your name <span className="font-normal text-muted">(optional)</span></label><input id={`${id}-n`} name="name" autoComplete="name" className={field} /></div>
            </div>
            <p className="mt-4 min-h-5 text-[0.85rem] font-medium text-brand" aria-live="polite">{error}</p>
            <button type="submit" disabled={state === "sending"} aria-busy={state === "sending" || undefined} className="mt-1 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ink-2 px-7 text-[0.95rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70">
              {state === "sending" ? <><LoaderCircle className={`size-4.5 ${reduce ? "" : "animate-spin"}`} aria-hidden />Preparing your report</> : <><Download className="size-4.5" aria-hidden />Download the report</>}
            </button>
            <p className="mt-3 text-center text-[0.76rem] text-muted">We may contact you about your audit. See our <Link href="/privacy-policy/" className="underline underline-offset-2 hover:text-ink">privacy policy</Link>.</p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
