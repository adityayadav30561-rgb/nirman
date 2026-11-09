import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight, BatteryFull, EllipsisVertical, Lock, Plus, RotateCw, Signal, Star, Wifi, X } from "lucide-react";

/*
 * Drawing kit for the service-page artwork (docs/sections/p1-services.md,
 * redesign 2026-11-09). Pictures are realistic product mockups in their own
 * real colours (user, 2026-11-09): a chat app is green, a search page has
 * blue links, a client's site has its own brand colour. Orange and ink are
 * for the site around the pictures, not for what is inside them.
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
  blue: "bg-[#e8f0fe] text-[#1a56db]",
  red: "bg-red-50 text-red-600",
  violet: "bg-violet-50 text-violet-700",
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

export function Avatar({ children, className = "", tone = "bg-[#fdeee4] text-brand-deep" }: { children: ReactNode; className?: string; tone?: string }) {
  return <span className={`grid size-[2.2em] shrink-0 place-items-center rounded-full ${tone} ${className}`}><span className="text-[0.68em] font-semibold">{children}</span></span>;
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
export function Trend({ id, className = "", color = "#c2410c", points = [30, 27, 28, 22, 23, 17, 14, 15, 9, 4] }: { id: string; className?: string; color?: string; points?: number[] }) {
  const step = 100 / (points.length - 1);
  const d = points.map((y, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className={`an-wipe ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100 36 L0 36 Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Bars that grow up when scrolled into view. `hi` marks the highlighted bars. */
export function Bars({ values, hi = [], className = "", on = "bg-brand", off = "bg-[#f7cdb5]" }: { values: number[]; hi?: number[]; className?: string; on?: string; off?: string }) {
  return (
    <span className={`flex items-end gap-[0.35em] ${className}`}>
      {values.map((v, i) => (
        <span key={i} className={`an-bar flex-1 origin-bottom rounded-t-[0.25em] ${hi.includes(i) ? on : off}`} style={{ height: `${v}%` }} />
      ))}
    </span>
  );
}

/** Soft orange glow behind a scene. */
export function Glow({ className = "" }: { className?: string }) {
  return <span className={`pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.38),rgba(242,107,43,0))] blur-[2em] ${className}`} />;
}

/**
 * Realistic phone: dark bezel, camera island, status bar (time, signal,
 * wifi, battery). `bar` is the status-bar background class and `light`
 * makes its text white, so an app with a coloured header runs to the top.
 */
export function Phone({ className = "", depth, bar = "bg-white", light = false, children }: { className?: string; depth?: number; bar?: string; light?: boolean; children: ReactNode }) {
  return (
    <div data-depth={depth} className={`rounded-[2.1em] bg-[#0b0d10] p-[0.38em] shadow-[0_2em_4em_-1.2em_rgba(18,20,24,0.55),inset_0_0_0_1px_rgba(255,255,255,0.14)] ${className}`}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75em] bg-white text-ink">
        <div className={`relative flex h-[1.9em] shrink-0 items-center justify-between px-[1.1em] ${bar} ${light ? "text-white" : "text-ink"}`}>
          <span className="text-[0.56em] font-semibold">9:41</span>
          <span className="absolute top-[0.45em] left-1/2 h-[0.85em] w-[2.9em] -translate-x-1/2 rounded-full bg-[#0b0d10]" />
          <span className="flex items-center gap-[0.25em]"><Signal className="size-[0.62em]" strokeWidth={3} /><Wifi className="size-[0.62em]" strokeWidth={3} /><BatteryFull className="size-[0.8em]" strokeWidth={2.4} /></span>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

/** Realistic browser window: tab strip, toolbar, address bar. `fav` is the tab's favicon colour. */
export function Browser({ url, tab, fav = "#0f766e", className = "", depth, children }: { url: string; tab?: string; fav?: string; className?: string; depth?: number; children: ReactNode }) {
  return (
    <Panel depth={depth} className={`flex flex-col overflow-hidden ${className}`}>
      <div className="flex h-[2em] shrink-0 items-end gap-[0.4em] bg-[#dee1e6] px-[0.8em]">
        <span className="flex items-center gap-[0.35em] self-center pr-[0.4em]">
          <span className="size-[0.6em] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.6em] rounded-full bg-[#febc2e]" />
          <span className="size-[0.6em] rounded-full bg-[#28c840]" />
        </span>
        <span className="flex h-[1.6em] max-w-[13em] items-center gap-[0.4em] rounded-t-[0.5em] bg-white px-[0.7em]">
          <span className="size-[0.7em] shrink-0 rounded-[0.2em]" style={{ background: fav }} />
          <span className="truncate text-[0.58em] text-[#3c4043]">{tab ?? url}</span>
          <X className="size-[0.6em] shrink-0 text-[#5f6368]" />
        </span>
        <Plus className="mb-[0.45em] size-[0.7em] text-[#5f6368]" />
      </div>
      <div className="flex h-[1.9em] shrink-0 items-center gap-[0.55em] border-b border-[#e3e5e8] bg-white px-[0.8em] text-[#5f6368]">
        <ArrowLeft className="size-[0.8em]" /><ArrowRight className="size-[0.8em] opacity-40" /><RotateCw className="size-[0.72em]" />
        <span className="flex h-[1.3em] flex-1 items-center gap-[0.4em] rounded-full bg-[#f1f3f4] px-[0.7em]"><Lock className="size-[0.55em]" /><span className="text-[0.58em] text-[#202124]">{url}</span></span>
        <EllipsisVertical className="size-[0.8em]" />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </Panel>
  );
}
