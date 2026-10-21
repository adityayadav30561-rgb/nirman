import type { CSSProperties, ReactNode } from "react";

type StageProps = {
  /** Design width in px below the lg breakpoint. */
  w: number;
  /** Design height in px below the lg breakpoint. */
  h: number;
  /** Design width from lg up (defaults to w). */
  wLg?: number;
  /** Design height from lg up (defaults to h). */
  hLg?: number;
  className?: string;
  innerClassName?: string;
  label?: string;
  children: ReactNode;
};

/**
 * Container that scales a fixed-size mockup composition to its width.
 * Inside, Tailwind spacing utilities resolve to design pixels (`w-320` is
 * 320 design px) and `.fs-*` classes set type in design pixels.
 */
export function Stage({ w, h, wLg, hLg, className, innerClassName, label, children }: StageProps) {
  // Always set the lg values too: custom properties inherit, so a stage
  // nested inside another would otherwise pick up its parent's sizes.
  const vars = {
    "--w": w,
    "--h": h,
    "--w-lg": wLg ?? w,
    "--h-lg": hLg ?? h,
  } as CSSProperties;

  return (
    <div
      className={`stage ${className ?? ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className={`stage-inner ${innerClassName ?? ""}`} style={vars}>
        {children}
      </div>
    </div>
  );
}
