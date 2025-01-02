import { env } from '../config/env';

export const calculatePrice = (days: number) => {
  let discount = 0;
  
  if (days >= 365) {
    discount = env.discounts.twelveMonths;
  } else if (days >= 180) {
    discount = env.discounts.sixMonths;
  } else if (days >= 30) {
    discount = env.discounts.oneMonth;
  }

  const basePrice = days * env.pricePerDaySats;
  const finalPrice = Math.round(basePrice * (1 - discount / 100));

  return {
    basePrice,
    discount,
    finalPrice,
  };
};