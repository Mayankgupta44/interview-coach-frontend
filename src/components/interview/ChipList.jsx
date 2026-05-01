export default function ChipList({
  title,
  items = [],
  emptyText = "No data available",
  variant = "default",
}) {
  const styles = {
    default: "bg-[#020617] text-gray-400",
    success: "bg-green-500/10 text-green-400",
    warning: "bg-yellow-500/10 text-yellow-400",
    danger: "bg-red-500/10 text-red-400",
    primary: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      {items.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${title}-${item}-${index}`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${styles[variant]} transition hover:scale-105`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-400">{emptyText}</p>
      )}
    </div>
  );
}