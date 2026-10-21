import type { Service } from "./types";

// Software pillar: hub + 4. Content written in P4.5.

export const softwareServices: Service[] = [
  {
    path: "/services/software/",
    kind: "hub",
    pillar: "software",
    name: "Custom software",
    serviceType: "Custom software development",
    visual: "software",
    related: ["/services/web/", "/services/marketing/"],
    tools: ["/tools/seo-audit/"],
  },
  {
    path: "/services/software/crm-development/",
    kind: "detail",
    pillar: "software",
    name: "CRM development",
    serviceType: "CRM development",
    visual: "automation",
    related: ["/services/software/automation-integrations/", "/services/marketing/"],
    tools: ["/tools/whatsapp-link/"],
  },
  {
    path: "/services/software/web-apps/",
    kind: "detail",
    pillar: "software",
    name: "Web apps and SaaS",
    serviceType: "Web application and SaaS development",
    visual: "software",
    related: ["/services/software/mobile-apps/", "/services/web/website-development/"],
    tools: ["/tools/seo-audit/"],
  },
  {
    path: "/services/software/mobile-apps/",
    kind: "detail",
    pillar: "software",
    name: "Mobile apps",
    serviceType: "Mobile app development",
    visual: "apps",
    related: ["/services/software/web-apps/", "/services/software/automation-integrations/"],
    tools: ["/tools/whatsapp-link/"],
  },
  {
    path: "/services/software/automation-integrations/",
    kind: "detail",
    pillar: "software",
    name: "Automation and integrations",
    serviceType: "Business process automation and software integration",
    visual: "automation",
    related: ["/services/software/crm-development/", "/services/marketing/whatsapp-marketing/"],
    tools: ["/tools/whatsapp-link/"],
  },
];
