import { useQuery } from "@tanstack/react-query";
import { WalletQueries } from "./query-keys";
import api from "@/lib/fetch";

export function useGetAssetTypes() {
  return useQuery<{ data: undefined | Array<{ id: number; name: string }> }>({
    queryKey: WalletQueries.AssetTypes,
    queryFn: () => api.get(`/api/v1/wallet/asset-type`),
  });
}
