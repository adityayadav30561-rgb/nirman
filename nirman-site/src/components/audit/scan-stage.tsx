"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { SitePhone } from "@/components/audit/pieces";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { CATS, type CatKey, type PageFacts, type Signal } from "@/lib/audit/types";

/*
 * The audit while it runs (docs/sections/p6-seo-audit.md, round 2). Three
 * parts that all show the same real work:
 * - the visitor's site in a phone (a sketch from its own tags, then Google's
 *   screenshot), tilting slowly inside a radar. A frame glides over the part
 *   of the page being read and a tag beside it types what was found there;
 * - a live log of every observation, with the time it was made;
 * - the six areas, each with a ring that spins while it is being checked and
 *   closes when it is done.
 * What is shown are raw observations ("signals" from /api/audit/: "Title, 65
 * characters"), never verdicts or fixes. During Google's speed test, which
 * is the long wait, the log narrates what Lighthouse is doing.
 * Motion: GSAP (tilt, radar, rings, typing) and Framer Motion (frame, tags,
 * log lines). Reduced motion: no tilt, radar or typing; the log still fills.
 */

type Zone = NonNullable<Signal["zone"]>;
/** top and height of each zone, in % of the phone's height (the sketch in pieces.tsx is laid out to match) */
const ZONES: Record<Zone, [number, number]> = { bar: [3, 8], picture: [11.5, 25], heading: [38.5, 9.5], text: [48.5, 11], button: [61, 6.5], lines: [69, 11.5], tiles: [81.5, 14], page: [2.5, 95] };
/** while Google measures, the frame moves over the real screenshot */
const LAB: { label: string; value: string; at: [number, number] }[] = [
  { label: "Lighthouse", value: "starting a simulated phone", at: [2.5, 95] },
  { label: "Network", value: "throttled to slow 4G", at: [2.5, 95] },
  { label: "Loading", value: "first paint", at: [3, 50] },
  { label: "Measuring", value: "largest element (LCP)", at: [11, 32] },
  { label: "Measuring", value: "layout shift (CLS)", at: [42, 34] },
  { label: "Measuring", value: "blocking time (TBT)", at: [2.5, 95] },
  { label: "Checking", value: "tap targets and text size", at: [58, 16] },
  { label: "Checking", value: "accessibility", at: [30, 40] },
  { label: "Checking", value: "best practices", at: [2.5, 95] },
  { label: "Chrome data", value: "28 days of real visitors", at: [2.5, 95] },
];

type Line = { id: number; t: number; label: string; value: string };
type Probe = { key: string; label: string; value: string; at: [number, number] | null };
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

/** Types its text out once (GSAP); plain text under reduced motion. */
function Typed({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const el = ref.current;
        if (!el) return;
        const o = { n: 0 };
        el.textContent = "";
        gsap.to(o, { n: text.length, duration: Math.min(0.5, 0.02 * text.length + 0.12), ease: "none", onUpdate: () => (el.textContent = text.slice(0, Math.round(o.n))), onComplete: () => (el.textContent = text) });
      });
    },
    { dependencies: [text] },
  );
  return <span ref={ref}>{text}</span>;
}

function AreaRing({ state }: { state: "wait" | "now" | "done" }) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      if (state !== "now") return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(ref.current, { rotate: 360, duration: 1.1, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      });
    },
    { dependencies: [state] },
  );
  const len = 2 * Math.PI * 10;
  return (
    <span className="relative grid size-8 shrink-0 place-items-center" aria-hidden>
      <svg ref={ref} viewBox="0 0 24 24" className="absolute inset-0 size-full -rotate-90">
        <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2.5" className="stroke-white/12" />
        {state !== "wait" && <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2.5" strokeLinecap="round" stroke={state === "done" ? "#2fbf7a" : "#ff9a62"} strokeDasharray={len} strokeDashoffset={state === "done" ? 0 : len * 0.7} className="transition-[stroke-dashoffset] duration-500" />}
      </svg>
      {state === "done" && <Check className="size-3.5 text-[#2fbf7a]" strokeWidth={3.2} />}
    </span>
  );
}

