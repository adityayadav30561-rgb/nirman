import type { Service } from "./types";

// Marketing pillar: hub + 2. Content written in P4.6. Not offered: PPC and
// social media marketing (client rule), so nothing here may suggest them.

export const marketingServices: Service[] = [
  {
    path: "/services/marketing/",
    kind: "hub",
    pillar: "marketing",
    name: "Marketing automation",
    serviceType: "Marketing automation via CRM",
    visual: "marketing",
  },
  {
    path: "/services/marketing/whatsapp-marketing/",
    kind: "detail",
    pillar: "marketing",
    name: "WhatsApp marketing",
    serviceType: "WhatsApp Business API marketing",
    visual: "marketing",
  },
  {
    path: "/services/marketing/email-marketing/",
    kind: "detail",
    pillar: "marketing",
    name: "Email marketing",
    serviceType: "Email marketing automation",
    visual: "marketing",
  },
];
