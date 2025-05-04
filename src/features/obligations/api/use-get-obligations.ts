import { useQuery } from "@tanstack/react-query";
import { ObligationQueryKeys } from "./query-keys";
import api from "@/lib/fetch";
import { Obligation, ObligationStatus } from "../types/obligation";

export function useGetObligations(status?: ObligationStatus) {
  let route = "/api/v1/obligation";
  if (status) {
    route += `?status=${status}`;
  }
  return useQuery<{ data: Obligation }>({
    queryKey: [ObligationQueryKeys.Obligations],
    queryFn: () => api.get(route),
  });
}
