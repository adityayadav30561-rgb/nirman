// Builds the dotted world map data used by "Where we work"
// (docs/sections/04-map.md): land dots from Natural Earth 110m land (public
// domain, via world-atlas), laid out on an even hex grid in the Natural
// Earth projection (rounded outline, poles kept compact: a plain lat/lon
// grid stretched the Arctic into a flat, "cropped" top edge).
// Run: node scripts/make-world-dots.mjs  -> src/content/world-dots.json
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains, geoNaturalEarth1 } from "d3-geo";

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"));
const land = feature(topo, topo.objects.land);

const WIDTH = 360; // SVG units
const LAT_BOTTOM = -56; // leave out Antarctica
const STEP = 3.2; // distance between dot centres, SVG units
const projection = geoNaturalEarth1().fitWidth(WIDTH, { type: "Sphere" });

// crop vertically to the land we show (north pole down to 56S)
const yTop = projection([0, 90])[1];
const yBottom = projection([0, LAT_BOTTOM])[1];
const height = yBottom - yTop;
projection.translate([projection.translate()[0], projection.translate()[1] - yTop]);

const dots = [];
const rowStep = STEP * Math.sqrt(3) / 2; // true hex spacing
let row = 0;
for (let y = rowStep / 2; y < height; y += rowStep, row++) {
  const offset = row % 2 ? STEP / 2 : 0;
  for (let x = STEP / 2 + offset; x < WIDTH; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!ll || Number.isNaN(ll[0]) || ll[1] < LAT_BOTTOM) continue;
    // inside the projected sphere outline only
    const back = projection(ll);
    if (!back || Math.hypot(back[0] - x, back[1] - y) > 0.01) continue;
    if (geoContains(land, ll)) dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
}

const out = {
  source: "Natural Earth 110m land (public domain) via world-atlas 2.0.2",
  projection: "geoNaturalEarth1",
  scale: projection.scale(),
  translate: projection.translate(),
  width: WIDTH,
  height: Math.round(height * 10) / 10,
  step: STEP,
  dots,
};
writeFileSync(new URL("../src/content/world-dots.json", import.meta.url), JSON.stringify(out));
console.log(`${dots.length} dots, ${WIDTH} x ${out.height}`);
