export default function ReviewScoreCard({ label, value = 0 }) {
  return (
    <div className="rounded-xl bg-[#020617] p-4 border border-white/10 transition hover:scale-[1.02]">
      <p className="text-sm text-gray-400">{label}</p>

      <h3 className={`mt-2 text-3xl font-bold ${getScoreTextColor(value)}`}>
        {value}
      </h3>
    </div>
  );
}

function getScoreTextColor(score) {
  if (score >= 85) return "text-green-400";
  if (score >= 70) return "text-yellow-400";
  return "text-red-400";
}