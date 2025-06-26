export type AddRuleRequest = {
  name: string;
  minLimit: number;
  maxLimit: number;
  type: RuleType;
};

export type EditRuleRequest = {
  id: number;
  name?: string;
  minLimit?: number;
  maxLimit?: number;
  type?: RuleType;
};

export enum RuleType {
  PerAsset = "per_asset",
  PerGroup = "per_group",
}

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
