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
        <label className="block text-sm font-medium text-textPrimary">
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
        className={`w-full rounded-xl bg-appBg shadow-inner px-4 py-3 text-sm text-textPrimary outline-none transition-all duration-200 placeholder:text-textSecondary/60 focus:ring-2 focus:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "focus:ring-danger/30" : ""
        }`}
      />

      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
