import { ArrowUp, Bookmark, Globe, Mic, Navigation, Phone as PhoneIcon, Search, Share2, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { servicePhotos } from "@/content/service-photos";
import { Bar, Browser, Glow, Panel, Ring, Scene, Stars, Vis } from "@/components/services/kit";

/*
 * SEO artwork (docs/sections/p1-services.md): mockups in the look of a real
 * search page, map listing, audit tool, AI assistant and keyword tool, in
 * their usual colours (blue links, red pins). No search-engine logo.
 * Sunrise Dental Clinic and Brew Box are demo businesses, not clients.
 */

const link = "#1a0dab";
const gblue = "#1a73e8";

/** Map in the usual map-app colours. */
function MapArt({ className = "", pins = true }: { className?: string; pins?: boolean }) {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={`block ${className}`}>
      <rect width="400" height="240" fill="#e8eaed" />
      <path d="M-10 190 C 80 170, 120 230, 210 250 L-10 250z" fill="#aadaff" />
      <rect x="250" y="20" width="120" height="70" rx="8" fill="#c8e6c9" /><rect x="30" y="20" width="60" height="50" rx="6" fill="#f1f3f4" /><rect x="150" y="120" width="70" height="46" rx="6" fill="#f1f3f4" />
      <path d="M-10 100 L410 84" stroke="#fde293" strokeWidth="11" /><path d="M-10 100 L410 84" stroke="#f9cb5a" strokeWidth="1" />
      <path d="M-10 40 L410 20 M-10 176 L410 190 M110 -10 L134 250 M236 -10 L262 250 M330 -10 L350 250" stroke="#fff" strokeWidth="8" />
      {pins && (
        <>
          <g fill="#ea4335"><path d="M190 46 a14 14 0 0 1 14 14 c0 11 -14 24 -14 24 s-14 -13 -14 -24 a14 14 0 0 1 14 -14z" /><circle cx="190" cy="60" r="5" fill="#fff" /></g>
          <g fill="#ea4335" opacity="0.75"><path d="M70 124 a9 9 0 0 1 9 9 c0 7 -9 15 -9 15 s-9 -8 -9 -15 a9 9 0 0 1 9 -9z" /><path d="M306 138 a9 9 0 0 1 9 9 c0 7 -9 15 -9 15 s-9 -8 -9 -15 a9 9 0 0 1 9 -9z" /></g>
        </>
      )}
    </svg>
  );
}

function Place({ letter, name, rating, count, meta, first = false }: { letter: string; name: string; rating: string; count: string; meta: string; first?: boolean }) {
  return (
    <div className={`relative border-b border-[#ebedef] py-[0.55em] pr-[0.4em] pl-[0.5em] last:border-0 ${first ? "rounded-[0.4em] bg-[#e8f0fe]" : ""}`}>
      <span className="flex items-center gap-[0.4em]"><span className="grid size-[1.2em] place-items-center rounded-full bg-[#ea4335] text-white"><span className="text-[0.48em] font-bold">{letter}</span></span><span className="text-[0.74em] font-medium text-[#202124]">{name}</span></span>
      <span className="mt-[0.15em] flex items-center gap-[0.3em] pl-[1.6em]"><span className="text-[0.56em] text-[#70757a]">{rating}</span><Stars /><span className="text-[0.56em] text-[#70757a]">({count}) · Dentist</span></span>
      <span className="block pl-[1.6em] text-[0.56em] text-[#70757a]">{meta} · <span className="text-[#188038]">Open</span> · Closes 8 pm</span>
    </div>
  );
}

