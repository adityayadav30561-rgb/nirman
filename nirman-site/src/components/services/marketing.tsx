import { CheckCheck, Clock, Mail, MessageCircle, Send, Users } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { ServiceCard } from "./service-copy";
import { cardPillar } from "@/content/home";

// Decision C1: this card is WhatsApp & email marketing run from Nirman CRM.
// No ads, no social media, no platform logos (generic chat icons only).

const campaigns = [
  { name: "Monsoon broadcast", replies: 124, w: 100, c: "bg-[#d9668f]" },
  { name: "Monsoon email", replies: 46, w: 37, c: "bg-marigold" },
  { name: "Enquiry drip", replies: 31, w: 25, c: "bg-forest-2" },
  { name: "Cart reminder", replies: 13, w: 11, c: "bg-peacock" },
];

export function MarketingService() {
  return (
    <ServiceCard
      id="svc-marketing"
      pillar={cardPillar.marketing}
      tone="rose"
      icon={Send}
      name="WhatsApp & email marketing"
      title="Messages your customers open, sent from your own CRM."
      body="We plan and run WhatsApp and email campaigns from Nirman CRM: broadcasts to opted-in customers, drip sequences after every enquiry and automatic follow-ups, with delivery, read and reply numbers for each one."
      points={["WhatsApp broadcasts to opted-in lists", "Email campaigns and newsletters", "Drip sequences and follow-ups", "Delivery, read and reply reports"]}
      visual={<MarketingVisual />}
    />
  );
}

/** The card's mockup, also the hero visual on marketing service pages (P4.2). */
export function MarketingVisual() {
  return (
    <Stage w={480} h={330} wLg={820} hLg={535} label="A ceramics brand's WhatsApp broadcast, follow-up sequence, audience and newsletter in Nirman CRM, with delivery, read and reply numbers by campaign">
      <Broadcast />
      <Sequence />
      <Audience />
      <EmailPreview />
      <Performance />
    </Stage>
  );
}

