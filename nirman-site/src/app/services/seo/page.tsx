import { ServiceRoute, serviceMetadata } from "@/components/services/service-route";

// /services/seo/ (docs/sections/p1-services.md): the shared service template.
export const metadata = serviceMetadata("seo");

export default function Page() {
  return <ServiceRoute slug="seo" />;
}
