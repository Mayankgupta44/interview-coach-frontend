export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  variant = "primary",
  ...props
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary focus:ring-secondary/30",

    secondary:
      "bg-card text-primary border border-borderColor hover:bg-secondary/10 focus:ring-secondary/20",

    danger: "bg-danger text-white hover:bg-danger/90 focus:ring-danger/30",

    ghost:
      "bg-transparent text-textSecondary hover:bg-secondary/10 hover:text-primary",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm shadow-soft hover:shadow-md font-medium transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
