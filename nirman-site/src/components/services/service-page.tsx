import { CircleCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuestionList } from "@/components/home/question-list";
import { QuoteForm } from "@/components/quote/quote-form";
import type { ServicePage } from "@/content/service-pages";

/*
 * Service page template (docs/sections/p1-services.md): one layout for
 * websites, SEO, software and marketing. Hero and "what is included" live in
 * service-hero.tsx and service-tour.tsx (real screens, redo 2026-11-07); here:
 * who it is for (cards), how it works B (ink band, numbered
 * steps, "you receive" chips), what you get + tools, questions, quote form
 * with the service preset. Entrances: GSAP via Reveal (.rv).
 */

const band = "bg-[linear-gradient(160deg,var(--color-band-2),var(--color-band))] text-white";
const h2 = "rv text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]";

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
