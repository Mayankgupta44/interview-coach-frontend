export default function SuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-success/10 dark:bg-green-500/10 
    px-4 py-3 text-sm text-success dark:text-green-400 
    shadow-soft dark:shadow-green-500/20">
      {message}
    </div>
  );
}