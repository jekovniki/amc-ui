import { useQuery } from "@tanstack/react-query";
import api from "@/lib/fetch";
import { UserQueryKeys } from "./query-keys";
import { CompanyUser } from "../types/user";

export function useGetCompanyUsers() {
  return useQuery<{ data: undefined | CompanyUser[] }>({
    queryKey: UserQueryKeys.Users,
    queryFn: () => api.get(`/api/v1/user`),
  });
}
