import { useQuery } from "@tanstack/react-query";
import { EntityQueries } from "./query-keys";
import api from "@/lib/fetch";
import { Entity } from "../types/entity";

export function useGetEntity(id: string) {
  return useQuery<{ data: undefined | Entity }>({
    queryKey: [EntityQueries.Entity],
    queryFn: () => api.get(`/api/v1/entity/${id}`),
  });
}
