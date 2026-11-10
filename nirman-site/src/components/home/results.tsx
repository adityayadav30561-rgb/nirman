import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ProofHead } from "@/components/home/proof-head";
import { ProofMotion } from "@/components/motion/proof-motion";
import { homeResults } from "@/content/home-proof";
import { seoCases } from "@/content/work";

/*
 * Results on the homepage (docs/sections/06-results.md round 2, variant B
 * chosen per the design protocol): real SEO figures instead of the
 * placeholder testimonials. One client leads with its figure, three more
 * figures and its real Search Console chart; the other four sit beside it,
 * each with its headline figure, source and period. Nothing is hidden behind
 * tabs. Figures come from content/work.ts and must not be rounded or renamed.
 * Motion: components/motion/proof-motion.tsx (count-up, chart wipe).
 */
export function Results() {
  const [lead, ...rest] = seoCases;
  return (
    <ProofMotion aria-labelledby="results-title" className="bg-wash py-20 lg:py-28">
      <div className="container-page">
        <ProofHead id="results-title" title={homeResults.title} line={homeResults.line}>
          <ButtonLink href="/work/seo/" variant="outline" className="group">
            All SEO projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </ButtonLink>
        </ProofHead>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <article className="p-rv flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">{lead.name}</h3>
                <span className="rounded-full bg-wash px-3 py-1 text-[0.72rem] font-semibold tracking-[0.06em] text-brand uppercase">SEO</span>
              </div>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span data-count className="text-[clamp(3.6rem,8vw,6.2rem)] leading-[0.95] font-light tracking-[-0.05em] text-brand tabular-nums">{lead.headline.value}</span>
                <span className="text-[1.2rem] font-medium">{lead.headline.label}</span>
              </p>
              <p className="mt-3 text-[0.82rem] text-muted">{lead.source}</p>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
                {lead.stats.map((s) => (
                  <div key={s.label}>
                    <dd data-count className="text-[1.6rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">{s.value}</dd>
                    <dt className="mt-2 text-[0.78rem] leading-snug text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="mt-auto bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-4 sm:p-6">
              <div className="p-wipe">
                <Image src={`/images/work/seo-${lead.key}.webp`} alt={`${lead.name}: ${lead.chart}`} width={lead.chartSize[0]} height={lead.chartSize[1]} sizes="(min-width: 64rem) 44rem, 100vw" className="w-full rounded-[0.7rem] shadow-[0_1rem_2rem_-1rem_rgba(18,20,24,0.3)] ring-1 ring-black/5" />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[0.76rem] text-muted">{lead.chart}. Screenshot from the client&rsquo;s account.</span>
                <Link href={`/work/seo/${lead.slug}/`} aria-label={`See the ${lead.name} SEO project`} className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink-2 px-5 text-[0.85rem] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  See the project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </figcaption>
            </figure>
          </article>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((c) => (
              <li key={c.key} className="p-rv">
                <Link href={`/work/seo/${c.slug}/`} aria-label={`See the ${c.name} SEO project`} className="group flex h-full items-center gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_1.5rem_3rem_-2rem_rgba(18,20,24,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-7">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9rem] font-semibold">{c.name}</span>
                    <span className="mt-2 flex flex-wrap items-baseline gap-x-2.5">
                      <span data-count className="text-[clamp(2rem,3.2vw,2.6rem)] leading-none font-light tracking-[-0.04em] tabular-nums">{c.headline.value}</span>
                      <span className="text-[0.9rem] font-medium">{c.headline.label}</span>
                    </span>
                    <span className="mt-2 block text-[0.74rem] leading-snug text-muted">{c.source}</span>
                  </span>
                  <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-page text-ink ring-1 ring-line transition-colors group-hover:bg-brand group-hover:text-white group-hover:ring-brand"><ArrowRight className="size-4" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-rv mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[40rem] text-[0.8rem] text-muted">{homeResults.note}</p>
          <ButtonLink href="/get-a-quote/" className="shrink-0 self-start">Get a quote</ButtonLink>
        </div>
      </div>
    </ProofMotion>
  );
}
