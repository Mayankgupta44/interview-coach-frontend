import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Badge from "../../components/ui/Badge";
import SectionCard from "../../components/ui/SectionCard";
import QuestionReviewCard from "../../components/interview/QuestionReviewCard";
import { getInterviewSessionById } from "../../services/interviewService";
import {
  getAnswersBySessionId,
  submitAnswer,
  submitAudioAnswer,
  submitAudioTranscriptAnswer,
} from "../../services/answerService";
import {
  getAttempts,
  getLatestAttemptComparison,
  submitAttempt,
  submitAudioAttempt,
} from "../../services/attemptService";

export default function InterviewSessionDetailPage() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submittingMap, setSubmittingMap] = useState({});

  const [attemptsMap, setAttemptsMap] = useState({});
  const [comparisonMap, setComparisonMap] = useState({});
  const [improvingMap, setImprovingMap] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSessionData();
  }, [sessionId]);

  useEffect(() => {
    if (session?.questions?.length) {
      session.questions.forEach((question) => {
        loadAttemptsForQuestion(question.id);
      });
    }
  }, [session]);

  async function loadSessionData() {
    try {
      setLoading(true);
      setError("");

      const [sessionData, answersData] = await Promise.all([
        getInterviewSessionById(sessionId),
        getAnswersBySessionId(sessionId).catch(() => []),
      ]);

      setSession(sessionData);
      setAnswers(answersData || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load interview session.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadAttemptsForQuestion(questionId) {
    try {
      const attempts = await getAttempts(sessionId, questionId);
      setAttemptsMap((prev) => ({ ...prev, [questionId]: attempts || [] }));

      if (attempts?.length) {
        const comparison = await getLatestAttemptComparison(
          sessionId,
          questionId,
        );

        setComparisonMap((prev) => ({ ...prev, [questionId]: comparison }));
      }
    } catch {
      setAttemptsMap((prev) => ({ ...prev, [questionId]: [] }));
    }
  }

  const answerMap = useMemo(() => {
    const map = {};

    for (const item of answers) {
      map[item.questionId] = item;
    }

    return map;
  }, [answers]);

  const completedCount = answers.length;
  const totalQuestions = session?.questions?.length || 0;

  async function handleSubmitTextAnswer(questionId, answerText) {
    if (!answerText?.trim()) {
      setError("Please write an answer before submitting.");
      return;
    }

    try {
      setError("");
      setSubmittingMap((prev) => ({ ...prev, [questionId]: true }));

      const savedAnswer = await submitAnswer(sessionId, questionId, {
        answerText: answerText.trim(),
      });

      setAnswers((prev) => {
        const filtered = prev.filter((item) => item.questionId !== questionId);
        return [...filtered, savedAnswer].sort(
          (a, b) => a.questionOrder - b.questionOrder,
        );
      });

      await loadAttemptsForQuestion(questionId);

      const updatedSession = await getInterviewSessionById(sessionId);
      setSession(updatedSession);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit answer.");
    } finally {
      setSubmittingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  async function handleSubmitAudioAnswer(questionId, payload) {
    if (!payload?.transcriptText?.trim()) {
      setError("Transcript is required before submitting.");
      return;
    }

    try {
      setError("");
      setSubmittingMap((prev) => ({ ...prev, [questionId]: true }));

      const savedAnswer = await submitAudioTranscriptAnswer(
        sessionId,
        questionId,
        {
          transcriptText: payload.transcriptText.trim(),
          audioUrl: payload.audioUrl,
        },
      );

      setAnswers((prev) => {
        const filtered = prev.filter((item) => item.questionId !== questionId);
        return [...filtered, savedAnswer].sort(
          (a, b) => a.questionOrder - b.questionOrder,
        );
      });

      await loadAttemptsForQuestion(questionId);

      const updatedSession = await getInterviewSessionById(sessionId);
      setSession(updatedSession);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Audio answer submission failed.",
      );
    } finally {
      setSubmittingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  async function handleSubmitTextAttempt(questionId, answerText) {
    if (!answerText?.trim()) {
      setError("Please write an improved answer before submitting.");
      return;
    }

    try {
      setError("");
      setImprovingMap((prev) => ({ ...prev, [questionId]: true }));

      await submitAttempt(sessionId, questionId, {
        answerText: answerText.trim(),
      });

      await loadAttemptsForQuestion(questionId);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to improve answer.");
    } finally {
      setImprovingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  async function handleSubmitAudioAttempt(questionId, payload) {
    if (!payload?.transcriptText?.trim()) {
      setError("Transcript is required before submitting improved answer.");
      return;
    }

    try {
      setError("");
      setImprovingMap((prev) => ({ ...prev, [questionId]: true }));

      await submitAudioAttempt(sessionId, questionId, {
        transcriptText: payload.transcriptText.trim(),
        audioUrl: payload.audioUrl,
      });

      await loadAttemptsForQuestion(questionId);
    } catch (err) {
      setError(err?.response?.data?.message || "Audio re-evaluation failed.");
    } finally {
      setImprovingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <SectionCard title="Interview Session">
          <p className="text-sm text-gray-400">Loading session...</p>
        </SectionCard>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl bg-[#0f172a] border border-white/10 p-6 text-white shadow-soft">
          <Link
            to="/interviews"
            className="text-sm font-medium text-blue-100 hover:text-white"
          >
            ← Back to sessions
          </Link>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {session?.targetRole} Interview
              </h1>

              <p className="mt-2 text-sm text-blue-100">
                {session?.interviewType} • {session?.difficultyLevel} •{" "}
                {session?.totalQuestions} questions
              </p>
            </div>

            <Badge
              variant={session?.status === "COMPLETED" ? "success" : "warning"}
            >
              {session?.status}
            </Badge>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <ProgressCard label="Answered" value={completedCount} />
          <ProgressCard
            label="Remaining"
            value={Math.max(totalQuestions - completedCount, 0)}
          />
          <ProgressCard label="Total Questions" value={totalQuestions} />
        </section>

        {error ? (
          <div className="rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        <div className="space-y-6">
          {session?.questions?.map((question) => (
            <QuestionReviewCard
              key={question.id}
              question={question}
              submittedAnswer={answerMap[question.id]}
              attempts={attemptsMap[question.id] || []}
              comparison={comparisonMap[question.id]}
              submitting={submittingMap[question.id]}
              improving={improvingMap[question.id]}
              onSubmitTextAnswer={handleSubmitTextAnswer}
              onSubmitAudioAnswer={handleSubmitAudioAnswer}
              onSubmitTextAttempt={handleSubmitTextAttempt}
              onSubmitAudioAttempt={handleSubmitAudioAttempt}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

function ProgressCard({ label, value }) {
  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}
