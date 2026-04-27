import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function RetryPanel({
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <div className="rounded-xl bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold text-textPrimary">
        Improve Your Answer
      </h3>
      <p className="mt-1 text-sm text-textSecondary">
        Rewrite your answer using the feedback above and submit again for
        re-evaluation.
      </p>

      <div className="mt-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="Write improved answer here..."
        />
      </div>

      <div className="mt-4 max-w-xs">
        <Button onClick={onSubmit} loading={loading}>
          Re-evaluate Answer
        </Button>
      </div>
    </div>
  );
}