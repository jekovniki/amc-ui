import { useQuery } from "@tanstack/react-query";
import { EntityQueries } from "./query-keys";
import api from "@/lib/fetch";
import { Entity } from "../types/entity";

export function useGetCompanyEntities() {
  return useQuery<{ data: undefined | Entity[] }>({
    queryKey: [EntityQueries.Entities],
    queryFn: () => api.get("/api/v1/entity/me"),
  });
}
