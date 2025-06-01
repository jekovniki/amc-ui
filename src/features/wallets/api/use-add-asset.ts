import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WalletQueries } from "./query-keys";
import { WalletAsset } from "../types/asset";

export function useAddAsset(entityId: string) {
  const client = useQueryClient();

  return useMutation<{ data: void }, Error, WalletAsset>({
    mutationFn: (input: WalletAsset) =>
      api.post(`/api/v1/wallet/${entityId}`, input),
    onSuccess: () =>
      client.invalidateQueries(WalletQueries.Wallets as InvalidateQueryFilters),
  });
}
