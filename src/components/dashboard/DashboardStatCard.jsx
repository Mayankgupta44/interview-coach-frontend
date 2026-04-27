export default function DashboardStatCard({ title, value, icon: Icon, helper }) {
  return (
    <div className="rounded-xl bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-textSecondary">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-textPrimary">{value}</h3>
          {helper && (
            <p className="mt-1 text-xs text-textSecondary">{helper}</p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}