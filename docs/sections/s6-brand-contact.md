# S6 Logo, phone numbers and WhatsApp chat

Status: built and verified (2026-11-12). User request.

## Logo
- Source: the user's logo (the Nirman wordmark over a gold mandala, on
  white), sent 2026-11-12. Not committed as a raw file; the derived files are.
- `public/images/brand/nirman-logo.png`: transparent, black wordmark, for
  light backgrounds (header, WhatsApp chat). `nirman-logo-light.png`: white
  wordmark and stronger gold, for the ink bands (footer, PDF cover).
- Browser icon: the full logo is unreadable at 16 to 32 px, so the icon is a
  round monogram made from the logo itself (its gold double ring and the
  "N" of the wordmark): `src/app/favicon.ico` (16, 32, 48), `icon.png`
  (512), `apple-icon.png` (180, white background).
- Remake all of them: `python tools/brand/make-logo.py <logo file>`.
- `components/logo.tsx`: `Logo` is now the image. `LogoMark` (the square
  "n") stays as the **Nirman CRM product's** app icon inside the CRM
  screens; it is not the company logo.
- Also used: the PDF report cover, and `logo` in the homepage's
  Organization JSON-LD.

## Phone numbers
- `site.phones` in `content/site.ts`: `+91 88583 49017` (first; also
  WhatsApp) and `+91 79052 04380`. Shown as call links in the footer and
  on Contact ("Call us (line 1)", "(line 2)"); in llms.txt, the PDF and the
  Organization JSON-LD (`telephone`, one `ContactPoint` each).
- `site.whatsapp` stays `918858349017` (the user's original number).

## WhatsApp chat (`components/whatsapp-chat.tsx`)
- A green "Chat with us" button at the bottom right of every page (icon
  only on phones), as in the user's reference screenshot. Not on /studio/.
- It opens a small chat window: the Nirman logo, "Replies within 2 working
  hours (IST)", a greeting, and a message box. **Enter** opens WhatsApp in a
  new tab with the message ready for the WhatsApp number (the page address
  is added at the end); **Shift+Enter** is a new line; an empty message
  shows "Type a message first."; Escape or the X closes it.
- Nothing is sent by the site; WhatsApp does the sending. A `whatsapp_chat`
  event (no message text) goes to the data layer for Tag Manager.
- **The icon is a generic chat bubble, not the WhatsApp logo**, following
  the client rule (no WhatsApp logos in our own artwork) and matching the
  user's reference. Swapping in the official logo is a one-line change if
  the user decides to set the rule aside for this button.
- Gotcha fixed during testing: `window.open(url, "_blank", "noopener")`
  returns null even when the tab opens, so the page also navigated away.
  Open without "noopener" and set `tab.opener = null`.

## Verified
Production build at 1440 and 375: the chat opens and focuses the box,
refuses an empty message, Enter opened
`api.whatsapp.com/send/?phone=918858349017&text=...` with the typed lines,
the window closes after sending and with Escape, the page stays put, one
data-layer event; both numbers are tel: links on Contact and in the footer;
no horizontal scroll; the button is not on /studio/; PDF cover shows the
logo; favicon, icon and apple-touch-icon are served.
