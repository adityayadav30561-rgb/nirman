"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { LogoMark } from "@/components/logo";
import { AppFrame } from "@/components/crm/app-frame";
import { DashboardScreen } from "@/components/crm/screens";
import { WindowCrop } from "@/components/crm-page/window-crop";
import { crmHero, demoHref } from "@/content/crm-page";

/*
 * /nirman-crm/ hero (docs/sections/p2-crm-page.md, variant C): ink,
 * product-launch style; the dashboard window rises out of the bottom edge
 * as you scroll. Load: calm fade-up of the text (gs-hide start state, so no
 * flash before hydration). Scroll: the window's rise and scale are scrubbed.
 */
export function CrmHero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(q(".gs-hide"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 });
        gsap.fromTo(q(".ch-win"), { y: 70, scale: 0.95 }, { y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom 55%", scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="crm-hero-title" className="overflow-hidden bg-[linear-gradient(180deg,var(--color-band-2),var(--color-band))] pt-16 text-white lg:pt-24">
      <div className="container-page">
        <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
          <p className="gs-hide inline-flex items-center gap-2 rounded-full bg-white/12 py-1 pr-3.5 pl-1 text-[0.8rem] font-medium">
            <LogoMark className="size-6" tone="light" />
            {crmHero.eyebrow}
          </p>
          <h1 id="crm-hero-title" className="gs-hide mt-6 text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
            {crmHero.title}
          </h1>
          <p className="gs-hide mt-5 max-w-[40rem] text-[1.05rem] text-white/85">{crmHero.line}</p>
          <a
            href={demoHref}
            className="gs-hide mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {crmHero.cta}
          </a>
          <ul className="gs-hide mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.85rem] text-white/85">
            {crmHero.facts.map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check className="size-4 text-white" strokeWidth={2.6} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="ch-win mx-auto mt-14 max-w-[70rem] [mask-image:linear-gradient(180deg,#000_72%,transparent)]">
          <p className="sr-only">The Nirman CRM dashboard: new leads this week, first reply time, follow-ups due, leads per week and where leads come from.</p>
          <div className="hidden md:block">
            <AppFrame active="dashboard">
              <DashboardScreen />
            </AppFrame>
          </div>
          <div className="pb-12 md:hidden">
            <WindowCrop view="dashboard" />
          </div>
        </div>
      </div>
    </section>
  );
}
