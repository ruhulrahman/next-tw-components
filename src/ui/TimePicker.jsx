"use client";

import { TimeField, DateInput } from "@/components/ui/datefield-rac";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "react-aria-components";

function formatTimeTo24h(time) {
  if (!time) return "";
  const { hour, minute } = time;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:00`;
}

function parseStringToTime(str) {
  if (!str) return null;
  const [hour, minute] = str.split(":").map(Number);
  return { hour, minute };
}

export function TimePicker({ label, value, onChange, error, className, name }) {
  return (
    <div className={cn("flex flex-col mb-2", className)}>
      {label && (
        <Label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-foreground"
        >
          {label}
        </Label>
      )}

      <TimeField
        id={name}
        value={parseStringToTime(value)}
        onChange={(val) => onChange(formatTimeTo24h(val))}
        className="w-full"
      >
        <div className="relative">
          <DateInput className="w-full block border rounded bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 flex items-center justify-center pe-3 text-muted-foreground/80">
            <ClockIcon size={16} aria-hidden="true" />
          </div>
        </div>
      </TimeField>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