function Broadcast() {
  return (
    <div className="absolute left-0 top-0 w-250 overflow-hidden rounded-xl bg-[#efeae0] shadow-scene lg:w-300">
      <div className="flex items-center gap-8 bg-forest px-12 py-9 text-white">
        <span className="grid size-24 place-items-center rounded-full bg-mint fs-9 font-semibold text-forest">M</span>
        <span className="flex-1 leading-tight">
          <span className="block fs-10 font-semibold">Mitti Ceramics</span>
          <span className="block fs-8 text-white/70">Broadcast to 2,140 customers</span>
        </span>
      </div>
      <div className="p-10">
        <div className="overflow-hidden rounded-lg bg-surface shadow-[0_1px_2px_rgb(22_24_27/0.1)]">
          <div className="relative h-140 lg:h-170">
            <Photo name="bowlsPink" sizes="320px" decorative />
          </div>
          <p className="px-10 pt-8 fs-10 leading-snug">
            Hi Priya, the monsoon edit is here: 12 new glazes, hand-thrown in Khurja. Free delivery in Pune this week.
          </p>
          <p className="flex items-center justify-end gap-3 px-10 pb-6 pt-2 fs-8 text-ink-3">
            11:02
            <CheckCheck className="size-11 text-peacock" />
          </p>
          {["See the collection", "Stop updates"].map((b) => (
            <span key={b} className="block border-t border-ink/8 py-7 text-center fs-10 font-medium text-peacock">
              {b}
            </span>
          ))}
        </div>
        <div className="ml-auto mt-8 w-fit max-w-[80%] rounded-lg bg-mint-soft px-10 py-7 fs-10 leading-snug">
          Is the blue set back in stock?
          <span className="mt-2 block text-right fs-8 text-ink-3">11:14</span>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { icon: MessageCircle, when: "Right away", title: "WhatsApp: thanks + brochure" },
  { icon: Mail, when: "Day 2", title: "Email: how we work" },
  { icon: Clock, when: "Day 5, no reply", title: "WhatsApp: book a visit?" },
  { icon: Users, when: "Replied", title: "Assign to sales team" },
];

function Sequence() {
  return (
    <div className="absolute left-266 top-30 w-214 rounded-2xl bg-surface p-14 shadow-scene lg:left-320 lg:top-50 lg:w-210">
      <p className="mock-display fs-14">Follow-up sequence</p>
      <p className="mt-2 fs-9 text-ink-3">Starts when a new enquiry arrives</p>
      <ol className="relative mt-14 space-y-12 before:absolute before:bottom-12 before:left-[calc(var(--spacing)*11)] before:top-12 before:w-1 before:bg-ink/10">
        {steps.map(({ icon: Icon, when, title }, i) => (
          <li key={title} className="relative flex items-start gap-8">
            <span
              className={`grid size-22 shrink-0 place-items-center rounded-full ${i === steps.length - 1 ? "bg-forest text-mint" : "bg-[#f8dde6] text-[#b23f69]"}`}
            >
              <Icon className="size-11" />
            </span>
            <span className="leading-tight">
              <span className="block fs-8 text-ink-3">{when}</span>
              <span className="block fs-10 font-medium">{title}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-14 rounded-lg bg-paper px-8 py-6 fs-9 text-ink-2">
        <span className="font-semibold text-ink tnum">38</span> enquiries in this sequence
      </p>
    </div>
  );
}

function Audience() {
  return (
    <div className="absolute left-0 top-410 w-480 rounded-xl bg-surface p-14 shadow-scene lg:left-550 lg:top-0 lg:w-270">
      <div className="flex items-center justify-between">
        <p className="fs-9 text-ink-3">Audience</p>
        <p className="fs-9 text-ink-3">Send Thu, 11:00</p>
      </div>
      <p className="mt-2 fs-13 font-semibold">
        <span className="tnum">2,140</span> opted-in customers
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        {["Bought in 90 days", "Pune", "Not: unsubscribed"].map((s) => (
          <span key={s} className="rounded-full bg-paper px-7 py-3 fs-8 text-ink-2">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function EmailPreview() {
  return (
    <div className="absolute left-550 top-150 hidden w-270 overflow-hidden rounded-xl bg-surface shadow-scene lg:block">
      <div className="border-b border-ink/8 px-14 py-9">
        <p className="fs-9 text-ink-3">From Mitti Ceramics</p>
        <p className="fs-11 font-semibold">The monsoon edit is here</p>
      </div>
      <div className="relative h-120">
        <Photo name="cups" sizes="300px" decorative />
      </div>
      <div className="px-14 py-12">
        <p className="mock-display fs-15">Cups for slow mornings</p>
        <p className="mt-4 fs-10 text-ink-2">Hand-thrown in Khurja. 12 new glazes.</p>
        <span className="mt-10 inline-block rounded-full bg-ink px-12 py-5 fs-9 text-white">See the collection</span>
      </div>
    </div>
  );
}

function Performance() {
  return (
    <div className="absolute left-0 top-530 w-480 rounded-2xl bg-surface p-16 shadow-scene lg:top-460 lg:w-820 lg:p-20">
      <div className="flex items-center justify-between">
        <p className="mock-display fs-15">Campaign results</p>
        <p className="fs-10 text-ink-3">October, WhatsApp and email</p>
      </div>
      <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ["Sent", "2,140", "bg-paper"],
            ["Delivered", "97%", "bg-paper"],
            ["Read", "78%", "bg-[#f8dde6]"],
            ["Replies", "214", "bg-marigold-soft"],
          ].map(([k, v, c]) => (
            <div key={k} className={`rounded-lg p-10 ${c}`}>
              <p className="fs-9 text-ink-3">{k}</p>
              <p className="mock-display mt-2 fs-20 tnum">{v}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-8 border-ink/8 lg:border-l lg:pl-16">
          {campaigns.map((c) => (
            <li key={c.name} className="grid items-center gap-8 fs-10 [grid-template-columns:calc(var(--spacing)*96)_1fr_calc(var(--spacing)*36)]">
              <span className="text-ink-2">{c.name}</span>
              <span className="h-10 rounded-full bg-paper">
                <span className={`block h-full rounded-full ${c.c}`} style={{ width: `${c.w}%` }} />
              </span>
              <span className="text-right font-semibold tnum">{c.replies}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
