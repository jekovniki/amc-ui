import { useMutation } from "@tanstack/react-query";
import { UploadFileWithUrlRequest } from "../types/presigned-url";
import axios from "axios";

const apiWithoutCredentials = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "localhost:3000",
});

export function useUploadFileWithUrl() {
  return useMutation<{ url: string }, Error, UploadFileWithUrlRequest>({
    mutationFn: (input: UploadFileWithUrlRequest) =>
      apiWithoutCredentials[input.method](input.presignedUrl),
  });
}
