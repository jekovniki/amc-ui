import api from "@/lib/fetch";
import { SignInResponse } from "../types/sign-in";

export const refreshToken = async (): Promise<SignInResponse> => {
  const { data } = await api.post("/api/v1/auth/refresh-token");

  return data;
};
