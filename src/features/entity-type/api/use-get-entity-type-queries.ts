import { useQuery } from "@tanstack/react-query";
import { EntityTypeQueries } from "./query-keys";
import api from "@/lib/fetch";
import { EntityTypeResponse } from "../types/entity-type";

export function useGetEntityTypeQueries() {
  return useQuery<{ data: undefined | EntityTypeResponse[] }>({
    queryKey: [EntityTypeQueries.EntityType],
    queryFn: () => api.get("/api/v1/entity/type"),
  });
}