export function SeoScene({ className = "" }: { className?: string }) {
  return (
    <Scene w={36} h={27} className={className}>
      <Glow className="-top-[10%] left-[0%] h-[120%] w-[100%]" />
      <Browser url="dentist near me" tab="dentist near me · Search" fav={gblue} depth={0.3} className="absolute top-[1em] left-0 h-[25.4em] w-[28em]">
        <div className="h-full bg-white px-[1.2em] pt-[0.8em]">
          <div className="flex items-center gap-[0.6em] rounded-full px-[1em] py-[0.5em] shadow-[0_1px_6px_rgba(32,33,36,0.28)]">
            <span className="flex-1 text-[0.74em] text-[#202124]">dentist near me</span>
            <Mic className="size-[0.85em]" style={{ color: gblue }} /><Search className="size-[0.85em]" style={{ color: gblue }} />
          </div>
          <div className="mt-[0.6em] flex gap-[1.2em] border-b border-[#ebedef]">
            {["All", "Maps", "Images", "News", "Videos"].map((t, i) => <span key={t} className={`pb-[0.35em] ${i === 0 ? "border-b-2 border-[#1a73e8] text-[#1a73e8]" : "text-[#5f6368]"}`}><span className="block text-[0.58em]">{t}</span></span>)}
          </div>
          <span className="mt-[0.6em] block text-[0.82em] text-[#202124]">Places</span>
          <div className="mt-[0.4em] grid grid-cols-[1.25fr_1fr] gap-[0.8em]">
            <div>
              <Place first letter="A" name="Sunrise Dental Clinic" rating="4.9" count="312" meta="Kothrud" />
              <Place letter="B" name="Kothrud Dental Care" rating="4.4" count="96" meta="Karve Road" />
              <Place letter="C" name="Smile Studio Pune" rating="4.2" count="58" meta="Paud Road" />
            </div>
            <MapArt className="h-[11.2em] w-full rounded-[0.6em]" />
          </div>
        </div>
      </Browser>
      <Panel depth={1.2} className="absolute right-0 bottom-0 w-[16em] overflow-hidden rounded-[0.7em]">
        <span className="block px-[0.9em] pt-[0.7em] text-[0.66em] font-medium text-[#202124]">Performance on Search results</span>
        <span className="mt-[0.5em] grid grid-cols-2">
          <span className="bg-[#4285f4] px-[0.9em] py-[0.5em] text-white"><span className="block text-[0.5em]">Total clicks</span><span className="block text-[1.05em] leading-tight font-medium">4.82K</span></span>
          <span className="bg-[#5e35b1] px-[0.9em] py-[0.5em] text-white"><span className="block text-[0.5em]">Total impressions</span><span className="block text-[1.05em] leading-tight font-medium">96.4K</span></span>
        </span>
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" className="an-wipe block h-[4.6em] w-full px-[0.6em] pt-[0.5em]">
          <path d="M0 17 L100 17 M0 30 L100 30 M0 4 L100 4" stroke="#ebedef" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          <path d="M0 28 L10 26 L20 27 L30 22 L40 23 L50 18 L60 16 L70 17 L80 11 L90 9 L100 5" fill="none" stroke="#4285f4" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <path d="M0 24 L10 23 L20 20 L30 21 L40 17 L50 15 L60 16 L70 11 L80 10 L90 6 L100 4" fill="none" stroke="#5e35b1" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="flex justify-between px-[0.9em] pb-[0.5em] text-[#70757a]"><span className="text-[0.46em]">Aug</span><span className="text-[0.46em]">Sep</span><span className="text-[0.46em]">Oct</span><span className="text-[0.46em]">Nov</span></span>
      </Panel>
      <Panel depth={0.8} className="absolute top-0 right-[0.6em] flex items-center gap-[0.6em] rounded-[0.8em] p-[0.7em] pr-[1em]">
        <span className="grid size-[2.2em] place-items-center rounded-full bg-[#e6f4ea] text-[#188038]"><ArrowUp className="size-[1.1em]" strokeWidth={3} /></span>
        <span><span className="block text-[0.56em] text-[#5f6368]">dentist near me</span><span className="block text-[0.72em] font-semibold text-[#202124]">Position 8 → 1</span></span>
      </Panel>
    </Scene>
  );
}

/** A place card in a maps app. */
function Local() {
  const actions: [typeof Navigation, string, boolean][] = [[Navigation, "Directions", true], [PhoneIcon, "Call", false], [Globe, "Website", false], [Bookmark, "Save", false], [Share2, "Share", false]];
  return (
    <Vis className="relative h-full">
      <MapArt className="absolute inset-0 size-full" />
      <Panel className="an-pop absolute top-[1.4em] left-[1.4em] w-[19em] overflow-hidden rounded-[0.8em] @max-md:left-1/2 @max-md:-translate-x-1/2">
        <span className="flex items-center gap-[0.5em] border-b border-[#ebedef] px-[0.9em] py-[0.55em]"><Search className="size-[0.8em] text-[#5f6368]" /><span className="text-[0.64em] text-[#202124]">dentist near me</span></span>
        <span className="block px-[0.9em] pt-[0.7em]">
          <span className="block text-[1em] font-medium text-[#202124]">Sunrise Dental Clinic</span>
          <span className="mt-[0.15em] flex items-center gap-[0.3em]"><span className="text-[0.62em] text-[#70757a]">4.9</span><Stars /><span className="text-[0.62em] text-[#70757a]">(312)</span></span>
          <span className="block text-[0.62em] text-[#70757a]">Dentist · Kothrud, Pune</span>
          <span className="block text-[0.62em]"><span className="text-[#188038]">Open</span><span className="text-[#70757a]"> · Closes 8 pm</span></span>
        </span>
        <span className="flex justify-between px-[0.9em] py-[0.8em]">
          {actions.map(([I, t, on]) => (
            <span key={t} className="flex flex-col items-center gap-[0.3em]">
              <span className={`grid size-[2.1em] place-items-center rounded-full ${on ? "bg-[#1a73e8] text-white" : "text-[#1a73e8] ring-1 ring-[#dadce0]"}`}><I className="size-[0.95em]" /></span>
              <span className="text-[0.5em] text-[#1a73e8]">{t}</span>
            </span>
          ))}
        </span>
      </Panel>
    </Vis>
  );
}

