import React$1, { useState, useEffect, useRef } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

const sizeClasses$2 = {
  xs: "block w-full p-1 text-xs",
  sm: "block w-full p-2 text-xs",
  md: "block w-full p-2.5 text-sm",
  lg: "block w-full p-3 text-base",
  xl: "block w-full p-4 text-base"
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
  value: externalValue,
  // Extract value from props
  defaultValue,
  // Extract defaultValue from props
  onChange,
  roundedFull = false,
  labelCenter = false,
  disabled = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(externalValue || defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const isTextarea = type === "textarea";
  const inputType = isPassword ? showPassword ? "text" : "password" : type;

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
          value: newValue
        }
      };
      onChange(event);
    }
  };
  const handleInputChange = e => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };
  if (isCheckbox) {
    return /*#__PURE__*/React.createElement("div", {
      className: `mb-5 ${className}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement("input", _extends({
      type: "checkbox",
      id: id || name,
      name: name,
      className: `accent-primary w-4 h-4 ${className}`,
      checked: internalValue,
      onChange: handleInputChange
    }, props)), /*#__PURE__*/React.createElement("label", {
      htmlFor: id || name,
      className: "text-sm text-primary hover:underline"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm"
    }, checkboxLabel || label))), error && /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-xs text-red-500"
    }, error));
  }
  if (isTextarea) {
    return /*#__PURE__*/React.createElement("div", {
      className: `mb-5 ${className}`
    }, label && /*#__PURE__*/React.createElement("label", {
      htmlFor: id || name,
      className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    }, label), /*#__PURE__*/React.createElement("textarea", _extends({
      id: id || name,
      name: name,
      value: internalValue,
      onChange: handleInputChange,
      placeholder: placeholder,
      autoComplete: autoComplete,
      rows: rows,
      className: `
            ${sizeClasses$2[size]}
            text-gray-900 border rounded-md bg-gray-50
            focus:ring-blue-500 focus:border-blue-500
            border-gray-300
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${className}
          `
    }, props)), error && /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-xs text-red-500"
    }, error));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-5 ${className}`
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id || name,
    className: `block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelCenter ? "text-center" : ""}`
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "relative flex items-center"
  }, icon && iconPosition === "left" && /*#__PURE__*/React.createElement("span", {
    className: "absolute left-3 text-gray-400"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: id || name,
    name: name,
    type: inputType,
    value: internalValue,
    disabled: disabled,
    onChange: handleInputChange,
    placeholder: placeholder,
    autoComplete: autoComplete,
    className: `
            ${sizeClasses$2[size]}
            text-gray-900 border bg-gray-50
            focus:ring-blue-500 focus:border-blue-500
            border-gray-300
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${isPassword && showPasswordToggle || icon && iconPosition === "right" || clearable && internalValue ? "pr-10" : ""}
            ${roundedFull ? "rounded-full" : "rounded-sm"}
            ${disabled ? "cursor-not-allowed" : ""}
          `
  }, props)), icon && iconPosition === "right" && !isPassword && !(clearable && internalValue) && /*#__PURE__*/React.createElement("span", {
    className: "absolute right-3 text-gray-400"
  }, icon), clearable && internalValue && !isPassword && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClear,
    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none",
    "aria-label": "Clear input"
  }, /*#__PURE__*/React.createElement(RiCloseLine, {
    className: "w-4.5 h-4.5"
  })), isPassword && showPasswordToggle && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none",
    "aria-label": showPassword ? "Hide password" : "Show password"
  }, showPassword ? /*#__PURE__*/React.createElement(FaEyeSlash, {
    className: "w-5 h-5"
  }) : /*#__PURE__*/React.createElement(FaEye, {
    className: "w-5 h-5"
  }))), error && /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-red-500"
  }, error));
};

