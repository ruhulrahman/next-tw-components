import Image from "next/image";
import helpers from "@/utils/helpers";
import SimpleTooltip from "./SimpleTooltip";
import Avatar from "./Avatar";

export default function CardWithAvatars({
  title,
  borderColor = "border-l-gray-500",
  onClick,
  users = [],
  count = 0,
}) {
  const displayAvatars = users.slice(0, 4);
  const extra = count - displayAvatars.length;

  return (
    <div
      className={`dark:bg-theme-dark bg-theme-light dark:text-theme-light-text text-theme-dark-text shadow-md rounded-xl p-3 px-4 flex items-center justify-between border-l-4 ${borderColor} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {/* Left Side */}
      <div>
        <p className="text-xs text-gray-500 pb-2">{title}</p>

        <div className="flex items-center">
          {/* Avatars */}
          <div className="flex items-center overflow-visible -space-x-4">
            {displayAvatars.map((user, index) => (
              <SimpleTooltip key={index} text={user?.name || "N/A"}>
                <div className="relative size-10 rounded-full overflow-hidden border dark:border-slate-50 border-slate-200 cursor-pointer">
                  {user?.fileUrl ? (
                    <Image
                      src={user?.fileUrl}
                      alt={user.name || "User Avatar"}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <Avatar
                      text={helpers.avatarText(user?.name)}
                      color="info"
                      size="lg"
                    />
                  )}
                </div>
              </SimpleTooltip>
            ))}
          </div>

          {/* Extra Count */}
          {extra > 0 && (
            <span className="ml-1 text-sm text-gray-500 font-medium">
              {/* +{extra.toString().padStart(2, "0")} */}+{extra}
            </span>
          )}
        </div>
      </div>

      {/* Right Side Count */}
      <div className="flex items-center justify-between gap-2">
        <div className="border-l mx-2 h-8" />
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
    </div>
  );
}
