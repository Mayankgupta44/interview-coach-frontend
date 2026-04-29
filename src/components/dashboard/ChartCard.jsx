export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] p-6 
    shadow-soft dark:shadow-blue-500/10 
    hover:shadow-blue-500/30 hover:scale-[1.01] 
    transition flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-textPrimary dark:text-white">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-sm text-textSecondary dark:text-gray-300">{subtitle}</p>
        )}
      </div>

      <div className="flex-1 min-h-[260px]">{children}</div>
    </div>
  );
}
