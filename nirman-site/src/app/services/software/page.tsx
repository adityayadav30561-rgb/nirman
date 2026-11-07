import { ServiceRoute, serviceMetadata } from "@/components/services/service-route";

// /services/software/ (docs/sections/p1-services.md): the shared service template.
export const metadata = serviceMetadata("software");

export default function Page() {
  return <ServiceRoute slug="software" />;
}
