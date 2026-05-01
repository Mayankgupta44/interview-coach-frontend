import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  Target,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboardService";
import { generateRecommendations } from "../../services/recommendationService";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import EmptyState from "../../components/common/EmptyState";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateRecommendations() {
    try {
      setGenerating(true);
      setError("");
      await generateRecommendations();
      await loadDashboard();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to generate recommendations.",
      );
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="rounded-xl border border-white/10 bg-[#0f172a] p-6">
          <p className="text-sm text-gray-400">Loading dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl bg-[#0f172a] border border-white/10 p-6 text-white shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Welcome back</p>
              <h1 className="mt-2 text-2xl font-bold">
                {user?.fullName || "Candidate"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Track your interview progress, weak areas, score trends, and
                next preparation actions from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/interviews"
                className="
                rounded-xl 
                bg-gradient-to-r from-blue-600 to-blue-500 
                px-4 py-3 
                text-sm font-medium text-white 
                transition-all duration-200 
                hover:scale-105 
                hover:shadow-blue-500/30
                "
              >
                Start Interview
              </Link>
              <Link
                to="/skill-gap"
                className="
                rounded-xl 
                border border-white/20 
                px-4 py-3 
                text-sm font-medium text-white 
                transition-all duration-200 
                hover:bg-white/10 
                hover:border-blue-400
                "
              >
                Run Skill Gap
              </Link>
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Total Sessions"
            value={dashboard?.totalSessions ?? 0}
            icon={ClipboardList}
            helper="All mock interview sessions"
          />
          <DashboardStatCard
            title="Completed"
            value={dashboard?.completedSessions ?? 0}
            icon={CheckCircle2}
            helper="Fully completed sessions"
          />
          <DashboardStatCard
            title="Answers"
            value={dashboard?.totalAnswersSubmitted ?? 0}
            icon={MessageSquareText}
            helper="Answers submitted"
          />
          <DashboardStatCard
            title="Avg Score"
            value={dashboard?.averageOverallScore ?? 0}
            icon={Target}
            helper="Overall performance"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Score Trend"
            subtitle="Average score over recent practice"
          >
            {dashboard?.scoreTrend?.length ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dashboard.scoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#1E3A8A"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                title="No score trend yet"
                description="Complete interview attempts to generate score trend data."
              />
            )}
          </ChartCard>

          <ChartCard
            title="Top Weak Areas"
            subtitle="Most repeated weak points from evaluations"
          >
            {dashboard?.weakAreaStats?.length ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dashboard.weakAreaStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

                  <XAxis
                    dataKey="topic"
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    tickFormatter={(value) =>
                      value.length > 14 ? value.slice(0, 14) + "..." : value
                    }
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />

                  <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                title="No weak area data"
                description="Your weak areas will appear after evaluations."
              />
            )}
          </ChartCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Recommendations"
            subtitle="Priority actions generated from your evaluations"
          >
            <div className="mb-4">
              <Button
                className="max-w-xs"
                onClick={handleGenerateRecommendations}
                loading={generating}
              >
                Generate Recommendations
              </Button>
            </div>

            {dashboard?.recommendations?.length ? (
              <div className="space-y-3">
                {dashboard.recommendations.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="
                    rounded-xl 
                    border border-white/10 
                    bg-[#0f172a] 
                    p-4 
                    transition-all duration-200 
                    hover:bg-white/5 
                    hover:shadow-blue-500/20
                    "
                  >
                    <Badge variant="primary">{item.type}</Badge>
                    <h3 className="mt-3 text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No recommendations yet"
                description="Generate recommendations after completing evaluations."
              />
            )}
          </ChartCard>

          <ChartCard
            title="Recent Sessions"
            subtitle="Click any session to review answers and evaluations"
          >
            {dashboard?.recentScoreHistory?.length ? (
              <div className="overflow-hidden rounded-xl bg-[#0f172a] border border-white/10">
                <table className="min-w-full text-sm">
                  
                  <thead className="bg-[#020617] text-left text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                      <th className="px-4 py-3 font-medium">Questions</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboard.recentScoreHistory.map((item) => (
                      <tr
                        key={item.sessionId}
                        onClick={() => navigate(`/interviews/${item.sessionId}`)}
                        className="cursor-pointer transition hover:bg-white/5"
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {item.targetRole}
                        </td>

                        <td className="px-4 py-3">
                          <ScorePill score={item.averageScore} />
                        </td>

                        <td className="px-4 py-3 text-gray-400">
                          {item.totalQuestions}
                        </td>

                        <td className="px-4 py-3 text-gray-400">
                          {formatDate(item.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No sessions yet"
                description="Start your first mock interview to see history."
                buttonText="Start Interview"
                buttonLink="/interviews"
              />
            )}
          </ChartCard>
        </section>
      </div>
    </MainLayout>
  );
}

function ScorePill({ score = 0 }) {
  const variant = score >= 85 ? "success" : score >= 70 ? "warning" : "danger";

  return <Badge variant={variant}>{score}</Badge>;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}
