import type { ReactNode } from "react";

/*
 * Frames for service screens (docs/sections/p1-services.md, redo 2026-11-07).
 * Like the Nirman CRM AppFrame: everything inside is sized in em and the
 * base size follows the frame's width (container query units), so screens
 * scale like screenshots but stay sharp. Pictures of the product: aria-hidden
 * (the section text carries the meaning).
 */

export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div
        aria-hidden
        className="flex aspect-[16/9.4] w-full flex-col overflow-hidden rounded-[1.1em] bg-surface text-[1.18cqw] text-ink shadow-[0_2.5em_5em_-1.5em_rgba(18,20,24,0.3),0_0_0_1px_rgba(5,7,12,0.06)]"
      >
        <div className="flex h-[2.4em] shrink-0 items-center gap-[0.45em] border-b border-line bg-[#f7f9fb] px-[1em]">
          <span className="size-[0.7em] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.7em] rounded-full bg-[#febc2e]" />
          <span className="size-[0.7em] rounded-full bg-[#28c840]" />
          <span className="mx-auto rounded-full bg-white px-[1.6em] py-[0.2em] text-[0.72em] text-[#6b7079] ring-1 ring-line">{url}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`@container ${className}`}>
      <div aria-hidden className="relative aspect-[9/19] w-full overflow-hidden rounded-[13cqw] bg-ink-2 p-[2.6cqw] shadow-[0_2em_4em_-1em_rgba(18,20,24,0.4)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[10.5cqw] bg-white text-[4.4cqw] text-ink">
          <div className="flex shrink-0 items-center justify-between px-[1.4em] pt-[0.9em] pb-[0.3em] text-[0.7em] font-semibold">
            <span>9:41</span>
            <span className="h-[0.6em] w-[1.4em] rounded-[0.2em] border border-ink/60" />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
