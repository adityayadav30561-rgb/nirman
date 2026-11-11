# S5 Cookie consent

Status: built and verified (2026-11-11). User request, after Google Tag
Manager was added.

## How it works
- **Google Consent Mode v2.** The one script in `app/layout.tsx` sets
  `analytics_storage`, `ad_storage`, `ad_user_data` and
  `ad_personalization` to `denied` before Tag Manager loads, unless this
  browser has a saved choice. Google's tags then run without cookies until
  consent is given.
- **Banner** (`components/cookie-consent.tsx`): bottom left card (full
  width on phones). "Accept all", "Only necessary", or "Choose" with
  separate Analytics and Marketing switches. Shown to every visitor (the
  site cannot know the visitor's country without making every page
  dynamic). Not shown on `/studio/`.
- The choice is saved in the browser (`localStorage` key `nirman-consent`)
  for six months, applied on every page load, and sent to Tag Manager as a
  `consent update` plus a `consent_update` data-layer event.
- "Cookie settings" in the footer's bottom bar opens the banner again with
  the saved choice.
- One design, no variants (a small standard control).

## For whoever manages the Tag Manager container
Google tags (Analytics, Ads) follow these signals on their own. **Any other
tag** (a pixel, a heatmap tool) must be given a consent requirement in its
tag settings ("Additional consent checks"), or it will fire before consent.

## Verified
First visit: banner shows and the default is denied for both; saving a
choice sends the update and hides the banner; the next page load starts
from the saved choice; the footer link reopens it with the saved switches;
"Only necessary" sends denied. 375 wide: no horizontal scroll. Not shown in
the editor. The privacy policy describes all of this.
