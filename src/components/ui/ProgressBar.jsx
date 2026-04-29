export default function ProgressBar({ value = 0 }) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  const color =
    safeValue >= 85
      ? "bg-success"
      : safeValue >= 70
      ? "bg-warning"
      : "bg-danger";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-textPrimary dark:text-white">
          Fit Score
        </p>
        <p className="text-sm font-semibold text-textPrimary dark:text-white">
          {safeValue}%
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-appBg dark:bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-500 
          ${color} dark:shadow-[0_0_10px_rgba(59,130,246,0.4)]`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}