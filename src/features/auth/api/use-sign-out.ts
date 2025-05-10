import api from "@/lib/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignOut() {
  const client = useQueryClient();
  return useMutation<{ data: void }, Error, void>({
    mutationFn: () => api.post("/api/v1/auth/sign-out"),
    onSuccess: () => client.invalidateQueries(),
  });
}
