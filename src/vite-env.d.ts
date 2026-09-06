/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity project id (10-char). Unset locally → Clarity is a no-op. */
  readonly VITE_CLARITY_PROJECT_ID?: string;
  /** Cloudflare Web Analytics beacon token. Unset locally → beacon is a no-op. */
  readonly VITE_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
