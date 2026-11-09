import { AlignLeft, Bold, CalendarCheck, Check, ChevronDown, Clock, Frame, Heart, Image as ImageIcon, Italic, Link2, Mail, MapPin, Menu, MousePointer2, Phone as PhoneIcon, Plus, Search, ShieldCheck, ShoppingCart, Sparkles, Square, Truck, Type } from "lucide-react";
import { Bar, Browser, Glow, Panel, Phone, Ring, Scene, Stars, Vis } from "@/components/services/kit";

/*
 * Websites artwork (docs/sections/p1-services.md): mockups that look like
 * real sites and real tools, in their own colours. Sunrise Dental Clinic
 * (teal) and Masala Box (green and mustard) are demo businesses that show
 * the kind of work, not clients.
 */

const teal = "#0f766e";

/** Clinic "photo": a drawn scene, so no stock image is needed. */
function ClinicArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" className={`block ${className}`}>
      <defs>
        <linearGradient id="clinic-sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ccfbf1" /><stop offset="1" stopColor="#5eead4" /></linearGradient>
        <linearGradient id="clinic-tooth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#e6fffb" /></linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#clinic-sky)" />
      <circle cx="165" cy="30" r="46" fill="#fff" opacity="0.35" /><circle cx="24" cy="134" r="52" fill="#0f766e" opacity="0.14" />
      <ellipse cx="100" cy="128" rx="44" ry="6" fill="#0f766e" opacity="0.2" />
      <path d="M100 34 c-12 -9 -36 -8 -38 14 c-2 18 6 26 9 44 c2 12 4 26 11 26 c8 0 6 -22 18 -22 s10 22 18 22 c7 0 9 -14 11 -26 c3 -18 11 -26 9 -44 c-2 -22 -26 -23 -38 -14z" fill="url(#clinic-tooth)" stroke="#0f766e" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M84 62 q16 14 32 0" fill="none" stroke="#0f766e" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="84" cy="50" r="3" fill="#0f766e" /><circle cx="116" cy="50" r="3" fill="#0f766e" />
      <path d="M150 70 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z M44 28 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" fill="#fff" />
    </svg>
  );
}

function SiteNav({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {!compact && (
        <div className="flex items-center gap-[1em] px-[1.2em] py-[0.3em] text-white" style={{ background: teal }}>
          <span className="flex items-center gap-[0.3em]"><PhoneIcon className="size-[0.55em]" /><span className="text-[0.5em]">020 5550 0142</span></span>
          <span className="flex items-center gap-[0.3em]"><Clock className="size-[0.55em]" /><span className="text-[0.5em]">Open 7 days, 9 am to 8 pm</span></span>
          <span className="ml-auto flex items-center gap-[0.3em] whitespace-nowrap"><MapPin className="size-[0.55em]" /><span className="text-[0.5em]">Kothrud, Pune</span></span>
        </div>
      )}
      <div className="flex items-center gap-[1em] border-b border-[#eef2f2] px-[1.2em] py-[0.6em]">
        <span className="flex items-center gap-[0.35em]"><span className="grid size-[1.3em] place-items-center rounded-[0.35em] text-white" style={{ background: teal }}><Sparkles className="size-[0.7em]" /></span><span className="text-[0.74em] font-bold tracking-[-0.01em] whitespace-nowrap text-[#134e4a]">Sunrise Dental</span></span>
        {compact ? <Menu className="ml-auto size-[0.9em] text-[#134e4a]" /> : (
          <>
            <span className="ml-auto flex gap-[1em]">{["Treatments", "Kids", "Doctors"].map((t) => <span key={t} className="text-[0.56em] whitespace-nowrap text-[#334155]">{t}</span>)}</span>
            <span className="rounded-full px-[0.9em] py-[0.35em] text-white" style={{ background: teal }}><span className="block text-[0.56em] font-medium whitespace-nowrap">Book a visit</span></span>
          </>
        )}
      </div>
    </>
  );
}

