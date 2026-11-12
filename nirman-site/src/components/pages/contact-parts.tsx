import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";

/*
 * Ways to reach us (docs/sections/p4-contact-about.md). The WhatsApp row is
 * a plain chat icon: no WhatsApp logo in our artwork (client rule). Phone,
 * The address is still a placeholder in content/site.ts.
 */
const allChannels = [
  ...site.phones.map((p, i) => ({ key: `call-${i}`, Icon: Phone, label: site.phones.length > 1 ? `Call us (line ${i + 1})` : "Call us", value: p, href: `tel:${p.replace(/\s/g, "")}` as string | undefined, note: "Working hours, IST" })),
  { key: "wa", Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}`, note: "Usually the quickest" },
  { key: "mail", Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Reply within 2 working hours" },
  { key: "office", Icon: MapPin, label: "Office", value: site.address, href: undefined, note: "We work with clients remotely" },
] as const;
/** Rows without a real value are left out (WhatsApp until a number is confirmed). */
export const channels = allChannels.filter((c) => c.key !== "wa" || site.whatsapp);

export function Channels({ dark = false, grid = false }: { dark?: boolean; grid?: boolean }) {
  return (
    <ul className={grid ? `grid grid-cols-1 gap-3 sm:grid-cols-2 ${channels.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}` : "flex flex-col"}>
      {channels.map(({ key, Icon, label, value, href, note }) => {
        const inner = (
          <>
            <span className={`grid size-11 shrink-0 place-items-center rounded-full ${dark ? "bg-white/8 text-[#ff9a62] ring-1 ring-white/12" : "bg-[#fdeee4] text-brand"}`}><Icon className="size-5" aria-hidden /></span>
            <span className="min-w-0 flex-1">
              <span className={`block text-[0.78rem] ${dark ? "text-white/60" : "text-muted"}`}>{label} · {note}</span>
              <span className="block truncate text-[1.05rem] font-medium">{value}</span>
            </span>
            {href && <ArrowUpRight className={`size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dark ? "text-white/50" : "text-muted"}`} aria-hidden />}
          </>
        );
        const cls = `group flex items-center gap-4 py-4 ${grid ? `rounded-[1.25rem] px-5 ${dark ? "bg-white/6 ring-1 ring-white/12" : "bg-white ring-1 ring-line"}` : `border-b ${dark ? "border-white/12" : "border-line"}`}`;
        return (
          <li key={key} className="rv">
            {href ? (
              <a href={href} {...(key === "wa" ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "hover:text-[#ffb98f] focus-visible:outline-white" : "hover:text-brand focus-visible:outline-brand"}`}>{inner}</a>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
