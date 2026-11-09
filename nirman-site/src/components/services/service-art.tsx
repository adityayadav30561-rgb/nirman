import type { ComponentType } from "react";
import { MarketingScene, marketingTiles } from "@/components/services/visuals/marketing";
import { SeoScene, seoTiles } from "@/components/services/visuals/seo";
import { SoftwareScene, softwareTiles } from "@/components/services/visuals/software";
import { WebScene, webTiles } from "@/components/services/visuals/web";
import type { ServiceSlug } from "@/content/service-pages";

/** Hero picture and one picture per "What is included" item (same order as content/service-pages.ts). */
export const serviceArt: Record<ServiceSlug, { Scene: ComponentType<{ className?: string }>; tiles: ComponentType[] }> = {
  websites: { Scene: WebScene, tiles: webTiles },
  seo: { Scene: SeoScene, tiles: seoTiles },
  software: { Scene: SoftwareScene, tiles: softwareTiles },
  marketing: { Scene: MarketingScene, tiles: marketingTiles },
};
