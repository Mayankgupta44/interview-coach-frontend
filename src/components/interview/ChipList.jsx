export default function ChipList({
  title,
  items = [],
  emptyText = "No data available",
  variant = "default",
}) {
  const styles = {
    default: "bg-appBg dark:bg-white/10 text-textSecondary dark:text-gray-300",
    success: "bg-success/10 text-success dark:bg-green-500/10 dark:text-green-400",
    warning: "bg-warning/10 text-warning dark:bg-yellow-500/10 dark:text-yellow-400",
    danger: "bg-danger/10 text-danger dark:bg-red-500/10 dark:text-red-400",
    primary: "bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400",
  };

  return (
    <div className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] p-4 
    shadow-soft dark:shadow-blue-500/10 
    transition-all duration-300">
      <h3 className="text-sm font-semibold text-textPrimary dark:text-white">{title}</h3>

      {items.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${title}-${item}-${index}`}
              className={`rounded-full px-3 py-1 text-xs font-medium 
              ${styles[variant]} 
              transition hover:scale-105`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-textSecondary dark:text-gray-300">{emptyText}</p>
      )}
    </div>
  );
}