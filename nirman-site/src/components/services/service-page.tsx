import Link from "next/link";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";
import { QuestionList } from "@/components/home/question-list";
import { ServiceIcon } from "@/components/home/service-icons";
import { QuoteForm } from "@/components/quote/quote-form";
import { serviceArt } from "@/components/services/service-art";
import { heroGrid } from "@/components/services/service-hero";
import { Ticker } from "@/components/services/service-motion";
import { servicePages, serviceSlugs, type ServicePage } from "@/content/service-pages";

/*
 * Service page sections (docs/sections/p1-services.md, redesign 2026-11-09),
 * one template for websites, SEO, software and marketing:
 * included (bento of pictures), who it is for (warm band, four columns),
 * how it works (ink band, a line that fills as you scroll, "You receive"
 * cards), what you get + tools (panel and an endless row), questions, quote
 * form with the service preset, and links to the other services.
 * Motion: service-motion.tsx (.rv, .sv-anim, .sp-track).
 */

const h2 = "rv text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.12] font-semibold tracking-[-0.03em]";
const eyebrow = "rv text-[0.78rem] font-semibold tracking-[0.08em] uppercase";
const label = (s: ServicePage) => (s.name === "SEO" ? "SEO" : s.name.toLowerCase());

const tints = {
  warm: "bg-[linear-gradient(160deg,#fbf1e8,#f5e1d2)]",
  ink: "bg-[linear-gradient(160deg,#262a33,#121418)]",
  stone: "bg-[linear-gradient(160deg,#eef1f4,#e4e8ed)]",
};
const layout: Record<number, { span: string; tint: keyof typeof tints }[]> = {
  5: [
    { span: "md:col-span-2 lg:col-span-7", tint: "warm" },
    { span: "lg:col-span-5", tint: "ink" },
    { span: "lg:col-span-4", tint: "stone" },
    { span: "lg:col-span-4", tint: "stone" },
    { span: "lg:col-span-4", tint: "warm" },
  ],
  4: [
    { span: "lg:col-span-7", tint: "warm" },
    { span: "lg:col-span-5", tint: "ink" },
    { span: "lg:col-span-5", tint: "stone" },
    { span: "lg:col-span-7", tint: "warm" },
  ],
};

