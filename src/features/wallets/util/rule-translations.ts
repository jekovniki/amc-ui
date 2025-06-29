import { RulesTypeOfRestriction, RuleType } from "../types/rules";

export const getTranslatedRuleType = (
  type: RulesTypeOfRestriction
): RuleType => {
  if (type.toLowerCase() === RulesTypeOfRestriction.Asset) {
    return RuleType.PerAsset;
  }
  if (type.toLowerCase() === RulesTypeOfRestriction.Group) {
    return RuleType.PerGroup;
  }

  if (type.toLowerCase() === RulesTypeOfRestriction.TypeOfAsset) {
    return RuleType.PerTypeAsset;
  }

  return RuleType.All;
};
