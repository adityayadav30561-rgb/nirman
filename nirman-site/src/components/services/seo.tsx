import { ArrowDownRight, ArrowUpRight, ChevronDown, Search, TrendingUp } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { LineChart } from "../mockups/charts";
import { ServiceCard } from "./service-copy";

const clicks = [410, 430, 420, 470, 460, 520, 610, 640, 700, 690, 760, 820, 850, 940, 1020, 1080, 1060, 1180, 1240, 1310, 1290, 1420, 1490, 1560, 1610, 1720];
const impressions = [16, 17, 16.5, 18, 18.5, 19, 21, 22, 23.5, 23, 25, 26, 27, 29, 31, 32, 31.5, 34, 35, 36.5, 36, 38, 39, 40, 41, 43].map((v) => v * 40);

const queries: [string, number, number, string][] = [
  ["architect for villa in pune", 2, 7, "1,204"],
  ["courtyard house design", 3, 11, "986"],
  ["climate responsive architecture", 4, 9, "742"],
  ["interior architect baner", 1, 4, "611"],
  ["small house plans 1200 sq ft", 6, -1, "388"],
];

export function SeoService() {
  return (
    <ServiceCard
      id="svc-seo"
      tone="cobalt"
      dots
      icon={Search}
      name="SEO & organic growth"
      title="Be found by people already searching for you."
      body="We fix the technical foundations, build content around what your customers actually search for, and report progress in plain language: which pages rank, which bring enquiries, and what we're doing next."
      points={["Technical audits and fixes", "Keyword and content strategy", "Local SEO and Google Business Profile", "Monthly reports you can read"]}
      visual={
        <Stage w={460} h={330} wLg={720} hLg={470} label="Search performance dashboard with organic clicks rising over six months, top queries, and a first-place search result">
          <SearchDashboard />
          <SerpCard />
        </Stage>
      }
    />
  );
}

