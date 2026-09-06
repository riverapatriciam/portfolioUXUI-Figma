/**
 * Microsoft Clarity — session recordings + heatmaps.
 *
 * Clarity sets first-party cookies (`_clck`, `_clsk`), so under the EU
 * ePrivacy directive / GDPR it needs prior consent. This module therefore
 * injects the Clarity tag ONLY after the visitor clicks "Accept" in the
 * consent banner — see `consent.ts` and `ConsentBanner.tsx`.
 *
 * Project id comes from `VITE_CLARITY_PROJECT_ID` at build time. When it's
 * unset (local dev before the Clarity project exists) every export here is a
 * no-op, so nothing breaks and no network request is made.
 */

const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let injected = false;

/**
 * Load Clarity and signal consent. Safe to call more than once (e.g. the
 * visitor re-opens "Cookie settings" and accepts again) — the tag is only
 * added on the first call.
 */
export function startClarity(): void {
  if (!PROJECT_ID || typeof document === "undefined") return;

  if (!injected) {
    injected = true;

    const w = window as Window & typeof globalThis;
    w.clarity =
      w.clarity ||
      function (...args: unknown[]) {
        (w.clarity!.q = w.clarity!.q || []).push(args);
      };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
    document.head.appendChild(script);
  }

  // With "Cookie consent" enabled in the Clarity dashboard, Clarity buffers
  // everything until this call — so the Accept click is what starts tracking.
  window.clarity?.("consent");
}

/**
 * Withdraw consent. The tag can't be fully unloaded once it's on the page,
 * so the caller (the banner) reloads after this to guarantee a clean stop.
 */
export function stopClarity(): void {
  try {
    window.clarity?.("consent", false);
  } catch {
    // ignore
  }
}

/**
 * Fire a custom Clarity event for a key conversion (e.g. "cv-download").
 * No-op until Clarity is running. Most events can instead be defined
 * code-free as "Smart events" in the Clarity dashboard — see ANALYTICS.md.
 */
export function clarityEvent(name: string): void {
  try {
    window.clarity?.("event", name);
  } catch {
    // ignore
  }
}
