import { getLocales } from 'expo-localization';
import { useMemo } from 'react';

// Mock conversion rate for demonstration
const EXCHANGE_RATE = 0.05; // 1 MXN = 0.05 USD (approx)

export const useCurrency = () => {
  const locale = getLocales()[0]?.currencyCode || 'MXN';
  const isUSD = locale === 'USD';

  const formatPrice = (amountInMXN: number) => {
    if (isUSD) {
        const amountInUSD = amountInMXN * EXCHANGE_RATE;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amountInUSD);
    }

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amountInMXN);
  };

  return { formatPrice, currency: isUSD ? 'USD' : 'MXN' };
};
