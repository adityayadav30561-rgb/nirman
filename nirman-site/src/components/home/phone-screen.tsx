import { Bell, CalendarClock, ChartNoAxesColumn, House, MessageCircle, Plus, Users } from "lucide-react";
import { Cloud } from "@/components/home/cloud";

/**
 * Nirman CRM mobile screen, built in HTML for the hero phone.
 * Illustrative product UI with sample data (labelled), not client results.
 */

const followUps = [
  { initials: "RS", name: "Website enquiry", meta: "Chat · 10:30", tone: "bg-[#e3eefc] text-brand" },
  { initials: "AK", name: "SEO audit request", meta: "Email · 11:05", tone: "bg-[#fdeadf] text-accent" },
  { initials: "MP", name: "App quote", meta: "Call back · 12:00", tone: "bg-[#e6f4ec] text-[#1f8a55]" },
];

const bars = [38, 62, 45, 80, 58, 92, 70];

export function PhoneScreen() {
  return (
    <div className="relative isolate flex h-full flex-col bg-[linear-gradient(180deg,#dcebfb_0%,#eef5fd_22%,#ffffff_42%)] text-ink">
      {/* the app's sky: two small clouds behind the heading */}
      <Cloud className="h-drift absolute -z-10 top-[3.4rem] right-[0.6rem] w-[3.4rem] opacity-90" data-dx={-6} data-t={9} />
      <Cloud className="h-drift absolute -z-10 top-[6.6rem] right-[3.6rem] w-[2.4rem] opacity-80" data-dx={5} data-t={11} />

      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[0.55rem] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="h-[0.45rem] w-3 rounded-[2px] border border-ink/70" />
        </span>
      </div>

      {/* top bar */}
      <div className="mt-3 flex items-center justify-between px-4">
        <span className="grid size-7 place-items-center rounded-full bg-white shadow-[0_2px_6px_rgb(5_7_12/0.08)]">
          <span className="flex flex-col gap-[3px]" aria-hidden>
            <span className="block h-[1.5px] w-3 rounded bg-ink" />
            <span className="block h-[1.5px] w-2 rounded bg-ink" />
          </span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1 shadow-[0_2px_6px_rgb(5_7_12/0.08)]">
          <span className="grid size-5 place-items-center rounded-full bg-ink text-[0.45rem] font-semibold text-white">N</span>
          <span className="text-[0.55rem] font-medium">Nirman CRM</span>
        </span>
      </div>

      <p className="mt-4 px-4 text-[1.05rem] leading-[1.25] font-semibold tracking-[-0.01em]">
        Every lead,
        <br />
        followed up.
      </p>

      {/* today */}
      <div className="mt-4 flex items-baseline justify-between px-4">
        <span className="text-[0.62rem] font-semibold">Today</span>
        <span className="text-[0.5rem] text-muted">See all</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 px-4">
        <div className="rounded-xl bg-brand p-2.5 text-white shadow-[0_8px_16px_-8px_rgb(2_93_222/0.6)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.5rem] opacity-80">New leads</span>
            <Users className="size-3 opacity-80" aria-hidden />
          </div>
          <div className="mt-1 text-[1.1rem] leading-none font-semibold">12</div>
          <div className="mt-2 flex h-6 items-end gap-[3px]" aria-hidden>
            {bars.map((h, i) => (
              <span key={i} className="flex-1 rounded-[2px] bg-white/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-[0_6px_16px_-8px_rgb(5_7_12/0.18)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.5rem] text-muted">Replied</span>
            <MessageCircle className="size-3 text-accent" aria-hidden />
          </div>
          <div className="mt-1 text-[1.1rem] leading-none font-semibold">9</div>
          <div className="mt-2 text-[0.48rem] leading-tight text-muted">
            Avg. first reply
            <span className="block text-[0.62rem] font-semibold text-ink">2 min</span>
          </div>
        </div>
      </div>

      {/* follow-ups */}
      <div className="mt-4 flex items-baseline justify-between px-4">
        <span className="text-[0.62rem] font-semibold">Follow-ups</span>
        <span className="flex items-center gap-1 text-[0.5rem] text-muted">
          <CalendarClock className="size-2.5" aria-hidden />3 due
        </span>
      </div>
      <ul className="mt-2 space-y-1.5 px-4">
        {followUps.map((f) => (
          <li key={f.initials} className="flex items-center gap-2 rounded-xl bg-white p-1.5 pr-2 shadow-[0_4px_12px_-8px_rgb(5_7_12/0.2)]">
            <span className={`grid size-6 shrink-0 place-items-center rounded-lg text-[0.45rem] font-semibold ${f.tone}`}>{f.initials}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.55rem] font-medium">{f.name}</span>
              <span className="block text-[0.45rem] text-muted">{f.meta}</span>
            </span>
            <span className="rounded-full bg-brand px-2 py-0.5 text-[0.45rem] font-medium text-white">Reply</span>
          </li>
        ))}
      </ul>

      <p className="mt-2 px-4 text-[0.42rem] tracking-wide text-muted uppercase">Sample data</p>

      {/* tab bar */}
      <div className="mt-auto flex items-center justify-around border-t border-line/70 bg-white px-3 pt-2 pb-4 text-muted" aria-hidden>
        <House className="size-3.5 text-brand" />
        <ChartNoAxesColumn className="size-3.5" />
        <span className="-mt-4 grid size-8 place-items-center rounded-full bg-accent text-white shadow-[0_6px_12px_-4px_rgb(242_107_43/0.7)]">
          <Plus className="size-4" />
        </span>
        <Bell className="size-3.5" />
        <Users className="size-3.5" />
      </div>
    </div>
  );
}
