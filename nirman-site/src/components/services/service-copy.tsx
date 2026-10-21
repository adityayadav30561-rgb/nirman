import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export type Tone = "cobalt" | "coral" | "mint" | "ink" | "marigold" | "rose";

const tones: Record<Tone, { panel: string; name: string; body: string; check: string; dark: boolean; chip: string }> = {
  cobalt: { panel: "bg-cobalt text-white", name: "text-marigold", body: "text-white/75", check: "bg-marigold text-ink", dark: true, chip: "bg-white/12 text-white" },
  coral: { panel: "bg-coral-soft text-ink", name: "text-coral-2", body: "text-ink-2", check: "bg-coral text-white", dark: false, chip: "bg-surface/70 text-ink" },
  mint: { panel: "bg-mint-soft text-ink", name: "text-forest-2", body: "text-ink-2", check: "bg-forest text-mint", dark: false, chip: "bg-surface/70 text-ink" },
  ink: { panel: "bg-ink text-white", name: "text-mint", body: "text-white/70", check: "bg-peacock text-white", dark: true, chip: "bg-white/10 text-white" },
  marigold: { panel: "bg-marigold text-ink", name: "text-ink", body: "text-ink/75", check: "bg-ink text-marigold", dark: false, chip: "bg-ink/8 text-ink" },
  rose: { panel: "bg-[#f8dde6] text-ink", name: "text-[#b23f69]", body: "text-ink-2", check: "bg-[#d9668f] text-white", dark: false, chip: "bg-surface/70 text-ink" },
};

/**
 * One service as an equal-size card in the services grid: copy on top, a
 * mockup pinned to the bottom that bleeds off the card's lower edge.
 */
export function ServiceCard({
  id,
  tone,
  icon: Icon,
  name,
  title,
  body,
  points,
  extra,
  visual,
  dots = false,
  visualAlign = "top",
}: {
  id: string;
  tone: Tone;
  icon: LucideIcon;
  name: string;
  title: string;
  body: string;
  points: string[];
  extra?: React.ReactNode;
  visual: React.ReactNode;
  dots?: boolean;
  /** "top" lets the mockup bleed off the card's bottom edge; "center" sits it in the space. */
  visualAlign?: "top" | "center";
}) {
  const t = tones[tone];
  return (
    <article id={id} className={`relative flex scroll-mt-24 flex-col overflow-hidden rounded-[2rem] ${t.panel}`}>
      {dots && <div className="dot-grid-light absolute inset-0" aria-hidden />}
      <div className="relative px-6 pt-7 sm:px-10 sm:pt-10 2xl:px-12 2xl:pt-12">
        <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.9rem] font-medium ${t.chip}`}>
          <Icon className={`size-4 ${t.name}`} strokeWidth={2} />
          {name}
        </p>
        <h3 className="heading mt-5 max-w-[36rem] text-[clamp(1.8rem,2.6vw,3rem)]">{title}</h3>
        <p className={`mt-4 max-w-[40rem] text-[1rem] leading-[1.6] 2xl:text-[1.075rem] ${t.body}`}>{body}</p>
        <ul className="mt-6 grid max-w-[40rem] gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[0.95rem] leading-snug">
              <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${t.check}`}>
                <Check className="size-3" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
        {extra}
      </div>
      {/* The mockup is positioned absolutely, so this area grows to fill the
          card (rows share one height) and simply reveals more of it. */}
      <div className="relative mt-8 min-h-[62vw] flex-1 sm:min-h-[44vw] lg:min-h-[25vw]">
        <div
          className={`absolute inset-x-6 sm:inset-x-10 2xl:inset-x-12 ${
            visualAlign === "center" ? "top-1/2 -translate-y-1/2" : "top-0"
          }`}
        >
          {visual}
        </div>
      </div>
    </article>
  );
}
