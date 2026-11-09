import { Bell, CalendarDays, ChartNoAxesColumn, ClipboardList, CreditCard, FileSpreadsheet, FileText, Home, MapPin, MessageCircle, Navigation, Search, Settings, Users, Zap } from "lucide-react";
import { PipelineScreen } from "@/components/crm/screens";
import { Avatar, Bars, Browser, Glow, Panel, Phone, Scene, Tag, Vis } from "@/components/services/kit";
import { CrmShot } from "@/components/services/visuals/crm-shot";

/*
 * Custom software artwork (docs/sections/p1-services.md). FixIt Pro is a
 * demo business with its own blue brand, to show the kind of system we
 * build; it is not a client. The CRM tile is the real Nirman CRM.
 */

const blue = "#2563eb";

function Job({ title, meta, who, tone, label }: { title: string; meta: string; who: string; tone?: "blue" | "good" | "warn"; label?: string }) {
  return (
    <div className="rounded-[0.6em] bg-white p-[0.6em] shadow-[0_1px_2px_rgba(15,23,42,0.08)] ring-1 ring-[#e2e8f0]">
      <span className="block text-[0.66em] leading-tight font-semibold text-[#0f172a]">{title}</span>
      <span className="mt-[0.2em] flex items-center gap-[0.25em] text-[#64748b]"><MapPin className="size-[0.6em]" /><span className="text-[0.54em]">{meta}</span></span>
      <span className="mt-[0.45em] flex items-center justify-between">
        <Avatar className="!size-[1.5em]" tone="bg-[#dbeafe] text-[#1d4ed8]">{who}</Avatar>
        {tone && <Tag tone={tone}>{label}</Tag>}
      </span>
    </div>
  );
}

