const intl = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "EUR",
});

export const priceConverter = (price) => intl.format(price);

export function useCurrency(price) {
  return priceConverter(price);
}
