import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

interface SelectBoxProps {
  logo: ReactNode;
  options: Array<{ label: string; value: string }>;
  defaultPlaceholder?: string;
}

export const SelectBox = ({
  logo,
  options,
  defaultPlaceholder,
}: SelectBoxProps) => {
  return (
    <Select>
      <SelectTrigger className="relative select-custom-trigger-position w-full data-[size=default]:h-[62px] flex pl-[62px]">
        <div className="absolute t-0 left-[0px] h-full flex items-start justify-start">
          <div className="absolute t-0 left-[0px] h-full w-[62px] flex items-center justify-center">
            {logo}
          </div>
          <div className="absolute top-[6px] left-[62px] h-fulltext-sm text-[#0C2134]">
            Ниво на достъп
          </div>
        </div>
        <SelectValue placeholder={defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
