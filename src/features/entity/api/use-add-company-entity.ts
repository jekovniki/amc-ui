import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AddEntityRequest, Entity } from "../types/entity";
import { EntityQueries } from "./query-keys";

export function useAddCompanyEntity() {
  const client = useQueryClient();

  return useMutation<{ data: Entity }, Error, AddEntityRequest>({
    mutationFn: (input: AddEntityRequest) => api.post("/api/v1/entity/", input),
    onSuccess: () =>
      client.invalidateQueries(
        EntityQueries.Entities as InvalidateQueryFilters
      ),
  });
}