const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  color = "primary",
  size = "md",
  showIcon = true,
  icon: CustomIcon = null,
  circular = false,
  error = "",
  // ✅ error message prop
  className = "",
  labelClassName = "",
  ...props
}) => {
  // Color variants
  const colorClasses = {
    primary: "text-blue-600 border-blue-400 focus:ring-blue-500",
    success: "text-green-600 border-green-400 focus:ring-green-500",
    info: "text-cyan-600 border-cyan-400 focus:ring-cyan-500",
    warning: "text-yellow-600 border-yellow-400 focus:ring-yellow-500",
    danger: "text-red-600 border-red-400 focus:ring-red-500"
  };

  // Size variants
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  };

  // Label size mapping
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  // Icon size mapping
  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };

  // Default check icon
  const DefaultCheckIcon = ({
    size
  }) => /*#__PURE__*/React$1.createElement("svg", {
    className: iconSizeClasses[size],
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M5 13l4 4L19 7"
  }));
  return /*#__PURE__*/React$1.createElement("div", {
    className: `flex flex-col ${className}`
  }, /*#__PURE__*/React$1.createElement("label", {
    htmlFor: id,
    className: `relative flex items-center cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
  }, /*#__PURE__*/React$1.createElement("input", _extends({
    type: "checkbox",
    id: id,
    name: name,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    className: "sr-only"
  }, props)), /*#__PURE__*/React$1.createElement("div", {
    className: `
                        flex items-center justify-center
                        border-2 transition-all duration-200
                        ${sizeClasses[size]}
                        ${colorClasses[color]}
                        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                        ${checked ? "bg-current border-current" : "bg-white border-gray-300"}
                        ${circular ? "rounded-full" : "rounded"}
                    `
  }, checked && showIcon && /*#__PURE__*/React$1.createElement("span", {
    className: "text-white"
  }, CustomIcon ? /*#__PURE__*/React$1.createElement(CustomIcon, {
    className: iconSizeClasses[size]
  }) : /*#__PURE__*/React$1.createElement(DefaultCheckIcon, {
    size: size
  }))), label && /*#__PURE__*/React$1.createElement("span", {
    className: `ml-3 text-primary select-none ${labelSizeClasses[size]} ${labelClassName}`,
    dangerouslySetInnerHTML: {
      __html: label
    } // Using dangerouslySetInnerHTML to render HTML in label
  })), error && /*#__PURE__*/React$1.createElement("span", {
    className: "mt-1 text-sm text-red-500"
  }, error));
};

const colorClasses = {
  blue: "accent-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600",
  red: "accent-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "accent-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "accent-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "accent-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "accent-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "accent-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600"
};
const sizeClasses$1 = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7"
};

// Card-specific size classes for border, padding, and text
const cardSizeClasses = {
  sm: "p-1 text-xs",
  md: "p-1.5 text-sm",
  lg: "p-2.5 text-base",
  xl: "p-4.5 text-lg"
};
const variantClasses = {
  default: "",
  bordered: "border border-gray-200 rounded-md p-3 dark:border-gray-700",
  list: "w-full rounded-t-lg",
  card: "inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700",
  inline: "inline-flex items-center"
};
function RadioButton({
  options = [],
  name,
  value,
  onChange,
  variant = "default",
  color = "blue",
  size = "md",
  label,
  className = "",
  disabled = false,
  direction = "vertical",
  // "vertical" or "horizontal"
  error,
  description
}) {
  // Merge all variant classes from a space-separated string
  function getVariantClasses(variant) {
    if (!variant) return "";
    return variant.split(" ").map(v => {
      if (v === "card") {
        // Add card size classes if card variant
        return `${variantClasses.card} ${cardSizeClasses[size]}`;
      }
      return variantClasses[v] || "";
    }).join(" ");
  }
  return /*#__PURE__*/React$1.createElement("div", {
    className: `mb-4 ${className}`
  }, label && /*#__PURE__*/React$1.createElement("label", {
    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  }, label), /*#__PURE__*/React$1.createElement("div", {
    className: variant.includes("inline") ? "flex flex-row gap-4" : direction === "horizontal" ? "flex flex-row gap-4" : "flex flex-col gap-2"
  }, options.map((option, idx) => /*#__PURE__*/React$1.createElement("label", {
    key: option.value,
    className: `flex items-center gap-2 cursor-pointer ${getVariantClasses(variant)} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`
  }, /*#__PURE__*/React$1.createElement("input", {
    type: "radio",
    name: name,
    value: option.value,
    checked: value === option.value,
    onChange: onChange,
    disabled: disabled,
    className: `
                                ${sizeClasses$1[size]}
                                ${colorClasses[color]}
                                border-gray-300 dark:border-gray-600
                                rounded-full
                                focus:outline-none
                                ${disabled ? "cursor-not-allowed" : ""}
                            `
  }), /*#__PURE__*/React$1.createElement("span", {
    className: `text-gray-900 dark:text-gray-200 ${cardSizeClasses[size]}`
  }, option.label)))), description && /*#__PURE__*/React$1.createElement("div", {
    className: "text-xs text-gray-500 mt-1"
  }, description), error && /*#__PURE__*/React$1.createElement("div", {
    className: "text-xs text-red-500 mt-1"
  }, error));
}

// type RadioColor = 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'secondary';

// interface RadioProps {
//     name: string;
//     value: string;
//     label: string;
//     checked?: boolean;
//     color?: RadioColor;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     className?: string;
// }

const Radio = ({
  name,
  value,
  label,
  checked = false,
  color = 'success',
  activeColor = false,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const colorClasses = {
    primary: 'text-blue-500',
    success: 'text-green-500',
    danger: 'text-red-500',
    info: 'text-cyan-500',
    warning: 'text-yellow-400',
    secondary: 'text-gray-600'
  };
  const bgColorClasses = {
    primary: '!bg-blue-500/20',
    success: '!bg-green-500/20',
    danger: '!bg-red-500/20',
    info: '!bg-cyan-500/20',
    warning: '!bg-yellow-400/20',
    secondary: '!bg-gray-600/20'
  };
  const colorClass = colorClasses[color];
  const bgColorClass = bgColorClasses[color];
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  };

  // Card-specific size classes for border, padding, and text
  const cardSizeClasses = {
    sm: "p-1 text-xs",
    md: "p-1.5 text-sm",
    lg: "p-2.5 text-base",
    xl: "p-4.5 text-lg"
  };
  const variantClasses = {
    default: "",
    bordered: "border border-gray-200 rounded-md p-3 dark:border-gray-700",
    list: "w-full rounded-t-lg",
    card: "inline-flex items-center justify-between w-full bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700",
    inline: "inline-flex items-center"
  };

  // Merge all variant classes from a space-separated string
  function getVariantClasses(variant) {
    if (!variant) return "";
    return variant.split(" ").map(v => {
      if (v === "card") {
        // Add card size classes if card variant
        return `${variantClasses.card} ${cardSizeClasses[size]}`;
      }
      return variantClasses[v] || "";
    }).join(" ");
  }
  const isActiveBgColorAndChecked = checked && activeColor;
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("label", {
    className: `flex items-center cursor-pointer ${className} ${getVariantClasses(variant)} ${disabled ? "opacity-60 cursor-not-allowed" : ""}  ${isActiveBgColorAndChecked ? `${bgColorClass}` : ""}`
  }, /*#__PURE__*/React$1.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    className: "absolute opacity-0 h-0 w-0"
  }), /*#__PURE__*/React$1.createElement("span", {
    className: `flex items-center transition-colors duration-200`
  }, /*#__PURE__*/React$1.createElement("span", {
    className: `
                    flex-shrink-0
                    w-5 h-5
                    rounded-full
                    border-2
                    mr-2
                    flex items-center justify-center
                    ${sizeClasses[size]}
                    ${colorClass}
                    ${checked ? `border-current` : 'border-gray-300'}
                    `
  }, checked && /*#__PURE__*/React$1.createElement("span", {
    className: `w-2.5 h-2.5 rounded-full bg-current`
  })), /*#__PURE__*/React$1.createElement("span", {
    className: `text-gray-900 dark:text-gray-200 ${cardSizeClasses[size]}`
  }, label))));
};

const RadioGroup = ({
  name,
  options,
  selectedValue,
  color = 'success',
  activeColor = false,
  onChange,
  direction = "vertical",
  // "vertical" or "horizontal"
  variant = "default",
  size = "sm",
  label,
  error,
  description,
  disabled = false,
  className = ''
}) => {
  const handleChange = e => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return /*#__PURE__*/React$1.createElement("div", {
    className: `mb-4 ${className}`
  }, label && /*#__PURE__*/React$1.createElement("label", {
    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  }, label), /*#__PURE__*/React$1.createElement("div", {
    className: variant.includes("inline") ? "flex flex-row gap-4" : direction === "horizontal" ? "flex flex-row gap-4" : "flex flex-col gap-2"
  }, options.map(option => /*#__PURE__*/React$1.createElement(Radio, {
    key: option.value,
    name: name,
    value: option.value,
    label: option.label,
    checked: selectedValue === option.value,
    color: color,
    activeColor: activeColor,
    variant: variant,
    size: size,
    onChange: handleChange
  }))), description && /*#__PURE__*/React$1.createElement("div", {
    className: "text-xs text-gray-500 mt-1"
  }, description), error && /*#__PURE__*/React$1.createElement("div", {
    className: "text-xs text-red-500 mt-1"
  }, error));
};

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
  xl: "block w-full p-4 text-base"
};
const SelectSearch = /*#__PURE__*/React$1.forwardRef(({
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
  clearable = false,
  // ✅ new prop (default false)
  ...props
}, ref) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef();

  // For multi-select, value should be an array
  const selectedValues = multiple ? Array.isArray(value) ? value : [] : value;
  const normalize = str => str ? String(str).toLowerCase().replace(/[\s()+-]/g, "") : "";
  const filteredOptions = options.filter(opt => normalize(opt.label).includes(normalize(search)) || opt.value && normalize(opt.value).includes(normalize(search)));

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Remove a tag in multi-select
  const removeTag = val => {
    if (onChange) onChange(selectedValues.filter(v => v !== val));
  };
  const handleOptionClick = optValue => {
    if (multiple) {
      let newValues;
      if (selectedValues.includes(optValue)) {
        newValues = selectedValues.filter(v => v !== optValue);
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
  const handleClear = e => {
    e.stopPropagation();
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.(null);
    }
  };
  return /*#__PURE__*/React$1.createElement("div", {
    ref: containerRef,
    className: `mb-5 ${className}`
  }, label && /*#__PURE__*/React$1.createElement("label", {
    htmlFor: id || name,
    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  }, label), /*#__PURE__*/React$1.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: `flex items-start w-full border border-gray-300 rounded-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 cursor-pointer flex-wrap ${sizeClasses[size]} ${error ? "border-red-500" : ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`,
    onClick: () => {
      if (disabled) return;
      setOpen(!open);
      setSearch("");
      setTimeout(() => {
        if (searchable && searchInputRef.current && !open) {
          searchInputRef.current.focus();
        }
      }, 0);
    },
    tabIndex: 0,
    disabled: disabled,
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React$1.createElement("span", {
    className: "flex flex-wrap gap-1 flex-1 items-center min-h-[1.5rem]"
  }, multiple ? selectedValues.length > 0 ? options.filter(opt => selectedValues.includes(opt.value)).map(opt => /*#__PURE__*/React$1.createElement("span", {
    key: opt.value,
    className: "inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300",
    onClick: e => e.stopPropagation()
  }, opt.label, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "ml-1 text-blue-400 hover:text-blue-700 focus:outline-none",
    onClick: e => {
      e.stopPropagation();
      removeTag(opt.value);
    },
    tabIndex: -1
  }, "\xD7"))) : /*#__PURE__*/React$1.createElement("span", {
    className: "text-gray-400"
  }, placeholder) : options.find(opt => opt.value === value)?.label || /*#__PURE__*/React$1.createElement("span", {
    className: "text-gray-400"
  }, placeholder)), clearable && (multiple && selectedValues.length > 0 || !multiple && value) && /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
    onClick: handleClear
  }, /*#__PURE__*/React$1.createElement(RiCloseLine, {
    className: "w-4.5 h-4.5"
  })), open ? /*#__PURE__*/React$1.createElement("svg", {
    className: "w-4 h-4 ml-2 mt-1 text-gray-400 self-start",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 15l7-7 7 7"
  })) : /*#__PURE__*/React$1.createElement("svg", {
    className: "w-4 h-4 ml-2 mt-1 text-gray-400 self-start",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React$1.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19 9l-7 7-7-7"
  }))), /*#__PURE__*/React$1.createElement("div", {
    className: `
              absolute z-99 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm shadow-lg max-h-60 overflow-auto
              transition-all duration-200 ease-in-out
              ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
            `,
    style: {
      visibility: open ? "visible" : "hidden"
    }
  }, searchable && /*#__PURE__*/React$1.createElement("div", {
    className: "sticky top-0 z-10 bg-white dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/React$1.createElement("input", {
    ref: searchInputRef,
    type: "text",
    className: "w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring",
    placeholder: "Search...",
    value: search,
    onChange: e => setSearch(e.target.value),
    onKeyDown: e => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
  })), /*#__PURE__*/React$1.createElement("ul", null, filteredOptions.length === 0 && /*#__PURE__*/React$1.createElement("li", {
    className: "px-4 py-2 text-gray-400 text-sm"
  }, "No options"), filteredOptions.map((opt, idx) => /*#__PURE__*/React$1.createElement("li", {
    key: opt.value + "-" + opt.label,
    className: `
                    px-4 py-2 cursor-pointer flex items-center gap-2
                    transition-all duration-200 ease-in-out text-sm
                    hover:bg-gray-100 dark:hover:bg-gray-600
                    ${multiple ? selectedValues.includes(opt.value) ? "bg-gray-100 dark:bg-gray-600 font-semibold" : "" : opt.value === value ? "bg-gray-100 dark:bg-gray-600 font-semibold" : ""}
                  `,
    style: {
      transitionProperty: "opacity,transform",
      transitionDelay: `${idx * 20}ms`
    },
    onClick: () => handleOptionClick(opt.value)
  }, multiple && /*#__PURE__*/React$1.createElement("input", {
    type: "checkbox",
    checked: selectedValues.includes(opt.value),
    readOnly: true,
    className: "form-checkbox accent-blue-600",
    tabIndex: -1
  }), opt.label))), multiple && /*#__PURE__*/React$1.createElement("div", {
    className: "flex justify-end p-2"
  }, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700",
    onClick: () => setOpen(false)
  }, "Done")))), description && /*#__PURE__*/React$1.createElement("p", {
    className: "mt-1 text-xs text-gray-500 dark:text-gray-400"
  }, description), error && /*#__PURE__*/React$1.createElement("p", {
    className: "mt-1 text-xs text-red-500"
  }, error));
});
SelectSearch.displayName = "SelectSearch";

const sizeConfig = {
  sm: {
    height: 'h-5',
    knob: 'w-4 h-4',
    text: 'text-xs',
    padding: 'px-1',
    minWidth: 'min-w-[3rem]'
  },
  md: {
    height: 'h-7',
    knob: 'w-6 h-6',
    text: 'text-sm',
    padding: 'px-2',
    minWidth: 'min-w-[3.5rem]'
  },
  lg: {
    height: 'h-10',
    knob: 'w-8 h-8',
    text: 'text-base',
    padding: 'px-3',
    minWidth: 'min-w-[5rem]'
  }
};
const colorConfig = {
  primary: {
    enabled: 'bg-blue-500',
    disabled: 'bg-blue-500/20',
    text: 'text-blue-500'
  },
  secondary: {
    enabled: 'bg-gray-600',
    disabled: 'bg-gray-600/20',
    text: 'text-gray-600'
  },
  info: {
    enabled: 'bg-cyan-500',
    disabled: 'bg-cyan-500/20',
    text: 'text-cyan-500'
  },
  success: {
    enabled: 'bg-green-500',
    disabled: 'bg-green-500/20',
    text: 'text-green-500'
  },
  warning: {
    enabled: 'bg-yellow-400',
    disabled: 'bg-yellow-400/20',
    text: 'text-yellow-400'
  },
  danger: {
    enabled: 'bg-red-500',
    disabled: 'bg-red-500/20',
    text: 'text-red-500'
  }
};
const SwitchButton = ({
  id,
  name,
  enabled = false,
  label = '',
  error,
  onChange = () => {},
  color = 'success',
  enabledColor,
  disabledColor,
  enabledText = '',
  disabledText = '',
  textColor,
  size = 'sm',
  className = '',
  knobClass = '',
  ...props
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [textWidth, setTextWidth] = useState({
    enabled: 0,
    disabled: 0
  });
  const enabledTextRef = useRef(null);
  const disabledTextRef = useRef(null);
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);
  useEffect(() => {
    if (enabledTextRef.current && disabledTextRef.current) {
      setTextWidth({
        enabled: enabledTextRef.current.offsetWidth,
        disabled: disabledTextRef.current.offsetWidth
      });
    }
  }, [enabledText, disabledText]);
  const toggleSwitch = () => {
    setIsEnabled(prev => {
      const newState = !prev;
      onChange(newState);
      return newState;
    });
  };
  const cfg = sizeConfig[size] || sizeConfig.sm;
  const colors = colorConfig[color] || colorConfig.primary;
  const activeEnabledColor = enabledColor || colors.enabled;
  const activeDisabledColor = disabledColor || colors.disabled;
  const activeTextColor = textColor || colors.text;

  // Calculate dynamic width based on the longest text
  const dynamicWidth = `w-[calc(${Math.max(textWidth.enabled, textWidth.disabled)}px + 3rem)]`;
  const switchId = id || name || `switch-${Math.random().toString(36).slice(2)}`;
  return /*#__PURE__*/React.createElement("div", {
    className: ` ${className}`
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    className: "block mb-1 text-sm font-medium text-gray-900 dark:text-white"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "relative inline-block"
  }, /*#__PURE__*/React.createElement("span", {
    ref: enabledTextRef,
    className: `absolute invisible whitespace-nowrap ${cfg.text}`
  }, enabledText), /*#__PURE__*/React.createElement("span", {
    ref: disabledTextRef,
    className: `absolute invisible whitespace-nowrap ${cfg.text}`
  }, disabledText), /*#__PURE__*/React.createElement("button", _extends({
    id: switchId,
    type: "button",
    role: "switch",
    "aria-checked": isEnabled,
    onClick: toggleSwitch,
    className: `relative inline-flex items-center rounded-full transition-colors ${isEnabled ? activeEnabledColor : activeDisabledColor} ${cfg.height} ${cfg.padding} ${cfg.minWidth} ${dynamicWidth}`
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Toggle Switch"), /*#__PURE__*/React.createElement("span", {
    className: `absolute bg-white rounded-full shadow-md transition-all duration-200 ${cfg.knob} ${isEnabled ? 'left-[calc(100%-1.1rem)]' : 'left-0.5'} ${knobClass}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `whitespace-nowrap ${cfg.text} font-medium ${isEnabled ? 'text-white' : activeTextColor} ${isEnabled ? 'pr-4' : 'pl-4'}`
  }, isEnabled ? enabledText : disabledText))), error && /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-red-500"
  }, error));
};

