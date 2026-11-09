import { ArrowUp, Check, FileText, MapPin, Navigation, Phone as PhoneIcon, Search, Sparkles, TriangleAlert } from "lucide-react";
import { Bar, Glow, Panel, Ring, Scene, Stars, Tag, Trend, Vis } from "@/components/services/kit";

/*
 * SEO artwork (docs/sections/p1-services.md). Sunrise Dental Clinic and
 * Masala Box are demo businesses that show the kind of work, not clients.
 */

function Result({ rank, name, meta, top = false }: { rank: number; name: string; meta: string; top?: boolean }) {
  return (
    <div className={`flex items-center gap-[0.8em] rounded-[0.8em] px-[0.8em] py-[0.7em] ${top ? "bg-[#fdeee4] ring-1 ring-[#f3b592]" : ""}`}>
      <span className={`grid size-[1.7em] shrink-0 place-items-center rounded-full ${top ? "bg-brand text-white" : "bg-[#f1f3f6] text-ink/60"}`}>
        <span className="text-[0.75em] font-semibold">{rank}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[0.9em] font-semibold ${top ? "" : "text-ink/55"}`}>{name}</span>
        <span className="mt-[0.15em] flex items-center gap-[0.5em]">
          <Stars className={top ? "" : "opacity-40"} />
          <span className="text-[0.66em] text-muted">{meta}</span>
        </span>
      </span>
      {top && <Tag tone="ink">Your business</Tag>}
    </div>
  );
}

export function SeoScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Panel depth={0.3} className="absolute top-[2.4em] left-[2em] w-[23em] p-[1em]">
        <div className="flex items-center gap-[0.6em] rounded-full bg-[#f4f6f8] px-[1em] py-[0.65em] ring-1 ring-line">
          <Search className="size-[1em] text-muted" />
          <span className="text-[0.9em]">dentist near me</span>
          <span className="h-[1em] w-px bg-brand" />
        </div>
        <div className="mt-[0.7em] flex flex-col gap-[0.2em]">
          <Result top rank={1} name="Sunrise Dental Clinic" meta="4.9 · Open now" />
          <Result rank={2} name="Kothrud Dental Care" meta="4.4 · Dentist" />
          <Result rank={3} name="Smile Studio Pune" meta="4.2 · Dentist" />
        </div>
      </Panel>
      <Panel depth={0.9} className="absolute top-0 right-0 w-[12.5em] p-[1em]">
        <span className="block text-[0.66em] text-muted">Position on Google</span>
        <span className="mt-[0.35em] flex items-end gap-[0.5em]">
          <span className="text-[2em] leading-none font-semibold">1</span>
          <span className="mb-[0.2em] text-[0.8em] text-muted line-through">8</span>
          <Tag tone="good" className="mb-[0.15em] ml-auto"><ArrowUp className="size-[1em]" strokeWidth={3} />7 places</Tag>
        </span>
        <span className="mt-[0.7em] block text-[0.66em] font-medium">dentist near me</span>
      </Panel>
      <Panel depth={1.3} className="absolute right-[0.4em] bottom-[1em] w-[15.5em] p-[1em]">
        <span className="flex items-center justify-between">
          <span className="text-[0.74em] font-semibold">Visitors from search</span>
          <span className="text-[0.62em] text-muted">Last 90 days</span>
        </span>
        <Trend id="seo-scene-trend" className="mt-[0.7em] h-[5.2em] w-full" />
      </Panel>
      <Panel depth={0.6} className="absolute bottom-0 left-0 flex w-[15em] gap-[0.7em] p-[0.9em]">
        <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.6em] bg-ink-2 text-white"><Sparkles className="size-[1em]" /></span>
        <span>
          <span className="block text-[0.66em] text-muted">AI assistant answer</span>
          <span className="mt-[0.2em] block text-[0.76em] leading-snug font-medium">“Families often choose <b className="font-semibold text-brand">Sunrise Dental Clinic</b>…”</span>
        </span>
      </Panel>
    </Scene>
  );
}

function Local() {
  return (
    <Vis className="relative h-full">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <rect width="400" height="240" fill="#f3ece6" />
        <path d="M-10 70 L410 40 M-10 170 L410 150 M90 -10 L120 250 M260 -10 L300 250" stroke="#fff" strokeWidth="14" />
        <path d="M-10 120 L410 205" stroke="#fff" strokeWidth="8" />
        <rect x="140" y="80" width="90" height="50" rx="8" fill="#e6efdf" />
        <rect x="320" y="60" width="70" height="70" rx="8" fill="#ecdfd4" />
        <rect x="10" y="190" width="70" height="40" rx="8" fill="#ecdfd4" />
      </svg>
      <span className="an-pop absolute top-[18%] left-[12%] text-ink/35"><MapPin className="size-[1.6em] fill-white" /></span>
      <span className="an-pop absolute top-[58%] left-[30%] text-ink/35"><MapPin className="size-[1.6em] fill-white" /></span>
      <span className="an-pop absolute top-[14%] left-[46%] grid place-items-center text-brand">
        <span className="absolute size-[3.4em] rounded-full bg-brand/15" />
        <MapPin className="relative size-[2.4em] fill-[#fdeee4]" />
      </span>
      <Panel className="an-pop absolute right-[5%] bottom-[8%] w-[17em] p-[1em] @max-md:right-1/2 @max-md:translate-x-1/2">
        <span className="flex items-start justify-between gap-[0.6em]">
          <span>
            <span className="block text-[0.95em] font-semibold">Sunrise Dental Clinic</span>
            <span className="mt-[0.2em] flex items-center gap-[0.4em]"><span className="text-[0.7em] font-medium">4.9</span><Stars /><span className="text-[0.66em] text-muted">(312)</span></span>
          </span>
          <Tag tone="good">Open now</Tag>
        </span>
        <span className="mt-[0.3em] block text-[0.68em] text-muted">Dentist · Kothrud, Pune</span>
        <span className="mt-[0.8em] grid grid-cols-2 gap-[0.5em]">
          <span className="flex items-center justify-center gap-[0.4em] rounded-full bg-brand py-[0.5em] text-white"><PhoneIcon className="size-[0.8em]" /><span className="text-[0.72em] font-medium">Call</span></span>
          <span className="flex items-center justify-center gap-[0.4em] rounded-full py-[0.5em] ring-1 ring-line"><Navigation className="size-[0.8em]" /><span className="text-[0.72em] font-medium">Directions</span></span>
        </span>
      </Panel>
    </Vis>
  );
}

function Audit() {
  const rows: [string, "good" | "warn"][] = [["Pages load in under 2 seconds", "good"], ["Sitemap submitted and indexed", "good"], ["Broken links repaired", "good"], ["4 images larger than needed", "warn"]];
  return (
    <Vis className="flex h-full items-center justify-center gap-[1.2em] px-[1.4em]">
      <Panel className="an-pop grid shrink-0 place-items-center p-[1em]">
        <Ring value={92} label="Site health" className="size-[6.4em] text-[1.25em]" />
      </Panel>
      <div className="flex min-w-0 flex-1 flex-col gap-[0.45em]">
        {rows.map(([t, tone]) => (
          <Panel key={t} className="an-pop flex items-center gap-[0.6em] rounded-[0.8em] px-[0.8em] py-[0.6em]">
            {tone === "good" ? <Check className="size-[0.95em] shrink-0 text-emerald-600" strokeWidth={3} /> : <TriangleAlert className="size-[0.95em] shrink-0 text-amber-500" />}
            <span className="min-w-0 flex-1 truncate text-[0.72em]">{t}</span>
            <Tag tone={tone}>{tone === "good" ? "Fixed" : "Next"}</Tag>
          </Panel>
        ))}
      </div>
    </Vis>
  );
}

function Shop() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="an-pop w-full max-w-[24em] p-[1.1em]">
        <span className="flex items-center gap-[0.5em]">
          <span className="grid size-[1.6em] place-items-center rounded-full bg-[#fdeee4]"><span className="text-[0.62em] font-semibold text-brand-deep">M</span></span>
          <span className="text-[0.66em] text-muted">masalabox.in › spices › kolhapuri-masala</span>
        </span>
        <span className="mt-[0.5em] block text-[1em] leading-snug font-semibold">Kolhapuri Masala, stone ground in small batches</span>
        <span className="mt-[0.4em] flex flex-wrap items-center gap-[0.5em]">
          <Stars /><span className="text-[0.68em] text-muted">4.8 · 1,240 reviews</span><Tag tone="good">In stock</Tag>
        </span>
        <span className="mt-[0.5em] flex flex-col gap-[0.4em]"><Bar w="100%" /><Bar w="72%" /></span>
      </Panel>
      <span className="absolute bottom-[1em] flex gap-[0.4em]">
        {["Product data", "Reviews", "Breadcrumbs"].map((t) => <Tag key={t} tone="ink" className="an-pop">{t}</Tag>)}
      </span>
    </Vis>
  );
}

function Ai() {
  return (
    <Vis className="flex h-full flex-col justify-center gap-[0.7em] px-[1.4em]">
      <span className="an-pop self-end rounded-[1.1em] rounded-br-[0.3em] bg-ink-2 px-[1em] py-[0.6em] text-white"><span className="block text-[0.76em]">Which dentist in Pune is good for kids?</span></span>
      <Panel className="an-pop max-w-[22em] p-[1em]">
        <span className="flex items-center gap-[0.5em]"><Sparkles className="size-[0.9em] text-brand" /><span className="text-[0.66em] font-medium text-muted">AI assistant</span></span>
        <span className="mt-[0.45em] block text-[0.78em] leading-[1.55]">Families in Pune often choose <b className="rounded-[0.3em] bg-[#fdeee4] px-[0.3em] font-semibold text-brand-deep">Sunrise Dental Clinic</b> in Kothrud. It has a kids’ dentist and is open 7 days.</span>
        <span className="mt-[0.6em] flex items-center gap-[0.4em]"><span className="text-[0.62em] text-muted">Source</span><Tag tone="brand">sunrise-clinic.in/kids-dentist</Tag></span>
      </Panel>
    </Vis>
  );
}

function Content() {
  const rows: [string, string, "good" | "warn" | "soft"][] = [["root canal cost", "Published", "good"], ["kids dentist pune", "Published", "good"], ["teeth whitening", "Writing", "warn"], ["braces or aligners", "Planned", "soft"]];
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="w-full max-w-[24em] overflow-hidden">
        <span className="flex items-center justify-between border-b border-line px-[1em] py-[0.7em]">
          <span className="text-[0.76em] font-semibold">Content plan</span>
          <span className="text-[0.62em] text-muted">Search → page</span>
        </span>
        {rows.map(([q, st, tone]) => (
          <span key={q} className="an-pop flex items-center gap-[0.6em] border-b border-line px-[1em] py-[0.6em] last:border-0">
            <Search className="size-[0.8em] shrink-0 text-muted" />
            <span className="flex-1 text-[0.72em]">{q}</span>
            <FileText className="size-[0.85em] shrink-0 text-brand" />
            <Tag tone={tone}>{st}</Tag>
          </span>
        ))}
      </Panel>
    </Vis>
  );
}

export const seoTiles = [Local, Audit, Shop, Ai, Content];
