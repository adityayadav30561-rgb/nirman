import { ArrowRight, ClipboardList, CreditCard, FileText, Home, LayoutGrid, MessageSquare, Users, Zap } from "lucide-react";
import { Avatar, Bars, Browser, Glow, Panel, Phone, Scene, Tag, Vis } from "@/components/services/kit";

/*
 * Custom software artwork (docs/sections/p1-services.md). FixIt Pro is a
 * demo business that shows the kind of system we build, not a client.
 */

function Job({ title, meta, who, tone }: { title: string; meta: string; who: string; tone?: "brand" | "good" }) {
  return (
    <div className="rounded-[0.7em] bg-white p-[0.65em] shadow-[0_0.3em_0.8em_-0.4em_rgba(18,20,24,0.25)] ring-1 ring-line">
      <span className="block text-[0.68em] leading-tight font-semibold">{title}</span>
      <span className="mt-[0.2em] block text-[0.56em] text-muted">{meta}</span>
      <span className="mt-[0.45em] flex items-center justify-between">
        <Avatar className="!size-[1.5em]">{who}</Avatar>
        {tone && <Tag tone={tone}>{tone === "good" ? "Paid" : "On the way"}</Tag>}
      </span>
    </div>
  );
}

function Column({ name, count, children }: { name: string; count: number; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[0.45em] rounded-[0.8em] bg-[#f4f6f8] p-[0.5em]">
      <span className="flex items-center justify-between px-[0.2em]"><span className="text-[0.62em] font-semibold">{name}</span><span className="text-[0.58em] text-muted">{count}</span></span>
      {children}
    </div>
  );
}

export function SoftwareScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Browser url="app.fixitpro.in/jobs" depth={0.3} className="absolute top-[2em] left-0 h-[19.5em] w-[27em]">
        <div className="flex h-full">
          <div className="flex w-[2.8em] shrink-0 flex-col items-center gap-[0.9em] bg-ink-2 py-[1em] text-white/50">
            <span className="grid size-[1.6em] place-items-center rounded-[0.45em] bg-brand text-white"><span className="text-[0.62em] font-semibold">F</span></span>
            <Home className="size-[1em]" /><ClipboardList className="size-[1em] text-white" /><Users className="size-[1em]" /><FileText className="size-[1em]" />
          </div>
          <div className="min-w-0 flex-1 p-[1em]">
            <span className="flex items-center justify-between">
              <span><span className="block text-[0.95em] font-semibold">Jobs today</span><span className="block text-[0.6em] text-muted">18 jobs · 6 technicians</span></span>
              <span className="rounded-full bg-ink-2 px-[0.9em] py-[0.4em] text-white"><span className="block text-[0.6em] font-medium">+ New job</span></span>
            </span>
            <div className="mt-[0.8em] grid grid-cols-3 gap-[0.5em]">
              <Column name="New" count={3}>
                <Job title="AC service, 6 units" meta="Hotel Sai Palace" who="RK" />
                <Job title="Gas refill" meta="Green Leaf Café" who="IM" />
              </Column>
              <Column name="In progress" count={4}>
                <Job title="New AC install" meta="Mehta residence" who="RV" tone="brand" />
                <Job title="Annual contract visit" meta="City Pharmacy" who="SU" />
              </Column>
              <Column name="Done" count={11}>
                <Job title="Leak repair" meta="Kapoor Textiles" who="AN" tone="good" />
                <Job title="AC service" meta="Joshi Apartments" who="RK" tone="good" />
              </Column>
            </div>
          </div>
        </div>
      </Browser>
      <Phone depth={1.1} className="absolute right-[0.6em] bottom-0 h-[20.5em] w-[10.4em]">
        <div className="px-[0.8em]">
          <span className="block text-[0.56em] text-muted">Hi, Ravi</span>
          <span className="block text-[0.82em] font-semibold">Your next job</span>
          <span className="mt-[0.6em] block rounded-[0.8em] bg-ink-2 p-[0.7em] text-white">
            <span className="block text-[0.66em] font-semibold">New AC install</span>
            <span className="block text-[0.54em] text-white/70">Mehta residence · 2.4 km</span>
            <span className="mt-[0.6em] block h-[0.35em] rounded-full bg-white/20"><span className="block h-full w-[55%] rounded-full bg-[#ff9a62]" /></span>
          </span>
          <span className="mt-[0.6em] flex flex-col gap-[0.35em]">
            {["Photos before", "Parts used", "Customer signature"].map((t, i) => (
              <span key={t} className="flex items-center gap-[0.5em] rounded-[0.5em] px-[0.5em] py-[0.45em] ring-1 ring-line">
                <span className={`size-[0.8em] rounded-full ${i === 0 ? "bg-emerald-500" : "ring-1 ring-ink/30"}`} />
                <span className="text-[0.56em]">{t}</span>
              </span>
            ))}
          </span>
          <span className="mt-[0.6em] block rounded-full bg-brand py-[0.6em] text-center text-white"><span className="block text-[0.62em] font-medium">Finish job</span></span>
        </div>
      </Phone>
      <Panel depth={0.8} className="absolute top-0 right-[1.4em] flex items-center gap-[0.7em] p-[0.8em] pr-[1.2em]">
        <span className="grid size-[2.1em] place-items-center rounded-[0.6em] bg-ink-2 text-[#ff9a62]"><Zap className="size-[1em] fill-current" /></span>
        <span>
          <span className="block text-[0.74em] font-semibold">Invoice sent on its own</span>
          <span className="block text-[0.62em] text-muted">When the job is marked done</span>
        </span>
      </Panel>
      <Panel depth={0.6} className="absolute bottom-[0.6em] left-[1.6em] flex items-center gap-[0.7em] p-[0.8em] pr-[1.3em]">
        <span className="flex -space-x-[0.4em]">
          {[MessageSquare, CreditCard, FileText].map((I, i) => <span key={i} className="grid size-[1.9em] place-items-center rounded-full bg-[#fdeee4] text-brand ring-2 ring-white"><I className="size-[0.9em]" /></span>)}
        </span>
        <span>
          <span className="block text-[0.76em] font-semibold">Everything connected</span>
          <span className="block text-[0.62em] text-muted">Messages, payments, accounts</span>
        </span>
      </Panel>
    </Scene>
  );
}

