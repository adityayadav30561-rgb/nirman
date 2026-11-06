import { Check, FileText, Mail, MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CrmMotion } from "@/components/motion/crm-motion";
import { crmIntro, crmPoints } from "@/content/crm";

/*
 * Nirman CRM (docs/sections/05-crm.md, variant B chosen per the design
 * protocol, with variant A's pale-blue plate and channel icons): text and
 * "Book a demo" on the left; on the right a sample conversation (lead asks,
 * auto-reply, a person replies in 2 minutes) and the CRM lead card.
 * Motion: GSAP in components/motion/crm-motion.tsx (the conversation plays
 * as you scroll); c-* classes are its targets. Sample data, labelled.
 */

const card = "rounded-[1.25rem] bg-white shadow-[0_18px_40px_-24px_rgb(5_7_12/0.35),0_1px_2px_rgb(5_7_12/0.05)]";

function Typing({ className = "" }: { className?: string }) {
  // shown only while the motion plays (display toggled by GSAP)
  return (
    <li aria-hidden className={`c-typing ml-auto hidden w-fit items-center gap-1 rounded-2xl rounded-tr-md bg-brand/10 px-3.5 py-3 ${className}`}>
      <span className="size-1.5 rounded-full bg-brand/60" />
      <span className="size-1.5 rounded-full bg-brand/45" />
      <span className="size-1.5 rounded-full bg-brand/30" />
    </li>
  );
}

export function Crm() {
  return (
    <CrmMotion aria-labelledby="crm-title" className="overflow-x-clip py-20 lg:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-[31rem]">
          <h2
            id="crm-title"
            className="c-title text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-ink"
          >
            {crmIntro.title}
          </h2>
          <p className="c-sub mt-4 text-[0.95rem] leading-[1.7] text-muted">{crmIntro.line}</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {crmPoints.map((p) => (
              <li key={p.key} className="c-point flex items-center gap-2 text-[0.85rem] font-medium text-ink">
                <span className="grid size-5 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="size-3" aria-hidden />
                </span>
                {p.title}
              </li>
            ))}
          </ul>
          <ButtonLink href={crmIntro.cta.href} className="c-btn mt-8">
            {crmIntro.cta.label}
          </ButtonLink>
        </div>

        <div className="c-stage relative mx-auto w-full max-w-[34rem] px-3 pt-6 pb-36 sm:px-6">
          {/* pale-blue plate (reference) and floating channel icons */}
          <div aria-hidden className="c-plate absolute inset-x-0 top-0 bottom-10 rounded-[2.5rem] bg-[linear-gradient(160deg,#e9f2fd,#dfeafb)]" />
          {[
            { I: FileText, pos: "-left-3 top-16" },
            { I: MessageCircle, pos: "-right-3 top-40" },
            { I: Mail, pos: "right-10 -bottom-1" },
          ].map(({ I, pos }, i) => (
            <span
              key={i}
              aria-hidden
              className={`c-icon absolute z-10 grid size-10 place-items-center rounded-full bg-white text-brand shadow-[0_10px_22px_-12px_rgb(5_7_12/0.4)] ${pos}`}
            >
              <I className="size-4" />
            </span>
          ))}

          <div className={`c-chat relative ${card} p-5`}>
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="grid size-10 place-items-center rounded-full bg-[#dbe9fd] text-[0.8rem] font-semibold text-brand ring-4 ring-white">
                RS
              </span>
              <div className="flex-1">
                <p className="text-[0.85rem] font-semibold text-ink">Riya S.</p>
                <p className="text-[0.7rem] text-muted">Website form · Clinic website</p>
              </div>
              <span className="text-[0.62rem] tracking-wide text-muted uppercase">Sample data</span>
            </div>
            <ul className="mt-4 space-y-3 text-[0.82rem]">
              <li className="c-msg max-w-[82%] rounded-2xl rounded-tl-md bg-wash px-3.5 py-2.5 text-ink">
                Hi, I need a new website for my clinic. Can you share a quote?
                <span className="mt-1 block text-[0.65rem] text-muted">10:02</span>
              </li>
              <Typing />
              <li className="c-msg ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-brand/10 px-3.5 py-2.5 text-ink">
                Thanks Riya, we have your message. Priya will reply in a few minutes.
                <span className="mt-1 flex items-center gap-1 text-[0.65rem] text-brand">
                  <Send className="size-3" aria-hidden />
                  Auto-reply · 10:02
                </span>
              </li>
              <Typing />
              <li className="c-msg ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-brand px-3.5 py-2.5 text-white">
                Hi Riya, this is Priya from Nirman. Can we call you at 4 pm today?
                <span className="mt-1 block text-[0.65rem] text-white/80">10:04 · Replied in 2 min</span>
              </li>
            </ul>
          </div>

          <div className={`c-lead absolute bottom-0 left-0 z-10 w-[16rem] ${card} p-4 sm:-left-6`}>
            <p className="text-[0.65rem] tracking-wide text-muted uppercase">Lead</p>
            <p className="mt-1 text-[0.9rem] font-semibold text-ink">Riya S. · Clinic website</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[0.72rem]">
              <dt className="text-muted">Stage</dt>
              <dd>
                <span className="rounded-full bg-[#ddf3e6] px-2 py-0.5 text-[#1f8a55]">Contacted</span>
              </dd>
              <dt className="text-muted">Owner</dt>
              <dd className="text-ink">Priya</dd>
              <dt className="text-muted">Follow-up</dt>
              <dd className="text-ink">Today, 4:00 pm</dd>
            </dl>
          </div>
        </div>
      </div>
    </CrmMotion>
  );
}
