"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * Nirman CRM motion (docs/sections/05-crm.md, redo variant C), GSAP.
 * Text, once at 75%: heading lines rise out of a mask (SplitText), badge,
 * sentence, points, button and the showcase fade up in order.
 * Scroll parallax (scrubbed, whole time the band is on screen): the window
 * drifts up slowly and the phone faster, so the two screens separate in
 * depth. Switching screens is Framer Motion (home/crm-showcase.tsx).
 */
export function CrmMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const trigger = { trigger: ref.current, start: "top 75%", once: true };
        gsap.set(q(".c-in"), { autoAlpha: 0, y: 16 });
        gsap.to(q(".c-in"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power2.out", delay: 0.2, scrollTrigger: trigger });
        const split = SplitText.create(q(".c-title"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger }),
        });
        const scrub = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(q(".c-window"), { y: 40 }, { y: -30, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(q(".c-phone"), { y: 60 }, { y: -60, ease: "none", scrollTrigger: scrub });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