const Avatar = ({
  text = "",
  value = "",
  image = "",
  size = "sm",
  color = "primary",
  icon: CustomIcon = null,
  circular = true,
  className = ""
}) => {
  // Color variants
  const colorClasses = {
    primary: "bg-blue-200 text-blue-700 dark:bg-blue-600 dark:text-blue-100",
    success: "bg-green-200 text-green-700 dark:bg-green-600 dark:text-green-100",
    info: "bg-cyan-200 text-cyan-700 dark:bg-cyan-600 dark:text-cyan-100",
    warning: "bg-yellow-200 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
    danger: "bg-red-200 text-red-700 dark:bg-red-600 dark:text-red-100"
  };

  // Size variants
  const sizeClasses = {
    sm: "size-5  font-medium ",
    md: "size-8 font-medium ",
    lg: "size-10 font-medium ",
    xl: "size-12 font-medium "
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, text && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-center
                        ${sizeClasses[size]}
                        ${colorClasses[color]} ${circular ? "rounded-full" : "rounded"} ${className}`
  }, text), image && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-center
                        ${sizeClasses[size]}
                        ${colorClasses[color]} ${circular ? "rounded-full" : "rounded"} ${className}`
  }, text));
};

const AvatarUpload = ({
  value,
  onChange,
  shape = "circle",
  size = 120,
  label = "Upload Avatar",
  error,
  disabled = false,
  id,
  className = "",
  icon,
  clearable = true,
  showUploadIcon = true,
  // New prop to control upload icon visibility
  uploadIconPosition = "top-left" // New prop for icon position (top-left, top-right, bottom-left, bottom-right)
}) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value && typeof value === "string" ? value : null);
  const [showModal, setShowModal] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 80,
    y: 35,
    width: 250,
    height: 250,
    aspect: 1
  });
  const [srcImage, setSrcImage] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("");
  const imgRef = useRef(null);

  // Icon size is 40% of avatar size
  const iconSize = Math.round(size * 0.4);

  // Position classes for upload icon
  const positionClasses = {
    'top-left': 'top-1 left-1',
    'top-right': 'top-1 right-1',
    'bottom-left': 'bottom-1 left-1',
    'bottom-right': 'bottom-1 right-1'
  };
  useEffect(() => {
    if (typeof value === "string") setPreview(value);
    if (!value) setPreview(null);
  }, [value]);
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSrcImage(url);
      setShowCrop(true);
      setOriginalFileName(file.name);
    }
  };
  const handleClick = e => {
    e.stopPropagation();
    if (!disabled) inputRef.current?.click();
  };
  const handleClear = e => {
    e.stopPropagation();
    setPreview(null);
    onChange && onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const handlePreviewClick = e => {
    e.stopPropagation();
    setShowModal(true);
  };

  // Crop utility
  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(blob);
      }, "image/jpeg");
    });
  };
  const handleCropOk = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedBlob = await getCroppedImg(imgRef.current, crop);
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setPreview(croppedUrl);
      setSrcImage(null);
      setCrop({
        unit: "px",
        x: 80,
        y: 35,
        width: 250,
        height: 250,
        aspect: 1
      });
      setShowCrop(false);
      const fileName = originalFileName || "avatar.jpg";
      const croppedFile = new File([croppedBlob], fileName, {
        type: "image/jpeg"
      });
      onChange && onChange(croppedFile);
    }
  };
  return /*#__PURE__*/React$1.createElement("div", {
    className: `mb-5 flex flex-col items-left ${className}`
  }, label && /*#__PURE__*/React$1.createElement("span", {
    className: "mb-2 text-sm font-medium text-gray-900 dark:text-white"
  }, label), /*#__PURE__*/React$1.createElement("div", {
    className: `relative flex items-center justify-left bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
                    ${shape === "circle" ? "rounded-full" : "rounded-lg"}
                `,
    style: {
      width: size,
      height: size,
      cursor: disabled ? "not-allowed" : "pointer",
      overflow: "hidden"
    },
    tabIndex: 0,
    "aria-label": label,
    id: id,
    onClick: handleClick
  }, showUploadIcon && /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: `absolute z-20 w-[30px] h-[30px] leading-1 bg-gray-300 bg-opacity-80 hover:bg-gray-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer ${positionClasses[uploadIconPosition]}`,
    onClick: handleClick,
    tabIndex: -1,
    "aria-label": "Upload",
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement("i", {
    className: "fa-solid fa-camera"
  })), preview && clearable && /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "absolute top-1 left-1 z-20 w-[25px] h-[25px] leading-1 bg-gray-300 bg-opacity-80 hover:bg-red-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer",
    onClick: handleClear,
    tabIndex: -1,
    "aria-label": "Clear"
  }, /*#__PURE__*/React$1.createElement("i", {
    className: "fa-solid fa-xmark"
  })), preview ? /*#__PURE__*/React$1.createElement("img", {
    src: preview,
    alt: "Avatar Preview",
    className: `object-cover w-full h-full ${shape === "circle" ? "rounded-full" : "rounded-lg"} cursor-pointer`,
    onClick: handlePreviewClick
  }) : /*#__PURE__*/React$1.createElement("span", {
    className: "flex items-center justify-center w-full h-full cursor-default"
  }, icon ? /*#__PURE__*/React$1.createElement("span", {
    style: {
      fontSize: iconSize
    }
  }, icon) : /*#__PURE__*/React$1.createElement("span", {
    style: {
      fontSize: iconSize
    }
  }, /*#__PURE__*/React$1.createElement("i", {
    className: "fa-solid fa-user"
  }))), /*#__PURE__*/React$1.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    className: "hidden",
    onChange: handleFileChange,
    disabled: disabled
  })), error && /*#__PURE__*/React$1.createElement("span", {
    className: "text-xs text-red-500 mt-1"
  }, error), showModal && preview && /*#__PURE__*/React$1.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out] backdrop-blur-[2px]",
    "aria-hidden": "true",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "relative bg-white rounded shadow-lg p-2",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React$1.createElement("img", {
    src: preview,
    alt: "Full Avatar",
    style: {
      maxWidth: "90vw",
      maxHeight: "90vh",
      borderRadius: shape === "circle" ? "50%" : "0"
    }
  }), /*#__PURE__*/React$1.createElement("button", {
    className: "absolute top-2 right-2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600",
    onClick: () => setShowModal(false),
    "aria-label": "Close"
  }, /*#__PURE__*/React$1.createElement("i", {
    className: "fa-solid fa-xmark"
  })))), showCrop && srcImage && /*#__PURE__*/React$1.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "dark:bg-theme-dark bg-theme-light p-4 rounded shadow-lg",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React$1.createElement(ReactCrop, {
    crop: crop,
    onChange: setCrop,
    aspect: 1
  }, /*#__PURE__*/React$1.createElement("img", {
    ref: imgRef,
    src: srcImage,
    alt: "Crop",
    onLoad: e => imgRef.current = e.target,
    style: {
      maxHeight: 400,
      maxWidth: 400
    }
  })), /*#__PURE__*/React$1.createElement("div", {
    className: "flex justify-end mt-4"
  }, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "px-4 py-2 bg-blue-600 text-white rounded mr-2",
    onClick: handleCropOk
  }, "OK"), /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    className: "px-4 py-2 bg-gray-300 dark:text-black rounded",
    onClick: () => setShowCrop(false)
  }, "Cancel")))));
};

