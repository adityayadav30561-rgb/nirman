"use client";

/*
 * One place to register GSAP plugins (docs/DESIGN-PROTOCOL.md "Motion").
 * Import gsap, ScrollTrigger, SplitText and useGSAP from here, never from the
 * packages directly, so plugins are always registered.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Dev only: lets the browser checks seek the global timeline (ARCHITECTURE gotcha 36).
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as unknown as { __gsap?: typeof gsap; __ST?: typeof ScrollTrigger }).__gsap = gsap;
  (window as unknown as { __ST?: typeof ScrollTrigger }).__ST = ScrollTrigger;
}

/** Media query for motion; inside it, set up animations. Reduced motion gets the final state (CSS). */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
