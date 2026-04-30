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
        className={`w-full rounded-xl 
        !bg-white 
        dark:bg-white/5 
        px-4 py-3 text-sm 
        text-textPrimary dark:text-gray-200 
        outline-none transition-[box-shadow,transform] duration-200 
        placeholder:text-textSecondary/60 dark:placeholder:text-gray-400 
        focus:ring-2 focus:ring-secondary/30 
        border border-gray-300 focus:border-primary dark:border-white/10
        disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-white/10 ${
          error ? "focus:ring-danger/30" : ""
        }`}
      />

      {error ? <p className="text-sm text-danger dark:text-red-400">{error}</p> : null}
    </div>
  );
}
