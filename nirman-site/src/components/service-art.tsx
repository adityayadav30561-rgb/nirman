import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bike,
  CreditCard,
  FileSpreadsheet,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  Smartphone,
  Truck,
  Users,
  Zap,
  CalendarCheck,
  Check,
  CircleAlert,
  Clock,
  DatabaseBackup,
  FileText,
  Globe,
  Image as ImageIcon,
  Lock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import type { ArtefactId } from "@/content/services";
import { Stage } from "./stage";
import { Donut, LineChart } from "./mockups/charts";
import { PhoneFrame } from "./mockups/frames";

// UI mockups of what clients receive at each step of a service (P4 redesign).
// Every one is a 640 × 420 design-px composition inside a Stage, so the same
// mockup works in the process panel and the reports viewer. Brands and figures
// are sample data; the page says so.

export const artefacts: Record<ArtefactId, { label: string; render: () => ReactNode }> = {
  "seo-audit": { label: "Site audit with a health score and issues ranked by severity", render: SeoAudit },
  "seo-plan": { label: "Improvement plan listing fixes by impact, effort and month", render: SeoPlan },
  "seo-report": { label: "Monthly SEO report with clicks, enquiries, a trend chart and next steps", render: SeoReport },
  "seo-ranks": { label: "Rank tracking table with positions and changes for target searches", render: SeoRanks },
  "seo-local": { label: "Google Business Profile with reviews and monthly calls and direction requests", render: SeoLocal },
  "seo-content": { label: "Content brief with the target search, outline and questions to answer", render: SeoContent },
  "seo-schema": { label: "Structured data code that passes Google's Rich Results Test", render: SeoSchema },
  "seo-ai": { label: "An AI assistant answer citing the client's website as a source", render: SeoAi },
  "seo-product": { label: "A product search result showing star ratings and stock", render: SeoProduct },
  "web-sitemap": { label: "Website sitemap with the question each page answers", render: WebSitemap },
  "web-design": { label: "Design system with colours, type, buttons and page layouts", render: WebDesign },
  "web-cms": { label: "Content editor where the client's team updates a page", render: WebCms },
  "web-code": { label: "Code editor with a page component, a passing build and a live deployment", render: WebCode },
  "web-launch": { label: "Launch report with Lighthouse scores and Core Web Vitals", render: WebLaunch },
  "web-maintain": { label: "Monthly maintenance report with uptime, backups and updates", render: WebMaintain },
  "web-store": { label: "Online store product page with an order notification", render: WebStore },
  "sw-scope": { label: "Scope document listing features by priority, estimate and phase", render: SwScope },
  "sw-flow": { label: "User flow linking the screens of an ordering app", render: SwFlow },
  "sw-sprint": { label: "Sprint board with tasks in to do, in progress, review and done", render: SwSprint },
  "sw-pipeline": { label: "CRM sales pipeline with leads moving from enquiry to booking", render: SwPipeline },
  "sw-dashboard": { label: "Operations dashboard of a custom web app with deliveries and a shipments table", render: SwDashboard },
  "sw-app": { label: "Two phone screens of an ordering app beside its app store release status", render: SwApp },
  "sw-workflow": { label: "Automation that turns a payment into an invoice, a sheet row and a receipt message", render: SwWorkflow },
  "sw-integrations": { label: "Connected business tools with a live sync log", render: SwIntegrations },
  "sw-qa": { label: "Test report with passing tests, coverage and devices tested", render: SwQa },
  "sw-support": { label: "Monthly support report with uptime, tickets and release notes", render: SwSupport },
};

/** One artefact, scaled to its container's width. */
export function Artefact({ id }: { id: ArtefactId }) {
  const a = artefacts[id];
  const Render = a.render;
  return (
    <Stage w={640} h={420} label={a.label}>
      <Render />
    </Stage>
  );
}

/* ------------------------------ shells ------------------------------ */

