// Builds the dotted world map data used by "Where we work"
// (docs/sections/04-map.md): a hex grid of [lon, lat] points that fall on
// land, from Natural Earth 110m land (public domain, via world-atlas).
// Run: node scripts/make-world-dots.mjs  -> src/content/world-dots.json
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"));
const land = feature(topo, topo.objects.land);

const STEP = 2.8; // degrees between dots
const LAT_TOP = 78;
const LAT_BOTTOM = -56; // leave out Antarctica
const dots = [];
let row = 0;
for (let lat = LAT_TOP; lat >= LAT_BOTTOM; lat -= STEP, row++) {
  const offset = row % 2 ? STEP / 2 : 0; // hex layout: every other row shifted half a step
  for (let lon = -180 + offset; lon < 180; lon += STEP) {
    if (geoContains(land, [lon, lat])) dots.push([Math.round(lon * 10) / 10, Math.round(lat * 10) / 10]);
  }
}

const out = { source: "Natural Earth 110m land (public domain) via world-atlas 2.0.2", step: STEP, latTop: LAT_TOP, latBottom: LAT_BOTTOM, dots };
writeFileSync(new URL("../src/content/world-dots.json", import.meta.url), JSON.stringify(out));
console.log(`${dots.length} dots`);
