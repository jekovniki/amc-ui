import { useQuery } from "@tanstack/react-query";
import { ObligationQueryKeys } from "./query-keys";
import api from "@/lib/fetch";
import { Obligation } from "../types/obligation";

export function useGetObligations(id: string) {
  return useQuery<{ data: Obligation }>({
    queryKey: [ObligationQueryKeys.Obligation],
    queryFn: () => api.get(`/api/v1/obligation?id=${id}`),
  });
}