/** A site-audit report as audit tools show it: health score, error counts, issue list. */
function Audit() {
  const counts: [string, string, string][] = [["Errors", "3", "#dc2626"], ["Warnings", "12", "#ea580c"], ["Notices", "41", "#2563eb"]];
  const rows: [string, string, string][] = [["4 pages have slow load speed", "#dc2626", "Fixing"], ["12 images without alt text", "#ea580c", "Fixed"], ["2 old pages redirect twice", "#ea580c", "Fixed"], ["Sitemap not submitted", "#2563eb", "Fixed"]];
  return (
    <Vis className="h-full px-[1.4em] pt-[1.5em]">
      <Panel className="mx-auto max-w-[25em] rounded-[0.7em] p-[1em]">
        <span className="flex items-center justify-between"><span><span className="block text-[0.76em] font-semibold text-[#0f172a]">Site audit: sunrise-clinic.in</span><span className="block text-[0.52em] text-[#64748b]">100 pages crawled · today</span></span><span className="rounded-[0.3em] bg-[#f1f5f9] px-[0.5em] py-[0.2em]"><span className="block text-[0.5em] text-[#475569]">Re-run</span></span></span>
        <span className="mt-[0.8em] grid grid-cols-[auto_1fr] items-center gap-[1em]">
          <Ring value={92} label="Site health" color="#16a34a" className="size-[5.4em] text-[1.15em]" />
          <span className="grid grid-cols-3 gap-[0.4em]">
            {counts.map(([l, v, c]) => <span key={l} className="rounded-[0.5em] p-[0.5em] ring-1 ring-[#e2e8f0]"><span className="block text-[0.5em] text-[#64748b]">{l}</span><span className="block text-[1.05em] font-semibold" style={{ color: c }}>{v}</span></span>)}
          </span>
        </span>
        <span className="mt-[0.7em] block">
          {rows.map(([t, c, st]) => (
            <span key={t} className="an-pop flex items-center gap-[0.5em] border-t border-[#f1f5f9] py-[0.42em]">
              <span className="size-[0.5em] shrink-0 rounded-full" style={{ background: c }} />
              <span className="min-w-0 flex-1 truncate text-[0.62em] text-[#0f172a]">{t}</span>
              <span className={`rounded-full px-[0.6em] py-[0.1em] ${st === "Fixed" ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fef3c7] text-[#b45309]"}`}><span className="block text-[0.5em] font-medium">{st}</span></span>
            </span>
          ))}
        </span>
      </Panel>
    </Vis>
  );
}

/** A product page as a search result with rating, price and stock (a rich result). */
function Shop() {
  return (
    <Vis className="grid h-full place-items-center px-[1.4em]">
      <Panel className="an-pop w-full max-w-[25em] rounded-[0.7em] p-[1.1em]">
        <span className="flex items-center gap-[0.5em]">
          <span className="grid size-[1.7em] place-items-center rounded-full bg-[#3b2414] text-[#fde9c8]"><span className="text-[0.6em] font-bold">B</span></span>
          <span><span className="block text-[0.64em] text-[#202124]">Brew Box</span><span className="block text-[0.54em] text-[#4d5156]">https://brewbox.in › coffee › house-blend</span></span>
        </span>
        <span className="mt-[0.5em] grid grid-cols-[1fr_auto] gap-[0.8em]">
          <span>
            <span className="block text-[0.95em] leading-snug" style={{ color: link }}>House Blend Coffee 250 g, freshly roasted | Brew Box</span>
            <span className="mt-[0.25em] flex flex-wrap items-center gap-[0.3em]"><span className="text-[0.58em] text-[#70757a]">4.8</span><Stars /><span className="text-[0.58em] text-[#70757a]">(1,240) · ₹249 · In stock</span></span>
            <span className="mt-[0.3em] block text-[0.6em] leading-snug text-[#4d5156]">Smooth and nutty, roasted in small batches every week. Whole bean or ground. Free delivery above ₹499.</span>
          </span>
          {servicePhotos.product ? (
            <span className="relative block size-[4.6em] overflow-hidden rounded-[0.5em]"><Image src={servicePhotos.product} alt="" fill sizes="5rem" className="object-cover" /></span>
          ) : (
            <span className="block size-[4.6em] rounded-[0.5em] bg-[#fde9c8]" />
          )}
        </span>
        <span className="mt-[0.6em] flex gap-[0.4em]">{["Delivery in 2 to 4 days", "Free returns"].map((t) => <span key={t} className="rounded-full px-[0.7em] py-[0.2em] ring-1 ring-[#dadce0]"><span className="block text-[0.52em] text-[#3c4043]">{t}</span></span>)}</span>
      </Panel>
    </Vis>
  );
}

