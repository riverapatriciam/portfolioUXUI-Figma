# Analytics

Two tools, on purpose:

| Tool                         | Cookies? | Consent banner? | What it answers                                                                                                            |
| ---------------------------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Web Analytics** | No       | No              | How many visits, from where (referrers), which pages, load speed / Core Web Vitals — for **everyone**                      |
| **Microsoft Clarity**        | Yes      | Yes (`Accept`)  | _How_ people use the page: session replays, heatmaps, rage clicks, scroll depth, dead clicks — for visitors who **accept** |

Cloudflare also has a separate **Traffic Analytics** page (requests, bandwidth, cache %, threats). Nothing to set up there — it's always on. Look at it monthly for site health, not for visitor behaviour.

---

## One-time setup

### 1. Cloudflare Web Analytics

1. `dash.cloudflare.com` → your domain → **Analytics & Logs → Web Analytics** → **Add a site**.
2. Enter the domain. It shows a `<script … data-cf-beacon='{"token":"XXXX"}'>` snippet.
3. Copy the **token** (the `XXXX`) into `.env` as `VITE_CF_BEACON_TOKEN`.

### 2. Microsoft Clarity

1. Sign in at `clarity.microsoft.com` → **New project** → name it, category "Portfolio", platform "Web".
2. **Settings → Overview** → copy the **Clarity project id** (10 characters) into `.env` as `VITE_CLARITY_PROJECT_ID`.
3. **Settings → Setup → Cookie consent** → turn **ON**. The site only calls `clarity("consent")` after the visitor clicks _Accept_, so this keeps Clarity from buffering anything before that.
4. **Settings → Masking** → set to **Balanced** (or Strict). Masks text in replays so no personal data is recorded.
5. Optional — **Settings → Team** → invite people if you ever want to show the recordings.

### 3. Build with the values

```bash
cp .env.example .env      # then paste the two values in
npm run build             # bakes them into dist/
```

Then commit `dist/` and deploy as usual. `.env` is git-ignored; the values aren't secret but they don't belong in history.

Locally without `.env`, both tools are silently disabled — the site runs normally.

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
- `src/app/components/ConsentBanner.tsx` — the banner. `Accept` and `Decline` are both one click. `Decline` never loads Clarity; switching from `Accept` to `Decline` calls `clarity("consent", false)` and reloads.
- Footer **"Cookie settings"** re-opens the banner so a choice can be changed at any time (GDPR: consent must be as easy to withdraw as to give).
- `src/app/analytics/cloudflare.ts` loads on every page view (cookieless, no consent needed). To be maximally conservative you could move that call into the `Accept` branch too.
