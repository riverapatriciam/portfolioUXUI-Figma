/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity project id (10-char). Unset → Clarity is a no-op. */
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
