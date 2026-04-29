import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function RetryPanel({
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <div className="rounded-xl bg-card dark:bg-[rgba(15,23,42,0.7)] p-5 
    shadow-soft dark:shadow-blue-500/20 transition">
        <h3 className="text-sm font-semibold text-textPrimary dark:text-white">
        Improve Your Answer
      </h3>
      <p className="mt-1 text-sm text-textSecondary dark:text-gray-300">
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

      <div className="mt-4">
        <Button onClick={onSubmit} loading={loading}>
          Re-evaluate Answer
        </Button>
      </div>
    </div>
  );
}