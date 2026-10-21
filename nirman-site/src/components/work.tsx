import { ArrowRight, Building2, CalendarDays, ChevronDown, GraduationCap, Menu, Search, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Stage } from "./stage";
import { Photo } from "./photo";
import { ButtonLink } from "./ui/button-link";
import { Device, PhoneFrame } from "./mockups/frames";
import { ConceptStore } from "./mockups/concept-site";
import { caseStudies } from "@/content/home";

/*
 * Case studies (handoff §4): 4 projects from content/home.ts. No verified
 * projects exist yet, so every entry is a SAMPLE with concept visuals and is
 * labelled as such. Replace copy, visuals and results with real client work
 * (and client approval) before launch.
 */

type Study = (typeof caseStudies)[number];

const [store, resort, builders, school] = caseStudies;

function SampleTag({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed px-3 py-1 text-[0.8rem] font-medium ${
        dark ? "border-white/40 text-white/85" : "border-ink/30 text-ink-2"
      }`}
    >
      Sample case study
    </span>
  );
}

function CaseMeta({ study, dot, dark = false, className = "" }: { study: Study; dot: string; dark?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <SampleTag dark={dark} />
        <span className={`inline-flex items-center gap-2 text-[0.9rem] ${dark ? "text-white/70" : "text-ink-3"}`}>
          <span className={`size-2 rounded-full ${dot}`} aria-hidden />
          {study.industry}
        </span>
      </div>
      <h3 className="heading mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)]">{study.client}</h3>
      <p className={`mt-4 max-w-[34rem] leading-[1.65] ${dark ? "text-white/70" : "text-ink-2"}`}>{study.body}</p>
    </div>
  );
}

function Metrics({ study, dark = false }: { study: Study; dark?: boolean }) {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-3">
        {study.metrics.map((m) => (
          <div key={m.label} className={`flex flex-col-reverse rounded-2xl p-4 ${dark ? "bg-white/10" : "bg-surface/70"}`}>
            <dt className={`mt-1 text-[0.875rem] leading-snug ${dark ? "text-white/70" : "text-ink-2"}`}>{m.label}</dt>
            <dd className="heading whitespace-nowrap text-[clamp(1.9rem,2.6vw,2.4rem)] tnum">{m.value}</dd>
          </div>
        ))}
      </dl>
      <p className={`mt-3 text-[0.8rem] ${dark ? "text-white/55" : "text-ink-3"}`}>Sample figures, not real client results.</p>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="display text-[clamp(2.8rem,7vw,6.2rem)] lg:col-span-7">
            Our work
          </h2>
          <p className="leading-[1.65] text-ink-2 lg:col-span-5">
            Case studies with real clients are being prepared. Until then, the four below are samples: client names, numbers
            and visuals show how each project will be presented, not work we have delivered.
          </p>
        </div>

        {/* 1. Wide storefront */}
        <article className="mt-14 overflow-hidden rounded-[2.5rem] bg-coral-soft lg:mt-20">
          <div className="px-4 pt-6 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
            <Stage w={520} h={330} wLg={1120} hLg={520} className="overflow-hidden" label="Concept online store for a handmade ceramics brand, on a laptop">
              <div className="absolute left-10 top-0 w-500 lg:left-180 lg:w-760">
                <Device device="macbook" shadow={false} screenClassName="bg-[#fbf8f3]">
                  <Stage w={880} h={552}>
                    <ConceptStore />
                  </Stage>
                </Device>
              </div>
            </Stage>
          </div>
          <div className="grid gap-8 bg-surface/50 px-6 py-8 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-10">
            <CaseMeta className="lg:col-span-7" dot="bg-coral" study={store} />
            <div className="lg:col-span-4 lg:col-start-9">
              <Metrics study={store} />
            </div>
          </div>
        </article>

        {/* 2 + 3 side by side */}
        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          {/* Resort, peacock */}
          <article className="flex flex-col overflow-hidden rounded-[2.5rem] bg-peacock text-white lg:col-span-7">
            <div className="grid gap-6 px-6 pt-8 sm:px-10 sm:pt-10 xl:grid-cols-[1fr_17rem] xl:items-end xl:gap-8">
              <CaseMeta dark dot="bg-mint" study={resort} />
              <Metrics dark study={resort} />
            </div>
            <div className="mt-auto pl-6 pt-8 sm:pl-10">
              <Stage w={520} h={350} wLg={700} hLg={450} label="Concept resort website on a laptop and a phone">
                <div className="absolute left-0 top-0 w-460 lg:w-600">
                  <Device device="macbook-alt">
                    <Stage w={600} h={373}>
                      <HotelDesktop />
                    </Stage>
                  </Device>
                </div>
                <div className="absolute left-370 top-60 w-140 lg:left-480 lg:top-80 lg:w-170">
                  <PhoneFrame tone="dark" model="iphone-alt">
                    <HotelMobile />
                  </PhoneFrame>
                </div>
              </Stage>
            </div>
          </article>

          {/* Coaching institute, marigold-soft */}
          <article className="flex flex-col overflow-hidden rounded-[2.5rem] bg-marigold-soft lg:col-span-5">
            <div className="relative h-72 sm:h-80">
              <Photo name="students" sizes="(min-width: 1024px) 40vw, 100vw" position="50% 35%" />
              <div className="absolute bottom-0 left-6 right-6 translate-y-1/2 sm:left-8 sm:right-8">
                <Stage w={420} h={170} label="Concept admissions summary for a coaching institute">
                  <SummaryCard
                    icon={GraduationCap}
                    title="Admissions 2026–27"
                    stats={[
                      ["Enquiries", "1,284", "bg-cobalt-soft"],
                      ["Campus visits", "412", "bg-mint-soft"],
                      ["Applications", "236", "bg-marigold-soft"],
                    ]}
                  />
                </Stage>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-8 px-6 pb-8 pt-24 sm:px-8 sm:pt-28">
              <CaseMeta dot="bg-forest-2" study={school} />
              <Metrics study={school} />
            </div>
          </article>
        </div>

        {/* 4. Real estate, wide and compact */}
        <article className="mt-5 grid overflow-hidden rounded-[2.5rem] bg-cobalt-soft lg:grid-cols-12">
          <div className="relative h-80 sm:h-96 lg:col-span-6 lg:h-auto lg:min-h-[28rem]">
            <Photo name="terracotta" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
              <Stage w={420} h={170} label="Concept site-visit summary in Nirman CRM for a residential builder">
                <SummaryCard
                  icon={Building2}
                  title="Site visits, this month"
                  stats={[
                    ["Enquiries", "486", "bg-cobalt-soft"],
                    ["Visits booked", "173", "bg-mint-soft"],
                    ["Bookings", "21", "bg-marigold-soft"],
                  ]}
                />
              </Stage>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:col-span-6 lg:px-12">
            <CaseMeta dot="bg-cobalt" study={builders} />
            <Metrics study={builders} />
          </div>
        </article>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/work/" variant="primary" size="lg">
            See all our work
            <ArrowRight className="size-4.5" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function HotelDesktop() {
  return (
    <div className="relative h-full overflow-hidden text-white">
      <Photo name="hillResort" sizes="700px" decorative />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a2c]/85 via-[#0d2a2c]/10 to-[#0d2a2c]/40" />
      <div className="relative flex items-center justify-between px-24 py-14 fs-10">
        <span className="mock-display fs-15">Neelgiri Retreat</span>
        <span className="flex gap-16 text-white/85">
          <span>Rooms</span>
          <span>Dining</span>
          <span>Experiences</span>
        </span>
        <span className="rounded-full bg-white px-12 py-5 font-medium text-[#0d2a2c]">Book direct</span>
      </div>
      <div className="absolute inset-x-20 bottom-20">
        <p className="fs-10 text-white/80">A hillside retreat in the Nilgiris</p>
        <p className="mock-display mt-4 fs-40">
          Slow mornings,
          <br />
          misty hills.
        </p>
        <div className="mt-16 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center overflow-hidden rounded-full bg-white fs-10 text-[#0d2a2c]">
          {[
            ["Check in", "Fri, 24 Oct"],
            ["Check out", "Sun, 26 Oct"],
            ["Guests", "2 adults"],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0 border-r border-black/8 px-10 py-7">
              <p className="fs-8 text-black/50">{k}</p>
              <p className="flex items-center justify-between gap-4 truncate font-medium">
                {v}
                <ChevronDown className="size-10 text-black/40" />
              </p>
            </div>
          ))}
          <span className="m-5 whitespace-nowrap rounded-full bg-marigold px-10 py-8 font-semibold text-ink">Check rates</span>
        </div>
      </div>
    </div>
  );
}

function HotelMobile() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[56%] overflow-hidden">
        <Photo name="hillsMist" sizes="200px" decorative />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a2c]/90 to-transparent" />
        <div className="absolute inset-x-10 top-6 flex items-center justify-between fs-9 text-white">
          <span className="font-semibold">Neelgiri</span>
          <Menu className="size-11" />
        </div>
        <p className="mock-display absolute inset-x-10 bottom-10 fs-16 text-white">Slow mornings, misty hills.</p>
      </div>
      <div className="space-y-6 p-10 fs-9">
        <div className="flex items-center gap-6 rounded-full bg-white/8 px-10 py-7">
          <CalendarDays className="size-10 text-mint" />
          24 – 26 Oct
        </div>
        <div className="flex items-center gap-6 rounded-full bg-white/8 px-10 py-7">
          <Users className="size-10 text-mint" />2 adults
        </div>
        <span className="block rounded-full bg-marigold py-7 text-center font-semibold text-ink">Check rates</span>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, title, stats }: { icon: LucideIcon; title: string; stats: [string, string, string][] }) {
  return (
    <div className="absolute inset-0 rounded-2xl bg-surface p-14 shadow-scene">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-8">
          <span className="grid size-24 place-items-center rounded-md bg-forest text-mint">
            <Icon className="size-13" />
          </span>
          <span className="mock-display fs-14">{title}</span>
        </span>
        <span className="flex items-center gap-6 rounded-full bg-paper px-10 py-5 fs-9 text-ink-3">
          <Search className="size-10" />
          Search
        </span>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8">
        {stats.map(([k, v, c]) => (
          <div key={k} className={`rounded-lg p-10 ${c}`}>
            <p className="fs-9 text-ink-2">{k}</p>
            <p className="mock-display mt-2 fs-20 tnum">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
