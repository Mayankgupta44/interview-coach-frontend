export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      {label && (
        <label className="text-sm font-medium text-textPrimary">{label}</label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full rounded-xl bg-appBg shadow-inner px-4 py-3 text-sm text-textPrimary outline-none transition-all duration-200 placeholder:text-textSecondary/60 focus:ring-2 focus:ring-secondary/30 resize-y disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "focus:ring-danger/30" : ""
        } ${className}`}
      />

      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
