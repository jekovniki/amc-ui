import { ApiError } from "@/types/generic";
import { TFunction } from "i18next";
import { Dispatch, SetStateAction } from "react";

export const fundApiErrorHandler = (
  error: Error | ApiError,
  setLoader: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  t: TFunction<"translation", undefined>
) => {
  setLoader(false);
  const isApiError = (err: Error | ApiError): err is ApiError => {
    return "response" in err;
  };

  setError(
    isApiError(error) && error.response?.data?.message
      ? setTranslatedMessage(error.response.data.message, t)
      : error.message || t("errors.unknown")
  );

  console.error(error);
};

function setTranslatedMessage(
  messageArr: string[] | string,
  t: TFunction<"translation", undefined>
) {
  let message = "";

  if (Array.isArray(messageArr)) {
    for (const error of messageArr) {
      if (error.includes("name") && error.includes("exist")) {
        message += "Вече съществува субект с подобно име! ";
      }
      if (error.includes("uic") && error.includes("exist")) {
        message += "Вече съществува субект с подобен ЕИК/ПИК.";
      }
    }
  } else {
    if (messageArr.includes("name") && messageArr.includes("exist")) {
      message += "Вече съществува субект с подобно име! ";
    }
    if (messageArr.includes("uic") && messageArr.includes("exist")) {
      message += "Вече съществува субект с подобен ЕИК/ПИК ";
    }
  }

  return message ? message : t("errors.unknown");
}
