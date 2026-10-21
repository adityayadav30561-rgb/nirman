import Image from "next/image";
import { ArrowRight, Plus, ShoppingBag, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { Stage } from "./stage";
import { Photo } from "./photo";
import { LogoMark } from "./logo";
import { ButtonLink } from "./ui/button-link";
import { Device, PhoneFrame } from "./mockups/frames";
import { ConceptSiteDesktop } from "./mockups/concept-site";
import { heroPhoto } from "@/content/devices";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden lg:h-svh lg:min-h-[36rem]">
      <div className="container-site relative z-10 pt-28 sm:pt-32 lg:flex lg:h-full lg:items-center lg:pb-0 lg:pt-16">
        <div className="max-w-[38rem] lg:w-[42%] lg:max-w-none">
          <h1 className="display text-[clamp(2.9rem,10.5vw,4.8rem)] text-ink lg:text-[min(5.4vw,8.5rem)]">
            {hero.headline.map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[31rem] text-[1.2rem] leading-[1.55] text-ink-2 lg:mt-[1.6vw] lg:max-w-[34vw] lg:text-[clamp(1.2rem,1.25vw,1.75rem)]">
            {hero.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 lg:mt-[2.4vw] 2xl:[&>a]:h-16 2xl:[&>a]:px-8 2xl:[&>a]:text-[1.15rem]">
            <ButtonLink href={hero.primary.href} variant="primary" size="lg">
              {hero.primary.label}
              <ArrowRight className="size-4.5" />
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
              <ArrowRight className="size-4.5" />
            </ButtonLink>
          </div>
          <p className="mt-4 text-[0.95rem] text-ink-3 lg:mt-[1vw] lg:text-[clamp(0.95rem,0.9vw,1.25rem)]">{hero.note}</p>
        </div>
      </div>

      <Workspace />
    </section>
  );
}

/**
 * A real photograph of an iMac on an oak desk, with a real laptop and phone
 * placed in front of it. All three screens carry Nirman work: a client
 * website, the Nirman CRM pipeline and a shop app. The scene is authored in
 * the photo's own pixels (2400 x 1600) through a <Stage>.
 */
function Workspace() {
  const { imac } = heroPhoto;
  const w = imac.tr[0] - imac.tl[0];
  const h = imac.bl[1] - imac.tl[1];
  // Near-front-on photo, so an affine fit of the display is exact enough.
  const skew: CSSProperties = {
    transform: `matrix(1, ${(imac.tr[1] - imac.tl[1]) / w}, ${(imac.bl[0] - imac.tl[0]) / h}, 1, 0, 0)`,
    transformOrigin: "0 0",
  };

  return (
    <div
      className="relative mt-10 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-[60%]"
      role="img"
      aria-label="An iMac showing a client website, a laptop running the Nirman CRM sales pipeline, and a phone showing a shop app, on an oak desk"
    >
      {/* Phones and tablets: a fixed crop of the photo. Desktop: the photo
          covers the right side at the hero's height, centred on the desk. */}
      <div className="relative aspect-[2150/1390] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
        {/* Desktop: continue the wall above the photograph (colours sampled
            from its top edge) so there is no hard line under the header. */}
        <div className="absolute inset-x-0 top-0 hidden h-48 bg-[linear-gradient(90deg,#d6d6d4,#cbcac5_30%,#c3c0b9_55%,#c2bcb0_80%,#c5bdb0)] lg:block" />
        <div className="absolute left-[-11.63%] top-[-2.88%] w-[111.63%] lg:left-[55%] lg:top-12 lg:w-[108%] lg:-translate-x-1/2 lg:[mask-image:linear-gradient(to_bottom,transparent,black_5%,black_88%,transparent)]">
          <Stage w={heroPhoto.w} h={heroPhoto.h}>
            <Image src={heroPhoto.src} alt="" fill priority sizes="(min-width: 1024px) 70vw, 115vw" className="object-cover" />

            {/* iMac display */}
            <div
              className="absolute overflow-hidden bg-surface"
              style={{
                left: `calc(var(--spacing) * ${imac.tl[0]})`,
                top: `calc(var(--spacing) * ${imac.tl[1]})`,
                width: `calc(var(--spacing) * ${w})`,
                height: `calc(var(--spacing) * ${h})`,
                ...skew,
              }}
            >
              <Stage w={560} h={Math.round((560 * h) / w)}>
                <ConceptSiteDesktop compact />
              </Stage>
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.10),transparent_40%,transparent_70%,rgb(0_0_0/0.06))]" />
            </div>

            {/* laptop in front, left of centre */}
            <div className="absolute left-560 top-745 w-880">
              <Device device="macbook" imgClassName="[filter:sepia(0.08)_brightness(0.97)]">
                <Stage w={640} h={401}>
                  <CrmScreen />
                </Stage>
              </Device>
            </div>

            {/* phone on a dock, front right */}
            <div className="absolute left-1660 top-850 w-230">
              <PhoneFrame time="9:41">
                <ShopApp />
              </PhoneFrame>
              <div className="relative -mx-[8%] -mt-[6%] h-26 rounded-[calc(var(--spacing)*8)] bg-gradient-to-b from-forest-2 to-forest shadow-[0_18px_24px_-14px_rgb(0_0_0/0.6)]" />
            </div>

            {/* warm window light over the whole scene */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgb(255_240_215/0.16),transparent_45%)]" />
          </Stage>
        </div>
      </div>

      {/* blend the photograph into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[16%] bg-gradient-to-r from-paper via-paper/60 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-paper to-transparent lg:h-36 lg:from-paper lg:via-paper/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-paper to-transparent lg:h-24" />
    </div>
  );
}

/* --------------------------- laptop: CRM --------------------------- */

const columns = [
  {
    name: "New enquiry",
    count: 12,
    total: "₹9.8L",
    bar: "bg-sage-3",
    deals: [
      ["Kestrel Foods", "Ritu Malhotra", "₹1.2L", "PN"],
      ["Vardhan Clinics", "Dr. Sameer V.", "₹80K", "RK"],
      ["Bluepine Schools", "Neha Joshi", "₹2.6L", "PN"],
    ],
  },
  {
    name: "Contacted",
    count: 9,
    total: "₹11.2L",
    bar: "bg-moss",
    deals: [
      ["Oakline Tiles", "Farhan Ali", "₹1.9L", "AS"],
      ["Greenfield PG", "Kavya Rao", "₹3.1L", "RK"],
    ],
  },
  {
    name: "Proposal sent",
    count: 6,
    total: "₹14.5L",
    bar: "bg-forest-2",
    deals: [
      ["Lumen Interiors", "Rahul Desai", "₹3.4L", "PN"],
      ["Haveli Hotels", "Arjun Mehta", "₹5.2L", "AS"],
    ],
  },
  {
    name: "Won",
    count: 7,
    total: "₹16.3L",
    bar: "bg-marigold",
    deals: [
      ["Saarthi Logistics", "Vikram Singh", "₹4.1L", "RK"],
      ["Café Nilgiri", "Anita George", "₹1.5L", "PN"],
    ],
  },
];

function CrmScreen() {
  return (
    <div className="absolute inset-0 flex bg-surface text-ink">
      <aside className="flex w-128 shrink-0 flex-col bg-[#f3f1ea] px-10 py-12">
        <div className="flex items-center gap-6 px-4">
          <LogoMark className="size-18" tone="forest" />
          <span className="fs-11 font-semibold tracking-[-0.01em]">Nirman CRM</span>
        </div>
        <nav className="mt-16 space-y-2 fs-10">
          {["Dashboard", "Leads", "Pipeline", "Contacts", "Follow-ups", "Reports"].map((n) => (
            <span
              key={n}
              className={`flex items-center justify-between rounded-full px-10 py-5 ${n === "Pipeline" ? "bg-forest font-medium text-mint" : "text-ink-2"}`}
            >
              {n}
              {n === "Follow-ups" && <span className="rounded-full bg-marigold-soft px-5 fs-8 text-[#7a5200]">6</span>}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-6 border-t border-ink/8 px-4 pt-10">
          <span className="grid size-18 place-items-center rounded-full bg-forest fs-8 font-semibold text-mint">AS</span>
          <span className="leading-tight">
            <span className="block fs-9 font-medium">Anil Shah</span>
            <span className="block fs-8 text-ink-3">Sales head</span>
          </span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col p-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="mock-display fs-16">Sales pipeline</p>
            <p className="fs-9 text-ink-3">All owners, October to December</p>
          </div>
          <div className="flex items-center gap-12">
            <div className="text-right leading-tight">
              <p className="fs-8 text-ink-3">Open value</p>
              <p className="fs-14 font-semibold tnum">₹44.4L</p>
            </div>
            <span className="flex items-center gap-4 rounded-full bg-forest px-10 py-6 fs-9 font-medium text-mint">
              <Plus className="size-10" />
              New lead
            </span>
          </div>
        </div>

        <div className="mt-12 grid min-h-0 flex-1 grid-cols-4 gap-8">
          {columns.map((c) => (
            <div key={c.name} className="flex min-h-0 flex-col rounded-lg bg-paper p-6">
              <span className={`block h-3 rounded-full ${c.bar}`} />
              <div className="mt-6 flex items-center justify-between px-2 fs-9 font-medium">
                {c.name}
                <span className="rounded-full bg-surface px-5 fs-8 text-ink-3 tnum">{c.count}</span>
              </div>
              <p className="px-2 fs-8 text-ink-3 tnum">{c.total}</p>
              <div className="mt-6 space-y-5 overflow-hidden">
                {c.deals.map(([co, who, v, o]) => (
                  <div key={co} className="rounded-md bg-surface p-7 shadow-[0_1px_2px_rgb(22_24_27/0.07)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="min-w-0 leading-tight">
                        <span className="block truncate fs-9 font-medium">{co}</span>
                        <span className="block truncate fs-8 text-ink-3">{who}</span>
                      </span>
                      <span
                        className={`grid size-15 shrink-0 place-items-center rounded-full fs-7 font-semibold ${
                          o === "AS" ? "bg-forest text-mint" : o === "RK" ? "bg-marigold-soft text-[#7a5200]" : "bg-mint-soft text-forest"
                        }`}
                      >
                        {o}
                      </span>
                    </div>
                    <p className="mt-5 fs-9 font-semibold tnum">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- phone: shop --------------------------- */

function ShopApp() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-14 py-6">
        <span className="mock-display fs-16">mitti</span>
        <span className="relative">
          <ShoppingBag className="size-14" />
          <span className="absolute -right-4 -top-3 grid size-10 place-items-center rounded-full bg-forest fs-7 text-mint">2</span>
        </span>
      </div>
      <div className="relative mx-10 h-180 overflow-hidden rounded-xl">
        <Photo name="mugs" sizes="240px" decorative />
        <span className="absolute left-8 top-8 rounded-full bg-surface/95 px-8 py-3 fs-8 font-medium">Handmade in Khurja</span>
      </div>
      <div className="px-14 pt-10">
        <div className="flex items-start justify-between gap-6">
          <p className="mock-display fs-14">Speckled stoneware mug</p>
          <p className="fs-13 font-semibold tnum">₹890</p>
        </div>
        <p className="mt-4 flex items-center gap-3 fs-9 text-ink-3">
          <Star className="size-9 fill-marigold text-marigold" />
          4.8 from 312 reviews
        </p>
        <div className="mt-10 flex gap-6">
          {["#e9e2d4", "#9fb29b", "#2b3a33"].map((c, i) => (
            <span key={c} className={`size-16 rounded-full ring-2 ${i === 0 ? "ring-forest" : "ring-transparent"}`} style={{ background: c }} />
          ))}
        </div>
        <span className="mt-12 block rounded-full bg-forest py-9 text-center fs-11 font-medium text-mint">Add to bag</span>
      </div>
      <p className="mx-14 mt-12 fs-9 font-medium">You may also like</p>
      <div className="mx-10 mt-6 grid grid-cols-2 gap-6">
        <div className="relative h-56 overflow-hidden rounded-md">
          <Photo name="cups" sizes="120px" decorative />
        </div>
        <div className="relative h-56 overflow-hidden rounded-md">
          <Photo name="plate" sizes="120px" decorative />
        </div>
      </div>
    </div>
  );
}