function ClinicSite() {
  return (
    <div className="h-full bg-white">
      <SiteNav />
      <div className="grid grid-cols-[1.15fr_1fr] items-center gap-[1em] px-[1.2em] py-[1em]">
        <div>
          <span className="inline-block rounded-full bg-[#ccfbf1] px-[0.7em] py-[0.15em]"><span className="block text-[0.5em] font-semibold text-[#0f766e]">Family dentistry in Pune</span></span>
          <span className="mt-[0.4em] block text-[1.3em] leading-[1.12] font-bold tracking-[-0.025em] text-[#0f172a]">Gentle dental care for the whole family</span>
          <span className="mt-[0.5em] block text-[0.58em] leading-relaxed text-[#475569]">Painless treatments, a kids’ dentist and same-day appointments, in the heart of Kothrud.</span>
          <span className="mt-[0.7em] flex items-center gap-[0.5em]">
            <span className="rounded-full px-[1em] py-[0.45em] text-white" style={{ background: teal }}><span className="block text-[0.6em] font-medium whitespace-nowrap">Book a visit</span></span>
            <span className="rounded-full px-[1em] py-[0.45em] ring-1 ring-[#cbd5e1]"><span className="block text-[0.6em] font-medium whitespace-nowrap text-[#0f172a]">Treatments</span></span>
          </span>
          <span className="mt-[0.7em] flex items-center gap-[0.4em]"><Stars /><span className="text-[0.54em] text-[#475569]"><b className="text-[#0f172a]">4.9</b> from 312 patient reviews</span></span>
        </div>
        <div className="relative">
          <ClinicArt className="h-[9.4em] w-full rounded-[0.9em]" />
          <span className="absolute -bottom-[0.6em] -left-[0.8em] flex items-center gap-[0.4em] rounded-[0.6em] bg-white p-[0.5em] shadow-[0_0.5em_1.2em_-0.4em_rgba(15,23,42,0.35)]">
            <span className="grid size-[1.6em] place-items-center rounded-full bg-[#ccfbf1] text-[#0f766e]"><CalendarCheck className="size-[0.8em]" /></span>
            <span><span className="block text-[0.48em] text-[#64748b]">Next free slot</span><span className="block text-[0.58em] font-semibold text-[#0f172a]">Today, 4:30 pm</span></span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[0.6em] px-[1.2em]">
        {([["Check-ups and cleaning", "#ccfbf1", "#0f766e"], ["Root canal treatment", "#fee2e2", "#dc2626"], ["Braces and aligners", "#e0e7ff", "#4f46e5"]] as const).map(([t, bg, fg]) => (
          <div key={t} className="rounded-[0.7em] p-[0.7em] ring-1 ring-[#e2e8f0]">
            <span className="grid size-[1.5em] place-items-center rounded-[0.4em]" style={{ background: bg, color: fg }}><ShieldCheck className="size-[0.8em]" /></span>
            <span className="mt-[0.4em] block text-[0.62em] font-semibold text-[#0f172a]">{t}</span>
            <Bar w="85%" className="mt-[0.4em]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ClinicPhone({ className = "", depth }: { className?: string; depth?: number }) {
  return (
    <Phone depth={depth} className={className}>
      <div className="flex h-full flex-col bg-white">
        <SiteNav compact />
        <ClinicArt className="h-[5em] w-full" />
        <div className="px-[0.8em] pt-[0.6em]">
          <span className="block text-[0.82em] leading-tight font-bold tracking-[-0.02em] text-[#0f172a]">Book your visit</span>
          <span className="mt-[0.5em] grid grid-cols-3 gap-[0.3em]">
            {["Mon 12", "Tue 13", "Wed 14"].map((d, i) => (
              <span key={d} className={`rounded-[0.5em] py-[0.45em] text-center ${i === 1 ? "text-white" : "bg-[#f1f5f9] text-[#0f172a]"}`} style={i === 1 ? { background: teal } : undefined}><span className="block text-[0.54em] font-medium">{d}</span></span>
            ))}
          </span>
          <span className="mt-[0.35em] grid grid-cols-2 gap-[0.3em]">
            {["10:00 am", "11:30 am", "4:30 pm", "6:00 pm"].map((d, i) => (
              <span key={d} className={`rounded-[0.5em] py-[0.45em] text-center ring-1 ${i === 2 ? "bg-[#ccfbf1] ring-[#0f766e]" : "ring-[#e2e8f0]"}`}><span className="block text-[0.54em] font-medium text-[#0f172a]">{d}</span></span>
            ))}
          </span>
          <span className="mt-[0.5em] block rounded-full py-[0.55em] text-center text-white" style={{ background: teal }}><span className="block text-[0.6em] font-medium">Confirm booking</span></span>
        </div>
      </div>
    </Phone>
  );
}

export function WebScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={38} h={28} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Browser url="sunrise-clinic.in" tab="Sunrise Dental Clinic, Pune" fav={teal} depth={0.3} className="absolute top-[1.2em] left-0 h-[25em] w-[27.8em]">
        <ClinicSite />
      </Browser>
      <ClinicPhone depth={1.1} className="absolute right-0 bottom-0 h-[21.5em] w-[10.6em]" />
      <Panel depth={0.7} className="absolute top-0 right-[0.8em] flex items-center gap-[0.7em] rounded-[0.9em] p-[0.6em] pr-[1.2em]">
        <Ring value={98} className="size-[2.9em]" />
        <span>
          <span className="block text-[0.72em] font-semibold">Performance</span>
          <span className="block text-[0.58em] text-muted">Loads in 1.1 s on phones</span>
        </span>
      </Panel>
    </Scene>
  );
}

/** A design tool: layers on the left, the page on the canvas with a selected frame, properties on the right. */
function Design() {
  return (
    <Vis className="h-full px-[1.4em] pt-[1.4em]">
      <div className="an-pop mx-auto flex h-[24em] max-w-[40em] flex-col overflow-hidden rounded-[0.8em] bg-[#2c2c2c] shadow-[0_1.6em_3.2em_-1.2em_rgba(18,20,24,0.45)]">
        <div className="flex h-[2em] shrink-0 items-center gap-[0.9em] px-[0.9em] text-white/80">
          <MousePointer2 className="size-[0.8em] text-[#0d99ff]" /><Frame className="size-[0.8em]" /><Square className="size-[0.8em]" /><Type className="size-[0.8em]" />
          <span className="mx-auto text-[0.58em] text-white/70">Sunrise Dental · Homepage</span>
          <span className="rounded-[0.3em] bg-[#0d99ff] px-[0.7em] py-[0.2em] text-white"><span className="block text-[0.54em] font-medium">Share</span></span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="hidden w-[8.5em] shrink-0 flex-col gap-[0.5em] border-r border-white/10 p-[0.7em] @lg:flex">
            <span className="text-[0.52em] font-semibold text-white/50">Layers</span>
            {["Desktop · Home", "Header", "Hero", "Treatments", "Phone · Home"].map((t, i) => (
              <span key={t} className={`flex items-center gap-[0.4em] rounded-[0.3em] px-[0.4em] py-[0.25em] ${i === 2 ? "bg-[#0d99ff]/25 text-white" : "text-white/70"} ${i > 0 && i < 4 ? "ml-[0.7em]" : ""}`}><Frame className="size-[0.6em]" /><span className="text-[0.54em]">{t}</span></span>
            ))}
          </div>
          <div className="relative min-w-0 flex-1 bg-[#1e1e1e] p-[1.2em]">
            <span className="mb-[0.3em] block text-[0.5em] text-white/50">Desktop · Home</span>
            <div className="relative overflow-hidden rounded-[0.2em] bg-white">
              <div className="flex items-center justify-between px-[0.8em] py-[0.5em]"><span className="flex items-center gap-[0.3em]"><span className="size-[0.8em] rounded-[0.2em]" style={{ background: teal }} /><Bar w="3.4em" className="bg-[#134e4a]/70" /></span><span className="h-[0.9em] w-[3em] rounded-full" style={{ background: teal }} /></div>
              <div className="relative mx-[0.8em] mb-[0.8em] grid grid-cols-[1.2fr_1fr] gap-[0.7em] p-[0.5em] outline-2 outline-[#0d99ff]">
                <span className="absolute -top-[1.25em] left-0 rounded-[0.2em] bg-[#0d99ff] px-[0.4em]"><span className="block text-[0.46em] text-white">Hero</span></span>
                {["-top-[0.25em] -left-[0.25em]", "-top-[0.25em] -right-[0.25em]", "-bottom-[0.25em] -left-[0.25em]", "-right-[0.25em] -bottom-[0.25em]"].map((c) => <span key={c} className={`absolute size-[0.45em] bg-white ring-1 ring-[#0d99ff] ${c}`} />)}
                <span className="flex flex-col justify-center gap-[0.35em]"><Bar w="96%" className="h-[0.75em] bg-[#0f172a]" /><Bar w="70%" className="h-[0.75em] bg-[#0f172a]" /><Bar w="88%" /><span className="mt-[0.2em] h-[1.1em] w-[4em] rounded-full" style={{ background: teal }} /></span>
                <ClinicArt className="h-[5.4em] w-full rounded-[0.4em]" />
                <span className="absolute -bottom-[1.4em] left-1/2 -translate-x-1/2 rounded-[0.2em] bg-[#0d99ff] px-[0.4em]"><span className="block text-[0.46em] text-white">1120 × 420</span></span>
              </div>
              <div className="grid grid-cols-3 gap-[0.5em] px-[0.8em] pb-[0.8em]">{[0, 1, 2].map((i) => <span key={i} className="flex flex-col gap-[0.3em] rounded-[0.3em] p-[0.5em] ring-1 ring-[#e2e8f0]"><span className="size-[0.9em] rounded-[0.25em] bg-[#ccfbf1]" /><Bar w="90%" /><Bar w="60%" /></span>)}</div>
            </div>
          </div>
          <div className="hidden w-[8.5em] shrink-0 flex-col gap-[0.6em] border-l border-white/10 p-[0.7em] @lg:flex">
            <span className="text-[0.52em] font-semibold text-white/50">Fill</span>
            {[teal, "#ccfbf1", "#0f172a"].map((c) => <span key={c} className="flex items-center gap-[0.4em]"><span className="size-[0.9em] rounded-[0.2em] ring-1 ring-white/20" style={{ background: c }} /><span className="text-[0.52em] text-white/75 uppercase">{c.slice(1)}</span></span>)}
            <span className="mt-[0.3em] text-[0.52em] font-semibold text-white/50">Text</span>
            <span className="rounded-[0.3em] bg-white/8 px-[0.5em] py-[0.3em]"><span className="block text-[0.52em] text-white/75">Poppins · Bold · 48</span></span>
          </div>
        </div>
      </div>
    </Vis>
  );
}

/** A page-speed report as testing tools show it. */
function Build() {
  const scores: [number, string][] = [[98, "Performance"], [100, "Accessibility"], [100, "Best practices"], [100, "SEO"]];
  const metrics: [string, string][] = [["First Contentful Paint", "0.8 s"], ["Largest Contentful Paint", "1.1 s"], ["Total Blocking Time", "20 ms"], ["Cumulative Layout Shift", "0"]];
  return (
    <Vis className="h-full px-[1.4em] pt-[1.6em]">
      <Panel className="mx-auto max-w-[24em] rounded-[0.6em] p-[1.1em]">
        <span className="grid grid-cols-4 gap-[0.4em]">
          {scores.map(([v, l]) => (
            <span key={l} className="flex flex-col items-center gap-[0.4em]">
              <span className="rounded-full bg-[#e6f6ec]"><Ring value={v} color="#0cce6b" className="size-[3.6em] text-[#0b8043]" /></span>
              <span className="text-[0.56em] text-[#3c4043]">{l}</span>
            </span>
          ))}
        </span>
        <span className="mt-[0.9em] block border-t border-[#e8eaed] pt-[0.6em] text-[0.5em] font-medium tracking-[0.08em] text-[#5f6368] uppercase">Metrics</span>
        <span className="mt-[0.3em] grid grid-cols-2 gap-x-[1em]">
          {metrics.map(([l, v]) => (
            <span key={l} className="an-pop flex items-center gap-[0.4em] border-b border-[#e8eaed] py-[0.45em]">
              <span className="size-[0.5em] shrink-0 rounded-full bg-[#0cce6b]" />
              <span className="min-w-0 flex-1 truncate text-[0.56em] text-[#3c4043]">{l}</span>
              <span className="text-[0.66em] font-medium text-[#0b8043]">{v}</span>
            </span>
          ))}
        </span>
      </Panel>
    </Vis>
  );
}

/** A spice jar, drawn. */
function Jar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`block ${className}`}>
      <rect width="120" height="120" fill="#fef3c7" />
      <circle cx="96" cy="26" r="30" fill="#fde68a" /><ellipse cx="60" cy="106" rx="30" ry="5" fill="#92400e" opacity="0.18" />
      <rect x="42" y="18" width="36" height="12" rx="3" fill="#14532d" /><rect x="36" y="28" width="48" height="76" rx="9" fill="#b91c1c" />
      <rect x="36" y="28" width="12" height="76" rx="6" fill="#fff" opacity="0.18" /><rect x="40" y="50" width="40" height="34" rx="3" fill="#fffbeb" />
      <rect x="45" y="56" width="30" height="4" rx="2" fill="#14532d" /><rect x="49" y="64" width="22" height="3" rx="1.5" fill="#b45309" /><circle cx="60" cy="75" r="4" fill="#d97706" />
    </svg>
  );
}

