import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerBoxProps {
  label: string;
  placeholder: string;
}

export const DatePickerBox = ({ label, placeholder }: DatePickerBoxProps) => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="pl-[20px]">
        <Button
          variant={"outline"}
          className={cn(
            "w-full rounded-none h-[62px] px-[30px] pl-[20px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
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
                {date ? (
                  date.toLocaleDateString()
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
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
