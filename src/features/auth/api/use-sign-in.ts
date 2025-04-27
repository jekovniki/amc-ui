import api from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { SignInRequest, SignInResponse } from "../types/sign-in";

export function useSignIn() {
  return useMutation<{ data: SignInResponse }, Error, SignInRequest>({
    mutationFn: (input: SignInRequest) =>
      api.post("/api/v1/auth/sign-in", input),
  });
}
