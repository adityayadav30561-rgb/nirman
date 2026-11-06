"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { AppFrame } from "@/components/crm/app-frame";
import { crmScreens } from "@/components/crm/screen-map";
import { WindowCrop } from "@/components/crm-page/window-crop";
import { features } from "@/content/crm-page";

/*
 * Feature tour (docs/sections/p2-crm-page.md, variant B): a sticky story.
 * From 1024px each feature's text scrolls past on the left while the window
 * on the right switches to that screen (ScrollTrigger toggles, Framer
 * cross-fade) with dots showing the position. Below 1024px each feature
 * shows its own readable crop. Reduced motion: switches without the fade.
 */
export function CrmTour() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const sts = q(".tb-step").map((el: Element, k: number) =>
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setI(k) }),
      );
      return () => sts.forEach((s: ScrollTrigger) => s.kill());
    },
    { scope: ref },
  );
  const f = features[i];
  const S = crmScreens[f.key];

  return (
    <section ref={ref} id="features" aria-labelledby="crm-tour-title" className="py-20 lg:py-28">
      <div className="container-page">
        <h2 id="crm-tour-title" className="max-w-[40rem] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
          Everything your team needs to win more enquiries
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <ol>
            {features.map((t, k) => (
              <li key={t.key} className={`tb-step flex flex-col justify-center py-6 transition-opacity duration-300 lg:min-h-[60vh] ${k === i ? "" : "lg:opacity-40"}`}>
                <p className="text-[0.8rem] font-semibold text-brand">
                  {String(k + 1).padStart(2, "0")} · {t.label}
                </p>
                <h3 className="mt-2 text-[1.45rem] leading-snug font-semibold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{t.line}</p>
                <ul className="mt-4 flex flex-col gap-1.5 text-[0.9rem]">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 lg:hidden">
                  <WindowCrop view={t.key} height={280} />
                </div>
              </li>
            ))}
          </ol>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-17rem)]">
              <p className="sr-only" aria-live="polite">
                Showing the Nirman CRM {f.label} screen.
              </p>
              <AppFrame active={f.key}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={f.key}
                    className="h-full"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  >
                    <S />
                  </motion.div>
                </AnimatePresence>
              </AppFrame>
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
                {features.map((t, k) => (
                  <span key={t.key} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-brand" : "w-1.5 bg-ink/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
