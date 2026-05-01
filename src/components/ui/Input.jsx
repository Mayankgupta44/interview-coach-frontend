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
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl 
        bg-[#020617] 
        px-4 py-3 text-sm 
        text-white 
        outline-none 
        transition duration-200
        placeholder:text-gray-500 
        focus:ring-2 focus:ring-blue-500/30 
        border border-white/10
        disabled:cursor-not-allowed disabled:bg-[#020617]/60 ${
          error ? "focus:ring-red-500/30" : ""
        }`}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}