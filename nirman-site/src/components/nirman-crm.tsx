"use client";

import { useId, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  ChartColumn,
  Check,
  Contact,
  FileText,
  Globe,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Users,
  Video,
  Workflow,
} from "lucide-react";
import { Stage } from "./stage";
import { LogoMark } from "./logo";
import { ButtonLink } from "./ui/button-link";
import { Bars, Donut, LineChart } from "./mockups/charts";
import { crm, crmCallouts, crmFeatures } from "@/content/home";

// Generic icons only: no WhatsApp or other platform logos in our artwork.
const featureIcons: Record<(typeof crmFeatures)[number]["icon"], typeof KanbanSquare> = {
  leads: Inbox,
  whatsapp: MessageCircle,
  email: Mail,
  pipeline: KanbanSquare,
  automation: Workflow,
  reports: ChartColumn,
};

type Tab = "dashboard" | "pipeline" | "leads" | "followups" | "reports";

const tabs: { id: Tab; label: string; icon: typeof KanbanSquare }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pipeline", label: "Pipeline", icon: KanbanSquare },
  { id: "leads", label: "Leads", icon: Users },
  { id: "followups", label: "Follow-ups", icon: CalendarCheck },
  { id: "reports", label: "Reports", icon: ChartColumn },
];

/** `initialTab` lets the design export (scripts/export-crm-screens.tsx) render each view. */
export function NirmanCrm({ initialTab = "dashboard" }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === tab);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setTab(tabs[next].id);
    document.getElementById(`${baseId}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <section
      id="nirman-crm"
      aria-labelledby="crm-title"
      className="relative scroll-mt-16 overflow-hidden bg-forest-deep text-paper"
    >
      <div className="dot-grid-light absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(55%_70%_at_75%_0%,rgb(159_220_184/0.18),transparent_70%)]" aria-hidden />

      <div className="container-site relative py-20 lg:py-28">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-3 rounded-full bg-white/8 py-1.5 pl-1.5 pr-4 text-[0.95rem] text-mint ring-1 ring-white/10">
              <LogoMark className="size-7" tone="light" />
              Nirman CRM, our own product
            </p>
            <h2 id="crm-title" className="display mt-6 text-[clamp(2.75rem,6.4vw,5.25rem)] text-paper">
              {crm.title.split(/(?<=\.) /).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.1rem] leading-[1.65] text-paper/75">{crm.subtitle}</p>
            {/* Decision C5: the CRM's only call to action is "Book a demo". */}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={crm.primary.href} variant="light" size="lg">
                {crm.primary.label}
                <ArrowRight className="size-4.5" />
              </ButtonLink>
              <ButtonLink href={crm.secondary.href} variant="ghostLight" size="lg">
                {crm.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Nirman CRM views"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-full bg-white/6 p-1 ring-1 ring-white/10 sm:mx-0 sm:w-fit"
          >
            {tabs.map((t) => {
              const selected = t.id === tab;
              return (
                <button
                  key={t.id}
                  id={`${baseId}-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] transition-colors ${
                    selected ? "bg-mint font-medium text-forest-deep" : "text-paper/70 hover:bg-white/8 hover:text-paper"
                  }`}
                >
                  <t.icon className="size-4" strokeWidth={1.8} />
                  {t.label}
                </button>
              );
            })}
          </div>
          <p className="text-[0.85rem] text-paper/50">
            {tab === "dashboard" && "What a sales head sees first thing in the morning."}
            {tab === "pipeline" && "Hover or focus a stage to see how deals move through it."}
            {tab === "leads" && "Select a lead to open their history."}
            {tab === "followups" && "Tick off a follow-up to complete it."}
            {tab === "reports" && "Sample data for illustration."}
          </p>
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="mt-6"
        >
          <Stage w={560} h={520} wLg={1240} hLg={590}>
            <div className="absolute inset-0 flex overflow-hidden rounded-2xl bg-surface text-ink shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)] ring-1 ring-black/20">
              <CrmSidebar tab={tab} />
              <div className="flex min-w-0 flex-1 flex-col">
                <CrmTopbar />
                <div key={tab} className="anim-pop min-h-0 flex-1">
                  {tab === "dashboard" && <DashboardView />}
                  {tab === "pipeline" && <PipelineView />}
                  {tab === "leads" && <LeadsView />}
                  {tab === "followups" && <FollowupsView />}
                  {tab === "reports" && <ReportsView />}
                </div>
              </div>
            </div>
          </Stage>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {crmCallouts.map((c) => (
              <li key={c.title} className="rounded-2xl bg-white/6 p-6 ring-1 ring-white/10">
                <p className="title text-[1.25rem] text-mint">{c.title}</p>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-paper/70">{c.body}</p>
              </li>
            ))}
          </ul>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {crmFeatures.map((f, i) => {
              const Icon = featureIcons[f.icon];
              return (
                <li key={f.title}>
                  <span
                    className={`grid size-11 place-items-center rounded-2xl ${
                      ["bg-cobalt", "bg-coral", "bg-marigold text-ink", "bg-lilac text-ink", "bg-peacock", "bg-mint text-forest-deep"][i]
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <p className="title mt-4 text-[1.1rem] text-paper">{f.title}</p>
                  <p className="mt-1.5 text-[0.925rem] leading-relaxed text-paper/60">{f.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const navMap: Record<Tab, string> = { dashboard: "Dashboard", pipeline: "Pipeline", leads: "Leads", followups: "Follow-ups", reports: "Reports" };

function CrmSidebar({ tab }: { tab: Tab }) {
  const items = [
    [LayoutDashboard, "Dashboard"],
    [Users, "Leads"],
    [KanbanSquare, "Pipeline"],
    [Contact, "Contacts"],
    [CalendarCheck, "Follow-ups"],
    [ChartColumn, "Reports"],
  ] as const;
  return (
    <aside className="hidden w-210 shrink-0 flex-col border-r border-ink/8 bg-[#f3f1ea] px-14 py-16 lg:flex" aria-hidden>
      <div className="flex items-center gap-8 px-6">
        <LogoMark className="size-24" tone="forest" />
        <span className="fs-14 font-semibold tracking-[-0.01em]">Nirman CRM</span>
      </div>
      <div className="mt-18 rounded-xs bg-surface px-10 py-8 ring-1 ring-ink/8">
        <p className="fs-9 text-ink-3">Workspace</p>
        <p className="fs-11 font-medium">Lumen Realty</p>
      </div>
      <nav className="mt-16 space-y-2 fs-12">
        {items.map(([Icon, label]) => {
          const active = label === navMap[tab];
          return (
            <span
              key={label}
              className={`flex items-center gap-10 rounded-full px-12 py-7 ${
                active ? "bg-forest font-medium text-mint" : "text-ink-2"
              }`}
            >
              <Icon className="size-14" strokeWidth={1.8} />
              {label}
              {label === "Follow-ups" && (
                <span className={`ml-auto rounded-full px-6 fs-9 tnum ${active ? "bg-white/20" : "bg-brass-soft text-[#7a5d2c]"}`}>6</span>
              )}
            </span>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 fs-12 text-ink-2">
        <span className="flex items-center gap-10 px-10 py-7">
          <Settings className="size-14" strokeWidth={1.8} />
          Settings
        </span>
        <div className="flex items-center gap-8 border-t border-ink/8 px-6 pt-12">
          <Avatar initials="AS" tone="forest" />
          <span className="leading-tight">
            <span className="block fs-11 font-medium text-ink">Anil Shah</span>
            <span className="block fs-9 text-ink-3">Sales head</span>
          </span>
        </div>
      </div>
    </aside>
  );
}

function CrmTopbar() {
  return (
    <div className="flex items-center gap-10 border-b border-ink/8 px-18 py-11" aria-hidden>
      <span className="flex flex-1 items-center gap-8 rounded-full bg-paper px-12 py-7 fs-11 text-ink-3 lg:max-w-320">
        <Search className="size-12" />
        Search leads, companies, phone numbers
      </span>
      <span className="ml-auto hidden items-center gap-6 rounded-xs px-10 py-7 fs-11 text-ink-2 ring-1 ring-ink/10 lg:flex">
        <SlidersHorizontal className="size-12" />
        Filters
      </span>
      <span className="flex items-center gap-6 rounded-full bg-forest px-12 py-7 fs-11 font-medium text-mint">
        <Plus className="size-12" />
        New lead
      </span>
      <span className="relative hidden lg:block">
        <Bell className="size-16 text-ink-2" />
        <span className="absolute -right-1 -top-1 size-6 rounded-full bg-brass" />
      </span>
    </div>
  );
}

function Avatar({ initials, tone = "sage" }: { initials: string; tone?: "sage" | "forest" | "brass" }) {
  const tones = {
    sage: "bg-sage text-forest",
    forest: "bg-forest text-paper",
    brass: "bg-brass-soft text-[#7a5d2c]",
  };
  return <span className={`grid size-22 shrink-0 place-items-center rounded-full fs-8 font-semibold ${tones[tone]}`}>{initials}</span>;
}

/* ---------------------------- Dashboard --------------------------- */

function DashboardView() {
  const kpis = [
    { k: "New leads this week", v: "38", d: "+12 vs last week", c: "bg-cobalt-soft", spark: [12, 18, 15, 22, 19, 27, 38] },
    { k: "Open pipeline", v: "₹44.4L", d: "31 open deals", c: "bg-mint-soft", spark: [30, 32, 35, 33, 38, 41, 44] },
    { k: "Won this month", v: "₹16.3L", d: "7 deals", c: "bg-marigold-soft", spark: [4, 6, 6, 9, 11, 13, 16] },
    { k: "Follow-ups due today", v: "6", d: "1 overdue", c: "bg-coral-soft", spark: [3, 5, 4, 7, 5, 8, 6] },
  ];
  const team = [
    ["Priya Nair", "PN", "₹7.8L", 82],
    ["Anil Shah", "AS", "₹5.2L", 64],
    ["Rohan Kulkarni", "RK", "₹3.3L", 41],
  ] as const;
  return (
    <div className="flex h-full flex-col overflow-hidden p-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="fs-10 text-ink-3">Tuesday, 21 October</p>
          <p className="mock-display fs-18">Good morning, Anil</p>
        </div>
        <span className="hidden rounded-full px-12 py-5 fs-10 text-ink-2 ring-1 ring-ink/10 lg:inline">This month</span>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-10 lg:grid-cols-4">
        {kpis.map((m, i) => (
          <div key={m.k} className={`rounded-lg p-12 ${m.c} ${i > 1 ? "max-lg:hidden" : ""}`}>
            <p className="fs-10 text-ink-2">{m.k}</p>
            <div className="mt-4 flex items-end justify-between gap-8">
              <p className="mock-display fs-24 tnum">{m.v}</p>
              <div className="h-24 w-70 text-ink">
                <LineChart gridLines={0} w={70} h={24} series={[{ values: m.spark, color: "#16181b", width: 1.4 }]} />
              </div>
            </div>
            <p className={`mt-2 fs-9 ${m.d.includes("overdue") ? "font-medium text-signal-red" : "text-ink-3"}`}>{m.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid min-h-0 flex-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex min-h-0 flex-col rounded-lg p-14 ring-1 ring-ink/8">
          <div className="flex items-center justify-between">
            <p className="fs-12 font-medium">Revenue won</p>
            <span className="flex items-center gap-10 fs-9 text-ink-3">
              <span className="flex items-center gap-4">
                <span className="h-3 w-10 rounded-full bg-forest-2" />
                2026
              </span>
              <span className="flex items-center gap-4">
                <span className="h-3 w-10 rounded-full bg-ink/25" />
                2025
              </span>
            </span>
          </div>
          <div className="mt-10 min-h-0 flex-1 text-ink">
            <LineChart
              w={420}
              h={160}
              series={[
                { values: [5.1, 5.8, 6.2, 7.0, 6.6, 7.9, 8.4, 9.1, 11.6, 9.8, 16.3], color: "#80868c", dashed: true, width: 1.4 },
                { values: [6.0, 6.9, 7.2, 8.4, 8.1, 9.6, 10.4, 11.2, 13.9, 12.8, 18.6], color: "#1e5a4b", fill: true, width: 2.4 },
              ]}
            />
          </div>
          <div className="mt-6 flex justify-between fs-9 text-ink-3">
            {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="hidden min-h-0 flex-col rounded-lg p-14 ring-1 ring-ink/8 lg:flex">
          <p className="fs-12 font-medium">Due today</p>
          <ul className="mt-10 space-y-7">
            {[
              [Phone, "Call Ritu, Kestrel Foods", "3:00 pm", "bg-cobalt-soft text-cobalt"],
              [MessageCircle, "WhatsApp Kavya re: quote", "Overdue", "bg-coral-soft text-coral-2"],
              [Video, "Demo, Bluepine Schools", "5:15 pm", "bg-mint-soft text-forest"],
              [Mail, "Send proposal, Haveli Hotels", "6:00 pm", "bg-marigold-soft text-[#7a5200]"],
            ].map(([Icon, t, time, c]) => {
              const I = Icon as typeof Phone;
              return (
                <li key={t as string} className="flex items-center gap-8">
                  <span className={`grid size-24 shrink-0 place-items-center rounded-md ${c as string}`}>
                    <I className="size-12" />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate fs-10 font-medium">{t as string}</span>
                    <span className={`block fs-9 ${time === "Overdue" ? "text-signal-red" : "text-ink-3"}`}>{time as string}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden min-h-0 flex-col rounded-lg p-14 ring-1 ring-ink/8 lg:flex">
          <p className="fs-12 font-medium">Team this month</p>
          <ul className="mt-10 space-y-10">
            {team.map(([n, ini, v, pct]) => (
              <li key={n}>
                <div className="flex items-center gap-8">
                  <Avatar initials={ini} tone={ini === "AS" ? "forest" : ini === "RK" ? "brass" : "sage"} />
                  <span className="flex-1 fs-10 font-medium">{n}</span>
                  <span className="fs-10 font-semibold tnum">{v}</span>
                </div>
                <div className="mt-5 h-5 rounded-full bg-paper">
                  <div className="h-full rounded-full bg-forest-2" style={{ width: `${pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-auto rounded-md bg-mint-soft p-8 fs-9 leading-snug text-forest">Team is at 76% of the monthly target with 10 days left.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Pipeline ---------------------------- */

type Deal = { co: string; who: string; value: string; owner: string; tag: string; next: string; warn?: boolean };

const pipeline: {
  name: string;
  total: string;
  avgDays: string;
  conv: string;
  note: string;
  deals: Deal[];
}[] = [
  {
    name: "New enquiry",
    total: "₹9.8L",
    avgDays: "1.4 days",
    conv: "71%",
    note: "Most come from the website form",
    deals: [
      { co: "Kestrel Foods", who: "Ritu Malhotra", value: "₹1.2L", owner: "PN", tag: "Website", next: "Call today, 3 pm" },
      { co: "Vardhan Clinics", who: "Dr. Sameer V.", value: "₹80K", owner: "RK", tag: "Google search", next: "Send brochure" },
      { co: "Bluepine Schools", who: "Neha Joshi", value: "₹2.6L", owner: "PN", tag: "Referral", next: "First call" },
    ],
  },
  {
    name: "Contacted",
    total: "₹11.2L",
    avgDays: "3.2 days",
    conv: "58%",
    note: "Deals stall here without a site visit",
    deals: [
      { co: "Oakline Tiles", who: "Farhan Ali", value: "₹1.9L", owner: "AS", tag: "Website", next: "Site visit Thu" },
      { co: "Greenfield PG", who: "Kavya Rao", value: "₹3.1L", owner: "RK", tag: "WhatsApp", next: "No reply in 5 days", warn: true },
    ],
  },
  {
    name: "Proposal sent",
    total: "₹14.5L",
    avgDays: "6.8 days",
    conv: "46%",
    note: "Follow up within 48 hours of sending",
    deals: [
      { co: "Lumen Interiors", who: "Rahul Desai", value: "₹3.4L", owner: "PN", tag: "Referral", next: "Review call Fri" },
      { co: "Haveli Hotels", who: "Arjun Mehta", value: "₹5.2L", owner: "AS", tag: "Event", next: "Revised quote" },
    ],
  },
  {
    name: "Negotiation",
    total: "₹8.9L",
    avgDays: "4.1 days",
    conv: "63%",
    note: "Discount approvals go to the sales head",
    deals: [{ co: "Ashoka School", who: "Meena Pillai", value: "₹4.4L", owner: "AS", tag: "Website", next: "Awaiting approval" }],
  },
  {
    name: "Won",
    total: "₹16.3L",
    avgDays: "",
    conv: "",
    note: "7 deals closed this quarter",
    deals: [
      { co: "Saarthi Logistics", who: "Vikram Singh", value: "₹4.1L", owner: "RK", tag: "Referral", next: "Onboarding" },
      { co: "Café Nilgiri", who: "Anita George", value: "₹1.5L", owner: "PN", tag: "Email campaign", next: "Invoice paid" },
    ],
  },
];

function PipelineView() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col p-16">
        <div className="flex items-end justify-between gap-12">
          <div>
            <p className="mock-display fs-18">Sales pipeline</p>
            <p className="fs-10 text-ink-3">All owners, October to December</p>
          </div>
          <div className="flex gap-16 text-right">
            <div>
              <p className="fs-9 text-ink-3">Open value</p>
              <p className="fs-16 font-semibold tnum">₹44.4L</p>
            </div>
            <div className="hidden lg:block">
              <p className="fs-9 text-ink-3">Win rate</p>
              <p className="fs-16 font-semibold tnum">32%</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid min-h-0 flex-1 grid-cols-2 gap-10 lg:grid-cols-5" onMouseLeave={() => setActive(null)}>
          {pipeline.map((col, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <div
                key={col.name}
                className={`relative flex min-h-0 flex-col rounded-sm p-8 transition-[background-color,opacity] duration-200 ${
                  isActive ? "bg-mint-soft" : "bg-paper"
                } ${dimmed ? "opacity-55" : ""} ${i > 1 ? "max-lg:hidden" : ""}`}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-expanded={isActive}
                  className="rounded-xs px-4 pb-8 pt-2 text-left"
                >
                  <span className={`mb-6 block h-4 rounded-full ${["bg-cobalt", "bg-marigold", "bg-coral", "bg-lilac", "bg-mint"][i]}`} />
                  <span className="flex items-center justify-between fs-11 font-medium">
                    {col.name}
                    <span className="rounded-full bg-surface px-6 py-1 fs-9 text-ink-3 tnum">{[12, 9, 6, 4, 7][i]}</span>
                  </span>
                  <span className="block fs-10 text-ink-3 tnum">{col.total}</span>
                </button>

                {isActive && (
                  <div className="absolute inset-x-6 top-56 z-10 rounded-lg bg-forest-deep p-10 text-paper shadow-scene" role="status">
                    {col.avgDays ? (
                      <dl className="grid grid-cols-2 gap-6 fs-9">
                        <div>
                          <dt className="text-paper/55">Time here</dt>
                          <dd className="fs-12 font-semibold tnum">{col.avgDays}</dd>
                        </div>
                        <div>
                          <dt className="text-paper/55">Moves on</dt>
                          <dd className="fs-12 font-semibold tnum">{col.conv}</dd>
                        </div>
                      </dl>
                    ) : null}
                    <p className={`fs-9 leading-snug text-paper/75 ${col.avgDays ? "mt-6 border-t border-white/10 pt-6" : ""}`}>{col.note}</p>
                  </div>
                )}

                <div className="space-y-7 overflow-hidden">
                  {col.deals.map((d) => (
                    <div key={d.co} className="rounded-xs bg-surface p-9 shadow-[0_1px_2px_rgb(29_35_33/0.06)] ring-1 ring-ink/6">
                      <div className="flex items-start justify-between gap-6">
                        <span className="min-w-0 leading-tight">
                          <span className="block truncate fs-11 font-medium">{d.co}</span>
                          <span className="block truncate fs-9 text-ink-3">{d.who}</span>
                        </span>
                        <Avatar initials={d.owner} tone={d.owner === "AS" ? "forest" : d.owner === "RK" ? "brass" : "sage"} />
                      </div>
                      <div className="mt-7 flex items-center justify-between">
                        <span className="fs-11 font-semibold tnum">{d.value}</span>
                        <span className="rounded-[calc(var(--spacing)*3)] bg-paper-2 px-5 py-1 fs-8 text-ink-2">{d.tag}</span>
                      </div>
                      <p className={`mt-6 border-t border-ink/6 pt-6 fs-9 ${d.warn ? "text-signal-red" : "text-ink-2"}`}>{d.next}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* right rail */}
      <aside className="hidden w-260 shrink-0 flex-col border-l border-ink/8 p-16 lg:flex">
        <p className="fs-12 font-semibold">Today&apos;s follow-ups</p>
        <ul className="mt-10 space-y-7">
          {[
            [Phone, "Call Ritu, Kestrel Foods", "3:00 pm"],
            [MessageCircle, "WhatsApp Kavya re: quote", "4:30 pm"],
            [Video, "Demo for Bluepine Schools", "5:15 pm"],
          ].map(([Icon, t, time]) => {
            const I = Icon as typeof Phone;
            return (
              <li key={t as string} className="flex items-center gap-8 rounded-xs bg-paper-2/70 p-8">
                <span className="grid size-24 place-items-center rounded-xs bg-surface text-forest">
                  <I className="size-12" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate fs-10 font-medium">{t as string}</span>
                  <span className="block fs-9 text-ink-3">{time as string}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-18 fs-12 font-semibold">Activity</p>
        <ol className="relative mt-10 space-y-12 border-l border-ink/12 pl-12">
          {[
            ["Proposal viewed", "Haveli Hotels opened the quote twice", "12 min ago"],
            ["Deal won", "Saarthi Logistics, ₹4.1L", "1 hr ago"],
            ["New enquiry", "Bluepine Schools via website", "2 hr ago"],
            ["Stage changed", "Oakline Tiles moved to Contacted", "Yesterday"],
          ].map(([t, d, w], i) => (
            <li key={t} className="relative">
              <span className={`absolute -left-[calc(var(--spacing)*16)] top-3 size-7 rounded-full ring-2 ring-surface ${i === 1 ? "bg-forest" : "bg-sage-3"}`} />
              <p className="fs-10 font-medium">{t}</p>
              <p className="fs-9 text-ink-2">{d}</p>
              <p className="fs-8 text-ink-3">{w}</p>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

/* ------------------------------ Leads ----------------------------- */

const leads = [
  { name: "Ritu Malhotra", co: "Kestrel Foods", src: "Website", owner: "PN", status: "New", score: 82, last: "Form submitted, 2h" },
  { name: "Arjun Mehta", co: "Haveli Hotels", src: "Event", owner: "AS", status: "Proposal", score: 74, last: "Viewed quote, 12m" },
  { name: "Kavya Rao", co: "Greenfield PG", src: "WhatsApp", owner: "RK", status: "Contacted", score: 41, last: "No reply, 5d" },
  { name: "Neha Joshi", co: "Bluepine Schools", src: "Referral", owner: "PN", status: "New", score: 68, last: "Demo booked, 1h" },
  { name: "Farhan Ali", co: "Oakline Tiles", src: "Website", owner: "AS", status: "Contacted", score: 59, last: "Call logged, 1d" },
  { name: "Meena Pillai", co: "Ashoka School", src: "Website", owner: "AS", status: "Negotiation", score: 88, last: "Email sent, 3h" },
  { name: "Dr. Sameer V.", co: "Vardhan Clinics", src: "Google search", owner: "RK", status: "New", score: 52, last: "Call missed, 4h" },
];

const statusTone: Record<string, string> = {
  New: "bg-sage text-forest",
  Contacted: "bg-paper-2 text-ink-2",
  Proposal: "bg-brass-soft text-[#7a5d2c]",
  Negotiation: "bg-[#e3e9ef] text-signal-blue",
};

function LeadsView() {
  const [sel, setSel] = useState(1);
  const lead = leads[sel];
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 p-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="mock-display fs-18">Leads</p>
            <p className="fs-10 text-ink-3">148 this quarter, 23 need attention</p>
          </div>
          <div className="hidden gap-6 fs-10 lg:flex">
            {["All", "New", "Contacted", "Proposal"].map((f) => (
              <span key={f} className={`rounded-full px-10 py-4 ${f === "All" ? "bg-ink text-paper" : "text-ink-2 ring-1 ring-ink/10"}`}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <table className="mt-14 w-full fs-11">
          <thead>
            <tr className="border-b border-ink/8 text-left fs-10 text-ink-3">
              <th className="pb-8 font-normal">Lead</th>
              <th className="hidden pb-8 font-normal lg:table-cell">Source</th>
              <th className="pb-8 font-normal">Status</th>
              <th className="hidden pb-8 font-normal lg:table-cell">Score</th>
              <th className="hidden pb-8 font-normal lg:table-cell">Last activity</th>
              <th className="pb-8 text-right font-normal">Owner</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr
                key={l.name}
                className={`cursor-pointer border-b border-ink/6 transition-colors ${i === sel ? "bg-sage/50" : "hover:bg-paper-2/60"}`}
                onClick={() => setSel(i)}
              >
                <td className="py-9 pl-6">
                  <button type="button" onClick={() => setSel(i)} aria-pressed={i === sel} className="text-left leading-tight">
                    <span className="block font-medium">{l.name}</span>
                    <span className="block fs-9 text-ink-3">{l.co}</span>
                  </button>
                </td>
                <td className="hidden text-ink-2 lg:table-cell">{l.src}</td>
                <td>
                  <span className={`rounded-full px-8 py-2 fs-9 ${statusTone[l.status]}`}>{l.status}</span>
                </td>
                <td className="hidden lg:table-cell">
                  <span className="flex items-center gap-6">
                    <span className="h-4 w-60 rounded-full bg-paper-2">
                      <span
                        className={`block h-full rounded-full ${l.score > 70 ? "bg-forest" : l.score > 50 ? "bg-moss" : "bg-brass-2"}`}
                        style={{ width: `${l.score}%` }}
                      />
                    </span>
                    <span className="fs-9 text-ink-3 tnum">{l.score}</span>
                  </span>
                </td>
                <td className="hidden fs-10 text-ink-2 lg:table-cell">{l.last}</td>
                <td className="pr-6">
                  <span className="flex justify-end">
                    <Avatar initials={l.owner} tone={l.owner === "AS" ? "forest" : l.owner === "RK" ? "brass" : "sage"} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="hidden w-320 shrink-0 flex-col border-l border-ink/8 bg-[#faf9f5] p-18 lg:flex">
        <div className="flex items-center gap-10">
          <span className="grid size-40 place-items-center rounded-full bg-sage fs-13 font-semibold text-forest">
            {lead.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="leading-tight">
            <span className="block fs-14 font-semibold">{lead.name}</span>
            <span className="block fs-10 text-ink-3">{lead.co}</span>
          </span>
        </div>
        <div className="mt-12 flex gap-6">
          {[Phone, MessageCircle, Mail].map((I, i) => (
            <span key={i} className="grid h-28 flex-1 place-items-center rounded-xs bg-surface text-forest ring-1 ring-ink/10">
              <I className="size-13" />
            </span>
          ))}
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-10 fs-10">
          <div>
            <dt className="text-ink-3">Status</dt>
            <dd className="mt-2">
              <span className={`rounded-full px-8 py-2 fs-9 ${statusTone[lead.status]}`}>{lead.status}</span>
            </dd>
          </div>
          <div>
            <dt className="text-ink-3">Source</dt>
            <dd className="mt-2 font-medium">{lead.src}</dd>
          </div>
          <div>
            <dt className="text-ink-3">Lead score</dt>
            <dd className="mt-2 font-medium tnum">{lead.score} / 100</dd>
          </div>
          <div>
            <dt className="text-ink-3">Last activity</dt>
            <dd className="mt-2 font-medium">{lead.last}</dd>
          </div>
        </dl>
        <p className="mt-16 fs-11 font-semibold">Timeline</p>
        <ol className="mt-10 space-y-10 border-l border-ink/12 pl-12">
          {[
            [FileText, "Quote viewed twice", "Today, 11:48"],
            [Mail, "Proposal sent by Anil", "Mon, 16:20"],
            [Phone, "Discovery call, 24 min", "Fri, 12:05"],
            [Globe, "Enquiry from website", "Thu, 09:31"],
          ].map(([Icon, t, w], i) => {
            const I = Icon as typeof Mail;
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[calc(var(--spacing)*21)] grid size-16 place-items-center rounded-full bg-surface text-forest ring-1 ring-ink/12">
                  <I className="size-9" />
                </span>
                <p className="fs-10 font-medium">{t as string}</p>
                <p className="fs-9 text-ink-3">{w as string}</p>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}

/* ---------------------------- Follow-ups --------------------------- */

const followups = [
  { group: "Overdue", items: [{ i: Phone, t: "Call Kavya Rao about revised quote", who: "Greenfield PG", when: "Yesterday" }] },
  {
    group: "Today",
    items: [
      { i: Phone, t: "Call Ritu Malhotra", who: "Kestrel Foods", when: "3:00 pm" },
      { i: MessageCircle, t: "Send brochure on WhatsApp", who: "Vardhan Clinics", when: "4:00 pm" },
      { i: Video, t: "Product demo", who: "Bluepine Schools", when: "5:15 pm" },
    ],
  },
  {
    group: "Tomorrow",
    items: [
      { i: Mail, t: "Share revised proposal", who: "Haveli Hotels", when: "11:00 am" },
      { i: CalendarCheck, t: "Site visit", who: "Oakline Tiles", when: "2:30 pm" },
    ],
  },
];

function FollowupsView() {
  const [done, setDone] = useState<Record<string, boolean>>({ "Send brochure on WhatsApp": true });
  const total = followups.reduce((a, g) => a + g.items.length, 0);
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 overflow-hidden p-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="mock-display fs-18">My follow-ups</p>
            <p className="fs-10 text-ink-3 tnum">
              {completed} of {total} done today
            </p>
          </div>
          <div className="h-6 w-140 rounded-full bg-paper-2">
            <div className="h-full rounded-full bg-forest transition-[width] duration-500" style={{ width: `${(completed / total) * 100}%` }} />
          </div>
        </div>
        <div className="mt-12 space-y-14">
          {followups.map((g) => (
            <div key={g.group}>
              <p className={`fs-10 font-medium ${g.group === "Overdue" ? "text-signal-red" : "text-ink-3"}`}>{g.group}</p>
              <ul className="mt-6 space-y-6">
                {g.items.map((it) => {
                  const isDone = !!done[it.t];
                  return (
                    <li key={it.t}>
                      <label className="flex cursor-pointer items-center gap-10 rounded-xs bg-surface p-10 ring-1 ring-ink/8 transition-colors hover:bg-paper-2/50">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={isDone}
                          onChange={() => setDone((d) => ({ ...d, [it.t]: !d[it.t] }))}
                        />
                        <span
                          className={`grid size-16 shrink-0 place-items-center rounded-[calc(var(--spacing)*4)] ring-1 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-forest ${
                            isDone ? "bg-forest text-paper ring-forest" : "ring-ink/25"
                          }`}
                        >
                          {isDone && <Check className="size-10" strokeWidth={3} />}
                        </span>
                        <it.i className="size-13 shrink-0 text-forest" />
                        <span className={`min-w-0 flex-1 leading-tight ${isDone ? "text-ink-3 line-through" : ""}`}>
                          <span className="block truncate fs-11 font-medium">{it.t}</span>
                          <span className="block fs-9 text-ink-3">{it.who}</span>
                        </span>
                        <span className="fs-10 text-ink-3 tnum">{it.when}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <aside className="hidden w-300 shrink-0 border-l border-ink/8 p-16 lg:block">
        <p className="fs-12 font-semibold">This week</p>
        <div className="mt-12 grid grid-cols-7 gap-4 text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i}>
              <p className="fs-9 text-ink-3">{d}</p>
              <p
                className={`mx-auto mt-4 grid size-24 place-items-center rounded-full fs-10 tnum ${
                  i === 1 ? "bg-forest font-semibold text-paper" : ""
                }`}
              >
                {20 + i}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: [3, 6, 4, 5, 2, 0, 0][i] > 3 ? 3 : [3, 6, 4, 5, 2, 0, 0][i] }, (_, k) => (
                  <span key={k} className="size-3 rounded-full bg-moss" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-18 rounded-sm bg-brass-soft p-12">
          <p className="fs-10 font-medium text-[#6d5530]">Stalled deals</p>
          <p className="mt-4 fs-10 leading-snug text-[#6d5530]/85">
            2 deals have had no activity for 5 days. Nirman suggests a WhatsApp check-in.
          </p>
        </div>
        <div className="mt-12 rounded-sm p-12 ring-1 ring-ink/8">
          <p className="fs-10 text-ink-3">Calls this week</p>
          <p className="fs-20 font-semibold tnum">38</p>
          <Bars className="mt-8 h-40" values={[6, 9, 8, 11, 4]} barClassName="bg-sage-2" highlight={1} highlightClassName="bg-forest" />
        </div>
      </aside>
    </div>
  );
}

/* ----------------------------- Reports ---------------------------- */

function ReportsView() {
  const funnel = [
    ["Enquiries", 148, 100],
    ["Contacted", 96, 65],
    ["Proposal", 41, 28],
    ["Won", 18, 12],
  ] as const;
  return (
    <div className="h-full overflow-hidden p-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="mock-display fs-18">Sales report</p>
          <p className="fs-10 text-ink-3">Last 6 months</p>
        </div>
        <span className="rounded-xs px-10 py-5 fs-10 text-ink-2 ring-1 ring-ink/10">Export PDF</span>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-10 lg:grid-cols-4">
        {[
          ["Revenue won", "₹62.4L", "+18%"],
          ["Deals won", "27", "+6"],
          ["Win rate", "32%", "+4 pts"],
          ["Avg. deal size", "₹2.3L", "+₹20K"],
        ].map(([k, v, d], i) => (
          <div key={k} className={`rounded-sm bg-paper-2/60 p-12 ${i > 1 ? "max-lg:hidden" : ""}`}>
            <p className="fs-10 text-ink-3">{k}</p>
            <p className="mt-2 fs-22 font-semibold tracking-[-0.02em] tnum">{v}</p>
            <p className="fs-9 text-forest tnum">{d} vs previous</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr_0.9fr]">
        <div className="rounded-sm p-14 ring-1 ring-ink/8">
          <p className="fs-11 font-medium">Revenue won by month</p>
          <div className="mt-12 flex h-170 gap-8">
            <div className="flex flex-col justify-between pb-18 fs-8 text-ink-3 tnum">
              <span>₹15L</span>
              <span>₹10L</span>
              <span>₹5L</span>
              <span>0</span>
            </div>
            <div className="flex flex-1 flex-col">
              <Bars className="flex-1" values={[7.2, 8.4, 9.1, 11.6, 9.8, 16.3]} barClassName="bg-sage-2" highlight={5} highlightClassName="bg-forest" />
              <div className="mt-6 flex justify-between fs-9 text-ink-3">
                {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
                  <span key={m} className="flex-1 text-center">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-sm p-14 ring-1 ring-ink/8">
          <p className="fs-11 font-medium">Conversion</p>
          <ul className="mt-12 space-y-10">
            {funnel.map(([k, n, w]) => (
              <li key={k}>
                <div className="flex justify-between fs-10">
                  <span className="text-ink-2">{k}</span>
                  <span className="font-medium tnum">{n}</span>
                </div>
                <div className="mt-4 h-10 rounded-[calc(var(--spacing)*3)] bg-paper-2">
                  <div className="h-full rounded-[calc(var(--spacing)*3)] bg-forest" style={{ width: `${w}%`, opacity: 0.45 + w / 180 }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden rounded-sm p-14 ring-1 ring-ink/8 lg:block">
          <p className="fs-11 font-medium">Lead sources</p>
          <div className="mt-10 flex items-center gap-12">
            <Donut
              className="size-84"
              parts={[
                { value: 42, color: "#1f4d3a" },
                { value: 24, color: "#6f8f72" },
                { value: 18, color: "#c9a76a" },
                { value: 16, color: "#c3cfbd" },
              ]}
            />
          </div>
          <ul className="mt-10 space-y-4 fs-9">
            {[
              ["#1f4d3a", "Website", "42%"],
              ["#6f8f72", "Referral", "24%"],
              ["#c9a76a", "Google search", "18%"],
              ["#c3cfbd", "WhatsApp", "16%"],
            ].map(([c, l, v]) => (
              <li key={l} className="flex items-center gap-6">
                <span className="size-7 rounded-full" style={{ background: c }} />
                <span className="flex-1 text-ink-2">{l}</span>
                <span className="tnum">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
