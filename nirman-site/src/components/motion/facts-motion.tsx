"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/*
 * Facts band motion (docs/sections/02-facts.md), GSAP + ScrollTrigger, plays
 * once when the band's top reaches 92% of the screen (on most desktops that
 * is on load, right under the hero): the blue band wipes open from the left,
 * the heading fades up, the figures rise out of a mask 0.08 s apart, then
 * the labels. The band's clipped start state is CSS (`gs-clip-x`, html.js
 * only) so it never flashes before hydration.
 */
export function FactsMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q(".f-head > *, .f-label"), { autoAlpha: 0, y: 8 });
        gsap.set(q(".f-num"), { yPercent: 110 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 92%", once: true } });
        tl.fromTo(ref.current, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" });
        tl.to(q(".f-head > *"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.45);
        tl.to(q(".f-num"), { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.5);
        tl.to(q(".f-label"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.7);
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
