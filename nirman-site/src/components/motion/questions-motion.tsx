"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * Questions entrance (docs/sections/07-questions.md), GSAP, once at 75%: the
 * orange spark draws, heading lines rise out of a mask, the sentence and the
 * email field fade up, then the question rows follow with a short stagger
 * (reference: input and rows fade in one after another). Opening a row is
 * Framer Motion (components/home/question-list.tsx).
 */
export function QuestionsMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q(".q-spark path"), { strokeDashoffset: 1 });
        gsap.set(q(".q-in, .q-row"), { autoAlpha: 0, y: 14 });
        const trigger = { trigger: ref.current, start: "top 75%", once: true };
        gsap
          .timeline({ scrollTrigger: trigger })
          .to(q(".q-spark path"), { strokeDashoffset: 0, duration: 0.3, stagger: 0.08, ease: "power1.out" }, 0)
          .to(q(".q-in"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.3)
          .to(q(".q-row"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 0.45);
        const split = SplitText.create(q(".q-title"), {
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
