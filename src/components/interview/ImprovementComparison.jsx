export default function ImprovementComparison({ comparison }) {
  if (!comparison?.previousAttempt) return null;

  return (
    <div className="rounded-xl bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-textPrimary">
        Improvement Comparison
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DiffCard label="Overall" diff={comparison.overallScoreDifference} />
        <DiffCard
          label="Technical"
          diff={comparison.technicalScoreDifference}
        />
        <DiffCard
          label="Relevance"
          diff={comparison.relevanceScoreDifference}
        />
        <DiffCard
          label="Communication"
          diff={comparison.communicationScoreDifference}
        />
      </div>
    </div>
  );
}

function DiffCard({ label, diff }) {
  const color =
    diff > 0 ? "text-success" : diff < 0 ? "text-danger" : "text-textSecondary";

  const prefix = diff > 0 ? "+" : "";

  return (
    <div className="rounded-xl bg-appBg p-4">
      <p className="text-sm text-textSecondary">{label}</p>
      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        {diff == null ? "-" : `${prefix}${diff}`}
      </h3>
    </div>
  );
}
