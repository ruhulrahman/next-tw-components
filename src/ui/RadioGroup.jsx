import React from 'react';
import Radio from './Radio';

// interface RadioOption {
//     value: string;
//     label: string;
// }

// interface RadioGroupProps {
//     name: string;
//     options: RadioOption[];
//     selectedValue?: string;
//     color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'secondary';
//     onChange?: (value: string) => void;
//     className?: string;
// }

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
};

// Card-specific size classes for border, padding, and text
const cardSizeClasses = {
    sm: "p-1 text-xs",
    md: "p-1.5 text-sm",
    lg: "p-2.5 text-base",
    xl: "p-4.5 text-lg",
};

const RadioGroup = ({
    name,
    options,
    selectedValue,
    color = 'success',
    activeColor = false,
    onChange,
    direction = "vertical", // "vertical" or "horizontal"
    variant = "default",
    size = "sm",
    label,
    error,
    description,
    disabled = false,
    className = '',
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}
            <div className={
                variant.includes("inline")
                    ? "flex flex-row gap-4"
                    : direction === "horizontal"
                        ? "flex flex-row gap-4"
                        : "flex flex-col gap-2"
            }>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        checked={selectedValue === option.value}
                        color={color}
                        activeColor={activeColor}
                        variant={variant}
                        size={size}
                        onChange={handleChange}
                    />
                ))}
            </div>

            {description && (
                <div className="text-xs text-gray-500 mt-1">{description}</div>
            )}
            {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
            )}
        </div>
    );
};

export default RadioGroup;