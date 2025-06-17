import { useQuery } from "@tanstack/react-query";
import api from "@/lib/fetch";

export function useGetFileURLByFilename(
  fileName: string,
  enabled: boolean,
  folder?: string
) {
  const queryString = folder ? `?folder=${folder}` : "";
  return useQuery<{ data: string }>({
    queryKey: [],
    queryFn: () => api.get(`/api/v1/file/${fileName}${queryString}`),
    enabled: enabled && !!fileName,
  });
}
