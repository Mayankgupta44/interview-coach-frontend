export default function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="rounded-card bg-card p-6 shadow-soft hover:shadow-md transition-all duration-200 h-full flex flex-col">
      {" "}
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-textPrimary">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-textSecondary">{subtitle}</p>
            )}
          </div>

          {action && (
            <div className="shrink-0 self-start sm:self-auto">{action}</div>
          )}
        </div>
      )}
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 gap-4">{children}</div>
    </section>
  );
}
