import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { parseISO, isValid, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const sizeClasses = {
  sm: "p-2 text-xs h-[34px]",
  md: "p-2.5 text-sm h-[42px]",
  lg: "p-4 text-base h-[50px]",
  xl: "p-5 text-lg h-14",
};

const DatePicker = ({
  label,
  error,
  value,
  onChange,
  name,
  placeholder = "Select date",
  options = {},
  size = "sm",
  className,
}) => {
  // Convert string value to Date object for Flatpickr
  const dateValue = value && isValid(parseISO(value)) ? parseISO(value) : null;

  // Handle Flatpickr's date array and convert to "YYYY-MM-DD" string
  const handleChange = (dateArray) => {
    if (onChange) {
      if (dateArray && dateArray[0] instanceof Date) {
        // onChange(dateArray[0].toISOString().split('T')[0]);
        // Format as YYYY-MM-DD in local time
        onChange(format(dateArray[0], "yyyy-MM-dd"));
      } else {
        onChange("");
      }
    }
  };

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <Flatpickr
        id={name}
        name={name}
        className={`block w-full border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          sizeClasses[size]
        } ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        value={dateValue}
        onChange={handleChange}
        options={options}
        render={({ defaultValue, value, ...props }, ref) => (
          <div className="relative">
            <input
              {...props}
              ref={ref}
              defaultValue={defaultValue}
              value={value}
            />
            <div className="absolute top-0 right-0 flex items-center px-2 py-2 pointer-events-none">
              <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default DatePicker;
