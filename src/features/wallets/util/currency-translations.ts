export const getTranslatedCurrency = (currency: string) => {
  if (currency.toLowerCase() === "bgn") {
    return "лева";
  }
  if (currency.toLowerCase() === "eur") {
    return "евро";
  }
  if (currency.toLowerCase() === "usd") {
    return "долара";
  }

  return currency;
};
