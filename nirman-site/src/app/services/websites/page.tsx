import { ServiceRoute, serviceMetadata } from "@/components/services/service-route";

// /services/websites/ (docs/sections/p1-services.md): the shared service template.
export const metadata = serviceMetadata("websites");

export default function Page() {
  return <ServiceRoute slug="websites" />;
}
