import { ArrowRight, Clock, Eye, Filter, GitBranch, Hourglass, Megaphone, Plus, Reply, Zap } from "lucide-react";
import { campaigns, leads, leadTimeline, reports, workflow } from "@/content/crm-screens";
import { ChannelChip } from "@/components/crm/screens";

/*
 * More Nirman CRM screens for AppFrame (the real CRM design, user
 * 2026-11-06): Leads, Reports, Campaigns, Automations. Sizes in em; demo
 * data from content/crm-screens.ts. Generic channel icons only.
 */

function Title({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <div className="mb-[1em] flex items-end gap-[0.6em]">
      <div>
        <p className="text-[1.25em] font-semibold tracking-[-0.02em]">{title}</p>
        <p className="text-[0.75em] text-[#6b7079]">{sub}</p>
      </div>
      <div className="ml-auto flex gap-[0.4em] text-[0.72em]">{right}</div>
    </div>
  );
}

const pill = "rounded-full px-[0.8em] py-[0.25em]";

/** Leads: table with score and last activity, and the selected lead's history. */
export function LeadsScreen() {
  const sel = leads[3];
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 p-[1.3em]">
        <Title
          title="Leads"
          sub="148 this month · 23 need attention"
          right={
            <>
              <span className={`${pill} flex items-center gap-[0.35em] bg-[#f2f5f8] text-ink/70`}>
                <Filter className="size-[1.1em]" /> Filters
              </span>
              <span className={`${pill} bg-ink-2 text-white`}>All</span>
              <span className={`${pill} bg-[#f2f5f8] text-ink/70`}>Hot</span>
            </>
          }
        />
        <div className="overflow-hidden rounded-[0.8em] ring-1 ring-line">
          <div className="grid grid-cols-[2.2fr_1.1fr_1.2fr_1fr_1.9fr_0.6fr] gap-[0.6em] bg-[#f7f9fb] px-[0.9em] py-[0.55em] text-[0.66em] font-medium text-[#6b7079]">
            <span>Lead</span>
            <span>Source</span>
            <span>Stage</span>
            <span>Score</span>
            <span>Last activity</span>
            <span>Owner</span>
          </div>
          {leads.map((l, i) => (
            <div
              key={l.name}
              className={`crm-row grid grid-cols-[2.2fr_1.1fr_1.2fr_1fr_1.9fr_0.6fr] items-center gap-[0.6em] border-t border-line px-[0.9em] py-[0.6em] ${i === 3 ? "bg-[#fdf1ea]" : ""}`}
            >
              <span className="flex min-w-0 items-center gap-[0.55em]">
                <span className={`grid size-[2.1em] shrink-0 place-items-center rounded-full text-[0.68em] font-semibold ${l.tone}`}>{l.initials}</span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[0.76em] font-semibold">{l.name}</span>
                  <span className="block truncate text-[0.64em] text-[#6b7079]">{l.business}</span>
                </span>
              </span>
              <span>
                <ChannelChip channel={l.source} />
              </span>
              <span className="text-[0.7em]">{l.stage}</span>
              <span className="flex items-center gap-[0.4em]">
                <span className="h-[0.35em] flex-1 rounded-full bg-[#f2f5f8]">
                  <span className={`block h-full rounded-full ${l.score >= 70 ? "bg-brand" : l.score >= 50 ? "bg-[#e0a33a]" : "bg-[#b9bec6]"}`} style={{ width: `${l.score}%` }} />
                </span>
                <span className="text-[0.66em] text-[#6b7079]">{l.score}</span>
              </span>
              <span className="truncate text-[0.68em] text-ink/75">{l.last}</span>
              <span className="grid size-[2em] place-items-center rounded-full bg-[#f2f5f8] text-[0.6em] font-semibold">{l.owner}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-line bg-[#f7f9fb] px-[0.9em] py-[0.5em] text-[0.64em] text-[#6b7079]">
            <span>Showing 6 of 148</span>
            <span className="flex gap-[0.4em]">
              <span className="rounded-[0.4em] bg-white px-[0.6em] py-[0.1em] ring-1 ring-line">1</span>
              <span className="px-[0.6em] py-[0.1em]">2</span>
              <span className="px-[0.6em] py-[0.1em]">3</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-[17em] shrink-0 border-l border-line bg-[#fbfaf9] p-[1.1em]">
        <div className="flex items-center gap-[0.6em]">
          <span className={`grid size-[2.6em] place-items-center rounded-full text-[0.8em] font-semibold ${sel.tone}`}>{sel.initials}</span>
          <span className="leading-tight">
            <span className="block text-[0.88em] font-semibold">{sel.name}</span>
            <span className="block text-[0.68em] text-[#6b7079]">{sel.business}</span>
          </span>
        </div>
        <div className="mt-[0.9em] grid grid-cols-2 gap-[0.5em] text-[0.68em]">
          {[
            ["Stage", sel.stage],
            ["Lead score", `${sel.score} / 100`],
            ["Source", "WhatsApp"],
            ["Owner", "Rohan V."],
          ].map(([k, v]) => (
            <span key={k} className="rounded-[0.6em] bg-white p-[0.6em] ring-1 ring-line">
              <span className="block text-[#6b7079]">{k}</span>
              <span className="block font-semibold">{v}</span>
            </span>
          ))}
        </div>
        <p className="mt-[1em] text-[0.75em] font-semibold">Timeline</p>
        <ol className="mt-[0.5em] flex flex-col gap-[0.6em] border-l border-line pl-[0.9em]">
          {leadTimeline.map((t, i) => (
            <li key={t.text} className="relative">
              <span className={`absolute top-[0.35em] -left-[1.2em] size-[0.55em] rounded-full ${i === 0 ? "bg-brand" : "bg-[#c9ccd2]"}`} />
              <span className="block text-[0.7em] font-medium">{t.text}</span>
              <span className="block text-[0.62em] text-[#6b7079]">{t.meta}</span>
            </li>
          ))}
        </ol>
        <span className="mt-[1em] flex items-center justify-center gap-[0.4em] rounded-full bg-brand py-[0.5em] text-[0.72em] font-medium text-white">
          <Reply className="size-[1.1em]" /> Reply on WhatsApp
        </span>
      </div>
    </div>
  );
}

/** Reports: KPIs, leads by month, conversion funnel, team. */
export function ReportsScreen() {
  const max = Math.max(...reports.months.map((m) => m.v));
  const top = reports.funnel[0].v;
  return (
    <div className="h-full p-[1.3em]">
      <Title title="Sales report" sub="Last 6 months" right={<span className={`${pill} bg-[#f2f5f8] text-ink/70`}>Export PDF</span>} />
      <div className="grid grid-cols-4 gap-[0.7em]">
        {reports.kpis.map((k) => (
          <div key={k.label} className="crm-card rounded-[0.9em] bg-white p-[0.8em] ring-1 ring-line">
            <p className="text-[0.66em] text-[#6b7079]">{k.label}</p>
            <p className="mt-[0.15em] text-[1.45em] font-semibold tracking-[-0.03em]">{k.value}</p>
            <p className="text-[0.62em] font-medium text-[#1f8a55]">{k.delta} vs last period</p>
          </div>
        ))}
      </div>
      <div className="mt-[0.7em] grid grid-cols-[1.5fr_1.1fr_1fr] gap-[0.7em]">
        <div className="crm-card rounded-[0.9em] bg-white p-[0.9em] ring-1 ring-line">
          <p className="text-[0.76em] font-semibold">Leads by month</p>
          <div className="mt-[0.7em] flex h-[9em] items-end gap-[0.7em]">
            {reports.months.map((m, i) => (
              <span key={m.m} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.3em]">
                <span className={`crm-bar w-full origin-bottom rounded-t-[0.4em] ${i === reports.months.length - 1 ? "bg-brand" : "bg-[#f6d3bf]"}`} style={{ height: `${(m.v / max) * 100}%` }} />
                <span className="text-[0.6em] text-[#6b7079]">{m.m}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="crm-card rounded-[0.9em] bg-white p-[0.9em] ring-1 ring-line">
          <p className="text-[0.76em] font-semibold">Conversion</p>
          <ul className="mt-[0.7em] flex flex-col gap-[0.6em]">
            {reports.funnel.map((f, i) => (
              <li key={f.label} className="text-[0.68em]">
                <span className="flex justify-between">
                  <span>{f.label}</span>
                  <span className="font-semibold">{f.v}</span>
                </span>
                <span className="mt-[0.25em] block h-[0.6em] rounded-full bg-[#f2f5f8]">
                  <span className={`crm-fill block h-full origin-left rounded-full ${i === reports.funnel.length - 1 ? "bg-brand" : "bg-ink-2"}`} style={{ width: `${(f.v / top) * 100}%`, opacity: 1 - i * 0.15 }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="crm-card rounded-[0.9em] bg-white p-[0.9em] ring-1 ring-line">
          <p className="text-[0.76em] font-semibold">Team this month</p>
          <ul className="mt-[0.7em] flex flex-col gap-[0.7em]">
            {reports.team.map((t) => (
              <li key={t.name} className="text-[0.68em]">
                <span className="flex items-center gap-[0.5em]">
                  <span className="grid size-[2em] place-items-center rounded-full bg-[#f2f5f8] text-[0.85em] font-semibold">{t.initials}</span>
                  <span className="flex-1">{t.name}</span>
                  <span className="font-semibold">{t.won} won</span>
                </span>
                <span className="mt-[0.35em] block h-[0.4em] rounded-full bg-[#f2f5f8]">
                  <span className="block h-full rounded-full bg-[#1f8a55]" style={{ width: `${t.pct}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Campaigns: WhatsApp and email broadcasts and drips with delivery and reply stats. */
export function CampaignsScreen() {
  return (
    <div className="flex h-full gap-[1.1em] p-[1.3em]">
      <div className="min-w-0 flex-1">
        <Title
          title="Campaigns"
          sub="WhatsApp and email, sent from your CRM"
          right={
            <span className={`${pill} flex items-center gap-[0.35em] bg-ink-2 text-white`}>
              <Plus className="size-[1.1em]" /> New campaign
            </span>
          }
        />
        <ul className="flex flex-col gap-[0.55em]">
          {campaigns.map((c) => (
            <li key={c.name} className="crm-row grid grid-cols-[2.4fr_repeat(3,1fr)] items-center gap-[0.8em] rounded-[0.8em] bg-white p-[0.8em] ring-1 ring-line">
              <span className="min-w-0">
                <span className="flex items-center gap-[0.5em]">
                  <ChannelChip channel={c.channel} label={false} />
                  <span className="truncate text-[0.8em] font-semibold">{c.name}</span>
                </span>
                <span className="mt-[0.25em] flex items-center gap-[0.5em] text-[0.64em] text-[#6b7079]">
                  <span
                    className={`rounded-full px-[0.6em] py-[0.05em] font-medium ${
                      c.status === "Running" ? "bg-[#ddf3e6] text-[#1f8a55]" : c.status === "Sent" ? "bg-[#f2f5f8] text-ink/70" : "bg-[#fdf3d4] text-[#a06a00]"
                    }`}
                  >
                    {c.status}
                  </span>
                  {c.audience}
                </span>
              </span>
              {c.stats.map(([k, v], i) => (
                <span key={i} className="leading-tight">
                  <span className="block text-[0.95em] font-semibold">{v}</span>
                  <span className="block text-[0.6em] text-[#6b7079]">{k}</span>
                </span>
              ))}
            </li>
          ))}
        </ul>
        <div className="mt-[0.7em] rounded-[0.8em] bg-white p-[0.8em] ring-1 ring-line">
          <p className="flex items-center justify-between text-[0.72em] font-semibold">
            Replies this week <span className="font-normal text-[#6b7079]">WhatsApp · Email</span>
          </p>
          <div className="mt-[0.6em] flex h-[4.5em] items-end gap-[0.5em]">
            {[[30, 12], [42, 18], [36, 15], [58, 22], [49, 20], [66, 25], [40, 14]].map(([w, e], i) => (
              <span key={i} className="flex h-full flex-1 items-end gap-[0.15em]">
                <span className="crm-bar flex-1 origin-bottom rounded-t-[0.25em] bg-brand" style={{ height: `${w * 1.4}%` }} />
                <span className="crm-bar flex-1 origin-bottom rounded-t-[0.25em] bg-[#f6d3bf]" style={{ height: `${e * 1.4}%` }} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[16em] shrink-0 rounded-[0.9em] bg-[#f4f6f9] p-[0.9em]">
        <p className="flex items-center gap-[0.4em] text-[0.76em] font-semibold">
          <Megaphone className="size-[1.1em] text-brand" /> WhatsApp preview
        </p>
        <div className="mt-[0.7em] rounded-[0.9em] bg-[#e9e4dc] p-[0.7em]">
          <div className="rounded-[0.7em] rounded-tl-[0.2em] bg-white p-[0.7em] text-[0.7em] leading-snug shadow-[0_0.1em_0.2em_rgba(0,0,0,0.08)]">
            <p className="font-semibold">Hi Riya 👋</p>
            <p className="mt-[0.3em]">Our Diwali offer is live: a free site audit with every new website this month.</p>
            <p className="mt-[0.4em] text-[0.85em] text-[#6b7079]">Reply YES and we will call you.</p>
          </div>
          <div className="mt-[0.4em] flex gap-[0.4em] text-[0.66em]">
            <span className="flex-1 rounded-[0.6em] bg-white py-[0.4em] text-center font-medium text-brand">Yes, call me</span>
            <span className="flex-1 rounded-[0.6em] bg-white py-[0.4em] text-center font-medium text-brand">Not now</span>
          </div>
        </div>
        <p className="mt-[0.8em] flex items-center gap-[0.4em] text-[0.64em] text-[#6b7079]">
          <Eye className="size-[1.1em]" /> Read 81% · <Clock className="size-[1.1em]" /> Sent 10:00
        </p>
      </div>
    </div>
  );
}

const nodeIcon = { trigger: Zap, action: ArrowRight, wait: Hourglass, branch: GitBranch };
const nodeTone = { trigger: "bg-brand text-white", action: "bg-white ring-1 ring-line", wait: "bg-[#fdf3d4]", branch: "bg-[#ece6fc]" };

/** Automations: a no-code workflow from new lead to follow-up. */
export function AutomationsScreen() {
  return (
    <div className="flex h-full gap-[1.1em] p-[1.3em]">
      <div className="min-w-0 flex-1">
        <Title
          title="New lead: reply and follow up"
          sub="Automation · On · ran 148 times this month"
          right={<span className={`${pill} bg-[#ddf3e6] font-medium text-[#1f8a55]`}>Active</span>}
        />
        <div className="flex flex-col items-center gap-0 rounded-[0.9em] bg-[radial-gradient(#e3e7ed_0.08em,transparent_0.1em)] bg-[length:1.2em_1.2em] py-[0.8em]">
          {workflow.map((n, i) => {
            const Icon = nodeIcon[n.kind];
            return (
              <div key={n.title} className="flex flex-col items-center">
                {i > 0 && <span className="h-[1em] w-px bg-[#c9ccd2]" />}
                <div className={`crm-card flex w-[22em] items-center gap-[0.7em] rounded-[0.8em] px-[0.9em] py-[0.6em] shadow-[0_0.1em_0.3em_rgba(5,7,12,0.06)] ${nodeTone[n.kind]}`}>
                  <span className={`grid size-[2em] place-items-center rounded-[0.6em] ${n.kind === "trigger" ? "bg-white/20" : "bg-[#f2f5f8]"}`}>
                    <Icon className="size-[1.1em]" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.78em] font-semibold">{n.title}</span>
                    <span className={`block text-[0.64em] ${n.kind === "trigger" ? "text-white/85" : "text-[#6b7079]"}`}>{n.meta}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[14em] shrink-0">
        <p className="text-[0.76em] font-semibold">Ready-made automations</p>
        <ul className="mt-[0.6em] flex flex-col gap-[0.5em]">
          {["Missed call: send WhatsApp", "Proposal not opened in 2 days", "Birthday wishes to customers", "Payment reminder"].map((t) => (
            <li key={t} className="flex items-center gap-[0.5em] rounded-[0.7em] bg-white p-[0.6em] text-[0.68em] ring-1 ring-line">
              <Zap className="size-[1.1em] text-brand" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
