import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/content/home";
import { ButtonLink } from "../ui/button-link";

const panels = ["bg-cobalt-soft", "bg-mint-soft", "bg-marigold-soft"];

/**
 * Section 8: three case cards. Every study here is a SAMPLE (docs/handoff.md:
 * no invented clients or results); the label stays on screen until real
 * case studies replace them.
 */
export function Work1() {
  return (
    <section aria-labelledby="work-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="display text-[clamp(2.6rem,5.2vw,4.8rem)] lg:col-span-7">
            Work that moves the numbers.
          </h2>
          <div className="lg:col-span-5 lg:justify-self-end">
            <ButtonLink href="/work/" variant="secondary" size="md">
              See all work
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {caseStudies.slice(0, 3).map((s, i) => (
            <li key={s.client} className="flex flex-col rounded-[2rem] bg-surface p-3 shadow-panel ring-1 ring-ink/6">
              <div className={`rounded-[1.5rem] p-6 ${panels[i]}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-surface/80 px-3 py-1 text-[0.8rem] text-ink-2">{s.industry}</span>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-paper">
                    Sample
                  </span>
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-3">
                  {s.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="display text-[clamp(2.2rem,3vw,3rem)] tnum">{m.value}</dd>
                      <dt className="mt-1 text-[0.85rem] leading-snug text-ink-2">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="heading text-[1.6rem]">{s.client}</h3>
                <p className="mt-2 flex-1 leading-[1.6] text-ink-2">{s.body}</p>
                <div className="mt-5">
                  <ButtonLink href="/work/" variant="tonal" size="sm">
                    View case studies
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.85rem] text-ink-3">Sample case studies. Real client work replaces them as it is published.</p>
      </div>
    </section>
  );
}
