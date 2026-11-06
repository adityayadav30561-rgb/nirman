"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * "What we do" motion (docs/sections/03-services.md), GSAP.
 * Heading block (when its top reaches 80% of the screen): spark draws, the
 * heading's lines rise out of a mask (SplitText, re-split on resize), the
 * supporting line fades up.
 * Rows (ScrollTrigger.batch, each once at 85%): the divider draws left to
 * right, the icon flips in (3D, rotationY -75 to 0 with a little back
 * ease), title and line fade up, then the button. 0.12 s between rows that
 * enter together.
 * The section starts below the fold, so start states are set here (no flash).
 */
export function ServicesMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);

        // heading block
        gsap.set(q(".s-spark path"), { strokeDashoffset: 1 });
        gsap.set(q(".s-sub"), { autoAlpha: 0, y: 10 });
        const split = SplitText.create(q(".s-title"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: q(".s-head")[0], start: "top 80%", once: true },
            }),
        });
        const head = gsap.timeline({ scrollTrigger: { trigger: q(".s-head")[0], start: "top 80%", once: true } });
        head.to(q(".s-spark path"), { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: "power1.out" }, 0);
        head.to(q(".s-sub"), { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3);

        // rows
        gsap.set(q(".s-line"), { scaleX: 0, transformOrigin: "left center" });
        gsap.set(q(".s-icon"), { autoAlpha: 0, rotationY: -75, scale: 0.7, transformPerspective: 600 });
        gsap.set(q(".s-text, .s-btn"), { autoAlpha: 0, y: 16 });
        ScrollTrigger.batch(q(".s-row"), {
          start: "top 85%",
          once: true,
          onEnter: (rows) =>
            rows.forEach((row, i) => {
              const r = gsap.utils.selector(row);
              gsap
                .timeline({ delay: i * 0.12 })
                .to(r(".s-line"), { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
                .to(r(".s-icon"), { autoAlpha: 1, rotationY: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 0.1)
                .to(r(".s-text"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 0.2)
                .to(r(".s-btn"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.35);
            }),
        });

        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
