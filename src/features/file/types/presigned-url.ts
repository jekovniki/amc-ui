import { MIME } from "@/types/generic";

export type GetPresignedUrlRequest = {
  fileName: string;
  contentType: MIME;
  folder?: string;
};

export type UploadFileWithUrlRequest = {
  presignedUrl: string;
  method: "put" | "post";
};
