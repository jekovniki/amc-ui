import api from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { SignUpRequest } from "../types/sign-up";

export function useSignUp() {
  return useMutation<{ data: void }, Error, SignUpRequest>({
    mutationFn: (input: SignUpRequest) =>
      api.post("/api/v1/auth/sign-up", input),
  });
}
