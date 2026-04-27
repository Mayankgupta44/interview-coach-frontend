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
        <p className="text-sm font-medium text-textPrimary">Fit Score</p>
        <p className="text-sm font-semibold text-textPrimary">
          {safeValue}%
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-appBg">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}