function Store() {
  return (
    <Vis className="h-full px-[1.4em] pt-[1.4em]">
      <Browser url="masalabox.in/kolhapuri-masala" tab="Kolhapuri Masala · Masala Box" fav="#14532d" className="an-pop mx-auto h-[24em] max-w-[26em]">
        <div className="h-full bg-white">
          <div className="bg-[#14532d] py-[0.25em] text-center text-[#fef3c7]"><span className="block text-[0.48em]">Free delivery on orders above ₹499</span></div>
          <div className="flex items-center gap-[0.8em] border-b border-[#f1f1ee] px-[1em] py-[0.5em]">
            <span className="text-[0.74em] font-bold tracking-[-0.01em] text-[#14532d]">Masala Box</span>
            <span className="ml-auto flex items-center gap-[0.7em] text-[#3f3f46]"><Search className="size-[0.75em]" /><Heart className="size-[0.75em]" /><span className="relative"><ShoppingCart className="size-[0.8em]" /><span className="absolute -top-[0.4em] -right-[0.5em] grid size-[0.8em] place-items-center rounded-full bg-[#b91c1c] text-white"><span className="text-[0.4em] font-bold">2</span></span></span></span>
          </div>
          <div className="grid grid-cols-[1fr_1.15fr] gap-[0.9em] p-[1em]">
            <Jar className="w-full rounded-[0.6em]" />
            <div>
              <span className="block text-[0.5em] text-[#71717a]">Spice blends</span>
              <span className="block text-[0.9em] leading-tight font-bold text-[#18181b]">Kolhapuri Masala, 200 g</span>
              <span className="mt-[0.25em] flex items-center gap-[0.3em]"><Stars /><span className="text-[0.5em] text-[#71717a]">4.8 (1,240)</span></span>
              <span className="mt-[0.35em] flex items-baseline gap-[0.4em]"><span className="text-[1em] font-bold text-[#18181b]">₹249</span><span className="text-[0.56em] text-[#a1a1aa] line-through">₹299</span></span>
              <span className="mt-[0.5em] block rounded-[0.4em] bg-[#14532d] py-[0.5em] text-center text-white"><span className="block text-[0.6em] font-semibold">Add to cart</span></span>
              <span className="mt-[0.5em] flex items-center gap-[0.3em] text-[#15803d]"><Truck className="size-[0.7em]" /><span className="text-[0.5em]">Delivery in 2 to 4 days · COD</span></span>
            </div>
          </div>
        </div>
      </Browser>
    </Vis>
  );
}

