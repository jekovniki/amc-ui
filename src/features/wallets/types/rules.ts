export type AddRuleRequest = {
  name: string;
  minLimit: number;
  maxLimit: number;
  type: RuleType;
  typeValue: RuleValueType;
};

export type EditRuleRequest = {
  id: number;
  name?: string;
  minLimit?: number;
  maxLimit?: number;
  type?: RuleType;
};

export type Rule = AddRuleRequest & {
  id: number;
  company: {
    id: string;
  };
  entity: {
    id: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ImportRulesStructure = {
  "Име на ограничението": string;
  "Минимална стойност": string;
  "Максимална стойност": string;
  "Тип стойност": RuleValueType;
  "Ниво на ограничение": RulesTypeOfRestriction;
};

export enum RuleType {
  PerAsset = "per_asset",
  PerGroup = "per_group",
  All = "all",
  PerTypeAsset = "per_type_asset",
}

export enum RuleValueType {
  Percentage = "%",
  EUR = "EUR",
  BGN = "BGN",
  USD = "USD",
}

export enum RulesTypeOfRestriction {
  All = "Всички",
  Asset = "Актив",
  TypeOfAsset = "Вид актив",
  Group = "Група",
}
