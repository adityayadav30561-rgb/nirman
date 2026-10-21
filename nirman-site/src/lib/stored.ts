"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
 * Tiny localStorage-backed state for per-visitor choices (cookie consent,
 * dismissed pop-ups). Reads are safe during SSR (null) and in browsers that
 * block storage. Writes notify every hook using the same key.
 */

const EVENT = "nirman-storage";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Returns [value, setValue]. `undefined` until hydrated, then the stored string or null. */
export function useStored(key: string): [string | null | undefined, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => undefined,
  );
  const set = useCallback((v: string) => writeStored(key, v), [key]);
  return [value, set];
}

/** Cookie consent: "all" (analytics allowed), "necessary", or null (not chosen yet). */
export const CONSENT_KEY = "nirman-consent";
