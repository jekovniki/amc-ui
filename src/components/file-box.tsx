import { ComponentProps, ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetPresignedUrl } from "@/features/file/api/use-get-presigned-url";
import { MIME } from "@/types/generic";
import { useUploadFileWithUrl } from "@/features/file/api/use-upload-file-with-url";
import { Loader2, X } from "lucide-react";

interface InputBoxProps
  extends Omit<
    ComponentProps<"input">,
    "logo" | "label" | "logoPlaceholder" | "onError"
  > {
  label: string;
  logo: ReactNode;
  logoPlaceholder: string;
  onFileUpload?: (fileName: string) => void;
  onError?: (error: string) => void;
  value?: string; // Current file URL
  maxSizeInMB?: number;
  acceptedTypes?: string[];
  folder?: string;
}

export const FileBox = ({
  className,
  logo,
  label,
  logoPlaceholder,
  value,
  onFileUpload,
  onError,
  maxSizeInMB,
  acceptedTypes,
  folder,
  ...props
}: InputBoxProps) => {
  const { mutate, isPending } = useGetPresignedUrl();
  const [previewUrl, setPreviewUrl] = useState<string>(value || "");
  const uploadFileRequest = useUploadFileWithUrl();
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string[] => {
    onError?.("");
    const errors: string[] = [];

    // Check file type
    if (acceptedTypes && !acceptedTypes.includes(file.type)) {
      errors.push(
        `Типа файл ${
          file.type
        } не се поддържа. Позволените файлове са: ${acceptedTypes.join(", ")}`
      );
    }

    // Check file size
    if (maxSizeInMB) {
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        errors.push(`Максималният размер файл е ${maxSizeInMB}MB`);
      }
    }

    // Check filename
    const invalidChars = /[^a-zA-Z0-9._-]/;
    if (invalidChars.test(file.name)) {
      errors.push(
        "името на файла НЕ трябва да съдържа празни места (напр. company logo.jpg)"
      );
    }

    return errors;
  };

  const uploadFile = async (file: File) => {
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      onError?.(validationErrors.join(", "));
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    mutate(
      {
        fileName: file.name,
        contentType: file.type as MIME,
        folder: folder,
      },
      {
        onSuccess: (response) => {
          uploadFileRequest.mutate(
            {
              request: {
                presignedUrl: response.data,
                file: file,
              },
              method: "put",
            },
            {
              onSuccess: () => {
                onFileUpload?.(file.name);
              },
              onError: (error) => {
                console.error("error : ", error);
              },
            }
          );
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    onFileUpload?.("");
  };

  const handleClick = () => {
    if (!isPending) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center border-dashed border-[2px] transition-all",
          previewUrl
            ? "bg-transparent border-transparent"
            : "bg-[#2038B612] border-[#2038B640] cursor-pointer hover:bg-[#2038B620]",
          isPending && "cursor-not-allowed opacity-50"
        )}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={previewUrl}
              alt="Logo preview"
              className="w-full h-full object-cover rounded-[1px]"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  disabled={isPending}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : isPending ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin text-[#0C2134]" />
            <span className="text-sm text-[#0C2134] mt-2">Uploading...</span>
          </>
        ) : (
          <>
            {logo}
            <span className="text-sm text-[#0C2134]">{label}</span>
            <span className="text-[#0C213473] text-normal mt-2">
              {logoPlaceholder}
            </span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes?.join(",")}
        onChange={handleFileSelect}
        className={cn(
          "file:text-foreground invisible rounded-[1px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary transition-all",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        disabled={isPending}
        {...props}
      />
    </div>
  );
};
