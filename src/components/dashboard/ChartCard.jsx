export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-textPrimary">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-textSecondary">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}