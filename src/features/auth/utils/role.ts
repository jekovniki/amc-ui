import { RoleTranslations } from "../types/role";

const roleTranslations: RoleTranslations = {
  bg: {
    Administrator: "Администратор",
    Employee: "Служител",
  },
};

export const getTranslatedRoleName = (
  roleName: string,
  currentLanguage: string
): string => {
  const isBulgarian = currentLanguage === "bg";
  return isBulgarian && roleTranslations.bg[roleName]
    ? roleTranslations.bg[roleName]
    : roleName;
};
