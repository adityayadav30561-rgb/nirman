"use client";

import { useSyncExternalStore } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

const noop = () => () => {};

/**
 * The Sanity editor, full screen above the site's header and footer. It is
 * rendered in the browser only: on the server (and in the build) this is
 * just the "Opening" line, so the route stays a static page.
 */
export function Studio() {
  const inBrowser = useSyncExternalStore(noop, () => true, () => false);
  if (!inBrowser) return <p className="container-page py-28 text-muted">Opening the editor…</p>;
  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <NextStudio config={config} />
    </div>
  );
}