export function ServiceIncluded({ s }: { s: ServicePage }) {
  const { tiles } = serviceArt[s.slug];
  const cells = layout[s.included.length] ?? layout[4];
  return (
    <section aria-labelledby="svc-inc" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p className={`${eyebrow} text-brand`}>What is included</p>
            <h2 id="svc-inc" className={`${h2} mt-3`}>{s.includedTitle}</h2>
          </div>
          <p className="rv max-w-[24rem] text-[0.95rem] text-muted">Take the whole plan or only the parts you need. Your proposal lists exactly what is included.</p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {s.included.map((x, i) => {
            const V = tiles[i];
            return (
              <li key={x.title} className={`rv sv-anim group @container flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_2rem_3.5rem_-2rem_rgba(18,20,24,0.3)] ${cells[i].span}`}>
                <div className={`relative h-[17rem] overflow-hidden ${tints[cells[i].tint]}`}>
                  <V />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <p className="text-[0.78rem] font-semibold text-brand">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1.5 text-[1.2rem] leading-snug font-semibold tracking-[-0.015em]">{x.title}</h3>
                  <p className="mt-2 max-w-[34rem] text-[0.92rem] text-muted">{x.line}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ServiceAudiences({ s }: { s: ServicePage }) {
  return (
    <section aria-labelledby="svc-who" className="bg-wash py-20 lg:py-24">
      <div className="container-page">
        <p className={`${eyebrow} text-brand`}>Who it is for</p>
        <h2 id="svc-who" className={`${h2} mt-3 max-w-[36rem]`}>Built for businesses like yours</h2>
        <ul className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {s.audiences.map((a, i) => (
            <li key={a.name} className="rv group border-t-2 border-ink/15 py-6 transition-colors duration-300 hover:border-brand">
              <p className="text-[2.2rem] leading-none font-light text-brand/80">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-[1.2rem] leading-snug font-semibold tracking-[-0.015em]">{a.name}</h3>
              <p className="mt-2 text-[0.92rem] text-ink/70">{a.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSteps({ steps, title, line }: { steps: { title: string; line: string; receive?: string }[]; title: string; line: string }) {
  return (
    <section aria-labelledby="svc-steps" className="relative overflow-hidden bg-band py-20 text-white lg:py-28">
      <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_60%)]`} />
      <div className="container-page relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p className={`${eyebrow} text-[#ff9a62]`}>How it works</p>
            <h2 id="svc-steps" className={`${h2} mt-3`}>{title}</h2>
          </div>
          <p className="rv max-w-[24rem] text-[0.95rem] text-white/70">{line}</p>
        </div>
        <ol className="sp-track relative mt-14 grid grid-cols-1 gap-y-8 lg:grid-cols-5 lg:gap-x-5">
          {/* the line: across on desktop, down on phones; the orange part fills on scroll */}
          <li aria-hidden className="absolute top-[1.4rem] right-0 left-0 hidden h-px bg-white/15 lg:block">
            <span className="sp-fill-x block h-full origin-left bg-[#ff9a62]" />
          </li>
          <li aria-hidden className="absolute top-0 bottom-0 left-[1.4rem] w-px bg-white/15 lg:hidden">
            <span className="sp-fill-y block size-full origin-top bg-[#ff9a62]" />
          </li>
          {steps.map((x, i) => (
            <li key={x.title} className="rv relative grid grid-cols-[2.8rem_1fr] gap-x-5 lg:flex lg:flex-col">
              <span className="grid size-[2.8rem] place-items-center rounded-full bg-band text-[1rem] font-semibold text-[#ff9a62] ring-1 ring-[#ff9a62]/60">{i + 1}</span>
              <div className="lg:mt-6 lg:flex lg:flex-1 lg:flex-col">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">{x.title}</h3>
                <p className="mt-2 text-[0.9rem] text-white/70 lg:min-h-[4.6em]">{x.line}</p>
                {x.receive && (
                  <p className="mt-4 rounded-[1rem] bg-white/6 p-4 ring-1 ring-white/10 lg:flex-1">
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.06em] text-[#ff9a62] uppercase"><FileCheck2 className="size-3.5" aria-hidden />You receive</span>
                    <span className="mt-1.5 block text-[0.88rem] text-white/90">{x.receive}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceDeliverables({ s }: { s: ServicePage }) {
  return (
    <section aria-labelledby="svc-get" className="pt-20 lg:pt-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div>
          <p className={`${eyebrow} text-brand`}>What you get</p>
          <h2 id="svc-get" className={`${h2} mt-3`}>Yours to keep when the work is done</h2>
          <p className="rv mt-4 max-w-[26rem] text-[0.95rem] text-muted">Everything we make for you is handed over. Your code, content and data stay yours.</p>
        </div>
        <ul className="rv grid grid-cols-1 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line sm:grid-cols-2">
          {s.deliverables.map((x, i) => (
            <li key={x.title} className={`flex gap-4 p-6 lg:p-8 ${i > 0 ? "border-t border-line" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 ? "sm:border-l sm:border-line" : ""}`}>
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#fdeee4] text-brand"><Check className="size-4.5" strokeWidth={2.8} aria-hidden /></span>
              <div>
                <h3 className="text-[1.05rem] font-semibold">{x.title}</h3>
                <p className="mt-1.5 text-[0.9rem] text-muted">{x.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rv mt-14 border-y border-line bg-white/60 py-5">
        <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <h3 className="shrink-0 text-[0.78rem] font-semibold tracking-[0.08em] text-muted uppercase">Tools we use</h3>
          <Ticker speed={28} className="w-full min-w-0 flex-1 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex">
              {s.tools.map((t) => (
                <li key={t} className="mr-2.5 rounded-full bg-white px-4 py-2 text-[0.88rem] whitespace-nowrap ring-1 ring-line">{t}</li>
              ))}
            </ul>
          </Ticker>
        </div>
      </div>
    </section>
  );
}

export function ServiceQuestions({ faqs, title }: { faqs: { q: string; a: string }[]; title: string }) {
  return (
    <section aria-labelledby="svc-faq" className="py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div>
          <p className={`${eyebrow} text-brand`}>Questions</p>
          <h2 id="svc-faq" className={`${h2} mt-3`}>{title}</h2>
          <p className="rv mt-4 max-w-[24rem] text-[0.95rem] text-muted">Short, straight answers. Anything else, ask us in the form below.</p>
        </div>
        <div className="rv">
          <QuestionList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

const promises = ["A reply within 2 working hours (IST)", "A written proposal within 48 hours of our call", "Your code, content and data stay yours"];

export function ServiceQuote({ s }: { s: ServicePage }) {
  return (
    <section id="quote" aria-labelledby="svc-quote" className="scroll-mt-24 pb-20 lg:pb-28">
      <div className="container-page">
        <div className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-[2.25rem] bg-band p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:p-14">
          <div aria-hidden className={`absolute inset-0 ${heroGrid} [mask-image:radial-gradient(ellipse_at_0%_100%,black,transparent_60%)]`} />
          <div aria-hidden className="absolute -bottom-40 -left-40 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,43,0.3),transparent)]" />
          <div className="relative">
            <p className={`${eyebrow} text-[#ff9a62]`}>Get a quote</p>
            <h2 id="svc-quote" className={`${h2} mt-3`}>Tell us about your project. We will send a plan.</h2>
            <p className="rv mt-4 max-w-[28rem] text-white/75">Four short steps for {label(s)}. No obligation.</p>
            <ul className="rv mt-8 flex flex-col gap-3">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem] text-white/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#ff9a62] text-band"><Check className="size-3" strokeWidth={3.5} aria-hidden /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rv relative rounded-[1.5rem] bg-white p-6 text-ink sm:p-8">
            <QuoteForm preset={s.quoteKey} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceOthers({ s }: { s: ServicePage }) {
  return (
    <section aria-labelledby="svc-more" className="pb-20 lg:pb-28">
      <div className="container-page">
        <h2 id="svc-more" className="rv text-[1.5rem] font-semibold tracking-[-0.02em]">Works even better together</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {serviceSlugs.filter((x) => x !== s.slug).map((slug) => {
            const o = servicePages[slug];
            return (
              <li key={slug} className="rv">
                <Link href={`/services/${slug}/`} className="group flex h-full items-center gap-4 rounded-[1.5rem] bg-white p-5 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  <ServiceIcon name={slug} uid={`more-${slug}`} className="size-14 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.05rem] font-semibold">{o.name}</span>
                    <span className="mt-0.5 block text-[0.85rem] text-muted">{o.eyebrow}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-2 text-white transition-colors group-hover:bg-brand"><ArrowRight className="size-4" aria-hidden /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
