import type { CSSProperties, ReactNode } from "react";
import { Star } from "lucide-react";

/*
 * Drawing kit for the service-page artwork (docs/sections/p1-services.md,
 * redesign 2026-11-09). Instead of whole shrunken dashboards, each picture is
 * a few large UI pieces a visitor can actually read.
 *
 * Sizing: everything inside a Scene or Vis is in em. A Scene's base size
 * follows its own width (container query units), so it scales like an image;
 * a Vis (bento tile picture) uses a clamped size so text stays readable.
 * Put font sizes on leaf elements only (em compounds when nested).
 *
 * Motion hooks read by service-motion.tsx: data-depth (scroll parallax),
 * .an-pop (pop in), .an-bar (grow up), .an-grow (grow right), .an-ring (score ring), .an-wipe (chart
 * wipes in), all started when the nearest .sv-anim scrolls into view.
 */

/** Hero picture on an em grid `w` wide; scales with its container. */
export function Scene({ w, h, className = "", children }: { w: number; h: number; className?: string; children: ReactNode }) {
  return (
    <div className={`@container ${className}`}>
      <div aria-hidden className="relative text-left select-none" style={{ aspectRatio: `${w} / ${h}`, fontSize: `${100 / w}cqw` }}>
        {children}
      </div>
    </div>
  );
}

/** Bento tile picture: readable fixed scale, shrinking a little on phones. */
export function Vis({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden className={`text-[clamp(10.5px,3.6cqw,16px)] select-none ${className}`}>
      {children}
    </div>
  );
}

const shadow = "shadow-[0_1.6em_3.2em_-1.2em_rgba(18,20,24,0.28),0_0_0_1px_rgba(5,7,12,0.05)]";

/** White card. With `depth` it drifts on scroll (parallax). */
export function Panel({ className = "", depth, style, children }: { className?: string; depth?: number; style?: CSSProperties; children: ReactNode }) {
  return (
    <div data-depth={depth} style={style} className={`rounded-[1.1em] bg-white text-ink ${shadow} ${className}`}>
      {children}
    </div>
  );
}

const tones = {
  good: "bg-emerald-50 text-emerald-700",
  warn: "bg-amber-50 text-amber-700",
  brand: "bg-[#fdeee4] text-brand-deep",
  ink: "bg-ink-2 text-white",
  soft: "bg-[#f1f3f6] text-ink/70",
} as const;

export function Tag({ tone = "soft", className = "", children }: { tone?: keyof typeof tones; className?: string; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-[0.3em] rounded-full px-[0.7em] py-[0.2em] text-[0.68em] font-medium whitespace-nowrap ${tones[tone]} ${className}`}>{children}</span>;
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[0.1em] text-[#f59e0b] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-[0.8em] fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

/** Grey placeholder text line. */
export function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-[0.45em] rounded-full bg-ink/10 ${className}`} style={{ width: w }} />;
}

export function Avatar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`grid size-[2.2em] shrink-0 place-items-center rounded-full bg-[#fdeee4] text-brand-deep ${className}`}><span className="text-[0.68em] font-semibold">{children}</span></span>;
}

/** Score ring; the arc draws when scrolled into view. */
export function Ring({ value, label, className = "", color = "#059669" }: { value: number; label?: string; className?: string; color?: string }) {
  const c = 2 * Math.PI * 16;
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      <svg viewBox="0 0 40 40" className="size-full -rotate-90">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#e9edf1" strokeWidth="3.4" />
        <circle className="an-ring" cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} data-off={c * (1 - value / 100)} data-len={c} />
      </svg>
      <span className="absolute flex flex-col items-center leading-none">
        <span className="text-[1.05em] font-semibold">{value}</span>
        {label && <span className="mt-[0.3em] text-[0.5em] text-muted">{label}</span>}
      </span>
    </span>
  );
}

/** Rising area chart; wipes in from the left when scrolled into view. */
export function Trend({ id, className = "", points = [30, 27, 28, 22, 23, 17, 14, 15, 9, 4] }: { id: string; className?: string; points?: number[] }) {
  const step = 100 / (points.length - 1);
  const d = points.map((y, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className={`an-wipe ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f26b2b" stopOpacity="0.32" />
          <stop offset="1" stopColor="#f26b2b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100 36 L0 36 Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Bars that grow up when scrolled into view. `hi` marks the highlighted bars. */
export function Bars({ values, hi = [], className = "" }: { values: number[]; hi?: number[]; className?: string }) {
  return (
    <span className={`flex items-end gap-[0.35em] ${className}`}>
      {values.map((v, i) => (
        <span key={i} className={`an-bar flex-1 origin-bottom rounded-t-[0.25em] ${hi.includes(i) ? "bg-brand" : "bg-[#f7cdb5]"}`} style={{ height: `${v}%` }} />
      ))}
    </span>
  );
}

/** Soft orange glow behind a scene. */
export function Glow({ className = "" }: { className?: string }) {
  return <span className={`pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.38),rgba(242,107,43,0))] blur-[2em] ${className}`} />;
}

/** Phone body sized in em (about 11em wide by default). */
export function Phone({ className = "", depth, children }: { className?: string; depth?: number; children: ReactNode }) {
  return (
    <div data-depth={depth} className={`rounded-[2em] bg-ink-2 p-[0.42em] shadow-[0_2em_4em_-1.2em_rgba(18,20,24,0.5),0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.62em] bg-white text-ink">
        <span className="absolute top-[0.5em] left-1/2 h-[0.8em] w-[3em] -translate-x-1/2 rounded-full bg-ink-2" />
        <div className="h-[1.9em] shrink-0" />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

/** Browser window chrome in em. */
export function Browser({ url, className = "", depth, children }: { url: string; className?: string; depth?: number; children: ReactNode }) {
  return (
    <Panel depth={depth} className={`flex flex-col overflow-hidden ${className}`}>
      <div className="flex h-[2.1em] shrink-0 items-center gap-[0.4em] border-b border-line bg-[#f7f9fb] px-[0.9em]">
        <span className="size-[0.6em] rounded-full bg-[#ff5f57]" />
        <span className="size-[0.6em] rounded-full bg-[#febc2e]" />
        <span className="size-[0.6em] rounded-full bg-[#28c840]" />
        <span className="mx-auto rounded-full bg-white px-[1.4em] py-[0.25em] ring-1 ring-line"><span className="block text-[0.62em] text-muted">{url}</span></span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </Panel>
  );
}
