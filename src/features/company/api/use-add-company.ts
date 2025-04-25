import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AddCompanyRequest, Company } from "../types/company";
import { CompanyQueryKeys } from "./query-keys";

export function useAddCompany() {
  const client = useQueryClient();

  return useMutation<{ data: Company }, Error, AddCompanyRequest>({
    mutationFn: (input: AddCompanyRequest) =>
      api.post("/api/v1/company", input),
    onSuccess: () =>
      client.invalidateQueries(
        CompanyQueryKeys.Companies as InvalidateQueryFilters
      ),
  });
}
