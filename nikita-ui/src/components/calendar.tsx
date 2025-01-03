import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell,
  type CalendarProps as AriaCalendarProps,
  type DateValue,
  Heading,
  Text,
  useLocale,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { focusVisibleOutlineStyle } from "./utils";

export type CalendarProps<T extends DateValue> = {
  errorMessage?: string;
} & Omit<AriaCalendarProps<T>, "visibleDuration">;

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {(day) => (
        <CalendarHeaderCell className="size-9 text-sm/6 font-normal text-muted">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  );
}

export function CalendarHeader() {
  const { direction } = useLocale();

  return (
    <header className="flex w-full items-center gap-1">
      <Button
        slot="previous"
        variant="plain"
        isIconOnly
        aria-label="Previous"
        className="focus-visible:-outline-offset-2"
      >
        {direction === "rtl" ? (
          <ChevronRightIcon className="text-muted sm:size-5" />
        ) : (
          <ChevronLeftIcon className="text-muted sm:size-5" />
        )}
      </Button>

      <Heading
        className="mx-2 flex-1 text-center text-sm/6"
        level={2}
        aria-hidden
      />

      <Button
        slot="next"
        variant="plain"
        isIconOnly
        aria-label="Next"
        className="focus-visible:-outline-offset-2"
      >
        {direction === "rtl" ? (
          <ChevronLeftIcon className="text-muted sm:size-5" />
        ) : (
          <ChevronRightIcon className="text-muted sm:size-5" />
        )}
      </Button>
    </header>
  );
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid weekdayStyle="short">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={twMerge(
                "flex size-9 cursor-default items-center justify-center rounded-lg text-sm outline-none",
                "hover:bg-zinc-100",
                "pressed:bg-accent/90 pressed:text-white",
                "disabled:opacity-50",
                "selected:border selected:border-accent selected:",
                "selected:bg-accent selected:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
                "selected:text-white",
                "selected:invalid:border-destructive selected:invalid:bg-destructive selected:invalid:text-white",
                "unavailable:text-destructive unavailable:line-through unavailable:decoration-destructive",
                focusVisibleOutlineStyle,
              )}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  );
}
