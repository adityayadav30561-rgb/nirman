import { Boxes, ChartColumn, ClipboardList, Code, Database, Factory, LayoutDashboard, Plus, Search, Settings, Smartphone, Truck, Users } from "lucide-react";
import { Stage } from "../stage";
import { Photo } from "../photo";
import { ServiceCard } from "./service-copy";

const stages = [
  {
    name: "Cutting",
    tone: "bg-cobalt",
    orders: [
      { id: "WO-2318", item: "Teak dining table x 4", client: "Haveli Hotels", due: "Oct 24", p: 30 },
      { id: "WO-2321", item: "Reception desk", client: "Lumen Realty", due: "Oct 27", p: 10 },
    ],
  },
  {
    name: "Assembly",
    tone: "bg-marigold",
    orders: [
      { id: "WO-2305", item: "Wardrobe units x 12", client: "Greenfield PG", due: "Oct 22", p: 65, late: true },
      { id: "WO-2309", item: "Bookshelves x 6", client: "Ashoka School", due: "Oct 25", p: 50 },
    ],
  },
  {
    name: "Quality check",
    tone: "bg-lilac",
    orders: [{ id: "WO-2297", item: "Office chairs x 40", client: "Saarthi Logistics", due: "Oct 21", p: 90 }],
  },
  {
    name: "Ready to dispatch",
    tone: "bg-mint",
    orders: [
      { id: "WO-2290", item: "Bed frames x 8", client: "Kestrel Foods", due: "Oct 21", p: 100 },
      { id: "WO-2288", item: "Lounge sofas x 3", client: "Café Nilgiri", due: "Oct 20", p: 100 },
    ],
  },
];

export function SoftwareService() {
  return (
    <ServiceCard
      id="svc-software"
      tone="ink"
      icon={Code}
      name="Custom software development"
      title="Software shaped around how your business actually runs."
      body="When spreadsheets and off-the-shelf tools stop fitting, we build internal systems for operations, inventory, production and approvals, connected to the accounting and messaging tools you already depend on."
      points={["Operations and inventory systems", "Customer and vendor portals", "Workflow and approval automation", "Integrations with ERP and payments"]}
      extra={
        <div className="mt-6 max-sm:hidden">
          <ArchitectureNote />
        </div>
      }
      visual={
        <Stage w={520} h={357} wLg={960} hLg={627} label="A craftsman in a furniture workshop, overlaid with the production dashboard built to run it">
          <div className="absolute left-0 top-0 h-660 w-520 overflow-hidden rounded-2xl lg:w-380">
            <Photo name="workshop" sizes="(min-width: 1024px) 20vw, 90vw" position="40% 50%" />
          </div>
          <div className="absolute left-20 top-60 h-420 w-480 lg:left-170 lg:top-50 lg:h-600 lg:w-790">
            <OpsDashboard />
          </div>
        </Stage>
      }
    />
  );
}

/** A small system diagram explaining how the custom app connects. */
function ArchitectureNote() {
  const box = "flex items-center gap-2 whitespace-nowrap rounded-full bg-white/8 px-3 py-1.5 text-[0.8rem] text-white ring-1 ring-white/12";
  return (
    <figure className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
      <figcaption className="text-[0.875rem] text-white/60">How a typical system connects</figcaption>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div className="space-y-2">
          <span className={box}>
            <LayoutDashboard className="size-3.5 text-mint" />
            Web app
          </span>
          <span className={box}>
            <Smartphone className="size-3.5 text-mint" />
            Floor app
          </span>
        </div>
        <span className="h-px w-4 bg-white/30" />
        <span className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-peacock px-3 py-2 text-[0.8rem] font-medium text-white">
          <Database className="size-3.5" />
          Core API
        </span>
        <span className="h-px w-4 bg-white/30" />
        <div className="space-y-2">
          <span className={box}>Accounting</span>
          <span className={box}>WhatsApp</span>
          <span className={box}>Courier</span>
        </div>
      </div>
    </figure>
  );
}

