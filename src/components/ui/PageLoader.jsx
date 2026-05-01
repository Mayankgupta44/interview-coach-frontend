export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617]">
      <div className="rounded-xl bg-[#0f172a] px-6 py-4 border border-white/10 shadow-sm">
        <p className="text-sm font-medium text-gray-400">{text}</p>
      </div>
    </div>
  );
}