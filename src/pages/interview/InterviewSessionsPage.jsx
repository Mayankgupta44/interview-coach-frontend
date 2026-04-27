import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/common/EmptyState";
import {
  createInterviewSession,
  getMyInterviewSessions,
} from "../../services/interviewService";

const interviewTypeOptions = [
  { label: "Technical", value: "TECHNICAL" },
  { label: "HR", value: "HR" },
  { label: "Behavioral", value: "BEHAVIORAL" },
  { label: "Mixed", value: "MIXED" },
];

export default function InterviewSessionsPage() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    targetRole: "Java Developer",
    interviewType: "TECHNICAL",
    questionCount: 5,
  });

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    try {
      setLoading(true);
      setError("");
      const data = await getMyInterviewSessions();
      setSessions(data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load interview sessions."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "questionCount" ? Number(value) : value,
    }));
  }

  async function handleCreateSession(event) {
    event.preventDefault();
    setError("");

    try {
      setCreating(true);
      const data = await createInterviewSession(formData);
      navigate(`/interviews/${data.id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create interview session."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-card p-6 shadow-soft">
          <h1 className="text-2xl font-bold text-textPrimary">Mock Interviews</h1>
          <p className="mt-2 text-sm text-textSecondary">
            Start a new session and practice AI-generated questions for your
            target role.
          </p>
        </section>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <SectionCard
          title="Start New Session"
          subtitle="Create a role-based mock interview in a few clicks"
        >
          <form onSubmit={handleCreateSession} className="grid gap-4 md:grid-cols-2">
            <Input
              label="Target role"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              placeholder="Example: Java Developer"
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Interview type
              </label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-200"
              >
                {interviewTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of questions
              </label>
              <select
                name="questionCount"
                value={formData.questionCount}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-200"
              >
                {[3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 max-w-xs">
              <Button type="submit" disabled={creating}>
                {creating ? "Creating session..." : "Start Interview"}
              </Button>
            </div>
          </form>
        </SectionCard>

        <SectionCard
          title="Previous Sessions"
          subtitle="Resume reviewing completed or in-progress interviews"
        >
          {loading ? (
            <p className="text-sm text-textSecondary">Loading sessions...</p>
          ) : sessions.length ? (
            <div className="space-y-3">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => navigate(`/interviews/${session.id}`)}
                  className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:bg-gray-50"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-textPrimary">
                        {session.targetRole}
                      </h3>
                      <p className="mt-1 text-sm text-textSecondary">
                        {session.interviewType} • {session.totalQuestions} questions
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Created: {formatDate(session.createdAt)}
                      </p>
                    </div>

                    <Badge
                      variant={
                        session.status === "COMPLETED" ? "success" : "warning"
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No sessions yet"
              description="Create your first interview session to start practicing."
            />
          )}
        </SectionCard>
      </div>
    </MainLayout>
  );
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}