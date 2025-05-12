import { useQuery } from "@tanstack/react-query";
import api from "@/lib/fetch";
import { Entity } from "../types/entity";
import { EntityQueries } from "./query-keys";

export function useGetEntity(id: string) {
  return useQuery<{ data: undefined | Entity }>({
    queryKey: EntityQueries.Entity(id),
    queryFn: () => api.get(`/api/v1/entity/${id}`),
  });
}
