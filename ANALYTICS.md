# Analytics

Two tools, on purpose:

| Tool                         | Cookies? | Consent banner? | What it answers                                                                                                            |
| ---------------------------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Web Analytics** | No       | No              | How many visits, from where (referrers), which pages, load speed / Core Web Vitals — for **everyone**                      |
| **Microsoft Clarity**        | Yes      | Yes (`Accept`)  | _How_ people use the page: session replays, heatmaps, rage clicks, scroll depth, dead clicks — for visitors who **accept** |

Cloudflare also has a separate **Traffic Analytics** page (requests, bandwidth, cache %, threats). Nothing to set up there — it's always on. Look at it monthly for site health, not for visitor behaviour.

---

## How each one is wired

### Cloudflare Web Analytics — no code

Injected at the edge. Cloudflare dashboard → **Analytics & Logs → Web Analytics → Manage site** (`riverapatriciam.com`) → **Real User Measurements (RUM)** → **Enable** ("the JS snippet will be automatically injected"). That's it — the `beacon.min.js` script appears in the served HTML automatically, no env var, no repo change.

> Some visitors (ad blockers, Brave, filtering DNS) block `static.cloudflareinsights.com` — you'll see `ERR_CONNECTION_REFUSED` for `beacon.min.js` in _your own_ console. That's expected and unavoidable; it loads fine for everyone else. The beacon also makes two requests (loader + versioned script) — that's one beacon, not two.

### Microsoft Clarity — one build variable

The Clarity project id lives in the deploy pipeline, not in the repo:

**Cloudflare → Workers & Pages → `portfoliouxui-figma` → Settings → Build → Variables and secrets**

| Name                      | Value                  | Type     |
| ------------------------- | ---------------------- | -------- |
| `VITE_CLARITY_PROJECT_ID` | the 10-char Clarity id | Variable |

Vite inlines any `VITE_`-prefixed variable at build time, so `import.meta.env.VITE_CLARITY_PROJECT_ID` becomes the id in the bundle. When it's unset (local `npm run dev` without a `.env`), every function in `clarity.ts` is a no-op — nothing loads.

**Changing this variable does not rebuild the site.** After adding or editing it, trigger a build: **New deployment** in the dashboard, or push any commit to `main`.

---

## First-time Clarity setup

1. Sign in at `clarity.microsoft.com` → **New project** → name it, category "Portfolio", platform "Web".
2. **Settings → Overview** → copy the **Clarity project id** (10 chars).
3. **Settings → Setup → Cookie consent** → turn **ON**. The site only calls `clarity("consent")` after the visitor clicks _Accept_, so this stops Clarity buffering anything before consent.
4. **Settings → Masking** → **Balanced** (or Strict). Masks text in replays so no personal data is recorded.
5. Put the id in the Cloudflare build variable above → **New deployment**.
6. Verify in a browser with **no ad blocker**: load the site → _Accept_ → DevTools **Network**, filter `clarity` → requests to `clarity.ms` return 200, cookies `_clck` / `_clsk` appear. Your session shows in Clarity → **Recordings** within ~2 min.

For local dev with Clarity active, `cp .env.example .env` and paste the id there.

---

## Custom / Smart events (optional)

Clarity records **every** click already, so you rarely need code. To make key conversions filterable:

- **No code:** Clarity dashboard → **Settings → Smart events** → add events by clicked text or URL, e.g.
  - `CV download` → element URL contains `Patricia-Rivera-CV`
  - `Email click` → element URL starts with `mailto:`
  - `Schedule a call` → element URL contains `calendly.com`
- **With code:** call `clarityEvent("cv-download")` from `src/app/analytics/clarity.ts` in an `onClick`.

---

## What to check each week (5 minutes)

**Cloudflare Web Analytics**

- **Visits** trend — did sharing the link (LinkedIn, an application) move it?
- **Referrers** — which channel actually sends people.
- **Top pages** — which case study gets opened.
- **Core Web Vitals** — all green? (recruiters feel a slow site.)

**Clarity**

- **Dashboard** → _Scroll depth_ on the home page: are people reaching the Case studies / Contact sections, or bouncing in the Hero?
- **Dashboard** → _Dead clicks_ / _Rage clicks_: something looks clickable but isn't, or is broken.
- **Recordings** → watch 3–5 of the longest sessions: where do people slow down, what do they open, do they reach "Get in touch"?
- **Heatmaps** → home page: are the CV button and project cards getting the clicks?

---

## Consent — how it works in code

- `src/app/analytics/consent.ts` — stores `accepted` / `rejected` in `localStorage`.
- `src/app/analytics/clarity.ts` — injects the Clarity tag **only after `Accept`** and calls `clarity("consent")`; `stopClarity()` withdraws it.
- `src/app/components/ConsentBanner.tsx` — the banner. `Accept` and `Decline` are both one click. `Decline` never loads Clarity; switching from `Accept` to `Decline` calls `clarity("consent", false)` and reloads.
- Footer **"Cookie settings"** re-opens the banner so a choice can be changed at any time (GDPR: consent must be as easy to withdraw as to give).
