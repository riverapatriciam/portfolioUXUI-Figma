/**
 * Cookie-consent state for the analytics that need it (Microsoft Clarity).
 *
 * One value in `localStorage`: "accepted" | "rejected" | (absent = not asked).
 * Cloudflare Web Analytics does NOT go through here — it's cookieless and
 * loads for everyone (see `cloudflare.ts`).
 */

export type ConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "cookie-consent";

/** Fired on `window` whenever the choice changes, so open UI can react in-page. */
export const CONSENT_CHANGE_EVENT = "cookie-consent-change";
/** Fired on `window` to re-open the banner (e.g. the footer "Cookie settings" link). */
export const OPEN_CONSENT_EVENT = "open-cookie-settings";

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    // Private mode / storage blocked — treat as "not asked".
    return null;
  }
}

export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Can't persist — the choice still applies for this page load via the event.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}
