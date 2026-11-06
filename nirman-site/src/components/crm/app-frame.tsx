import type { ReactNode } from "react";
import { Bell, CalendarClock, ChartNoAxesColumn, Columns3, Inbox, Plus, Search, Settings, Users } from "lucide-react";
import { LogoMark } from "@/components/logo";

/*
 * Nirman CRM desktop app window, built in HTML (docs/sections/05-crm.md).
 * Everything inside is sized in em and the base size follows the frame's
 * width (container query units), so the whole window scales like a
 * screenshot but stays sharp and selectable. This is the real Nirman CRM
 * design (user, 2026-11-06: the CRM will be updated to match it).
 */

export type CrmView = "inbox" | "leads" | "pipeline" | "followups" | "reports";

export const crmNav: { key: CrmView; label: string; Icon: typeof Inbox; badge?: string }[] = [
  { key: "inbox", label: "Inbox", Icon: Inbox, badge: "2" },
  { key: "leads", label: "Leads", Icon: Users },
  { key: "pipeline", label: "Pipeline", Icon: Columns3 },
  { key: "followups", label: "Follow-ups", Icon: CalendarClock, badge: "6" },
  { key: "reports", label: "Reports", Icon: ChartNoAxesColumn },
];

export function AppFrame({ active, children, className = "" }: { active: CrmView; children: ReactNode; className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div
        aria-hidden
        className="flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[1.1em] bg-surface text-[1.18cqw] text-ink shadow-[0_2.5em_5em_-1.5em_rgba(18,20,24,0.28),0_0_0_1px_rgba(5,7,12,0.06)]"
      >
        {/* window bar */}
        <div className="flex h-[2.4em] shrink-0 items-center gap-[0.45em] border-b border-line bg-[#f7f9fb] px-[1em]">
          <span className="size-[0.7em] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.7em] rounded-full bg-[#febc2e]" />
          <span className="size-[0.7em] rounded-full bg-[#28c840]" />
          <span className="mx-auto rounded-full bg-white px-[1.4em] py-[0.2em] text-[0.72em] text-[#6b7079] ring-1 ring-line">Nirman CRM</span>
        </div>
        <div className="flex min-h-0 flex-1">
          {/* sidebar */}
          <div className="flex w-[12.5em] shrink-0 flex-col border-r border-line bg-[#f7f9fb] p-[0.9em]">
            <div className="flex items-center gap-[0.55em] px-[0.4em] pb-[1em]">
              <LogoMark className="size-[1.7em]" />
              <span className="text-[0.95em] font-semibold tracking-[-0.02em]">Nirman CRM</span>
            </div>
            <nav className="flex flex-col gap-[0.2em]">
              {crmNav.map(({ key, label, Icon, badge }) => (
                <span
                  key={key}
                  className={`flex items-center gap-[0.6em] rounded-[0.6em] px-[0.7em] py-[0.55em] text-[0.82em] ${
                    key === active ? "bg-brand font-medium text-white" : "text-ink/70"
                  }`}
                >
                  <Icon className="size-[1.15em]" strokeWidth={2} />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className={`rounded-full px-[0.5em] text-[0.8em] font-semibold ${key === active ? "bg-white/25" : "bg-[#fde6d9] text-accent"}`}>{badge}</span>
                  )}
                </span>
              ))}
            </nav>
            <div className="mt-auto flex items-center gap-[0.6em] rounded-[0.6em] px-[0.7em] py-[0.55em] text-[0.82em] text-ink/70">
              <Settings className="size-[1.15em]" strokeWidth={2} />
              Settings
            </div>
            <div className="mt-[0.4em] flex items-center gap-[0.6em] border-t border-line px-[0.4em] pt-[0.8em]">
              <span className="grid size-[2em] place-items-center rounded-full bg-[#fbe9df] text-[0.75em] font-semibold text-brand">PN</span>
              <span className="leading-tight">
                <span className="block text-[0.78em] font-medium">Priya N.</span>
                <span className="block text-[0.68em] text-[#6b7079]">Sales</span>
              </span>
            </div>
          </div>
          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-[3.4em] shrink-0 items-center gap-[0.8em] border-b border-line px-[1.4em]">
              <span className="flex w-[18em] items-center gap-[0.5em] rounded-full bg-[#f2f5f8] px-[0.9em] py-[0.45em] text-[0.78em] whitespace-nowrap text-[#6b7079]">
                <Search className="size-[1.1em]" />
                Search leads, phone numbers
              </span>
              <span className="ml-auto flex items-center gap-[0.4em] rounded-full bg-ink-2 px-[1em] py-[0.45em] text-[0.78em] font-medium text-white">
                <Plus className="size-[1.1em]" />
                New lead
              </span>
              <Bell className="size-[1.2em] text-ink/60" />
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
