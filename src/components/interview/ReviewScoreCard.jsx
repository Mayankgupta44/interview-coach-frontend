import { getScoreTextColor } from "../../utils/scoreUtils";

export default function ReviewScoreCard({ label, value = 0 }) {
  return (
    <div className="rounded-xl bg-appBg p-4">
      <p className="text-sm text-textSecondary">{label}</p>
      <h3 className={`mt-2 text-3xl font-bold ${getScoreTextColor(value)}`}>
        {value}
      </h3>
    </div>
  );
}