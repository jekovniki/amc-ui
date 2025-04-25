import { ApiError } from "@/types/generic";
import { TFunction } from "i18next";
import { Dispatch, SetStateAction } from "react";

export const apiErrorHandler = (
  error: Error | ApiError,
  setLoader: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  setLoaderMessage: Dispatch<SetStateAction<string>>,
  t: TFunction<"translation", undefined>
) => {
  setLoaderMessage("");
  setLoader(false);
  const isApiError = (err: Error | ApiError): err is ApiError => {
    return "response" in err;
  };

  setError(
    isApiError(error) && error.response?.data?.message
      ? error.response.data.message
      : error.message || t("errors.unknown")
  );

  console.error(error);
};
