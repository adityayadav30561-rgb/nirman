import { ServicePage } from "@/components/service-page";
import { registryMetadata } from "@/lib/seo";

const path = "/services/web/website-design/";

export const metadata = registryMetadata(path);

export default function Page() {
  return <ServicePage path={path} />;
}
