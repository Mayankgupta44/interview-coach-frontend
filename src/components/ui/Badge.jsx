export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-appBg text-textSecondary",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[variant] || styles.default}`}
    >
      {children}
    </span>
  );
}