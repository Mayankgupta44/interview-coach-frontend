export default function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="rounded-2xl 
    bg-[#0f172a] 
    border border-white/10 
    p-6 
    shadow-sm 
    hover:shadow-blue-500/20 hover:scale-[1.01] 
    transition-all duration-200 
    h-full flex flex-col">
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0 self-start sm:self-auto">{action}</div>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 gap-4">{children}</div>
    </section>
  );
}