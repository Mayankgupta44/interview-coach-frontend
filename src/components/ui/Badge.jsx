export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-appBg dark:bg-white/10 text-textSecondary dark:text-gray-300",
    primary: "bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400",
    success: "bg-success/10 text-success dark:bg-green-500/10 dark:text-green-400",
    warning: "bg-warning/10 text-warning dark:bg-yellow-500/10 dark:text-yellow-400",
    danger: "bg-danger/10 text-danger dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition hover:scale-105 ${styles[variant] || styles.default}`}
    >
      {children}
    </span>
  );
}