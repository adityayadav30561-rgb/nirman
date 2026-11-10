import Image from "next/image";
import type { AppCase, SeoCase, Site } from "@/content/work";
import { seoShotTitle } from "@/content/work";

/*
 * Screenshot frames for the work pages (docs/sections/p5-work.md). Work is
 * shown as screenshots only: no links to the client sites or apps
 * (user, 2026-11-10). The browser bar shows the business name, not a URL.
 */

export function BrowserShot({ src, name, alt, priority = false, sizes = "(min-width: 64rem) 52rem, 100vw", className = "" }: { src: string; name: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[0.9rem] bg-white shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.4)] ring-1 ring-black/5 ${className}`}>
      <div className="flex h-8 items-center gap-1.5 bg-[#dee1e6] px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex h-5 min-w-0 flex-1 items-center rounded-full bg-white px-3 text-[0.68rem] text-[#3c4043]"><span className="truncate">{name}</span></span>
      </div>
      <Image src={src} alt={alt} width={1600} height={1000} sizes={sizes} priority={priority} className="w-full" />
    </div>
  );
}

export function PhoneShot({ src, alt, label, className = "", sizes = "14rem" }: { src: string; alt: string; label?: string; className?: string; sizes?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[1.6rem] border-[0.32rem] border-[#0b0d10] bg-[#0b0d10] shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.5)]">
        <Image src={src} alt={alt} width={472} height={1023} sizes={sizes} className="w-full rounded-[1.25rem]" />
      </div>
      {label && <figcaption className="mt-3 text-center text-[0.8rem] text-muted">{label}</figcaption>}
    </figure>
  );
}

const siteImg = (s: Site, n?: number) => `/images/work/site-${s.key}${n ? `-${n}` : ""}.webp`;
const siteM = (s: Site, n: number) => `/images/work/site-${s.key}-m${n > 1 ? n : ""}.webp`;

export function siteHome(s: Site) {
  return siteImg(s);
}

/** The rest of a website after its homepage: more sections, then three phone views. */
export function SiteMedia({ s }: { s: Site }) {
  return (
    <div className="flex flex-col gap-6">
      <div className={`grid gap-6 ${s.more.length > 1 ? "md:grid-cols-2" : ""}`}>
        {s.more.map((n) => <BrowserShot key={n} src={siteImg(s, n)} name={s.name} alt={`${s.name}: more of the site`} className="rv" sizes="(min-width: 48rem) 40rem, 100vw" />)}
      </div>
      <div className="rv rounded-[1.75rem] bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-6 sm:p-10">
        <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-muted uppercase">On a phone</p>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-8">
          {[1, 2, 3].map((n) => <PhoneShot key={n} src={siteM(s, n)} alt={`${s.name} on a phone`} className="mx-auto w-full max-w-[14rem]" />)}
        </div>
      </div>
    </div>
  );
}

/** SEO: each Google screenshot in full, with its period and the figures it shows typed out. */
export function SeoMedia({ c }: { c: SeoCase }) {
  return (
    <div className="flex flex-col gap-6">
      {c.shots.map((sh, i) => (
        <figure key={sh.file} className="rv overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line">
          <figcaption className="p-6 sm:p-8">
            <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-brand uppercase">{sh.period}</p>
            <h3 className="mt-2 text-[1.3rem] font-semibold tracking-[-0.02em]">{seoShotTitle(sh.file)}</h3>
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
              {sh.stats.map((st) => (
                <div key={st.label}>
                  <dd className="text-[1.7rem] leading-none font-light tracking-[-0.03em]">{st.value}</dd>
                  <dt className="mt-1.5 text-[0.8rem] text-muted">{st.label}</dt>
                </div>
              ))}
            </dl>
          </figcaption>
          <div className="bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-3 sm:p-6">
            <Image src={`/images/work/seo-${c.key}-${sh.file}.webp`} alt={`${c.name}: ${seoShotTitle(sh.file)}, ${sh.period}`} width={sh.size[0]} height={sh.size[1]} sizes="(min-width: 64rem) 52rem, 100vw" priority={i === 0} className="w-full rounded-[0.7rem] shadow-[0_1rem_2rem_-1rem_rgba(18,20,24,0.3)] ring-1 ring-black/5" />
          </div>
        </figure>
      ))}
      <p className="rv text-[0.8rem] text-muted">Screenshots from the client&rsquo;s own Google Analytics and Search Console accounts. Analytics counts all visitors to the site.</p>
    </div>
  );
}

/** The rest of an app after its main collage: every screen in the order a user meets it, then the second collage. */
export function AppMedia({ a }: { a: AppCase }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rv rounded-[1.75rem] bg-[linear-gradient(160deg,#f1f3f6,#e6e9ee)] p-6 sm:p-10">
        <p className="text-[0.78rem] font-semibold tracking-[0.08em] text-muted uppercase">Every screen, in order</p>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {a.screens.map(([file, label]) => <PhoneShot key={file} src={`/images/work/app-${a.key}/${file}.webp`} alt={`${a.name}: ${label}`} label={label} />)}
        </div>
      </div>
      <Image src={`/images/work/app-${a.key}-2.webp`} alt={`${a.name}: more screens`} width={a.key === "events" ? 1260 : 1680} height={a.key === "events" ? 1120 : 960} sizes="(min-width: 84rem) 80rem, 100vw" className={`rv w-full rounded-[1.75rem] ${a.key === "events" ? "mx-auto max-w-[52rem]" : ""}`} />
    </div>
  );
}
