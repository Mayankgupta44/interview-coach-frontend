export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-textPrimary">{title}</h1>
          <p className="mt-2 text-sm text-textSecondary">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}