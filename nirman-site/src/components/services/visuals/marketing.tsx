import { Check, CheckCheck, Clock, Filter, Mail, MessageSquare, Send, UserPlus } from "lucide-react";
import { Avatar, Bar, Glow, Panel, Phone, Scene, Tag, Vis } from "@/components/services/kit";

/*
 * Marketing automation artwork (docs/sections/p1-services.md). No
 * WhatsApp logo (client rule): messages are drawn as plain chat bubbles.
 * Sunrise Dental is a demo business, not a client.
 */

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex items-center gap-[0.6em]">
      <span className="w-[4.4em] text-[0.64em] text-muted">{label}</span>
      <span className="h-[0.5em] flex-1 overflow-hidden rounded-full bg-[#f1f3f6]"><span className="an-grow block h-full origin-left rounded-full bg-brand" style={{ width: `${value}%` }} /></span>
      <span className="w-[2.4em] text-right text-[0.66em] font-semibold">{value}%</span>
    </span>
  );
}

function FlowStep({ icon: I, title, sub, first = false }: { icon: typeof Clock; title: string; sub: string; first?: boolean }) {
  return (
    <span className="an-pop flex items-center gap-[0.6em]">
      <span className={`grid size-[1.9em] shrink-0 place-items-center rounded-[0.55em] ${first ? "bg-brand text-white" : "bg-[#fdeee4] text-brand"}`}><I className="size-[0.9em]" /></span>
      <span><span className="block text-[0.7em] font-semibold">{title}</span><span className="block text-[0.58em] text-muted">{sub}</span></span>
    </span>
  );
}

export function MarketingScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Phone depth={0.4} className="absolute top-[0.6em] left-[4.6em] h-[25.6em] w-[13em]">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-[0.5em] border-b border-line px-[0.8em] pb-[0.6em]">
            <Avatar className="!size-[1.9em]">SD</Avatar>
            <span><span className="block text-[0.72em] font-semibold">Sunrise Dental</span><span className="block text-[0.52em] text-muted">Business account</span></span>
          </div>
          <div className="flex flex-1 flex-col gap-[0.5em] bg-[#f6f1ec] p-[0.7em]">
            <span className="max-w-[85%] self-start rounded-[0.8em] rounded-bl-[0.2em] bg-white px-[0.7em] py-[0.5em]"><span className="block text-[0.62em] leading-snug">Hi, do you have a slot for a check-up this week?</span></span>
            <span className="max-w-[88%] self-end rounded-[0.8em] rounded-br-[0.2em] bg-[#fbd9c4] px-[0.7em] py-[0.5em]">
              <span className="block text-[0.62em] leading-snug">Hi Riya! Yes, we do. Pick a time below and we will confirm at once.</span>
              <span className="mt-[0.2em] flex items-center justify-end gap-[0.2em] text-brand-deep"><span className="text-[0.48em]">10:02</span><CheckCheck className="size-[0.7em]" /></span>
            </span>
            <span className="self-end"><Tag tone="ink">Instant reply</Tag></span>
            <span className="w-[88%] self-end overflow-hidden rounded-[0.8em] bg-white">
              <span className="block px-[0.7em] py-[0.5em]"><span className="block text-[0.62em] font-semibold">Book your check-up</span><span className="block text-[0.54em] text-muted">Slots open Mon to Sat</span></span>
              <span className="block border-t border-line py-[0.45em] text-center text-brand"><span className="block text-[0.6em] font-medium">Book a visit</span></span>
            </span>
          </div>
        </div>
      </Phone>
      <Panel depth={1} className="absolute top-[1.6em] right-0 w-[16.5em] p-[1em]">
        <span className="flex items-center justify-between"><span className="text-[0.76em] font-semibold">Check-up reminder</span><Tag tone="good">Sent</Tag></span>
        <span className="mt-[0.2em] block text-[0.6em] text-muted">Campaign · 420 customers</span>
        <span className="mt-[0.8em] flex flex-col gap-[0.55em]"><Meter label="Delivered" value={98} /><Meter label="Read" value={81} /><Meter label="Replied" value={24} /></span>
      </Panel>
      <Panel depth={1.3} className="absolute right-[1em] bottom-[1.2em] flex w-[14.5em] flex-col gap-[0.7em] p-[1em]">
        <span className="text-[0.62em] font-medium text-muted">Automatic follow-up</span>
        <FlowStep first icon={UserPlus} title="New lead arrives" sub="From the website form" />
        <FlowStep icon={Clock} title="Wait 2 days" sub="Only if there is no reply" />
        <FlowStep icon={Send} title="Send a follow-up" sub="Message, then email" />
      </Panel>
      <Panel depth={0.7} className="absolute bottom-[1.6em] left-0 flex items-center gap-[0.7em] p-[0.8em] pr-[1.2em]">
        <span className="grid size-[2.1em] place-items-center rounded-[0.6em] bg-ink-2 text-white"><Mail className="size-[1em]" /></span>
        <span><span className="block text-[0.74em] font-semibold">Welcome email</span><span className="block text-[0.62em] text-muted">Sent to every new lead</span></span>
      </Panel>
    </Scene>
  );
}

