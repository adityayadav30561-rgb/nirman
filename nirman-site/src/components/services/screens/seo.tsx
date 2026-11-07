import { ArrowDown, ArrowUp, Check, CircleAlert, FileText, MapPin, Navigation, Phone, Search, Sparkles, Star, TriangleAlert } from "lucide-react";

/*
 * SEO screens (the client's report and work views), sized in em for
 * BrowserFrame. Demo data for a fictional clinic, sunrise-clinic.in. Generic
 * search and map UI: no Google logos.
 */

function Bar({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-[0.8em] border-b border-line px-[1.4em] py-[0.8em]">
      <span className="grid size-[2em] place-items-center rounded-[0.5em] bg-ink-2 text-[0.8em] font-bold text-white">S</span>
      <span className="leading-tight">
        <span className="block text-[0.9em] font-semibold">{title}</span>
        <span className="block text-[0.68em] text-[#6b7079]">{sub}</span>
      </span>
      <span className="ml-auto rounded-full bg-[#f2f5f8] px-[0.9em] py-[0.3em] text-[0.7em] text-ink/70">Last 90 days</span>
    </div>
  );
}

const card = "rounded-[0.9em] bg-white p-[0.9em] ring-1 ring-line";

export function SeoOverviewScreen() {
  const pts = [18, 22, 21, 27, 30, 29, 35, 41, 39, 46, 52, 58];
  const max = 60;
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${40 - (v / max) * 38}`).join(" ");
  const kws = [
    { k: "dentist in pune", p: 3, d: 6 },
    { k: "root canal treatment pune", p: 2, d: 4 },
    { k: "kids dentist kothrud", p: 1, d: 3 },
    { k: "teeth whitening pune", p: 5, d: 9 },
    { k: "dental clinic near me", p: 4, d: 7 },
  ];
  return (
    <div className="flex h-full flex-col bg-[#fbfaf9]">
      <Bar title="SEO overview" sub="sunrise-clinic.in" />
      <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-[0.8em] p-[1.2em]">
        <div className="flex flex-col gap-[0.8em]">
          <div className="grid grid-cols-3 gap-[0.7em]">
            {[["Visitors from search", "4,820", "+38%"], ["Keywords in top 10", "64", "+21"], ["Calls and bookings", "212", "+44%"]].map(([l, v, d]) => (
              <div key={l} className={card}>
                <p className="text-[0.66em] text-[#6b7079]">{l}</p>
                <p className="mt-[0.1em] text-[1.45em] font-semibold tracking-[-0.03em]">{v}</p>
                <p className="text-[0.62em] font-medium text-[#1f8a55]">{d}</p>
              </div>
            ))}
          </div>
          <div className={`${card} flex flex-1 flex-col`}>
            <p className="text-[0.76em] font-semibold">Visitors from search, by week</p>
            <svg viewBox="0 0 100 42" preserveAspectRatio="none" className="mt-[0.6em] min-h-[9em] w-full flex-1">
              <defs>
                <linearGradient id="seo-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#c2410c" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#c2410c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`0,42 ${path} 100,42`} fill="url(#seo-fill)" />
              <polyline points={path} fill="none" stroke="#c2410c" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className={card}>
          <p className="text-[0.76em] font-semibold">Top keywords</p>
          <ul className="mt-[0.5em] flex flex-col">
            {kws.map((k) => (
              <li key={k.k} className="flex items-center gap-[0.5em] border-b border-line py-[0.55em] text-[0.7em] last:border-0">
                <span className="flex-1 truncate">{k.k}</span>
                <span className="grid size-[1.9em] place-items-center rounded-[0.4em] bg-[#fdf1ea] font-semibold text-brand">{k.p}</span>
                <span className="flex w-[2.8em] items-center gap-[0.15em] font-medium text-[#1f8a55]">
                  <ArrowUp className="size-[1em]" />
                  {k.d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SeoAuditScreen() {
  const issues = [
    { t: "Pages load in under 2 seconds on mobile", s: "fixed" },
    { t: "Every page has a unique title and description", s: "fixed" },
    { t: "Sitemap submitted and pages indexed", s: "fixed" },
    { t: "Structured data for the clinic and doctors", s: "fixed" },
    { t: "Broken links on the blog repaired", s: "fixed" },
    { t: "Pages work well on phones", s: "fixed" },
    { t: "Secure HTTPS on every page", s: "fixed" },
    { t: "4 images are larger than needed", s: "warn" },
    { t: "2 old pages redirect twice", s: "warn" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#fbfaf9]">
      <Bar title="Technical SEO audit" sub="sunrise-clinic.in · 136 pages checked" />
      <div className="grid flex-1 grid-cols-[1fr_1.8fr] gap-[0.8em] p-[1.2em]">
        <div className={`${card} flex flex-col items-center justify-center`}>
          <div className="relative size-[9em]">
            <svg viewBox="0 0 36 36" className="size-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f2f5f8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1f8a55" strokeWidth="3" strokeDasharray="90 100" strokeLinecap="round" pathLength="100" />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-center leading-tight">
              <span>
                <span className="block text-[2.4em] font-semibold tracking-[-0.03em]">92</span>
                <span className="block text-[0.66em] text-[#6b7079]">Site health</span>
              </span>
            </span>
          </div>
          <div className="mt-[1em] grid w-full grid-cols-3 gap-[0.4em] text-center text-[0.66em]">
            <span className="rounded-[0.6em] bg-[#ddf3e6] py-[0.5em] text-[#1f8a55]"><b className="block text-[1.4em]">128</b>Passed</span>
            <span className="rounded-[0.6em] bg-[#fdf3d4] py-[0.5em] text-[#a06a00]"><b className="block text-[1.4em]">6</b>Warnings</span>
            <span className="rounded-[0.6em] bg-[#f2f5f8] py-[0.5em] text-ink/70"><b className="block text-[1.4em]">0</b>Errors</span>
          </div>
        </div>
        <div className={card}>
          <p className="text-[0.76em] font-semibold">What we checked and fixed</p>
          <ul className="mt-[0.6em] flex flex-col gap-[0.45em]">
            {issues.map((i) => (
              <li key={i.t} className="flex items-center gap-[0.6em] rounded-[0.6em] bg-[#fbfaf9] px-[0.7em] py-[0.55em] text-[0.72em]">
                {i.s === "fixed" ? <Check className="size-[1.2em] text-[#1f8a55]" strokeWidth={3} /> : <TriangleAlert className="size-[1.2em] text-[#a06a00]" />}
                <span className="flex-1">{i.t}</span>
                <span className={`rounded-full px-[0.7em] py-[0.1em] text-[0.85em] font-medium ${i.s === "fixed" ? "bg-[#ddf3e6] text-[#1f8a55]" : "bg-[#fdf3d4] text-[#a06a00]"}`}>
                  {i.s === "fixed" ? "Fixed" : "Next week"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SeoLocalScreen() {
  const list = [
    { n: "Sunrise Dental Clinic", r: "4.9", c: "312", you: true },
    { n: "Kothrud Dental Care", r: "4.6", c: "128" },
    { n: "Smile Studio Pune", r: "4.5", c: "96" },
  ];
  return (
    <div className="grid h-full grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col border-r border-line">
        <div className="m-[1em] flex items-center gap-[0.6em] rounded-full px-[1em] py-[0.55em] text-[0.8em] ring-1 ring-line">
          <Search className="size-[1.1em] text-[#6b7079]" /> dentist near me
        </div>
        <ul className="flex flex-col gap-[0.4em] px-[1em]">
          {list.map((l, i) => (
            <li key={l.n} className={`rounded-[0.8em] p-[0.8em] ${l.you ? "bg-[#fdf1ea] ring-1 ring-brand/30" : ""}`}>
              <p className="flex items-center gap-[0.5em] text-[0.8em] font-semibold">
                <span className="grid size-[1.6em] place-items-center rounded-full bg-ink-2 text-[0.75em] text-white">{String.fromCharCode(65 + i)}</span>
                {l.n}
                {l.you && <span className="rounded-full bg-brand px-[0.6em] py-[0.05em] text-[0.75em] text-white">You</span>}
              </p>
              <p className="mt-[0.2em] flex items-center gap-[0.3em] text-[0.66em] text-[#6b7079]">
                {l.r} <Star className="size-[1em] fill-[#e0a33a] text-[#e0a33a]" /> ({l.c} reviews) · Dentist · Open now
              </p>
            </li>
          ))}
        </ul>
        <div className="mx-[1em] mt-[0.8em] grid grid-cols-3 gap-[0.4em] text-center text-[0.66em]">
          {[[Phone, "48 calls"], [Navigation, "126 directions"], [MapPin, "1.9k views"]].map(([I, t]) => {
            const Icon = I as typeof Phone;
            return (
              <span key={t as string} className="rounded-[0.6em] bg-[#f7f9fb] py-[0.6em]">
                <Icon className="mx-auto size-[1.2em] text-brand" />
                <span className="mt-[0.2em] block font-medium">{t as string}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="relative bg-[#eef0f2]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:3em_3em]" />
        <div className="absolute top-[30%] left-[5%] h-[0.5em] w-[90%] -rotate-12 rounded-full bg-white" />
        <div className="absolute top-[10%] left-[55%] h-[80%] w-[0.5em] rotate-6 rounded-full bg-white" />
        <div className="absolute top-[60%] left-[0%] h-[0.4em] w-full rotate-3 rounded-full bg-[#f6e3a8]" />
        {[["38%", "42%", true], ["62%", "28%"], ["30%", "70%"]].map(([l, t, you], i) => (
          <span key={i} className="absolute -translate-1/2" style={{ left: l as string, top: t as string }}>
            <MapPin className={`size-[2.4em] ${you ? "fill-brand text-white" : "fill-ink-2 text-white"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SeoAiScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#fbfaf9] px-[3em] py-[1.6em]">
      <div className="ml-auto max-w-[60%] rounded-[1.2em] rounded-br-[0.3em] bg-[#f2f5f8] px-[1.1em] py-[0.7em] text-[0.82em]">
        Which dentist in Pune is good for kids?
      </div>
      <div className="mt-[1.2em] w-full rounded-[1.2em] bg-white p-[1.2em] ring-1 ring-line">
        <p className="flex items-center gap-[0.4em] text-[0.72em] font-semibold text-[#6b7079]">
          <Sparkles className="size-[1.1em] text-brand" /> AI assistant
        </p>
        <p className="mt-[0.6em] text-[0.82em] leading-relaxed">
          For children, families in Pune often choose <b className="font-semibold text-brand">Sunrise Dental Clinic</b> in Kothrud. It has a dedicated kids&apos; dentist, is open 7 days and lets you book online.
        </p>
        <ul className="mt-[0.7em] flex flex-col gap-[0.35em] text-[0.76em]">
          {["Paediatric dentist on weekdays and Saturdays", "Online booking with reminders on WhatsApp", "4.9 rating from 312 reviews"].map((t) => (
            <li key={t} className="flex gap-[0.5em]"><Check className="mt-[0.15em] size-[1.1em] shrink-0 text-[#1f8a55]" strokeWidth={3} />{t}</li>
          ))}
        </ul>
        <div className="mt-[0.9em] flex flex-wrap gap-[0.4em] text-[0.66em]">
          <span className="rounded-full bg-[#fdf1ea] px-[0.8em] py-[0.25em] font-medium text-brand ring-1 ring-brand/30">sunrise-clinic.in/kids-dentist</span>
          <span className="rounded-full bg-[#f2f5f8] px-[0.8em] py-[0.25em] text-ink/70">sunrise-clinic.in/faq</span>
        </div>
      </div>
      <div className="mt-[1em] grid w-full grid-cols-3 gap-[0.7em]">
        {[["Mentions in AI answers", "18", "this month"], ["Questions you answer", "42", "on your site"], ["Business details", "Consistent", "on 9 listings"]].map(([l, v, d]) => (
          <div key={l} className="rounded-[0.9em] bg-white p-[0.8em] ring-1 ring-line">
            <p className="text-[0.64em] text-[#6b7079]">{l}</p>
            <p className="text-[1.2em] font-semibold">{v}</p>
            <p className="text-[0.6em] text-[#6b7079]">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-[0.9em] flex items-center gap-[0.4em] self-start text-[0.68em] text-[#6b7079]">
        <CircleAlert className="size-[1.1em]" /> Your pages are cited because they answer the question clearly.
      </p>
    </div>
  );
}

export function SeoContentScreen() {
  const rows = [
    { t: "Root canal treatment: cost, steps and recovery", k: "root canal treatment pune", s: "Published", v: "1.2k" },
    { t: "How to choose a kids' dentist", k: "kids dentist kothrud", s: "Published", v: "860" },
    { t: "Teeth whitening: what to expect", k: "teeth whitening pune", s: "Writing", v: "" },
    { t: "Dental implants for seniors", k: "dental implants pune", s: "Planned", v: "" },
    { t: "Braces or aligners?", k: "aligners pune", s: "Planned", v: "" },
    { t: "Dental care in pregnancy", k: "dentist for pregnant women pune", s: "Planned", v: "" },
    { t: "Wisdom tooth removal: what to expect", k: "wisdom tooth removal pune", s: "Published", v: "640" },
  ];
  const tone: Record<string, string> = { Published: "bg-[#ddf3e6] text-[#1f8a55]", Writing: "bg-[#fdf3d4] text-[#a06a00]", Planned: "bg-[#f2f5f8] text-ink/70" };
  return (
    <div className="flex h-full flex-col bg-[#fbfaf9]">
      <Bar title="Content plan" sub="Pages that answer what patients search for" />
      <div className="p-[1.2em]">
        <div className="mb-[0.8em] grid grid-cols-3 gap-[0.7em]">
          {[["Pages published", "14"], ["Visits from articles", "3.1k / mo"], ["Enquiries from articles", "37 / mo"]].map(([l, v]) => (
            <div key={l} className="rounded-[0.9em] bg-white px-[0.9em] py-[0.7em] ring-1 ring-line">
              <p className="text-[0.64em] text-[#6b7079]">{l}</p>
              <p className="text-[1.2em] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-[0.9em] bg-white ring-1 ring-line">
          <div className="grid grid-cols-[2.6fr_1.6fr_0.9fr_0.8fr] gap-[0.6em] bg-[#f7f9fb] px-[1em] py-[0.55em] text-[0.66em] font-medium text-[#6b7079]">
            <span>Page</span><span>Main search</span><span>Status</span><span>Visits / mo</span>
          </div>
          {rows.map((r) => (
            <div key={r.t} className="grid grid-cols-[2.6fr_1.6fr_0.9fr_0.8fr] items-center gap-[0.6em] border-t border-line px-[1em] py-[0.7em] text-[0.72em]">
              <span className="flex items-center gap-[0.5em] font-medium"><FileText className="size-[1.1em] shrink-0 text-brand" /><span className="truncate">{r.t}</span></span>
              <span className="truncate text-[#6b7079]">{r.k}</span>
              <span><span className={`rounded-full px-[0.7em] py-[0.15em] text-[0.9em] font-medium ${tone[r.s]}`}>{r.s}</span></span>
              <span className="font-semibold">{r.v || <span className="text-[#c9ccd2]">–</span>}</span>
            </div>
          ))}
        </div>
        <p className="mt-[0.8em] flex items-center gap-[0.4em] text-[0.68em] text-[#6b7079]"><ArrowDown className="size-[1em] rotate-180 text-[#1f8a55]" /> Two new pages each month, planned around real searches.</p>
      </div>
    </div>
  );
}
