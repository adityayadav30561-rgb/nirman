import { Check, CircleCheck, Clock, Globe, Mail, MessageCircle, Paperclip, Phone, Send, Zap } from "lucide-react";
import { channelLabel, dashboard, followups, inbox, pipeline, thread, type Channel } from "@/content/crm-screens";

/*
 * Nirman CRM screens for AppFrame (all sizes in em; sample data from
 * content/crm-screens.ts). Generic channel icons only: no WhatsApp,
 * Instagram or Facebook logos (client rule).
 */

const chIcon: Record<Channel, typeof Mail> = { whatsapp: MessageCircle, email: Mail, form: Globe, call: Phone };
const chTone: Record<Channel, string> = {
  whatsapp: "bg-[#ddf3e6] text-[#1f8a55]",
  email: "bg-[#ece6fc] text-[#6b4fd8]",
  form: "bg-[#fbe9df] text-brand",
  call: "bg-[#fde2e7] text-[#b4234a]",
};

export function ChannelChip({ channel, label = true }: { channel: Channel; label?: boolean }) {
  const Icon = chIcon[channel];
  return (
    <span className={`inline-flex items-center gap-[0.3em] rounded-full px-[0.55em] py-[0.15em] text-[0.7em] font-medium whitespace-nowrap ${chTone[channel]}`}>
      <Icon className="size-[1.1em]" strokeWidth={2.2} />
      {label && channelLabel[channel]}
    </span>
  );
}

function Title({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-[1em]">
      <p className="text-[1.25em] font-semibold tracking-[-0.02em]">{title}</p>
      <p className="text-[0.75em] text-[#6b7079]">{sub}</p>
    </div>
  );
}