function Chat() {
  const inbox: [string, string, string, string][] = [["RS", "Riya Sharma", "Can I book for Saturday?", "Priya"], ["JD", "James Dunn", "Thanks, see you at 4.", "Rohan"], ["AK", "Arjun Kapoor", "Please share the details", "Priya"]];
  return (
    <Vis className="flex h-full items-center justify-center gap-[1em] px-[1.4em]">
      <Panel className="an-pop w-[14em] shrink-0 overflow-hidden">
        <span className="flex items-center justify-between px-[0.9em] pt-[0.8em]"><span className="text-[0.62em] text-muted">Message template</span><Tag tone="good"><Check className="size-[0.9em]" strokeWidth={3} />Approved</Tag></span>
        <span className="block px-[0.9em] py-[0.6em]">
          <span className="block text-[0.74em] leading-snug">Hi <b className="rounded-[0.3em] bg-[#fdeee4] px-[0.25em] font-medium text-brand-deep">name</b>, your check-up is due this month. Shall we book a time?</span>
        </span>
        {["Yes, book it", "Remind me later"].map((t) => <span key={t} className="block border-t border-line py-[0.5em] text-center text-brand"><span className="block text-[0.68em] font-medium">{t}</span></span>)}
      </Panel>
      <Panel className="an-pop hidden w-[17em] overflow-hidden @lg:block">
        <span className="flex items-center gap-[0.5em] border-b border-line px-[0.9em] py-[0.65em]"><MessageSquare className="size-[0.9em] text-brand" /><span className="text-[0.74em] font-semibold">Team inbox</span><Tag className="ml-auto">3 open</Tag></span>
        {inbox.map(([i, n, m, who]) => (
          <span key={n} className="flex items-center gap-[0.6em] border-b border-line px-[0.9em] py-[0.55em] last:border-0">
            <Avatar>{i}</Avatar>
            <span className="min-w-0 flex-1"><span className="block text-[0.7em] font-semibold">{n}</span><span className="block truncate text-[0.6em] text-muted">{m}</span></span>
            <Tag tone="brand">{who}</Tag>
          </span>
        ))}
      </Panel>
    </Vis>
  );
}

function Email() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[21em] overflow-hidden">
        <span className="flex items-center gap-[0.6em] border-b border-line px-[1em] py-[0.7em]">
          <Avatar>SD</Avatar>
          <span className="min-w-0 flex-1"><span className="block text-[0.72em] font-semibold">Your smile, this month</span><span className="block text-[0.58em] text-muted">Sunrise Dental · newsletter</span></span>
          <Mail className="size-[0.95em] text-muted" />
        </span>
        <span className="block p-[1em]">
          <span className="an-pop flex h-[4.4em] items-end rounded-[0.7em] bg-[linear-gradient(120deg,#f6b48d,#d95f27)] p-[0.7em] text-white"><span className="text-[0.86em] leading-tight font-semibold">Three tips for healthy teeth</span></span>
          <span className="mt-[0.7em] flex flex-col gap-[0.4em]"><Bar w="100%" /><Bar w="78%" /></span>
          <span className="mt-[0.7em] inline-block rounded-full bg-ink-2 px-[1em] py-[0.45em] text-white"><span className="block text-[0.62em] font-medium">Book a check-up</span></span>
        </span>
      </Panel>
    </Vis>
  );
}

function FollowUps() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="relative flex w-full max-w-[19em] flex-col gap-[0.85em] p-[1.1em]">
        <span className="absolute top-[2em] bottom-[2em] left-[2.02em] w-px bg-[#f3b592]" />
        <span className="relative"><FlowStep first icon={UserPlus} title="A lead goes quiet" sub="No reply to your quote" /></span>
        <span className="relative"><FlowStep icon={Clock} title="Wait 2 days" sub="Stops if they answer" /></span>
        <span className="relative"><FlowStep icon={Send} title="Follow-up message" sub="Written in your voice" /></span>
        <span className="relative"><FlowStep icon={Check} title="Your team is told" sub="When the lead replies" /></span>
      </Panel>
    </Vis>
  );
}

function Segments() {
  const segs: [string, number, boolean][] = [["Asked for a check-up", 124, true], ["Repeat customers", 210, false], ["No reply in 30 days", 58, false], ["Kothrud, Pune", 96, true]];
  return (
    <Vis className="flex h-full items-center justify-center gap-[1em] px-[1.4em]">
      <div className="grid w-[15em] shrink-0 grid-cols-1 gap-[0.45em]">
        {segs.map(([name, n, on]) => (
          <Panel key={name} className={`an-pop flex items-center gap-[0.6em] rounded-[0.8em] px-[0.8em] py-[0.55em] ${on ? "ring-2 ring-brand/60" : ""}`}>
            <span className={`grid size-[1.1em] place-items-center rounded-[0.3em] ${on ? "bg-brand text-white" : "ring-1 ring-ink/25"}`}>{on && <Check className="size-[0.75em]" strokeWidth={3.5} />}</span>
            <span className="flex-1 text-[0.7em] font-medium">{name}</span>
            <span className="text-[0.62em] text-muted">{n}</span>
          </Panel>
        ))}
      </div>
      <Panel className="an-pop hidden w-[14em] p-[1em] @lg:block">
        <span className="flex items-center gap-[0.5em]"><Filter className="size-[0.9em] text-brand" /><span className="text-[0.74em] font-semibold">Who gets this message</span></span>
        <span className="mt-[0.7em] flex flex-wrap gap-[0.35em]"><Tag tone="brand">Asked for a check-up</Tag><Tag>and</Tag><Tag tone="brand">Kothrud, Pune</Tag></span>
        <span className="mt-[0.9em] block border-t border-line pt-[0.7em]"><span className="block text-[1.5em] leading-none font-semibold">41</span><span className="mt-[0.3em] block text-[0.62em] text-muted">people will receive it</span></span>
      </Panel>
    </Vis>
  );
}

export const marketingTiles = [Chat, Email, FollowUps, Segments];
