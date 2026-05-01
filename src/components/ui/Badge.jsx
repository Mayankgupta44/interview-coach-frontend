export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-[#020617] text-gray-400",
    primary: "bg-blue-500/10 text-blue-400",
    success: "bg-green-500/10 text-green-400",
    warning: "bg-yellow-500/10 text-yellow-400",
    danger: "bg-red-500/10 text-red-400",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition hover:scale-105 ${styles[variant]}`}>
      {children}
    </span>
  );
}