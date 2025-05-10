export function getEntityNameByLanguage(name: string, language: string) {
  if (language === "bg") {
    switch (name) {
      case "Fund":
        return "Договорен фонд";
      case "Investment company":
        return "Инвестиционно дружество";
      case "Alternative Investment Fund":
        return "Алтернативен Инвестиционен Фонд";
      case "National Investment Fund":
        return "Национален Инвестиционен Фонд";
      case "Other":
        return "Друго";
      default:
        return name;
    }
  }

  return name;
}
