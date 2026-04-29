import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionCard from "../../components/ui/SectionCard";
import Textarea from "../../components/ui/Textarea";
import EvaluationPanel from "../../components/interview/EvaluationPanel";
import RetryPanel from "../../components/interview/RetryPanel";
import AttemptHistory from "../../components/interview/AttemptHistory";
import ImprovementComparison from "../../components/interview/ImprovementComparison";
import { getInterviewSessionById } from "../../services/interviewService";
import {
  getAnswersBySessionId,
  submitAnswer,
} from "../../services/answerService";
import {
  getAttempts,
  getLatestAttemptComparison,
  submitAttempt,
} from "../../services/attemptService";

export default function InterviewSessionDetailPage() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});
  const [submittingMap, setSubmittingMap] = useState({});

  const [attemptsMap, setAttemptsMap] = useState({});
  const [comparisonMap, setComparisonMap] = useState({});
  const [improveInputs, setImproveInputs] = useState({});
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
        err?.response?.data?.message || "Failed to load interview session."
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
          questionId
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

  async function handleSubmitAnswer(questionId) {
    const answerText = answerInputs[questionId]?.trim();

    if (!answerText) {
      setError("Please write an answer before submitting.");
      return;
    }

    try {
      setError("");
      setSubmittingMap((prev) => ({ ...prev, [questionId]: true }));

      const savedAnswer = await submitAnswer(sessionId, questionId, {
        answerText,
      });

      setAnswers((prev) => {
        const filtered = prev.filter((item) => item.questionId !== questionId);
        return [...filtered, savedAnswer].sort(
          (a, b) => a.questionOrder - b.questionOrder
        );
      });

      setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
      await loadAttemptsForQuestion(questionId);

      const updatedSession = await getInterviewSessionById(sessionId);
      setSession(updatedSession);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit answer.");
    } finally {
      setSubmittingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  async function handleImproveAnswer(questionId) {
    const answerText = improveInputs[questionId]?.trim();

    if (!answerText) {
      setError("Please write an improved answer before submitting.");
      return;
    }

    try {
      setError("");
      setImprovingMap((prev) => ({ ...prev, [questionId]: true }));

      await submitAttempt(sessionId, questionId, { answerText });

      setImproveInputs((prev) => ({ ...prev, [questionId]: "" }));
      await loadAttemptsForQuestion(questionId);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to improve answer.");
    } finally {
      setImprovingMap((prev) => ({ ...prev, [questionId]: false }));
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <SectionCard title="Interview Session">
          <p className="text-sm text-textSecondary">Loading session...</p>
        </SectionCard>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl bg-gradient-to-r from-primary to-secondary p-6 text-white shadow-soft">
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
                {session?.interviewType} • {session?.totalQuestions} questions
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
          <div className="rounded-xl bg-danger/10 text-danger px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}

        <div className="space-y-6">
          {session?.questions?.map((question) => {
            const submittedAnswer = answerMap[question.id];
            const isAnswered = Boolean(submittedAnswer);
            const attempts = attemptsMap[question.id] || [];
            const comparison = comparisonMap[question.id];

            return (
              <section
                key={question.id}
                className="rounded-xl bg-card p-6 shadow-soft"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary">
                        Question {question.questionOrder}
                      </Badge>
                      {question.questionType === "FOLLOW_UP" ? (
                        <Badge variant="warning">Follow-up</Badge>
                      ) : null}
                      {isAnswered ? (
                        <Badge variant="success">Answered</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </div>

                    <h2 className="mt-4 text-lg font-semibold leading-7 text-textPrimary">
                      {question.questionText}
                    </h2>
                  </div>
                </div>

                {!isAnswered ? (
                  <div className="mt-6 space-y-4">
                    <Textarea
                      value={answerInputs[question.id] || ""}
                      onChange={(e) =>
                        setAnswerInputs((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                      rows={6}
                      placeholder="Write your answer here..."
                    />

                    <div className="max-w-xs">
                      <Button
                        onClick={() => handleSubmitAnswer(question.id)}
                        loading={submittingMap[question.id]}
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-6">
                    <SectionBlock title="Your Answer">
                      <p className="whitespace-pre-line text-sm leading-6 text-textSecondary">
                        {submittedAnswer.answerText}
                      </p>
                    </SectionBlock>

                    <SectionBlock title="Evaluation">
                      <EvaluationPanel evaluation={submittedAnswer.evaluation} />
                    </SectionBlock>

                    <RetryPanel
                      value={improveInputs[question.id] || ""}
                      onChange={(value) =>
                        setImproveInputs((prev) => ({
                          ...prev,
                          [question.id]: value,
                        }))
                      }
                      onSubmit={() => handleImproveAnswer(question.id)}
                      loading={improvingMap[question.id]}
                    />

                    <ImprovementComparison comparison={comparison} />

                    <AttemptHistory attempts={attempts} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

function ProgressCard({ label, value }) {
  return (
    <div className="rounded-xl bg-card p-5 shadow-soft">
      <p className="text-sm text-textSecondary">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-textPrimary">{value}</h3>
    </div>
  );
}

function SectionBlock({ title, children }) {
  return (
    <div className="rounded-xl bg-appBg p-5">
      <h3 className="mb-4 text-sm font-semibold text-textPrimary">{title}</h3>
      {children}
    </div>
  );
}