function Lead({ name, what, tag }: { name: string; what: string; tag?: string }) {
  return (
    <span className="an-pop block rounded-[0.7em] bg-white p-[0.6em] ring-1 ring-line">
      <span className="block text-[0.7em] font-semibold">{name}</span>
      <span className="block text-[0.58em] text-muted">{what}</span>
      {tag && <Tag tone="brand" className="mt-[0.4em]">{tag}</Tag>}
    </span>
  );
}

function Crm() {
  const cols: [string, React.ReactNode][] = [
    ["New enquiry", <><Lead name="Riya Sharma" what="Clinic website" tag="Reply now" /><Lead name="Arjun Kapoor" what="Online orders app" /></>],
    ["Contacted", <><Lead name="James Dunn" what="School admissions CRM" /><Lead name="Sara Nasser" what="Store SEO" tag="Call at 4 pm" /></>],
    ["Proposal sent", <><Lead name="Meera Pillai" what="Property listings site" tag="Opened twice" /></>],
    ["Won", <><Lead name="Vikram Singh" what="Bakery website" /></>],
  ];
  return (
    <Vis className="flex h-full items-center justify-center gap-[0.6em] px-[1.2em]">
      {cols.map(([name, cards], i) => (
        <div key={name} className={`w-[9.6em] shrink-0 flex-col gap-[0.45em] rounded-[0.9em] bg-white/70 p-[0.5em] ring-1 ring-black/5 ${i > 1 ? "hidden @lg:flex" : "flex"}`}>
          <span className="flex items-center gap-[0.4em] px-[0.2em] py-[0.15em]"><span className={`size-[0.5em] rounded-full ${i === 3 ? "bg-emerald-500" : "bg-brand"}`} /><span className="text-[0.64em] font-semibold">{name}</span></span>
          {cards}
        </div>
      ))}
    </Vis>
  );
}

