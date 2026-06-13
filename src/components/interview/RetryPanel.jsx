import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import AudioRecorder from "./AudioRecorder";

export default function RetryPanel({
  mode = "TEXT",
  onModeChange,
  textValue,
  onTextChange,
  onTextSubmit,
  textLoading,
  recorder,
  onTranscribe,
  transcribing,
  transcript,
  onTranscriptChange,
  onSubmitTranscript,
  submitting,
  audioUrl,
  retryTextAttempted,
}) {
  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-white">
        Improve Your Answer
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Rewrite or record an improved answer using the feedback above.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onModeChange("TEXT")}
          className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
            mode !== "AUDIO"
              ? "bg-primary text-white"
              : "bg-[#020617] text-gray-400 border border-white/10 hover:bg-[#111827]"
          }`}
        >
          Type Improved Answer
        </button>

        <button
          type="button"
          onClick={() => onModeChange("AUDIO")}
          className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
            mode === "AUDIO"
              ? "bg-primary text-white"
              : "bg-[#020617] text-gray-400 border border-white/10 hover:bg-[#111827]"
          }`}
        >
          Record Improved Answer
        </button>
      </div>

      {mode === "AUDIO" ? (
        <div className="mt-4">
          <AudioRecorder
            recorder={recorder}
            onTranscribe={onTranscribe}
            transcribing={transcribing}
            transcript={transcript}
            onTranscriptChange={onTranscriptChange}
            onSubmitTranscript={onSubmitTranscript}
            submitting={submitting}
            audioUrl={audioUrl}
          />
        </div>
      ) : (
        <>
          <div className="mt-4">
            <Textarea
              value={textValue}
              onChange={(e) => onTextChange(e.target.value)}
              rows={5}
              placeholder="Write improved answer here..."
            />
          </div>

          {textSubmitAttempted && textValue.trim().length < 20 && (
            <p className="text-xs text-red-400 mt-2">
              Minimum 20 characters required
            </p>
          )}

          <div className="mt-4">
            <Button
              className="w-xs px-6"
              onClick={onTextSubmit}
              loading={textLoading}
            >
              Re-evaluate Answer
            </Button>
          </div>
        </>
      )}
    </div>
  );
}