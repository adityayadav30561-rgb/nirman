"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { afterVisuals, beforeVisuals } from "@/components/crm-page/change-visuals";
import { problems } from "@/content/crm-page";

/*
 * "What changes" on /nirman-crm/ (docs/sections/p2-crm-page.md, redo variant
 * B, 2026-11-06: the text-only rows looked plain). A switch flips the four
 * cards between "Without a CRM" (the mess: scattered notifications, a seen
 * message, a sticky note, a spreadsheet) and "With Nirman CRM" (pieces of
 * the real CRM: inbox, auto-reply, follow-up, report). Framer Motion: the
 * switch pill slides (layoutId) and each picture cross-fades. Starts on
 * "With". Reduced motion: switches instantly. Entrance: GSAP via Reveal.
 */
const labels = ["One inbox", "Instant reply", "Follow-ups", "Reports"];

export function CrmChanges() {
  const [on, setOn] = useState(true);
  const reduce = useReducedMotion();
  const options = [
    { label: "Without a CRM", value: false },
    { label: "With Nirman CRM", value: true },
  ];
  return (
    <Reveal aria-labelledby="crm-problems-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="crm-problems-title" className="rv max-w-[34rem] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
            {problems.title}
          </h2>
          <div role="radiogroup" aria-label="Compare" className="rv relative flex self-start rounded-full bg-white p-1 ring-1 ring-line md:self-auto">
            {options.map((o) => (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={on === o.value}
                onClick={() => setOn(o.value)}
                className={`relative z-10 min-h-11 rounded-full px-5 text-[0.85rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  on === o.value ? "text-white" : "text-ink/70 hover:text-ink"
                }`}
              >
                {on === o.value && (
                  <motion.span
                    layoutId="crm-changes-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${o.value ? "bg-brand" : "bg-ink-2"}`}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {problems.items.map((p, i) => {
            const V = on ? afterVisuals[i] : beforeVisuals[i];
            return (
              <li
                key={p.after}
                className={`rv flex flex-col overflow-hidden rounded-[1.5rem] ring-1 transition-colors duration-300 ${on ? "bg-white ring-line" : "bg-[#eceef1] ring-transparent"}`}
              >
                <div className="flex h-52 items-center justify-center p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={String(on)}
                      className="flex w-full justify-center"
                      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                    >
                      <V />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-auto p-5 pt-0">
                  <p className={`text-[0.8rem] font-semibold ${on ? "text-brand" : "text-muted"}`}>{labels[i]}</p>
                  <h3 className="mt-1 text-[1rem] leading-snug font-semibold">{on ? p.after : p.before}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
