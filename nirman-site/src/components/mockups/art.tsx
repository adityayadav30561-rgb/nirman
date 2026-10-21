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
