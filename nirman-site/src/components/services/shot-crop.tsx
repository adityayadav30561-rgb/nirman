import type { Shot } from "@/components/services/service-screens";

/** Phones: a window rendered at a readable width and cropped; a phone-on-plate shot shows whole. */
export function ShotCrop({ shot, height = 300 }: { shot: Shot; height?: number }) {
  if (shot.plate) return <>{shot.window()}</>;
  return (
    <div className="overflow-hidden rounded-[1rem] shadow-[0_1.5rem_3rem_-1rem_rgba(18,20,24,0.3)] ring-1 ring-line" style={{ height }}>
      <div style={{ width: 760 }}>{shot.window()}</div>
    </div>
  );
}
