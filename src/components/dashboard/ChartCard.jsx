export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="
      rounded-xl 
      bg-[#0f172a] 
      border border-white/10
      p-6 
      shadow-sm
      transition 
      hover:shadow-blue-500/30 
      hover:scale-[1.01] 
      flex flex-col
    ">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex-1 min-h-[260px]">{children}</div>
    </div>
  );
}