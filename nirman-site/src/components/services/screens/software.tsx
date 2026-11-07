import { ArrowLeftRight, Bell, Check, ChevronRight, Clock, CreditCard, Globe, Home, Mail, MapPin, MessageCircle, Package, Search, Sheet, Truck, User, Wrench } from "lucide-react";

/*
 * Custom software screens, sized in em for BrowserFrame / PhoneFrame. Demo:
 * "FixIt Pro", a field-service portal for an AC repair company, its
 * customer app, and an integrations view. Generic icons, no brand logos.
 */

const card = "rounded-[0.9em] bg-white ring-1 ring-line";

export function SwPortalScreen() {
  const jobs = [
    { id: "#1042", c: "Hotel Sai Palace", t: "AC service, 6 units", tech: "Ravi", s: "On the way", tone: "bg-[#fdf3d4] text-[#a06a00]" },
    { id: "#1041", c: "Green Leaf Café", t: "Gas refill", tech: "Imran", s: "In progress", tone: "bg-[#fdf1ea] text-brand" },
    { id: "#1040", c: "Mehta residence", t: "New AC install", tech: "Ravi", s: "Done", tone: "bg-[#ddf3e6] text-[#1f8a55]" },
    { id: "#1039", c: "City Pharmacy", t: "Annual contract visit", tech: "Sunil", s: "Done", tone: "bg-[#ddf3e6] text-[#1f8a55]" },
    { id: "#1038", c: "Kapoor Textiles", t: "Leak repair", tech: "Unassigned", s: "New", tone: "bg-[#f2f5f8] text-ink/70" },
    { id: "#1037", c: "Sunrise Dental Clinic", t: "AC service, 3 units", tech: "Sunil", s: "Assigned", tone: "bg-[#f2f0fc] text-[#6b4fd8]" },
    { id: "#1036", c: "Joshi Apartments", t: "Annual contract visit", tech: "Imran", s: "Assigned", tone: "bg-[#f2f0fc] text-[#6b4fd8]" },
    { id: "#1035", c: "Bakers Street", t: "Noise complaint", tech: "Unassigned", s: "New", tone: "bg-[#f2f5f8] text-ink/70" },
  ];
  return (
    <div className="flex h-full">
      <div className="flex w-[11em] shrink-0 flex-col gap-[0.2em] bg-ink-2 p-[0.9em] text-[0.76em] text-white/75">
        <p className="mb-[0.8em] flex items-center gap-[0.4em] font-semibold text-white"><Wrench className="size-[1.1em]" />FixIt Pro</p>
        {["Today", "Jobs", "Technicians", "Customers", "Invoices", "Stock"].map((x, i) => (
          <span key={x} className={`rounded-[0.5em] px-[0.7em] py-[0.5em] ${i === 1 ? "bg-white/12 font-medium text-white" : ""}`}>{x}</span>
        ))}
      </div>
      <div className="min-w-0 flex-1 bg-[#fbfaf9] p-[1.2em]">
        <div className="flex items-end">
          <div>
            <p className="text-[1.25em] font-semibold tracking-[-0.02em]">Jobs today</p>
            <p className="text-[0.72em] text-[#6b7079]">18 jobs · 6 technicians · 2 need a technician</p>
          </div>
          <span className="ml-auto flex items-center gap-[0.4em] rounded-full bg-white px-[0.9em] py-[0.35em] text-[0.7em] text-[#6b7079] ring-1 ring-line"><Search className="size-[1em]" />Find a job</span>
        </div>
        <div className="mt-[0.9em] grid grid-cols-4 gap-[0.6em]">
          {[["New", "3"], ["Assigned", "7"], ["In progress", "4"], ["Done", "4"]].map(([l, v]) => (
            <div key={l} className={`${card} px-[0.9em] py-[0.7em]`}>
              <p className="text-[0.66em] text-[#6b7079]">{l}</p>
              <p className="text-[1.35em] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className={`${card} mt-[0.8em] overflow-hidden`}>
          {jobs.map((j) => (
            <div key={j.id} className="grid grid-cols-[3.5em_1.5fr_1.6fr_1fr_1fr] items-center gap-[0.6em] border-b border-line px-[0.9em] py-[0.6em] text-[0.72em] last:border-0">
              <span className="text-[#6b7079]">{j.id}</span>
              <span className="truncate font-semibold">{j.c}</span>
              <span className="truncate">{j.t}</span>
              <span className={j.tech === "Unassigned" ? "font-medium text-brand" : ""}>{j.tech}</span>
              <span><span className={`rounded-full px-[0.7em] py-[0.15em] text-[0.9em] font-medium ${j.tone}`}>{j.s}</span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[14em] shrink-0 border-l border-line bg-white p-[0.9em]">
        <p className="text-[0.76em] font-semibold">Job #1042</p>
        <div className="relative mt-[0.6em] h-[7em] overflow-hidden rounded-[0.7em] bg-[#eef0f2]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:2em_2em]" />
          <svg viewBox="0 0 100 60" className="absolute inset-0 size-full"><path d="M15 50 C 35 45, 40 20, 80 12" fill="none" stroke="#c2410c" strokeWidth="1.6" strokeDasharray="3 2" /></svg>
          <Truck className="absolute top-[55%] left-[30%] size-[1.4em] text-ink" />
          <MapPin className="absolute top-[8%] left-[76%] size-[1.6em] fill-brand text-white" />
        </div>
        <ul className="mt-[0.7em] flex flex-col gap-[0.45em] text-[0.68em]">
          <li className="flex items-center gap-[0.4em]"><User className="size-[1.1em] text-[#6b7079]" />Ravi K. · arriving 11:20</li>
          <li className="flex items-center gap-[0.4em]"><Package className="size-[1.1em] text-[#6b7079]" />Filters x6, gas 2 kg</li>
          <li className="flex items-center gap-[0.4em]"><MessageCircle className="size-[1.1em] text-[#1f8a55]" />Customer told on WhatsApp</li>
        </ul>
        <span className="mt-[0.8em] block rounded-full bg-ink-2 py-[0.5em] text-center text-[0.72em] font-medium text-white">Open job</span>
      </div>
    </div>
  );
}

/** Customer app (PhoneFrame content). */
export function SwAppScreen() {
  return (
    <div className="flex h-full flex-col bg-[#fbfaf9]">
      <div className="flex items-center justify-between px-[1em] py-[0.5em]">
        <span className="text-[0.95em] font-semibold">Hi, Anita</span>
        <Bell className="size-[1.1em]" />
      </div>
      <div className="mx-[0.8em] rounded-[1em] bg-ink-2 p-[0.9em] text-white">
        <p className="text-[0.66em] text-white/70">Your technician</p>
        <p className="mt-[0.2em] font-semibold">Ravi is on the way</p>
        <p className="mt-[0.2em] flex items-center gap-[0.3em] text-[0.68em] text-white/80"><Clock className="size-[1em]" />Arriving in 12 min</p>
        <div className="mt-[0.6em] h-[0.4em] rounded-full bg-white/15"><div className="h-full w-[70%] rounded-full bg-[#f6a57a]" /></div>
      </div>
      <p className="mx-[1em] mt-[0.9em] text-[0.72em] font-semibold">Book a service</p>
      <div className="mx-[0.8em] mt-[0.4em] grid grid-cols-2 gap-[0.5em] text-[0.68em]">
        {["AC service", "Gas refill", "Repair", "New install"].map((s, i) => (
          <span key={s} className={`rounded-[0.8em] p-[0.7em] font-medium ${i === 0 ? "bg-[#fdf1ea] text-brand ring-1 ring-brand/30" : "bg-white ring-1 ring-line"}`}>{s}</span>
        ))}
      </div>
      <div className="mx-[0.8em] mt-[0.6em] flex items-center justify-between rounded-[0.8em] bg-white px-[0.8em] py-[0.6em] text-[0.68em] ring-1 ring-line">
        <span><b className="block font-semibold">Annual contract</b><span className="text-[#6b7079]">Next visit 14 Dec</span></span>
        <ChevronRight className="size-[1.1em] text-[#6b7079]" />
      </div>
      <div className="mt-auto flex justify-around border-t border-line bg-white py-[0.7em] text-[#6b7079]">
        <Home className="size-[1.2em] text-brand" />
        <Wrench className="size-[1.2em]" />
        <CreditCard className="size-[1.2em]" />
        <User className="size-[1.2em]" />
      </div>
    </div>
  );
}

export function SwIntegrationsScreen() {
  const apps = [
    { I: Globe, n: "Website booking form", d: "New jobs created automatically", s: "Live" },
    { I: MessageCircle, n: "WhatsApp Business", d: "Arrival and invoice messages", s: "Live" },
    { I: CreditCard, n: "Payment gateway", d: "Invoices marked paid on payment", s: "Live" },
    { I: Sheet, n: "Accounting export", d: "Daily invoice file for the accountant", s: "Live" },
    { I: Mail, n: "Email", d: "Service reports to customers", s: "Live" },
  ];
  return (
    <div className="grid h-full grid-cols-[1.5fr_1fr] gap-[1em] bg-[#fbfaf9] p-[1.3em]">
      <div>
        <p className="text-[1.25em] font-semibold tracking-[-0.02em]">Connected apps</p>
        <p className="text-[0.72em] text-[#6b7079]">Data moves between your tools on its own</p>
        <ul className="mt-[0.9em] flex flex-col gap-[0.5em]">
          {apps.map(({ I, n, d, s }) => (
            <li key={n} className={`${card} flex items-center gap-[0.8em] p-[0.8em]`}>
              <span className="grid size-[2.2em] place-items-center rounded-[0.6em] bg-[#fdf1ea] text-brand"><I className="size-[1.2em]" /></span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[0.8em] font-semibold">{n}</span>
                <span className="block truncate text-[0.66em] text-[#6b7079]">{d}</span>
              </span>
              <span className="flex items-center gap-[0.3em] rounded-full bg-[#ddf3e6] px-[0.7em] py-[0.15em] text-[0.66em] font-medium text-[#1f8a55]"><Check className="size-[1em]" strokeWidth={3} />{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} p-[0.9em]`}>
        <p className="flex items-center gap-[0.4em] text-[0.76em] font-semibold"><ArrowLeftRight className="size-[1.1em] text-brand" />Activity</p>
        <ul className="mt-[0.6em] flex flex-col gap-[0.6em] text-[0.68em]">
          {[["Payment received for #1040", "2 min"], ["Job #1043 from website", "8 min"], ["Arrival message sent to Anita", "12 min"], ["Stock low: filters, reorder sent", "10:40"], ["Invoice file sent to accountant", "9:00"], ["Contract renewal reminder sent", "8:30"], ["Service report emailed", "Yesterday"], ["Weekly summary to the owner", "Mon"]].map(([t, m]) => (
            <li key={t} className="flex gap-[0.5em]">
              <span className="mt-[0.35em] size-[0.5em] shrink-0 rounded-full bg-brand" />
              <span className="flex-1">{t}</span>
              <span className="text-[#6b7079]">{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
