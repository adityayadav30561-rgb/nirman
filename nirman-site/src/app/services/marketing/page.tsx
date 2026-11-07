import { ServiceRoute, serviceMetadata } from "@/components/services/service-route";

// /services/marketing/ (docs/sections/p1-services.md): the shared service template.
export const metadata = serviceMetadata("marketing");

export default function Page() {
  return <ServiceRoute slug="marketing" />;
}
