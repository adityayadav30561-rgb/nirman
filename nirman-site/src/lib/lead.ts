import { site } from "@/content/site";

/** What every lead form collects. Phase 5 posts this to app/api/lead/route.ts. */
export type Lead = {
  name: string;
  email: string;
  /** With country code; optional on short forms. */
  phone: string;
  company: string;
  message: string;
  /** The visitor agreed to be contacted on WhatsApp about this enquiry. */
  whatsapp: boolean;
  /** Service the visitor was reading about ("Local SEO"). */
  service: string;
  /** Page the form was sent from ("/services/seo/local-seo/"). */
  source: string;
};

/**
 * Sends a lead. There is no lead API yet (Phase 5), so for now this opens the
 * visitor's email app with the enquiry filled in (P4.7 fallback). Phase 5
 * replaces the body with a POST to /api/lead and keeps the same signature.
 */
export function sendLead(lead: Lead): "mailto" {
  const subject = `Quote request: ${lead.service}`;
  const lines = [`Service: ${lead.service}`, `Name: ${lead.name}`, `Email: ${lead.email}`];
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.company) lines.push(`Company: ${lead.company}`);
  lines.push(`OK to contact on WhatsApp: ${lead.whatsapp ? "Yes" : "No"}`, "", lead.message, "", `Sent from ${site.url}${lead.source}`);
  const body = lines.join("\n");
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mailto";
}