function Window({ title, meta, children }: { title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface text-ink shadow-scene ring-1 ring-ink/8">
      <div className="flex h-44 items-center justify-between border-b border-ink/8 px-18">
        <div className="flex items-center gap-10">
          <span className="flex gap-5" aria-hidden>
            <span className="size-8 rounded-full bg-[#ec6a4c]" />
            <span className="size-8 rounded-full bg-[#f4b23e]" />
            <span className="size-8 rounded-full bg-[#4f9a74]" />
          </span>
          <span className="fs-13 font-semibold">{title}</span>
        </div>
        {meta && <span className="fs-10 text-ink-3">{meta}</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-44 p-18">{children}</div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "red" | "amber" | "green" | "blue" | "grey"; children: ReactNode }) {
  const t = {
    red: "bg-[#fde3dd] text-[#b4381f]",
    amber: "bg-marigold-soft text-[#9a6510]",
    green: "bg-mint-soft text-forest",
    blue: "bg-cobalt-soft text-cobalt",
    grey: "bg-paper-2 text-ink-2",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-8 py-2 fs-9 font-medium ${t}`}>{children}</span>;
}

function Tick() {
  return (
    <span className="grid size-16 shrink-0 place-items-center rounded-full bg-forest text-paper">
      <Check className="size-10" strokeWidth={3} />
    </span>
  );
}

/* -------------------------------- SEO -------------------------------- */

function SeoAudit() {
  const sev: [string, number, string, "red" | "amber" | "blue" | "grey"][] = [
    ["Critical", 3, "#d24b36", "red"],
    ["High", 8, "#f4b23e", "amber"],
    ["Medium", 14, "#3346d3", "blue"],
    ["Low", 21, "#b9b4a8", "grey"],
  ];
  const top = [
    ["Critical", "12 pages blocked by robots.txt"],
    ["Critical", "Mobile LCP 4.2 s on product pages"],
    ["High", "38 pages missing meta descriptions"],
    ["High", "Redirect chains on old blog URLs"],
  ];
  return (
    <Window title="Site audit · terrastudio.in" meta="Crawled 1,284 URLs">
      <div className="flex gap-18">
        <div className="relative w-150 shrink-0">
          <Donut parts={[{ value: 72, color: "#3346d3" }, { value: 28, color: "#e3e7fc" }]} size={150} thickness={16} />
          <div className="absolute inset-0 grid place-items-center text-center">
            <span>
              <span className="block fs-32 font-semibold leading-none tnum">72</span>
              <span className="fs-10 text-ink-3">Health score</span>
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-10 pt-6">
          {sev.map(([k, n, c]) => (
            <div key={k} className="flex items-center gap-10 fs-11">
              <span className="w-60 text-ink-2">{k}</span>
              <span className="h-10 flex-1 rounded-full bg-paper-2">
                <span className="block h-full rounded-full" style={{ width: `${(n / 21) * 100}%`, background: c }} />
              </span>
              <span className="w-24 text-right font-medium tnum">{n}</span>
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-18 divide-y divide-ink/8 rounded-md bg-paper/70 px-14">
        {top.map(([s, t]) => (
          <li key={t} className="flex items-center gap-10 py-9 fs-11">
            <Pill tone={s === "Critical" ? "red" : "amber"}>{s}</Pill>
            <span className="flex-1">{t}</span>
            <span className="fs-10 text-cobalt">How to fix</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

function SeoPlan() {
  const rows: [string, "High" | "Medium", string, string, "done" | "doing" | "next"][] = [
    ["Unblock product pages in robots.txt", "High", "1 hr", "Oct", "done"],
    ["Compress hero images, lazy-load below fold", "High", "1 day", "Oct", "done"],
    ["Rewrite titles on top 20 service pages", "High", "2 days", "Nov", "doing"],
    ["Add FAQ and LocalBusiness schema", "Medium", "1 day", "Nov", "doing"],
    ["New page: courtyard house design", "High", "3 days", "Dec", "next"],
    ["Fix redirect chains on old blog URLs", "Medium", "2 hrs", "Dec", "next"],
  ];
  const status = { done: ["green", "Done"], doing: ["blue", "In progress"], next: ["grey", "Planned"] } as const;
  return (
    <Window title="Improvement plan · Q4" meta="Sorted by impact">
      <div className="grid grid-cols-[6fr_1.2fr_1fr_0.8fr_1.6fr] gap-x-10 border-b border-ink/8 pb-8 fs-9 uppercase tracking-wide text-ink-3">
        <span>Task</span>
        <span>Impact</span>
        <span>Effort</span>
        <span>When</span>
        <span>Status</span>
      </div>
      <ul className="divide-y divide-ink/8">
        {rows.map(([t, imp, eff, m, st]) => (
          <li key={t} className="grid grid-cols-[6fr_1.2fr_1fr_0.8fr_1.6fr] items-center gap-x-10 py-10 fs-11">
            <span className={st === "done" ? "text-ink-3 line-through decoration-ink/30" : ""}>{t}</span>
            <span>
              <Pill tone={imp === "High" ? "red" : "amber"}>{imp}</Pill>
            </span>
            <span className="text-ink-2">{eff}</span>
            <span className="text-ink-2">{m}</span>
            <span>
              <Pill tone={status[st][0]}>{status[st][1]}</Pill>
            </span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-16 left-18 right-18 flex items-center gap-10 rounded-md bg-cobalt-soft px-14 py-10 fs-11 text-cobalt">
        <TrendingUp className="size-14" />
        2 of 6 done. Next review with you on 5 November.
      </div>
    </Window>
  );
}

function SeoReport() {
  const kpis = [
    ["Clicks from Google", "4,820", "+18%"],
    ["Enquiries from search", "64", "+12"],
    ["Average position", "8.4", "+1.9"],
  ];
  return (
    <Window title="Monthly SEO report · October" meta="Page 1 of 4">
      <div className="grid grid-cols-3 gap-10">
        {kpis.map(([k, v, d]) => (
          <div key={k} className="rounded-md bg-paper/80 p-12">
            <p className="fs-9 text-ink-3">{k}</p>
            <p className="mt-4 flex items-baseline gap-6">
              <span className="fs-22 font-semibold tnum">{v}</span>
              <span className="flex items-center fs-10 font-medium text-forest">
                <ArrowUp className="size-10" />
                {d}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 h-110 text-ink">
        <LineChart
          w={600}
          h={110}
          series={[
            { values: [2.1, 2.4, 2.3, 2.8, 3.1, 3.0, 3.5, 3.9, 4.1, 4.8], color: "#3346d3", fill: true },
            { values: [1.9, 2.0, 2.1, 2.2, 2.4, 2.3, 2.5, 2.6, 2.7, 2.9], color: "#80868c", dashed: true },
          ]}
        />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-10">
        <div className="rounded-md bg-mint-soft/70 p-12">
          <p className="fs-10 font-semibold text-forest">Done in October</p>
          <ul className="mt-6 space-y-4 fs-10">
            <li>Fixed 12 blocked product pages</li>
            <li>Rewrote titles on 20 service pages</li>
          </ul>
        </div>
        <div className="rounded-md bg-cobalt-soft/70 p-12">
          <p className="fs-10 font-semibold text-cobalt">Next in November</p>
          <ul className="mt-6 space-y-4 fs-10">
            <li>New page: courtyard house design</li>
            <li>FAQ schema on service pages</li>
          </ul>
        </div>
      </div>
    </Window>
  );
}

function SeoRanks() {
  const rows: [string, number, number, string][] = [
    ["architect for villa in pune", 2, 5, "1,204"],
    ["courtyard house design", 3, 8, "986"],
    ["climate responsive architecture", 4, 3, "742"],
    ["interior architect baner", 1, 2, "611"],
    ["sustainable home architect", 7, 12, "455"],
    ["small house plans 1200 sq ft", 6, -1, "388"],
  ];
  return (
    <Window title="Rank tracking · 48 searches" meta="Updated daily">
      <div className="grid grid-cols-[5fr_1fr_1fr_1fr] gap-x-10 border-b border-ink/8 pb-8 fs-9 uppercase tracking-wide text-ink-3">
        <span>Search</span>
        <span className="text-right">Position</span>
        <span className="text-right">Change</span>
        <span className="text-right">Clicks</span>
      </div>
      <ul className="divide-y divide-ink/8">
        {rows.map(([q, pos, ch, cl]) => (
          <li key={q} className="grid grid-cols-[5fr_1fr_1fr_1fr] items-center gap-x-10 py-10 fs-11">
            <span className="flex items-center gap-8">
              <Search className="size-11 text-ink-3" />
              {q}
            </span>
            <span className="text-right font-semibold tnum">{pos}</span>
            <span className={`flex items-center justify-end gap-2 tnum ${ch > 0 ? "text-forest" : "text-[#b4381f]"}`}>
              {ch > 0 ? <ArrowUp className="size-10" /> : <ArrowDown className="size-10" />}
              {Math.abs(ch)}
            </span>
            <span className="text-right text-ink-2 tnum">{cl}</span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-16 left-18 right-18 grid grid-cols-3 gap-10 fs-10">
        {[
          ["Top 3", "14"],
          ["Top 10", "31"],
          ["Improved", "26"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-md bg-paper/80 px-12 py-8">
            <span className="text-ink-3">{k}</span>
            <span className="fs-14 font-semibold tnum">{v}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

function SeoLocal() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-0 top-0 h-420 w-360 overflow-hidden rounded-xl bg-surface shadow-scene ring-1 ring-ink/8">
        <div className="h-110 bg-[linear-gradient(135deg,#e3e7fc,#d8ecea)]">
          <div className="flex h-full items-center justify-center gap-6 fs-10 text-ink-3">
            <MapPin className="size-14 text-[#d24b36]" />
            Baner, Pune
          </div>
        </div>
        <div className="p-16">
          <p className="fs-16 font-semibold">Smile Dental Clinic</p>
          <p className="mt-4 flex items-center gap-6 fs-11">
            <span className="font-medium">4.8</span>
            <span className="flex text-marigold">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-11 fill-current" />
              ))}
            </span>
            <span className="text-ink-3">(212 reviews)</span>
          </p>
          <p className="mt-4 fs-10 text-ink-3">Dental clinic · Open until 8 pm</p>
          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              [Phone, "Call"],
              [Navigation, "Directions"],
              [Globe, "Website"],
            ].map(([Icon, l]) => {
              const I = Icon as typeof Phone;
              return (
                <span key={l as string} className="flex flex-col items-center gap-4 rounded-md bg-cobalt-soft py-8 fs-10 text-cobalt">
                  <I className="size-13" />
                  {l as string}
                </span>
              );
            })}
          </div>
          <div className="mt-12 rounded-md bg-paper/80 p-10 fs-10 leading-snug text-ink-2">
            “Painless root canal, and they explained every step. Booking on WhatsApp was easy.”
            <span className="mt-4 block text-forest">Owner replied within a day</span>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-30 w-260 rounded-xl bg-surface p-16 shadow-scene ring-1 ring-ink/8">
        <p className="fs-12 font-semibold">From your profile this month</p>
        {[
          ["Calls", 128, "+34%"],
          ["Direction requests", 96, "+21%"],
          ["Website clicks", 210, "+18%"],
        ].map(([k, v, d]) => (
          <div key={k as string} className="mt-12">
            <div className="flex items-center justify-between fs-10">
              <span className="text-ink-2">{k}</span>
              <span className="font-semibold tnum">
                {v} <span className="text-forest">{d}</span>
              </span>
            </div>
            <span className="mt-4 block h-8 rounded-full bg-paper-2">
              <span className="block h-full rounded-full bg-cobalt" style={{ width: `${((v as number) / 210) * 100}%` }} />
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-20 right-0 flex w-260 items-center gap-10 rounded-xl bg-cobalt p-14 text-white shadow-scene">
        <span className="grid size-30 place-items-center rounded-full bg-white/15 fs-14 font-semibold">1</span>
        <span className="fs-11 leading-snug">
          Position 1 in Google Maps for <span className="font-semibold">“dentist near me”</span> in Baner
        </span>
      </div>
    </div>
  );
}

function SeoContent() {
  return (
    <Window title="Content brief · Courtyard house design" meta="Draft 2">
      <div className="grid grid-cols-[1.9fr_1fr] gap-16">
        <div>
          <p className="fs-9 uppercase tracking-wide text-ink-3">Target search</p>
          <p className="mt-4 flex items-center gap-8 rounded-full bg-paper px-12 py-7 fs-11">
            <Search className="size-11 text-ink-3" />
            courtyard house design india
          </p>
          <p className="mt-14 fs-9 uppercase tracking-wide text-ink-3">Outline</p>
          <ol className="mt-6 space-y-7 fs-11">
            {[
              "What a courtyard house is, and why it suits Indian climates",
              "Five courtyard layouts, with plans and photos",
              "Costs, timelines and approvals in Pune",
              "Our courtyard projects",
              "Questions clients ask",
            ].map((h, i) => (
              <li key={h} className="flex gap-8">
                <span className="w-24 shrink-0 font-semibold text-cobalt">H2</span>
                <span className={i === 2 ? "text-ink-3 line-through decoration-ink/30" : ""}>{h}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-10">
          <div className="rounded-md bg-paper/80 p-12">
            <p className="fs-9 text-ink-3">Search intent</p>
            <p className="mt-2 fs-12 font-medium">Research, then hire</p>
          </div>
          <div className="rounded-md bg-paper/80 p-12">
            <p className="fs-9 text-ink-3">Length</p>
            <p className="mt-2 fs-12 font-medium">1,400–1,800 words</p>
          </div>
          <div className="rounded-md bg-cobalt-soft p-12">
            <p className="fs-9 text-cobalt">Questions to answer</p>
            <ul className="mt-4 space-y-3 fs-10">
              <li>Does a courtyard keep a house cool?</li>
              <li>How big should a courtyard be?</li>
              <li>Is it safe in the monsoon?</li>
            </ul>
          </div>
        </div>
      </div>
    </Window>
  );
}

function SeoSchema() {
  const lines: [number, ReactNode][] = [
    [0, <>{"{"}</>],
    [1, <><K>&quot;@type&quot;</K>: <V>&quot;LocalBusiness&quot;</V>,</>],
    [1, <><K>&quot;name&quot;</K>: <V>&quot;Smile Dental Clinic&quot;</V>,</>],
    [1, <><K>&quot;telephone&quot;</K>: <V>&quot;+91 20 0000 0000&quot;</V>,</>],
    [1, <><K>&quot;address&quot;</K>: {"{"} <K>&quot;addressLocality&quot;</K>: <V>&quot;Pune&quot;</V> {"}"},</>],
    [1, <><K>&quot;openingHours&quot;</K>: <V>&quot;Mo-Sa 09:00-20:00&quot;</V>,</>],
    [1, <><K>&quot;aggregateRating&quot;</K>: {"{"} <K>&quot;ratingValue&quot;</K>: <V>4.8</V> {"}"}</>],
    [0, <>{"}"}</>],
  ];
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-y-0 left-0 w-420 overflow-hidden rounded-xl bg-ink p-18 font-mono text-paper shadow-scene">
        <p className="fs-10 text-paper/50">schema.json</p>
        <div className="mt-12 space-y-6 fs-11">
          {lines.map(([indent, l], i) => (
            <p key={i} style={{ paddingLeft: indent * 18 }}>
              <span className="mr-12 inline-block w-14 text-right text-paper/30">{i + 1}</span>
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-40 w-250 rounded-xl bg-surface p-16 shadow-scene ring-1 ring-ink/8">
        <p className="flex items-center gap-8 fs-12 font-semibold">
          <ShieldCheck className="size-15 text-forest" />
          Rich Results Test
        </p>
        <ul className="mt-12 space-y-8 fs-11">
          {["Local business: valid", "Review snippet: valid", "FAQ: valid", "0 errors, 0 warnings"].map((t) => (
            <li key={t} className="flex items-center gap-8">
              <Tick />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-40 right-0 w-250 rounded-xl bg-cobalt p-14 text-white shadow-scene">
        <p className="fs-10 text-white/70">Search Console</p>
        <p className="mt-4 fs-12 font-medium">Enhancements detected on 46 pages</p>
      </div>
    </div>
  );
}

function K({ children }: { children: ReactNode }) {
  return <span className="text-[#9fb4ff]">{children}</span>;
}
function V({ children }: { children: ReactNode }) {
  return <span className="text-[#9fdcb8]">{children}</span>;
}

function SeoAi() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface text-ink shadow-scene ring-1 ring-ink/8">
      <div className="flex items-center gap-10 border-b border-ink/8 px-18 py-12">
        <Sparkles className="size-15 text-[#7a5af8]" />
        <span className="fs-13 font-semibold">AI assistant</span>
      </div>
      <div className="p-18">
        <p className="ml-auto w-fit max-w-380 rounded-lg bg-paper px-14 py-10 fs-12">
          Who designs courtyard houses in Pune, and what does the process look like?
        </p>
        <div className="mt-14 space-y-8 fs-11 leading-[1.55] text-ink-2">
          <p>
            Several Pune studios design courtyard homes. <span className="font-medium text-ink">Terra Studio</span> is often
            mentioned for climate-responsive courtyard houses in Baner and Nashik
            <Cite n={1} />. Their process starts with a site study and sun-path analysis, then plans, a 3D model and
            approvals
            <Cite n={1} />
            <Cite n={2} />.
          </p>
          <p>Typical timelines are 4–6 months for design and approvals before construction starts.</p>
        </div>
        <div className="mt-14 flex flex-wrap gap-8">
          {[
            ["1", "terrastudio.in › courtyard-houses"],
            ["2", "terrastudio.in › process"],
            ["3", "architecturedigest.in"],
          ].map(([n, s]) => (
            <span key={n} className={`flex items-center gap-6 rounded-full px-10 py-5 fs-10 ${n === "3" ? "bg-paper text-ink-3" : "bg-cobalt-soft text-cobalt"}`}>
              <span className="font-semibold">{n}</span>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-16 right-16 flex items-center gap-8 rounded-full bg-forest px-14 py-8 fs-10 text-paper">
        <Check className="size-11" strokeWidth={3} />
        Cited in 9 of 20 test questions
      </div>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return <sup className="mx-2 rounded-xs bg-cobalt-soft px-4 fs-8 font-semibold text-cobalt">{n}</sup>;
}

function SeoProduct() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-surface text-ink shadow-scene ring-1 ring-ink/8">
      <div className="flex items-center gap-10 border-b border-ink/8 px-18 py-12">
        <span className="flex flex-1 items-center gap-8 rounded-full bg-paper px-14 py-8 fs-11 text-ink-2">
          <Search className="size-12" />
          handmade stoneware mugs
        </span>
      </div>
      <div className="space-y-12 p-18">
        {[
          { site: "mitticeramics.com", title: "Speckled stoneware mug, 350 ml | Mitti Ceramics", r: "4.9", n: "86", ours: true },
          { site: "bigmarketplace.in", title: "Stoneware mugs: buy online at best price", r: "4.1", n: "1,203", ours: false },
        ].map((x) => (
          <div key={x.site} className={`flex gap-14 rounded-md p-12 ${x.ours ? "bg-cobalt-soft/60 ring-1 ring-cobalt/20" : ""}`}>
            <span className="grid size-70 shrink-0 place-items-center rounded-md bg-[#efe6dc]">
              <ShoppingBag className="size-22 text-[#a0663f]" />
            </span>
            <div className="min-w-0">
              <p className="fs-10 text-ink-3">{x.site}</p>
              <p className="mt-2 fs-13 text-cobalt">{x.title}</p>
              <p className="mt-4 flex items-center gap-6 fs-10 text-ink-2">
                <span className="flex text-marigold">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-10 fill-current" />
                  ))}
                </span>
                {x.r} ({x.n}) · In stock · Free delivery
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-16 left-18 right-18 grid grid-cols-3 gap-10 fs-10">
        {[
          ["Product schema", "Valid"],
          ["Review stars", "Showing"],
          ["Clicks this month", "+46%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-paper/80 px-12 py-8">
            <p className="text-ink-3">{k}</p>
            <p className="fs-12 font-semibold text-forest">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Web -------------------------------- */

function WebSitemap() {
  const cols = [
    { h: "Services", q: "Can they do what I need?", kids: ["Residential", "Interiors", "Courtyard homes"] },
    { h: "Projects", q: "Have they done it before?", kids: ["12 case studies", "Filter by type"] },
    { h: "About", q: "Can I trust them?", kids: ["Team", "Process"] },
    { h: "Contact", q: "How do I start?", kids: ["Enquiry form", "WhatsApp", "Map"] },
  ];
  return (
    <Window title="Sitemap · terrastudio.in" meta="14 pages">
      <div className="flex justify-center">
        <span className="rounded-md bg-coral px-18 py-8 fs-12 font-semibold text-white">Home</span>
      </div>
      <div className="mx-auto h-18 w-[1.5px] bg-ink/20" />
      <div className="mx-70 h-[1.5px] bg-ink/20" />
      <div className="grid grid-cols-4 gap-10">
        {cols.map((c) => (
          <div key={c.h} className="flex flex-col items-center">
            <span className="h-14 w-[1.5px] bg-ink/20" />
            <span className="w-full rounded-md bg-coral-soft px-10 py-8 text-center fs-11 font-semibold">{c.h}</span>
            <span className="mt-6 text-center fs-9 italic leading-snug text-coral-2">“{c.q}”</span>
            <ul className="mt-8 w-full space-y-5">
              {c.kids.map((k) => (
                <li key={k} className="rounded-sm bg-paper px-8 py-5 text-center fs-10 text-ink-2">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Window>
  );
}

function WebDesign() {
  const sw = ["#c4623f", "#1f2a24", "#efe6dc", "#8a9a5b", "#f6f2ea"];
  return (
    <Window title="Design system · Terra Studio" meta="Figma">
      <div className="grid grid-cols-[1fr_1.5fr] gap-16">
        <div className="space-y-14">
          <div>
            <p className="fs-9 uppercase tracking-wide text-ink-3">Colour</p>
            <div className="mt-6 flex gap-6">
              {sw.map((c) => (
                <span key={c} className="size-36 rounded-md ring-1 ring-ink/10" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div>
            <p className="fs-9 uppercase tracking-wide text-ink-3">Type</p>
            <p className="mt-4 fs-32 font-semibold leading-none">Aa</p>
            <p className="mt-4 fs-10 text-ink-2">Display 56 / Heading 32 / Body 17</p>
          </div>
          <div>
            <p className="fs-9 uppercase tracking-wide text-ink-3">Buttons</p>
            <div className="mt-6 flex gap-6">
              <span className="rounded-full bg-[#c4623f] px-12 py-6 fs-10 text-white">Start a project</span>
              <span className="rounded-full px-12 py-6 fs-10 ring-1 ring-ink/20">See work</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-12">
          <div className="h-260 flex-1 rounded-md bg-[#f6f2ea] p-10 ring-1 ring-ink/10">
            <div className="h-10 w-60 rounded-full bg-ink/15" />
            <div className="mt-14 h-14 w-[80%] rounded-sm bg-[#1f2a24]" />
            <div className="mt-6 h-14 w-[60%] rounded-sm bg-[#1f2a24]" />
            <div className="mt-10 h-110 rounded-sm bg-[#c4623f]/70" />
            <div className="mt-10 grid grid-cols-3 gap-6">
              <span className="h-36 rounded-sm bg-[#efe6dc]" />
              <span className="h-36 rounded-sm bg-[#efe6dc]" />
              <span className="h-36 rounded-sm bg-[#efe6dc]" />
            </div>
            <p className="mt-6 text-center fs-8 text-ink-3">Desktop 1440</p>
          </div>
          <div className="h-220 w-100 rounded-md bg-[#f6f2ea] p-8 ring-1 ring-ink/10">
            <div className="h-8 w-30 rounded-full bg-ink/15" />
            <div className="mt-10 h-10 w-[90%] rounded-sm bg-[#1f2a24]" />
            <div className="mt-4 h-10 w-[70%] rounded-sm bg-[#1f2a24]" />
            <div className="mt-8 h-80 rounded-sm bg-[#c4623f]/70" />
            <div className="mt-8 h-18 rounded-full bg-[#c4623f]" />
            <p className="mt-6 text-center fs-8 text-ink-3">Phone 390</p>
          </div>
        </div>
      </div>
    </Window>
  );
}

function WebCms() {
  return (
    <Window title="Content editor" meta="Saved 2 min ago">
      <div className="grid h-full grid-cols-[1fr_3fr] gap-14">
        <ul className="space-y-4 border-r border-ink/8 pr-12 fs-11">
          {["Home", "Services", "Courtyard homes", "Projects", "About", "Contact"].map((p, i) => (
            <li key={p} className={`flex items-center gap-6 rounded-sm px-8 py-6 ${i === 2 ? "bg-coral-soft font-medium text-coral-2" : "text-ink-2"}`}>
              <FileText className="size-11" />
              {p}
            </li>
          ))}
        </ul>
        <div className="space-y-10">
          <div>
            <p className="fs-9 text-ink-3">Page title</p>
            <p className="mt-3 rounded-sm px-10 py-7 fs-12 ring-1 ring-ink/15">Courtyard homes designed for light and air</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr] gap-10">
            <div>
              <p className="fs-9 text-ink-3">Intro</p>
              <p className="mt-3 h-70 rounded-sm px-10 py-7 fs-10 leading-snug text-ink-2 ring-1 ring-coral">
                We design homes around a planted courtyard, so every room gets daylight and a cross breeze|
              </p>
            </div>
            <div>
              <p className="fs-9 text-ink-3">Hero image</p>
              <span className="mt-3 grid h-70 place-items-center rounded-sm bg-[#efe6dc] text-[#a0663f]">
                <ImageIcon className="size-18" />
              </span>
            </div>
          </div>
          <div>
            <p className="fs-9 text-ink-3">Sections</p>
            <div className="mt-3 flex flex-wrap gap-6">
              {["Hero", "Benefits", "Gallery", "FAQ", "Enquiry form"].map((s) => (
                <span key={s} className="rounded-full bg-paper px-10 py-4 fs-10">
                  {s}
                </span>
              ))}
              <span className="rounded-full px-10 py-4 fs-10 text-coral-2 border border-dashed border-coral/50">+ Add section</span>
            </div>
          </div>
          <div className="flex justify-end gap-8">
            <span className="rounded-full px-14 py-7 fs-11 ring-1 ring-ink/15">Preview</span>
            <span className="rounded-full bg-coral px-14 py-7 fs-11 font-medium text-white">Publish</span>
          </div>
        </div>
      </div>
    </Window>
  );
}

function WebCode() {
  const lines: [number, ReactNode][] = [
    [0, <><K>export default async function</K> <V>ProjectsPage</V>() {"{"}</>],
    [1, <><K>const</K> projects = <K>await</K> cms.<V>getProjects</V>();</>],
    [1, <><K>return</K> (</>],
    [2, <>&lt;<V>Section</V> title=<V>&quot;Courtyard homes&quot;</V>&gt;</>],
    [3, <>{"{"}projects.<V>map</V>((p) =&gt; (</>],
    [4, <>&lt;<V>ProjectCard</V> key={"{"}p.slug{"}"} {"{"}...p{"}"} /&gt;</>],
    [3, <>)){"}"}</>],
    [2, <>&lt;/<V>Section</V>&gt;</>],
    [1, <>);</>],
    [0, <>{"}"}</>],
  ];
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-y-0 left-0 w-450 overflow-hidden rounded-xl bg-ink font-mono text-paper shadow-scene">
        <div className="flex gap-2 border-b border-white/10 px-14 pt-10 fs-10">
          <span className="rounded-t-sm bg-white/8 px-10 py-6 text-paper">projects/page.tsx</span>
          <span className="px-10 py-6 text-paper/40">project-card.tsx</span>
        </div>
        <div className="space-y-6 p-16 fs-11">
          {lines.map(([indent, l], i) => (
            <p key={i} style={{ paddingLeft: indent * 16 }} className="whitespace-nowrap">
              <span className="mr-12 inline-block w-14 text-right text-paper/30">{i + 1}</span>
              {l}
            </p>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 px-16 py-10 fs-10">
          <p className="text-paper/50">$ npm run build</p>
          <p className="mt-4 text-[#9fdcb8]">✓ Compiled successfully · 24 pages generated</p>
        </div>
      </div>
      <div className="absolute right-0 top-30 w-200 rounded-xl bg-surface p-14 shadow-scene ring-1 ring-ink/8">
        <p className="flex items-center gap-6 fs-11 font-semibold">
          <Globe className="size-12 text-forest" />
          Production
        </p>
        <p className="mt-6 flex items-center gap-6 fs-10 text-ink-2">
          <Lock className="size-10" />
          terrastudio.in
        </p>
        <p className="mt-8 flex items-center gap-6 fs-10 text-forest">
          <span className="size-7 rounded-full bg-forest" />
          Live · deployed 2 min ago
        </p>
      </div>
      <div className="absolute bottom-30 right-0 w-200 rounded-xl bg-surface p-14 shadow-scene ring-1 ring-ink/8">
        <p className="fs-11 font-semibold">Checks</p>
        <ul className="mt-8 space-y-6 fs-10">
          {["Type check", "Lint", "Accessibility", "Core Web Vitals"].map((t) => (
            <li key={t} className="flex items-center gap-8">
              <Tick />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WebLaunch() {
  const scores = [
    ["Performance", 98],
    ["Accessibility", 100],
    ["Best practices", 100],
    ["SEO", 100],
  ] as const;
  return (
    <Window title="Launch report · terrastudio.in" meta={<span className="flex items-center gap-4"><Lock className="size-10" /> Live</span>}>
      <div className="grid grid-cols-4 gap-10">
        {scores.map(([k, v]) => (
          <div key={k} className="flex flex-col items-center">
            <div className="relative size-80">
              <Donut parts={[{ value: v, color: "#4f9a74" }, { value: 100 - v, color: "#e0f1e6" }]} size={80} thickness={8} />
              <span className="absolute inset-0 grid place-items-center fs-20 font-semibold text-forest tnum">{v}</span>
            </div>
            <span className="mt-6 fs-10 text-ink-2">{k}</span>
          </div>
        ))}
      </div>
      <div className="mt-16 grid grid-cols-3 gap-10">
        {[
          ["LCP", "1.6 s"],
          ["INP", "90 ms"],
          ["CLS", "0.01"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-mint-soft/70 px-12 py-8">
            <p className="fs-9 text-ink-3">{k} on phones</p>
            <p className="fs-16 font-semibold text-forest tnum">{v}</p>
          </div>
        ))}
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-x-16 gap-y-7 fs-10">
        {["SSL and domain set up", "Old URLs redirected", "Forms tested on 6 phones", "Analytics and Search Console live", "WCAG 2.2 AA checked", "Team trained on the CMS"].map(
          (t) => (
            <li key={t} className="flex items-center gap-8">
              <Tick />
              {t}
            </li>
          ),
        )}
      </ul>
    </Window>
  );
}

function WebMaintain() {
  return (
    <Window title="Maintenance report · October" meta="terrastudio.in">
      <div className="grid grid-cols-3 gap-10">
        {[
          [Clock, "Uptime", "99.98%"],
          [DatabaseBackup, "Backups", "31 of 31"],
          [ShieldCheck, "Threats blocked", "1,284"],
        ].map(([Icon, k, v]) => {
          const I = Icon as typeof Clock;
          return (
            <div key={k as string} className="rounded-md bg-paper/80 p-12">
              <p className="flex items-center gap-6 fs-9 text-ink-3">
                <I className="size-11" />
                {k as string}
              </p>
              <p className="mt-4 fs-20 font-semibold tnum">{v as string}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-12 h-70 text-coral-2">
        <LineChart w={600} h={70} gridLines={2} series={[{ values: [420, 380, 410, 360, 390, 350, 340, 330, 360, 320, 310, 300], color: "#ec6a4c", fill: true }]} />
      </div>
      <p className="mt-4 fs-9 text-ink-3">Server response time (ms), falling after caching changes</p>
      <ul className="mt-12 divide-y divide-ink/8 rounded-md bg-paper/70 px-12">
        {[
          ["WordPress 6.6.2 and 9 plugins updated", "Tested on staging first"],
          ["Projects page: 2 new case studies added", "Requested on WhatsApp"],
          ["Contact form spam filter tightened", "Spam down 92%"],
        ].map(([t, s]) => (
          <li key={t} className="flex items-center gap-10 py-8 fs-10">
            <Tick />
            <span className="flex-1">{t}</span>
            <span className="text-ink-3">{s}</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

function WebStore() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-y-0 left-0 w-430 overflow-hidden rounded-xl bg-surface shadow-scene ring-1 ring-ink/8">
        <div className="flex items-center justify-between border-b border-ink/8 px-16 py-10 fs-11">
          <span className="font-semibold">Mitti Ceramics</span>
          <span className="flex items-center gap-6 text-ink-3">
            <ShoppingBag className="size-12" />
            Cart (2)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-14 p-16">
          <div className="aspect-square rounded-md bg-[linear-gradient(140deg,#efe6dc,#d9c4ae)]" />
          <div>
            <p className="fs-9 text-ink-3">Mugs</p>
            <p className="mt-2 fs-15 font-semibold leading-tight">Speckled stoneware mug, 350 ml</p>
            <p className="mt-6 flex items-center gap-4 fs-10 text-ink-2">
              <Star className="size-10 fill-marigold text-marigold" />
              4.9 · 86 reviews
            </p>
            <div className="mt-10 flex gap-6">
              {["#d9c4ae", "#8a9a5b", "#1f2a24"].map((c) => (
                <span key={c} className="size-18 rounded-full ring-2 ring-white ring-offset-1" style={{ background: c }} />
              ))}
            </div>
            <span className="mt-14 block rounded-full bg-ink py-8 text-center fs-11 font-medium text-paper">Add to cart</span>
            <span className="mt-6 block rounded-full py-8 text-center fs-11 ring-1 ring-ink/15">Pay with UPI</span>
            <p className="mt-8 fs-9 text-forest">In stock · Ships in 2 days</p>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-40 w-230 rounded-xl bg-surface p-14 shadow-scene ring-1 ring-ink/8">
        <p className="flex items-center gap-6 fs-11 font-semibold">
          <CalendarCheck className="size-13 text-forest" />
          Order #1042 confirmed
        </p>
        <p className="mt-6 fs-10 leading-snug text-ink-2">2 items · Pune · Courier booked</p>
        <div className="mt-10 space-y-5 fs-10">
          <p className="flex items-center gap-6">
            <MessageCircle className="size-11 text-forest" />
            WhatsApp update sent
          </p>
          <p className="flex items-center gap-6">
            <FileText className="size-11 text-coral-2" />
            Invoice emailed
          </p>
        </div>
      </div>
      <div className="absolute bottom-40 right-0 w-230 rounded-xl bg-coral p-14 text-white shadow-scene">
        <p className="flex items-center gap-6 fs-10 text-white/80">
          <CircleAlert className="size-11" />
          Abandoned cart
        </p>
        <p className="mt-4 fs-11 leading-snug">Reminder sent after 1 hour. 18% of carts recovered this month.</p>
      </div>
    </div>
  );
}

/* ------------------------------ Software ------------------------------ */

function SwScope() {
  const rows: [string, "Must" | "Should" | "Could", string, string][] = [
    ["Leads from website and IndiaMART in one list", "Must", "5 days", "Phase 1"],
    ["Site visit booking with reminders", "Must", "4 days", "Phase 1"],
    ["Quotation PDF from a template", "Must", "3 days", "Phase 1"],
    ["WhatsApp follow-ups from the lead page", "Should", "3 days", "Phase 1"],
    ["Commission report for each agent", "Should", "2 days", "Phase 2"],
    ["Customer portal for documents", "Could", "8 days", "Phase 2"],
  ];
  const tone = { Must: "red", Should: "amber", Could: "grey" } as const;
  return (
    <Window title="Scope · Sales CRM for Skyline Realty" meta="v3 · approved">
      <div className="grid grid-cols-[6fr_1.2fr_1.1fr_1.1fr] gap-x-10 border-b border-ink/8 pb-8 fs-9 uppercase tracking-wide text-ink-3">
        <span>Feature</span>
        <span>Priority</span>
        <span>Estimate</span>
        <span>Phase</span>
      </div>
      <ul className="divide-y divide-ink/8">
        {rows.map(([f, p, e, ph]) => (
          <li key={f} className="grid grid-cols-[6fr_1.2fr_1.1fr_1.1fr] items-center gap-x-10 py-10 fs-11">
            <span>{f}</span>
            <span>
              <Pill tone={tone[p]}>{p}</Pill>
            </span>
            <span className="text-ink-2">{e}</span>
            <span className="text-ink-2">{ph}</span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-16 left-18 right-18 flex items-center gap-10 rounded-md bg-peacock-soft px-14 py-10 fs-11 text-peacock">
        <FileText className="size-14" />
        Phase 1: 15 features, 6 weeks, signed off by your sales head
      </div>
    </Window>
  );
}

function SwFlow() {
  const screens: [string, number][] = [
    ["Sign in with OTP", 2],
    ["Home", 4],
    ["Product", 3],
    ["Cart", 3],
    ["Pay with UPI", 2],
    ["Track order", 4],
  ];
  return (
    <Window title="User flow · Ordering app" meta="FigJam">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-y-26">
        {screens.map(([t, n], i) => (
          <FlowStep key={t} title={t} lines={n} last={i % 3 === 2} active={i === 4} />
        ))}
      </div>
      <div className="absolute bottom-14 right-18 flex items-center gap-6 rounded-full bg-ink px-12 py-6 fs-10 text-paper">
        <Users className="size-11" />
        Tested with 5 customers before the build
      </div>
    </Window>
  );
}

function FlowStep({ title, lines, last, active }: { title: string; lines: number; last: boolean; active: boolean }) {
  return (
    <>
      <div className={`rounded-md bg-surface p-10 shadow-panel ring-1 ${active ? "ring-peacock" : "ring-ink/10"}`}>
        <p className={`fs-10 font-semibold ${active ? "text-peacock" : ""}`}>{title}</p>
        <div className="mt-8 h-30 rounded-sm bg-paper-2" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: lines }, (_, i) => (
            <span key={i} className="block h-5 rounded-full bg-ink/10" style={{ width: `${90 - i * 15}%` }} />
          ))}
        </div>
      </div>
      {!last && <ArrowRight className="mx-8 size-16 text-ink-3" aria-hidden />}
    </>
  );
}

function SwSprint() {
  const cols: [string, [string, string, string][]][] = [
    ["To do", [["NC-41", "Export leads to Excel", "PK"], ["NC-44", "Agent targets screen", "AM"]]],
    ["In progress", [["NC-38", "Site visit reminders", "RG"], ["NC-40", "Quotation template", "PK"]]],
    ["Review", [["NC-35", "IndiaMART lead import", "AM"]]],
    ["Done", [["NC-31", "Lead list and filters", "RG"], ["NC-33", "Sign in with OTP", "PK"], ["NC-34", "Roles and permissions", "AM"]]],
  ];
  return (
    <Window title="Sprint 4 · Weeks 7–8" meta="Demo on Friday">
      <div className="grid grid-cols-4 gap-10">
        {cols.map(([name, cards]) => (
          <div key={name} className="rounded-md bg-paper/80 p-8">
            <p className="flex items-center justify-between px-2 fs-10 font-semibold">
              {name}
              <span className="text-ink-3 tnum">{cards.length}</span>
            </p>
            <div className="mt-8 space-y-6">
              {cards.map(([id, t, who]) => (
                <div key={id} className="rounded-sm bg-surface p-8 shadow-panel ring-1 ring-ink/6">
                  <p className="fs-8 text-ink-3">{id}</p>
                  <p className="mt-2 fs-10 leading-snug">{t}</p>
                  <p className="mt-6 flex justify-end">
                    <span className="grid size-16 place-items-center rounded-full bg-peacock fs-7 font-semibold text-white">{who}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-16 left-18 right-18">
        <div className="flex justify-between fs-10">
          <span className="text-ink-2">23 of 31 points done</span>
          <span className="text-peacock">On track</span>
        </div>
        <span className="mt-6 block h-8 rounded-full bg-paper-2">
          <span className="block h-full w-[74%] rounded-full bg-peacock" />
        </span>
      </div>
    </Window>
  );
}

function SwPipeline() {
  const cols: [string, string, [string, string, string][]][] = [
    ["New enquiry", "#3346d3", [["Rohit Sharma", "3BHK · Baner", "Website"], ["Ananya Iyer", "2BHK · Wakad", "IndiaMART"]]],
    ["Site visit", "#f4b23e", [["Kabir Mehta", "Villa · Lavasa", "Sat, 11 am"], ["Sneha Kulkarni", "3BHK · Baner", "Sun, 4 pm"]]],
    ["Negotiation", "#ec6a4c", [["Farhan Ali", "Office · Hinjewadi", "Quote sent"]]],
    ["Booked", "#4f9a74", [["Priya Desai", "2BHK · Wakad", "Agreement"], ["Arjun Rao", "3BHK · Baner", "Token paid"]]],
  ];
  return (
    <Window title="Pipeline · Skyline Realty" meta="This month">
      <div className="grid grid-cols-4 gap-10">
        {cols.map(([name, color, cards]) => (
          <div key={name}>
            <p className="flex items-center gap-6 fs-10 font-semibold">
              <span className="size-8 rounded-full" style={{ background: color }} />
              {name}
            </p>
            <span className="mt-6 block h-3 rounded-full" style={{ background: color, opacity: 0.35 }} />
            <div className="mt-8 space-y-8">
              {cards.map(([n, need, tag]) => (
                <div key={n} className="rounded-md bg-surface p-10 shadow-panel ring-1 ring-ink/6">
                  <p className="fs-11 font-semibold">{n}</p>
                  <p className="mt-2 fs-10 text-ink-2">{need}</p>
                  <p className="mt-6 w-fit rounded-full bg-paper px-8 py-2 fs-9 text-ink-2">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-16 left-18 right-18 flex items-center gap-10 rounded-md bg-mint-soft px-14 py-10 fs-11 text-forest">
        <MessageCircle className="size-14" />
        Every new enquiry gets a WhatsApp reply within 2 minutes
      </div>
    </Window>
  );
}

function SwDashboard() {
  const rows: [string, string, string, "green" | "amber" | "blue"][] = [
    ["SH-2041", "Pune → Mumbai", "Delivered", "green"],
    ["SH-2042", "Pune → Nashik", "In transit", "blue"],
    ["SH-2043", "Pune → Goa", "Delayed 2 h", "amber"],
    ["SH-2044", "Pune → Surat", "In transit", "blue"],
  ];
  const nav: [typeof Truck, string][] = [
    [LayoutDashboard, "Overview"],
    [Package, "Shipments"],
    [Truck, "Vehicles"],
    [Users, "Drivers"],
    [Settings, "Settings"],
  ];
  return (
    <div className="absolute inset-0 flex overflow-hidden rounded-xl bg-surface text-ink shadow-scene ring-1 ring-ink/8">
      <div className="w-130 shrink-0 bg-peacock-2 p-14 text-white">
        <p className="flex items-center gap-6 fs-13 font-semibold">
          <Truck className="size-14" />
          FleetDesk
        </p>
        <ul className="mt-18 space-y-6 fs-10">
          {nav.map(([Icon, l], i) => (
            <li key={l} className={`flex items-center gap-6 rounded-sm px-8 py-6 ${i === 0 ? "bg-white/15" : "text-white/70"}`}>
              <Icon className="size-11" />
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 flex-1 p-16">
        <div className="grid grid-cols-3 gap-8">
          {[
            ["Shipments today", "142"],
            ["On time", "96%"],
            ["Open issues", "3"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md bg-paper/80 p-10">
              <p className="fs-9 text-ink-3">{k}</p>
              <p className="mt-2 fs-20 font-semibold tnum">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 h-90 text-ink">
          <LineChart w={460} h={90} gridLines={3} series={[{ values: [96, 110, 104, 121, 118, 130, 128, 142], color: "#1f6f78", fill: true }]} />
        </div>
        <ul className="mt-10 divide-y divide-ink/8 rounded-md bg-paper/60 px-10">
          {rows.map(([id, r, st, t]) => (
            <li key={id} className="grid grid-cols-[1fr_2fr_1.4fr] items-center gap-8 py-7 fs-10">
              <span className="font-medium tnum">{id}</span>
              <span className="text-ink-2">{r}</span>
              <span className="justify-self-end">
                <Pill tone={t}>{st}</Pill>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SwApp() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-10 top-0 w-170 -rotate-[4deg]">
        <PhoneFrame time="6:02" model="iphone-alt">
          <OrderHomeScreen />
        </PhoneFrame>
      </div>
      <div className="absolute left-200 top-24 z-10 w-170 rotate-[3deg]">
        <PhoneFrame time="6:15">
          <OrderTrackScreen />
        </PhoneFrame>
      </div>
      <div className="absolute right-0 top-40 w-220 rounded-xl bg-surface p-16 shadow-scene ring-1 ring-ink/8">
        <p className="flex items-center gap-6 fs-12 font-semibold">
          <Smartphone className="size-14 text-peacock" />
          Release 2.4.0
        </p>
        <ul className="mt-12 space-y-8 fs-11">
          {["App Store: live", "Google Play: live", "Push notifications: on"].map((t) => (
            <li key={t} className="flex items-center gap-8">
              <Tick />
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-14 grid grid-cols-2 gap-8">
          <div className="rounded-md bg-paper/80 p-8">
            <p className="fs-9 text-ink-3">Crash-free</p>
            <p className="fs-16 font-semibold tnum">99.8%</p>
          </div>
          <div className="rounded-md bg-paper/80 p-8">
            <p className="fs-9 text-ink-3">Rating</p>
            <p className="flex items-center gap-4 fs-16 font-semibold tnum">
              4.7 <Star className="size-12 fill-marigold text-marigold" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderHomeScreen() {
  return (
    <div className="px-12 pt-4">
      <p className="fs-9 text-ink-3">Good evening, Meera</p>
      <p className="mock-display fs-16 leading-tight">What do you need?</p>
      <p className="mt-8 flex items-center gap-6 rounded-full bg-paper px-10 py-6 fs-9 text-ink-3">
        <Search className="size-10" />
        Search 4,000 items
      </p>
      <div className="mt-10 grid grid-cols-2 gap-6">
        {["Groceries", "Pharmacy", "Bakery", "Pet care"].map((c, i) => (
          <span key={c} className={`rounded-md px-8 py-12 fs-9 font-medium ${["bg-mint-soft", "bg-cobalt-soft", "bg-marigold-soft", "bg-coral-soft"][i]}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-10 rounded-md bg-peacock p-10 text-white">
        <p className="fs-9 text-white/70">Delivered in</p>
        <p className="fs-16 font-semibold">20 minutes</p>
      </div>
    </div>
  );
}

function OrderTrackScreen() {
  const steps: [string, string, "done" | "now" | "next"][] = [
    ["Order placed", "6:02", "done"],
    ["Packed", "6:09", "done"],
    ["On the way", "6:15", "now"],
    ["Delivered", "", "next"],
  ];
  return (
    <div className="px-12 pt-4">
      <p className="fs-9 text-ink-3">Order #2041</p>
      <p className="mock-display fs-16 leading-tight">Arriving in 6 min</p>
      <ul className="mt-10 space-y-8">
        {steps.map(([t, time, st]) => (
          <li key={t} className="flex items-center gap-8 fs-10">
            <span
              className={`grid size-14 place-items-center rounded-full ${
                st === "done" ? "bg-forest text-paper" : st === "now" ? "bg-peacock text-white ring-4 ring-peacock-soft" : "bg-paper-2"
              }`}
            >
              {st === "done" && <Check className="size-8" strokeWidth={3} />}
            </span>
            <span className={`flex-1 ${st === "next" ? "text-ink-3" : ""}`}>{t}</span>
            <span className="fs-9 text-ink-3 tnum">{time}</span>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex items-center gap-8 rounded-md bg-paper p-8">
        <span className="grid size-24 place-items-center rounded-full bg-marigold-soft text-[#9a6510]">
          <Bike className="size-12" />
        </span>
        <span className="min-w-0 flex-1 fs-9 leading-tight">
          <span className="block font-semibold">Ravi</span>
          <span className="text-ink-3">On a bike, 1.2 km away</span>
        </span>
      </div>
      <p className="mt-8 rounded-full bg-ink py-7 text-center fs-10 font-medium text-paper">Call rider</p>
    </div>
  );
}

function SwWorkflow() {
  const nodes: [typeof Zap, string, string, string][] = [
    [CreditCard, "Trigger", "Razorpay: payment received", "bg-cobalt-soft text-cobalt"],
    [Receipt, "Action", "Zoho Books: create invoice", "bg-marigold-soft text-[#9a6510]"],
    [FileSpreadsheet, "Action", "Google Sheets: add a row", "bg-mint-soft text-forest"],
    [MessageCircle, "Action", "WhatsApp: send receipt", "bg-peacock-soft text-peacock"],
  ];
  const runs: [string, string, string][] = [
    ["10:42", "Meera Joshi", "3.1 s"],
    ["10:17", "Harsh Vora", "2.8 s"],
    ["09:58", "Lakshmi N.", "3.4 s"],
  ];
  return (
    <Window title="Automation · Payment received" meta="Runs on every payment">
      <div className="flex items-stretch">
        {nodes.map(([Icon, kind, t, c], i) => (
          <div key={t} className="flex flex-1 items-center">
            <div className="h-full flex-1 rounded-md bg-surface p-10 shadow-panel ring-1 ring-ink/8">
              <span className={`grid size-24 place-items-center rounded-sm ${c}`}>
                <Icon className="size-13" />
              </span>
              <p className="mt-6 fs-8 uppercase tracking-wide text-ink-3">{kind}</p>
              <p className="mt-2 fs-10 font-medium leading-snug">{t}</p>
            </div>
            {i < nodes.length - 1 && <ArrowRight className="mx-4 size-13 shrink-0 text-ink-3" aria-hidden />}
          </div>
        ))}
      </div>
      <p className="mt-16 fs-10 font-semibold">Latest runs</p>
      <ul className="mt-6 divide-y divide-ink/8 rounded-md bg-paper/70 px-12">
        {runs.map(([t, who, d]) => (
          <li key={t} className="flex items-center gap-10 py-8 fs-10">
            <span className="w-40 text-ink-3 tnum">{t}</span>
            <span className="flex-1">{who}</span>
            <Pill tone="green">Success · {d}</Pill>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-16 right-18 flex items-center gap-8 rounded-full bg-peacock px-14 py-8 fs-10 text-white">
        <Zap className="size-11" />
        412 runs, about 14 hours of typing saved this month
      </div>
    </Window>
  );
}

function SwIntegrations() {
  const apps: [string, "Connected" | "Syncing"][] = [
    ["Website forms", "Connected"],
    ["IndiaMART", "Connected"],
    ["Razorpay", "Connected"],
    ["Tally", "Syncing"],
    ["Google Sheets", "Connected"],
    ["Gmail", "Connected"],
  ];
  const log = [
    ["10:42:07", "POST /webhooks/indiamart", "200", "lead created"],
    ["10:42:09", "POST /crm/leads/8812/assign", "200", "assigned to Priya"],
    ["10:44:31", "GET /tally/stock?sku=HX-220", "200", "142 in stock"],
    ["10:45:02", "POST /webhooks/razorpay", "200", "invoice queued"],
  ];
  return (
    <Window title="Integrations" meta="6 connected">
      <div className="grid grid-cols-3 gap-8">
        {apps.map(([n, st]) => (
          <div key={n} className="flex items-center justify-between rounded-md bg-paper/80 px-10 py-8">
            <span className="fs-10 font-medium">{n}</span>
            <Pill tone={st === "Connected" ? "green" : "blue"}>{st}</Pill>
          </div>
        ))}
      </div>
      <div className="mt-14 rounded-md bg-ink p-12 font-mono text-paper">
        <p className="fs-9 text-paper/50">Sync log</p>
        <ul className="mt-6 space-y-5 fs-9">
          {log.map(([t, req, code, note]) => (
            <li key={t} className="flex gap-10 whitespace-nowrap">
              <span className="text-paper/40">{t}</span>
              <span className="min-w-0 flex-1 truncate">{req}</span>
              <span className="text-[#9fdcb8]">{code}</span>
              <span className="w-110 truncate text-paper/60">{note}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-16 left-18 flex items-center gap-6 fs-10 text-ink-2">
        <ShieldCheck className="size-12 text-forest" />
        Failed calls are retried, and you get an alert if a sync stops
      </div>
    </Window>
  );
}

function SwQa() {
  return (
    <Window title="Test report · Release 2.4" meta="Ready for release">
      <div className="grid grid-cols-[1fr_1.4fr] gap-16">
        <div className="flex items-center gap-14">
          <div className="relative w-110 shrink-0">
            <Donut parts={[{ value: 412, color: "#4f9a74" }]} size={110} thickness={12} />
            <span className="absolute inset-0 grid place-items-center text-center">
              <span>
                <span className="block fs-20 font-semibold leading-none tnum">412</span>
                <span className="fs-9 text-ink-3">tests passed</span>
              </span>
            </span>
          </div>
          <div className="space-y-8 fs-10">
            <p>
              <span className="text-ink-3">Coverage</span>
              <span className="block fs-16 font-semibold tnum">86%</span>
            </p>
            <p>
              <span className="text-ink-3">App start</span>
              <span className="block fs-16 font-semibold tnum">1.1 s</span>
            </p>
          </div>
        </div>
        <div>
          <p className="fs-10 font-semibold">Devices tested</p>
          <ul className="mt-6 grid grid-cols-2 gap-6 fs-10">
            {["iPhone 15", "iPhone SE", "Pixel 8", "Redmi Note 12", "Galaxy A14", "iPad 10th gen"].map((d) => (
              <li key={d} className="flex items-center gap-6 rounded-sm bg-paper/80 px-8 py-6">
                <Tick />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="mt-14 divide-y divide-ink/8 rounded-md bg-paper/70 px-12">
        {[
          ["Checkout with UPI, card and cash on delivery", "Passed"],
          ["Order tracking on a slow 3G network", "Passed"],
          ["Screen reader labels on every button", "Passed"],
        ].map(([t, r]) => (
          <li key={t} className="flex items-center gap-10 py-8 fs-10">
            <span className="flex-1">{t}</span>
            <Pill tone="green">{r}</Pill>
          </li>
        ))}
      </ul>
    </Window>
  );
}

function SwSupport() {
  return (
    <Window title="Support report · October" meta="FleetDesk">
      <div className="grid grid-cols-3 gap-10">
        {[
          ["Uptime", "99.97%"],
          ["Tickets resolved", "18 of 18"],
          ["First reply", "42 min"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-paper/80 p-12">
            <p className="fs-9 text-ink-3">{k}</p>
            <p className="mt-4 fs-20 font-semibold tnum">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 grid grid-cols-2 gap-10">
        <div className="rounded-md bg-peacock-soft/70 p-12">
          <p className="fs-10 font-semibold text-peacock">Released: v2.4.1</p>
          <ul className="mt-6 space-y-5 fs-10">
            <li>Bulk upload of delivery addresses</li>
            <li>Faster shipment search</li>
            <li>Fix: driver app sync on weak signal</li>
          </ul>
        </div>
        <div className="rounded-md bg-paper/80 p-12">
          <p className="fs-10 font-semibold">Planned for November</p>
          <ul className="mt-6 space-y-5 fs-10 text-ink-2">
            <li>Customer delivery tracking link</li>
            <li>Fuel cost report by vehicle</li>
            <li>Server upgrade with no downtime</li>
          </ul>
        </div>
      </div>
      <div className="absolute bottom-16 left-18 right-18 flex items-center gap-10 rounded-md bg-ink px-14 py-10 fs-10 text-paper">
        <ShieldCheck className="size-13 text-mint" />
        Daily backups, security patches and error alerts watched around the clock
      </div>
    </Window>
  );
}
