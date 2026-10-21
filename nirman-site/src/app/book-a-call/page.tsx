import { StubPage } from "@/components/stub-page";
import { registryMetadata } from "@/lib/seo";

// Stub (P3.4). Replace with the real page.
export const metadata = registryMetadata("/book-a-call/");

export default function Page() {
  return <StubPage path="/book-a-call/" />;
}
