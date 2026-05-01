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
        <label className="text-sm font-medium text-white">
          {label}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full rounded-xl 
        bg-[#020617] 
        px-4 py-3 text-sm 
        text-white 
        outline-none 
        transition-[box-shadow,transform] duration-200
        placeholder:text-gray-500 
        focus:ring-2 focus:ring-blue-500/30 
        resize-y border border-white/10
        disabled:cursor-not-allowed disabled:bg-[#020617]/60 ${
          error ? "focus:ring-red-500/30" : ""
        } ${className}`}
      />

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}