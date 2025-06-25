import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ObligationQueryKeys } from "./query-keys";
import { Obligation } from "../types/obligation";

export function useDeleteObligation() {
  const client = useQueryClient();

  return useMutation<{ data: Obligation }, Error, string>({
    mutationFn: (obligationId: string) =>
      api.delete(`/api/v1/obligation/${obligationId}`),
    onSuccess: () =>
      client.invalidateQueries(
        ObligationQueryKeys.Obligations as InvalidateQueryFilters
      ),
  });
}
