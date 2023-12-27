"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "./button";
import { cn } from "#/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";

interface DatePickerWithRangeProps {
  fromDate: Date;
  toDate?: Date;
  onSelect?: (dateRange: DateRange | undefined) => void;
}

export function DatePickerWithRange(
  props: DatePickerWithRangeProps,
  { className }: React.HTMLAttributes<HTMLDivElement>
) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: props.fromDate,
    to: props.toDate,
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            name="date"
            outline={"primary"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            classNames={{
              day_selected: "text-white !bg-primary",
            }}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => props.onSelect && props.onSelect(date)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
