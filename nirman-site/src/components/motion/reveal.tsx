"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/*
 * Generic section entrance (GSAP, once at 80%): every `.rv` child fades up
 * 18px in order. Used by inner-page sections that need nothing richer.
 * Reduced motion: shown as is.
 */
export function Reveal({ as: Tag = "section", ...props }: ComponentPropsWithoutRef<"section"> & { as?: "section" | "div" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const items = q(".rv");
        if (!items.length) return;
        gsap.set(items, { autoAlpha: 0, y: 18 });
        gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      });
    },
    { scope: ref },
  );
  return <Tag ref={ref as never} {...props} />;
}
