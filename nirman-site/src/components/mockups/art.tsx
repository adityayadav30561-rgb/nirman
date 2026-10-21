import { useId } from "react";

const uid = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "");

/*
 * Illustrative imagery drawn in SVG so the mockups carry "photography"
 * without stock images. Each uses slice scaling, so it crops like a photo.
 */

export function FacadeArt({ className = "", tone = "day" }: { className?: string; tone?: "day" | "dusk" }) {
  const dusk = tone === "dusk";
  const k = `${tone}-${uid(useId())}`;
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`sky-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dusk ? "#c9b48f" : "#e7e6dc"} />
          <stop offset="0.65" stopColor={dusk ? "#e6d3ae" : "#d9e1d3"} />
          <stop offset="1" stopColor={dusk ? "#d9c7a2" : "#cbd6c4"} />
        </linearGradient>
        <radialGradient id={`sun-${k}`} cx="0.8" cy="0.2" r="0.5">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`glass-${k}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dusk ? "#5b5a45" : "#3f5a50"} />
          <stop offset="0.45" stopColor={dusk ? "#8d7f5c" : "#6f8a7e"} />
          <stop offset="0.5" stopColor={dusk ? "#c9b27e" : "#b7c8bd"} />
          <stop offset="0.6" stopColor={dusk ? "#6b6447" : "#4d675c"} />
          <stop offset="1" stopColor={dusk ? "#3f3d2f" : "#2f463e"} />
        </linearGradient>
        <linearGradient id={`slab-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3efe5" />
          <stop offset="1" stopColor="#d8d1c2" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#sky-${k})`} />
      <rect width="400" height="250" fill={`url(#sun-${k})`} />
      {/* distant tree line */}
      <path
        d="M0 170 C20 150 40 160 55 148 C70 136 90 150 105 142 L105 200 L0 200 Z M300 150 C315 132 335 146 350 136 C365 128 385 142 400 134 L400 200 L300 200 Z"
        fill={dusk ? "#7d7a5c" : "#8fa58c"}
        opacity="0.75"
      />
      {/* building mass */}
      <rect x="70" y="66" width="270" height="140" fill="#e4ded1" />
      <rect x="250" y="66" width="90" height="140" fill="#cfc7b6" />
      {/* glazing bands */}
      {[84, 128, 172].map((y) => (
        <rect key={y} x="78" y={y} width="254" height="30" fill={`url(#glass-${k})`} />
      ))}
      {/* vertical fins */}
      {Array.from({ length: 19 }, (_, i) => (
        <rect key={i} x={80 + i * 14} y="80" width="3.2" height="126" fill="#f1ece1" opacity="0.92" />
      ))}
      {/* cantilevered roof and floor slabs */}
      <rect x="56" y="58" width="300" height="10" fill={`url(#slab-${k})`} />
      <rect x="56" y="66" width="300" height="2" fill="#1d2321" opacity="0.12" />
      {[118, 162].map((y) => (
        <rect key={y} x="70" y={y} width="270" height="5" fill="#ece6da" />
      ))}
      {/* ground */}
      <rect x="0" y="204" width="400" height="46" fill={dusk ? "#c7b796" : "#d6d0c0"} />
      <rect x="0" y="204" width="400" height="3" fill="#1d2321" opacity="0.08" />
      <path d="M0 236 L400 222 L400 250 L0 250 Z" fill="#1d2321" opacity="0.05" />
      {/* foreground trees */}
      <g fill={dusk ? "#4f5236" : "#3f5e48"}>
        <circle cx="40" cy="176" r="26" />
        <circle cx="62" cy="186" r="20" />
        <circle cx="22" cy="192" r="18" />
        <circle cx="368" cy="178" r="24" />
        <circle cx="388" cy="190" r="18" />
      </g>
      <g fill="#2a3a30">
        <rect x="39" y="196" width="3" height="12" />
        <rect x="367" y="196" width="3" height="12" />
      </g>
    </svg>
  );
}

export function InteriorArt({ className = "" }: { className?: string }) {
  const k = uid(useId());
  return (
    <svg viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`wall-${k}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9e2d2" />
          <stop offset="1" stopColor="#d9cfba" />
        </linearGradient>
        <linearGradient id={`window-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f3ea" />
          <stop offset="1" stopColor="#dfe6d8" />
        </linearGradient>
      </defs>
      <rect width="300" height="220" fill={`url(#wall-${k})`} />
      <rect x="170" y="20" width="96" height="130" fill={`url(#window-${k})`} />
      <path d="M170 20 h96 v130 h-96z M218 20 v130 M170 85 h96" fill="none" stroke="#b9ae97" strokeWidth="3" />
      {/* light falling on the floor */}
      <path d="M170 150 L266 150 L230 220 L110 220 Z" fill="#fff8e6" opacity="0.55" />
      <rect y="150" width="300" height="70" fill="#c9b99a" opacity="0.55" />
      {/* plant */}
      <rect x="40" y="132" width="34" height="34" rx="3" fill="#b0937a" />
      <g fill="#4f6b52">
        <ellipse cx="50" cy="106" rx="10" ry="26" transform="rotate(-22 50 106)" />
        <ellipse cx="64" cy="100" rx="9" ry="30" transform="rotate(14 64 100)" />
        <ellipse cx="57" cy="112" rx="8" ry="22" />
      </g>
      {/* lounge chair */}
      <path d="M96 168 q8 -40 52 -36 q10 2 10 14 v22 z" fill="#e8dfcd" />
      <path d="M92 168 h74 v12 h-74z" fill="#7b5a43" />
      <rect x="98" y="180" width="4" height="18" fill="#5c4333" />
      <rect x="156" y="180" width="4" height="18" fill="#5c4333" />
      {/* pendant */}
      <line x1="120" y1="0" x2="120" y2="52" stroke="#3a3f3c" strokeWidth="1.5" />
      <path d="M106 66 q14 -22 28 0 z" fill="#2f3a35" />
      <ellipse cx="120" cy="68" rx="9" ry="3" fill="#ffe9b8" />
    </svg>
  );
}

