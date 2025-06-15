import api from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { GetPresignedUrlRequest } from "../types/presigned-url";

export function useGetPresignedUrl() {
  return useMutation<{ data: string }, Error, GetPresignedUrlRequest>({
    mutationFn: (input: GetPresignedUrlRequest) =>
      api.post("/api/v1/file", input),
  });
}
