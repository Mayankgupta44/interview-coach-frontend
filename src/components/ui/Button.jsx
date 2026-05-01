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
      bg-gradient-to-r from-blue-600 to-blue-500 
      text-white 
      hover:scale-105 
      hover:shadow-blue-500/30
    `,
    secondary: `
      bg-[#020617] 
      text-blue-400 
      border border-white/10 
      hover:bg-white/10
    `,
    danger: `
      bg-red-500 
      text-white 
      hover:bg-red-500/90
    `,
    ghost: `
      bg-transparent 
      text-gray-400 
      hover:bg-white/10 
      hover:text-white
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex w-full items-center justify-center 
      rounded-xl px-4 py-3 text-sm font-medium 
      transition-all duration-200 
      disabled:cursor-not-allowed disabled:bg-[#020617]/60 
      ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}