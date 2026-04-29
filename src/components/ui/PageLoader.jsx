export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center 
    bg-appBg dark:bg-[#020617]">
      <div className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] 
      px-6 py-4 shadow-soft dark:shadow-blue-500/10">
        <p className="text-sm font-medium text-textSecondary dark:text-gray-300">{text}</p>
      </div>
    </div>
  );
}
