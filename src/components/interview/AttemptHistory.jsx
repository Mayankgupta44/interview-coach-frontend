import Badge from "../ui/Badge";
import { getScoreVariant } from "../../utils/scoreUtils";

export default function AttemptHistory({ attempts = [] }) {
  if (!attempts.length) return null;

  return (
    <div className="rounded-xl bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-textPrimary">
        Attempt History
      </h3>

      <div className="mt-4 space-y-3">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="rounded-xl bg-appBg p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-textPrimary">
                  Attempt #{attempt.attemptNumber}
                  {attempt.isImproved ? " • Improved" : " • Original"}
                </p>
                <p className="mt-1 text-xs text-textSecondary">
                  {formatDate(attempt.createdAt)}
                </p>
              </div>

              <Badge variant={getScoreVariant(attempt.evaluation?.overallScore)}>
                Overall: {attempt.evaluation?.overallScore ?? 0}
              </Badge>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-textSecondary">
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