/** Inbox: WhatsApp, email, website forms and calls in one list, with the open conversation. */
export function InboxScreen() {
  const open = inbox[0];
  return (
    <div className="flex h-full">
      <div className="w-[21em] shrink-0 border-r border-line p-[1em]">
        <div className="mb-[0.8em] flex gap-[0.4em] text-[0.72em]">
          {["All", "WhatsApp", "Email", "Forms"].map((t, i) => (
            <span key={t} className={`rounded-full px-[0.8em] py-[0.25em] ${i === 0 ? "bg-ink-2 text-white" : "bg-[#f2f5f8] text-ink/70"}`}>
              {t}
            </span>
          ))}
        </div>
        <ul className="flex flex-col gap-[0.25em]">
          {inbox.map((c, i) => (
            <li key={c.name} className={`crm-row flex gap-[0.7em] rounded-[0.8em] p-[0.65em] ${i === 0 ? "bg-[#fdf1ea] ring-1 ring-brand/20" : ""}`}>
              <span className={`grid size-[2.4em] shrink-0 place-items-center rounded-full text-[0.75em] font-semibold ${c.tone}`}>{c.initials}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-[0.4em]">
                  <span className="truncate text-[0.8em] font-semibold">{c.name}</span>
                  <span className="ml-auto text-[0.65em] text-[#6b7079]">{c.time}</span>
                </span>
                <span className="block truncate text-[0.72em] text-ink/70">{c.preview}</span>
                <span className="mt-[0.3em] flex items-center gap-[0.4em]">
                  <ChannelChip channel={c.channel} />
                  {c.unread && <span className="ml-auto size-[0.5em] rounded-full bg-brand" />}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-[0.7em] border-b border-line px-[1.3em] py-[0.8em]">
          <span className={`grid size-[2.4em] place-items-center rounded-full text-[0.8em] font-semibold ${open.tone}`}>{open.initials}</span>
          <span className="leading-tight">
            <span className="block text-[0.88em] font-semibold">{open.name}</span>
            <span className="block text-[0.7em] text-[#6b7079]">{open.business} · Clinic website</span>
          </span>
          <span className="ml-auto flex gap-[0.4em] text-[0.7em]">
            <span className="rounded-full bg-[#ddf3e6] px-[0.8em] py-[0.25em] font-medium text-[#1f8a55]">New enquiry</span>
            <span className="rounded-full bg-[#f2f5f8] px-[0.8em] py-[0.25em] text-ink/70">Owner: Priya</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[0.7em] bg-[#f7f9fb] p-[1.3em]">
          {thread.map((m) => (
            <div
              key={m.text}
              className={`crm-msg max-w-[70%] rounded-[1em] px-[1em] py-[0.7em] text-[0.8em] leading-snug ${
                m.from === "lead" ? "rounded-bl-[0.3em] bg-white ring-1 ring-line" : m.from === "auto" ? "ml-auto rounded-br-[0.3em] bg-[#fdf1ea]" : "ml-auto rounded-br-[0.3em] bg-brand text-white"
              }`}
            >
              {m.text}
              <span className={`mt-[0.3em] flex items-center gap-[0.35em] text-[0.8em] ${m.from === "team" ? "text-white/80" : "text-[#6b7079]"}`}>
                {m.from === "auto" && <Zap className="size-[1.1em] text-brand" />}
                {m.from === "auto" ? "Auto-reply · " : m.from === "team" ? "Replied in 2 min · " : ""}
                {m.time}
              </span>
            </div>
          ))}
          <div className="crm-msg mt-auto flex items-center gap-[0.6em] rounded-full bg-white px-[1em] py-[0.55em] text-[0.75em] text-[#6b7079] ring-1 ring-line">
            <Paperclip className="size-[1.2em]" />
            Reply on WhatsApp…
            <span className="ml-auto grid size-[2em] place-items-center rounded-full bg-brand text-white">
              <Send className="size-[1em]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Pipeline: deals by stage. */
export function PipelineScreen() {
  return (
    <div className="h-full p-[1.3em]">
      <div className="flex items-end">
        <Title title="Sales pipeline" sub="Every enquiry, by stage" />
        <span className="mb-[1em] ml-auto flex gap-[0.4em] text-[0.72em]">
          <span className="rounded-full bg-[#f2f5f8] px-[0.8em] py-[0.25em] text-ink/70">This month</span>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-[0.8em]">
        {pipeline.map((s) => (
          <div key={s.name} className="crm-col rounded-[0.9em] bg-[#f4f6f9] p-[0.6em]">
            <p className="mb-[0.6em] flex items-center gap-[0.45em] px-[0.2em] text-[0.75em] font-semibold">
              <span className={`size-[0.6em] rounded-full ${s.tone}`} />
              {s.name}
              <span className="ml-auto font-normal text-[#6b7079]">{s.cards.length}</span>
            </p>
            <div className="flex flex-col gap-[0.5em]">
              {s.cards.map((c) => (
                <div key={c.title} className="crm-card rounded-[0.7em] bg-white p-[0.7em] shadow-[0_0.1em_0.3em_rgba(5,7,12,0.06)] ring-1 ring-line">
                  <p className="text-[0.78em] font-semibold">{c.title}</p>
                  <p className="text-[0.68em] text-[#6b7079]">{c.who}</p>
                  <div className="mt-[0.5em] flex items-center gap-[0.4em]">
                    <span className="text-[0.75em] font-semibold">{c.value}</span>
                    <span className="ml-auto">
                      <ChannelChip channel={c.tag} label={false} />
                    </span>
                  </div>
                  {c.due && (
                    <p className="mt-[0.5em] flex items-center gap-[0.3em] border-t border-line pt-[0.45em] text-[0.66em] text-accent">
                      <Clock className="size-[1.1em]" />
                      {c.due}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Follow-ups: today's reminders across channels. */
export function FollowupsScreen() {
  return (
    <div className="flex h-full gap-[1.2em] p-[1.3em]">
      <div className="min-w-0 flex-1">
        <Title title="My follow-ups" sub="Today · 1 of 4 done" />
        <ul className="flex flex-col gap-[0.5em]">
          {followups.map((f) => (
            <li key={f.text} className="crm-row flex items-center gap-[0.8em] rounded-[0.8em] bg-white p-[0.8em] ring-1 ring-line">
              <span className={`grid size-[1.4em] place-items-center rounded-[0.4em] ${f.done ? "bg-brand text-white" : "ring-1 ring-ink/25"}`}>
                {f.done && <Check className="size-[1em]" strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-[0.82em] font-medium ${f.done ? "text-[#6b7079] line-through" : ""}`}>{f.text}</span>
                <span className="block text-[0.68em] text-[#6b7079]">{f.meta}</span>
              </span>
              <ChannelChip channel={f.channel} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[15em] shrink-0 rounded-[0.9em] bg-[#fff6ec] p-[1em]">
        <p className="flex items-center gap-[0.4em] text-[0.78em] font-semibold text-accent">
          <Zap className="size-[1.1em]" />
          Automatic reminders
        </p>
        <p className="mt-[0.5em] text-[0.72em] leading-snug text-ink/75">Sara has not replied in 2 days. Nirman CRM will remind Priya at 5:30 pm and suggest a WhatsApp check-in.</p>
        <div className="mt-[0.9em] rounded-[0.7em] bg-white p-[0.7em] ring-1 ring-line">
          <p className="text-[0.68em] text-[#6b7079]">Suggested message</p>
          <p className="mt-[0.2em] text-[0.72em] leading-snug">Hi Sara, did you get a chance to look at the proposal?</p>
        </div>
      </div>
    </div>
  );
}

/** Dashboard: this week at a glance. */
export function DashboardScreen() {
  const max = Math.max(...dashboard.bars);
  return (
    <div className="h-full p-[1.3em]">
      <Title title="Good morning, Priya" sub="This week at a glance" />
      <div className="grid grid-cols-3 gap-[0.8em]">
        {dashboard.kpis.map((k, i) => (
          <div key={k.label} className={`crm-card rounded-[0.9em] p-[0.9em] ${["bg-[#fdf1ea]", "bg-[#eaf6ef]", "bg-[#fff1e8]"][i]}`}>
            <p className="text-[0.7em] text-ink/70">{k.label}</p>
            <p className="mt-[0.2em] text-[1.6em] font-semibold tracking-[-0.03em]">{k.value}</p>
            <p className="text-[0.66em] text-[#6b7079]">{k.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-[0.8em] grid grid-cols-[1.6fr_1fr] gap-[0.8em]">
        <div className="crm-card rounded-[0.9em] p-[0.9em] ring-1 ring-line">
          <p className="text-[0.78em] font-semibold">Leads per week</p>
          <div className="mt-[0.8em] flex h-[8em] items-end gap-[0.6em]">
            {dashboard.bars.map((b, i) => (
              <span key={i} className={`crm-bar flex-1 origin-bottom rounded-t-[0.4em] ${i === dashboard.bars.length - 1 ? "bg-brand" : "bg-[#f6d3bf]"}`} style={{ height: `${(b / max) * 100}%` }} />
            ))}
          </div>
        </div>
        <div className="crm-card rounded-[0.9em] p-[0.9em] ring-1 ring-line">
          <p className="text-[0.78em] font-semibold">Where leads come from</p>
          <ul className="mt-[0.7em] flex flex-col gap-[0.55em]">
            {dashboard.sources.map((s) => (
              <li key={s.label} className="text-[0.7em]">
                <span className="flex justify-between">
                  <span>{s.label}</span>
                  <span className="text-[#6b7079]">{s.pct}%</span>
                </span>
                <span className="mt-[0.25em] block h-[0.45em] rounded-full bg-[#f2f5f8]">
                  <span className={`crm-fill block h-full origin-left rounded-full ${s.tone}`} style={{ width: `${s.pct}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Phone: the inbox conversation as the mobile app shows it (for small screens and composites). */
export function PhoneInbox({ className = "" }: { className?: string }) {
  const c = inbox[0];
  return (
    <div className={`@container ${className}`}>
      <div aria-hidden className="relative aspect-[9/19] w-full overflow-hidden rounded-[13cqw] bg-ink-2 p-[2.6cqw] shadow-[0_2em_4em_-1em_rgba(18,20,24,0.35)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[10.5cqw] bg-[#f7f9fb] text-[4.4cqw] text-ink">
          <div className="flex items-center justify-between px-[1.4em] pt-[0.9em] text-[0.7em] font-semibold">
            <span>9:41</span>
            <span className="h-[0.6em] w-[1.4em] rounded-[0.2em] border border-ink/60" />
          </div>
          <div className="flex items-center gap-[0.6em] border-b border-line bg-white px-[1em] py-[0.8em]">
            <span className={`grid size-[2.2em] place-items-center rounded-full text-[0.8em] font-semibold ${c.tone}`}>{c.initials}</span>
            <span className="leading-tight">
              <span className="block text-[0.85em] font-semibold">{c.name}</span>
              <span className="block text-[0.65em] text-[#6b7079]">{c.business}</span>
            </span>
            <span className="ml-auto">
              <ChannelChip channel="whatsapp" />
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[0.6em] p-[0.9em]">
            {thread.map((m) => (
              <div
                key={m.text}
                className={`crm-msg max-w-[85%] rounded-[1em] px-[0.9em] py-[0.6em] text-[0.75em] leading-snug ${
                  m.from === "lead" ? "bg-white ring-1 ring-line" : m.from === "auto" ? "ml-auto bg-[#fdf1ea]" : "ml-auto bg-brand text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div className="crm-msg mt-auto flex items-center gap-[0.5em] rounded-[0.9em] bg-[#eaf6ef] px-[0.9em] py-[0.6em] text-[0.68em] text-[#1f8a55]">
              <CircleCheck className="size-[1.2em]" />
              Follow-up set for 4:00 pm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
