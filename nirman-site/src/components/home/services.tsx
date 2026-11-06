import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/home/service-icons";
import { ServicesMotion } from "@/components/motion/services-motion";
import { serviceLines, servicesIntro } from "@/content/services";

/*
 * "What we do" (docs/sections/03-services.md, variant D chosen per the
 * design protocol): heading on the left, an editorial list on the right, one
 * row per service. Motion: GSAP in components/motion/services-motion.tsx
 * (heading lines rise out of a mask, each row's divider draws, its icon
 * flips in, text and button follow); s-* classes are its targets.
 */
export function Services() {
  return (
    <ServicesMotion aria-labelledby="services-title" className="py-20 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
        <div className="s-head">
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="s-spark draw mb-2 size-6 text-[#ea580c]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path pathLength={1} d="M5 9 L10 14" />
            <path pathLength={1} d="M12 4 L13 12" />
          </svg>
          <h2
            id="services-title"
            className="s-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink"
          >
            {servicesIntro.title}
          </h2>
          <p className="s-sub mt-4 text-[0.95rem] leading-[1.7] text-muted">{servicesIntro.line}</p>
        </div>

        <ul className="border-t border-line">
          {serviceLines.map((s) => (
            <li
              key={s.key}
              className="s-row relative grid grid-cols-[3.5rem_1fr] items-center gap-x-5 gap-y-3 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6"
            >
              {/* row divider, drawn left to right on scroll */}
              <span aria-hidden className="s-line absolute inset-x-0 bottom-0 h-px bg-line" />
              <ServiceIcon name={s.key} uid={`home-${s.key}`} className="s-icon row-span-2 size-14 sm:row-span-1 sm:size-16" />
              <div>
                <h3 className="s-text text-[1.1rem] font-semibold text-ink">{s.title}</h3>
                <p className="s-text mt-1 max-w-[34rem] text-[0.88rem] leading-[1.6] text-muted">{s.line}</p>
              </div>
              <ButtonLink href={s.href} size="sm" className="s-btn col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end">
                {s.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </ServicesMotion>
  );
}
