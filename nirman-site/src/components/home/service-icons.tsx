import type { ServiceKey } from "@/content/services";

/*
 * 3D-style service icons drawn in SVG (soft gradients, a darker side face, a
 * gloss highlight and a contact shadow), in the spirit of the reference's
 * rendered icons. No brand logos. viewBox 80 x 80.
 */

function Shadow() {
  return <ellipse cx="40" cy="73" rx="24" ry="3.6" fill="#05070c" opacity="0.13" />;
}

function Websites({ u }: { u: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-web-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4c95ff" />
          <stop offset="1" stopColor="#0b4fd4" />
        </linearGradient>
        <linearGradient id={`${u}-web-page`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4eefc" />
        </linearGradient>
        <linearGradient id={`${u}-orange`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffa36b" />
          <stop offset="1" stopColor="#ea5a1c" />
        </linearGradient>
      </defs>
      <Shadow />
      <rect x="11" y="17" width="60" height="47" rx="9" fill="#0a3a9c" />
      <rect x="8" y="12" width="60" height="47" rx="9" fill={`url(#${u}-web-body)`} />
      <rect x="11" y="13.5" width="34" height="4" rx="2" fill="#fff" opacity="0.32" />
      <circle cx="15" cy="19.5" r="1.7" fill="#fff" opacity="0.8" />
      <circle cx="20.5" cy="19.5" r="1.7" fill="#fff" opacity="0.6" />
      <circle cx="26" cy="19.5" r="1.7" fill="#fff" opacity="0.45" />
      <rect x="13" y="24.5" width="50" height="29" rx="4.5" fill={`url(#${u}-web-page)`} />
      <rect x="17" y="28.5" width="20" height="11" rx="2.5" fill={`url(#${u}-orange)`} />
      <rect x="40" y="29" width="19" height="3.2" rx="1.6" fill="#b9cff3" />
      <rect x="40" y="35" width="13" height="3.2" rx="1.6" fill="#cfdcf3" />
      <rect x="17" y="43" width="42" height="3.2" rx="1.6" fill="#d6e2f5" />
      <rect x="17" y="48" width="28" height="3.2" rx="1.6" fill="#d6e2f5" />
    </>
  );
}

function Seo({ u }: { u: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-seo-bar`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5aa0ff" />
          <stop offset="1" stopColor="#0b4fd4" />
        </linearGradient>
        <linearGradient id={`${u}-seo-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffa36b" />
          <stop offset="1" stopColor="#e2541a" />
        </linearGradient>
        <radialGradient id={`${u}-seo-glass`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#d9e8ff" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <Shadow />
      {[
        [11, 50, 15],
        [23, 40, 25],
        [35, 30, 35],
      ].map(([x, y, h]) => (
        <g key={x}>
          <rect x={x + 2.5} y={y + 3} width="10" height={h} rx="3" fill="#0a3a9c" />
          <rect x={x} y={y} width="10" height={h} rx="3" fill={`url(#${u}-seo-bar)`} />
          <rect x={x + 2} y={y + 1.5} width="2.5" height={h - 4} rx="1.25" fill="#fff" opacity="0.3" />
        </g>
      ))}
      <rect x="58" y="45" width="8" height="20" rx="4" transform="rotate(-42 62 55)" fill="#1b1f27" />
      <circle cx="51" cy="33" r="15" fill={`url(#${u}-seo-glass)`} />
      <circle cx="51" cy="33" r="15" fill="none" stroke={`url(#${u}-seo-ring)`} strokeWidth="6.5" />
      <path d="M43 27 A9 9 0 0 1 50 23" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
    </>
  );
}

function Software({ u }: { u: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-sw-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4252" />
          <stop offset="1" stopColor="#11151d" />
        </linearGradient>
        <linearGradient id={`${u}-sw-gear`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffa36b" />
          <stop offset="1" stopColor="#e2541a" />
        </linearGradient>
      </defs>
      <Shadow />
      <rect x="12" y="16" width="54" height="46" rx="11" fill="#05070c" />
      <rect x="9" y="11" width="54" height="46" rx="11" fill={`url(#${u}-sw-tile)`} />
      <rect x="13" y="13" width="30" height="4" rx="2" fill="#fff" opacity="0.18" />
      <path d="M26 26 L18 34 L26 42" fill="none" stroke="#6aaeff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 26 L54 34 L46 42" fill="none" stroke="#6aaeff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39 23 L33 45" stroke="#ffffff" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="59" cy="57" r="10.5" fill="none" stroke={`url(#${u}-sw-gear)`} strokeWidth="5" strokeDasharray="3.4 2.6" />
      <circle cx="59" cy="57" r="8" fill={`url(#${u}-sw-gear)`} />
      <circle cx="59" cy="57" r="3.2" fill="#fff" />
    </>
  );
}

function Marketing({ u }: { u: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-mk-bubble`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4c95ff" />
          <stop offset="1" stopColor="#0b4fd4" />
        </linearGradient>
        <linearGradient id={`${u}-mk-mail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2ebf8" />
        </linearGradient>
      </defs>
      <Shadow />
      <path d="M22 16 H52 A13 13 0 0 1 65 29 V37 A13 13 0 0 1 52 50 H30 L19 59 L21 49 A13 13 0 0 1 9 37 V29 A13 13 0 0 1 22 16 Z" fill={`url(#${u}-mk-bubble)`} />
      <rect x="15" y="18.5" width="28" height="4" rx="2" fill="#fff" opacity="0.3" />
      <circle cx="25" cy="33" r="3" fill="#fff" opacity="0.9" />
      <circle cx="35" cy="33" r="3" fill="#fff" opacity="0.7" />
      <rect x="38.5" y="40.5" width="34" height="25" rx="4.5" fill="#0a3a9c" opacity="0.35" />
      <rect x="36" y="37" width="34" height="25" rx="4.5" fill={`url(#${u}-mk-mail)`} />
      <path d="M38 40 L53 51 L68 40" fill="none" stroke="#a9c3ec" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="69" cy="37" r="6" fill="#f26b2b" />
      <circle cx="67.5" cy="35.5" r="1.8" fill="#fff" opacity="0.6" />
    </>
  );
}

const shapes: Record<ServiceKey, (p: { u: string }) => React.JSX.Element> = {
  websites: Websites,
  seo: Seo,
  software: Software,
  marketing: Marketing,
};

/**
 * `uid` must be unique on the page (gradient ids are global in the document:
 * a duplicate inside a hidden element makes every copy lose its colours).
 */
export function ServiceIcon({ name, uid, className = "size-16" }: { name: ServiceKey; uid: string; className?: string }) {
  const Shape = shapes[name];
  return (
    <svg viewBox="0 0 80 80" aria-hidden className={className}>
      <Shape u={`si-${uid}`} />
    </svg>
  );
}
