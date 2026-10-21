import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { devices, screenBox, type DeviceKey } from "@/content/devices";

/*
 * Device frames. Phones, laptops and the iMac are real photographs (see
 * content/devices.ts) with the UI placed behind their transparent glass.
 * Sizes inside children are design pixels and only make sense in a <Stage>.
 */

/** A real device photograph with `children` shown on its screen. */
export function Device({
  device,
  children,
  className = "",
  screenClassName = "bg-surface",
  imgClassName = "",
  shadow = true,
}: {
  device: DeviceKey;
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  imgClassName?: string;
  shadow?: boolean;
}) {
  const d = devices[device];
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${d.w} / ${d.h}` }}>
      {shadow && (
        <span
          className="absolute inset-x-[6%] -bottom-[1.5%] h-[5%] rounded-[50%] bg-black/35 blur-[6px]"
          aria-hidden
        />
      )}
      {/* Screen: clipped to the real glass shape so it fills edge to edge. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(${d.mask})`,
          WebkitMaskImage: `url(${d.mask})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className={`absolute overflow-hidden ${screenClassName}`} style={screenBox(device)}>
          {children}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={d.src}
        alt=""
        aria-hidden
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full select-none ${imgClassName}`}
      />
    </div>
  );
}

/** A real iPhone with a status bar; children fill the area below it. */
export function PhoneFrame({
  children,
  className = "",
  time = "9:41",
  tone = "light",
  model = "iphone",
}: {
  children: ReactNode;
  className?: string;
  time?: string;
  tone?: "light" | "dark";
  model?: "iphone" | "iphone-alt";
}) {
  const dark = tone === "dark";
  return (
    <Device device={model} className={className} screenClassName={dark ? "bg-forest-deep text-white" : "bg-surface text-ink"}>
      <div className="flex h-full flex-col">
        <div className="flex h-34 shrink-0 items-center justify-between px-22 fs-10 font-semibold tnum">
          <span>{time}</span>
          <span className="flex items-center gap-3">
            <Signal className="size-10" strokeWidth={2.4} />
            <Wifi className="size-10" strokeWidth={2.4} />
            <BatteryFull className="size-13" strokeWidth={2} />
          </span>
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
        <div className={`mx-auto mb-6 mt-4 h-4 w-90 shrink-0 rounded-full ${dark ? "bg-white/70" : "bg-ink/80"}`} />
      </div>
    </Device>
  );
}
