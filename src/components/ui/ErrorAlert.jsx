export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 shadow-sm">
      {message}
    </div>
  );
}