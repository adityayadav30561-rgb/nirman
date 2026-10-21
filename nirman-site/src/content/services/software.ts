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
  },
  {
    path: "/services/software/crm-development/",
    kind: "detail",
    pillar: "software",
    name: "CRM development",
    serviceType: "CRM development",
    visual: "automation",
  },
  {
    path: "/services/software/web-apps/",
    kind: "detail",
    pillar: "software",
    name: "Web apps and SaaS",
    serviceType: "Web application and SaaS development",
    visual: "software",
  },
  {
    path: "/services/software/mobile-apps/",
    kind: "detail",
    pillar: "software",
    name: "Mobile apps",
    serviceType: "Mobile app development",
    visual: "apps",
  },
  {
    path: "/services/software/automation-integrations/",
    kind: "detail",
    pillar: "software",
    name: "Automation and integrations",
    serviceType: "Business process automation and software integration",
    visual: "automation",
  },
];
