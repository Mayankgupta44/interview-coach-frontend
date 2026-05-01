export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  helper,
}) {
  return (
    <div
      className="
        rounded-xl 
        bg-[#0f172a] 
        border border-white/10
        p-5 
        shadow-sm
        transition-all duration-200 
        hover:scale-[1.03] 
        hover:shadow-blue-500/20
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h3>

          {helper && (
            <p className="mt-1 text-xs text-gray-400">
              {helper}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="
              rounded-xl 
              bg-blue-500/10 
              p-3 
              text-blue-400 
              shadow-sm
            "
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}