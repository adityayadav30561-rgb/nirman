import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/home/service-icons";
import { serviceLines, servicesIntro } from "@/content/services";

/*
 * "What we do" (docs/sections/03-services.md, variant D chosen per the
 * design protocol): heading on the left, an editorial list on the right, one
 * row per service. Motion measured from the reference (REFERENCE-VIDEO 4.3
 * "Features"): when the section is about 80% down the screen, each icon
 * shrinks from 2x into place, 0.1 s apart; title then line fade in as it lands.
 */

const v = (i: number, j = 0) => ({ "--i": i, "--j": j }) as CSSProperties;

export function Services() {
  return (
    <Reveal aria-labelledby="services-title" className="py-20 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
        <div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="draw mb-2 size-6 text-[#3b82f6]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path pathLength={1} d="M5 9 L10 14" style={{ "--d": "0s", "--dur": "0.15s" } as CSSProperties} />
            <path pathLength={1} d="M12 4 L13 12" style={{ "--d": "0.1s", "--dur": "0.15s" } as CSSProperties} />
          </svg>
          <h2
            id="services-title"
            className="text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink"
          >
            {servicesIntro.title}
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.7] text-muted">{servicesIntro.line}</p>
        </div>

        <ul className="border-t border-line">
          {serviceLines.map((s, i) => (
            <li
              key={s.key}
              className="grid grid-cols-[3.5rem_1fr] items-center gap-x-5 gap-y-3 border-b border-line py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6"
            >
              <ServiceIcon name={s.key} uid={`home-${s.key}`} className="rv-icon row-span-2 size-14 sm:row-span-1 sm:size-16" />
              <div>
                <h3 className="rv-text text-[1.1rem] font-semibold text-ink" style={v(i, 0)}>
                  {s.title}
                </h3>
                <p className="rv-text mt-1 max-w-[34rem] text-[0.88rem] leading-[1.6] text-muted" style={v(i, 1)}>
                  {s.line}
                </p>
              </div>
              <ButtonLink
                href={s.href}
                size="sm"
                className="rv-text col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end"
                style={v(i, 1)}
              >
                {s.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
