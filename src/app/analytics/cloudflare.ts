/**
 * Cloudflare Web Analytics beacon.
 *
 * Cookieless and privacy-first: no client-side state, no fingerprinting, no
 * cross-site tracking. Cloudflare's guidance is that it does not require a
 * consent banner, so this loads for every visitor and gives the baseline
 * page-view / referrer / Core Web Vitals numbers (including from people who
 * decline Clarity).
 *
 * Token comes from `VITE_CF_BEACON_TOKEN`; unset → no-op. If you'd rather be
 * maximally conservative, call this from the "Accept" branch of the banner
 * instead of on load.
 */

const TOKEN = import.meta.env.VITE_CF_BEACON_TOKEN;

let loaded = false;

export function loadCloudflareAnalytics(): void {
  if (loaded || !TOKEN || typeof document === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute("data-cf-beacon", JSON.stringify({ token: TOKEN }));
  document.head.appendChild(script);
}
