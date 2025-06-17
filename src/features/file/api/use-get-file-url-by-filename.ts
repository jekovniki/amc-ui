import { useQuery } from "@tanstack/react-query";
import api from "@/lib/fetch";

export function useGetFileURLByFilename(fileName: string, enabled: boolean) {
  return useQuery<{ data: string }>({
    queryKey: [],
    queryFn: () => api.get(`/api/v1/file/${fileName}?folder=logos`),
    enabled: enabled && !!fileName,
  });
}
