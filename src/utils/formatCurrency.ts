/**
 * Formats a numeric price as Indian Rupee (INR) currency.
 */
export const formatCurrency = (price: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
