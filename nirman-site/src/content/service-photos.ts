// Photos inside the website mockups on the services pages
// (docs/ASSET-REQUESTS.md A-P1-1 and A-P1-2). While a path is null the mockup
// shows its drawn illustration. To use a photo: save it under
// public/images/services/, set its path here (for example
// "/images/services/clinic.webp") and credit it in image-credits.ts.
export const servicePhotos: { clinic: string | null; product: string | null } = {
  clinic: "/images/services/clinic.webp",
  product: "/images/services/product.webp",
};
