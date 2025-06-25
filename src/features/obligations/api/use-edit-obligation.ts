import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ObligationQueryKeys } from "./query-keys";
import { EditObligationRequest, Obligation } from "../types/obligation";

export function useEditObligation() {
  const client = useQueryClient();

  return useMutation<{ data: Obligation }, Error, EditObligationRequest>({
    mutationFn: ({ id, ...request }: EditObligationRequest) =>
      api.patch(`/api/v1/obligation/${id}`, request),
    onSuccess: () =>
      client.invalidateQueries(
        ObligationQueryKeys.Obligations as InvalidateQueryFilters
      ),
  });
}
