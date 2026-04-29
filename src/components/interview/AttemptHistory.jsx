import Badge from "../ui/Badge";
import { getScoreVariant } from "../../utils/scoreUtils";

export default function AttemptHistory({ attempts = [] }) {
  if (!attempts.length) return null;

  return (
    <div className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] p-5 
    shadow-soft dark:shadow-blue-500/10 
    hover:shadow-blue-500/20 hover:scale-[1.01] transition-all duration-300">
      <h3 className="text-sm font-semibold text-textPrimary dark:text-white">
        Attempt History
      </h3>

      <div className="mt-4 space-y-3">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="rounded-xl bg-appBg dark:bg-[#020617]/60 
            p-4 border border-transparent dark:border-white/10"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-textPrimary dark:text-white">
                  Attempt #{attempt.attemptNumber}
                  {attempt.isImproved ? " • Improved" : " • Original"}
                </p>
                <p className="mt-1 text-xs text-textSecondary dark:text-gray-300">
                  {formatDate(attempt.createdAt)}
                </p>
              </div>

              <Badge variant={getScoreVariant(attempt.evaluation?.overallScore)}>
                Overall: {attempt.evaluation?.overallScore ?? 0}
              </Badge>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-textSecondary dark:text-gray-300">
              {attempt.answerText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}