import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { AppCase, SeoCase, Site } from "@/content/work";
import { seoShotAbout, seoShotTitle, seoTerms } from "@/content/work";

/*
 * Screenshot frames for the work pages (docs/sections/p5-work.md). Work is
 * shown as screenshots only: no links to the client sites or apps
 * (user, 2026-11-10). The browser bar shows the business name, not a URL.
 *
 * Project pages are case studies, not galleries (user, 2026-11-10, round 3):
 * an overview, then every screenshot beside a numbered note that says what
 * it shows, then a dark band (phones, how to read the figures, or the tech).
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

const eyebrow = "text-[0.78rem] font-semibold tracking-[0.08em] uppercase";
const h2 = "text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.12] font-semibold tracking-[-0.03em]";

/** Opening of the story: what the project is, the facts, and a card of what is in it. */
function Overview({ title, text, facts, cardTitle, children }: { title: string; text: string; facts: string[][]; cardTitle: string; children: ReactNode }) {
  return (
    <section aria-labelledby="proj-about" className="pt-36 pb-16 lg:pt-52 lg:pb-24">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="rv">
          <p className={`${eyebrow} text-brand`}>The project</p>
          <h2 id="proj-about" className={`${h2} mt-3`}>{title}</h2>
          <p className="mt-5 max-w-[38rem] text-[1.08rem] leading-relaxed text-ink/80">{text}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
            {facts.map(([a, b]) => (
              <div key={a}>
                <dt className={`${eyebrow} text-[0.7rem] text-muted`}>{a}</dt>
                <dd className="mt-1 text-[0.95rem] font-medium">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rv self-start rounded-[1.75rem] bg-white p-7 ring-1 ring-line sm:p-9">
          <h3 className="text-[1.1rem] font-semibold">{cardTitle}</h3>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((x) => (
        <li key={x} className="flex gap-2.5 text-[0.95rem]"><Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.8} aria-hidden />{x}</li>
      ))}
    </ul>
  );
}

/** The numbered walk: picture on one side, the note on the other, sides swapping row by row. */
function Walk({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="bg-wash py-16 lg:py-24">
      <div className="container-page">
        <p className={`rv ${eyebrow} text-brand`}>{label}</p>
        <h2 id={id} className={`rv ${h2} mt-3 max-w-[40rem]`}>{title}</h2>
        <ol className="mt-12 flex flex-col gap-14 lg:gap-24">{children}</ol>
      </div>
    </section>
  );
}
function Step({ i, title, text, picture, wide = 8, children }: { i: number; title: string; text: string; picture: ReactNode; wide?: 7 | 8; children?: ReactNode }) {
  return (
    <li className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
      <div className={`rv ${wide === 8 ? "lg:col-span-8" : "lg:col-span-7"} ${i % 2 ? "lg:order-2" : ""}`}>{picture}</div>
      <div className={`rv ${wide === 8 ? "lg:col-span-4" : "lg:col-span-5"}`}>
        <span aria-hidden className="text-[2.6rem] leading-none font-light tracking-[-0.04em] text-brand">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 text-[1.45rem] leading-tight font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-3 leading-relaxed text-ink/75">{text}</p>
        {children}
      </div>
    </li>
  );
}

/** A website: overview, the walk through its screens, then the phone views on a dark band. */
export function SiteStory({ s, facts }: { s: Site; facts: string[][] }) {
  return (
    <>
      <Overview title="What we built" text={s.intro} facts={facts} cardTitle="What is in the site">
        <Ticks items={s.has} />
      </Overview>
      <Walk id="proj-walk" label="A walk through the site" title="Screen by screen, and why each one is there">
        {s.tour.map((t, i) => (
          <Step key={t.shot} i={i} title={t.title} text={t.text} picture={<BrowserShot src={siteImg(s, t.shot)} name={s.name} alt={`${s.name}: ${t.title}`} sizes="(min-width: 64rem) 54rem, 100vw" />} />
        ))}
      </Walk>
      <section aria-labelledby="proj-phone" className="sv-stage overflow-hidden bg-band py-16 text-white lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12">
          <div className="rv lg:col-span-4">
            <p className={`${eyebrow} text-[#ff9a62]`}>On a phone</p>
            <h2 id="proj-phone" className={`${h2} mt-3`}>Designed for the small screen too</h2>
            <p className="mt-4 leading-relaxed text-white/75">{s.phone}</p>
          </div>
          <div className="grid grid-cols-3 items-start gap-4 sm:gap-8 lg:col-span-8">
            {[1, 2, 3].map((n) => (
              <div key={n} data-depth={n === 2 ? -0.5 : 0.5} className="mx-auto w-full max-w-[15rem]">
                <PhoneShot src={siteM(s, n)} alt={`${s.name} on a phone`} sizes="(min-width: 64rem) 15rem, 30vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** SEO: what happened in words, each Google screenshot beside what it is and its figures, then how to read them. */
export function SeoStory({ c, facts }: { c: SeoCase; facts: string[][] }) {
  return (
    <>
      <Overview title="What the numbers say" text={c.summary} facts={facts} cardTitle="Where the figures come from">
        <ul className="flex flex-col divide-y divide-line">
          {c.shots.map((sh) => (
            <li key={sh.file} className="flex flex-col py-3 first:pt-0 last:pb-0">
              <span className="text-[0.95rem] font-medium">{seoShotTitle(sh.file)}</span>
              <span className="text-[0.85rem] text-muted">{sh.period}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.85rem] leading-relaxed text-muted">Every figure on this page is read from a screenshot of the client&rsquo;s own Google account, shown below in full.</p>
      </Overview>
      <Walk id="proj-walk" label="The evidence" title="Each screenshot, and what it shows">
        {c.shots.map((sh, i) => (
          <Step
            key={sh.file}
            i={i}
            title={seoShotTitle(sh.file)}
            text={seoShotAbout[sh.file]}
            picture={
              <div className="rounded-[1.25rem] bg-white p-2 shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.35)] ring-1 ring-black/5 sm:p-3">
                <Image src={`/images/work/seo-${c.key}-${sh.file}.webp`} alt={`${c.name}: ${seoShotTitle(sh.file)}, ${sh.period}`} width={sh.size[0]} height={sh.size[1]} sizes="(min-width: 64rem) 54rem, 100vw" className="w-full rounded-[0.7rem]" />
              </div>
            }
          >
            <p className={`${eyebrow} mt-6 text-[0.7rem] text-muted`}>{sh.period}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4">
              {sh.stats.map((st) => (
                <div key={st.label}>
                  <dd className="text-[1.6rem] leading-none font-light tracking-[-0.03em]">{st.value}</dd>
                  <dt className="mt-1.5 text-[0.8rem] leading-snug text-muted">{st.label}</dt>
                </div>
              ))}
            </dl>
          </Step>
        ))}
      </Walk>
      <section aria-labelledby="proj-terms" className="bg-band py-16 text-white lg:py-24">
        <div className="container-page">
          <p className={`rv ${eyebrow} text-[#ff9a62]`}>How to read these figures</p>
          <h2 id="proj-terms" className={`rv ${h2} mt-3 max-w-[40rem]`}>Six terms, in plain words</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {seoTerms.map(([term, means]) => (
              <div key={term} className="rv border-t border-white/15 pt-5">
                <dt className="text-[1.1rem] font-semibold">{term}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{means}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

/** An app: overview, the screens grouped by what the user is doing, then what it is built with and the second collage. */
export function AppStory({ a, facts }: { a: AppCase; facts: string[][] }) {
  const label = Object.fromEntries(a.screens);
  return (
    <>
      <Overview title="What the app does" text={a.line} facts={facts} cardTitle="Main features">
        <Ticks items={a.points} />
      </Overview>
      <Walk id="proj-walk" label="How the app flows" title="From the first screen to the last, in the order a user meets them">
        {a.flow.map((f, i) => (
          <Step
            key={f.title}
            i={i}
            wide={7}
            title={f.title}
            text={f.text}
            picture={
              <div className={`grid gap-3 sm:gap-5 ${f.screens.length === 4 ? "grid-cols-2 sm:grid-cols-4" : f.screens.length === 3 ? "grid-cols-3" : "mx-auto max-w-[26rem] grid-cols-2"}`}>
                {f.screens.map((file) => <PhoneShot key={file} src={`/images/work/app-${a.key}/${file}.webp`} alt={`${a.name}: ${label[file]}`} label={label[file]} sizes="(min-width: 64rem) 12rem, 45vw" />)}
              </div>
            }
          />
        ))}
      </Walk>
      <section aria-labelledby="proj-built" className="bg-band py-16 text-white lg:py-24">
        <div className="container-page">
          <div className="rv flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`${eyebrow} text-[#ff9a62]`}>Under the hood</p>
              <h2 id="proj-built" className={`${h2} mt-3`}>What it is built with</h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {a.built.map((t) => <li key={t} className="rounded-full bg-white/8 px-4 py-2 text-[0.9rem] ring-1 ring-white/12">{t}</li>)}
            </ul>
          </div>
          <Image src={`/images/work/app-${a.key}-2.webp`} alt={`${a.name}: more screens`} width={a.key === "events" ? 1260 : 1680} height={a.key === "events" ? 1120 : 960} sizes="(min-width: 84rem) 80rem, 100vw" className={`rv mt-10 w-full rounded-[1.75rem] ${a.key === "events" ? "mx-auto max-w-[52rem]" : ""}`} />
        </div>
      </section>
    </>
  );
}
