import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WalletQueries } from "../query-keys";

export function useDeleteRule(entityId: string) {
  const client = useQueryClient();

  return useMutation<{ data: void }, Error, number>({
    mutationFn: (ruleId: number) =>
      api.delete(`/api/v1/wallet/${entityId}/rules/${ruleId}`),
    onSuccess: () =>
      client.invalidateQueries(WalletQueries.Rules as InvalidateQueryFilters),
  });
}
