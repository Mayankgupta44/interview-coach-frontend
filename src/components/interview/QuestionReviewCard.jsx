import { useState } from "react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import SectionCard from "../ui/SectionCard";
import EvaluationPanel from "./EvaluationPanel";
import RetryPanel from "./RetryPanel";
import AttemptHistory from "./AttemptHistory";
import ImprovementComparison from "./ImprovementComparison";
import AudioRecorder from "./AudioRecorder";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import { transcribeAudio } from "../../services/audioService";
import { API_BASE_URL } from "../../utils/constants";

export default function QuestionReviewCard({
  question,
  submittedAnswer,
  attempts = [],
  comparison,
  submitting,
  improving,
  onSubmitTextAnswer,
  onSubmitAudioAnswer,
  onSubmitTextAttempt,
  onSubmitAudioAttempt,
}) {
  const firstAnswerRecorder = useAudioRecorder();
  const retryRecorder = useAudioRecorder();

  const [answerMode, setAnswerMode] = useState("TEXT");
  const [retryMode, setRetryMode] = useState("TEXT");
  const [answerText, setAnswerText] = useState("");
  const [improvedText, setImprovedText] = useState("");

  const [firstTranscript, setFirstTranscript] = useState("");
  const [firstAudioUrl, setFirstAudioUrl] = useState("");
  const [transcribingFirst, setTranscribingFirst] = useState(false);

  const [retryTranscript, setRetryTranscript] = useState("");
  const [retryAudioUrl, setRetryAudioUrl] = useState("");
  const [transcribingRetry, setTranscribingRetry] = useState(false);

  const isAnswered = Boolean(submittedAnswer);

  async function handleSubmitText() {
    await onSubmitTextAnswer(question.id, answerText);
    setAnswerText("");
  }

  async function handleSubmitAudio() {
    await onSubmitAudioAnswer(question.id, firstAnswerRecorder.audioBlob);
    firstAnswerRecorder.resetRecording();
  }

  async function handleSubmitTextRetry() {
  const savedAttempt = await onSubmitTextAttempt(question.id, improvedText);

  if (savedAttempt) {
    setImprovedText("");
  }
}

  async function handleTranscribeRetryAnswer() {
    if (!retryRecorder.audioBlob) return;

    try {
      setTranscribingRetry(true);

      const data = await transcribeAudio(retryRecorder.audioBlob);

      setRetryTranscript(data.transcriptText || "");
      setRetryAudioUrl(data.audioUrl || "");
    } finally {
      setTranscribingRetry(false);
    }
  }

  async function handleSubmitRetryTranscript() {
  const savedAttempt = await onSubmitAudioAttempt(question.id, {
    transcriptText: retryTranscript,
    audioUrl: retryAudioUrl,
  });

  if (savedAttempt) {
    retryRecorder.resetRecording();
    setRetryTranscript("");
    setRetryAudioUrl("");
  }
}

  async function handleTranscribeFirstAnswer() {
    if (!firstAnswerRecorder.audioBlob) return;

    try {
      setTranscribingFirst(true);
      const data = await transcribeAudio(firstAnswerRecorder.audioBlob);
      setFirstTranscript(data.transcriptText || "");
      setFirstAudioUrl(data.audioUrl || "");
    } finally {
      setTranscribingFirst(false);
    }
  }

  async function handleSubmitFirstTranscript() {
    await onSubmitAudioAnswer(question.id, {
      transcriptText: firstTranscript,
      audioUrl: firstAudioUrl,
    });

    firstAnswerRecorder.resetRecording();
    setFirstTranscript("");
    setFirstAudioUrl("");
  }

  function getAudioSrc(audioUrl) {
    if (!audioUrl) return "";

    if (audioUrl.startsWith("http://") || audioUrl.startsWith("https://")) {
      return audioUrl;
    }

    return `${API_BASE_URL}${audioUrl.startsWith("/") ? audioUrl : `/${audioUrl}`}`;
  }

  return (
    <section className="rounded-xl bg-[#0f172a] border border-white/10 p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Question {question.questionOrder}</Badge>

            {question.questionType === "FOLLOW_UP" ? (
              <Badge variant="warning">Follow-up</Badge>
            ) : null}

            {isAnswered ? (
              <Badge variant="success">Answered</Badge>
            ) : (
              <Badge variant="warning">Pending</Badge>
            )}
          </div>

          <h2 className="mt-4 text-lg font-semibold leading-7 text-white">
            {question.questionText}
          </h2>
        </div>
      </div>

      {!isAnswered ? (
        <div className="mt-6 space-y-4">
          <div className="flex gap-2">
            <ModeButton
              active={answerMode === "TEXT"}
              onClick={() => setAnswerMode("TEXT")}
            >
              Type Answer
            </ModeButton>

            <ModeButton
              active={answerMode === "AUDIO"}
              onClick={() => setAnswerMode("AUDIO")}
            >
              Record Answer
            </ModeButton>
          </div>

          {answerMode === "AUDIO" ? (
            <AudioRecorder
              recorder={firstAnswerRecorder}
              onTranscribe={handleTranscribeFirstAnswer}
              transcribing={transcribingFirst}
              transcript={firstTranscript}
              onTranscriptChange={setFirstTranscript}
              onSubmitTranscript={handleSubmitFirstTranscript}
              submitting={submitting}
              audioUrl={firstAudioUrl}
            />
          ) : (
            <div className="space-y-4">
              <Textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={6}
                placeholder="Write your answer..."
              />

              <div className="max-w-xs">
                <Button onClick={handleSubmitText} loading={submitting}>
                  Submit Answer
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <SectionBlock title="Your Answer">
            {submittedAnswer.answerMode === "AUDIO" ? (
              <Badge variant="primary">Recorded Answer</Badge>
            ) : (
              <Badge variant="default">Typed Answer</Badge>
            )}

            {submittedAnswer.audioUrl ? (
              <audio
                controls
                src={getAudioSrc(submittedAnswer.audioUrl)}
                className="mt-3 w-full"
              />
            ) : null}

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-textSecondary">
              {submittedAnswer.transcriptText || submittedAnswer.answerText}
            </p>
          </SectionBlock>

          <SectionBlock title="Evaluation">
            <EvaluationPanel evaluation={submittedAnswer.evaluation} />
          </SectionBlock>

          <RetryPanel
            mode={retryMode}
            onModeChange={setRetryMode}
            textValue={improvedText}
            onTextChange={setImprovedText}
            onTextSubmit={handleSubmitTextRetry}
            textLoading={improving}
            recorder={retryRecorder}
            onTranscribe={handleTranscribeRetryAnswer}
            transcribing={transcribingRetry}
            transcript={retryTranscript}
            onTranscriptChange={setRetryTranscript}
            onSubmitTranscript={handleSubmitRetryTranscript}
            submitting={improving}
            audioUrl={retryAudioUrl}
          />

          <ImprovementComparison comparison={comparison} />

          <AttemptHistory attempts={attempts} />
        </div>
      )}
    </section>
  );
}

function ModeButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
        active
          ? "bg-primary text-white"
          : "bg-[#020617] text-gray-400 border border-white/10 hover:bg-[#111827]"
      }`}
    >
      {children}
    </button>
  );
}

function SectionBlock({ title, children }) {
  return (
    <div className="rounded-xl bg-[#020617] border border-white/10 p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}
