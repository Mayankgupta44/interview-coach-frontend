export default function SuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
      {message}
    </div>
  );
}