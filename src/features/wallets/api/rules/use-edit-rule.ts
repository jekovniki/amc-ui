import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { WalletQueries } from "../query-keys";
import { EditRuleRequest, Rule } from "../../types/rules";

export function useEditRules(entityId: string) {
  const client = useQueryClient();

  return useMutation<{ data: Rule }, Error, EditRuleRequest>({
    mutationFn: ({ id, ...request }: EditRuleRequest) =>
      api.patch(`/api/v1/wallet/${entityId}/rules/${id}`, request),
    onSuccess: (response) =>
      client.invalidateQueries(
        WalletQueries.Rule(response.data.id) as InvalidateQueryFilters
      ),
  });
}
