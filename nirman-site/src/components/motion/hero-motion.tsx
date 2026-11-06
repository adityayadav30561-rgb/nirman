"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/*
 * Hero motion (docs/sections/01-hero.md), GSAP.
 * Load: the calm entrance the user preferred (the first version): headline
 * from a 40% ghost, phone swings in once from the right and settles at 8deg
 * (no overshoot), subtitle and button fade in, sparks and underline draw,
 * clouds fade in; then a gentle float and slow cloud drift.
 * Scroll (ScrollTrigger, scrubbed): light parallax as the hero leaves the
 * screen: text rises a little, the phone rises and straightens, front
 * clouds move faster than back clouds.
 * Targets are the h-* classes in components/home/hero.tsx; their hidden
 * start states (gs-*) are in globals.css.
 */
export function HeroMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const draw = (targets: Element[] | NodeListOf<Element>, at: number, duration: number, stagger = 0) =>
          tl.fromTo(targets, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration, stagger, ease: "power1.out" }, at);

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(q(".h-h1"), { opacity: 0.4 }, { opacity: 1, duration: 0.4, ease: "none" }, 0);
        tl.fromTo(
          q(".h-phone"),
          { autoAlpha: 1, xPercent: 120, yPercent: 10, rotation: 20 },
          { xPercent: 0, yPercent: 0, rotation: 8, duration: 0.6, ease: "power3.out" },
          0.2,
        );
        tl.fromTo(q(".h-screen"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.35);
        tl.fromTo(q(".h-btn"), { autoAlpha: 0, backgroundColor: "#c9ced6" }, { autoAlpha: 1, duration: 0.15 }, 0.2);
        tl.to(q(".h-btn"), { backgroundColor: "#1b1f27", duration: 0.5, clearProps: "backgroundColor" }, 0.25);
        tl.fromTo(q(".h-sub"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3);
        tl.fromTo(q(".h-clouds-back, .h-clouds-front"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.1 }, 0.5);
        // sparks: three strokes 0.1 s apart, then the curl; underline; loop by the phone
        q(".h-spark").forEach((svg) => {
          const paths = svg.querySelectorAll("path");
          draw([paths[0], paths[1], paths[2]], 0.4, 0.25, 0.1);
          draw([paths[3]], 0.7, 0.4);
        });
        draw(q(".h-loop path"), 0.6, 0.8);
        draw(q(".h-under path"), 1.1, 0.2);

        // gentle float once landed, and slow cloud drift
        gsap.to(q(".h-float"), {
          y: -4,
          rotation: -2,
          duration: 0.9,
          delay: 1.4,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.to(q(".h-float"), { y: 5, rotation: -1, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
          },
        });
        q(".h-drift").forEach((el) => {
          const d = (el as HTMLElement).dataset;
          gsap.to(el, { x: Number(d.dx) || 10, duration: Number(d.t) || 9, delay: 1.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });

        // scroll parallax while the hero leaves the screen
        const scrub = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q(".h-text"), { y: -60, ease: "none", scrollTrigger: scrub });
        gsap.to(q(".h-par"), { yPercent: -10, rotation: -4, ease: "none", scrollTrigger: scrub });
        gsap.to(q(".h-clouds-back"), { y: -50, ease: "none", scrollTrigger: scrub });
        gsap.to(q(".h-clouds-front"), { y: -140, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
