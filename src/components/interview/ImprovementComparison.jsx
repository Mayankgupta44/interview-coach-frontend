export default function ImprovementComparison({ comparison }) {
  if (!comparison?.previousAttempt) return null;

  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-white">
        Improvement Comparison
      </h3>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DiffCard label="Overall" diff={comparison.overallScoreDifference} />
        <DiffCard label="Technical" diff={comparison.technicalScoreDifference} />
        <DiffCard label="Relevance" diff={comparison.relevanceScoreDifference} />
        <DiffCard label="Communication" diff={comparison.communicationScoreDifference} />
      </div>
    </div>
  );
}

function DiffCard({ label, diff }) {
  const color =
    diff > 0 ? "text-green-400" :
    diff < 0 ? "text-red-400" :
    "text-gray-400";

  const prefix = diff > 0 ? "+" : "";

  return (
    <div className="rounded-xl bg-[#020617] p-4 border border-white/10">
      <p className="text-sm text-gray-400">{label}</p>

      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        {diff == null ? "-" : `${prefix}${diff}`}
      </h3>
    </div>
  );
}