import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";

interface DatePickerBoxProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const DatePickerBox = forwardRef<HTMLButtonElement, DatePickerBoxProps>(
  ({ label, placeholder, value, onChange }, ref) => {
    const [open, setOpen] = useState(false);

    const dateValue = value ? new Date(value) : undefined;

    const handleDateSelect = (selectedDate: Date | undefined) => {
      if (selectedDate && onChange) {
        // Convert Date to ISO string for form compatibility
        onChange(selectedDate.toISOString());
      }
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="pl-[20px]">
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full rounded-none h-[62px] px-[30px] pl-[20px] justify-start text-left font-normal",
              !dateValue && "text-muted-foreground"
            )}
          >
            <div>
              <CalendarIcon className="mr-2 text-black select-icon" />
            </div>
            <div>
              <div>
                <span className="text-sm text-[#0C2134]">{label}</span>
              </div>
              <div>
                <span>
                  {dateValue ? (
                    dateValue.toLocaleDateString()
                  ) : (
                    <span className="text-ellipsis">{placeholder}</span>
                  )}
                </span>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);
