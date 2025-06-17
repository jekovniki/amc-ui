import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AddEntityRequest, Entity } from "../types/entity";
import { EntityQueries } from "./query-keys";
import { refreshTokenAndRetry } from "@/features/auth/services/refresh-token-error-handler";

export function useAddCompanyEntity() {
  const client = useQueryClient();

  return useMutation<{ data: Entity }, Error, AddEntityRequest>({
    mutationFn: (input: AddEntityRequest) => api.post("/api/v1/entity/", input),
    onSuccess: () => {
      refreshTokenAndRetry(); // necessary for Backend
      client.invalidateQueries(
        EntityQueries.Entities as InvalidateQueryFilters
      );
    },
  });
}
