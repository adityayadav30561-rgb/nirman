import { Bell, CalendarClock, House, Inbox, Plus, Search, Users } from "lucide-react";
import { LogoMark } from "@/components/logo";

/**
 * Nirman CRM mobile screen, built in HTML for the hero phone.
 * The real Nirman CRM design (user, 2026-11-06), with demo data.
 * Redone 2026-11-10 (user: "it should feel a real screen"): a neutral app
 * surface like the CRM screens in components/crm/, no tinted wash, no
 * slogan and no clouds inside the screen. The lower fifth of the phone
 * fades out in the hero, so the list simply runs on behind the tab bar.
 */

const stats = [
  { label: "New", value: "12", note: "+4 today", tone: "text-brand" },
  { label: "Replied", value: "9", note: "of 12", tone: "text-[#1f8a55]" },
  { label: "Due", value: "3", note: "follow-ups", tone: "text-ink" },
];

const bars = [38, 62, 45, 80, 58, 92, 70];

const pill = {
  New: "bg-[#fbe9df] text-brand",
  Replied: "bg-[#e6f4ec] text-[#1f8a55]",
  Due: "bg-[#fff3d6] text-[#8a5a00]",
} as const;

const leads: { initials: string; name: string; line: string; time: string; state: keyof typeof pill; tone: string; unread?: boolean }[] = [
  { initials: "RS", name: "Riya Sharma", line: "Hi, I need a new website for my clinic", time: "10:42", state: "New", tone: "bg-[#fbe9df] text-brand", unread: true },
  { initials: "AM", name: "Arjun Mehta", line: "Can you send the SEO audit today?", time: "10:30", state: "New", tone: "bg-[#e8eefc] text-[#3152b8]", unread: true },
  { initials: "SK", name: "Sana Khan", line: "You: Sharing the proposal by 4 pm", time: "10:05", state: "Replied", tone: "bg-[#e6f4ec] text-[#1f8a55]" },
  { initials: "DP", name: "Dev Patel", line: "Call back about the app quote", time: "12:00", state: "Due", tone: "bg-[#fff3d6] text-[#8a5a00]" },
  { initials: "MI", name: "Meera Iyer", line: "You: Thanks, the demo is booked", time: "09:48", state: "Replied", tone: "bg-[#f1e9fb] text-[#6b3fb0]" },
  { initials: "KR", name: "Kabir Rao", line: "Website form · Online store", time: "09:15", state: "New", tone: "bg-[#fbe9df] text-brand" },
  { initials: "NJ", name: "Neha Joshi", line: "Follow up on the invoice", time: "Yesterday", state: "Due", tone: "bg-[#e8eefc] text-[#3152b8]" },
];

const chips = [["All", "24"], ["New", "12"], ["Due today", "3"]];

