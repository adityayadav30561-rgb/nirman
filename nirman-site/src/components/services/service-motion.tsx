"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

/*
 * All motion for the services hub and the four service pages
 * (docs/sections/p1-services.md, redesign 2026-11-09). GSAP only.
 * - .gs-hide: calm fade-up on load (hero text and picture).
 * - .rv: fades up when it scrolls into view (batched, so a row of tiles
 *   arrives in order).
 * - [data-depth]: slow scroll parallax, deeper cards move further.
 * - .sv-anim: when it enters, its .an-pop pieces pop in, .an-bar bars grow,
 *   .an-ring arcs draw and .an-wipe charts wipe in.
 * - .sp-fill: the steps line fills as you scroll through the steps.
 * Reduced motion: nothing runs; everything is in its final state.
 */
export function ServiceMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(q(".gs-hide"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.1 });

        (q("[data-depth]") as HTMLElement[]).forEach((el) => {
          const d = parseFloat(el.dataset.depth || "0") * 26;
          gsap.fromTo(el, { y: d }, { y: -d, ease: "none", scrollTrigger: { trigger: el.closest(".sv-stage") || el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
        });

        const rv = q(".rv");
        gsap.set(rv, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(rv, { start: "top 88%", once: true, onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out", overwrite: true }) });

        (q(".sv-anim") as HTMLElement[]).forEach((box) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: box, start: "top 78%", once: true }, defaults: { ease: "power3.out" } });
          const pops = box.querySelectorAll(".an-pop");
          const bars = box.querySelectorAll(".an-bar");
          const wipes = box.querySelectorAll(".an-wipe");
          const grows = box.querySelectorAll(".an-grow");
          if (grows.length) tl.from(grows, { scaleX: 0, duration: 0.9, stagger: 0.1 }, 0.25);
          if (pops.length) tl.from(pops, { autoAlpha: 0, y: 14, scale: 0.94, duration: 0.55, stagger: 0.09 }, 0.15);
          if (bars.length) tl.from(bars, { scaleY: 0, duration: 0.7, stagger: 0.04 }, 0.25);
          if (wipes.length) tl.fromTo(wipes, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.inOut" }, 0.3);
          box.querySelectorAll<SVGCircleElement>(".an-ring").forEach((c) => {
            tl.fromTo(c, { strokeDashoffset: c.dataset.len }, { strokeDashoffset: c.dataset.off, duration: 1.1, ease: "power2.out" }, 0.3);
          });
        });

        (q(".sp-track") as HTMLElement[]).forEach((track) => {
          const st = { trigger: track, start: "top 75%", end: "bottom 55%", scrub: 0.5 };
          gsap.fromTo(track.querySelectorAll(".sp-fill-x"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
          gsap.fromTo(track.querySelectorAll(".sp-fill-y"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
        });
      });
    },
    { scope: ref },
  );
  return <div ref={ref}>{children}</div>;
}

/** Endless row (GSAP): children are repeated so the loop has no seam. Reduced motion: a still, clipped row. */
export function Ticker({ children, className = "", speed = 40 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const row = ref.current?.firstElementChild as HTMLElement | null;
        if (!row) return;
        const half = row.scrollWidth / 2;
        gsap.fromTo(row, { x: 0 }, { x: -half, duration: half / speed, ease: "none", repeat: -1 });
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
