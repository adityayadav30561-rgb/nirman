"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * Motion for the homepage's two proof sections, Selected work and Results
 * (docs/sections/09-work.md, 06-results.md round 2). GSAP only.
 * - .p-spark draws, .p-title lines rise out of a mask, .p-sub fades up.
 * - .p-rv: fades up when it scrolls into view (batched, in order).
 * - [data-count]: the figure counts up from zero once, keeping its sign,
 *   commas, decimals and unit; the final text is the one in the HTML.
 * - .p-wipe: wipes in left to right (the real Search Console chart).
 * - .p-pin + .p-track (wide screens that are tall enough): the section pins
 *   and the row of cards moves sideways as the page scrolls (about two
 *   thirds of a pixel of scroll per pixel of row); .p-bar fills.
 *   Everywhere else the row is a normal swipe row with scroll snap.
 * Reduced motion: nothing runs; everything is in its final state.
 */
const PIN_OK = "(prefers-reduced-motion: no-preference) and (min-width: 64rem) and (min-height: 44rem)";

export function ProofMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const head = { trigger: q(".p-head")[0] || ref.current, start: "top 80%", once: true };
        gsap.set(q(".p-spark path"), { strokeDashoffset: 1 });
        gsap.set(q(".p-sub"), { autoAlpha: 0, y: 12 });
        gsap.timeline({ scrollTrigger: head })
          .to(q(".p-spark path"), { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: "power1.out" }, 0)
          .to(q(".p-sub"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 0.3);
        const split = SplitText.create(q(".p-title"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: head }),
        });

        const rv = q(".p-rv");
        gsap.set(rv, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(rv, { start: "top 88%", once: true, onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out", overwrite: true }) });

        (q("[data-count]") as HTMLElement[]).forEach((el) => {
          const full = el.textContent || "";
          const m = full.match(/^([^\d]*)([\d,.]+)(.*)$/);
          if (!m) return;
          const target = parseFloat(m[2].replace(/,/g, ""));
          const dec = (m[2].split(".")[1] || "").length;
          const show = (v: number) => `${m[1]}${v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: m[2].includes(",") })}${m[3]}`;
          const o = { v: 0 };
          el.textContent = show(0);
          gsap.to(o, { v: target, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => (el.textContent = show(o.v)), onComplete: () => (el.textContent = full) });
        });

        (q(".p-wipe") as HTMLElement[]).forEach((el) => {
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });

        return () => split.revert();
      });

      mm.add(PIN_OK, () => {
        const q = gsap.utils.selector(ref);
        const pin = q(".p-pin")[0] as HTMLElement | undefined;
        const track = q(".p-track")[0] as HTMLElement | undefined;
        if (!pin || !track) return;
        const dist = () => Math.max(0, track.scrollWidth - track.clientWidth);
        track.scrollLeft = 0;
        gsap.set(track, { overflowX: "visible" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: pin, start: "center center", end: () => `+=${Math.round(dist() * 0.65)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
        tl.to(track, { x: () => -dist(), ease: "none" }, 0).fromTo(q(".p-bar"), { scaleX: 0.12 }, { scaleX: 1, ease: "none" }, 0);
        return () => gsap.set(track, { clearProps: "overflowX,transform" });
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
