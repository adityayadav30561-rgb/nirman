import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";

/** A cover-cropped photograph that fills its (positioned) parent. */
export function Photo({
  name,
  sizes = "50vw",
  className = "",
  priority = false,
  position,
  decorative = false,
}: {
  name: PhotoKey;
  sizes?: string;
  className?: string;
  priority?: boolean;
  position?: string;
  decorative?: boolean;
}) {
  const p = photos[name];
  return (
    <Image
      src={p.src}
      alt={decorative ? "" : p.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={70}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
