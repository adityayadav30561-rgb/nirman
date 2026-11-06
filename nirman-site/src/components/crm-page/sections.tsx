import Link from "next/link";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PhoneInbox } from "@/components/crm/screens";
import { DemoForm } from "@/components/crm-page/demo-form";
import { IntegrationsHub } from "@/components/crm-page/integrations-hub";
import { QuestionList } from "@/components/home/question-list";
import { audiences, channels, crmFaqs, customisation, demo, demoHref, integrations } from "@/content/crm-page";

/*
 * /nirman-crm/ sections after the hero and tour (docs/sections/p2-crm-page.md):
 * ("What changes" lives in changes.tsx), WhatsApp and email (B), integrations (B), who it is for (A),
 * customisation (A), questions (homepage Questions pattern), book a demo (A).
 * Entrances: GSAP via <Reveal> (.rv children fade up in order).
 */

const h2 = "rv text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.15] font-semibold tracking-[-0.025em]";
const band = "bg-[linear-gradient(160deg,var(--color-band-2),var(--color-band))] text-white";

function Checks({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5 text-[0.92rem]">
      {items.map((p) => (
        <li key={p} className={`flex gap-2.5 ${dark ? "text-white/90" : ""}`}>
          <Check className={`mt-0.5 size-4.5 shrink-0 ${dark ? "text-white" : "text-brand"}`} strokeWidth={2.6} aria-hidden />
          {p}
        </li>
      ))}
    </ul>
  );
}

export function CrmChannels() {
  return (
    <Reveal aria-labelledby="crm-channels-title" className={`overflow-hidden py-20 lg:py-28 ${band}`}>
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <h2 id="crm-channels-title" className={h2}>{channels.title}</h2>
          <p className="rv mt-4 max-w-[38rem] text-white/85">{channels.line}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="rv">
              <h3 className="flex items-center gap-2 font-semibold"><MessageCircle className="size-5" aria-hidden />WhatsApp</h3>
              <Checks items={channels.whatsapp} dark />
            </div>
            <div className="rv">
              <h3 className="flex items-center gap-2 font-semibold"><Mail className="size-5" aria-hidden />Email</h3>
              <Checks items={channels.email} dark />
            </div>
          </div>
        </div>
        <div className="rv relative mx-auto w-full max-w-[24rem] pb-6">
          <PhoneInbox className="mx-auto w-[13rem] sm:w-[14rem]" />
          <div aria-hidden className="absolute -bottom-2 left-0 w-[13rem] rounded-2xl bg-white p-4 text-ink shadow-[0_1rem_2rem_-0.5rem_rgba(0,0,0,0.45)] sm:-left-8">
            <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-brand"><Mail className="size-3.5" />Welcome series · email 2</p>
            <p className="mt-1.5 text-[0.8rem] font-semibold">Riya, here is how we plan a clinic website</p>
            <p className="mt-1 text-[0.7rem] text-muted">Opened 2 times · clicked</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function CrmIntegrations() {
  return (
    <Reveal aria-labelledby="crm-int-title" className="py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <h2 id="crm-int-title" className={h2}>{integrations.title}</h2>
          <p className="rv mt-4 text-muted">{integrations.line}</p>
        </div>
        <IntegrationsHub />
      </div>
    </Reveal>
  );
}

export function CrmAudiences() {
  return (
    <Reveal aria-labelledby="crm-aud-title" className="py-20 lg:py-28">
      <div className="container-page">
        <h2 id="crm-aud-title" className={`${h2} max-w-[36rem]`}>{audiences.title}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.items.map((a) => (
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

export function CrmCustomisation() {
  return (
    <Reveal aria-labelledby="crm-custom-title" className={`py-20 lg:py-24 ${band}`}>
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="crm-custom-title" className={h2}>{customisation.title}</h2>
          <p className="rv mt-4 max-w-[34rem] text-white/85">{customisation.line}</p>
        </div>
        <div className="rv">
          <Checks items={customisation.points} dark />
          <Link href={customisation.link.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-white underline-offset-4 hover:underline">
            {customisation.link.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function CrmQuestions() {
  return (
    <Reveal aria-labelledby="crm-faq-title" className="py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="crm-faq-title" className={h2}>Questions about Nirman CRM</h2>
          <p className="rv mt-3 max-w-[26rem] text-[0.95rem] text-muted">Anything else? Ask us in the demo.</p>
          <a href={demoHref} className="rv mt-7 inline-flex h-12 items-center rounded-full bg-ink-2 px-7 text-[0.9rem] font-medium text-white transition-colors hover:bg-brand">
            Book a demo
          </a>
        </div>
        <div className="rv">
          <QuestionList faqs={crmFaqs} />
        </div>
      </div>
    </Reveal>
  );
}

export function CrmDemo() {
  return (
    <Reveal id="book-a-demo" aria-labelledby="crm-demo-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h2 id="crm-demo-title" className={h2}>{demo.title}</h2>
          <p className="rv mt-4 text-muted">{demo.line}</p>
          <ol className="mt-8 flex flex-col gap-4">
            {demo.steps.map((s, i) => (
              <li key={s} className="rv flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbe9df] text-[0.8rem] font-semibold text-brand">{i + 1}</span>
                <span className="text-ink/85">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rv rounded-[1.75rem] bg-white p-6 ring-1 ring-line sm:p-8">
          <DemoForm />
        </div>
      </div>
    </Reveal>
  );
}
