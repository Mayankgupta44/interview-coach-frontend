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
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-400 
      text-white 
      hover:shadow-blue-500/40 
      hover:scale-105
    `,

    secondary: `
      bg-card dark:bg-white/5 
      text-primary dark:text-blue-400 
      border border-gray-200 dark:border-white/10 
      hover:bg-secondary/10 
      hover:shadow-blue-500/20
    `,

    danger: `
      bg-danger text-white 
      hover:bg-danger/90 
      hover:shadow-red-500/30
    `,

    ghost: `
      bg-transparent 
      text-textSecondary dark:text-gray-300 
      hover:bg-secondary/10 
      hover:text-primary dark:hover:text-blue-400
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex w-full items-center justify-center 
      rounded-xl px-4 py-3 text-sm font-medium 
      transition-all duration-200 
      focus:outline-none focus:ring-secondary/30 dark:focus:ring-blue-500/30 
      disabled:cursor-not-allowed disabled:opacity-60 
      shadow-soft dark:shadow-blue-500/10 
      ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
