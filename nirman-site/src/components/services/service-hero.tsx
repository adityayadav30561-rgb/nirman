import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { serviceArt } from "@/components/services/service-art";
import { Ticker } from "@/components/services/service-motion";
import type { ServicePage } from "@/content/service-pages";

/*
 * Service page hero (docs/sections/p1-services.md, redesign 2026-11-09,
 * variant C): ink band with a faint grid, headline with one phrase in the
 * accent colour and a drawn underline, Get a quote, three points; on the
 * right a picture made of large readable UI pieces that drift on scroll;
 * along the bottom an endless row of the sub-services. Motion in
 * service-motion.tsx (calm fade-up on load: gs-hide).
 */

export const heroGrid =
  "bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]";

/** Title with the accent phrase coloured and underlined. */
export function AccentTitle({ title, accent }: { title: string; accent: string }) {
  const at = title.indexOf(accent);
  if (at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="relative text-[#ff9a62]">
        {accent}
        <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-[0.14em] left-0 hidden h-[0.16em] w-full sm:block" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M3 8 C 50 2, 120 2, 197 7" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
      {title.slice(at + accent.length)}
    </>
  );
}

export function ServiceHero({ s }: { s: ServicePage }) {
  const { Scene } = serviceArt[s.slug];
  const short = s.accent.length < 12;
  return (
    <section aria-labelledby="svc-title" className="relative overflow-hidden bg-band text-white">
      <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_72%_40%,black,transparent_72%)]`} />
      <div className="container-page relative grid items-center gap-12 pt-12 pb-14 lg:grid-cols-[minmax(0,5.6fr)_minmax(0,6.4fr)] lg:gap-10 lg:pt-16 lg:pb-20">
        <div>
          <nav aria-label="Breadcrumb" className="gs-hide">
            <ol className="flex items-center gap-1.5 text-[0.8rem] text-white/60">
              <li><Link href="/services/" className="inline-flex min-h-11 items-center hover:text-white">Services</Link></li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li aria-current="page" className="text-white">{s.name}</li>
            </ol>
          </nav>
          <h1 id="svc-title" className={`gs-hide mt-3 text-[clamp(2.2rem,4.1vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.035em] ${short ? "" : "[&>span>svg]:hidden"}`}>
            <AccentTitle title={s.title} accent={s.accent} />
          </h1>
          <p className="gs-hide mt-5 max-w-[34rem] text-[1.05rem] text-white/75">{s.line}</p>
          <a
            href="#quote"
            className="gs-hide mt-8 inline-flex h-13 items-center rounded-full bg-white px-8 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#ffe3d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get a quote
          </a>
          <ul className="gs-hide mt-8 flex flex-wrap gap-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.8rem] text-white/90 ring-1 ring-white/12">
                <Check className="size-3.5 shrink-0 text-[#ff9a62]" strokeWidth={3} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Scene className="gs-hide sv-stage sv-anim" />
      </div>
      <Ticker className="relative border-t border-white/10 py-4">
        {s.included.map((x) => (
          <span key={x.title} className="flex items-center gap-6 pr-6 text-[0.9rem] whitespace-nowrap text-white/70">
            {x.title}
            <span aria-hidden className="size-1.5 rounded-full bg-[#ff9a62]" />
          </span>
        ))}
      </Ticker>
    </section>
  );
}
