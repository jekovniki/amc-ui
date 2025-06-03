import { useQuery } from "@tanstack/react-query";
import { WalletQueries } from "./query-keys";
import api from "@/lib/fetch";
import { WalletStructureResponse } from "../types/wallet";
import { WalletStructureFilter } from "../types/wallet-structure";

export function useGetWalletStructureBy(
  entityId: string,
  type: WalletStructureFilter
) {
  return useQuery<{ data: undefined | WalletStructureResponse }>({
    queryKey: WalletQueries.Wallet(entityId),
    queryFn: () => api.get(`/api/v1/wallet/${entityId}/structure/${type}`),
  });
}
