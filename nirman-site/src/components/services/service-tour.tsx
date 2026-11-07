"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { ShotCrop } from "@/components/services/shot-crop";
import { tourShots } from "@/components/services/service-screens";
import type { ServicePage } from "@/content/service-pages";

/*
 * "What is included" as a sticky story (docs/sections/p1-services.md, redo
 * 2026-11-07), the pattern of the Nirman CRM feature tour: each sub-service's
 * text scrolls past on the left while the window on the right switches to
 * its real screen (ScrollTrigger toggles, Framer cross-fade, position dots).
 * Below 1024px each item shows its own screen (crop).
 */
export function ServiceTour({ s }: { s: ServicePage }) {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const shots = tourShots[s.slug];
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const sts = q(".st-step").map((el: Element, k: number) =>
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (t) => t.isActive && setI(k) }),
      );
      return () => sts.forEach((t: ScrollTrigger) => t.kill());
    },
    { scope: ref },
  );
  return (
    <section ref={ref} aria-labelledby="svc-inc" className="py-20 lg:py-28">
      <div className="container-page">
        <h2 id="svc-inc" className="max-w-[36rem] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
          What is included
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <ol>
            {s.included.map((x, k) => (
              <li key={x.title} className={`st-step flex flex-col justify-center py-6 transition-opacity duration-300 lg:min-h-[60vh] ${k === i ? "" : "lg:opacity-40"}`}>
                <p className="text-[0.8rem] font-semibold text-brand">{String(k + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.02em]">{x.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{x.line}</p>
                <div className="mt-5 lg:hidden">
                  <ShotCrop shot={shots[k]} height={280} />
                </div>
              </li>
            ))}
          </ol>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-17rem)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                >
                  {shots[i].window()}
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
                {s.included.map((x, k) => (
                  <span key={x.title} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-brand" : "w-1.5 bg-ink/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
