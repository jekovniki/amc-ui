import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputBoxProps
  extends Omit<ComponentProps<"input">, "logo" | "label" | "logoPlaceholder"> {
  label: string;
  logo: ReactNode;
  logoPlaceholder: string;
}

export const FileBox = ({
  className,
  logo,
  label,
  logoPlaceholder,
  ...props
}: InputBoxProps) => {
  return (
    <div className="relative">
      <div className="absolute t-0 l-0 h-full w-full flex flex-col items-center justify-center bg-[#2038B612] border-dashed border-[2px] cursor-not-allowed">
        {logo}
        <span className="text-sm text-[#0C2134]">{label}</span>
        <span className="text-[#0C213473] text-normal mt-2">
          {logoPlaceholder}
        </span>
      </div>
      <input
        type="file"
        className={cn(
          "file:text-foreground invisible rounded-[1px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary transition-all",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
};
