import Link from "next/link";
import { ArrowRight, Building2, Factory, GraduationCap, Hotel, Landmark, ShoppingBag, Stethoscope, Wrench, type LucideIcon } from "lucide-react";
import { industries } from "@/content/home1";
import { ButtonLink } from "../ui/button-link";

const icons: Record<(typeof industries)[number]["icon"], LucideIcon> = {
  building: Building2,
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  bag: ShoppingBag,
  factory: Factory,
  hotel: Hotel,
  landmark: Landmark,
  wrench: Wrench,
};
const tones = [
  "bg-cobalt-soft text-cobalt",
  "bg-mint-soft text-forest",
  "bg-marigold-soft text-[#9a6510]",
  "bg-coral-soft text-coral-2",
  "bg-peacock-soft text-peacock",
  "bg-lilac-soft text-[#5b45b8]",
  "bg-[#f8dde6] text-[#b23f69]",
  "bg-paper-2 text-ink-2",
];

/**
 * Section 7: route visitors by sector. Each tile is one button (the whole
 * tile links) with an arrow chip as the visible affordance. Links go to the
 * existing industries page until the eight sector pages are built.
 */
export function Industries1() {
  return (
    <section aria-labelledby="industries-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="industries-title" className="display text-[clamp(2.6rem,5.2vw,4.8rem)] lg:col-span-7">
            Built for how your industry sells.
          </h2>
          <div className="lg:col-span-5 lg:justify-self-end">
            <ButtonLink href="/industries/" variant="secondary" size="md">
              All industries
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
          {industries.map((ind, i) => {
            const Icon = icons[ind.icon];
            return (
              <li key={ind.slug}>
                <Link
                  href={`/industries/#${ind.slug}`}
                  className="group flex h-full min-h-[11rem] flex-col rounded-[1.75rem] bg-surface p-6 shadow-panel ring-1 ring-ink/6 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className={`grid size-12 place-items-center rounded-2xl ${tones[i]}`}>
                    <Icon className="size-5.5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="title mt-5 block text-[1.2rem]">{ind.title}</span>
                  <span className="mt-1.5 block flex-1 text-[0.95rem] leading-[1.5] text-ink-2">{ind.need}</span>
                  <span className="mt-4 grid size-10 place-items-center self-end rounded-full bg-ink/[0.07] transition-colors group-hover:bg-ink group-hover:text-paper">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
