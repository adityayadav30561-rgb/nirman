"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * "Where we work" motion (docs/sections/04-map.md), GSAP + ScrollTrigger,
 * once when the section's top reaches 75% of the screen:
 * the dotted map is revealed by a circle growing from India (SVG mask,
 * 1.4 s), India's pin drops in, an arc draws from India to each market in
 * turn and that market's pin pops in as its arc lands; meanwhile the heading
 * lines rise out of a mask, the sentence fades up and the quote bar rises
 * last. Afterwards India's pin gives a slow, small pulse.
 * Below the fold at load, so start states are set here.
 */
export function MapMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const pins = q(".m-pin");
        const arcs = q(".m-arc");
        const [india, ...markets] = pins;

        gsap.set(q(".m-reveal"), { attr: { r: 0 } });
        gsap.set(arcs, { strokeDashoffset: 1 });
        gsap.set(india, { autoAlpha: 0, y: -24 });
        gsap.set(markets, { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 100%" });
        gsap.set(q(".mp-sub, .m-bar, .mp-place"), { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
        tl.to(q(".m-reveal"), { attr: { r: 400 }, duration: 1.4, ease: "power2.inOut" }, 0);
        tl.to(india, { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.8)" }, 0.25);
        arcs.forEach((arc, i) => {
          const at = 0.6 + i * 0.25;
          tl.to(arc, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, at);
          if (markets[i]) tl.to(markets[i], { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, at + 0.65);
        });
        tl.to(q(".mp-sub"), { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.35);
        tl.to(q(".m-bar"), { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.2);
        tl.to(q(".mp-place"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.0);
        tl.call(() => {
          gsap.to(india, { scale: 1.06, transformOrigin: "50% 100%", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });

        // heading: lines rise out of a mask, re-split on resize
        const split = SplitText.create(q(".mp-title"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
