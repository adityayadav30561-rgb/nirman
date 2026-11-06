"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/components/motion/gsap";

/*
 * Nirman CRM motion (docs/sections/05-crm.md), GSAP.
 * Text, once at 75%: heading lines rise out of a mask (SplitText), sentence
 * fades up, the four points stagger in, then the button.
 * Conversation, scrubbed to scroll (you read it at your own pace, it rewinds
 * if you scroll back): the plate and channel icons come in, the chat card
 * rises, the lead's message appears, typing dots, the auto-reply, typing
 * dots, Priya's reply ("Replied in 2 min"), then the lead card slides in.
 * Below the fold at load, so start states are set here.
 */
export function CrmMotion(props: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const stage = q(".c-stage")[0];

        // text block
        gsap.set(q(".c-sub, .c-point, .c-btn"), { autoAlpha: 0, y: 14 });
        const text = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
        text.to(q(".c-sub"), { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.25);
        text.to(q(".c-point"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0.4);
        text.to(q(".c-btn"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.75);
        const split = SplitText.create(q(".c-title"), {
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

        // conversation, scrubbed
        const [msg1, msg2, msg3] = q(".c-msg");
        const [typing1, typing2] = q(".c-typing");
        gsap.set(q(".c-plate"), { autoAlpha: 0, scale: 0.94 });
        gsap.set(q(".c-icon"), { autoAlpha: 0, scale: 0.5 });
        gsap.set(q(".c-chat"), { autoAlpha: 0, y: 30 });
        gsap.set([msg1, msg2, msg3], { autoAlpha: 0, y: 12 });
        gsap.set(q(".c-lead"), { autoAlpha: 0, x: -30 });
        const chat = gsap.timeline({
          defaults: { ease: "power2.out" },
          // ends when the stage's centre reaches 60% of the screen, which is
          // reachable even when this is the last section on the page
          scrollTrigger: { trigger: stage, start: "top 80%", end: "center 60%", scrub: 0.6 },
        });
        chat
          .to(q(".c-plate"), { autoAlpha: 1, scale: 1, duration: 0.6 }, 0)
          .to(q(".c-icon"), { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.15, ease: "back.out(2)" }, 0.3)
          .to(q(".c-chat"), { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
          .to(msg1, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.8)
          .set(typing1, { display: "flex" }, 1.3)
          .set(typing1, { display: "none" }, 2.0)
          .to(msg2, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.0)
          .set(typing2, { display: "flex" }, 2.5)
          .set(typing2, { display: "none" }, 3.2)
          .to(msg3, { autoAlpha: 1, y: 0, duration: 0.4 }, 3.2)
          .to(q(".c-lead"), { autoAlpha: 1, x: 0, duration: 0.6 }, 3.7);

        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
