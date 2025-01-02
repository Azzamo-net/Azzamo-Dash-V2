interface EnvConfig {
  apiBaseUrl: string;
  maxRetries: number;
  retryDelay: number;
  pricePerDaySats: number;
  demoMode: boolean;
  discounts: {
    oneMonth: number;
    sixMonths: number;
    twelveMonths: number;
  };
  lnbits: {
    url: string;
    apiKey: string;
    webhook: string;
  };
}

export const env: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  maxRetries: Number(import.meta.env.VITE_MAX_RETRIES) || 3,
  retryDelay: Number(import.meta.env.VITE_RETRY_DELAY) || 1000,
  pricePerDaySats: Number(import.meta.env.VITE_PRICE_PER_DAY_SATS) || 30,
  demoMode: import.meta.env.VITE_DEMO_MODE === 'true',
  discounts: {
    oneMonth: Number(import.meta.env.VITE_DISCOUNT_1_MONTH) || 1,
    sixMonths: Number(import.meta.env.VITE_DISCOUNT_6_MONTHS) || 5,
    twelveMonths: Number(import.meta.env.VITE_DISCOUNT_12_MONTHS) || 10,
  },
  lnbits: {
    url: import.meta.env.VITE_LNBITS_URL,
    apiKey: import.meta.env.VITE_LNBITS_API_KEY,
    webhook: import.meta.env.VITE_LNBITS_WEBHOOK,
  },
};