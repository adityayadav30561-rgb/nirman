"use client";

import { useEffect, useState } from "react";
import { Building2, Globe2, UserRound } from "lucide-react";
import { places } from "@/content/map";

/*
 * Live clocks: the time now at our office in India, in the markets we serve
 * and where the visitor is (docs/sections/p4-contact-about.md). Times come
 * from the browser (Intl), so they are real; before the page hydrates the
 * clocks show a dash, which avoids a server and client mismatch.
 */
const fmt = (d: Date, tz?: string) => new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(d);
const day = (d: Date, tz?: string) => new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: tz }).format(d);

export function WorldClocks({ dark = false }: { dark?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);
  const rows = [
    ...places.map((p) => ({ key: p.key, name: p.name, note: p.role === "office" ? "Our office" : "Market we serve", tz: p.tz as string | undefined, Icon: p.role === "office" ? Building2 : Globe2, office: p.role === "office" })),
    { key: "you", name: "Your time", note: "Where you are now", tz: undefined, Icon: UserRound, office: false },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      {rows.map(({ key, name, note, tz, Icon, office }) => (
        <li key={key} className={`rv rounded-[1.25rem] p-5 ${office ? "bg-brand text-white" : dark ? "bg-white/6 text-white ring-1 ring-white/12" : "bg-white ring-1 ring-line"} ${key === "you" ? "max-md:col-span-2" : ""}`}>
          <span className="flex items-center gap-2 text-[0.82rem] font-medium">
            <Icon className="size-4 opacity-80" aria-hidden />
            {name}
          </span>
          <span className="mt-4 block text-[1.7rem] leading-none font-light tracking-[-0.02em] tabular-nums" suppressHydrationWarning>
            {now ? fmt(now, tz) : "–:––"}
          </span>
          <span className={`mt-2 block text-[0.78rem] ${office ? "text-white/85" : dark ? "text-white/65" : "text-muted"}`}>
            {now ? `${day(now, tz)} · ` : ""}
            {note}
          </span>
        </li>
      ))}
    </ul>
  );
}
