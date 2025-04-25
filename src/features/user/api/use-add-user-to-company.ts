import api from "@/lib/fetch";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserQueryKeys } from "./query-keys";
import { AddUserToCompanyRequest } from "../types/user";

export function useAddUserToCompany() {
  const client = useQueryClient();

  return useMutation<{ data: void }, Error, AddUserToCompanyRequest>({
    mutationFn: (input: AddUserToCompanyRequest) =>
      api.post("/api/v1/user", input),
    onSuccess: () =>
      client.invalidateQueries(UserQueryKeys.Users as InvalidateQueryFilters),
  });
}
