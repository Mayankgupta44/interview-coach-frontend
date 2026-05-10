import { useEffect, useState } from "react";

export default function Avatar({ name = "", imageUrl = "", size = "md" }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const initials = getInitials(name);
  const shouldShowImage = Boolean(imageUrl) && !imageError;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full 
      bg-blue-500/20 
      text-blue-400 
      font-semibold 
      ring-2 ring-blue-500/30
      hover:scale-105 
      transition 
      ${sizes[size] || sizes.md}`}
    >
      {shouldShowImage ? (
        <img
          src={imageUrl}
          alt={name || "User avatar"}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

function getInitials(name) {
  if (!name?.trim()) return "U";

  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}