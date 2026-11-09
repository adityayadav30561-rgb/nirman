import { Bell, Bold, CalendarCheck, Check, Italic, Link2, Mail, ShoppingBag, Smile } from "lucide-react";
import { Bar, Browser, Glow, Panel, Phone, Ring, Scene, Stars, Tag, Vis } from "@/components/services/kit";

/*
 * Websites artwork (docs/sections/p1-services.md). Sunrise Dental Clinic and
 * Masala Box are demo businesses that show the kind of work, not clients.
 */

export function WebScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Browser url="sunrise-clinic.in" depth={0.3} className="absolute top-[2em] left-0 h-[19.5em] w-[27em]">
        <div className="flex items-center gap-[0.9em] px-[1.2em] py-[0.8em]">
          <span className="size-[0.9em] rounded-full bg-brand" />
          <span className="text-[0.74em] font-semibold">Sunrise Dental</span>
          <span className="ml-auto flex items-center gap-[0.8em]"><Bar w="2.4em" /><Bar w="2.4em" /><Bar w="2.4em" /></span>
          <span className="rounded-full bg-ink-2 px-[0.9em] py-[0.35em] text-white"><span className="block text-[0.6em] font-medium">Book a visit</span></span>
        </div>
        <div className="mx-[1.2em] grid grid-cols-[1.25fr_1fr] items-center gap-[1em] rounded-[0.9em] bg-[linear-gradient(120deg,#fdf0e6,#f9dcc8)] p-[1.2em]">
          <div>
            <Tag tone="brand">Family dentistry in Pune</Tag>
            <span className="mt-[0.5em] block text-[1.3em] leading-[1.15] font-semibold tracking-[-0.02em]">Gentle dental care for the whole family</span>
            <span className="mt-[0.7em] flex gap-[0.5em]">
              <span className="rounded-full bg-brand px-[1em] py-[0.45em] text-white"><span className="block text-[0.62em] font-medium">Book a visit</span></span>
              <span className="rounded-full bg-white px-[1em] py-[0.45em]"><span className="block text-[0.62em] font-medium">Call us</span></span>
            </span>
          </div>
          <div className="grid h-[7em] place-items-center rounded-[0.8em] bg-[linear-gradient(140deg,#f6b48d,#e2703a)] text-white"><Smile className="size-[2.8em]" strokeWidth={1.5} /></div>
        </div>
        <div className="mx-[1.2em] mt-[0.8em] grid grid-cols-3 gap-[0.6em]">
          {["Check-ups", "Root canal", "Braces"].map((t) => (
            <div key={t} className="rounded-[0.7em] p-[0.7em] ring-1 ring-line">
              <span className="block text-[0.68em] font-semibold">{t}</span>
              <Bar w="80%" className="mt-[0.5em]" />
            </div>
          ))}
        </div>
      </Browser>
      <Phone depth={1.1} className="absolute right-[0.6em] bottom-0 h-[20.5em] w-[10.4em]">
        <div className="px-[0.8em]">
          <span className="block text-[0.82em] font-semibold">Book your visit</span>
          <span className="mt-[0.2em] block text-[0.56em] text-muted">Pick a time that suits you</span>
          <span className="mt-[0.7em] grid grid-cols-3 gap-[0.3em]">
            {["Mon 12", "Tue 13", "Wed 14"].map((d, i) => (
              <span key={d} className={`rounded-[0.5em] py-[0.5em] text-center ${i === 1 ? "bg-brand text-white" : "bg-[#f4f6f8]"}`}><span className="block text-[0.56em] font-medium">{d}</span></span>
            ))}
          </span>
          <span className="mt-[0.5em] grid grid-cols-2 gap-[0.3em]">
            {["10:00", "11:30", "4:30", "6:00"].map((d, i) => (
              <span key={d} className={`rounded-[0.5em] py-[0.5em] text-center ring-1 ${i === 2 ? "bg-[#fdeee4] ring-[#f3b592]" : "ring-line"}`}><span className="block text-[0.56em] font-medium">{d}</span></span>
            ))}
          </span>
          <span className="mt-[0.6em] block rounded-[0.5em] px-[0.6em] py-[0.55em] ring-1 ring-line"><span className="block text-[0.56em] text-muted">Your name</span></span>
          <span className="mt-[0.6em] block rounded-full bg-ink-2 py-[0.6em] text-center text-white"><span className="block text-[0.62em] font-medium">Confirm booking</span></span>
        </div>
      </Phone>
      <Panel depth={0.8} className="absolute top-0 right-[1.4em] flex items-center gap-[0.8em] p-[0.8em] pr-[1.2em]">
        <Ring value={98} className="size-[3.2em]" />
        <span>
          <span className="block text-[0.74em] font-semibold">Performance</span>
          <span className="block text-[0.62em] text-muted">Loads in 1.1 s on phones</span>
        </span>
      </Panel>
      <Panel depth={0.6} className="absolute bottom-[0.6em] left-[1.6em] flex items-center gap-[0.7em] p-[0.8em] pr-[1.3em]">
        <span className="grid size-[2.1em] place-items-center rounded-[0.6em] bg-brand text-white"><Bell className="size-[1em]" /></span>
        <span>
          <span className="block text-[0.76em] font-semibold">New enquiry</span>
          <span className="block text-[0.62em] text-muted">From the website form · just now</span>
        </span>
      </Panel>
    </Scene>
  );
}

function Design() {
  return (
    <Vis className="flex h-full items-center justify-center gap-[1em] px-[1.4em]">
      <Panel className="an-pop w-[13.5em] shrink-0 p-[1em]">
        <span className="block text-[0.62em] text-muted">Colours</span>
        <span className="mt-[0.4em] flex gap-[0.4em]">
          {["#1b1f27", "#c2410c", "#f6b48d", "#fdeee4", "#f1f3f6"].map((c) => <span key={c} className="size-[1.8em] rounded-full ring-1 ring-black/5" style={{ background: c }} />)}
        </span>
        <span className="mt-[0.8em] flex items-end gap-[0.6em]">
          <span className="text-[2.6em] leading-none font-semibold">Aa</span>
          <span className="mb-[0.2em] text-[0.62em] text-muted">Headings and text</span>
        </span>
        <span className="mt-[0.8em] flex gap-[0.4em]">
          <span className="rounded-full bg-brand px-[1em] py-[0.4em] text-white"><span className="block text-[0.62em] font-medium">Button</span></span>
          <span className="rounded-full px-[1em] py-[0.4em] ring-1 ring-ink/25"><span className="block text-[0.62em] font-medium">Button</span></span>
        </span>
      </Panel>
      <Panel className="an-pop hidden w-[15em] p-[0.8em] @lg:block">
        <span className="flex items-center justify-between"><Bar w="3em" /><span className="h-[0.9em] w-[3em] rounded-full bg-ink-2" /></span>
        <span className="mt-[0.7em] grid grid-cols-[1.2fr_1fr] gap-[0.6em] rounded-[0.6em] bg-[#fdf0e6] p-[0.7em]">
          <span className="flex flex-col gap-[0.4em]"><Bar w="100%" className="h-[0.7em] bg-ink/70" /><Bar w="70%" className="h-[0.7em] bg-ink/70" /><Bar w="90%" /><span className="mt-[0.2em] h-[1em] w-[3.4em] rounded-full bg-brand" /></span>
          <span className="rounded-[0.5em] bg-[linear-gradient(140deg,#f6b48d,#e2703a)]" />
        </span>
        <span className="mt-[0.6em] grid grid-cols-3 gap-[0.5em]">
          {[0, 1, 2].map((i) => <span key={i} className="flex flex-col gap-[0.35em] rounded-[0.5em] p-[0.5em] ring-1 ring-line"><span className="size-[1em] rounded-[0.3em] bg-[#fdeee4]" /><Bar w="90%" /><Bar w="60%" /></span>)}
        </span>
      </Panel>
    </Vis>
  );
}

function Build() {
  const scores: [number, string][] = [[98, "Performance"], [100, "Accessibility"], [100, "Best practices"], [100, "Search"]];
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[24em] p-[1.1em]">
        <span className="flex items-center justify-between"><span className="text-[0.76em] font-semibold">Launch check</span><Tag tone="good">Ready to go live</Tag></span>
        <span className="mt-[0.9em] grid grid-cols-4 gap-[0.4em]">
          {scores.map(([v, l]) => (
            <span key={l} className="flex flex-col items-center gap-[0.4em]">
              <Ring value={v} className="size-[3.7em]" />
              <span className="text-[0.58em] text-muted">{l}</span>
            </span>
          ))}
        </span>
      </Panel>
    </Vis>
  );
}

function Store() {
  return (
    <Vis className="flex h-full items-center justify-center gap-[0.9em] px-[1.4em]">
      <Panel className="an-pop w-[11em] shrink-0 overflow-hidden">
        <span className="grid h-[6.4em] place-items-center bg-[linear-gradient(140deg,#f6b48d,#d95f27)] text-white"><ShoppingBag className="size-[2.2em]" strokeWidth={1.5} /></span>
        <span className="block p-[0.8em]">
          <span className="block text-[0.78em] font-semibold">Kolhapuri masala</span>
          <span className="mt-[0.2em] flex items-center gap-[0.4em]"><Stars /><span className="text-[0.58em] text-muted">1,240</span></span>
          <span className="mt-[0.6em] block rounded-full bg-ink-2 py-[0.5em] text-center text-white"><span className="block text-[0.62em] font-medium">Add to cart</span></span>
        </span>
      </Panel>
      <div className="flex min-w-0 flex-col gap-[0.6em]">
        <Panel className="an-pop flex items-center gap-[0.6em] rounded-[0.8em] p-[0.7em]">
          <span className="grid size-[1.8em] shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="size-[0.9em]" strokeWidth={3} /></span>
          <span><span className="block text-[0.7em] font-semibold">Payment received</span><span className="block text-[0.58em] text-muted">UPI, cards, cash on delivery</span></span>
        </Panel>
        <Panel className="an-pop flex items-center gap-[0.6em] rounded-[0.8em] p-[0.7em]">
          <span className="grid size-[1.8em] shrink-0 place-items-center rounded-full bg-[#fdeee4] text-brand"><Mail className="size-[0.9em]" /></span>
          <span><span className="block text-[0.7em] font-semibold">Order email sent</span><span className="block text-[0.58em] text-muted">To the customer and to you</span></span>
        </Panel>
      </div>
    </Vis>
  );
}

function Editor() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[22em] overflow-hidden">
        <span className="flex items-center gap-[0.5em] border-b border-line px-[0.9em] py-[0.6em]">
          {[Bold, Italic, Link2].map((I, i) => <span key={i} className="grid size-[1.7em] place-items-center rounded-[0.4em] bg-[#f4f6f8]"><I className="size-[0.85em]" /></span>)}
          <Tag tone="good" className="ml-auto">Saved</Tag>
          <span className="rounded-full bg-brand px-[0.9em] py-[0.35em] text-white"><span className="block text-[0.62em] font-medium">Update</span></span>
        </span>
        <span className="block p-[1em]">
          <span className="an-pop flex items-center rounded-[0.5em] px-[0.5em] py-[0.35em] ring-2 ring-brand/60"><span className="text-[0.95em] font-semibold">Our opening hours</span><span className="ml-[0.15em] h-[1.1em] w-px bg-brand" /></span>
          <span className="mt-[0.7em] flex flex-col gap-[0.45em] px-[0.5em]"><Bar w="100%" /><Bar w="92%" /><Bar w="64%" /></span>
        </span>
      </Panel>
    </Vis>
  );
}

function Care() {
  const rows: [string, string][] = [["Backup", "Last night"], ["Updates", "This week"], ["Uptime check", "Every 5 minutes"], ["Your content change", "Done today"]];
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[22em] overflow-hidden">
        <span className="flex items-center gap-[0.5em] border-b border-line px-[1em] py-[0.7em]"><CalendarCheck className="size-[0.95em] text-brand" /><span className="text-[0.76em] font-semibold">Monthly care</span></span>
        {rows.map(([a, b]) => (
          <span key={a} className="an-pop flex items-center gap-[0.6em] border-b border-line px-[1em] py-[0.55em] last:border-0">
            <Check className="size-[0.9em] shrink-0 text-emerald-600" strokeWidth={3} />
            <span className="flex-1 text-[0.72em]">{a}</span>
            <span className="text-[0.62em] text-muted">{b}</span>
          </span>
        ))}
      </Panel>
    </Vis>
  );
}

export const webTiles = [Design, Build, Store, Editor, Care];
