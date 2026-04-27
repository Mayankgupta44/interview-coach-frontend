export default function Avatar({ name = "", imageUrl = "", size = "md" }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const initials = getInitials(name);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-white ring-2 ring-secondary/20 ${
        sizes[size] || sizes.md
      }`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "User avatar"}
          className="h-full w-full object-cover"
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