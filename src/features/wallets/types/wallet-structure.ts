export enum WalletStructureAssetKeys {
  name = "Име на актива",
  code = "Борсов код",
  currency = "Валута",
  assetType = "Вид актив",
  amount = "Количество",
  price = "Цена за аедин актив",
}

export type ImportWalletStructureAssets = {
  "Име на актива": string;
  "Борсов код": string;
  "ISIN код": string;
  Валута: string;
  "Вид актив": string;
  Количество: number;
  "Цена за един актив": number;
};

export enum WalletStructureFilter {
  Code = "code",
  ISIN = "isin",
  Currency = "currency",
  AssetType = "asset_type_id",
}
