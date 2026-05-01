import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import SectionCard from "../../components/ui/SectionCard";
import ProgressBar from "../../components/ui/ProgressBar";
import {
  analyzeSkillGap,
  getLatestSkillGapReport,
} from "../../services/skillGapService";

export default function SkillGapPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLatestReport();
  }, []);

  async function loadLatestReport() {
    try {
      setLoading(true);
      setError("");
      const data = await getLatestSkillGapReport();
      setReport(data);
    } catch {
      setReport(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyze() {
    try {
      setAnalyzing(true);
      setError("");
      const data = await analyzeSkillGap({});
      setReport(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to analyze skill gap. Please save resume and job description first.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Skill Gap Analysis</h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Compare your resume with the target job description and get
                practical improvement areas.
              </p>
            </div>

            <Button
              className="w-full border border-white/30 bg-blue-500/20 text-white hover:bg-blue-500/30 backdrop-blur-md lg:w-auto"
              onClick={handleAnalyze}
              loading={analyzing}
            >
              Run Analysis
            </Button>
          </div>
        </section>

        {error ? (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              report
                ? "bg-warning/10 text-yellow-400"
                : "bg-danger/10 text-red-400"
            }`}
          >
            {report
              ? `Latest analysis could not be refreshed. Showing previous saved result. ${error}`
              : error}
          </div>
        ) : null}

        {loading ? (
          <SectionCard title="Skill Gap">
            <p className="text-sm text-gray-400">
              Loading latest report...
            </p>
          </SectionCard>
        ) : report ? (
          <>
            <SectionCard
              title="Overall Fit"
              subtitle="How well your resume matches the job description"
              action={
                <Link
                  to="/interviews"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-500"
                >
                  Start Interview
                </Link>
              }
            >
              <ProgressBar value={report.fitScore || 0} />
              <p className="mt-4 text-sm leading-6 text-gray-400">
                {report.summary}
              </p>
            </SectionCard>

            <section className="grid gap-6 lg:grid-cols-2">
              <SkillListCard
                title="Matched Skills"
                items={report.matchedSkills}
                variant="success"
                emptyText="No matched skills found."
              />

              <SkillListCard
                title="Missing Skills"
                items={report.missingSkills}
                variant="danger"
                emptyText="No missing skills found."
              />
            </section>

            <SectionCard
              title="Recommended Topics"
              subtitle="Study these before starting your next mock interview"
            >
              {report.recommendedTopics?.length ? (
                <div className="flex flex-wrap gap-2">
                  {report.recommendedTopics.map((item, index) => (
                    <Badge key={`${item}-${index}`} variant="primary">
                      {item}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No recommended topics yet.
                </p>
              )}
            </SectionCard>
          </>
        ) : (
          <SectionCard title="No report found">
            <p className="text-sm text-gray-400">
              Save your resume and job description, then run skill-gap analysis.
            </p>
            <div className="mt-4 max-w-xs">
              <Button onClick={handleAnalyze} loading={analyzing}>
                Run First Analysis
              </Button>
            </div>
          </SectionCard>
        )}
      </div>
    </MainLayout>
  );
}

function SkillListCard({ title, items = [], variant, emptyText }) {
  return (
    <SectionCard title={title}>
      {items?.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge key={`${title}-${item}-${index}`} variant={variant}>
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">{emptyText}</p>
      )}
    </SectionCard>
  );
}
