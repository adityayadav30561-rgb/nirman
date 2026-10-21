import { MonitorSmartphone } from "lucide-react";
import { Stage } from "../stage";
import { Device, PhoneFrame } from "../mockups/frames";
import { ConceptSiteDesktop, ConceptSiteMobile } from "../mockups/concept-site";
import { ServiceCard } from "./service-copy";
import { cardPillar } from "@/content/home";

const builtIn = ["Core Web Vitals budget", "WCAG 2.2 AA", "Schema markup", "CMS your team can edit"];

export function WebService() {
  return (
    <ServiceCard
      visualAlign="center"
      id="svc-web"
      pillar={cardPillar.web}
      tone="coral"
      icon={MonitorSmartphone}
      name="Website design & development"
      title="Websites that explain what you do in five seconds."
      body="We design around your customers' questions, then build fast, accessible sites your team can update without calling us. Every layout is composed for desktop and phone separately, not shrunk to fit."
      points={["Brand-led UI design", "Next.js and headless CMS builds", "E-commerce, booking and lead forms", "Copywriting and photography direction"]}
      extra={
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built into every site">
          {builtIn.map((b) => (
            <li key={b} className="rounded-full border border-coral/40 px-3 py-1 text-[0.85rem] text-coral-2">
              {b}
            </li>
          ))}
        </ul>
      }
      visual={<WebVisual />}
    />
  );
}

/** The card's mockup, also the hero visual on web service pages (P4.2). */
export function WebVisual() {
  return (
    <Stage w={480} h={330} wLg={720} hLg={470} label="A website design on an iMac at 1440 pixels and on a phone at 390 pixels">
      <Dimension className="left-0 top-4 w-360 lg:top-6 lg:w-540" label="1440 px desktop" />
      <div className="absolute left-0 top-30 w-360 lg:top-36 lg:w-540">
        <Device device="imac">
          <Stage w={560} h={329}>
            <ConceptSiteDesktop compact />
          </Stage>
        </Device>
      </div>
      <Dimension className="left-335 top-60 w-135 lg:left-520 lg:top-96 lg:w-190" label="390 px" />
      <div className="absolute left-335 top-84 w-135 lg:left-520 lg:top-120 lg:w-190">
        <PhoneFrame>
          <ConceptSiteMobile />
        </PhoneFrame>
      </div>
    </Stage>
  );
}

function Dimension({ className, label }: { className: string; label: string }) {
  return (
    <div className={`absolute flex h-14 items-center text-coral-2 ${className}`} aria-hidden>
      <span className="h-full w-[1.5px] bg-current" />
      <span className="h-[1.5px] flex-1 bg-current opacity-50" />
      <span className="mx-6 whitespace-nowrap fs-10 font-semibold tnum">{label}</span>
      <span className="h-[1.5px] flex-1 bg-current opacity-50" />
      <span className="h-full w-[1.5px] bg-current" />
    </div>
  );
}
