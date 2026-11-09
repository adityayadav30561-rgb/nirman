/*
 * Third-party images used on the site, with source and licence.
 * Unsplash License (https://unsplash.com/license): free for commercial use,
 * no attribution required (credited here anyway).
 */

export const imageCredits = [
  {
    files: ["/images/hero/hand-back.webp", "/images/hero/hand-front.webp"],
    use: "Homepage hero: hand holding the phone (greyscale cut-out; phone screen is HTML)",
    source: "https://unsplash.com/photos/a-person-holding-a-phone-in-their-hand-u1b6E6IkSGQ",
    unsplashId: "photo-1691256676376-357c3aa66c89",
    author: "personalgraphic.com (unsplash.com/@personal_graphic)",
    licence: "Unsplash License",
    processing: "scripts/cut-hand.py: white background removed, greyscale, split into back and fingertip layers",
  },
  {
    files: ["/images/services/clinic.webp"],
    use: "Services pages: photo inside the demo clinic website mockup",
    source: "Supplied by the user on 2026-11-09 (Unsplash page link to be added)",
    unsplashId: "",
    author: "to be added",
    licence: "Unsplash License (to confirm with the page link)",
    processing: "resized to 1200px wide, WebP",
  },
  {
    files: ["/images/services/product.webp"],
    use: "Services pages: product photo of the demo coffee shop (Brew Box) mockup",
    source: "Supplied by the user on 2026-11-09 (Unsplash page link to be added)",
    unsplashId: "",
    author: "to be added",
    licence: "Unsplash License (to confirm with the page link)",
    processing: "cropped square around the three cups, 800px, WebP",
  },
] as const;
