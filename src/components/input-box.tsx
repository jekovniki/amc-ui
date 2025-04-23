import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputBoxProps
  extends Omit<ComponentProps<"input">, "logo" | "label"> {
  label: string;
  logo: ReactNode;
}

export const InputBox = ({
  className,
  type,
  logo,
  label,
  ...props
}: InputBoxProps) => {
  return (
    <div className="relative">
      <div className="absolute t-0 l-0 h-full w-[72px] flex items-center justify-center">
        {logo}
      </div>
      <div className="absolute top-[6px] left-[72px] text-sm text-[#0C2134]">
        {label}
      </div>
      <input
        type={type}
        className={cn(
          "file:text-foreground rounded-[1px] p-[24px] pt-[36px] pl-[72px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary transition-all",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
};
