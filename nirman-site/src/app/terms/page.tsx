import { LegalPage, legalMetadata } from "@/components/pages/legal";
import { privacy, terms } from "@/content/legal";

export const metadata = legalMetadata(terms);
export default function Page() {
  return <LegalPage doc={terms} other={privacy} />;
}