function WebApp() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[24em] p-[1em]">
        <span className="flex items-center justify-between"><span className="flex items-center gap-[0.5em]"><LayoutGrid className="size-[0.95em] text-brand" /><span className="text-[0.76em] font-semibold">Orders dashboard</span></span><Tag>This month</Tag></span>
        <span className="mt-[0.8em] grid grid-cols-3 gap-[0.5em]">
          {[["Orders", "1,284"], ["On time", "96%"], ["Open", "37"]].map(([l, v]) => (
            <span key={l} className="rounded-[0.6em] bg-[#f4f6f8] p-[0.6em]"><span className="block text-[0.56em] text-muted">{l}</span><span className="block text-[0.95em] font-semibold">{v}</span></span>
          ))}
        </span>
        <Bars values={[35, 48, 42, 60, 55, 72, 66, 84, 78, 96]} hi={[7, 9]} className="mt-[0.8em] h-[4.4em]" />
      </Panel>
    </Vis>
  );
}

function Mobile() {
  return (
    <Vis className="relative h-full">
      <Phone className="an-pop absolute top-[2.6em] left-1/2 h-[19em] w-[9.6em] -translate-x-[105%] -rotate-6">
        <div className="px-[0.7em]">
          <span className="block text-[0.74em] font-semibold">Book a service</span>
          <span className="mt-[0.5em] grid grid-cols-2 gap-[0.3em]">
            {["AC service", "Gas refill", "Repair", "Install"].map((t, i) => <span key={t} className={`rounded-[0.5em] py-[0.6em] text-center ring-1 ${i === 0 ? "bg-[#fdeee4] ring-[#f3b592]" : "ring-line"}`}><span className="block text-[0.54em] font-medium">{t}</span></span>)}
          </span>
          <span className="mt-[0.5em] block rounded-full bg-brand py-[0.55em] text-center text-white"><span className="block text-[0.58em] font-medium">Choose a time</span></span>
        </div>
      </Phone>
      <Phone className="an-pop absolute top-[1.4em] left-1/2 h-[19em] w-[9.6em] translate-x-[5%] rotate-3">
        <div className="px-[0.7em]">
          <span className="block text-[0.74em] font-semibold">Ravi is on the way</span>
          <span className="mt-[0.5em] block h-[5.4em] rounded-[0.6em] bg-[#f3ece6]">
            <svg viewBox="0 0 100 60" className="size-full"><path d="M10 48 C 30 44, 36 22, 56 24 S 80 14, 90 10" fill="none" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 5" /><circle cx="10" cy="48" r="4" fill="#1b1f27" /><circle cx="90" cy="10" r="4.5" fill="#c2410c" /></svg>
          </span>
          <span className="mt-[0.5em] flex items-center gap-[0.4em]"><Avatar className="!size-[1.6em]">RV</Avatar><span className="text-[0.56em] text-muted">Arrives in 12 min</span></span>
        </div>
      </Phone>
    </Vis>
  );
}

function Flow() {
  const nodes: [typeof Zap, string, string][] = [[FileText, "Website form", "A lead arrives"], [Users, "Your CRM", "Lead created"], [MessageSquare, "Message", "Instant reply"], [CreditCard, "Payment link", "Sent and tracked"]];
  return (
    <Vis className="flex h-full flex-col items-center justify-center gap-[0.9em] px-[1.2em]">
      <div className="grid grid-cols-2 items-center gap-[0.6em] @lg:flex">
        {nodes.map(([I, a, b], i) => (
          <span key={a} className="contents">
            {i > 0 && <ArrowRight className="an-pop hidden size-[1em] shrink-0 text-brand @lg:block" />}
            <Panel className="an-pop flex items-center gap-[0.55em] rounded-[0.9em] p-[0.7em] pr-[0.9em]">
              <span className={`grid size-[2em] shrink-0 place-items-center rounded-[0.6em] ${i === 0 ? "bg-brand text-white" : "bg-[#fdeee4] text-brand"}`}><I className="size-[0.95em]" /></span>
              <span><span className="block text-[0.7em] font-semibold whitespace-nowrap">{a}</span><span className="block text-[0.58em] whitespace-nowrap text-muted">{b}</span></span>
            </Panel>
          </span>
        ))}
      </div>
      <span className="an-pop flex items-center gap-[0.5em] rounded-full bg-white/80 px-[1em] py-[0.45em] ring-1 ring-black/5"><Zap className="size-[0.8em] fill-current text-brand" /><span className="text-[0.64em]">Runs on its own, no retyping</span></span>
    </Vis>
  );
}

export const softwareTiles = [Crm, WebApp, Mobile, Flow];
