import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SelectBoxProps {
  logo: ReactNode;
  label: string;
  options: Array<{ label: string; value: string }>;
  defaultPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

export const SelectBox = ({
  logo,
  options,
  label,
  defaultPlaceholder,
  value,
  onChange,
  error = false,
}: SelectBoxProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "relative select-custom-trigger-position w-full data-[size=default]:h-[62px] flex pl-[62px]",
          error ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
        )}
      >
        <div className="absolute t-0 left-[0px] h-full flex items-start justify-start">
          <div className="absolute t-0 left-[0px] h-full w-[62px] flex items-center justify-center">
            {logo}
          </div>
          <div className="absolute top-[6px] left-[62px] h-fulltext-sm text-[#0C2134]">
            {label}
          </div>
        </div>
        <SelectValue placeholder={defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
