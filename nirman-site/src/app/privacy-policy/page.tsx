import { LegalPage, legalMetadata } from "@/components/pages/legal";
import { privacy, terms } from "@/content/legal";

export const metadata = legalMetadata(privacy);
export default function Page() {
  return <LegalPage doc={privacy} other={terms} />;
}
