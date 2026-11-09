import { Archive, ChevronDown, CornerUpLeft, Mail, Star as StarIcon, Trash2 } from "lucide-react";
import { InboxScreen } from "@/components/crm/screens";
import { AutomationsScreen, CampaignsScreen, LeadsScreen } from "@/components/crm/screens-more";
import { Bar, Glow, Panel, Scene, Vis } from "@/components/services/kit";
import { CrmShot } from "@/components/services/visuals/crm-shot";
import { In, Out, Template, WaPhone } from "@/components/services/visuals/whatsapp";

/*
 * Marketing automation artwork (docs/sections/p1-services.md): a chat phone
 * in the look of WhatsApp (no logo: client rule), the real Nirman CRM
 * screens, and an email as it looks in a mail app. Sunrise Dental is a demo
 * business, not a client.
 */

function Chat() {
  return (
    <>
      <In time="10:02">Hi, do you have a slot for a check-up this week?</In>
      <Out time="10:02">Hi Riya! Yes, we do. Pick a time below.</Out>
      <Template time="10:02" title="Book your check-up" line="Slots open Monday to Saturday." buttons={["Book a visit", "Call the clinic"]} />
      <In time="10:04">Booked for Saturday. Thank you!</In>
    </>
  );
}

/** An email open in a mail app. */
function EmailCard({ className = "", depth }: { className?: string; depth?: number }) {
  return (
    <Panel depth={depth} className={`overflow-hidden ${className}`}>
      <span className="flex items-center gap-[0.7em] border-b border-[#e8eaed] px-[0.9em] py-[0.55em] text-[#5f6368]">
        <Archive className="size-[0.85em]" /><Trash2 className="size-[0.85em]" /><Mail className="size-[0.85em]" />
        <span className="ml-auto text-[0.56em]">1 of 248</span>
      </span>
      <span className="block px-[0.9em] pt-[0.7em]">
        <span className="flex items-center gap-[0.5em]"><span className="text-[0.86em] font-medium text-[#202124]">Your smile, this month</span><span className="rounded-[0.3em] bg-[#e8eaed] px-[0.4em] py-[0.1em]"><span className="block text-[0.5em] text-[#5f6368]">Inbox</span></span></span>
        <span className="mt-[0.5em] flex items-center gap-[0.5em]">
          <span className="grid size-[1.9em] shrink-0 place-items-center rounded-full bg-[#0f766e] text-white"><span className="text-[0.6em] font-semibold">S</span></span>
          <span className="min-w-0 flex-1"><span className="block text-[0.64em] font-semibold text-[#202124]">Sunrise Dental</span><span className="flex items-center text-[#5f6368]"><span className="text-[0.54em]">to me</span><ChevronDown className="size-[0.6em]" /></span></span>
          <span className="text-[0.52em] text-[#5f6368]">9:00 AM</span><StarIcon className="size-[0.8em] text-[#5f6368]" /><CornerUpLeft className="size-[0.8em] text-[#5f6368]" />
        </span>
      </span>
      <span className="m-[0.9em] mt-[0.7em] block overflow-hidden rounded-[0.5em] ring-1 ring-[#e8eaed]">
        <span className="flex h-[4.2em] flex-col justify-end bg-[linear-gradient(120deg,#0f766e,#14b8a6)] p-[0.7em] text-white">
          <span className="text-[0.5em] font-semibold tracking-[0.1em] uppercase opacity-80">Sunrise Dental · Newsletter</span>
          <span className="text-[0.9em] leading-tight font-semibold">Three tips for healthy teeth</span>
        </span>
        <span className="block p-[0.7em]">
          <span className="flex flex-col gap-[0.35em]"><Bar w="100%" /><Bar w="94%" /><Bar w="70%" /></span>
          <span className="mt-[0.6em] inline-block rounded-[0.35em] bg-[#0f766e] px-[0.9em] py-[0.4em] text-white"><span className="block text-[0.58em] font-medium">Book a check-up</span></span>
        </span>
      </span>
    </Panel>
  );
}

export function MarketingScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      {/* the real Nirman CRM Campaigns screen, cropped like a zoomed screenshot (sidebar off the left edge) */}
      <div data-depth={0.3} className="absolute top-[0.6em] right-0 left-[11.6em] h-[16em] overflow-hidden rounded-[1em] bg-white shadow-[0_1.6em_3.2em_-1.2em_rgba(18,20,24,0.4)]">
        <div className="-mt-[1.3em] -ml-[5.2em] w-[46em]"><CrmShot active="campaigns" className="!static !w-full"><CampaignsScreen /></CrmShot></div>
      </div>
      <WaPhone depth={0.9} name="Sunrise Dental" initials="SD" className="absolute bottom-0 left-0 h-[25.6em] w-[12.8em]"><Chat /></WaPhone>
      <EmailCard depth={1.3} className="absolute right-[0.8em] bottom-0 w-[14.6em]" />
    </Scene>
  );
}

function WhatsApp() {
  return (
    <Vis className="relative h-full">
      <CrmShot active="inbox" className="top-[1.6rem] left-[42%] hidden @lg:block"><InboxScreen /></CrmShot>
      <WaPhone name="Sunrise Dental" initials="SD" className="an-pop absolute top-[1.4em] left-1/2 h-[26em] w-[13em] -translate-x-1/2 @lg:left-[8%] @lg:translate-x-0"><Chat /></WaPhone>
    </Vis>
  );
}

function Email() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em] pt-[1.4em]">
      <EmailCard className="an-pop w-full max-w-[21em] self-start" />
    </Vis>
  );
}

function FollowUps() {
  return (
    <Vis className="relative h-full">
      <CrmShot active="automations" className="-top-[5.6rem] -left-[13rem] max-md:-left-[17.5rem]"><AutomationsScreen /></CrmShot>
    </Vis>
  );
}

function Segments() {
  return (
    <Vis className="relative h-full">
      <CrmShot active="leads" className="top-[1.6rem] left-[1.6rem] max-md:-top-[4rem] max-md:-left-[8.4rem]"><LeadsScreen /></CrmShot>
    </Vis>
  );
}

export const marketingTiles = [WhatsApp, Email, FollowUps, Segments];
