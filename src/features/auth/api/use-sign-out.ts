import api from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";

export function useSignOut() {
  return useMutation<{ data: void }, Error, void>({
    mutationFn: () => api.post("/api/v1/auth/sign-out"),
  });
}
