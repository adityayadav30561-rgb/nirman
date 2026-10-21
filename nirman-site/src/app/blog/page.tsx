import { StubPage } from "@/components/stub-page";
import { registryMetadata } from "@/lib/seo";

// Stub (P3.4). Replace with the real page.
export const metadata = registryMetadata("/blog/");

export default function Page() {
  return <StubPage path="/blog/" />;
}
