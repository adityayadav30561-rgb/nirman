import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ProofHead } from "@/components/home/proof-head";
import { ProofMotion } from "@/components/motion/proof-motion";
import { homeWork } from "@/content/home-proof";
import { apps, sites, type AppCase, type Site } from "@/content/work";

/*
 * Selected work on the homepage (docs/sections/09-work.md, variant B chosen
 * per the design protocol): a row of large project cards that moves sideways
 * as the page scrolls (pinned on wide screens; a swipe row with scroll snap
 * on phones, short screens and under reduced motion). Real screenshots only,
 * each card opens its case-study page; no links to client sites.
 * Motion: components/motion/proof-motion.tsx.
 */

const card = "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-shadow duration-300 hover:shadow-[0_2rem_3.5rem_-2rem_rgba(18,20,24,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const go = "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors";

function SiteSlide({ s, n }: { s: Site; n: string }) {
  return (
    <Link href={`/work/websites/${s.slug}/`} aria-label={`${s.name}: website project`} className={`${card} bg-white ring-1 ring-line`}>
      <div className="relative flex-1 overflow-hidden bg-[linear-gradient(160deg,#f1f3f6,#e3e7ed)] px-5 pt-5 sm:px-8 sm:pt-8">
        <div className="overflow-hidden rounded-t-[0.9rem] bg-white shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.45)] ring-1 ring-black/5 sm:mr-[18%]">
          <div className="flex h-7 items-center gap-1.5 bg-[#dee1e6] px-3" aria-hidden>
            <span className="size-2 rounded-full bg-[#ff5f57]" /><span className="size-2 rounded-full bg-[#febc2e]" /><span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex h-4 min-w-0 flex-1 items-center rounded-full bg-white px-3 text-[0.62rem] text-[#3c4043]"><span className="truncate">{s.name}</span></span>
          </div>
          <Image src={`/images/work/site-${s.key}.webp`} alt={`Homepage of ${s.name}`} width={1600} height={1000} sizes="(min-width: 64rem) 38rem, 80vw" className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </div>
        <div className="absolute right-8 bottom-0 hidden w-[24%] max-w-[10.5rem] overflow-hidden rounded-t-[1.4rem] border-[0.3rem] border-b-0 border-[#0b0d10] bg-[#0b0d10] shadow-[0_1.5rem_3rem_-1rem_rgba(18,20,24,0.55)] transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:block">
          <Image src={`/images/work/site-${s.key}-m.webp`} alt="" width={520} height={1040} sizes="11rem" className="-mb-[62%] w-full rounded-t-[1.1rem]" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-6 sm:px-8">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-brand uppercase"><span className="text-muted">{n}</span> · Website</p>
          <h3 className="mt-1.5 text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">{s.name}</h3>
          <p className="mt-0.5 truncate text-[0.9rem] text-muted">{s.kind}{s.place ? ` · ${s.place}` : ""}</p>
        </div>
        <span aria-hidden className={`${go} bg-ink-2 text-white group-hover:bg-brand`}><ArrowRight className="size-4.5" /></span>
      </div>
    </Link>
  );
}

function AppSlide({ a, n }: { a: AppCase; n: string }) {
  return (
    <Link href={`/work/apps/${a.slug}/`} aria-label={`${a.name}: app project`} className={`${card} bg-band text-white`}>
      <div className="relative flex-1 overflow-hidden">
        <Image src={`/images/work/app-${a.key}${a.dark ? "-dark" : ""}.webp`} alt={`Screens of the ${a.name} app`} width={1680} height={960} sizes="(min-width: 64rem) 44rem, 90vw" className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <div className="flex items-center justify-between gap-4 p-6 sm:px-8">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-[#ff9a62] uppercase"><span className="text-white/50">{n}</span> · App</p>
          <h3 className="mt-1.5 text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">{a.name}</h3>
          <p className="mt-0.5 truncate text-[0.9rem] text-white/65">{a.kind} · {a.built.slice(0, 2).join(", ")}</p>
        </div>
        <span aria-hidden className={`${go} bg-white text-ink group-hover:bg-[#ffe3d1]`}><ArrowRight className="size-4.5" /></span>
      </div>
    </Link>
  );
}

export function Work() {
  const picked = [
    ...homeWork.sites.map((slug) => ({ site: sites.find((s) => s.slug === slug)! })),
    ...homeWork.apps.map((slug) => ({ app: apps.find((a) => a.slug === slug)! })),
  ];
  // an app after every two sites, so the dark cards break the row up
  const order = [picked[0], picked[1], picked[4], picked[2], picked[3], picked[5]].filter(Boolean);
  const total = sites.length + apps.length;
  return (
    <ProofMotion aria-labelledby="work-title" className="overflow-hidden py-20 lg:py-28">
      <div className="p-pin">
        <div className="container-page">
          <ProofHead id="work-title" title={homeWork.title} line={homeWork.line}>
            <ButtonLink href="/work/" variant="outline" className="group">
              See all work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
          </ProofHead>
        </div>
        <ul className="p-track mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:px-10 lg:gap-5 min-[89rem]:px-[calc((100vw-84rem)/2+2.5rem)] [&::-webkit-scrollbar]:hidden">
          {order.map((p, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={i} className="p-rv h-[25rem] w-[84vw] max-w-[40rem] shrink-0 snap-center sm:h-[29rem] lg:h-[31rem] lg:w-[40rem]">
                {"site" in p && p.site ? <SiteSlide s={p.site} n={n} /> : <AppSlide a={(p as { app: AppCase }).app} n={n} />}
              </li>
            );
          })}
          <li className="p-rv h-[25rem] w-[70vw] max-w-[22rem] shrink-0 snap-center sm:h-[29rem] lg:h-[31rem]">
            <Link href="/work/" className={`${card} justify-between bg-wash p-8 ring-1 ring-line`}>
              <p className="text-[clamp(3.5rem,6vw,5rem)] leading-none font-light tracking-[-0.05em] text-brand">{total}</p>
              <div>
                <h3 className="text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">projects on the work page, and more on the way</h3>
                <p className="mt-2 text-[0.9rem] text-muted">Websites, apps and SEO, each with its own page.</p>
                <span className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink-2 px-5 text-[0.88rem] font-medium text-white transition-colors group-hover:bg-brand">
                  See all work
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="container-page">
          <div aria-hidden className="mt-8 hidden h-[3px] overflow-hidden rounded-full bg-ink/8 lg:block">
            <div className="p-bar h-full origin-left rounded-full bg-brand" />
          </div>
        </div>
      </div>
    </ProofMotion>
  );
}
