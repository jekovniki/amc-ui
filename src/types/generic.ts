export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

export enum MIME {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  GIF = "image/gif",
  WEBP = "image/webp",
  SVG = "image/svg+xml",
}
