import { BarChart3, Check, Clock, FileQuestion, Mail, MessageCircle, Phone, StickyNote, Zap } from "lucide-react";
import { ChannelChip } from "@/components/crm/screens";

/*
 * Small before/after pictures for the "What changes" section of /nirman-crm/
 * (docs/sections/p2-crm-page.md). "After" pictures are pieces of the real
 * Nirman CRM UI; "before" pictures show the mess it replaces. Decorative:
 * the text beside them carries the meaning, so they are aria-hidden.
 */

const card = "rounded-xl bg-white shadow-[0_0.4rem_1rem_-0.5rem_rgba(18,20,24,0.25)] ring-1 ring-line";

/* ---------- After (Nirman CRM) ---------- */

export function AfterInbox() {
  const rows = [
    { i: "RS", n: "Riya Sharma", p: "Can you share a quote?", c: "whatsapp" as const, t: "bg-[#fbe9df] text-brand" },
    { i: "JD", n: "James Dunn", p: "Following up on the proposal", c: "email" as const, t: "bg-[#ece6fc] text-[#6b4fd8]" },
    { i: "AK", n: "Arjun Kapoor", p: "Need an app for orders", c: "form" as const, t: "bg-[#fde2e7] text-[#b4234a]" },
  ];
  return (
    <div aria-hidden className={`${card} w-full max-w-[19rem] p-2 text-[13px]`}>
      {rows.map((r, k) => (
        <div key={r.n} className={`flex items-center gap-2.5 rounded-lg p-2 ${k === 0 ? "bg-[#fdf1ea]" : ""}`}>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${r.t}`}>{r.i}</span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-semibold">{r.n}</span>
            <span className="block truncate text-[11px] text-muted">{r.p}</span>
          </span>
          <span className="text-[13px]"><ChannelChip channel={r.c} label={false} /></span>
        </div>
      ))}
    </div>
  );
}

export function AfterReply() {
  return (
    <div aria-hidden className="flex w-full max-w-[19rem] flex-col gap-2 text-[12.5px]">
      <p className={`${card} max-w-[85%] rounded-bl-sm px-3 py-2`}>Hi, can you share a quote for a new website?</p>
      <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-brand px-3 py-2 text-white shadow-[0_0.4rem_1rem_-0.5rem_rgba(194,65,12,0.5)]">
        Thanks Riya! We have your message. Priya will call you in a few minutes.
      </p>
      <p className="ml-auto flex items-center gap-1 text-[11px] font-medium text-[#1f8a55]">
        <Zap className="size-3.5" /> Auto-reply sent in 4 seconds
      </p>
    </div>
  );
}

export function AfterFollowup() {
  return (
    <div aria-hidden className="flex w-full max-w-[19rem] flex-col gap-2 text-[12.5px]">
      <div className={`${card} flex items-center gap-2.5 p-3`}>
        <span className="grid size-5 place-items-center rounded-md bg-brand text-white"><Check className="size-3.5" strokeWidth={3} /></span>
        <span className="flex-1 leading-tight"><b className="block font-semibold">Call Riya about the website</b><span className="text-[11px] text-muted">Today · 4:00 pm</span></span>
      </div>
      <div className="rounded-xl bg-[#fff6ec] p-3 ring-1 ring-[#f6d3bf]">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand"><Clock className="size-3.5" /> Sara has not replied in 2 days</p>
        <p className="mt-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[12px]">“Hi Sara, did you get a chance to look at the proposal?”</p>
      </div>
    </div>
  );
}

export function AfterReport() {
  const bars = [40, 55, 48, 70, 62, 88];
  return (
    <div aria-hidden className={`${card} w-full max-w-[19rem] p-3.5 text-[12px]`}>
      <p className="flex items-center justify-between font-semibold">Leads by source <span className="text-[11px] font-normal text-muted">This month</span></p>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((b, i) => (
          <span key={i} className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-brand" : "bg-[#f6d3bf]"}`} style={{ height: `${b}%` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
        {[["WhatsApp", "42%"], ["Website", "31%"], ["Email", "18%"], ["Calls", "9%"]].map(([k, v]) => (
          <span key={k} className="flex justify-between"><span className="text-muted">{k}</span><b className="font-semibold">{v}</b></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Before (the mess) ---------- */

export function BeforeInbox() {
  const n = [
    { I: MessageCircle, t: "WhatsApp · 14 unread", r: "-rotate-3", x: "ml-0" },
    { I: Mail, t: "Inbox · 37 unread", r: "rotate-2", x: "ml-6" },
    { I: Phone, t: "3 missed calls", r: "-rotate-1", x: "ml-2" },
  ];
  return (
    <div aria-hidden className="flex w-full max-w-[16rem] flex-col gap-1.5 text-[12px]">
      {n.map(({ I, t, r, x }) => (
        <span key={t} className={`flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-muted ring-1 ring-line ${r} ${x}`}>
          <I className="size-4" /> {t}
        </span>
      ))}
    </div>
  );
}

export function BeforeReply() {
  return (
    <div aria-hidden className="flex w-full max-w-[16rem] flex-col gap-1.5 text-[12px]">
      <p className="max-w-[90%] rounded-xl bg-white/70 px-3 py-2 text-muted ring-1 ring-line">Hi, can you share a quote?</p>
      <p className="text-[11px] text-muted">Seen · no reply for 3 hours</p>
    </div>
  );
}

export function BeforeFollowup() {
  return (
    <div aria-hidden className="w-full max-w-[16rem] -rotate-2 rounded-md bg-[#fdf3b8] p-3 text-[12px] text-[#6b5a10] shadow-sm">
      <p className="flex items-center gap-1.5 font-semibold"><StickyNote className="size-3.5" /> To do</p>
      <p className="mt-1">call sara back??</p>
      <p className="line-through opacity-60">send quote to riya</p>
    </div>
  );
}

export function BeforeReport() {
  return (
    <div aria-hidden className="flex w-full max-w-[16rem] items-center gap-2 rounded-lg bg-white/70 px-3 py-3 text-[12px] text-muted ring-1 ring-line">
      <FileQuestion className="size-5" /> leads_final_v3.xlsx
      <BarChart3 className="ml-auto size-4 opacity-40" />
    </div>
  );
}

export const afterVisuals = [AfterInbox, AfterReply, AfterFollowup, AfterReport];
export const beforeVisuals = [BeforeInbox, BeforeReply, BeforeFollowup, BeforeReport];
