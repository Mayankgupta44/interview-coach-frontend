export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  helper,
}) {
  return (
    <div
      className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] p-5 
      shadow-soft dark:shadow-blue-500/10 
      transition-all duration-200 
      hover:scale-[1.03] hover:shadow-blue-500/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-textSecondary dark:text-gray-300">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-textPrimary dark:text-white">
            {value}
          </h3>

          {helper && (
            <p className="mt-1 text-xs text-textSecondary dark:text-gray-300">
              {helper}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-primary/10 dark:bg-blue-500/10 
          p-3 text-primary dark:text-blue-400 
          shadow-sm dark:shadow-blue-500/20">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
