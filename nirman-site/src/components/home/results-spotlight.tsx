"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { QuoteCard } from "@/components/home/quote-card";
import type { SampleQuote } from "@/content/results";

/*
 * Results spotlight (docs/sections/06-results.md, variant B): the business
 * types are tabs; the chosen sample quote shows large. WAI-ARIA tabs:
 * ArrowLeft/Right, Home, End move and select. Auto-rotates every 6 s with a
 * thin progress line under the active tab; pauses on hover, on focus and
 * while the section is off screen; off under reduced motion.
 * Framer Motion: quote cross-fade and rise, progress line.
 */
const ROTATE_S = 6;

export function ResultsSpotlight({ quotes }: { quotes: SampleQuote[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const running = !reduce && !paused && inView;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((x) => (x + 1) % quotes.length), ROTATE_S * 1000);
    return () => clearTimeout(t);
  }, [running, i, quotes.length]);

  // keep the active tab in view in the horizontal list (phones) without scrolling the page
  useEffect(() => {
    const box = list.current;
    const tab = tabs.current[i];
    if (!box || !tab || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [i, reduce]);

  const select = (k: number, focus = false) => {
    setI(k);
    if (focus) tabs.current[k]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = quotes.length - 1;
    const to = { ArrowRight: i === last ? 0 : i + 1, ArrowDown: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (to !== undefined) {
      e.preventDefault();
      select(to, true);
    }
  };

  return (
    <div
      ref={root}
      className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={list}
        role="tablist"
        aria-label="Sample reviews by type of business"
        className="-mx-6 flex gap-1 overflow-x-auto px-6 pb-2 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:[mask-image:none]"
      >
        {quotes.map((q, k) => {
          const on = k === i;
          return (
            <button
              key={q.initials}
              ref={(el) => {
                tabs.current[k] = el;
              }}
              type="button"
              role="tab"
              id={`res-tab-${k}`}
              aria-selected={on}
              aria-controls="res-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => select(k)}
              onKeyDown={onKey}
              className={`r-tab relative shrink-0 overflow-hidden rounded-2xl px-4 py-3 text-left text-[0.85rem] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
                on ? "bg-white font-semibold text-ink shadow-[0_10px_24px_-16px_rgb(5_7_12/0.4)]" : "text-muted hover:text-ink"
              }`}
            >
              {q.who}
              <span className="ml-1 font-normal text-muted">· {q.place}</span>
              {on && (
                <motion.span
                  key={`${i}-${running}`}
                  aria-hidden
                  className="absolute inset-x-4 bottom-1.5 h-0.5 origin-left rounded-full bg-brand/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: running ? 1 : 0 }}
                  transition={{ duration: running ? ROTATE_S : 0, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="res-panel"
        role="tabpanel"
        aria-labelledby={`res-tab-${i}`}
        aria-live={running ? "off" : "polite"}
        className="r-panel relative min-h-[17rem] rounded-[1.75rem] bg-white p-7 shadow-[0_24px_48px_-28px_rgb(5_7_12/0.35)] sm:p-9 lg:p-11"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteCard q={quotes[i]} size="lg" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
