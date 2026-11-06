"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * Results entrance (docs/sections/06-results.md), GSAP, once at 75%: spark
 * draws, heading lines rise out of a mask, the sub-line fades, the tabs come
 * in one after another and the quote panel rises. Switching quotes is
 * Framer Motion (components/home/results-spotlight.tsx).
 */
export function ResultsMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q(".r-spark path"), { strokeDashoffset: 1 });
        gsap.set(q(".r-sub, .r-tab"), { autoAlpha: 0, y: 12 });
        gsap.set(q(".r-panel"), { autoAlpha: 0, y: 36 });
        const trigger = { trigger: ref.current, start: "top 75%", once: true };
        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.to(q(".r-spark path"), { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: "power1.out" }, 0)
          .to(q(".r-sub"), { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3)
          .to(q(".r-tab"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, 0.4)
          .to(q(".r-panel"), { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.5);
        const split = SplitText.create(q(".r-title"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 105, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
