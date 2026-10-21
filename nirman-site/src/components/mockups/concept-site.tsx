import { Menu, Search, ShoppingBag, Star } from "lucide-react";
import { Photo } from "../photo";
import type { PhotoKey } from "@/content/photos";

/*
 * Concept websites shown inside browser and phone frames. Design pixels;
 * render inside a <Stage>. Photography is real; the brands are concepts.
 */

function Img({ name, className = "", sizes = "400px", position }: { name: PhotoKey; className?: string; sizes?: string; position?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo name={name} sizes={sizes} position={position} decorative />
    </div>
  );
}

/** Architecture studio, desktop. */
export function ConceptSiteDesktop({ compact = false }: { compact?: boolean }) {
  return (
    <div className="bg-[#f4efe7] text-[#231d18]">
      <div className="flex h-38 items-center justify-between px-24">
        <span className="mock-display fs-15">Terra&nbsp;Studio</span>
        <span className="flex gap-18 fs-9 text-[#231d18]/65">
          <span>Projects</span>
          <span>Studio</span>
          <span>Journal</span>
          <span>Contact</span>
        </span>
        <span className="rounded-full bg-[#c4623f] px-12 py-5 fs-9 font-medium text-white">Start a project</span>
      </div>
      <div className="relative mx-14 overflow-hidden rounded-md">
        <Img name="terracotta" className={compact ? "h-170" : "h-210"} sizes="700px" position="50% 40%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#231d18]/70 via-[#231d18]/25 to-transparent" />
        <div className="absolute bottom-20 left-22 text-white">
          <p className="fs-9 text-white/75">Residential architecture, Pune</p>
          <p className="mock-display mt-6 fs-32">
            Homes shaped
            <br />
            by light and land.
          </p>
          <span className="mt-12 inline-block rounded-full bg-white px-12 py-5 fs-9 font-medium text-[#231d18]">View projects</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 px-14 pb-16 pt-12">
        {(
          [
            ["sunlitRoom", "Courtyard House", "Nashik"],
            ["curves", "Curve Residences", "Mumbai"],
            ["beigeFacade", "Stone Pavilion", "Alibaug"],
          ] as const
        ).map(([p, t, s]) => (
          <div key={t}>
            <Img name={p} className="h-70 rounded-sm" sizes="240px" />
            <p className="mt-6 flex justify-between fs-9 font-medium">
              {t}
              <span className="font-normal text-[#231d18]/50">{s}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Architecture studio, mobile. */
export function ConceptSiteMobile() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f4efe7] text-[#231d18]">
      <div className="flex shrink-0 items-center justify-between px-14 py-8">
        <span className="mock-display fs-12">Terra Studio</span>
        <Menu className="size-14" />
      </div>
      <div className="relative mx-8 shrink-0 overflow-hidden rounded-sm">
        <Img name="terracotta" className="h-190" sizes="300px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231d18]/75 to-transparent" />
        <p className="mock-display absolute inset-x-12 bottom-12 fs-20 text-white">Homes shaped by light and land.</p>
      </div>
      <div className="px-14 pt-12">
        <p className="fs-9 leading-[1.5] text-[#231d18]/65">Quiet, climate-aware homes designed around how families live.</p>
        <span className="mt-10 block rounded-full bg-[#c4623f] py-8 text-center fs-9 font-medium text-white">View projects</span>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-6 px-8">
        <Img name="sunlitRoom" className="h-80 rounded-xs" sizes="160px" />
        <Img name="curves" className="h-80 rounded-xs" sizes="160px" />
      </div>
    </div>
  );
}

/** Ceramics storefront, used in the work section. */
export function ConceptStore() {
  const products = [
    { name: "Speckled stoneware mug", price: "₹890", photo: "mugs" as const },
    { name: "Hand-thrown cup, set of 2", price: "₹1,240", photo: "cups" as const },
    { name: "Celadon dinner plate", price: "₹1,450", photo: "plate" as const },
    { name: "Studio bowl collection", price: "₹2,680", photo: "bowlsPink" as const },
  ];
  return (
    <div className="bg-[#fbf8f3] text-[#2a211b]">
      <div className="bg-[#2a211b] py-5 text-center fs-9 text-[#f5e7d6]">Free shipping across India on orders over ₹1,500</div>
      <div className="flex h-44 items-center justify-between px-28">
        <span className="mock-display fs-20">mitti</span>
        <span className="flex gap-22 fs-10 text-black/60">
          <span>Tableware</span>
          <span>Drinkware</span>
          <span>Planters</span>
          <span>Gifting</span>
          <span>Our makers</span>
        </span>
        <span className="flex items-center gap-14 text-black/70">
          <Search className="size-13" />
          <span className="relative">
            <ShoppingBag className="size-13" />
            <span className="absolute -right-5 -top-4 grid size-10 place-items-center rounded-full bg-[#c4623f] fs-7 text-white">2</span>
          </span>
        </span>
      </div>
      <div className="grid grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-center bg-[#f1d9cf] px-36 py-30">
          <p className="fs-10 text-[#8a4a33]">The monsoon edit</p>
          <p className="mock-display mt-8 fs-40">
            Made by hand,
            <br />
            made to be used.
          </p>
          <p className="mt-12 max-w-240 fs-11 leading-[1.5] text-black/60">Small-batch stoneware from potters in Khurja and Pondicherry.</p>
          <span className="mt-16 w-fit rounded-full bg-[#2a211b] px-18 py-8 fs-10 text-white">Shop the edit</span>
        </div>
        <Img name="potter" className="h-260" sizes="640px" />
      </div>
      <div className="grid grid-cols-4 gap-14 px-28 py-22">
        {products.map((p) => (
          <div key={p.name}>
            <Img name={p.photo} className="h-130 rounded-sm" sizes="300px" />
            <p className="mt-8 fs-10 leading-tight">{p.name}</p>
            <p className="mt-3 flex items-center justify-between fs-10 tnum">
              <span className="font-semibold">{p.price}</span>
              <span className="flex items-center gap-2 text-black/50">
                <Star className="size-9 fill-[#e5a33a] text-[#e5a33a]" />
                4.8
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