/** A block editor like WordPress: dark top bar, blue Update button, a heading being typed. */
function Editor() {
  return (
    <Vis className="h-full px-[1.4em] pt-[1.4em]">
      <div className="an-pop mx-auto flex h-[24em] max-w-[24em] flex-col overflow-hidden rounded-[0.6em] bg-white shadow-[0_1.6em_3.2em_-1.2em_rgba(18,20,24,0.3),0_0_0_1px_rgba(5,7,12,0.06)]">
        <div className="flex h-[2.3em] shrink-0 items-center gap-[0.6em] border-b border-[#e0e0e0] pr-[0.7em]">
          <span className="grid h-full w-[2.3em] place-items-center bg-[#1e1e1e] text-white"><span className="text-[0.8em] font-bold">W</span></span>
          <span className="grid size-[1.4em] place-items-center rounded-[0.2em] bg-[#3858e9] text-white"><Plus className="size-[0.8em]" /></span>
          <AlignLeft className="size-[0.8em] text-[#1e1e1e]" />
          <span className="ml-auto text-[0.54em] text-[#3858e9]">Saved</span>
          <span className="rounded-[0.2em] bg-[#3858e9] px-[0.8em] py-[0.35em] text-white"><span className="block text-[0.56em] font-medium">Update</span></span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 px-[1.4em] py-[1.2em]">
            <span className="mb-[0.5em] inline-flex items-center gap-[0.5em] rounded-[0.2em] px-[0.5em] py-[0.3em] ring-1 ring-[#1e1e1e]">
              <Type className="size-[0.7em]" /><span className="h-[0.8em] w-px bg-[#ddd]" /><Bold className="size-[0.7em]" /><Italic className="size-[0.7em]" /><Link2 className="size-[0.7em]" /><ChevronDown className="size-[0.7em]" />
            </span>
            <span className="flex items-center"><span className="text-[1.25em] leading-tight font-bold text-[#1e1e1e]">Our opening hours</span><span className="ml-[0.1em] h-[1.4em] w-px bg-[#3858e9]" /></span>
            <span className="mt-[0.7em] flex flex-col gap-[0.4em]"><Bar w="100%" /><Bar w="94%" /><Bar w="60%" /></span>
            <span className="mt-[0.8em] grid h-[4.2em] place-items-center rounded-[0.2em] bg-[#f0f0f0] text-[#757575]"><ImageIcon className="size-[1.2em]" /></span>
          </div>
          <div className="hidden w-[7.6em] shrink-0 flex-col gap-[0.5em] border-l border-[#e0e0e0] p-[0.7em] @xs:flex">
            <span className="flex gap-[0.6em] border-b border-[#e0e0e0] pb-[0.4em]"><span className="text-[0.54em] font-semibold text-[#1e1e1e]">Page</span><span className="text-[0.54em] text-[#757575]">Block</span></span>
            {[["Status", "Published"], ["Link", "/opening-hours"], ["Author", "You"]].map(([a, b]) => <span key={a}><span className="block text-[0.46em] text-[#757575]">{a}</span><span className="block text-[0.54em] text-[#3858e9]">{b}</span></span>)}
          </div>
        </div>
      </div>
    </Vis>
  );
}

