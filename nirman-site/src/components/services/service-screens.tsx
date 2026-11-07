import type { ReactNode } from "react";
import { AppFrame } from "@/components/crm/app-frame";
import { InboxScreen, PhoneInbox, PipelineScreen } from "@/components/crm/screens";
import { AutomationsScreen, CampaignsScreen, LeadsScreen } from "@/components/crm/screens-more";
import { BrowserFrame, PhoneFrame } from "@/components/services/frames";
import { SeoAiScreen, SeoAuditScreen, SeoContentScreen, SeoLocalScreen, SeoOverviewScreen } from "@/components/services/screens/seo";
import { SwAppScreen, SwIntegrationsScreen, SwPortalScreen } from "@/components/services/screens/software";
import { WebEditorScreen, WebHomeScreen, WebMobilePages, WebSpeedScreen, WebStoreScreen } from "@/components/services/screens/web";
import type { ServiceSlug } from "@/content/service-pages";

/*
 * Which screen shows each "What is included" item, and the hero screen, per
 * service (docs/sections/p1-services.md, redo 2026-11-07: the user asked for
 * real screens). Order matches content/service-pages.ts `included`.
 * A "phone" screen sits centred on a pale plate the same shape as a window,
 * so the tour's sticky panel keeps one size.
 */

export type Shot = { window: () => ReactNode; phone?: () => ReactNode; plate?: boolean };

const browser = (url: string, S: () => ReactNode) =>
  function BrowserShot() {
    return (
      <BrowserFrame url={url}>
        <S />
      </BrowserFrame>
    );
  };
const app = (key: Parameters<typeof AppFrame>[0]["active"], S: () => ReactNode) =>
  function AppShot() {
    return (
      <AppFrame active={key}>
        <S />
      </AppFrame>
    );
  };
const phoneOnPlate = (S: () => ReactNode) =>
  function PlateShot() {
    return (
      <div aria-hidden className="grid aspect-[16/9.4] w-full place-items-center rounded-[1.1rem] bg-[radial-gradient(circle_at_50%_110%,#fbe2d3,transparent_65%)] bg-wash">
        <PhoneFrame className="h-[88%] w-auto [aspect-ratio:9/19]">
          <S />
        </PhoneFrame>
      </div>
    );
  };

export const tourShots: Record<ServiceSlug, Shot[]> = {
  websites: [
    { window: browser("sunrise-clinic.in", WebHomeScreen) },
    { window: phoneOnPlate(WebMobilePages), plate: true },
    { window: browser("masalabox.in/kolhapuri-masala", WebStoreScreen) },
    { window: browser("sunrise-clinic.in/admin", WebEditorScreen) },
    { window: browser("Launch check · sunrise-clinic.in", WebSpeedScreen) },
  ],
  seo: [
    { window: browser("Maps · dentist near me", SeoLocalScreen) },
    { window: browser("SEO audit · sunrise-clinic.in", SeoAuditScreen) },
    { window: browser("SEO report · sunrise-clinic.in", SeoOverviewScreen) },
    { window: browser("AI assistant", SeoAiScreen) },
    { window: browser("Content plan · sunrise-clinic.in", SeoContentScreen) },
  ],
  software: [
    { window: app("pipeline", PipelineScreen) },
    { window: browser("app.fixitpro.in/jobs", SwPortalScreen) },
    { window: phoneOnPlate(SwAppScreen), plate: true },
    { window: browser("app.fixitpro.in/integrations", SwIntegrationsScreen) },
  ],
  marketing: [
    { window: app("inbox", InboxScreen) },
    { window: app("campaigns", CampaignsScreen) },
    { window: app("automations", AutomationsScreen) },
    { window: app("leads", LeadsScreen) },
  ],
};

/** Hero: one big window plus a phone at its corner. */
export const heroShots: Record<ServiceSlug, Shot> = {
  websites: { window: browser("sunrise-clinic.in", WebHomeScreen), phone: () => <PhoneFrame><WebMobilePages /></PhoneFrame> },
  seo: { window: browser("SEO report · sunrise-clinic.in", SeoOverviewScreen) },
  software: { window: browser("app.fixitpro.in/jobs", SwPortalScreen), phone: () => <PhoneFrame><SwAppScreen /></PhoneFrame> },
  marketing: { window: app("campaigns", CampaignsScreen), phone: () => <PhoneInbox /> },
};
