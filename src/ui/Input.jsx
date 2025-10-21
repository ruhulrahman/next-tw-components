import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

const sizeClasses = {
  xs: "block w-full p-1 text-xs",
  sm: "block w-full p-2 text-xs",
  md: "block w-full p-2.5 text-sm",
  lg: "block w-full p-3 text-base",
  xl: "block w-full p-4 text-base",
};

const Input = ({
  id,
  name,
  label,
  type = "text",
  size = "sm",
  error,
  placeholder,
  autoComplete,
  className = "",
  checkboxLabel,
  rows = 3,
  showPasswordToggle = true,
  icon = null,
  iconPosition = "left",
  clearable = false,
  value: externalValue, // Extract value from props
  defaultValue, // Extract defaultValue from props
  onChange,
  roundedFull = false,
  labelCenter = false,
  disabled = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(
    externalValue || defaultValue || ""
  );
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const isTextarea = type === "textarea";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // Sync internal value with external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleClear = () => {
    const newValue = "";
    setInternalValue(newValue);
    // Trigger onChange event if provided
    if (onChange) {
      const event = {
        target: {
          name,
          value: newValue,
        },
      };
      onChange(event);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  if (isCheckbox) {
    return (
      <div className={`mb-5 ${className}`}>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={id || name}
            name={name}
            className={`accent-primary w-4 h-4 ${className}`}
            checked={internalValue}
            onChange={handleInputChange}
            {...props}
          />
          <label
            htmlFor={id || name}
            className="text-sm text-primary hover:underline"
          >
            <span className="text-sm">{checkboxLabel || label}</span>
          </label>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  if (isTextarea) {
    return (
      <div className={`mb-5 ${className}`}>
        {label && (
          <label
            htmlFor={id || name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <textarea
          id={id || name}
          name={name}
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={rows}
          className={`
            ${sizeClasses[size]}
            text-gray-900 border rounded-md bg-gray-50
            focus:ring-blue-500 focus:border-blue-500
            border-gray-300
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
            labelCenter ? "text-center" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {/* Left Icon (optional) */}
        {icon && iconPosition === "left" && (
          <span className="absolute left-3 text-gray-400">{icon}</span>
        )}

        <input
          id={id || name}
          name={name}
          type={inputType}
          value={internalValue}
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            ${sizeClasses[size]}
            text-gray-900 border bg-gray-50
            focus:ring-blue-500 focus:border-blue-500
            border-gray-300
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${
              (isPassword && showPasswordToggle) ||
              (icon && iconPosition === "right") ||
              (clearable && internalValue)
                ? "pr-10"
                : ""
            }
            ${roundedFull ? "rounded-full" : "rounded-sm"}
            ${disabled ? "cursor-not-allowed" : ""}
          `}
          {...props}
        />

        {/* Right Icon (optional) */}
        {icon &&
          iconPosition === "right" &&
          !isPassword &&
          !(clearable && internalValue) && (
            <span className="absolute right-3 text-gray-400">{icon}</span>
          )}

        {/* Clear button (appears when clearable is true and there's text) */}
        {clearable && internalValue && !isPassword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear input"
          >
            {/* <FaTimes className="w-4 h-4" /> */}
            <RiCloseLine className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Password toggle (overrides clear button and right icon if both used) */}
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
