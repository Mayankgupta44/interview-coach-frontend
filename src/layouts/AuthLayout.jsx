export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-appBg px-4">
      
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-soft">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-textPrimary">
            {title}
          </h1>

          <p className="mt-2 text-sm text-textSecondary">
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </div>
  );
}