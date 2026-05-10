import Badge from "../ui/Badge";
import { getScoreVariant } from "../../utils/scoreUtils";
import { API_BASE_URL } from "../../utils/constants";

export default function AttemptHistory({ attempts = [] }) {
  if (!attempts.length) return null;

  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 shadow-sm transition hover:shadow-blue-500/20 hover:scale-[1.01]">
      <h3 className="text-sm font-semibold text-white">Attempt History</h3>

      <div className="mt-4 space-y-3">
        {attempts.map((attempt) => (
          <div
            key={`${attempt.questionId}-${attempt.id}-${attempt.attemptNumber}`}
            className="rounded-xl bg-[#020617] p-4 border border-white/10"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  Attempt #{attempt.attemptNumber}
                  {attempt.isImproved ? " • Improved" : " • Original"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(attempt.createdAt)}
                </p>
              </div>

              <Badge
                variant={getScoreVariant(attempt.evaluation?.overallScore)}
              >
                Overall: {attempt.evaluation?.overallScore ?? 0}
              </Badge>
            </div>

            <div className="mt-3">
              {attempt.answerMode === "AUDIO" ? (
                <Badge variant="primary">Recorded Attempt</Badge>
              ) : (
                <Badge variant="default">Typed Attempt</Badge>
              )}
            </div>

            {attempt.audioUrl ? (
              <div className="mt-3 rounded-xl border border-white/10 bg-[#0f172a] p-3">
                <audio
                  controls
                  src={getAudioSrc(attempt.audioUrl)}
                  className="w-full"
                />
              </div>
            ) : null}

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-400">
              {attempt.transcriptText || attempt.answerText}
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

function getAudioSrc(audioUrl) {
  if (!audioUrl) return "";

  if (audioUrl.startsWith("http://") || audioUrl.startsWith("https://")) {
    return audioUrl;
  }

  return `${API_BASE_URL}${audioUrl.startsWith("/") ? audioUrl : `/${audioUrl}`}`;
}
