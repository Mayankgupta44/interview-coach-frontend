import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

export default function RetryPanel({
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-white">
        Improve Your Answer
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Rewrite your answer using the feedback above and submit again.
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
        <Button className="w-xs px-6" onClick={onSubmit} loading={loading}>
          Re-evaluate Answer
        </Button>
      </div>
    </div>
  );
}