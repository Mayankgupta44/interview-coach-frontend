export default function ChipList({
  title,
  items = [],
  emptyText = "No data available",
  variant = "default",
}) {
  const styles = {
    default: "bg-appBg text-textSecondary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    primary: "bg-primary/10 text-primary",
  };

  return (
    <div className="rounded-xl bg-card p-4 shadow-soft">
      <h3 className="text-sm font-semibold text-textPrimary">{title}</h3>

      {items.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${title}-${item}-${index}`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-textSecondary">{emptyText}</p>
      )}
    </div>
  );
}