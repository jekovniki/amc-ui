export function getAssetTypeStructureByLanguage(
  name: string,
  language: string
) {
  const text = {
    stocks: {
      en: "Stocks",
      bg: "Акции",
    },
    bonds: {
      en: "Corporate bonds",
      bg: "Корпоративни облигации",
    },
    ucits: {
      en: "Collective Investment Schemes shares",
      bg: "Дялове на колективни инвестиционни схеми",
    },
    money: {
      en: "Money and deposits",
      bg: "Пари и депозити",
    },
    other: {
      en: "Other assets",
      bg: "Други активи",
    },
    receivables: {
      en: "Receivables",
      bg: "Вземания",
    },
  };
  if (language === "bg") {
    switch (name) {
      case text.stocks.en:
        return text.stocks.bg;
      case text.bonds.en:
        return text.bonds.bg;
      case text.ucits.en:
        return text.ucits.bg;
      case text.money.en:
        return text.money.bg;
      case text.other.en:
        return text.other.bg;
      case text.receivables.en:
        return text.receivables.bg;
      default:
        return name;
    }
  }
  if (language === "en") {
    switch (name) {
      case text.stocks.bg:
        return text.stocks.en;
      case text.bonds.bg:
        return text.bonds.en;
      case text.ucits.bg:
        return text.ucits.en;
      case text.money.bg:
        return text.money.en;
      case text.other.bg:
        return text.other.en;
      case text.receivables.bg:
        return text.receivables.en;
      default:
        return name;
    }
  }

  return name;
}