function Column({ name, count, dot, children }: { name: string; count: number; dot: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[0.4em] rounded-[0.7em] bg-[#f1f5f9] p-[0.45em]">
      <span className="flex items-center gap-[0.35em] px-[0.2em]"><span className="size-[0.45em] rounded-full" style={{ background: dot }} /><span className="text-[0.6em] font-semibold text-[#0f172a]">{name}</span><span className="ml-auto text-[0.56em] text-[#64748b]">{count}</span></span>
      {children}
    </div>
  );
}

function Side({ active }: { active: number }) {
  const items = [Home, ClipboardList, CalendarDays, Users, FileText, ChartNoAxesColumn];
  return (
    <div className="flex w-[2.8em] shrink-0 flex-col items-center gap-[0.5em] bg-[#0f172a] py-[0.8em] text-[#94a3b8]">
      <span className="mb-[0.3em] grid size-[1.7em] place-items-center rounded-[0.45em] text-white" style={{ background: blue }}><span className="text-[0.62em] font-bold">F</span></span>
      {items.map((I, i) => <span key={i} className={`grid size-[1.8em] place-items-center rounded-[0.45em] ${i === active ? "bg-white/12 text-white" : ""}`}><I className="size-[0.95em]" /></span>)}
      <Settings className="mt-auto size-[0.95em]" />
    </div>
  );
}

export function SoftwareScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={38} h={28} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Browser url="app.fixitpro.in/jobs" tab="Jobs · FixIt Pro" fav={blue} depth={0.3} className="absolute top-[1.2em] left-0 h-[23.6em] w-[27.8em]">
        <div className="flex h-full">
          <Side active={1} />
          <div className="min-w-0 flex-1 bg-[#f8fafc]">
            <div className="flex items-center gap-[0.6em] border-b border-[#e2e8f0] bg-white px-[0.9em] py-[0.5em]">
              <span className="flex flex-1 items-center gap-[0.4em] rounded-[0.45em] bg-[#f1f5f9] px-[0.6em] py-[0.3em] text-[#94a3b8]"><Search className="size-[0.7em]" /><span className="text-[0.56em]">Search jobs, customers</span></span>
              <Bell className="size-[0.85em] text-[#64748b]" />
              <Avatar className="!size-[1.6em]" tone="bg-[#0f172a] text-white">AM</Avatar>
            </div>
            <div className="p-[0.9em]">
              <span className="flex items-center justify-between">
                <span><span className="block text-[0.92em] font-semibold text-[#0f172a]">Jobs today</span><span className="block text-[0.56em] text-[#64748b]">Tue 12 Nov · 18 jobs · 6 technicians</span></span>
                <span className="rounded-[0.45em] px-[0.8em] py-[0.4em] text-white" style={{ background: blue }}><span className="block text-[0.58em] font-medium">+ New job</span></span>
              </span>
              <div className="mt-[0.7em] grid grid-cols-3 gap-[0.45em]">
                <Column name="New" count={3} dot="#94a3b8">
                  <Job title="AC service, 6 units" meta="Hotel Sai Palace" who="RK" />
                  <Job title="Gas refill" meta="Green Leaf Café" who="IM" tone="warn" label="Unassigned" />
                </Column>
                <Column name="In progress" count={4} dot={blue}>
                  <Job title="New AC install" meta="Mehta residence" who="RV" tone="blue" label="On the way" />
                  <Job title="Annual contract visit" meta="City Pharmacy" who="SU" tone="blue" label="Started" />
                </Column>
                <Column name="Done" count={11} dot="#16a34a">
                  <Job title="Leak repair" meta="Kapoor Textiles" who="AN" tone="good" label="Paid" />
                  <Job title="AC service" meta="Joshi Apartments" who="RK" tone="good" label="Paid" />
                </Column>
              </div>
            </div>
          </div>
        </div>
      </Browser>
      <TechPhone depth={1.1} className="absolute right-0 bottom-0 h-[21.5em] w-[10.6em]" />
      <Panel depth={0.7} className="absolute top-0 right-[1em] flex items-center gap-[0.7em] rounded-[0.9em] bg-white/95 p-[0.7em] pr-[1.2em]">
        <span className="grid size-[2.1em] place-items-center rounded-[0.55em] bg-[#16a34a] text-white"><CreditCard className="size-[1em]" /></span>
        <span>
          <span className="block text-[0.72em] font-semibold">Payment received</span>
          <span className="block text-[0.58em] text-muted">Invoice FX-1042 · sent automatically</span>
        </span>
        <span className="ml-[0.6em] text-[0.52em] text-muted">now</span>
      </Panel>
    </Scene>
  );
}

