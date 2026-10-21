import { Bell, CalendarDays, FileText, FlaskConical, Pill, Smartphone, Star, Stethoscope } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { PhoneFrame } from "../mockups/frames";
import { Bars, LineChart } from "../mockups/charts";
import { ServiceCard } from "./service-copy";
import { cardPillar } from "@/content/home";

export function AppsService() {
  return (
    <ServiceCard
      visualAlign="center"
      id="svc-apps"
      pillar={cardPillar.apps}
      tone="marigold"
      icon={Smartphone}
      name="Mobile app development"
      title="Apps people keep on their home screen."
      body="We design and build iOS and Android apps around a few tasks done really well: booking, ordering, tracking, paying. One codebase where it makes sense, native where it matters."
      points={["Product and UX design", "React Native and Flutter", "Payments, maps and notifications", "App Store and Play Store launch"]}
      visual={<AppsVisual />}
    />
  );
}

/** The card's mockup, also the hero visual on apps service pages (P4.2). */
export function AppsVisual() {
  return (
    <Stage w={480} h={330} wLg={780} hLg={510} label="Three screens of a clinic app on phones: home, booking a doctor, and health reports">
      <div className="absolute left-10 top-60 w-160 -rotate-[6deg] lg:left-40 lg:top-90 lg:w-236">
        <PhoneFrame time="9:12" model="iphone-alt">
          <HomeScreen />
        </PhoneFrame>
      </div>
      <div className="absolute left-310 top-60 w-160 rotate-[6deg] lg:left-505 lg:top-90 lg:w-236">
        <PhoneFrame time="9:15" model="iphone-alt">
          <ReportsScreen />
        </PhoneFrame>
      </div>
      <div className="absolute left-150 top-10 z-10 w-180 lg:left-262 lg:top-10 lg:w-256">
        <PhoneFrame time="9:14">
          <BookingScreen />
        </PhoneFrame>
      </div>
    </Stage>
  );
}

function AppHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-14 pt-4">
      {sub && <p className="fs-9 text-ink-3">{sub}</p>}
      <p className="mock-display fs-18">{title}</p>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between pr-14">
        <AppHeader sub="Good morning" title="Ananya" />
        <span className="relative mt-8 grid size-24 place-items-center rounded-full bg-paper">
          <Bell className="size-12" />
          <span className="absolute right-4 top-4 size-5 rounded-full bg-coral" />
        </span>
      </div>
      <div className="mx-10 mt-12 overflow-hidden rounded-xl bg-peacock text-white">
        <div className="flex items-center gap-10 p-12">
          <div className="relative size-40 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
            <Photo name="doctor" sizes="80px" decorative position="50% 20%" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="fs-8 text-white/70">Next appointment</p>
            <p className="fs-12 font-semibold">Dr. Arjun Mehra</p>
            <p className="fs-9 text-white/75">Cardiology, Room 204</p>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-black/15 px-12 py-8 fs-9">
          <CalendarDays className="size-10" />
          Thu, 24 Oct at 10:30
        </div>
      </div>
      <div className="mx-10 mt-10 grid grid-cols-2 gap-6">
        {(
          [
            [Stethoscope, "Book visit", "bg-cobalt-soft text-cobalt"],
            [FlaskConical, "Lab tests", "bg-marigold-soft text-marigold-2"],
            [Pill, "Medicines", "bg-coral-soft text-coral-2"],
            [FileText, "Records", "bg-mint-soft text-forest"],
          ] as const
        ).map(([I, l, c]) => (
          <div key={l} className="rounded-lg bg-paper p-10">
            <span className={`grid size-24 place-items-center rounded-md ${c}`}>
              <I className="size-12" />
            </span>
            <p className="mt-6 fs-10 font-medium">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingScreen() {
  const days = [
    ["Mon", "21"],
    ["Tue", "22"],
    ["Wed", "23"],
    ["Thu", "24"],
    ["Fri", "25"],
  ];
  const slots = ["9:30", "10:00", "10:30", "11:15", "12:00", "4:30"];
  return (
    <div className="flex h-full flex-col">
      <AppHeader sub="Cardiology" title="Book a visit" />
      <div className="relative mx-10 mt-10 h-110 overflow-hidden rounded-xl">
        <Photo name="doctor" sizes="300px" decorative position="50% 25%" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-10 bottom-8 flex items-end justify-between text-white">
          <span className="leading-tight">
            <span className="block fs-12 font-semibold">Dr. Arjun Mehra</span>
            <span className="block fs-9 text-white/80">14 years experience</span>
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 fs-9 font-medium backdrop-blur">
            <Star className="size-9 fill-marigold text-marigold" />
            4.9
          </span>
        </div>
      </div>
      <p className="mx-14 mt-10 fs-10 font-medium">October</p>
      <div className="mx-10 mt-6 grid grid-cols-5 gap-5">
        {days.map(([d, n]) => (
          <span key={n} className={`flex flex-col items-center rounded-lg py-6 ${n === "24" ? "bg-ink text-white" : "bg-paper"}`}>
            <span className={`fs-8 ${n === "24" ? "text-white/70" : "text-ink-3"}`}>{d}</span>
            <span className="fs-12 font-semibold tnum">{n}</span>
          </span>
        ))}
      </div>
      <p className="mx-14 mt-10 fs-10 font-medium">Available times</p>
      <div className="mx-10 mt-6 grid grid-cols-3 gap-5">
        {slots.map((s) => (
          <span
            key={s}
            className={`rounded-full py-5 text-center fs-10 tnum ${
              s === "10:30" ? "bg-marigold font-semibold text-ink" : s === "12:00" ? "text-ink-3 line-through ring-1 ring-ink/8" : "ring-1 ring-ink/12"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto px-10 pb-6">
        <div className="mb-8 flex justify-between fs-9 text-ink-3">
          <span>Consultation fee</span>
          <span className="font-medium text-ink tnum">₹800</span>
        </div>
        <span className="block rounded-full bg-ink py-10 text-center fs-11 font-medium text-white">Confirm 10:30 on Thursday</span>
      </div>
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader sub="Health" title="Your reports" />
      <div className="mx-10 mt-10 rounded-xl bg-mint-soft p-10">
        <div className="flex items-baseline justify-between">
          <span className="fs-9 text-ink-2">HbA1c</span>
          <span className="rounded-full bg-forest px-6 py-1 fs-8 text-mint">In range</span>
        </div>
        <p className="mock-display fs-20 tnum">5.6%</p>
        <div className="mt-4 h-50 text-ink">
          <LineChart gridLines={2} w={180} h={50} min={5} max={6.6} series={[{ values: [6.4, 6.3, 6.1, 5.9, 5.8, 5.6], color: "#1e5a4b", fill: true }]} />
        </div>
      </div>
      <div className="mx-10 mt-8 rounded-xl bg-cobalt-soft p-10">
        <div className="flex items-baseline justify-between">
          <span className="fs-9 text-ink-2">Daily steps</span>
          <span className="fs-9 text-ink-3">This week</span>
        </div>
        <Bars className="mt-6 h-40" values={[6, 8, 7.5, 9, 5, 10, 8.4]} barClassName="bg-sky" highlight={5} highlightClassName="bg-cobalt" />
      </div>
      <ul className="mx-10 mt-8 space-y-6">
        {[
          ["Lipid profile", "12 Oct"],
          ["Vitamin D", "12 Oct"],
        ].map(([t, d]) => (
          <li key={t} className="flex items-center gap-8 rounded-lg bg-paper p-8">
            <FileText className="size-12 text-coral" />
            <span className="flex-1 leading-tight">
              <span className="block fs-10 font-medium">{t}</span>
              <span className="block fs-8 text-ink-3">{d}</span>
            </span>
            <span className="rounded-full bg-mint-soft px-6 py-1 fs-8 text-forest">Normal</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
