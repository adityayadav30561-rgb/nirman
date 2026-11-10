import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { AppCase, SeoCase, Site } from "@/content/work";

/*
 * Cards for /work/ and its category pages (docs/sections/p5-work.md).
 * Pictures are real: site screenshots, the apps' own collages, crops of the
 * clients' Search Console. Each card opens its project page; there are no
 * links to the client sites or apps (user, 2026-11-10).
 */

const view = "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-5 text-[0.85rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

/** A live site: real screenshot in a browser frame, optional phone view at the corner. */
export function SiteCard({ s, big = false }: { s: Site; big?: boolean }) {
  return (
    <article className={`rv group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_2rem_3.5rem_-2rem_rgba(18,20,24,0.3)] ${big ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center" : ""}`}>
      <div className={`relative bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-5 pb-0 sm:p-7 sm:pb-0 ${big ? "lg:self-stretch lg:pt-10" : ""}`}>
        <div className="overflow-hidden rounded-t-[0.9rem] bg-white shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.4)] ring-1 ring-black/5">
          <div className="flex h-8 items-center gap-1.5 bg-[#dee1e6] px-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex h-5 min-w-0 flex-1 items-center rounded-full bg-white px-3 text-[0.68rem] text-[#3c4043]"><span className="truncate">{s.name}</span></span>
          </div>
          <div className={`overflow-hidden ${big ? "" : "aspect-[16/9.2]"}`}>
            <Image src={`/images/work/site-${s.key}.webp`} alt={`Homepage of ${s.name}`} width={1600} height={1000} sizes={big ? "(min-width: 64rem) 46rem, 100vw" : "(min-width: 64rem) 30rem, 100vw"} className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </div>
        </div>
        {big && (
          <div className="absolute right-6 bottom-0 hidden w-[9.5rem] overflow-hidden rounded-t-[1.4rem] border-[0.3rem] border-b-0 border-[#0b0d10] bg-[#0b0d10] shadow-[0_1.5rem_3rem_-1rem_rgba(18,20,24,0.5)] sm:block">
            <Image src={`/images/work/site-${s.key}-m.webp`} alt="" width={520} height={1040} sizes="10rem" className="-mb-[45%] w-full rounded-t-[1.1rem]" />
          </div>
        )}
      </div>
      <div className={`flex flex-1 items-end justify-between gap-4 p-6 ${big ? "lg:flex-col lg:items-start lg:justify-center lg:p-10" : ""}`}>
        <div>
          {big && <p className="mb-3 text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase">Website design and development</p>}
          <h3 className={`font-semibold tracking-[-0.02em] ${big ? "text-[clamp(1.5rem,2.4vw,2rem)] leading-tight" : "text-[1.2rem]"}`}>{s.name}</h3>
          <p className={`mt-1 text-muted ${big ? "text-[1rem]" : "text-[0.9rem]"}`}>{s.kind}{s.place ? ` · ${s.place}` : ""}</p>
        </div>
        <Link href={`/work/websites/${s.slug}/`} aria-label={`View the ${s.name} project`} className={`${view} bg-ink-2 text-white hover:bg-brand focus-visible:outline-brand ${big ? "lg:mt-6" : ""}`}>
          View project
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/** An SEO project: the headline figure with its source, more figures, and the client's real Search Console chart. */
export function SeoCard({ c, big = false }: { c: SeoCase; big?: boolean }) {
  return (
    <article className={`rv flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line ${big ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""}`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em]">{c.name}</h3>
          <Link href={`/work/seo/${c.slug}/`} aria-label={`View the ${c.name} SEO project`} className={`${view} bg-ink-2 text-white hover:bg-brand focus-visible:outline-brand`}>
            View project
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
          <span className="text-[clamp(2.6rem,5vw,4rem)] leading-none font-light tracking-[-0.04em] text-brand">{c.headline.value}</span>
          <span className="text-[1.05rem] font-medium">{c.headline.label}</span>
        </p>
        <p className="mt-2 text-[0.78rem] text-muted">{c.source}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
          {c.stats.map((s) => (
            <div key={s.label}>
              <dd className="text-[1.35rem] leading-none font-semibold tracking-[-0.02em]">{s.value}</dd>
              <dt className="mt-1.5 text-[0.78rem] leading-snug text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <figure className={`mt-auto bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-4 sm:p-6 ${big ? "lg:mt-0 lg:flex lg:flex-col lg:justify-center" : ""}`}>
        <Image src={`/images/work/seo-${c.key}.webp`} alt={`${c.name}: ${c.chart}`} width={c.chartSize[0]} height={c.chartSize[1]} sizes="(min-width: 64rem) 36rem, 100vw" className="w-full rounded-[0.7rem] shadow-[0_1rem_2rem_-1rem_rgba(18,20,24,0.3)] ring-1 ring-black/5" />
        <figcaption className="mt-3 text-[0.75rem] text-muted">{c.chart}. Screenshot from the client&rsquo;s account.</figcaption>
      </figure>
    </article>
  );
}

/** An app: its real screens across the top (the app's own collage, uncropped), the story below. */
export function AppCard({ a }: { a: AppCase }) {
  const dark = !!a.dark;
  return (
    <article className={`rv overflow-hidden rounded-[2.25rem] ${dark ? "bg-band text-white" : "bg-white ring-1 ring-line"}`}>
      <Image src={`/images/work/app-${a.key}${dark ? "-dark" : ""}.webp`} alt={`Screens of the ${a.name} app`} width={1680} height={960} sizes="(min-width: 84rem) 80rem, 100vw" className="w-full" />
      <div className="grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14 lg:p-12">
        <div>
          <p className={`text-[0.78rem] font-semibold tracking-[0.08em] uppercase ${dark ? "text-[#ff9a62]" : "text-brand"}`}>{a.kind}</p>
          <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em]">{a.name}</h3>
          <p className={`mt-3 max-w-[36rem] ${dark ? "text-white/75" : "text-muted"}`}>{a.line}</p>
          <Link href={`/work/apps/${a.slug}/`} aria-label={`View the ${a.name} project`} className={`${view} mt-7 ${dark ? "bg-white text-ink hover:bg-[#ffe3d1] focus-visible:outline-white" : "bg-ink-2 text-white hover:bg-brand focus-visible:outline-brand"}`}>
            See every screen
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div>
          <ul className="flex flex-col gap-2.5 text-[0.95rem]">
            {a.points.map((p) => (
              <li key={p} className="flex gap-2.5"><Check className={`mt-0.5 size-4.5 shrink-0 ${dark ? "text-[#ff9a62]" : "text-brand"}`} strokeWidth={2.8} aria-hidden />{p}</li>
            ))}
          </ul>
          <p className={`mt-6 text-[0.75rem] font-semibold tracking-[0.08em] uppercase ${dark ? "text-white/55" : "text-muted"}`}>Built with</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {a.built.map((t) => <li key={t} className={`rounded-full px-3 py-1 text-[0.8rem] ${dark ? "bg-white/8 ring-1 ring-white/12" : "bg-page ring-1 ring-line"}`}>{t}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}
