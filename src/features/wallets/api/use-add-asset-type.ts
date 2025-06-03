import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WalletQueries } from "./query-keys";
import { AssetTypeResponse } from "../types/asset-type";

interface AssetTypeInput {
  name: string;
}

export function useAddAssetType() {
  const client = useQueryClient();

  return useMutation<{ data: AssetTypeResponse }, Error, AssetTypeInput>({
    mutationFn: (input: AssetTypeInput) =>
      api.post(`/api/v1/wallet/asset-type`, input),
    onSuccess: () =>
      client.invalidateQueries(
        WalletQueries.AssetTypes as InvalidateQueryFilters
      ),
  });
}
