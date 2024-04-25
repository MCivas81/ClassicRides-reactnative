export function formatCurrency(value, locale = "it-IT", currency = "EUR") {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
  return formattedValue;
}
