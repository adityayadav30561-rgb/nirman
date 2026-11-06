import type { CrmView } from "@/components/crm/app-frame";
import { DashboardScreen, FollowupsScreen, InboxScreen, PipelineScreen } from "@/components/crm/screens";
import { AutomationsScreen, CampaignsScreen, LeadsScreen, ReportsScreen } from "@/components/crm/screens-more";

/** Every Nirman CRM view and its screen (the real CRM design). */
export const crmScreens: Record<CrmView, () => React.ReactNode> = {
  dashboard: DashboardScreen,
  inbox: InboxScreen,
  leads: LeadsScreen,
  pipeline: PipelineScreen,
  followups: FollowupsScreen,
  campaigns: CampaignsScreen,
  automations: AutomationsScreen,
  reports: ReportsScreen,
};
