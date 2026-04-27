export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-appBg">
      <div className="rounded-xl border border-borderColor bg-card px-6 py-4 shadow-soft">
        <p className="text-sm font-medium text-textSecondary">{text}</p>
      </div>
    </div>
  );
}