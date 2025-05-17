import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ObligationQueryKeys } from "./query-keys";
import { AddObligationRequest, Obligation } from "../types/obligation";

export function useAddObligation() {
  const client = useQueryClient();

  return useMutation<{ data: Obligation }, Error, AddObligationRequest>({
    mutationFn: ({ entityId, ...request }: AddObligationRequest) =>
      api.post(`/api/v1/obligation/${entityId}`, request),
    onSuccess: () =>
      client.invalidateQueries(
        ObligationQueryKeys.Obligations as InvalidateQueryFilters
      ),
  });
}
