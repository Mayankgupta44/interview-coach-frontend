export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center 
    bg-[#020617] px-4">

      <div className="w-full max-w-md rounded-2xl 
      bg-[#0f172a] 
      border border-white/10 
      p-8 
      shadow-[0_0_25px_rgba(0,0,0,0.5)]">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </div>
  );
}