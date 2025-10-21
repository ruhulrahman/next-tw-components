const Avatar = ({
  text = "",
  value = "",
  image = "",
  size = "sm",
  color = "primary",
  icon: CustomIcon = null,
  circular = true,
  className = "",
}) => {
  
  // Color variants
  const colorClasses = {
    primary: "bg-blue-200 text-blue-700 dark:bg-blue-600 dark:text-blue-100",
    success:
      "bg-green-200 text-green-700 dark:bg-green-600 dark:text-green-100",
    info: "bg-cyan-200 text-cyan-700 dark:bg-cyan-600 dark:text-cyan-100",
    warning:
      "bg-yellow-200 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
    danger: "bg-red-200 text-red-700 dark:bg-red-600 dark:text-red-100",
  };

  // Size variants
  const sizeClasses = {
    sm: "size-5  font-medium ",
    md: "size-8 font-medium ",
    lg: "size-10 font-medium ",
    xl: "size-12 font-medium ",
  };

  // Icon size mapping
  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };
  return (
    <>
      {text && (
        <div
          className={`flex items-center justify-center
                        ${sizeClasses[size]}
                        ${colorClasses[color]} ${
            circular ? "rounded-full" : "rounded"
          } ${className}`}
        >
          {text}
        </div>
      )}

      {image && (
        <div
          className={`flex items-center justify-center
                        ${sizeClasses[size]}
                        ${colorClasses[color]} ${
            circular ? "rounded-full" : "rounded"
          } ${className}`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Avatar;