/** An uptime and backups monitor. */
function Care() {
  const rows: [string, string][] = [["Nightly backup", "Today, 02:00"], ["Plugin and security updates", "This week"], ["Your content change", "Done today"]];
  return (
    <Vis className="h-full px-[1.4em] pt-[1.6em]">
      <Panel className="mx-auto max-w-[23em] overflow-hidden rounded-[0.7em]">
        <span className="flex items-center gap-[0.5em] bg-[#f0fdf4] px-[1em] py-[0.7em]">
          <span className="relative grid size-[1.1em] place-items-center"><span className="absolute size-full rounded-full bg-[#22c55e]/30" /><span className="size-[0.55em] rounded-full bg-[#16a34a]" /></span>
          <span className="text-[0.74em] font-semibold text-[#14532d]">sunrise-clinic.in is up</span>
          <span className="ml-auto text-[0.56em] text-[#15803d]">Checked 1 min ago</span>
        </span>
        <span className="block px-[1em] pt-[0.7em]">
          <span className="flex items-center justify-between"><span className="text-[0.56em] text-[#64748b]">Uptime, last 30 days</span><span className="text-[0.66em] font-semibold text-[#0f172a]">99.98%</span></span>
          <span className="mt-[0.4em] flex h-[1.6em] gap-[0.14em]">
            {Array.from({ length: 30 }, (_, i) => <span key={i} className={`an-bar flex-1 origin-bottom rounded-[0.1em] ${i === 17 ? "bg-[#f59e0b]" : "bg-[#22c55e]"}`} />)}
          </span>
        </span>
        <span className="mt-[0.5em] block">
          {rows.map(([a, b]) => (
            <span key={a} className="an-pop flex items-center gap-[0.6em] border-t border-[#f1f5f9] px-[1em] py-[0.5em]">
              <Check className="size-[0.85em] shrink-0 text-[#16a34a]" strokeWidth={3} />
              <span className="flex-1 text-[0.66em] text-[#0f172a]">{a}</span>
              <span className="text-[0.56em] text-[#64748b]">{b}</span>
            </span>
          ))}
          <span className="flex items-center gap-[0.6em] border-t border-[#f1f5f9] px-[1em] py-[0.5em]"><Mail className="size-[0.85em] shrink-0 text-[#64748b]" /><span className="flex-1 text-[0.66em] text-[#0f172a]">Monthly care report</span><span className="text-[0.56em] text-[#64748b]">Sent on the 1st</span></span>
        </span>
      </Panel>
    </Vis>
  );
}

export const webTiles = [Design, Build, Store, Editor, Care];
