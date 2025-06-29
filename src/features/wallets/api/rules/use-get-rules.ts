import { useQuery } from "@tanstack/react-query";
import api from "@/lib/fetch";
import { Rule } from "../../types/rules";
import { WalletQueries } from "../query-keys";

export function useGetRule(entityId: string, ruleId: string = "me") {
  return useQuery<{ data: undefined | Rule[] }>({
    queryKey: [WalletQueries.Rules, entityId, ruleId],
    queryFn: () => api.get(`/api/v1/wallet/${entityId}/rules/${ruleId}`),
    enabled: !!entityId,
  });
}
