import Button from "../ui/Button";

export default function AudioRecorder({
  recorder,
  onTranscribe,
  transcribing,
  transcript,
  onTranscriptChange,
  onSubmitTranscript,
  submitting,
  audioUrl,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#020617] p-5">
      <h3 className="text-sm font-semibold text-white">Recorded Answer</h3>

      <p className="mt-1 text-sm text-gray-400">
        Record your answer, generate transcript, edit if needed, then submit.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!recorder.recording ? (
          <Button
            className="w-auto min-w-[160px] px-6"
            onClick={recorder.startRecording}
          >
            Start Recording
          </Button>
        ) : (
          <Button
            className="w-auto min-w-[160px] px-6"
            variant="danger"
            onClick={recorder.stopRecording}
          >
            Stop Recording
          </Button>
        )}

        {recorder.audioBlob ? (
          <Button
            className="w-auto min-w-[110px] px-5"
            variant="secondary"
            onClick={recorder.resetRecording}
          >
            Reset
          </Button>
        ) : null}
      </div>

      {recorder.audioBlob ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a] p-3">
          <p className="mb-2 text-xs font-medium text-gray-400">
            Recording Preview
          </p>

          <audio
            controls
            src={URL.createObjectURL(recorder.audioBlob)}
            className="w-full"
          />
        </div>
      ) : null}

      {audioUrl ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-[#0f172a] p-3">
          <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
            Saved Audio
          </p>

          <audio controls src={audioUrl} className="w-full" />
        </div>
      ) : null}

      {recorder.audioBlob && !transcript ? (
        <div className="mt-4">
          <Button
            className="w-auto min-w-[180px] px-6"
            onClick={onTranscribe}
            loading={transcribing}
          >
            Generate Transcript
          </Button>
        </div>
      ) : null}

      {transcript ? (
        <div className="mt-5">
          <label className="block text-sm font-semibold text-white">
            Editable Transcript
          </label>

          <p className="mt-1 text-xs text-gray-400">
            Review and correct the transcript before submitting for evaluation.
          </p>

          <textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            rows={6}
            className="mt-3 w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-gray-200 outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

          <div className="mt-4">
            <Button
              className="w-auto min-w-[170px] px-6"
              onClick={onSubmitTranscript}
              loading={submitting}
            >
              Submit Transcript
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}