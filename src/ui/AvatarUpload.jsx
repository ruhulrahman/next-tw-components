import React, { useRef, useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
    showUploadIcon = true, // New prop to control upload icon visibility
    uploadIconPosition = "top-left", // New prop for icon position (top-left, top-right, bottom-left, bottom-right)
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
        'bottom-right': 'bottom-1 right-1',
    };

    useEffect(() => {
        if (typeof value === "string") setPreview(value);
        if (!value) setPreview(null);
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSrcImage(url);
            setShowCrop(true);
            setOriginalFileName(file.name);
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

    // Crop utility
    const getCroppedImg = async (image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
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
            const croppedFile = new File([croppedBlob], fileName, { type: "image/jpeg" });
            onChange && onChange(croppedFile);
        }
    };

    return (
        <div className={`mb-5 flex flex-col items-left ${className}`}>
            {label && <span className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</span>}
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
                onClick={handleClick}
            >
                {/* Upload icon (only shown when showUploadIcon is true and there's no preview) */}
                {showUploadIcon && (
                    <button
                        type="button"
                        className={`absolute z-20 w-[30px] h-[30px] leading-1 bg-gray-300 bg-opacity-80 hover:bg-gray-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer ${positionClasses[uploadIconPosition]}`}
                        onClick={handleClick}
                        tabIndex={-1}
                        aria-label="Upload"
                        disabled={disabled}
                    >
                        <i className="fa-solid fa-camera"></i>
                    </button>
                )}

                {/* Clear icon (only shown when there's a preview and clearable is true) */}
                {preview && clearable && (
                    <button
                        type="button"
                        className="absolute top-1 left-1 z-20 w-[25px] h-[25px] leading-1 bg-gray-300 bg-opacity-80 hover:bg-red-500 text-black hover:text-white transition-colors rounded-full p-1 shadow cursor-pointer"
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out] backdrop-blur-[2px]"
                    aria-hidden="true"
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

            {/* Crop Modal */}
            {showCrop && srcImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="dark:bg-theme-dark bg-theme-light p-4 rounded shadow-lg" onClick={e => e.stopPropagation()}>
                        <ReactCrop crop={crop} onChange={setCrop} aspect={1}>
                            <img
                                ref={imgRef}
                                src={srcImage}
                                alt="Crop"
                                onLoad={e => (imgRef.current = e.target)}
                                style={{ maxHeight: 400, maxWidth: 400 }}
                            />
                        </ReactCrop>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
                                onClick={handleCropOk}
                            >
                                OK
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 dark:text-black rounded"
                                onClick={() => setShowCrop(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarUpload;