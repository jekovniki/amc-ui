export const WalletQueries = {
  Wallets: ["wallets"],
  Wallet: (id: string) => ["wallet", id],
  AssetTypes: ["asset-types"],
  Rules: ["rules"],
  Rule: (id: number) => ["rule", id],
};
