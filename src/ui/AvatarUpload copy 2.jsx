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
    icon,
}) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(
        value && typeof value === "string" ? value : null
    );
    const [showModal, setShowModal] = useState(false);

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

    const handlePreviewClick = (e) => {
        e.stopPropagation();
        setShowModal(true);
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
                        className="absolute top-1 left-1 z-20 w-[30px] h-[30px] leading-1 bg-gray-300 bg-opacity-10 hover:bg-gray-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer"
                        onClick={handleClick}
                        tabIndex={-1}
                        aria-label="Upload"
                        disabled={disabled}
                    >
                        <i className="fa-solid fa-camera"></i>
                    </button>
                ) : (
                    <button
                        type="button"
                            className="absolute top-1 left-1 z-20  w-[30px] h-[30px] leading-1 bg-gray-300 bg-opacity-80 hover:bg-red-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label="Clear"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}

                {preview ? (
                    <img
                        src={preview}
                        alt="Avatar Preview"
                        className={`object-cover w-full h-full ${shape === "circle" ? "rounded-full" : "rounded-lg"} cursor-pointer`}
                        onClick={handlePreviewClick}
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

            {/* Modal for full-size preview */}
            {showModal && preview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={() => setShowModal(false)}
                >
                    <div className="relative bg-white rounded shadow-lg p-2" onClick={e => e.stopPropagation()}>
                        <img
                            src={preview}
                            alt="Full Avatar"
                            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: shape === "circle" ? "50%" : "0" }}
                        />
                        <button
                            className="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarUpload;