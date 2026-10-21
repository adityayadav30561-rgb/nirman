"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check, Search } from "lucide-react";
import type { ServiceContent } from "@/content/services";
import { Photo } from "./photo";

type Accent = { dot: string; text: string; soft: string; check: string; bar: string };

/**
 * "Who it's for": one tab per kind of business. Desktop shows a vertical tab
 * list beside a large photo with what their customers search and what
 * changes; phones get a swipeable row of cards with the same content.
 */
export function ServiceAudience({ segments, accent }: { segments: ServiceContent["segments"]; accent: Accent }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = segments.length;

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + n) % n;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="audience-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id="audience-title" className="display text-[clamp(2.4rem,5vw,4.4rem)] lg:col-span-7">
            Who it&rsquo;s for
          </h2>
          <p className="max-w-[30rem] text-[1.05rem] leading-[1.6] text-ink-2 lg:col-span-5">
            The businesses we do this for most often. Pick the one closest to yours to see what changes.
          </p>
        </div>

        {/* Desktop: tabs + photo panel */}
        <div className="mt-10 grid-cols-12 gap-x-10 max-lg:hidden lg:grid">
          <div role="tablist" aria-orientation="vertical" aria-label="Kinds of business" className="col-span-5 flex flex-col" onKeyDown={onKey}>
            {segments.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`aud-tab-${i}`}
                  aria-selected={on}
                  aria-controls="aud-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative border-t border-ink/10 py-6 pl-8 pr-4 text-left transition-colors last:border-b ${on ? "" : "hover:bg-paper-2/60"}`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1 rounded-full transition-[background-color,opacity] ${on ? `${accent.bar} opacity-100` : "opacity-0"}`}
                    aria-hidden
                  />
                  <span className="flex items-baseline gap-4">
                    <span className={`title text-[0.95rem] tnum ${on ? accent.text : "text-ink-3"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`heading text-[clamp(1.4rem,1.9vw,2rem)] leading-tight transition-colors ${on ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`}>
                      {s.title}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[30rem] pl-[2.6rem] pt-3 text-[1.02rem] leading-[1.6] text-ink-2">{s.problem}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="aud-panel" role="tabpanel" aria-labelledby={`aud-tab-${active}`} className="relative col-span-7 min-h-[36rem] overflow-hidden rounded-[2.5rem] bg-ink">
            {segments.map((s, i) => (
              <div
                key={s.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
              >
                <Photo name={s.photo} sizes="(min-width: 1024px) 55vw, 1px" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden />
            <SearchChip text={segments[active].search} className="absolute left-7 top-7" />
            <Outcomes key={active} outcomes={segments[active].outcomes} accent={accent} className="anim-pop absolute inset-x-7 bottom-7 max-w-[30rem]" />
          </div>
        </div>

        {/* Phones and tablets: swipeable cards */}
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:hidden" aria-label="Kinds of business">
          {segments.map((s) => (
            <li key={s.title} className="w-[85%] shrink-0 snap-start sm:w-[60%]">
              <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-panel">
                <div className="relative aspect-[4/3]">
                  <Photo name={s.photo} sizes="(min-width: 640px) 60vw, 85vw" />
                  <SearchChip text={s.search} className="absolute inset-x-4 bottom-4 w-fit max-w-[calc(100%-2rem)]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="heading text-[1.5rem] leading-tight">{s.title}</h3>
                  <p className="mt-3 leading-[1.6] text-ink-2">{s.problem}</p>
                  <Outcomes outcomes={s.outcomes} accent={accent} className="mt-5" flat />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SearchChip({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`rounded-2xl bg-surface/95 px-4 py-3 shadow-scene backdrop-blur ${className}`}>
      <p className="text-[0.75rem] text-ink-3">Their customers search</p>
      <p className="mt-1 flex items-center gap-2 text-[0.95rem] font-medium">
        <Search className="size-4 shrink-0 text-ink-3" aria-hidden />
        <span className="truncate">{text}</span>
      </p>
    </div>
  );
}

function Outcomes({
  outcomes,
  accent,
  className = "",
  flat = false,
}: {
  outcomes: string[];
  accent: Accent;
  className?: string;
  flat?: boolean;
}) {
  return (
    <div className={`${flat ? "" : "rounded-[1.5rem] bg-surface/95 p-6 shadow-scene backdrop-blur"} ${className}`}>
      <p className={`text-[0.85rem] font-medium ${accent.text}`}>What changes</p>
      <ul className="mt-3 space-y-2.5">
        {outcomes.map((o) => (
          <li key={o} className="flex items-start gap-3 leading-snug">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${accent.check}`}>
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
