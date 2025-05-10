import {
  mutationErrorHandler,
  queryErrorHandler,
} from "@/features/auth/services/refresh-token-error-handler";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Disable refetching on window focus globally
            refetchOnReconnect: false, // Disable refetching on reconnect globally
            staleTime: 1000 * 60 * 5,
          },
        },
        queryCache: new QueryCache({
          onError: queryErrorHandler,
        }),
        mutationCache: new MutationCache({
          onError: mutationErrorHandler,
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