export function ScanStage({ facts, host, signals, stage, shot, speedDone, onCancel, reduce }: { facts: PageFacts | null; host: string; signals: Signal[]; stage: number; shot?: string; speedDone: boolean; onCancel: () => void; reduce: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [log, setLog] = useState<Line[]>([]);
  const [probe, setProbe] = useState<Probe | null>(null);
  const [seen, setSeen] = useState<Partial<Record<CatKey, number>>>({});
  const started = useRef(0);
  const nextId = useRef(0);
  const shown = (facts?.host || host).replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const cat = stage < CATS.length ? CATS[stage].key : null;
  const byCat = useMemo(() => Object.fromEntries(CATS.map((c) => [c.key, signals.filter((s) => s.cat === c.key)])) as Record<CatKey, Signal[]>, [signals]);

  useEffect(() => {
    started.current = Date.now();
    const t = setInterval(() => setElapsed(Math.round((Date.now() - started.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  // one observation at a time: move the frame, type the tag, add the log line
  useEffect(() => {
    const say = (label: string, value: string, at: Probe["at"], key: string) => {
      const t = Math.round((Date.now() - started.current) / 1000);
      const n = nextId.current++;
      setProbe({ key, label, value, at });
      setLog((l) => [...l.slice(-11), { id: n, t, label, value }]);
    };
    if (!cat) {
      const done = setTimeout(() => setProbe(null), 0);
      return () => clearTimeout(done);
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const waiting = !signals.length;
    const queue: { label: string; value: string; at: Probe["at"]; cat?: CatKey }[] =
      cat === "speed"
        ? speedDone
          ? [{ label: "Lighthouse", value: "done", at: [2.5, 95] }, ...(shot ? [{ label: "Screenshot", value: "captured on a phone", at: [2.5, 95] as [number, number] }] : [])]
          : LAB
        : waiting
          ? [{ label: "DNS", value: `resolving ${shown}`, at: null }, { label: "Connection", value: "opening", at: null }, { label: "Request", value: "waiting for the page", at: null }]
          : byCat[cat].map((s) => ({ label: s.label, value: s.value, at: s.zone ? ZONES[s.zone] : null, cat }));
    const gap = cat === "speed" ? (speedDone ? 700 : 2600) : waiting ? 900 : stage < 2 ? 620 : 430;
    const step = () => {
      const q = queue[i];
      if (!q) {
        // Google can take longer than the script: keep saying so, with the time
        if (cat === "speed" && !speedDone) {
          say("Lighthouse", "still measuring", [2.5, 95], `wait-${i}`);
          i++;
          timer = setTimeout(step, 5000);
        }
        return;
      }
      say(q.label, q.value, q.at, `${cat}-${i}-${waiting}`);
      if (q.cat) setSeen((s) => ({ ...s, [q.cat as CatKey]: i + 1 }));
      i++;
      timer = setTimeout(step, reduce ? Math.min(gap, 250) : gap);
    };
    timer = setTimeout(step, 60);
    return () => clearTimeout(timer);
  }, [cat, stage, signals.length, speedDone, shot, byCat, shown, reduce]);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        // Depth comes from CSS perspective on the parent and is never tweened: animating it passes through
        // near-zero values, where the phone stretches across the whole screen (seen live, 2026-11-11).
        gsap.fromTo(q(".sc-tilt"), { rotateY: -6, rotateX: 2 }, { rotateY: 6, rotateX: -1.5, duration: 5.5, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(q(".sc-sweep"), { rotate: 360, duration: 4.5, ease: "none", repeat: -1 });
        gsap.to(q(".sc-orbit-a"), { rotate: 360, duration: 9, ease: "none", repeat: -1 });
        gsap.to(q(".sc-orbit-b"), { rotate: -360, duration: 14, ease: "none", repeat: -1 });
        gsap.fromTo(q(".sc-pulse"), { scale: 0.55, opacity: 0.5 }, { scale: 1.25, opacity: 0, duration: 2.6, ease: "power1.out", repeat: -1, stagger: 1.3 });
      });
    },
    { scope: root },
  );

  const pct = Math.min(100, Math.round(((stage + (cat && byCat[cat]?.length ? (seen[cat] || 0) / byCat[cat].length : 0)) / CATS.length) * 100));
  const tagTop = probe?.at ? Math.min(86, Math.max(10, probe.at[0] + probe.at[1] / 2)) : 10;
  return (
    <motion.div ref={root} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-[76rem]">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase"><span className="relative flex size-2"><span className="sc-pulse absolute inset-0 rounded-full bg-[#ff9a62]" /><span className="relative size-2 rounded-full bg-[#ff9a62]" /></span>Auditing now</p>
          <h1 id="audit-title" className="mt-2 text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] break-words">{shown}</h1>
        </div>
        <p className="flex items-center gap-3 text-[0.85rem] text-white/60"><span className="rounded-full bg-white/8 px-3 py-1 font-medium text-white tabular-nums ring-1 ring-white/12" aria-label={`${elapsed} seconds elapsed`}>{clock(elapsed)}</span><button type="button" onClick={onCancel} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Cancel</button></p>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Audit progress">
        <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#f26b2b,#ff9a62)]" animate={{ width: `${Math.max(pct, 4)}%` }} transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }} />
      </div>
      <p className="sr-only" aria-live="polite">{cat ? `Checking ${CATS[stage].label}` : "Working out your score"}</p>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)_minmax(0,19rem)] lg:gap-6">
        {/* the site */}
        <div className="relative mx-auto flex w-full max-w-[30rem] items-center justify-center py-6 [perspective:1100px] lg:order-2 lg:py-10">
          <div aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[118%] max-w-[34rem] -translate-x-1/2 -translate-y-1/2">
            {[100, 76, 52].map((d) => <span key={d} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" style={{ width: `${d}%`, height: `${d}%` }} />)}
            <span className="sc-sweep absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_318deg,rgba(242,107,43,0.12)_350deg,rgba(255,154,98,0.42)_360deg)] [mask-image:radial-gradient(closest-side,transparent_30%,black_31%,black_99%,transparent_100%)]" />
            <span className="sc-orbit-a absolute inset-0"><span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9a62] shadow-[0_0_0.8rem_#ff9a62]" /></span>
            <span className="sc-orbit-b absolute inset-[12%]"><span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/70" /></span>
            <span className="sc-pulse absolute inset-[24%] rounded-full border border-[#ff9a62]/50" /><span className="sc-pulse absolute inset-[24%] rounded-full border border-[#ff9a62]/50" />
            <span className="absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.3),transparent)]" />
          </div>

          <div className="sc-tilt relative w-[12.5rem] sm:w-[14.5rem]" style={{ transformStyle: "preserve-3d" }}>
            <SitePhone facts={facts} screenshot={shot} scanning={!!cat} />
            {/* the frame over the part being read */}
            <AnimatePresence>
              {probe?.at && cat && (
                <motion.div key="frame" aria-hidden className="pointer-events-none absolute right-[5%] left-[5%] rounded-[0.5rem] border-[1.5px] border-[#ff9a62] bg-[#ff9a62]/10 shadow-[0_0_1.2rem_rgba(242,107,43,0.55)]" initial={{ opacity: 0, top: `${probe.at[0]}%`, height: `${probe.at[1]}%` }} animate={{ opacity: 1, top: `${probe.at[0]}%`, height: `${probe.at[1]}%` }} exit={{ opacity: 0 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 24 }}>
                  {["-top-[3px] -left-[3px] border-t-2 border-l-2", "-top-[3px] -right-[3px] border-t-2 border-r-2", "-bottom-[3px] -left-[3px] border-b-2 border-l-2", "-right-[3px] -bottom-[3px] border-r-2 border-b-2"].map((c) => <span key={c} className={`absolute size-2.5 border-white ${c}`} />)}
                </motion.div>
              )}
            </AnimatePresence>
            {/* the tag: what was found there. One tag that glides with the frame; only its words change. */}
            <AnimatePresence>
              {probe && cat && (
                <motion.div key="tag" aria-hidden className="pointer-events-none absolute left-full z-10 hidden items-center sm:flex" initial={{ opacity: 0, top: `${tagTop}%` }} animate={{ opacity: 1, top: `${tagTop}%` }} exit={{ opacity: 0 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 24 }}>
                  <span className="h-px w-4 bg-[#ff9a62] lg:w-6" />
                  <span className="-translate-y-1/2 rounded-xl bg-white px-3 py-2 text-ink shadow-[0_1rem_2rem_-0.75rem_rgba(0,0,0,0.7)]">
                    <span className="block text-[0.58rem] font-semibold tracking-[0.08em] whitespace-nowrap text-brand uppercase">{probe.label}</span>
                    <span className="block max-w-[10rem] truncate text-[0.78rem] font-medium whitespace-nowrap"><Typed text={probe.value} /></span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.7rem] whitespace-nowrap text-white/45">{shot ? "Screenshot from Google Lighthouse" : facts ? "Sketch from the page's own tags" : "Connecting"}</p>
        </div>

        {/* the log */}
        <div className="rounded-[1.25rem] bg-black/30 p-4 ring-1 ring-white/10 lg:order-1">
          <p className="flex items-center justify-between text-[0.7rem] font-semibold tracking-[0.08em] text-white/50 uppercase">Audit log<span className="flex gap-1"><span className="size-1.5 rounded-full bg-white/20" /><span className="size-1.5 rounded-full bg-white/20" /><span className="size-1.5 rounded-full bg-[#2fbf7a]" /></span></p>
          <ol className="mt-3 flex h-[8.5rem] flex-col justify-end gap-1.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_35%)] lg:h-[19rem]" aria-hidden>
            <AnimatePresence initial={false}>
              {log.map((l) => (
                <motion.li key={l.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex gap-2.5 text-[0.76rem] leading-snug">
                  <span className="w-7 shrink-0 text-white/35 tabular-nums">{clock(l.t)}</span>
                  <span className="min-w-0"><span className="text-white/55">{l.label} </span><span className="font-medium break-words text-white">{l.value}</span></span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>

        {/* the six areas */}
        <ol className="grid grid-cols-2 gap-2 lg:order-3 lg:grid-cols-1">
          {CATS.map((c, i) => {
            const state = i < stage ? "done" : i === stage ? "now" : "wait";
            const total = byCat[c.key]?.length || 0;
            return (
              <li key={c.key} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 transition-colors duration-300 ${state === "now" ? "bg-white/10 ring-[#ff9a62]/60" : state === "done" ? "bg-white/4 ring-white/10" : "ring-white/8"}`}>
                <AreaRing state={state} />
                <span className="min-w-0">
                  <span className={`block truncate text-[0.82rem] leading-tight ${state === "wait" ? "text-white/45" : "font-medium text-white"}`}>{c.label}</span>
                  <span className="block text-[0.68rem] text-white/45">
                    {state === "done" ? "checked" : state === "wait" ? "waiting" : c.key === "speed" ? "Google is measuring" : total ? `reading ${Math.min(seen[c.key] || 0, total)} of ${total}` : "connecting"}
                    <span className="sr-only">{state === "done" ? " done" : state === "now" ? " in progress" : ""}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-6 min-h-5 text-center text-[0.85rem] text-white/60">
        {!cat ? "Working out your score" : cat === "speed" && !speedDone ? "Google is loading the site on a simulated phone. This is the slow part: up to a minute." : probe ? <span className="sm:hidden">{probe.label}: {probe.value}</span> : null}
      </p>
    </motion.div>
  );
}
