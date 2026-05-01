export default function ProgressBar({ value = 0 }) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  const color =
    safeValue >= 85
      ? "bg-green-400"
      : safeValue >= 70
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-white">Fit Score</p>
        <p className="text-sm font-semibold text-white">{safeValue}%</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#020617]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}