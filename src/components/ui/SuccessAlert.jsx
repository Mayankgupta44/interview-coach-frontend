export default function SuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400 shadow-sm">
      {message}
    </div>
  );
}