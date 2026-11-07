import { Check, CircleCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuestionList } from "@/components/home/question-list";
import { QuoteForm } from "@/components/quote/quote-form";
import { serviceVisuals } from "@/components/services/service-visuals";
import type { ServicePage } from "@/content/service-pages";

/*
 * Service page template (docs/sections/p1-services.md): one layout for
 * websites, SEO, software and marketing. Chosen variants: hero B (ink split,
 * picture right), who it is for (cards), what is included C (bento, first
 * sub-service as a large ink tile), how it works B (ink band, numbered
 * steps, "you receive" chips), what you get + tools, questions, quote form
 * with the service preset. Entrances: GSAP via Reveal (.rv).
 */

const band = "bg-[linear-gradient(160deg,var(--color-band-2),var(--color-band))] text-white";
const h2 = "rv text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]";

export function ServiceHero({ s }: { s: ServicePage }) {
  const V = serviceVisuals[s.slug];
  return (
    <Reveal aria-labelledby="svc-title" className={`overflow-hidden py-16 lg:py-24 ${band}`}>
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="rv text-[0.85rem] font-semibold text-[#f6a57a]">{s.eyebrow}</p>
          <h1 id="svc-title" className="rv mt-3 text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.07] font-semibold tracking-[-0.035em]">
            {s.title}
          </h1>
          <p className="rv mt-5 max-w-[36rem] text-[1.05rem] text-white/85">{s.line}</p>
          <a
            href="#quote"
            className="rv mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get a quote
          </a>
          <ul className="rv mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.88rem] text-white/85">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="size-4 text-white" strokeWidth={2.6} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rv pb-10">
          <V />
        </div>
      </div>
    </Reveal>
  );
}

export function ServiceAudiences({ s }: { s: ServicePage }) {
  return (
    <Reveal aria-labelledby="svc-who" className="py-20 lg:py-28">
      <div className="container-page">
        <h2 id="svc-who" className={`${h2} max-w-[32rem]`}>Who it is for</h2>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.audiences.map((a) => (
            <li key={a.name} className="rv rounded-[1.25rem] bg-white p-6 ring-1 ring-line">
              <h3 className="text-[1.05rem] font-semibold">{a.name}</h3>
              <p className="mt-1.5 text-[0.9rem] text-muted">{a.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function ServiceIncluded({ s }: { s: ServicePage }) {
  return (
    <Reveal aria-labelledby="svc-inc" className="pb-20 lg:pb-28">
      <div className="container-page">
        <h2 id="svc-inc" className={`${h2} max-w-[32rem]`}>What is included</h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
          {s.included.map((x, i) => (
            <li
              key={x.title}
              className={`rv rounded-[1.5rem] p-7 ${i === 0 ? `${band} md:col-span-4 md:row-span-2 md:p-10` : `bg-white ring-1 ring-line ${s.included.length === 4 && i === 3 ? "md:col-span-6" : "md:col-span-2"}`}`}
            >
              {i === 0 && <p className="text-[0.8rem] font-semibold text-[#f6a57a]">Most asked for</p>}
              <h3 className={`font-semibold ${i === 0 ? "mt-2 text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight" : "text-[1.1rem]"}`}>{x.title}</h3>
              <p className={`mt-2 ${i === 0 ? "max-w-[28rem] text-white/85" : "text-[0.9rem] text-muted"}`}>{x.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function ServiceSteps({ steps, title = "How it works" }: { steps: { title: string; line: string; receive?: string }[]; title?: string }) {
  return (
    <Reveal aria-labelledby="svc-steps" className={`py-20 lg:py-28 ${band}`}>
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <h2 id="svc-steps" className={h2}>{title}</h2>
        <ol className="flex flex-col">
          {steps.map((x, i) => (
            <li key={x.title} className="rv grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/12 py-6 last:border-0">
              <span className="text-[1.6rem] leading-none font-light text-[#f6a57a]">{i + 1}</span>
              <span>
                <h3 className="text-[1.15rem] font-semibold">{x.title}</h3>
                <span className="mt-1 block text-[0.92rem] text-white/80">{x.line}</span>
                {x.receive && <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.8rem]">You receive: {x.receive}</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

export function ServiceDeliverables({ s }: { s: ServicePage }) {
  return (
    <Reveal aria-labelledby="svc-get" className="py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <h2 id="svc-get" className={`${h2} max-w-[30rem]`}>What you get</h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {s.deliverables.map((x) => (
              <li key={x.title} className="rv flex gap-3 rounded-[1.25rem] bg-white p-5 ring-1 ring-line">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <span>
                  <h3 className="font-semibold">{x.title}</h3>
                  <span className="mt-1 block text-[0.88rem] text-muted">{x.line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="rv text-[1.2rem] font-semibold">Tools we use</h2>
          <ul className="rv mt-5 flex flex-wrap gap-2">
            {s.tools.map((t) => (
              <li key={t} className="rounded-full bg-white px-4 py-2 text-[0.88rem] ring-1 ring-line">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function ServiceQuestions({ faqs, title }: { faqs: { q: string; a: string }[]; title: string }) {
  return (
    <Reveal aria-labelledby="svc-faq" className="py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <h2 id="svc-faq" className={h2}>{title}</h2>
        <div className="rv">
          <QuestionList faqs={faqs} />
        </div>
      </div>
    </Reveal>
  );
}

export function ServiceQuote({ s }: { s: ServicePage }) {
  return (
    <Reveal id="quote" aria-labelledby="svc-quote" className="scroll-mt-24 pb-20 lg:pb-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="svc-quote" className={h2}>Get a quote for {s.name.toLowerCase() === "seo" ? "SEO" : s.name.toLowerCase()}</h2>
          <p className="rv mt-4 max-w-[30rem] text-muted">Four short steps. We reply within 2 working hours (IST) and send a written proposal within 48 hours of our call.</p>
        </div>
        <div className="rv rounded-[1.75rem] bg-white p-6 shadow-[0_1.5rem_3rem_-1.5rem_rgba(18,20,24,0.18)] ring-1 ring-line sm:p-9">
          <QuoteForm preset={s.quoteKey} />
        </div>
      </div>
    </Reveal>
  );
}
