import { CalendarClock, CircleCheck, GitBranch, Globe, Mail, MessageCircle, UserPlus, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { ServiceCard } from "./service-copy";

export function AutomationService() {
  return (
    <ServiceCard
      id="svc-crm"
      tone="mint"
      icon={Workflow}
      name="CRM & business automation"
      title="Every enquiry captured, assigned and followed up."
      body="We set up Nirman CRM, our own platform, or connect the tools you already use, then automate the repetitive steps between a new enquiry and a closed deal so nothing depends on someone remembering."
      points={["CRM setup and data migration", "Lead routing and assignment", "WhatsApp and email follow-ups", "Dashboards for owners and teams"]}
      extra={
        <a href="#nirman-crm" className="mt-6 inline-flex h-11 items-center rounded-full bg-forest px-5 text-[0.95rem] font-medium text-mint transition-colors hover:bg-forest-2">
          See Nirman CRM in detail
        </a>
      }
      visual={
        <Stage w={480} h={330} wLg={700} hLg={457} label="A business owner at her desk, beside an automation workflow that routes a website enquiry into the CRM">
          {/* photograph */}
          <div className="absolute left-0 top-0 hidden h-580 w-330 overflow-hidden rounded-2xl lg:block">
            <Photo name="ownerDesk" sizes="(min-width: 1024px) 20vw, 90vw" position="50% 30%" />
            <div className="absolute inset-x-12 top-12 flex items-center gap-8 rounded-full bg-surface/90 px-12 py-8 fs-11 backdrop-blur">
              <CircleCheck className="size-13 text-forest" />
              Latest run: 5 steps in 4 seconds
            </div>
          </div>

          {/* workflow canvas */}
          <div className="absolute left-0 top-0 h-520 w-480 overflow-hidden rounded-2xl bg-surface shadow-scene lg:left-230 lg:top-30 lg:w-470">
            <div className="flex items-center justify-between border-b border-ink/8 px-16 py-12">
              <span className="flex items-center gap-8 fs-13 font-semibold">
                <Workflow className="size-14 text-forest" />
                New website enquiry
              </span>
              <span className="flex items-center gap-6 rounded-full bg-mint-soft px-10 py-4 fs-10 font-medium text-forest">
                <span className="size-6 rounded-full bg-forest" />
                Active
              </span>
            </div>
            <div className="dot-grid absolute inset-x-0 bottom-0 top-48 opacity-60" />
            <div className="absolute left-0 top-48 h-472 w-470">
              <svg className="absolute left-0 top-0 h-472 w-470" viewBox="0 0 470 472" aria-hidden>
                <g fill="none" stroke="#86bd9c" strokeWidth="2">
                  <path d="M200 76 V98" />
                  <path d="M200 156 V178" />
                  <path d="M200 236 V256 H115 V284 M200 256 H315 V284" />
                  <path d="M115 340 V362 H200 V384 M315 340 V362 H200" />
                </g>
              </svg>
              <Node className="left-50 top-20 w-300" icon={Globe} kind="Trigger" title="Enquiry form submitted on website" color="bg-cobalt-soft text-cobalt" />
              <Node className="left-50 top-100 w-300" icon={UserPlus} kind="Action" title="Create lead, assign to Priya" color="bg-mint-soft text-forest" />
              <Node className="left-50 top-180 w-300" icon={GitBranch} kind="Condition" title="Project budget above ₹2 lakh?" color="bg-marigold-soft text-marigold-2" />
              <Node className="left-20 top-286 w-190" icon={MessageCircle} kind="If yes" title="WhatsApp the sales head" color="bg-mint-soft text-forest" small />
              <Node className="left-225 top-286 w-190" icon={Mail} kind="If no" title="Start nurture emails" color="bg-coral-soft text-coral-2" small />
              <Node className="left-50 top-386 w-300" icon={CalendarClock} kind="Action" title="Follow-up task in 2 days" color="bg-lilac-soft text-[#5b45b8]" />
            </div>
          </div>
        </Stage>
      }
    />
  );
}

function Node({
  className,
  icon: Icon,
  kind,
  title,
  color,
  small,
}: {
  className: string;
  icon: LucideIcon;
  kind: string;
  title: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div className={`absolute flex items-center gap-10 rounded-lg bg-surface shadow-panel ring-1 ring-ink/8 ${small ? "p-9" : "p-11"} ${className}`}>
      <span className={`grid shrink-0 place-items-center rounded-md ${small ? "size-28" : "size-34"} ${color}`}>
        <Icon className={small ? "size-13" : "size-16"} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block fs-9 text-ink-3">{kind}</span>
        <span className={`block font-medium ${small ? "fs-10" : "fs-12"}`}>{title}</span>
      </span>
    </div>
  );
}
