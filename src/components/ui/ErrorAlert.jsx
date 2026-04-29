export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-danger/10 dark:bg-red-500/10 
    px-4 py-3 text-sm text-danger dark:text-red-400 
    shadow-soft dark:shadow-red-500/20">
      {message}
    </div>
  );
}