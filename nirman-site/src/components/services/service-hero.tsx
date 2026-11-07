"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { ShotCrop } from "@/components/services/shot-crop";
import { heroShots } from "@/components/services/service-screens";
import type { ServicePage } from "@/content/service-pages";

/*
 * Service page hero (docs/sections/p1-services.md, redo 2026-11-07): the
 * pattern the user chose for the Nirman CRM page. Ink band, centred
 * headline, Get a quote, three points, then a big real screen tilted back
 * that flattens as you scroll, with a phone rising at its corner. Calm load
 * fade-up (gs-hide start states); tilt and phone scrubbed.
 */
export function ServiceHero({ s }: { s: ServicePage }) {
  const ref = useRef<HTMLElement>(null);
  const shot = heroShots[s.slug];
  const Phone = shot.phone;
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(q(".gs-hide"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 });
        const st = { trigger: q(".sh-stage")[0], start: "top 90%", end: "top 25%", scrub: true };
        gsap.fromTo(q(".sh-win"), { rotateX: 14, y: 30 }, { rotateX: 0, y: 0, ease: "none", scrollTrigger: st });
        gsap.fromTo(q(".sh-phone"), { y: 90 }, { y: 0, ease: "none", scrollTrigger: { ...st, end: "top 15%" } });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} aria-labelledby="svc-title" className="overflow-hidden bg-[linear-gradient(180deg,var(--color-band-2),var(--color-band))] pt-16 pb-24 text-white lg:pt-24 lg:pb-32">
      <div className="container-page">
        <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
          <p className="gs-hide text-[0.85rem] font-semibold text-[#f6a57a]">{s.eyebrow}</p>
          <h1 id="svc-title" className="gs-hide mt-4 text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
            {s.title}
          </h1>
          <p className="gs-hide mt-5 max-w-[40rem] text-[1.05rem] text-white/85">{s.line}</p>
          <a
            href="#quote"
            className="gs-hide mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get a quote
          </a>
          <ul className="gs-hide mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.85rem] text-white/85">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="size-4 text-white" strokeWidth={2.6} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="sh-stage relative mx-auto mt-14 max-w-[70rem] [perspective:1600px]">
          <div className="sh-win hidden origin-top md:block">{shot.window()}</div>
          <div className="md:hidden">
            <ShotCrop shot={shot} />
          </div>
          {Phone && (
            <div className="sh-phone absolute -right-4 -bottom-12 hidden w-[12rem] lg:block xl:-right-12 xl:w-[13rem]">
              <Phone />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