/** An AI assistant answer that names the business and cites its page. */
function Ai() {
  return (
    <Vis className="flex h-full flex-col justify-center gap-[0.7em] px-[1.4em]">
      <span className="an-pop self-end rounded-[1.2em] bg-white px-[1em] py-[0.55em] ring-1 ring-black/5"><span className="block text-[0.7em] text-[#0f172a]">Which dentist in Pune is good for kids?</span></span>
      <div className="an-pop flex gap-[0.6em]">
        <span className="grid size-[1.8em] shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#4285f4,#9b72cb,#d96570)] text-white"><Sparkles className="size-[0.9em]" /></span>
        <span className="min-w-0">
          <span className="block text-[0.7em] leading-[1.55] text-[#0f172a]">Families in Pune often choose <b className="font-semibold">Sunrise Dental Clinic</b> in Kothrud. It has a dedicated kids’ dentist, is open 7 days and lets you book online.<sup className="ml-[0.2em] rounded-full bg-[#e8f0fe] px-[0.4em] text-[0.8em] text-[#1a56db]">1</sup></span>
          <span className="mt-[0.5em] flex items-center gap-[0.5em] rounded-[0.6em] bg-white p-[0.5em] ring-1 ring-black/5">
            <span className="grid size-[1.5em] shrink-0 place-items-center rounded-full bg-[#0f766e] text-white"><span className="text-[0.56em] font-bold">S</span></span>
            <span className="min-w-0"><span className="block truncate text-[0.6em] font-medium text-[#0f172a]">Kids’ dentist in Pune | Sunrise Dental</span><span className="block text-[0.5em] text-[#64748b]">sunrise-clinic.in</span></span>
          </span>
          <span className="mt-[0.5em] flex gap-[0.6em] text-[#64748b]"><ThumbsUp className="size-[0.75em]" /><ThumbsDown className="size-[0.75em]" /><Share2 className="size-[0.75em]" /></span>
        </span>
      </div>
    </Vis>
  );
}

/** A keyword table as keyword tools show it: volume, difficulty, position. */
function Content() {
  const rows: [string, string, number, string, string][] = [["root canal cost pune", "2.4K", 18, "3", "+5"], ["kids dentist pune", "1.9K", 24, "1", "+7"], ["teeth whitening price", "3.6K", 41, "6", "+12"], ["braces or aligners", "880", 63, "14", "new"]];
  const kd = (n: number) => (n < 30 ? "#16a34a" : n < 50 ? "#eab308" : "#ea580c");
  return (
    <Vis className="h-full px-[1.4em] pt-[1.5em]">
      <Panel className="mx-auto max-w-[25em] overflow-hidden rounded-[0.7em]">
        <span className="flex items-center justify-between px-[0.9em] py-[0.6em]"><span className="text-[0.74em] font-semibold text-[#0f172a]">Keywords and pages</span><Bar w="3em" /></span>
        <span className="grid grid-cols-[1fr_3em_2.4em_3.6em] gap-[0.4em] bg-[#f8fafc] px-[0.9em] py-[0.35em]">{["Keyword", "Volume", "KD", "Position"].map((t) => <span key={t} className="text-[0.48em] font-medium tracking-wide text-[#64748b] uppercase">{t}</span>)}</span>
        {rows.map(([k, v, d, pos, ch]) => (
          <span key={k} className="an-pop grid grid-cols-[1fr_3em_2.4em_3.6em] items-center gap-[0.4em] border-t border-[#f1f5f9] px-[0.9em] py-[0.5em]">
            <span className="truncate text-[0.64em] text-[#2563eb]">{k}</span>
            <span className="text-[0.62em] text-[#0f172a]">{v}</span>
            <span className="grid size-[1.6em] place-items-center rounded-[0.35em] text-white" style={{ background: kd(d) }}><span className="text-[0.52em] font-semibold">{d}</span></span>
            <span className="flex items-center gap-[0.3em]"><span className="text-[0.64em] font-medium text-[#0f172a]">{pos}</span><span className="text-[0.52em] font-medium text-[#16a34a]">{ch}</span></span>
          </span>
        ))}
      </Panel>
    </Vis>
  );
}

export const seoTiles = [Local, Audit, Shop, Ai, Content];
