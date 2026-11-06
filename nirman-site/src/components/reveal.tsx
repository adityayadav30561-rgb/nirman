"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

/**
 * Reveal-on-scroll (REFERENCE-VIDEO 4.3). Marks the element with
 * `data-reveal`, and adds `data-in` once its top is about 80% down the
 * screen (measured trigger for the Features section). CSS in globals.css
 * holds child animations (`rv-icon`, `rv-text`, `.draw`) paused in their
 * start state until then. Without JS the content simply shows (the start
 * state only applies under `html.js`).
 */
export function Reveal<T extends ElementType = "section">({
  as,
  ...props
}: { as?: T } & ComponentPropsWithoutRef<T>) {
  const Tag = (as ?? "section") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref} data-reveal="" {...props} />;
}
