/*
 * Minimal SVG chart primitives for mockups. Values are sample data.
 */

function toPath(values: number[], w: number, h: number, pad = 4, max?: number, min?: number) {
  const hi = max ?? Math.max(...values);
  const lo = min ?? Math.min(...values);
  const span = hi - lo || 1;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, pad + (h - pad * 2) * (1 - (v - lo) / span)] as const);
  // Catmull-Rom to bezier for a smooth, believable trace.
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return { d, pts };
}

export function LineChart({
  series,
  w = 600,
  h = 200,
  max,
  min = 0,
  gridLines = 4,
  animate = false,
  className = "",
}: {
  series: { values: number[]; color: string; fill?: boolean; dashed?: boolean; width?: number }[];
  w?: number;
  h?: number;
  max?: number;
  min?: number;
  gridLines?: number;
  animate?: boolean;
  className?: string;
}) {
  const hi = max ?? Math.max(...series.flatMap((s) => s.values));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`block h-full w-full ${className}`} aria-hidden>
      {Array.from({ length: gridLines > 0 ? gridLines + 1 : 0 }, (_, i) => (
        <line
          key={i}
          x1="0"
          x2={w}
          y1={(h / gridLines) * i}
          y2={(h / gridLines) * i}
          stroke="currentColor"
          strokeOpacity="0.1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {series.map((s, i) => {
        const { d } = toPath(s.values, w, h, 6, hi, min);
        return (
          <g key={i}>
            {s.fill && (
              <path d={`${d} L${w},${h} L0,${h} Z`} fill={s.color} fillOpacity="0.12" className={animate ? "anim-fade" : ""} />
            )}
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={s.width ?? 2}
              strokeDasharray={s.dashed ? "4 4" : undefined}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={animate && !s.dashed ? 1000 : undefined}
              className={animate && !s.dashed ? "anim-draw" : ""}
              style={animate ? { animationDelay: "0.9s" } : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function Bars({
  values,
  className = "",
  barClassName = "bg-forest",
  highlight,
  highlightClassName = "bg-brass",
  animate = false,
}: {
  values: number[];
  className?: string;
  barClassName?: string;
  highlight?: number;
  highlightClassName?: string;
  animate?: boolean;
}) {
  const max = Math.max(...values);
  return (
    <div className={`flex items-end gap-[6%] ${className}`} aria-hidden>
      {values.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-[calc(var(--spacing)*2)] ${i === highlight ? highlightClassName : barClassName} ${
            animate ? "anim-bar" : ""
          }`}
          style={{ height: `${(v / max) * 100}%`, animationDelay: animate ? `${1 + i * 0.05}s` : undefined }}
        />
      ))}
    </div>
  );
}

export function Donut({
  parts,
  size = 100,
  thickness = 14,
  className = "",
}: {
  parts: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  className?: string;
}) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const lens = parts.map((p) => (p.value / total) * c);
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={`block ${className}`} aria-hidden>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {parts.map((p, i) => {
          const len = lens[i];
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(len - 1.5, 0)} ${c}`}
              strokeDashoffset={-offsets[i]}
            />
          );
        })}
      </g>
    </svg>
  );
}
