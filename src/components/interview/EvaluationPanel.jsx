import Badge from "../ui/Badge";
import ReviewScoreCard from "./ReviewScoreCard";
import ChipList from "./ChipList";
import { getScoreVariant } from "../../utils/scoreUtils";

export default function EvaluationPanel({ evaluation }) {
  if (!evaluation) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {evaluation.depthLevel ? (
          <Badge
            variant={
              evaluation.depthLevel === "HIGH"
                ? "success"
                : evaluation.depthLevel === "MEDIUM"
                  ? "warning"
                  : "danger"
            }
          >
            Depth: {evaluation.depthLevel}
          </Badge>
        ) : null}

        {evaluation.isShallow ? (
          <Badge variant="warning">Shallow Answer</Badge>
        ) : null}

        <Badge variant={getScoreVariant(evaluation.overallScore)}>
          Overall: {evaluation.overallScore ?? 0}
        </Badge>
      </div>

      {evaluation.isShallow ? (
        <div className="
        rounded-xl bg-warning/10 p-4 text-sm text-warning
        dark:bg-yellow-500/10
        dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]
        transition hover:scale-[1.01]
        ">
          This answer looks shallow. Add more technical depth, examples, and
          clear reasoning.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReviewScoreCard label="Relevance" value={evaluation.relevanceScore} />
        <ReviewScoreCard label="Technical" value={evaluation.technicalScore} />
        <ReviewScoreCard
          label="Communication"
          value={evaluation.communicationScore}
        />
        <ReviewScoreCard label="Overall" value={evaluation.overallScore} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChipList
          title="Strengths"
          items={evaluation.strengths || []}
          variant="success"
          emptyText="No strengths found."
        />
        <ChipList
          title="Weaknesses"
          items={evaluation.weaknesses || []}
          variant="danger"
          emptyText="No weaknesses found."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChipList
          title="Missing Points"
          items={evaluation.missingPoints || []}
          variant="warning"
          emptyText="No missing points."
        />
        <ChipList
          title="Missing Keywords"
          items={evaluation.missingKeywords || []}
          variant="primary"
          emptyText="No missing keywords."
        />
      </div>

      <div className="rounded-xl bg-success/10 dark:bg-green-500/10 
      backdrop-blur-md p-5 
      shadow-soft dark:shadow-green-500/10">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-400">Ideal Answer</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-green-950 dark:text-green-300">
          {evaluation.improvedAnswer}
        </p>
      </div>
    </div>
  );
}