export function BottleArt({ className = "" }: { className?: string }) {
  const k = uid(useId());
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`btbg-${k}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9dcc0" />
          <stop offset="1" stopColor="#d4be93" />
        </linearGradient>
        <linearGradient id={`btglass-${k}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a1d14" />
          <stop offset="0.3" stopColor="#5a3c25" />
          <stop offset="0.42" stopColor="#8c6440" />
          <stop offset="0.55" stopColor="#4a3220" />
          <stop offset="1" stopColor="#24180f" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#btbg-${k})`} />
      <ellipse cx="104" cy="178" rx="44" ry="7" fill="#7a6240" opacity="0.35" />
      <path d="M90 36 h24 v20 q14 10 14 30 v84 q0 8 -8 8 h-36 q-8 0 -8 -8 v-84 q0 -20 14 -30z" fill={`url(#btglass-${k})`} />
      <rect x="88" y="28" width="28" height="12" rx="2" fill="#1f4d3a" />
      <rect x="78" y="100" width="48" height="46" fill="#f5f0e3" />
      <rect x="84" y="108" width="36" height="3" fill="#1f4d3a" />
      <rect x="84" y="116" width="24" height="2" fill="#77807b" />
      <rect x="84" y="132" width="30" height="7" fill="#1f4d3a" opacity="0.9" />
      {/* coffee beans */}
      <g fill="#4a3220">
        <ellipse cx="40" cy="170" rx="7" ry="5" transform="rotate(-20 40 170)" />
        <ellipse cx="56" cy="178" rx="7" ry="5" transform="rotate(30 56 178)" />
        <ellipse cx="160" cy="172" rx="7" ry="5" transform="rotate(12 160 172)" />
      </g>
    </svg>
  );
}

/**
 * Architectural elevation drawing of a building under construction:
 * floors, columns, scaffolding and dimension lines. Used as a quiet
 * background in the closing section.
 */
export function ElevationDrawing({ className = "" }: { className?: string }) {
  const floors = [80, 140, 200, 260, 320];
  const cols = [120, 220, 320, 420, 520, 620];
  return (
    <svg viewBox="0 0 760 420" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {/* ground */}
        <line x1="20" y1="380" x2="740" y2="380" strokeWidth="1.6" />
        {Array.from({ length: 36 }, (_, i) => (
          <line key={i} x1={24 + i * 20} y1="380" x2={14 + i * 20} y2="392" opacity="0.5" />
        ))}
        {/* floor slabs */}
        {floors.map((y) => (
          <line key={y} x1="100" y1={y} x2="640" y2={y} strokeWidth="1.4" />
        ))}
        <line x1="100" y1="380" x2="640" y2="380" />
        {/* columns */}
        {cols.map((x) => (
          <rect key={x} x={x - 4} y="80" width="8" height="300" />
        ))}
        {/* finished glazing on the lower floors */}
        {[260, 320].map((y) =>
          cols.slice(0, -1).map((x) => (
            <g key={`${x}-${y}`}>
              <rect x={x + 10} y={y + 8} width="84" height="44" opacity="0.7" />
              <line x1={x + 52} y1={y + 8} x2={x + 52} y2={y + 52} opacity="0.5" />
            </g>
          )),
        )}
        {/* scaffolding on the right */}
        {[640, 680].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="380" opacity="0.7" />
        ))}
        {[60, 120, 180, 240, 300, 360].map((y) => (
          <g key={y} opacity="0.7">
            <line x1="640" y1={y} x2="680" y2={y} />
            <line x1="640" y1={y} x2="680" y2={y + 60 > 380 ? 380 : y + 60} />
          </g>
        ))}
        {/* crane */}
        <line x1="560" y1="80" x2="560" y2="0" strokeWidth="1.4" />
        <line x1="380" y1="10" x2="720" y2="10" strokeWidth="1.4" />
        <line x1="560" y1="0" x2="400" y2="10" opacity="0.6" />
        <line x1="560" y1="0" x2="700" y2="10" opacity="0.6" />
        <line x1="440" y1="10" x2="440" y2="56" strokeDasharray="3 3" />
        <rect x="420" y="56" width="40" height="10" />
        {/* dimension line */}
        <line x1="60" y1="80" x2="60" y2="380" opacity="0.8" />
        <line x1="54" y1="80" x2="66" y2="80" />
        <line x1="54" y1="380" x2="66" y2="380" />
        {floors.map((y) => (
          <line key={y} x1="56" y1={y} x2="64" y2={y} opacity="0.6" />
        ))}
        <line x1="100" y1="404" x2="640" y2="404" opacity="0.8" />
        <line x1="100" y1="398" x2="100" y2="410" />
        <line x1="640" y1="398" x2="640" y2="410" />
      </g>
    </svg>
  );
}
