import { useState, useEffect, useRef } from 'react';

const sizeConfig = {
    sm: {
        height: 'h-5',
        knob: 'w-4 h-4',
        text: 'text-xs',
        padding: 'px-1',
        minWidth: 'min-w-[3rem]',
    },
    md: {
        height: 'h-7',
        knob: 'w-6 h-6',
        text: 'text-sm',
        padding: 'px-2',
        minWidth: 'min-w-[3.5rem]',
    },
    lg: {
        height: 'h-10',
        knob: 'w-8 h-8',
        text: 'text-base',
        padding: 'px-3',
        minWidth: 'min-w-[5rem]',
    },
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
    },
};

const SwitchButton = ({
    id,
    name,
    enabled = false,
    label = '',
    error,
    onChange = () => { },
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
    const [textWidth, setTextWidth] = useState({ enabled: 0, disabled: 0 });
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
        setIsEnabled((prev) => {
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

    return (
        <div className={` ${className}`}>
            {label && (
                <label htmlFor={switchId} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}

            <div className="relative inline-block">
                {/* Hidden text elements to measure width */}
                <span
                    ref={enabledTextRef}
                    className={`absolute invisible whitespace-nowrap ${cfg.text}`}
                >
                    {enabledText}
                </span>
                <span
                    ref={disabledTextRef}
                    className={`absolute invisible whitespace-nowrap ${cfg.text}`}
                >
                    {disabledText}
                </span>

                <button
                    id={switchId}
                    type="button"
                    role="switch"
                    aria-checked={isEnabled}
                    onClick={toggleSwitch}
                    className={`relative inline-flex items-center rounded-full transition-colors ${isEnabled ? activeEnabledColor : activeDisabledColor
                        } ${cfg.height} ${cfg.padding} ${cfg.minWidth} ${dynamicWidth}`}
                    {...props}
                >
                    <span className="sr-only">Toggle Switch</span>
                    <span
                        className={`absolute bg-white rounded-full shadow-md transition-all duration-200 ${cfg.knob
                            } ${isEnabled
                                ? 'left-[calc(100%-1.1rem)]'
                                : 'left-0.5'
                            } ${knobClass}`}
                    />
                    <span className={`whitespace-nowrap ${cfg.text} font-medium ${isEnabled ? 'text-white' : activeTextColor} ${isEnabled ? 'pr-4' : 'pl-4'
                        }`}>
                        {isEnabled ? enabledText : disabledText}
                        {/* {isEnabled && <i class="fa-solid fa-check ml-1"></i>}
                        {!isEnabled && <i class="fa-solid fa-xmark ml-1"></i>} */}
                    </span>
                </button>
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default SwitchButton;