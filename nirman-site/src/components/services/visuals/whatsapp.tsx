import type { ReactNode } from "react";
import { ArrowLeft, Camera, CheckCheck, EllipsisVertical, Mic, Paperclip, Phone as PhoneIcon, Smile } from "lucide-react";
import { Phone } from "@/components/services/kit";

/*
 * A chat phone in the look of the WhatsApp app (green header, beige
 * wallpaper, pale green sent bubbles, blue ticks). No WhatsApp logo anywhere
 * (client rule). Sizes in em.
 */

export function In({ children, time }: { children: ReactNode; time: string }) {
  return (
    <span className="max-w-[86%] shrink-0 self-start rounded-[0.7em] rounded-tl-[0.15em] bg-white px-[0.6em] pt-[0.4em] pb-[0.3em] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
      <span className="block text-[0.62em] leading-snug text-[#111b21]">{children}</span>
      <span className="block text-right text-[0.44em] text-[#667781]">{time}</span>
    </span>
  );
}

export function Out({ children, time }: { children: ReactNode; time: string }) {
  return (
    <span className="max-w-[86%] shrink-0 self-end rounded-[0.7em] rounded-tr-[0.15em] bg-[#d9fdd3] px-[0.6em] pt-[0.4em] pb-[0.3em] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
      <span className="block text-[0.62em] leading-snug text-[#111b21]">{children}</span>
      <span className="flex items-center justify-end gap-[0.2em] text-[#667781]"><span className="text-[0.44em]">{time}</span><CheckCheck className="size-[0.72em] text-[#53bdeb]" /></span>
    </span>
  );
}

/** Sent template with tappable buttons under it. */
export function Template({ title, line, buttons, time }: { title: string; line: string; buttons: string[]; time: string }) {
  return (
    <span className="w-[86%] shrink-0 self-end overflow-hidden rounded-[0.7em] rounded-tr-[0.15em] bg-[#d9fdd3] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
      <span className="block px-[0.6em] pt-[0.45em] pb-[0.3em]">
        <span className="block text-[0.64em] font-semibold text-[#111b21]">{title}</span>
        <span className="block text-[0.58em] leading-snug text-[#111b21]">{line}</span>
        <span className="flex items-center justify-end gap-[0.2em] text-[#667781]"><span className="text-[0.44em]">{time}</span><CheckCheck className="size-[0.72em] text-[#53bdeb]" /></span>
      </span>
      {buttons.map((b) => (
        <span key={b} className="block border-t border-[#b9e6b1] py-[0.42em] text-center text-[#027eb5]"><span className="block text-[0.6em] font-medium">{b}</span></span>
      ))}
    </span>
  );
}

export function WaPhone({ name, initials, className = "", depth, children }: { name: string; initials: string; className?: string; depth?: number; children: ReactNode }) {
  return (
    <Phone depth={depth} bar="bg-[#008069]" light className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-[0.45em] bg-[#008069] px-[0.6em] pb-[0.55em] text-white">
          <ArrowLeft className="size-[0.9em]" />
          <span className="grid size-[1.9em] shrink-0 place-items-center rounded-full bg-[#dfe5e7] text-[#54656f]"><span className="text-[0.56em] font-semibold">{initials}</span></span>
          <span className="min-w-0 flex-1"><span className="block truncate text-[0.7em] font-semibold">{name}</span><span className="block text-[0.5em] text-white/80">online</span></span>
          <PhoneIcon className="size-[0.8em]" /><EllipsisVertical className="size-[0.85em]" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[0.4em] overflow-hidden bg-[#efeae2] bg-[radial-gradient(rgba(11,20,26,0.05)_1px,transparent_1px)] bg-[size:0.9em_0.9em] p-[0.6em]">
          <span className="self-center rounded-[0.5em] bg-white/90 px-[0.6em] py-[0.15em] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"><span className="block text-[0.46em] font-medium text-[#54656f]">TODAY</span></span>
          {children}
        </div>
        <div className="flex items-center gap-[0.35em] bg-[#efeae2] px-[0.5em] pb-[0.6em]">
          <span className="flex flex-1 items-center gap-[0.4em] rounded-full bg-white px-[0.6em] py-[0.42em] text-[#54656f]">
            <Smile className="size-[0.85em]" /><span className="flex-1 text-[0.6em]">Message</span><Paperclip className="size-[0.8em]" /><Camera className="size-[0.85em]" />
          </span>
          <span className="grid size-[2em] shrink-0 place-items-center rounded-full bg-[#00a884] text-white"><Mic className="size-[0.9em]" /></span>
        </div>
      </div>
    </Phone>
  );
}
