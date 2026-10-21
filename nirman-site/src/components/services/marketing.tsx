import { Bookmark, Heart, Megaphone, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { ServiceCard } from "./service-copy";

const channels = [
  { name: "Meta ads", leads: 284, w: 100, c: "bg-[#d9668f]" },
  { name: "Google Search", leads: 198, w: 70, c: "bg-cobalt" },
  { name: "Email", leads: 96, w: 34, c: "bg-marigold" },
  { name: "Organic social", leads: 64, w: 23, c: "bg-peacock" },
];

export function MarketingService() {
  return (
    <ServiceCard
      id="svc-marketing"
      tone="rose"
      icon={Megaphone}
      name="Digital marketing"
      title="Campaigns built around one number: qualified leads."
      body="Creative, copy and media planned together across search, social and email, with every rupee traced back to enquiries in your CRM rather than likes and impressions."
      points={["Paid search and social ads", "Campaign creative and copy", "Email and WhatsApp campaigns", "Landing pages and tracking"]}
      visual={
        <Stage w={480} h={330} wLg={820} hLg={535} label="Campaign creatives for a cold brew brand and a skincare brand across Instagram, stories, search and email, with performance by channel">
          <InstagramPost />
          <StoryAd />
          <SearchAd />
          <EmailPreview />
          <Performance />
        </Stage>
      }
    />
  );
}

function InstagramPost() {
  return (
    <div className="absolute left-0 top-0 w-250 overflow-hidden rounded-xl bg-surface shadow-scene lg:w-300">
      <div className="flex items-center gap-8 px-12 py-9">
        <span className="grid size-24 place-items-center rounded-full bg-coral fs-9 font-semibold text-white">K</span>
        <span className="flex-1 leading-tight">
          <span className="block fs-10 font-semibold">kaapi.co</span>
          <span className="block fs-8 text-ink-3">Sponsored</span>
        </span>
        <MoreHorizontal className="size-14 text-ink-3" />
      </div>
      <div className="relative h-230 lg:h-280">
        <Photo name="coldBrew" sizes="320px" decorative />
        <span className="mock-display absolute left-12 top-12 rounded-full bg-ink px-10 py-5 fs-11 text-marigold">New: 250 ml</span>
      </div>
      <div className="flex items-center justify-between bg-coral px-12 py-8 fs-10 font-medium text-white">
        Order now
        <span className="fs-9 font-normal text-white/80">kaapi.co/shop</span>
      </div>
      <div className="px-12 pb-12 pt-8">
        <div className="flex items-center gap-10">
          <Heart className="size-15 fill-[#d9668f] text-[#d9668f]" />
          <MessageCircle className="size-15" />
          <Send className="size-15" />
          <Bookmark className="ml-auto size-15" />
        </div>
        <p className="mt-6 fs-10 leading-snug">
          <span className="font-semibold">kaapi.co</span> Steeped for 18 hours, bottled the same morning. Free delivery across Pune this week.
        </p>
      </div>
    </div>
  );
}

function StoryAd() {
  return (
    <div className="absolute left-266 top-30 h-370 w-214 overflow-hidden rounded-2xl bg-ink shadow-scene lg:left-320 lg:top-50 lg:h-390 lg:w-210">
      <Photo name="serum" sizes="240px" decorative />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div className="absolute inset-x-10 top-10 flex gap-3">
        <span className="h-2 flex-1 rounded-full bg-white/90" />
        <span className="h-2 flex-1 rounded-full bg-white/35" />
        <span className="h-2 flex-1 rounded-full bg-white/35" />
      </div>
      <div className="absolute inset-x-14 bottom-16 text-white">
        <p className="mock-display fs-22">
          Glow that
          <br />
          lasts all day.
        </p>
        <p className="mt-6 fs-9 text-white/80">Vitamin C serum, from ₹649</p>
        <span className="mt-12 block rounded-full bg-white py-8 text-center fs-10 font-semibold text-ink">Shop now</span>
      </div>
    </div>
  );
}

function SearchAd() {
  return (
    <div className="absolute left-0 top-410 w-480 rounded-xl bg-surface p-14 shadow-scene lg:left-550 lg:top-0 lg:w-270">
      <p className="fs-9">
        <span className="font-semibold">Sponsored</span>
      </p>
      <p className="fs-9 text-ink-2">kaapi.co › cold-brew</p>
      <p className="mt-4 fs-13 leading-snug text-cobalt">Cold Brew Coffee in Pune, Delivered Before Noon</p>
      <p className="mt-4 fs-10 leading-[1.5] text-ink-2">Small-batch cold brew, steeped 18 hours. Subscribe and save 15%.</p>
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
        <Photo name="bowlsPink" sizes="300px" decorative />
      </div>
      <div className="px-14 py-12">
        <p className="mock-display fs-15">Bowls for slow mornings</p>
        <p className="mt-4 fs-10 text-ink-2">Hand-thrown in Khurja. 12 new glazes.</p>
        <span className="mt-10 inline-block rounded-full bg-ink px-12 py-5 fs-9 text-white">Shop bowls</span>
      </div>
    </div>
  );
}

function Performance() {
  return (
    <div className="absolute left-0 top-530 w-480 rounded-2xl bg-surface p-16 shadow-scene lg:top-460 lg:w-820 lg:p-20">
      <div className="flex items-center justify-between">
        <p className="mock-display fs-15">Campaign performance</p>
        <p className="fs-10 text-ink-3">October, all channels</p>
      </div>
      <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ["Spend", "₹1.8L", "bg-paper"],
            ["Leads", "642", "bg-[#f8dde6]"],
            ["Cost per lead", "₹280", "bg-paper"],
            ["Return on spend", "4.2×", "bg-marigold-soft"],
          ].map(([k, v, c]) => (
            <div key={k} className={`rounded-lg p-10 ${c}`}>
              <p className="fs-9 text-ink-3">{k}</p>
              <p className="mock-display mt-2 fs-20 tnum">{v}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-8 border-ink/8 lg:border-l lg:pl-16">
          {channels.map((c) => (
            <li key={c.name} className="grid items-center gap-8 fs-10 [grid-template-columns:calc(var(--spacing)*96)_1fr_calc(var(--spacing)*36)]">
              <span className="text-ink-2">{c.name}</span>
              <span className="h-10 rounded-full bg-paper">
                <span className={`block h-full rounded-full ${c.c}`} style={{ width: `${c.w}%` }} />
              </span>
              <span className="text-right font-semibold tnum">{c.leads}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