function OpsDashboard() {
  return (
    <div className="absolute inset-0 flex overflow-hidden rounded-t-xl bg-surface text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] max-lg:rounded-b-xl">
      <aside className="hidden w-190 shrink-0 flex-col bg-paper p-16 lg:flex">
        <div className="flex items-center gap-8">
          <span className="grid size-28 place-items-center rounded-md bg-peacock text-white">
            <Factory className="size-14" />
          </span>
          <span className="leading-tight">
            <span className="block fs-12 font-semibold">Shilpa Works</span>
            <span className="block fs-9 text-ink-3">Operations</span>
          </span>
        </div>
        <nav className="mt-22 space-y-2 fs-11">
          {[
            [LayoutDashboard, "Overview"],
            [ClipboardList, "Work orders"],
            [Boxes, "Inventory"],
            [Truck, "Dispatch"],
            [Users, "Customers"],
            [ChartColumn, "Reports"],
            [Settings, "Settings"],
          ].map(([Icon, label], i) => {
            const I = Icon as typeof LayoutDashboard;
            return (
              <span key={label as string} className={`flex items-center gap-8 rounded-full px-10 py-6 ${i === 1 ? "bg-ink font-medium text-white" : "text-ink-2"}`}>
                <I className="size-13" />
                {label as string}
              </span>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg bg-marigold-soft p-10 fs-10 leading-snug text-[#7a5200]">
          Low stock: teak planks below 40 units. Reorder suggested.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-12 border-b border-ink/8 px-18 py-12">
          <div>
            <p className="mock-display fs-16">Work orders</p>
            <p className="fs-10 text-ink-3">Week of 20 October</p>
          </div>
          <div className="flex items-center gap-8">
            <span className="hidden items-center gap-6 rounded-full bg-paper px-12 py-6 fs-10 text-ink-3 lg:flex">
              <Search className="size-11" />
              Search orders, clients
            </span>
            <span className="flex items-center gap-4 rounded-full bg-peacock px-12 py-6 fs-10 font-medium text-white">
              <Plus className="size-11" />
              New order
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 px-18 pt-14 lg:grid-cols-4">
          {[
            { k: "In production", v: "42", s: "orders", c: "bg-cobalt-soft" },
            { k: "Due this week", v: "18", s: "3 at risk", c: "bg-coral-soft" },
            { k: "Dispatched on time", v: "94%", s: "last 30 days", c: "bg-mint-soft" },
            { k: "Machine utilisation", v: "76%", s: "target 80%", c: "bg-marigold-soft" },
          ].map((m, i) => (
            <div key={m.k} className={`rounded-lg p-12 ${m.c} ${i > 1 ? "max-lg:hidden" : ""}`}>
              <p className="fs-10 text-ink-2">{m.k}</p>
              <p className="mock-display mt-4 fs-24 tnum">{m.v}</p>
              <p className={`fs-9 ${m.s.includes("risk") ? "font-medium text-signal-red" : "text-ink-3"}`}>{m.s}</p>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-10 overflow-hidden px-18 pb-18 pt-14 lg:grid-cols-4">
          {stages.map((s, si) => (
            <div key={s.name} className={`flex flex-col rounded-lg bg-paper p-8 ${si > 1 ? "max-lg:hidden" : ""}`}>
              <div className="flex items-center justify-between px-4 pb-8 fs-10">
                <span className="flex items-center gap-6 font-medium">
                  <span className={`size-7 rounded-full ${s.tone}`} />
                  {s.name}
                </span>
                <span className="rounded-full bg-surface px-6 py-1 text-ink-3 tnum">{s.orders.length}</span>
              </div>
              <div className="space-y-8">
                {s.orders.map((o) => (
                  <div key={o.id} className="rounded-md bg-surface p-10 shadow-[0_1px_2px_rgb(22_24_27/0.06)]">
                    <div className="flex items-center justify-between fs-9 text-ink-3 tnum">
                      <span>{o.id}</span>
                      <span className={o.late ? "font-medium text-signal-red" : ""}>Due {o.due}</span>
                    </div>
                    <p className="mt-4 fs-11 font-medium leading-tight">{o.item}</p>
                    <p className="fs-10 text-ink-3">{o.client}</p>
                    <div className="mt-8 h-4 rounded-full bg-paper-2">
                      <div
                        className={`h-full rounded-full ${o.p === 100 ? "bg-forest-2" : o.late ? "bg-signal-red" : "bg-peacock"}`}
                        style={{ width: `${o.p}%` }}
                      />
                    </div>
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
