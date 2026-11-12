"use client";

import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { CATS, scoreColour, verdictOf, type CatScore, type PageFacts, type Summary } from "@/lib/audit/types";

/*
 * Visual pieces of the free SEO audit (docs/sections/p6-seo-audit.md): the
 * score ring, the score-by-area bars, the phone that shows the visitor's
 * own site, and the locked preview of the PDF report.
 */

/** The overall score: the arc draws and the number counts up once (GSAP); final state under reduced motion. */
export function ScoreRing({ score, size = "11rem", tone = "light" }: { score: number; size?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const r = 44;
  const len = 2 * Math.PI * r;
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const arc = ref.current?.querySelector(".sr-arc");
        const num = ref.current?.querySelector(".sr-num");
        if (!arc || !num) return;
        const o = { v: 0 };
        gsap.fromTo(arc, { strokeDashoffset: len }, { strokeDashoffset: len * (1 - score / 100), duration: 1.6, ease: "power3.out", delay: 0.2 });
        gsap.to(o, { v: score, duration: 1.6, ease: "power3.out", delay: 0.2, onUpdate: () => (num.textContent = String(Math.round(o.v))), onComplete: () => (num.textContent = String(score)) });
        num.textContent = "0";
      });
    },
    { scope: ref, dependencies: [score] },
  );
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Overall score: ${score} out of 100, ${verdictOf(score)}`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className={tone === "dark" ? "stroke-white/12" : "stroke-ink/8"} />
        <circle className="sr-arc" cx="50" cy="50" r={r} fill="none" strokeWidth="8" strokeLinecap="round" stroke={scoreColour(score)} strokeDasharray={len} strokeDashoffset={len * (1 - score / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden>
        <span className="sr-num text-[3.4rem] leading-none font-light tracking-[-0.05em] tabular-nums">{score}</span>
        <span className={`mt-1 text-[0.72rem] ${tone === "dark" ? "text-white/60" : "text-muted"}`}>out of 100</span>
      </div>
    </div>
  );
}

/** Score for each of the six areas; bars grow in order. */
export function CatBars({ cats, tone = "light" }: { cats: CatScore[]; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current?.querySelectorAll(".cb-fill") || [], { scaleX: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", delay: 0.5 });
      });
    },
    { scope: ref },
  );
  return (
    <ul ref={ref} className="flex flex-col gap-3.5">
      {cats.map((c) => (
        <li key={c.key}>
          <div className="flex items-baseline justify-between gap-3 text-[0.9rem]">
            <span className="font-medium">{c.label}</span>
            <span className="font-semibold tabular-nums" style={{ color: c.score === null ? undefined : scoreColour(c.score) }}>{c.score === null ? <span className={`text-[0.78rem] font-normal ${tone === "dark" ? "text-white/55" : "text-muted"}`}>not measured</span> : c.score}</span>
          </div>
          <div className={`mt-1.5 h-1.5 overflow-hidden rounded-full ${tone === "dark" ? "bg-white/10" : "bg-ink/8"}`}>
            {c.score !== null && <div className="cb-fill h-full origin-left rounded-full" style={{ width: `${Math.max(c.score, 3)}%`, background: scoreColour(c.score) }} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The audited site itself, loaded at phone width and scaled to fit. It cannot be clicked, typed into or navigate the page it sits in. */
function LiveSite({ url, host, onShown }: { url: string; host: string; onShown: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const W = 390; // a common phone width, so the site lays itself out for phones
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={`absolute inset-0 overflow-hidden bg-white transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
      {scale > 0 && (
        <iframe
          src={url}
          title={`${host}, live`}
          aria-hidden
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          loading="eager"
          scrolling="no"
          onLoad={() => {
            setLoaded(true);
            onShown();
          }}
          className="pointer-events-none origin-top-left border-0"
          style={{ width: W, height: `${100 / scale}%`, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

/**
 * The visitor's site in a phone. In order of preference:
 * 1. the live site itself in a frame, about two seconds after the audit
 *    starts, when the site allows being framed (`facts.frameable`);
 * 2. Google's screenshot, which only arrives when the speed test ends;
 * 3. until either is ready, a sketch built from the page's own title,
 *    heading, description and preview picture.
 * `onReal` reports which one is showing, for the caption.
 */
export function SitePhone({ facts, screenshot, scanning = false, className = "", onReal }: { facts: PageFacts | null; screenshot?: string; scanning?: boolean; className?: string; onReal?: (kind: "live") => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [liveShown, setLiveShown] = useState(false);
  const live = facts?.frameable ? facts.finalUrl : "";
  useGSAP(
    () => {
      if (!scanning) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(ref.current?.querySelector(".sp-beam") || null, { yPercent: -10 }, { yPercent: 1050, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      });
    },
    { scope: ref, dependencies: [scanning] },
  );
  const accent = facts?.themeColor || "#121418";
  return (
    <div ref={ref} className={`relative aspect-[9/18.5] overflow-hidden rounded-[2.2rem] border-[0.42rem] border-[#0b0d10] bg-[#0b0d10] shadow-[0_2.5rem_5rem_-2rem_rgba(0,0,0,0.6)] ${className}`}>
      <div className="relative size-full overflow-hidden rounded-[1.75rem] bg-white text-ink">
        {/* sketch of the page from its own facts */}
        <div aria-hidden className="absolute inset-0 flex flex-col">
          <div className="flex items-center gap-2 px-3 pt-7 pb-2.5" style={{ background: accent }}>
            {facts?.favicon ? (
              // eslint-disable-next-line @next/next/no-img-element -- the audited site's own icon, any host
              <img src={facts.favicon} alt="" className="size-4 rounded-[3px] bg-white object-contain" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
            ) : (
              <span className="size-4 rounded-[3px] bg-white/30" />
            )}
            <span className="truncate text-[0.6rem] font-medium text-white mix-blend-difference">{facts?.host || "your site"}</span>
            <span className="ml-auto flex flex-col gap-[3px]"><span className="h-[1.5px] w-3 rounded bg-white/70" /><span className="h-[1.5px] w-3 rounded bg-white/70" /></span>
          </div>
          {facts?.ogImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- the audited site's own preview picture, any host
            <img src={facts.ogImage} alt="" className="aspect-[1.9/1] w-full bg-[#eef1f5] object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          ) : (
            <div className="aspect-[1.9/1] w-full bg-[linear-gradient(135deg,#eef1f5,#dfe4ea)]" />
          )}
          <div className="flex flex-1 flex-col gap-2 p-3.5">
            <p className="line-clamp-3 text-[0.82rem] leading-tight font-semibold tracking-[-0.01em]">{facts?.h1 || facts?.title || " "}</p>
            <p className="line-clamp-4 text-[0.56rem] leading-relaxed text-muted">{facts?.description}</p>
            <span className="mt-1 h-6 w-24 rounded-full" style={{ background: accent, opacity: 0.9 }} />
            {[92, 80, 86, 60].map((w, i) => <span key={i} className="h-1.5 rounded-full bg-ink/8" style={{ width: `${w}%` }} />)}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <span className="aspect-[4/3] rounded-lg bg-ink/6" /><span className="aspect-[4/3] rounded-lg bg-ink/6" />
            </div>
          </div>
        </div>
        {/* the live site, when it may be framed */}
        {live && (
          <LiveSite
            url={live}
            host={facts?.host || ""}
            onShown={() => {
              setLiveShown(true);
              onReal?.("live");
            }}
          />
        )}
        {/* otherwise the real page as Google loaded it, once the speed test ends */}
        {screenshot && !liveShown && (
          // eslint-disable-next-line @next/next/no-img-element -- a data: screenshot from Google PageSpeed
          <img src={screenshot} alt={facts ? `${facts.host} on a phone` : "The site on a phone"} className="absolute inset-0 size-full object-cover object-top transition-opacity duration-700" />
        )}
        {scanning && (
          <>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(194,65,12,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(194,65,12,0.07)_1px,transparent_1px)] bg-[size:1.4rem_1.4rem]" />
            <div aria-hidden className="sp-beam absolute inset-x-0 top-0 h-[10%] bg-[linear-gradient(to_bottom,transparent,rgba(242,107,43,0.28)_70%,rgba(242,107,43,0.9))] shadow-[0_0.5rem_1.5rem_rgba(242,107,43,0.55)]" />
          </>
        )}
        <div aria-hidden className="absolute top-2 left-1/2 h-[0.9rem] w-[32%] -translate-x-1/2 rounded-full bg-[#0b0d10]" />
      </div>
    </div>
  );
}

function SkeletonPage({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`absolute aspect-[210/297] rounded-[0.5rem] bg-white p-[7%] shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.45)] ring-1 ring-black/5 ${className}`}>
      <p className="text-[0.5rem] font-semibold tracking-[0.08em] text-brand uppercase">Area</p>
      <p className="mt-1 text-[0.8rem] leading-tight font-semibold">{label}</p>
      <div className="mt-3 flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-2 border-t border-line pt-2.5">
            <span className={`h-3 w-9 shrink-0 rounded-full ${["bg-[#fde8e6]", "bg-[#fff3d6]", "bg-[#e6f4ec]", "bg-[#fff3d6]", "bg-[#e6f4ec]"][i]}`} />
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="h-2 w-[55%] rounded bg-ink/70" /><span className="h-1.5 w-[92%] rounded bg-ink/20" /><span className="h-1.5 w-[70%] rounded bg-ink/12" />
              {i < 2 && <span className="mt-0.5 h-5 w-full rounded bg-wash" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The report as a stack of pages: the cover (with the score) is sharp, the
 * pages behind it are blurred placeholders. The real findings are not in the
 * page at all until the PDF is downloaded, so there is nothing to un-blur.
 */
export function ReportPreview({ summary, className = "" }: { summary: Summary; className?: string }) {
  const { facts, overall, cats, totals } = summary;
  return (
    <div className={`relative aspect-square overflow-hidden select-none ${className}`} aria-hidden>
      <div className="pointer-events-none blur-[5px]">
        <SkeletonPage label={CATS[1].label} className="top-[11%] right-[3%] w-[54%] rotate-[7deg]" />
        <SkeletonPage label={CATS[0].label} className="top-[8%] right-[15%] w-[54%] rotate-[3deg]" />
      </div>
      <div className="absolute top-[4%] left-[3%] aspect-[210/297] w-[58%] -rotate-[2deg] overflow-hidden rounded-[0.5rem] bg-white shadow-[0_2rem_4rem_-1.5rem_rgba(18,20,24,0.55)] ring-1 ring-black/5">
        <div className="bg-band px-[8%] pt-[8%] pb-[9%] text-white">
          <p className="text-[0.46rem] font-semibold tracking-[0.1em] text-[#ff9a62] uppercase">SEO audit report</p>
          <p className="mt-1.5 truncate text-[0.95rem] leading-tight font-semibold tracking-[-0.02em]">{facts.host}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full border-[3px] text-[1.05rem] font-light" style={{ borderColor: scoreColour(overall) }}>{overall}</span>
            <span className="text-[0.56rem] leading-snug text-white/75"><b className="block text-[0.7rem] font-semibold text-white">{verdictOf(overall)}</b>{totals.pass} passed · {totals.warn + totals.fail} to act on</span>
          </div>
        </div>
        <div className="flex flex-col gap-[0.45rem] px-[8%] pt-[7%]">
          {cats.map((c) => (
            <div key={c.key}>
              <div className="flex justify-between text-[0.44rem] font-medium"><span className="truncate">{c.label}</span><span style={{ color: c.score === null ? undefined : scoreColour(c.score) }}>{c.score ?? "–"}</span></div>
              <div className="mt-[0.15rem] h-[0.2rem] rounded-full bg-ink/8"><div className="h-full rounded-full" style={{ width: `${c.score ?? 0}%`, background: c.score === null ? "transparent" : scoreColour(c.score) }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-[5%] bottom-[5%] flex items-center gap-2 rounded-full bg-ink/90 px-3.5 py-2 text-[0.72rem] font-medium text-white shadow-lg backdrop-blur">
        <Lock className="size-3.5" />
        Full findings in the PDF
      </div>
    </div>
  );
}
