import type { CSSProperties } from "react";

/**
 * Small flat-bottomed cartoon cloud, as in the reference hero: white with a
 * faint blue-grey underside. Sized by width; height follows the viewBox.
 */
export function Cloud({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 46" aria-hidden className={`pointer-events-none drop-shadow-[0_3px_4px_rgb(40_70_120/0.10)] ${className}`} style={style}>
      <defs>
        <linearGradient id="cloud-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6e0ec" />
        </linearGradient>
      </defs>
      <path
        d="M12 44 H108 C117 44 119 33 111 30 C112 21 101 16 93 21 C89 8 70 4 61 15 C55 7 40 8 37 20 C28 16 18 21 20 30 C11 30 4 44 12 44 Z"
        fill="url(#cloud-fill)"
      />
    </svg>
  );
}
