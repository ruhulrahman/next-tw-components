import React, { useState, useRef, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

// const sizeClasses = {
//     sm: "py-2 px-3 text-xs min-h-[2.25rem]",
//     md: "py-2 px-3 text-sm min-h-[2.5rem]",
//     lg: "py-3 px-4 text-base min-h-[3rem]",
//     xl: "py-4 px-5 text-lg min-h-[3.5rem]",
// };

const sizeClasses = {
  sm: "block w-full p-1 px-2 text-xs",
  md: "block w-full p-2 text-sm",
  lg: "block w-full p-3 text-base",
  xl: "block w-full p-4 text-base",
};

const SelectSearch = React.forwardRef(
  (
    {
      id,
      name,
      label = "Select",
      options = [],
      value,
      onChange,
      error,
      className = "",
      size = "sm",
      placeholder = "Select...",
      searchable = true,
      disabled = false,
      description,
      multiple = false,
      clearable = false, // ✅ new prop (default false)
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef();

    // For multi-select, value should be an array
    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : []
      : value;

    const normalize = (str) =>
      str
        ? String(str)
            .toLowerCase()
            .replace(/[\s()+-]/g, "")
        : "";
    const filteredOptions = options.filter(
      (opt) =>
        normalize(opt.label).includes(normalize(search)) ||
        (opt.value && normalize(opt.value).includes(normalize(search)))
    );

    // Close dropdown on outside click
    useEffect(() => {
      const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Remove a tag in multi-select
    const removeTag = (val) => {
      if (onChange) onChange(selectedValues.filter((v) => v !== val));
    };

    const handleOptionClick = (optValue) => {
      if (multiple) {
        let newValues;
        if (selectedValues.includes(optValue)) {
          newValues = selectedValues.filter((v) => v !== optValue);
        } else {
          newValues = [...selectedValues, optValue];
        }
        if (onChange) onChange(newValues);
      } else {
        if (onChange) onChange(optValue);
        setOpen(false);
      }
      setSearch("");
    };

    const searchInputRef = useRef(null);

    useEffect(() => {
      if (open && searchable) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (searchInputRef.current) {
              searchInputRef.current.focus();
            }
          }, 10);
        });
      }
    }, [open, searchable]);

    const handleClear = (e) => {
      e.stopPropagation();
      if (multiple) {
        onChange?.([]);
      } else {
        onChange?.(null);
      }
    };

    return (
      <div ref={containerRef} className={`mb-5 ${className}`}>
        {label && (
          <label
            htmlFor={id || name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            type="button"
            className={`flex items-start w-full border border-gray-300 rounded-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 cursor-pointer flex-wrap ${
              sizeClasses[size]
            } ${error ? "border-red-500" : ""} ${
              disabled ? "opacity-60 cursor-not-allowed" : ""
            } ${className}`}
            onClick={() => {
              if (disabled) return;
              setOpen(!open);
              setSearch("");
              setTimeout(() => {
                if (searchable && searchInputRef.current && !open) {
                  searchInputRef.current.focus();
                }
              }, 0);
            }}
            tabIndex={0}
            disabled={disabled}
            style={{ textAlign: "left" }}
          >
            <span className="flex flex-wrap gap-1 flex-1 items-center min-h-[1.5rem]">
              {multiple ? (
                selectedValues.length > 0 ? (
                  options
                    .filter((opt) => selectedValues.includes(opt.value))
                    .map((opt) => (
                      <span
                        key={opt.value}
                        className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {opt.label}
                        <button
                          type="button"
                          className="ml-1 text-blue-400 hover:text-blue-700 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(opt.value);
                          }}
                          tabIndex={-1}
                        >
                          &times;
                        </button>
                      </span>
                    ))
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )
              ) : (
                options.find((opt) => opt.value === value)?.label || (
                  <span className="text-gray-400">{placeholder}</span>
                )
              )}
            </span>

            {/* ✅ Clear button (only if enabled & has value) */}
            {clearable &&
              ((multiple && selectedValues.length > 0) ||
                (!multiple && value)) && (
                <button
                  type="button"
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={handleClear}
                >
                  {/* <X size={16} /> */}
                  {/* <FaTimes className="w-4 h-4" /> */}
                  <RiCloseLine className="w-4.5 h-4.5" />
                </button>
              )}

            {/* Dropdown arrow */}
            {open ? (
              <svg
                className="w-4 h-4 ml-2 mt-1 text-gray-400 self-start"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 ml-2 mt-1 text-gray-400 self-start"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>

          {/* Dropdown */}
          <div
            className={`
              absolute z-99 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm shadow-lg max-h-60 overflow-auto
              transition-all duration-200 ease-in-out
              ${
                open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
            style={{
              visibility: open ? "visible" : "hidden",
            }}
          >
            {searchable && (
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpen(false);
                    }
                  }}
                />
              </div>
            )}
            <ul>
              {filteredOptions.length === 0 && (
                <li className="px-4 py-2 text-gray-400 text-sm">No options</li>
              )}
              {filteredOptions.map((opt, idx) => (
                <li
                  key={opt.value + "-" + opt.label}
                  className={`
                    px-4 py-2 cursor-pointer flex items-center gap-2
                    transition-all duration-200 ease-in-out text-sm
                    hover:bg-gray-100 dark:hover:bg-gray-600
                    ${
                      multiple
                        ? selectedValues.includes(opt.value)
                          ? "bg-gray-100 dark:bg-gray-600 font-semibold"
                          : ""
                        : opt.value === value
                        ? "bg-gray-100 dark:bg-gray-600 font-semibold"
                        : ""
                    }
                  `}
                  style={{
                    transitionProperty: "opacity,transform",
                    transitionDelay: `${idx * 20}ms`,
                  }}
                  onClick={() => handleOptionClick(opt.value)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(opt.value)}
                      readOnly
                      className="form-checkbox accent-blue-600"
                      tabIndex={-1}
                    />
                  )}
                  {opt.label}
                </li>
              ))}
            </ul>
            {multiple && (
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
        {description && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

SelectSearch.displayName = "SelectSearch";

export default SelectSearch;
