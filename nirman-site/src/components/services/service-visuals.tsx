import { CalendarCheck, Check, Gauge, MapPin, Search, Smartphone, Star } from "lucide-react";
import { AppFrame } from "@/components/crm/app-frame";
import { PhoneInbox } from "@/components/crm/screens";
import { CampaignsScreen, LeadsScreen } from "@/components/crm/screens-more";
import type { ServiceSlug } from "@/content/service-pages";

/*
 * Hero pictures for the service pages (docs/sections/p1-services.md), built
 * in code. Websites: a browser with a clinic site and quality checks. SEO: a
 * search results page with the business on top and a local map card.
 * Software and marketing reuse the real Nirman CRM screens. Generic
 * search UI, no Google logo. Decorative: the hero text carries the meaning.
 */

const shadow = "shadow-[0_2rem_4rem_-1.5rem_rgba(18,20,24,0.35)]";

function WebsiteVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[36rem] text-ink">
      <div className={`overflow-hidden rounded-2xl bg-white ring-1 ring-line ${shadow}`}>
        <div className="flex items-center gap-1.5 border-b border-line bg-[#f7f9fb] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto rounded-full bg-white px-6 py-0.5 text-[11px] text-muted ring-1 ring-line">sunrise-clinic.in</span>
        </div>
        <div className="grid grid-cols-[1.3fr_1fr] gap-4 bg-[linear-gradient(160deg,#fbf3ed,#fff)] p-6">
          <div>
            <p className="text-[11px] font-semibold text-brand">SUNRISE DENTAL CLINIC</p>
            <p className="mt-2 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em]">Gentle dental care for the whole family</p>
            <p className="mt-2 text-[12px] text-muted">Open 7 days in Pune. Book online in a minute.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink-2 px-4 py-2 text-[12px] font-medium text-white">
              <CalendarCheck className="size-3.5" /> Book a visit
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-24 rounded-xl bg-[radial-gradient(circle_at_30%_30%,#f6d3bf,#f3c3a6_60%,#e9a882)]" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg bg-[#f2f5f8]" />
              <div className="h-12 rounded-lg bg-[#f2f5f8]" />
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-line sm:-left-8 ${shadow}`}>
        <span className="grid size-10 place-items-center rounded-full bg-[#ddf3e6] text-[#1f8a55]"><Gauge className="size-5" /></span>
        <span className="text-[12px] leading-tight"><b className="block text-[13px] font-semibold">Fast on mobile</b><span className="text-muted">Checked before launch</span></span>
      </div>
      <div className={`absolute -top-5 -right-3 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[12px] ring-1 ring-line sm:flex ${shadow}`}>
        <Smartphone className="size-4 text-brand" /> Phone-first design <Check className="size-4 text-[#1f8a55]" strokeWidth={2.6} />
      </div>
    </div>
  );
}

function SeoVisual() {
  const results = [
    { site: "sunrise-clinic.in", title: "Sunrise Dental Clinic, Pune: gentle family dentistry", you: true },
    { site: "example-dental.com", title: "Dental clinics in Pune: compare and book" },
    { site: "smile-care.in", title: "Smile Care Dental | Kothrud" },
  ];
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[36rem] text-ink">
      <div className={`rounded-2xl bg-white p-5 pb-24 ring-1 ring-line ${shadow}`}>
        <div className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] ring-1 ring-line">
          <Search className="size-4 text-muted" /> dentist near me in pune
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {results.map((r) => (
            <li key={r.site} className={`rounded-xl p-3 ${r.you ? "bg-[#fdf1ea] ring-1 ring-brand/30" : ""}`}>
              <p className="flex items-center gap-2 text-[11px] text-muted">
                {r.site}
                {r.you && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-white">Your business</span>}
              </p>
              <p className={`mt-0.5 text-[14px] font-medium ${r.you ? "text-brand" : "text-ink/80"}`}>{r.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={`absolute -bottom-8 left-1/2 w-[15rem] -translate-x-1/2 rounded-2xl sm:left-auto sm:-left-10 sm:translate-x-0 bg-white p-3.5 ring-1 ring-line sm:-left-10 ${shadow}`}>
        <div className="flex h-16 items-center justify-center rounded-lg bg-[repeating-linear-gradient(45deg,#f2f5f8_0_8px,#eceff3_8px_16px)]">
          <MapPin className="size-7 fill-brand text-white" />
        </div>
        <p className="mt-2 text-[13px] font-semibold">Sunrise Dental Clinic</p>
        <p className="flex items-center gap-1 text-[11px] text-muted">
          <Star className="size-3 fill-[#e0a33a] text-[#e0a33a]" /> On Google Maps · Open now
        </p>
      </div>
    </div>
  );
}

function SoftwareVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[40rem] text-ink">
      <AppFrame active="leads">
        <LeadsScreen />
      </AppFrame>
      <PhoneInbox className="absolute -right-3 -bottom-10 hidden w-[9rem] sm:block lg:w-[10rem]" />
    </div>
  );
}

function MarketingVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[40rem] text-ink">
      <AppFrame active="campaigns">
        <CampaignsScreen />
      </AppFrame>
      <PhoneInbox className="absolute -right-3 -bottom-10 hidden w-[9rem] sm:block lg:w-[10rem]" />
    </div>
  );
}

export const serviceVisuals: Record<ServiceSlug, () => React.ReactNode> = {
  websites: WebsiteVisual,
  seo: SeoVisual,
  software: SoftwareVisual,
  marketing: MarketingVisual,
};
