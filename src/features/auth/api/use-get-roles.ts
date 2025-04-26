import { useQuery } from "@tanstack/react-query";
import { AuthQueryKeys } from "./query-keys";
import api from "@/lib/fetch";
import { UserRole } from "../types/role";

export function useGetRoles() {
  return useQuery<{ data: { data: UserRole[] } }>({
    queryKey: [AuthQueryKeys.Roles],
    queryFn: () => api.get("/api/v1/auth/role"),
  });
}
