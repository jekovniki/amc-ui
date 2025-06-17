import { MIME } from "@/types/generic";

export type GetPresignedUrlRequest = {
  fileName: string;
  contentType: MIME;
  folder?: string;
};

export type UploadFileWithUrlRequest = {
  request: {
    presignedUrl: string;
    file: File;
  };
  method: "put" | "post";
};
