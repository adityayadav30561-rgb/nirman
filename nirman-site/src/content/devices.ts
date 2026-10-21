/*
 * Real device photographs cut out of their backgrounds, with the screen
 * glass made transparent (see public/assets/devices). `screen` is the glass
 * rectangle in image pixels: [x, y, width, height]; `mask` is the exact glass
 * shape, used to clip the UI so it fills the screen edge to edge.
 *
 * Sources (free for commercial use):
 *   iphone      Unsplash photo-1695973056909
 *   iphone-alt  Unsplash photo-1629494893504
 *   macbook     Pexels 7214629
 *   macbook-alt Unsplash photo-1597673030062
 *   imac        cut from the hero photo, Unsplash photo-1560131914
 *   hero photo  Unsplash photo-1560131914
 */

export const devices = {
  iphone: { src: "/assets/devices/iphone.webp", mask: "/assets/devices/iphone-screen.png", w: 393, h: 810, screen: [17, 15, 359, 780] },
  "iphone-alt": { src: "/assets/devices/iphone-alt.webp", mask: "/assets/devices/iphone-alt-screen.png", w: 390, h: 806, screen: [21, 21, 348, 752] },
  macbook: { src: "/assets/devices/macbook.webp", mask: "/assets/devices/macbook-screen.png", w: 1675, h: 1136, screen: [303, 61, 1067, 669] },
  "macbook-alt": { src: "/assets/devices/macbook-alt.webp", mask: "/assets/devices/macbook-alt-screen.png", w: 1004, h: 718, screen: [75, 47, 853, 530] },
  imac: { src: "/assets/devices/imac.webp", mask: "/assets/devices/imac-screen.png", w: 1383, h: 1120, screen: [36, 38, 1317, 773] },
} as const;

export type DeviceKey = keyof typeof devices;

/**
 * Percent-based box for a device's screen content: the glass rectangle grown
 * by a few pixels so it reaches under the bezel. The visible shape comes from
 * the device's glass mask, not from this box.
 */
export function screenBox(key: DeviceKey, pad = 6) {
  const d = devices[key];
  const [x, y, w, h] = d.screen;
  return {
    left: `${((x - pad) / d.w) * 100}%`,
    top: `${((y - pad) / d.h) * 100}%`,
    width: `${((w + pad * 2) / d.w) * 100}%`,
    height: `${((h + pad * 2) / d.h) * 100}%`,
  };
}

/** The hero photograph and the iMac display rectangle inside it. */
export const heroPhoto = {
  src: "/assets/hero-imac-desk.webp",
  w: 2400,
  h: 1600,
  // Inner display area of the iMac (inside the black glass border).
  imac: { tl: [512, 128], tr: [1829, 135], bl: [517, 901] },
} as const;
