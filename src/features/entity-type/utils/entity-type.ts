import { EntityTypeTranslations } from "../types/entity-type";

const entityTypeTranslations: EntityTypeTranslations = {
  bg: {
    Fund: "Договорен фонд",
    "Investment company": "Инвестиционно дружество",
    "Alternative Investment Fund": "Алтернативен Инвестиционен Фонд",
    "National Investment Fund": "Национален Договорен Фонд",
    Other: "Друго",
  },
};

export const getTranslatedEntityType = (
  entityTypeName: string,
  currentLanguage: string
) => {
  const isBulgarian = currentLanguage === "bg";
  return isBulgarian && entityTypeTranslations.bg[entityTypeName]
    ? entityTypeTranslations.bg[entityTypeName]
    : entityTypeName;
};
