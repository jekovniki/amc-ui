export type EntityTypeResponse = {
  id: number;
  name: string;
};

export type EntityTypeTranslations = {
  [language: string]: {
    [entityType: string]: string;
  };
};
