import { Mutation, Query } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { refreshToken } from "../api/use-refresh-token";
import session from "./session";
import { PublicRoutePath } from "@/pages/routes";

interface IErrorResponse {
  message: string;
}

let isRedirecting = false;
let isRefreshing = false;
let failedQueue: {
  query?: Query;
  mutation?: Mutation<unknown, unknown, unknown, unknown>;
  variables?: unknown;
}[] = [];

const errorHandler = (
  error: Error,
  query?: Query,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  const { status, data } = (error as AxiosError<IErrorResponse>).response!;

  if (status === 401) {
    if (mutation) {
      refreshTokenAndRetry(undefined, mutation, variables);
    } else {
      refreshTokenAndRetry(query);
    }
  } else console.error(data?.message);
};

export const queryErrorHandler = (error: Error, query: any) => {
  errorHandler(error, query);
};

export const mutationErrorHandler = (
  error: Error,
  variables: unknown,
  context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  errorHandler(error, undefined, mutation, variables);
};

const processFailedQueue = () => {
  failedQueue.forEach(({ query, mutation, variables }) => {
    if (mutation) {
      const { options } = mutation;
      mutation.setOptions({ ...options });
      mutation.execute(variables);
    }
    if (query) query.fetch();
  });
  isRefreshing = false;
  failedQueue = [];
};

const refreshTokenAndRetry = async (
  query?: Query,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      failedQueue.push({ query, mutation, variables });
      const data = await refreshToken();
      session.set(data.sessionData);
      processFailedQueue();
    } else failedQueue.push({ query, mutation, variables });
  } catch {
    if (!isRedirecting) {
      isRedirecting = true;
      window.location.href = PublicRoutePath.Unauthorized;
    }
  }
};
