import { getScoreTextColor } from "../../utils/scoreUtils";

export default function ReviewScoreCard({ label, value = 0 }) {
  return (
    <div className="rounded-xl bg-appBg dark:bg-[#020617]/60 
    p-4 border border-transparent dark:border-white/10 hover:scale-[1.02] transition">
      <p className="text-sm text-textSecondary dark:text-gray-300">{label}</p>
      <h3 className={`mt-2 text-3xl font-bold ${getScoreTextColor(value)} dark:text-white`}>
        {value}
      </h3>
    </div>
  );
}