"use client";

import Image from "next/image";
import type { BlogImage } from "@/sanity/types";

/**
 * A blog picture. Pictures from Sanity are resized by Sanity's own image
 * service (the loader below); local ones (sample articles) by Next. A client
 * component because next/image takes the loader as a function.
 */
export function BlogPicture({ image, sizes, priority = false, className = "" }: { image: BlogImage; sizes: string; priority?: boolean; className?: string }) {
  const remote = image.url.startsWith("http");
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.w}
      height={image.h}
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      loader={remote ? ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}&auto=format&fit=max` : undefined}
      className={className}
    />
  );
}