const ButtonTw = ({
  children,
  type = "button",
  variant = "default",
  size = "sm",
  rounded = "default",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  badge = null,
  pointer = true,
  className = "",
  block = false,
  iconOnly = false,
  tooltip = "",
  shadow = "",
  // "sm", "md", "lg", "xl"
  ...props
}) => {
  // Flat variant maps
  const baseVariants = {
    default: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:bg-theme-dark dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-theme-dark dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-theme-dark dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    purple: "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
    blue: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    gray: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:bg-theme-dark dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800",
    transparent: "text-gray-900 bg-transparent hover:bg-gray-100 focus:ring-gray-200 dark:bg-theme-dark dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800",
    link: "text-blue-700 hover:text-blue-800 focus:ring-blue-300 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:ring-blue-800",
    outline: "text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800",
    lime: "text-white bg-lime-500 hover:bg-lime-600 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-900"
  };
  const outlineVariants = {
    blue: "text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-700",
    gray: "text-gray-600 hover:text-white border border-gray-400 hover:bg-gray-600 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800",
    red: "text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900",
    lime: "text-purple-700 hover:text-white border border-lime-700 hover:bg-lime-800 focus:ring-lime-300 dark:border-lime-400 dark:text-lime-400 dark:hover:text-white dark:hover:bg-lime-500 dark:focus:ring-lime-900",
    info: "text-cyan-700 hover:text-white border border-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300 dark:border-cyan-400 dark:text-cyan-400 dark:hover:text-white dark:hover:bg-cyan-500 dark:focus:ring-cyan-900"
  };
  const gradientVariants = {
    blue: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800",
    green: "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800",
    cyan: "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800",
    teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800",
    lime: "bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800 text-gray-900",
    red: "bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800",
    pink: "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800",
    purple: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800",
    purpleToBlue: "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800",
    cyanToBlue: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800",
    greenToBlue: "bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800",
    purpleToPink: "bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800",
    pinkToOrange: "bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800",
    tealToLime: "bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-lime-200 dark:focus:ring-teal-700 text-gray-900",
    redToYellow: "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 text-gray-900"
  };
  const socialVariants = {
    facebook: "bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-[#3b5998]/50 dark:focus:ring-[#3b5998]/55 text-gray-300",
    twitter: "bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-[#1da1f2]/50 dark:focus:ring-[#1da1f2]/55",
    github: "bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-[#24292F]/50 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 text-gray-300",
    google: "bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55",
    apple: "bg-[#050708] hover:bg-[#050708]/90 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50",
    metamask: "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-gray-100 dark:focus:ring-gray-600 dark:bg-theme-dark dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
    opera: "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-gray-100 dark:focus:ring-gray-600 dark:bg-theme-dark dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
    bitcoin: "bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-[#FF9119]/50 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40",
    paypal: "bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-[#F7BE38]/50 dark:focus:ring-[#F7BE38]/50",
    applePay: "bg-[#050708] hover:bg-[#050708]/80 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600",
    amex: "bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-[#2557D6]/50 dark:focus:ring-[#2557D6]/50",
    visa: "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-gray-100 dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200",
    mastercard: "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-gray-100 dark:focus:ring-gray-600 dark:bg-theme-dark dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
    ethereum: "text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-gray-100 dark:focus:ring-gray-500"
  };
  const sizeClasses = {
    xs: iconOnly ? "p-1 text-xs" : "text-xs px-2 py-1",
    sm: iconOnly ? "p-2 text-sm" : "text-sm px-3 py-1.5",
    base: iconOnly ? "p-2.5 text-base" : "text-base px-4 py-2",
    lg: iconOnly ? "p-3 text-lg" : "text-lg px-5 py-3",
    xl: iconOnly ? "p-4 text-xl" : "text-xl px-6 py-3.5"
  };
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    default: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };
  const getVariantClass = () => {
    if (variant.startsWith("outline.")) return outlineVariants[variant.split(".")[1]] || "";
    if (variant.startsWith("gradient.")) return gradientVariants[variant.split(".")[1]] || "";
    if (variant.startsWith("social.")) return socialVariants[variant.split(".")[1]] || "";
    return baseVariants[variant] || "";
  };
  const cursorClass = disabled ? "cursor-not-allowed" : pointer ? "cursor-pointer" : "cursor-default";
  const isIconOnly = iconOnly || !!icon && !children;
  const finalClass = ["inline-flex items-center justify-center transition duration-150 ease-in-out", getVariantClass(), sizeClasses[size], roundedClasses[rounded], shadow ? shadowClasses[shadow] : "", cursorClass, block ? "w-full" : "", className].filter(Boolean).join(" ");

  // Regular button
  return /*#__PURE__*/React$1.createElement("button", _extends({
    type: type,
    disabled: disabled || loading,
    className: finalClass,
    title: tooltip
  }, props), loading ? /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("span", {
    className: "mr-2"
  }, children), /*#__PURE__*/React$1.createElement("svg", {
    className: "animate-spin h-5 w-5 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React$1.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React$1.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  }))) : /*#__PURE__*/React$1.createElement(React$1.Fragment, null, icon && iconPosition === "left" && !isIconOnly && /*#__PURE__*/React$1.createElement("span", {
    className: "mr-2"
  }, icon), children, icon && iconPosition === "right" && !isIconOnly && /*#__PURE__*/React$1.createElement("span", {
    className: "ml-2"
  }, icon), isIconOnly && icon, badge && /*#__PURE__*/React$1.createElement("span", {
    className: "ml-2"
  }, badge)));
};

export { Avatar, AvatarUpload, ButtonTw, Checkbox, Input, RadioButton, RadioGroup, SelectSearch, SwitchButton };
