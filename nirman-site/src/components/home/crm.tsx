import Link from "next/link";
import { Check } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { CrmShowcase } from "@/components/home/crm-showcase";
import { CrmMotion } from "@/components/motion/crm-motion";
import { crmIntro, crmViews } from "@/content/crm";

/*
 * Nirman CRM (docs/sections/05-crm.md, redo variant C chosen per the design
 * protocol): a blue product band. Left, the product badge, a heading that
 * names Nirman CRM, a sentence, four check points and the only action, Book
 * a demo. Right, the real product screens built in code (desktop window with
 * tabs + phone), sample data. Motion: GSAP in components/motion/crm-motion.tsx
 * (text entrance, window and phone parallax); screen switching is Framer
 * Motion inside CrmShowcase.
 */
export function Crm() {
  return (
    <CrmMotion
      aria-labelledby="crm-title"
      className="overflow-hidden bg-[linear-gradient(160deg,var(--color-band-2)_0%,var(--color-band)_100%)] pt-20 pb-28 text-white lg:pt-28 lg:pb-40"
    >
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <p className="c-in inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pr-3.5 pl-1 text-[0.8rem] font-medium">
            <LogoMark className="size-6" tone="light" />
            {crmIntro.badge}
          </p>
          <h2 id="crm-title" className="c-title mt-5 text-[clamp(1.7rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
            {crmIntro.title}
          </h2>
          <p className="c-in mt-4 max-w-[34rem] text-[1rem] text-white/90">{crmIntro.line}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {crmViews.map((v) => (
              <li key={v.key} className="c-in flex gap-2.5 text-[0.9rem] text-white/90">
                <Check className="mt-0.5 size-4.5 shrink-0" strokeWidth={2.6} aria-hidden />
                {v.point}
              </li>
            ))}
          </ul>
          <Link
            href={crmIntro.cta.href}
            className="c-in mt-8 inline-flex h-12 items-center rounded-full bg-white px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {crmIntro.cta.label}
          </Link>
        </div>
        <CrmShowcase note={crmIntro.note} />
      </div>
    </CrmMotion>
  );
}