function SearchDashboard() {
  return (
    <div className="absolute left-0 top-0 w-460 overflow-hidden rounded-t-xl bg-surface text-ink shadow-scene lg:left-40 lg:top-20 lg:w-720">
      <div className="flex items-center justify-between border-b border-ink/8 px-18 py-12">
        <div className="flex items-center gap-10">
          <span className="mock-display fs-15">Search performance</span>
          <span className="hidden items-center gap-4 rounded-full bg-paper px-10 py-4 fs-10 text-ink-2 lg:flex">
            terrastudio.in
            <ChevronDown className="size-10" />
          </span>
        </div>
        <div className="flex rounded-full bg-paper p-3 fs-10">
          {["3 months", "6 months", "12 months"].map((t) => (
            <span key={t} className={`rounded-full px-10 py-4 ${t === "6 months" ? "bg-cobalt font-medium text-white" : "text-ink-3"} ${t === "12 months" ? "hidden lg:inline" : ""}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 p-12 lg:grid-cols-4">
        {[
          { k: "Total clicks", v: "28,460", d: "+41%", c: "bg-cobalt-soft", dot: "bg-cobalt" },
          { k: "Impressions", v: "812K", d: "+22%", c: "bg-marigold-soft", dot: "bg-marigold" },
          { k: "Average CTR", v: "3.5%", d: "+0.6 pts", c: "bg-mint-soft", dot: "bg-moss" },
          { k: "Average position", v: "8.4", d: "3.1 places", c: "bg-coral-soft", dot: "bg-coral" },
        ].map((m) => (
          <div key={m.k} className={`rounded-md px-12 py-10 ${m.c}`}>
            <div className="flex items-center gap-6 fs-10 text-ink-2">
              <span className={`size-7 rounded-full ${m.dot}`} />
              {m.k}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <span className="mock-display fs-22 tnum">{m.v}</span>
              <span className="flex items-center gap-2 fs-9 font-medium text-forest tnum">
                <ArrowUpRight className="size-9" />
                {m.d}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative px-18">
        <div className="flex items-center gap-14 fs-10 text-ink-3">
          <span className="flex items-center gap-4">
            <span className="h-3 w-12 rounded-full bg-cobalt" />
            Clicks
          </span>
          <span className="flex items-center gap-4">
            <span className="h-3 w-12 rounded-full bg-marigold" />
            Impressions
          </span>
        </div>
        <div className="relative mt-8 h-150 text-ink lg:h-170">
          <LineChart
            w={700}
            h={170}
            series={[
              { values: impressions, color: "#f4b23e", width: 2 },
              { values: clicks, color: "#3346d3", fill: true, width: 2.6 },
            ]}
            max={1900}
          />
          {[
            { at: 22, label: "Site speed fixes live" },
            { at: 54, label: "Content hub launched" },
          ].map((a) => (
            <div key={a.label} className="absolute inset-y-0" style={{ left: `${a.at}%` }}>
              <div className="h-full border-l border-dashed border-ink/30" />
              <span className="absolute -top-2 left-4 whitespace-nowrap rounded-full bg-ink px-8 py-2 fs-9 text-paper">{a.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-6 fs-9 text-ink-3">
          {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <table className="w-full border-t border-ink/8 fs-10">
        <thead>
          <tr className="text-left text-ink-3">
            <th className="px-18 pb-6 pt-10 font-normal">Top queries</th>
            <th className="pb-6 pt-10 text-right font-normal">Position</th>
            <th className="pb-6 pt-10 text-right font-normal">Change</th>
            <th className="px-18 pb-6 pt-10 text-right font-normal">Clicks</th>
          </tr>
        </thead>
        <tbody className="tnum">
          {queries.map(([q, pos, chg, cl], i) => (
            <tr key={q} className={`border-t border-ink/6 ${i > 2 ? "max-lg:hidden" : ""}`}>
              <td className="max-w-0 truncate px-18 py-8">{q}</td>
              <td className="py-8 text-right">
                <span className="inline-grid size-20 place-items-center rounded-full bg-cobalt-soft font-semibold text-cobalt-2">{pos}</span>
              </td>
              <td className={`py-8 text-right ${chg > 0 ? "text-forest" : "text-signal-red"}`}>
                <span className="inline-flex items-center gap-2">
                  {chg > 0 ? <ArrowUpRight className="size-10" /> : <ArrowDownRight className="size-10" />}
                  {Math.abs(chg)}
                </span>
              </td>
              <td className="px-18 py-8 text-right text-ink-2">{cl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SerpCard() {
  return (
    <div className="absolute left-20 top-370 w-420 rounded-xl bg-surface p-14 text-ink shadow-scene ring-1 ring-ink/8 lg:-left-20 lg:top-380 lg:w-400">
      <div className="flex items-center gap-8 rounded-full bg-paper px-12 py-7 fs-10 text-ink-2">
        <Search className="size-11" />
        courtyard house design pune
      </div>
      <div className="mt-12 flex gap-12">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-8">
            <span className="grid size-20 place-items-center rounded-full bg-[#c4623f] fs-9 font-semibold text-white">T</span>
            <span className="min-w-0 leading-tight">
              <span className="block fs-10">Terra Studio</span>
              <span className="block truncate fs-9 text-ink-3">terrastudio.in › projects</span>
            </span>
          </div>
          <p className="mt-6 fs-13 leading-snug text-cobalt">Courtyard House, Nashik: a home built around light</p>
          <p className="mt-4 fs-10 leading-[1.45] text-ink-2">A family home organised around a planted courtyard, with deep verandas…</p>
        </div>
        <div className="relative h-80 w-80 shrink-0 overflow-hidden rounded-md">
          <Photo name="terracotta" sizes="120px" decorative />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-6 border-t border-ink/8 pt-8 fs-9 text-forest">
        <TrendingUp className="size-11" />
        Position 1 for this search
      </div>
    </div>
  );
}
