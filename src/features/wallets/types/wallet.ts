export type WalletStructureResponse = {
  overview: WalletStructureOverview;
  assets: WalletStructureOverview[];
};

export type WalletStructureOverview = {
  assetCount: string;
  groupKey: string;
  percentage: string;
  totalValue: string;
};
