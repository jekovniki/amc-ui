import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WalletQueries } from "../query-keys";
import { AddRuleRequest } from "../../types/rules";

export function useAddRule(entityId: string) {
  const client = useQueryClient();

  return useMutation<{ data: void }, Error, AddRuleRequest>({
    mutationFn: (input: AddRuleRequest) =>
      api.post(`/api/v1/wallet/${entityId}/rules`, input),
    onSuccess: () =>
      client.invalidateQueries(WalletQueries.Rules as InvalidateQueryFilters),
  });
}
