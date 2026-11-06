"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/*
 * Footer entrance (docs/sections/08-footer.md, reference: "logo, blurb,
 * columns and social icons fade in one after another over about 1 s as the
 * blue panel rises into place"). GSAP, once when the footer top reaches 90%
 * of the viewport. The rise is a transform only, so no layout shift; under
 * reduced motion everything is simply shown.
 */
export function FooterMotion(props: ComponentPropsWithoutRef<"footer">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q(".ft-panel"), { y: 60 });
        gsap.set(q(".ft-in"), { autoAlpha: 0, y: 14 });
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } })
          .to(q(".ft-panel"), { y: 0, duration: 0.9, ease: "power3.out" }, 0)
          .to(q(".ft-in"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 0.2);
      });
    },
    { scope: ref },
  );

  return <footer ref={ref} {...props} />;
}
