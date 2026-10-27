import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { pillarCards, type PillarTone } from "@/content/home1";
import { SeoVisual } from "../services/seo";
import { WebVisual } from "../services/web";
import { SoftwareVisual } from "../services/software";
import { MarketingVisual } from "../services/marketing";
import { ButtonLink } from "../ui/button-link";

const visuals: Record<(typeof pillarCards)[number]["id"], () => ReactNode> = {
  seo: SeoVisual,
  web: WebVisual,
  software: SoftwareVisual,
  marketing: MarketingVisual,
};

// Panel colour per pillar, and which button variants read well on it.
const tones: Record<PillarTone, { panel: string; body: string; child: "tonal" | "tonalOn"; hub: "primary" | "light"; dots?: boolean }> = {
  cobalt: { panel: "bg-cobalt text-white", body: "text-white/80", child: "tonalOn", hub: "light", dots: true },
  coral: { panel: "bg-coral-soft text-ink", body: "text-ink-2", child: "tonal", hub: "primary" },
  ink: { panel: "bg-ink text-paper", body: "text-white/75", child: "tonalOn", hub: "light" },
  rose: { panel: "bg-[#f8dde6] text-ink", body: "text-ink-2", child: "tonal", hub: "primary" },
};

/**
 * Section 3: four equal pillar cards (decision C3: equal-size blocks, nothing
 * hidden). Every link is a button (docs/REDESIGN.md §3.1): three Tonal buttons
 * to the main child services and one hub button.
 */
export function Services1() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" className="display text-[clamp(2.6rem,5.2vw,4.8rem)] lg:col-span-7">
            Four ways we help you grow.
          </h2>
          <p className="max-w-[32rem] text-[1.075rem] leading-[1.65] text-ink-2 lg:col-span-5">
            One team for the website, the search traffic, the software behind it and the follow-ups after. Start with one
            service or bring them together.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-2 lg:gap-5">
          {pillarCards.map((p) => {
            const t = tones[p.tone];
            const Visual = visuals[p.id];
            return (
              <li key={p.id} className={`relative flex flex-col overflow-hidden rounded-[2rem] ${t.panel}`}>
                {t.dots && <div className="dot-grid-light absolute inset-0" aria-hidden />}
                <div className="relative px-6 pt-7 sm:px-10 sm:pt-10">
                  <h3 className="heading text-[clamp(2rem,3vw,2.9rem)]">{p.title}</h3>
                  <p className={`mt-3 max-w-[34rem] text-[1.05rem] leading-[1.6] ${t.body}`}>{p.outcome}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.children.map((c) => (
                      <ButtonLink key={c.href} href={c.href} variant={t.child} size="sm">
                        {c.label}
                      </ButtonLink>
                    ))}
                  </div>
                  <div className="mt-3">
                    <ButtonLink href={p.hub.href} variant={t.hub} size="md">
                      {p.hub.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </ButtonLink>
                  </div>
                </div>
                {/* The mockup bleeds off the bottom edge, as on the service pages. */}
                <div className="relative mt-8 min-h-[17rem] flex-1 sm:min-h-[22rem]">
                  <div className="absolute inset-x-6 top-0 sm:inset-x-10">
                    <Visual />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[0.85rem] text-ink-3">
          Interfaces on this page are design mockups with sample data. Brands inside them are concepts.
        </p>
      </div>
    </section>
  );
}
