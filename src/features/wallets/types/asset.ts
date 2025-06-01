export type WalletAsset = {
  name: string;
  code: string;
  isin: string;
  value: number;
  currency: WalletCurrency;
  assetTypeId: number;
  amount: number;
};

export enum WalletCurrency {
  BGN = "BGN",
  EUR = "EUR",
  USD = "USD",
}
