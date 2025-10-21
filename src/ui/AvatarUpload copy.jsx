import React, { useRef, useState, useEffect } from "react";

const AvatarUpload = ({
    value,
    onChange,
    shape = "circle", // "circle" or "square"
    size = 120,
    label = "Upload Avatar",
    error,
    disabled = false,
    id,
    className = "",
    icon, // <-- new prop
}) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(
        value && typeof value === "string" ? value : null
    );

    // Icon size is 40% of avatar size
    const iconSize = Math.round(size * 0.4);

    useEffect(() => {
        if (typeof value === "string") setPreview(value);
        if (!value) setPreview(null);
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange && onChange(file);
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (!disabled) inputRef.current?.click();
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setPreview(null);
        onChange && onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={`mb-5 flex flex-col items-left ${className}`}>

            <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
            <div
                className={`relative flex items-center justify-left bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
          ${shape === "circle" ? "rounded-full" : "rounded-lg"}
        `}
                style={{
                    width: size,
                    height: size,
                    cursor: disabled ? "not-allowed" : "pointer",
                    overflow: "hidden",
                }}
                tabIndex={0}
                aria-label={label}
                id={id}
            >
                {/* Camera or Clear icon (same position) */}
                {!preview ? (
                    <button
                        type="button"
                        className="absolute top-1 left-1 w-[30px] h-[30px] z-20 leading-1 bg-gray-300 bg-opacity-80 hover:bg-gray-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer"
                        onClick={handleClick}
                        tabIndex={-1}
                        aria-label="Upload"
                        disabled={disabled}
                    >
                        <i class="fa-solid fa-camera"></i>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="absolute top-1 left-1 w-[25px] h-[25px] z-20 leading-1 bg-gray-300 bg-opacity-80 hover:bg-red-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label="Clear"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                )}

                {preview ? (
                    <img
                        src={preview}
                        alt="Avatar Preview"
                        className={`object-cover w-full h-full ${shape === "circle" ? "rounded-full" : "rounded-lg"}`}
                    />
                ) : (
                    <span className="flex items-center justify-center w-full h-full cursor-default">
                            {icon
                                ? <span style={{ fontSize: iconSize }}>{icon}</span>
                                : <span style={{ fontSize: iconSize }}><i className="fa-solid fa-user"></i></span>
                            }
                    </span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={disabled}
                />
            </div>
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default AvatarUpload;