import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "./query-keys";
import api from "@/lib/fetch";
import { Company } from "../types/company";

export function useGetCompany() {
  return useQuery<{ data: Company }>({
    queryKey: [CompanyQueryKeys.Companies],
    queryFn: () => api.get("/api/v1/company"),
  });
}
