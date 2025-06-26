import { useQuery } from "@tanstack/react-query";
import { WalletQueries } from "../query-keys";
import api from "@/lib/fetch";
import { Rule } from "../../types/rules";

export function useGetRule(entityId: string, ruleId: string = "me") {
  return useQuery<{ data: undefined | Rule }>({
    queryKey: WalletQueries.Rules,
    queryFn: () => api.get(`/api/v1/wallet/${entityId}/rules/${ruleId}`),
  });
}
