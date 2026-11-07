import { CalendarCheck, Check, ChevronRight, Image as ImageIcon, Menu, Minus, Phone, Plus, ShoppingBag, Star, Truck, Type } from "lucide-react";

/*
 * Website screens (sites we build and their reports), sized in em for
 * BrowserFrame / PhoneFrame. Demo businesses: Sunrise Dental Clinic (Pune)
 * and Masala Box (an online spice store). Prices shown belong to the demo
 * store's products, never to our services.
 */

const photo = (a: string, b: string) => `radial-gradient(circle at 30% 30%, ${a}, ${b})`;

export function WebHomeScreen() {
  return (
    <div className="h-full overflow-hidden bg-white">
      <div className="flex items-center gap-[1.6em] px-[2.4em] py-[1em] text-[0.74em]">
        <span className="flex items-center gap-[0.4em] text-[1.15em] font-semibold"><span className="size-[1.1em] rounded-full bg-brand" />Sunrise Dental</span>
        <span className="ml-auto text-[#6b7079]">Treatments</span>
        <span className="text-[#6b7079]">Kids</span>
        <span className="text-[#6b7079]">Our doctors</span>
        <span className="text-[#6b7079]">Contact</span>
        <span className="rounded-full bg-ink-2 px-[1.1em] py-[0.45em] font-medium text-white">Book a visit</span>
      </div>
      <div className="mx-[1.6em] grid grid-cols-[1.15fr_1fr] items-center gap-[1.6em] rounded-[1.4em] bg-[linear-gradient(160deg,#fbf3ed,#fff6ef)] p-[2em]">
        <div>
          <p className="text-[0.7em] font-semibold text-brand">FAMILY DENTISTRY IN KOTHRUD, PUNE</p>
          <p className="mt-[0.4em] text-[2.1em] leading-[1.08] font-semibold tracking-[-0.03em]">Gentle dental care for the whole family</p>
          <p className="mt-[0.6em] text-[0.82em] text-[#6b7079]">Open 7 days. Kids&apos; dentist on weekdays. Book online in a minute.</p>
          <div className="mt-[1em] flex gap-[0.6em] text-[0.78em]">
            <span className="flex items-center gap-[0.4em] rounded-full bg-ink-2 px-[1.2em] py-[0.6em] font-medium text-white"><CalendarCheck className="size-[1.1em]" />Book a visit</span>
            <span className="flex items-center gap-[0.4em] rounded-full px-[1.2em] py-[0.6em] font-medium ring-1 ring-ink/20"><Phone className="size-[1.1em]" />Call us</span>
          </div>
          <p className="mt-[1em] flex items-center gap-[0.3em] text-[0.7em] text-[#6b7079]"><Star className="size-[1.1em] fill-[#e0a33a] text-[#e0a33a]" /> 4.9 from 312 patient reviews</p>
        </div>
        <div className="relative h-[15em] rounded-[1.2em]" style={{ background: photo("#f6d3bf", "#e09a72") }}>
          <span className="absolute right-[1em] bottom-[1em] rounded-[0.8em] bg-white px-[0.9em] py-[0.6em] text-[0.7em] shadow-lg">
            <b className="block font-semibold">Next free slot</b>Today, 4:30 pm
          </span>
        </div>
      </div>
      <div className="mx-[1.6em] mt-[1.2em] grid grid-cols-3 gap-[0.8em]">
        {[["Check-ups and cleaning", "#fdf1ea"], ["Root canal treatment", "#eaf6ef"], ["Braces and aligners", "#f2f0fc"]].map(([t, c]) => (
          <div key={t} className="rounded-[1em] p-[1em]" style={{ background: c }}>
            <p className="text-[0.85em] font-semibold">{t}</p>
            <p className="mt-[0.3em] flex items-center gap-[0.2em] text-[0.68em] text-[#6b7079]">Learn more <ChevronRight className="size-[1em]" /></p>
          </div>
        ))}
      </div>
      <div className="mx-[1.6em] mt-[1.2em] grid grid-cols-[1fr_1.4fr] gap-[0.8em]">
        <div className="rounded-[1em] bg-ink-2 p-[1em] text-white">
          <p className="text-[0.66em] text-white/70">WHAT PATIENTS SAY</p>
          <p className="mt-[0.4em] text-[0.82em] leading-snug">“My son actually looks forward to his check-ups now.”</p>
          <p className="mt-[0.5em] text-[0.66em] text-white/70">Parent, Kothrud · Google review</p>
        </div>
        <div className="grid grid-cols-3 gap-[0.6em]">
          {[["Dr. Meera", "Kids' dentist", "#f6d3bf"], ["Dr. Arjun", "Root canals", "#e9cba4"], ["Dr. Kavya", "Braces", "#f3c3a6"]].map(([n, r, c]) => (
            <div key={n} className="rounded-[1em] bg-[#fbfaf9] p-[0.7em] ring-1 ring-line">
              <span className="block h-[3.4em] rounded-[0.7em]" style={{ background: c }} />
              <p className="mt-[0.4em] text-[0.74em] font-semibold">{n}</p>
              <p className="text-[0.62em] text-[#6b7079]">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WebMobilePages() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-[1em] py-[0.6em] text-[0.8em] font-semibold">
        <span className="flex items-center gap-[0.4em]"><span className="size-[0.9em] rounded-full bg-brand" />Sunrise Dental</span>
        <Menu className="size-[1.2em]" />
      </div>
      <div className="mx-[0.8em] rounded-[1em] bg-[linear-gradient(160deg,#fbf3ed,#fff6ef)] p-[1em]">
        <p className="text-[1.3em] leading-[1.1] font-semibold tracking-[-0.02em]">Book your visit</p>
        <p className="mt-[0.3em] text-[0.68em] text-[#6b7079]">Pick a time that suits you.</p>
      </div>
      <div className="mx-[0.8em] mt-[0.8em] flex flex-col gap-[0.5em] text-[0.72em]">
        <span className="rounded-[0.7em] px-[0.8em] py-[0.7em] ring-1 ring-line">Check-up and cleaning</span>
        <div className="grid grid-cols-3 gap-[0.4em] text-center">
          {["10:00", "12:30", "4:30"].map((t, i) => <span key={t} className={`rounded-[0.6em] py-[0.6em] ${i === 2 ? "bg-brand text-white" : "ring-1 ring-line"}`}>{t}</span>)}
        </div>
        <span className="rounded-[0.7em] px-[0.8em] py-[0.7em] text-[#6b7079] ring-1 ring-line">Your name</span>
        <span className="rounded-[0.7em] px-[0.8em] py-[0.7em] text-[#6b7079] ring-1 ring-line">WhatsApp number</span>
        <span className="mt-[0.2em] rounded-full bg-ink-2 py-[0.8em] text-center font-medium text-white">Confirm booking</span>
      </div>
    </div>
  );
}

export function WebStoreScreen() {
  return (
    <div className="grid h-full grid-cols-[1.1fr_1fr_0.85fr] bg-white">
      <div className="p-[1.4em]">
        <div className="h-full rounded-[1.2em]" style={{ background: photo("#f3c3a6", "#b8542a") }} />
      </div>
      <div className="py-[1.6em] pr-[1em]">
        <p className="text-[0.7em] text-[#6b7079]">Masala Box · Spice blends</p>
        <p className="mt-[0.3em] text-[1.5em] leading-tight font-semibold tracking-[-0.02em]">Kolhapuri masala, 200 g</p>
        <p className="mt-[0.3em] flex items-center gap-[0.3em] text-[0.7em] text-[#6b7079]"><Star className="size-[1.1em] fill-[#e0a33a] text-[#e0a33a]" /> 4.8 · 1,240 reviews</p>
        <p className="mt-[0.7em] text-[1.4em] font-semibold">₹249</p>
        <p className="mt-[0.5em] text-[0.74em] leading-relaxed text-[#6b7079]">Stone-ground in small batches. Fiery, smoky and rich, for misal and curries.</p>
        <div className="mt-[0.9em] flex items-center gap-[0.6em] text-[0.8em]">
          <span className="flex items-center gap-[0.8em] rounded-full px-[0.9em] py-[0.5em] ring-1 ring-line"><Minus className="size-[1em]" />2<Plus className="size-[1em]" /></span>
          <span className="flex-1 rounded-full bg-ink-2 py-[0.6em] text-center font-medium text-white">Add to cart</span>
        </div>
        <p className="mt-[0.8em] flex items-center gap-[0.4em] text-[0.68em] text-[#1f8a55]"><Truck className="size-[1.1em]" /> Delivery in 2 to 4 days · Cash on delivery</p>
      </div>
      <div className="border-l border-line bg-[#fbfaf9] p-[1.1em]">
        <p className="flex items-center gap-[0.4em] text-[0.8em] font-semibold"><ShoppingBag className="size-[1.1em]" /> Your cart</p>
        {[["Kolhapuri masala", "₹498", "#f3c3a6"], ["Garam masala", "₹199", "#e9cba4"]].map(([n, p, c]) => (
          <div key={n} className="mt-[0.7em] flex items-center gap-[0.6em] text-[0.7em]">
            <span className="size-[2.6em] rounded-[0.5em]" style={{ background: c }} />
            <span className="flex-1">{n}</span>
            <b className="font-semibold">{p}</b>
          </div>
        ))}
        <div className="mt-[1em] border-t border-line pt-[0.7em] text-[0.72em]">
          <p className="flex justify-between"><span>Total</span><b className="font-semibold">₹697</b></p>
          <span className="mt-[0.7em] block rounded-full bg-brand py-[0.6em] text-center font-medium text-white">Checkout</span>
          <p className="mt-[0.5em] text-center text-[0.85em] text-[#6b7079]">UPI · Cards · Cash on delivery</p>
        </div>
      </div>
    </div>
  );
}

export function WebSpeedScreen() {
  const scores = [["Performance", 98], ["Accessibility", 100], ["Best practices", 100], ["SEO", 100]] as const;
  return (
    <div className="flex h-full flex-col bg-[#fbfaf9] p-[1.4em]">
      <p className="text-[1.15em] font-semibold tracking-[-0.02em]">Launch check: sunrise-clinic.in</p>
      <p className="text-[0.72em] text-[#6b7079]">Mobile test before going live</p>
      <div className="mt-[1.2em] grid grid-cols-4 gap-[0.8em]">
        {scores.map(([l, v]) => (
          <div key={l} className="flex flex-col items-center rounded-[1em] bg-white py-[1.1em] ring-1 ring-line">
            <div className="relative size-[5.5em]">
              <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e6f5ec" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#1f8a55" strokeWidth="3" strokeDasharray={`${v} 100`} strokeLinecap="round" pathLength="100" />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[1.5em] font-semibold text-[#1f8a55]">{v}</span>
            </div>
            <p className="mt-[0.5em] text-[0.74em] font-medium">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-[0.9em] grid grid-cols-3 gap-[0.8em]">
        {[["Page shows", "1.1 s"], ["Ready to use", "1.6 s"], ["Layout shift", "0.01"]].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between rounded-[0.8em] bg-white px-[1em] py-[0.8em] text-[0.74em] ring-1 ring-line">
            <span className="flex items-center gap-[0.4em]"><Check className="size-[1.1em] text-[#1f8a55]" strokeWidth={3} />{l}</span>
            <b className="font-semibold">{v}</b>
          </div>
        ))}
      </div>
      <div className="mt-[0.9em] grid grid-cols-2 gap-x-[1.2em] gap-y-[0.7em] rounded-[1em] bg-white p-[1em] text-[0.72em] ring-1 ring-line">
        {["Booking form tested on 6 phones", "Enquiries reach WhatsApp and email", "Sitemap sent to Google", "Old addresses redirect to new pages", "Analytics and call tracking on", "Backups every night", "SSL certificate active", "Every login handed over"].map((t) => (
          <p key={t} className="flex items-center gap-[0.5em]"><Check className="size-[1.1em] shrink-0 text-[#1f8a55]" strokeWidth={3} />{t}</p>
        ))}
      </div>
    </div>
  );
}

export function WebEditorScreen() {
  return (
    <div className="grid h-full grid-cols-[13em_1fr_15em] bg-[#fbfaf9]">
      <div className="border-r border-line bg-white p-[0.9em] text-[0.74em]">
        <p className="mb-[0.6em] font-semibold">Pages</p>
        {["Home", "Treatments", "Kids' dentist", "Our doctors", "Blog", "Contact"].map((p, i) => (
          <p key={p} className={`rounded-[0.5em] px-[0.6em] py-[0.45em] ${i === 2 ? "bg-[#fdf1ea] font-medium text-brand" : "text-ink/75"}`}>{p}</p>
        ))}
      </div>
      <div className="p-[1.2em]">
        <div className="h-full rounded-[1em] bg-white p-[1.2em] ring-1 ring-line">
          <p className="text-[0.66em] text-[#6b7079]">Kids&apos; dentist · Editing</p>
          <p className="mt-[0.4em] rounded-[0.4em] text-[1.4em] font-semibold tracking-[-0.02em] ring-2 ring-brand/60">A kids&apos; dentist who makes visits easy</p>
          <p className="mt-[0.6em] text-[0.76em] leading-relaxed text-[#6b7079]">Dr. Meera sees children on weekdays and Saturday mornings. Short visits, simple words and a small gift at the end.</p>
          <div className="mt-[0.9em] h-[6em] rounded-[0.8em]" style={{ background: photo("#f6d3bf", "#e9a882") }} />
          <p className="mt-[0.9em] text-[0.9em] font-semibold">What a first visit looks like</p>
          <div className="mt-[0.5em] grid grid-cols-3 gap-[0.5em] text-[0.68em]">
            {["Meet the dentist", "A gentle check-up", "Tips to take home"].map((t, i) => (
              <span key={t} className="rounded-[0.6em] bg-[#fbfaf9] p-[0.6em] ring-1 ring-line"><b className="block text-brand">0{i + 1}</b>{t}</span>
            ))}
          </div>
          <span className="mt-[0.9em] inline-flex rounded-full bg-ink-2 px-[1.1em] py-[0.5em] text-[0.72em] font-medium text-white">Book a kids&apos; visit</span>
        </div>
      </div>
      <div className="border-l border-line bg-white p-[0.9em] text-[0.72em]">
        <p className="font-semibold">Block</p>
        <div className="mt-[0.6em] grid grid-cols-2 gap-[0.4em]">
          {[[Type, "Heading"], [ImageIcon, "Image"]].map(([I, t]) => {
            const Icon = I as typeof Type;
            return <span key={t as string} className="flex flex-col items-center gap-[0.3em] rounded-[0.6em] py-[0.7em] ring-1 ring-line"><Icon className="size-[1.2em]" />{t as string}</span>;
          })}
        </div>
        <p className="mt-[0.9em] font-semibold">Search preview</p>
        <div className="mt-[0.4em] rounded-[0.6em] bg-[#fbfaf9] p-[0.6em]">
          <p className="text-[0.9em] text-[#6b7079]">sunrise-clinic.in › kids-dentist</p>
          <p className="font-medium text-brand">Kids&apos; dentist in Kothrud, Pune</p>
        </div>
        <span className="mt-[1em] block rounded-full bg-ink-2 py-[0.6em] text-center font-medium text-white">Publish</span>
      </div>
    </div>
  );
}