export function PhoneScreen() {
  return (
    <div className="relative isolate flex h-full flex-col bg-[#f4f6f9] text-ink">
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-[0.7rem] text-[0.58rem] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-[0.3rem]" aria-hidden>
          <span className="flex items-end gap-[1.5px]">
            {[3, 5, 7, 9].map((h) => <span key={h} className="w-[2px] rounded-[1px] bg-ink" style={{ height: h }} />)}
          </span>
          <span className="relative h-[0.5rem] w-[0.95rem] rounded-[2.5px] border border-ink/70">
            <span className="absolute inset-[1px] right-[3px] rounded-[1px] bg-ink" />
          </span>
        </span>
      </div>

      {/* app bar */}
      <div className="mt-[0.9rem] flex items-center gap-2 px-4">
        <LogoMark className="size-[1.55rem]" />
        <span className="leading-tight">
          <span className="block text-[0.5rem] text-muted">Tue, 10 Nov</span>
          <span className="block text-[0.8rem] font-semibold tracking-[-0.01em]">Today</span>
        </span>
        <span className="ml-auto grid size-[1.6rem] place-items-center rounded-full bg-white ring-1 ring-line">
          <Search className="size-[0.72rem]" aria-hidden />
        </span>
        <span className="relative grid size-[1.6rem] place-items-center rounded-full bg-white ring-1 ring-line">
          <Bell className="size-[0.72rem]" aria-hidden />
          <span className="absolute top-[0.28rem] right-[0.32rem] size-[0.32rem] rounded-full bg-brand ring-1 ring-white" />
        </span>
      </div>

      {/* today's numbers */}
      <div className="mt-3 grid grid-cols-3 gap-1.5 px-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[0.7rem] bg-white px-2 py-[0.45rem] ring-1 ring-line">
            <span className="block text-[0.46rem] text-muted">{s.label}</span>
            <span className={`mt-0.5 block text-[1rem] leading-none font-semibold ${s.tone}`}>{s.value}</span>
            <span className="mt-1 block text-[0.42rem] text-muted">{s.note}</span>
          </div>
        ))}
      </div>

      {/* reply time */}
      <div className="mx-4 mt-1.5 flex items-center gap-3 rounded-[0.7rem] bg-white px-2.5 py-2 ring-1 ring-line">
        <span>
          <span className="block text-[0.46rem] text-muted">Avg. first reply</span>
          <span className="block text-[0.82rem] leading-tight font-semibold">2 min</span>
        </span>
        <span className="ml-auto flex h-[1.5rem] w-[4.6rem] items-end gap-[3px]" aria-hidden>
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-[2px] ${i === bars.length - 2 ? "bg-brand" : "bg-ink/12"}`} style={{ height: `${h}%` }} />
          ))}
        </span>
      </div>

      {/* filter chips */}
      <div className="mt-3 flex items-center gap-1 px-4">
        {chips.map(([label, n], i) => (
          <span key={label} className={`flex items-center gap-1 rounded-full px-2 py-[0.22rem] text-[0.48rem] font-medium ${i === 0 ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}>
            {label}
            <span className={i === 0 ? "text-white/60" : "text-muted"}>{n}</span>
          </span>
        ))}
      </div>

      {/* leads */}
      <ul className="mx-4 mt-2 divide-y divide-line overflow-hidden rounded-[0.8rem] bg-white ring-1 ring-line">
        {leads.map((l) => (
          <li key={l.initials} className="flex items-center gap-2 px-2 py-[0.45rem]">
            <span className={`grid size-[1.55rem] shrink-0 place-items-center rounded-full text-[0.46rem] font-semibold ${l.tone}`}>{l.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 text-[0.58rem] font-semibold">
                {l.name}
                {l.unread && <span className="size-[0.28rem] rounded-full bg-brand" />}
              </span>
              <span className="block truncate text-[0.47rem] text-muted">{l.line}</span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-[0.2rem]">
              <span className="text-[0.42rem] text-muted">{l.time}</span>
              <span className={`rounded-full px-1.5 py-[0.08rem] text-[0.42rem] font-medium ${pill[l.state]}`}>{l.state}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* tab bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-start justify-around border-t border-line bg-white/95 px-2 pt-1.5 pb-4 text-[0.4rem] text-muted" aria-hidden>
        {[[House, "Home", true], [Inbox, "Inbox", false]].map(([Icon, label, on]) => {
          const I = Icon as typeof House;
          return <span key={label as string} className={`flex flex-col items-center gap-0.5 ${on ? "font-semibold text-ink" : ""}`}><I className="size-3.5" />{label as string}</span>;
        })}
        <span className="-mt-3.5 grid size-8 place-items-center rounded-full bg-ink text-white shadow-[0_6px_12px_-4px_rgb(5_7_12/0.5)]">
          <Plus className="size-4" />
        </span>
        <span className="flex flex-col items-center gap-0.5"><CalendarClock className="size-3.5" />Follow-ups</span>
        <span className="flex flex-col items-center gap-0.5"><Users className="size-3.5" />Leads</span>
      </div>
    </div>
  );
}
