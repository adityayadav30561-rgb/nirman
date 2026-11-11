# S1 Forms: sending enquiries

Status: **live (2026-11-11).** nirmandigital.com is verified in Resend and
`RESEND_API_KEY` is set on Vercel; a test enquiry sent through the live
`/api/lead/` was accepted by Resend. The user confirmed the test email arrived
in the contact@nirmandigital.com inbox. If sending ever
fails, a form falls back to opening the visitor's email app.

## How it works
- All four forms (Get a quote, Contact, Book a demo, the homepage email
  box) call `sendLead` in `src/lib/lead.tsx`, which posts to
  `/api/lead/` (`src/app/api/lead/route.ts`).
- The route emails the enquiry to `site.email` (contact@nirmandigital.com)
  through Resend's HTTP API (no library). Sender: "Nirman website
  <website@nirmandigital.com>" (`LEAD_FROM` overrides it; it must be on the
  domain verified in Resend). Reply-To is the visitor, so answering the
  email answers them. Subject: "Quote request from <name>", "Message from
  <name>", "Nirman CRM demo request from <name>", "Question".
- After sending: quote and contact go to `/thank-you/`; demo and the email
  box confirm in place. If sending fails or no key is set: the visitor's
  email app opens with the same text, and quote and contact go to
  `/thank-you/?via=email`, which asks them to press Send. Never a false
  "sent".
- Spam protection: a hidden field people never fill (`Trap`), at least 3
  seconds on the page, size limits, and at most 5 sends per address per 10
  minutes (per server instance). Suspected spam gets a normal "ok" and no
  email.

## Settings on Vercel
- `RESEND_API_KEY` (Secret): from resend.com, "Sending access" only.
- `LEAD_FROM` (optional): another sender address on the verified domain.
- `RESEND_API_URL` is for tests only.
DNS for Resend at GoDaddy (2026-11-11): TXT `resend._domainkey`, CNAME
`rsend`, CNAME `send`. "Enable receiving" stays off in Resend: the mailbox
contact@nirmandigital.com is a GoDaddy mailbox.

## Verified
Production build with a stand-in for Resend: the route sends a valid
enquiry, answers 400 to bad input, and silently drops the hidden-field,
too-fast and over-limit cases; all four forms were filled and sent in a
browser (keyboard typing) and the four emails arrived with the right
subject, Reply-To and text; without a key the contact form opened the
email app and showed the "one last step" page. `tsc`, `lint`, `build`
pass. **Not tested:** a real email through Resend (needs the user's key).

## Later
- Post leads into Nirman CRM as well (when the CRM can accept them).
- A confirmation email to the visitor.
- A stronger rate limit (shared store) if spam gets through.
