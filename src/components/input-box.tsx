import { ComponentProps, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { EyeOffIcon } from "./icons/eye-off-icon";
import { EyeIcon } from "./icons/eye-icon";

interface InputBoxProps
  extends Omit<ComponentProps<"input">, "logo" | "label"> {
  label: string;
  logo: ReactNode;
}

export const InputBox = ({
  className,
  type: initialType,
  logo,
  label,
  ...props
}: InputBoxProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = initialType === "password";
  const type = isPassword ? (showPassword ? "text" : "password") : initialType;

  return (
    <div className="relative">
      <div className="absolute t-0 l-0 h-full w-[62px] flex items-center justify-center">
        {logo}
      </div>
      <div className="absolute top-[6px] left-[62px] text-sm text-[#0C2134]">
        {label}
      </div>
      <input
        type={type}
        className={cn(
          "file:text-foreground rounded-[1px] p-[24px] pt-[36px] pl-[62px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary transition-all",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-[0px] top-[15px] h-full w-[60px] flex items-center justify-center transform -translate-y-1/4 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
    </div>
  );
};