function TechPhone({ className = "", depth, pop = false }: { className?: string; depth?: number; pop?: boolean }) {
  return (
    <Phone depth={depth} className={`${pop ? "an-pop" : ""} ${className}`}>
      <div className="flex h-full flex-col bg-[#f8fafc]">
        <div className="bg-white px-[0.8em] pb-[0.6em]">
          <span className="block text-[0.52em] text-[#64748b]">Good morning, Ravi</span>
          <span className="block text-[0.82em] font-semibold text-[#0f172a]">Your next job</span>
        </div>
        <div className="px-[0.6em] pt-[0.5em]">
          <span className="block overflow-hidden rounded-[0.7em] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] ring-1 ring-[#e2e8f0]">
            <MiniMap className="h-[4.4em]" />
            <span className="block p-[0.55em]">
              <span className="block text-[0.64em] font-semibold text-[#0f172a]">New AC install</span>
              <span className="block text-[0.52em] text-[#64748b]">Mehta residence · 2.4 km · 12 min</span>
              <span className="mt-[0.4em] flex items-center justify-center gap-[0.3em] rounded-[0.4em] py-[0.4em] text-white" style={{ background: blue }}><Navigation className="size-[0.6em]" /><span className="text-[0.56em] font-medium">Start route</span></span>
            </span>
          </span>
          <span className="mt-[0.5em] flex flex-col gap-[0.3em]">
            {["Photos before", "Parts used", "Customer signature"].map((t, i) => (
              <span key={t} className="flex items-center gap-[0.45em] rounded-[0.5em] bg-white px-[0.5em] py-[0.42em] ring-1 ring-[#e2e8f0]">
                <span className={`size-[0.8em] rounded-full ${i === 0 ? "bg-[#16a34a]" : "ring-1 ring-[#94a3b8]"}`} />
                <span className="text-[0.54em] text-[#0f172a]">{t}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="mt-auto flex justify-around border-t border-[#e2e8f0] bg-white py-[0.5em] text-[#94a3b8]">
          <Home className="size-[0.9em]" style={{ color: blue }} /><ClipboardList className="size-[0.9em]" /><MessageCircle className="size-[0.9em]" /><Users className="size-[0.9em]" />
        </div>
      </div>
    </Phone>
  );
}

/** Street map in the usual map-app colours, with a route. */
function MiniMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" className={`block w-full ${className}`}>
      <rect width="200" height="90" fill="#e8eaed" />
      <rect x="120" y="-5" width="90" height="40" fill="#c8e6c9" /><rect x="-5" y="60" width="60" height="40" fill="#aadaff" />
      <path d="M-5 30 L205 22 M-5 62 L205 70 M50 -5 L62 95 M140 -5 L150 95" stroke="#fff" strokeWidth="7" />
      <path d="M22 76 L56 62 L58 28 L146 24 L172 14" fill="none" stroke={blue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="76" r="5" fill="#fff" stroke={blue} strokeWidth="3" /><path d="M172 2 a8 8 0 0 1 8 8 c0 6 -8 13 -8 13 s-8 -7 -8 -13 a8 8 0 0 1 8 -8z" fill="#ea4335" /><circle cx="172" cy="10" r="3" fill="#fff" />
    </svg>
  );
}

function Crm() {
  return (
    <Vis className="relative h-full">
      <CrmShot active="pipeline" className="top-[1.6rem] left-[1.6rem] max-md:-top-[4rem] max-md:-left-[8.4rem]"><PipelineScreen /></CrmShot>
    </Vis>
  );
}

function WebApp() {
  return (
    <Vis className="h-full px-[1.4em] pt-[1.4em]">
      <Browser url="portal.fixitpro.in/reports" tab="Reports · FixIt Pro" fav={blue} className="an-pop mx-auto h-[24em] max-w-[26em]">
        <div className="flex h-full">
          <Side active={5} />
          <div className="min-w-0 flex-1 bg-[#f8fafc] p-[0.8em]">
            <span className="flex items-center justify-between"><span className="text-[0.8em] font-semibold text-[#0f172a]">Reports</span><Tag>This month</Tag></span>
            <span className="mt-[0.6em] grid grid-cols-3 gap-[0.4em]">
              {[["Jobs done", "1,284", "+12%"], ["On time", "96%", "+3%"], ["Open", "37", "-8"]].map(([l, v, d]) => (
                <span key={l} className="rounded-[0.5em] bg-white p-[0.5em] ring-1 ring-[#e2e8f0]"><span className="block text-[0.5em] text-[#64748b]">{l}</span><span className="block text-[0.88em] font-semibold text-[#0f172a]">{v}</span><span className="block text-[0.5em] font-medium text-[#16a34a]">{d}</span></span>
              ))}
            </span>
            <span className="mt-[0.5em] block rounded-[0.5em] bg-white p-[0.6em] ring-1 ring-[#e2e8f0]">
              <span className="flex items-center justify-between"><span className="text-[0.58em] font-semibold text-[#0f172a]">Jobs per week</span><span className="flex items-center gap-[0.3em]"><span className="size-[0.45em] rounded-full" style={{ background: blue }} /><span className="text-[0.5em] text-[#64748b]">Done</span></span></span>
              <Bars values={[35, 48, 42, 60, 55, 72, 66, 84, 78, 96]} hi={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} on="bg-[#2563eb]" className="mt-[0.5em] h-[4.6em]" />
            </span>
          </div>
        </div>
      </Browser>
    </Vis>
  );
}

function Mobile() {
  return (
    <Vis className="relative h-full">
      <Phone className="an-pop absolute top-[2.4em] left-1/2 h-[22em] w-[10.6em] -translate-x-[104%] -rotate-6">
        <div className="flex h-full flex-col bg-[#f8fafc] px-[0.7em]">
          <span className="block text-[0.52em] text-[#64748b]">FixIt Pro</span>
          <span className="block text-[0.8em] font-semibold text-[#0f172a]">Book a service</span>
          <span className="mt-[0.5em] grid grid-cols-2 gap-[0.35em]">
            {["AC service", "Gas refill", "Repair", "Install"].map((t, i) => (
              <span key={t} className={`rounded-[0.6em] bg-white p-[0.5em] ring-1 ${i === 0 ? "ring-2 ring-[#2563eb]" : "ring-[#e2e8f0]"}`}>
                <span className="mb-[0.3em] grid size-[1.5em] place-items-center rounded-[0.4em] bg-[#dbeafe] text-[#1d4ed8]"><Zap className="size-[0.75em]" /></span>
                <span className="block text-[0.54em] font-medium text-[#0f172a]">{t}</span>
              </span>
            ))}
          </span>
          <span className="mt-[0.5em] block rounded-[0.5em] py-[0.5em] text-center text-white" style={{ background: blue }}><span className="block text-[0.58em] font-medium">Choose a time</span></span>
        </div>
      </Phone>
      <TechPhone pop className="absolute top-[1.2em] left-1/2 h-[22em] w-[10.6em] translate-x-[4%] rotate-3" />
    </Vis>
  );
}

function Node({ icon: I, color, app, what, className = "" }: { icon: typeof Zap; color: string; app: string; what: string; className?: string }) {
  return (
    <span className={`an-pop absolute flex w-[10.4em] items-center gap-[0.5em] rounded-[0.7em] bg-white p-[0.55em] shadow-[0_0.4em_1em_-0.4em_rgba(15,23,42,0.3)] ring-1 ring-[#e2e8f0] ${className}`}>
      <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.5em] text-white" style={{ background: color }}><I className="size-[1em]" /></span>
      <span className="min-w-0"><span className="block text-[0.52em] font-medium tracking-wide text-[#64748b] uppercase">{app}</span><span className="block truncate text-[0.66em] font-semibold text-[#0f172a]">{what}</span></span>
      <span className="absolute top-1/2 -right-[0.3em] size-[0.6em] -translate-y-1/2 rounded-full bg-white ring-2 ring-[#94a3b8]" />
    </span>
  );
}

/** A workflow canvas like the ones in automation tools: app steps joined by wires. */
function Flow() {
  return (
    <Vis className="grid h-full place-items-center bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:1.1em_1.1em]">
      <div className="relative h-[15em] w-[23em] @lg:w-[38em]">
        <svg viewBox="0 0 380 150" className="absolute inset-0 hidden size-full @lg:block" fill="none" stroke="#94a3b8" strokeWidth="1.6">
          <path d="M104 75 C 125 75, 120 28, 140 28" /><path d="M104 75 C 125 75, 120 122, 140 122" /><path d="M244 28 C 262 28, 258 75, 276 75" /><path d="M244 122 C 262 122, 258 75, 276 75" />
        </svg>
        <Node icon={FileText} color="#2563eb" app="Trigger · Website form" what="New enquiry" className="top-[5.9em] left-0 @max-lg:top-0" />
        <Node icon={Users} color="#c2410c" app="Nirman CRM" what="Create lead" className="top-[1.2em] left-[14em] @max-lg:top-[3.9em] @max-lg:left-[6.3em]" />
        <Node icon={MessageCircle} color="#16a34a" app="WhatsApp message" what="Send instant reply" className="top-[10.6em] left-[14em] @max-lg:top-[7.8em] @max-lg:left-[12.6em]" />
        <Node icon={FileSpreadsheet} color="#7c3aed" app="Accounts" what="Add to sheet" className="top-[5.9em] left-[27.6em] @max-lg:top-[11.7em] @max-lg:left-[6.3em]" />
      </div>
    </Vis>
  );
}

export const softwareTiles = [Crm, WebApp, Mobile, Flow];
