/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_MAX_RETRIES: string;
  readonly VITE_RETRY_DELAY: string;
  readonly VITE_PREMIUM_PRICE_SATS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}