"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Ambient background video (docs/REDESIGN.md §3.5). The poster always shows.
 * The file is only fetched on screens 768px and wider, without reduced motion
 * or Save-Data, once the box scrolls into view; it plays while visible and
 * pauses when scrolled away. Fills its (positioned) parent.
 */
export function AmbientVideo({
  src,
  poster,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
}: {
  src: string;
  poster: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const motionOk = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (!motionOk || saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setArmed(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [armed, visible]);

  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`} aria-hidden>
      <Image src={poster} alt="" fill priority={priority} sizes={sizes} className="object-cover" />
      {armed && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
