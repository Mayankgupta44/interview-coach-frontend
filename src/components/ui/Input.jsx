export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label className="block text-sm font-medium text-textPrimary dark:text-white">
          {label}
        </label>
      ) : null}

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl bg-appBg dark:bg-white/5 
        shadow-inner px-4 py-3 text-sm text-textPrimary dark:text-gray-200 
        outline-none transition-all duration-200 
        placeholder:text-textSecondary/60 dark:placeholder:text-gray-400 
        focus:ring-2 focus:ring-secondary/30 
        border border-transparent dark:border-white/10
        disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "focus:ring-danger/30" : ""
        }`}
      />

      {error ? <p className="text-sm text-danger dark:text-red-400">{error}</p> : null}
    </div>
  );
}
