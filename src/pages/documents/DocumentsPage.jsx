import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import SectionCard from "../../components/ui/SectionCard";
import ResumeUploadCard from "../../components/documents/ResumeUploadCard";
import {
  getLatestJobDescription,
  getLatestResume,
  saveJobDescription,
  saveResume,
} from "../../services/documentService";
import {
  getLatestUploadedResume,
  uploadResumeFile,
} from "../../services/resumeUploadService";

export default function DocumentsPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadInfo, setUploadInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [savingResume, setSavingResume] = useState(false);
  const [savingJd, setSavingJd] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [resumeMessage, setResumeMessage] = useState("");
  const [jdMessage, setJdMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);
      setError("");

      const [resumeResult, jdResult, uploadedResumeResult] =
        await Promise.allSettled([
          getLatestResume(),
          getLatestJobDescription(),
          getLatestUploadedResume(),
        ]);

      if (resumeResult.status === "fulfilled") {
        setResumeText(resumeResult.value.resumeText || "");
      }

      if (jdResult.status === "fulfilled") {
        setJobDescriptionText(jdResult.value.jobDescriptionText || "");
      }

      if (uploadedResumeResult.status === "fulfilled") {
        setUploadInfo(uploadedResumeResult.value);

        if (
          uploadedResumeResult.value.extractionSuccess &&
          uploadedResumeResult.value.extractedText &&
          resumeResult.status !== "fulfilled"
        ) {
          setResumeText(uploadedResumeResult.value.extractedText);
        }
      }
    } catch {
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadResume() {
    if (!resumeFile) return;

    try {
      setUploadingResume(true);
      setError("");
      setResumeMessage("");

      const data = await uploadResumeFile(resumeFile);
      setUploadInfo(data);

      if (data.extractionSuccess && data.extractedText) {
        setResumeText(data.extractedText);
        setResumeMessage(
          "Resume uploaded and extracted. Review the text and save it.",
        );
      } else {
        setResumeMessage(
          "Resume uploaded, but extraction failed. You can paste text manually.",
        );
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to upload resume.");
    } finally {
      setUploadingResume(false);
    }
  }

  async function handleSaveResume(event) {
    event.preventDefault();
    setResumeMessage("");
    setError("");

    try {
      setSavingResume(true);
      await saveResume({ resumeText });
      setResumeMessage("Resume saved successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save resume.");
    } finally {
      setSavingResume(false);
    }
  }

  async function handleSaveJobDescription(event) {
    event.preventDefault();
    setJdMessage("");
    setError("");

    try {
      setSavingJd(true);
      await saveJobDescription({ jobDescriptionText });
      setJdMessage("Job description saved successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save job description.",
      );
    } finally {
      setSavingJd(false);
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="rounded-xl bg-[#0f172a] border border-white/10 p-6 text-white shadow-sm">
          <h1 className="text-2xl font-bold">Resume & Job Description</h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Upload your resume, extract text, edit it if needed, and save the
            target job description for analysis.
          </p>
        </section>

        {error ? (
          <div className="rounded-xl px-4 py-3 text-sm bg-red-500/10 text-red-400 border border-red-500/20">
            {error}
          </div>
        ) : null}

        {loading ? (
          <SectionCard title="Documents">
            <p className="text-sm text-gray-400">Loading documents...</p>
          </SectionCard>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2 items-stretch">
            <SectionCard
              title="Resume"
              subtitle="Upload PDF or edit extracted resume text manually"
            >
              <form
                onSubmit={handleSaveResume}
                className="space-y-5 flex flex-col flex-1"
              >
                <ResumeUploadCard
                  resumeFile={resumeFile}
                  setResumeFile={setResumeFile}
                  onUpload={handleUploadResume}
                  uploading={uploadingResume}
                  uploadInfo={uploadInfo}
                />

                <Textarea
                  label="Resume Text"
                  value={resumeText}
                  onChange={(e) => {
                    setResumeText(e.target.value);
                    setResumeMessage("");
                  }}
                  className="flex-1 min-h-[250px]"
                  placeholder="Paste or edit extracted resume text..."
                />

                {resumeText ? (
                  <div className="max-h-40 overflow-y-auto rounded-xl bg-[#020617] border border-white/10 p-4">
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Preview
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-300">
                      {resumeText}
                    </p>
                  </div>
                ) : null}

                {resumeMessage ? (
                  <p className="text-sm text-green-400">{resumeMessage}</p>
                ) : null}

                <div className="mt-auto">
                  <Button type="submit" loading={savingResume}>
                    Save Resume Text
                  </Button>
                </div>
              </form>
            </SectionCard>

            <SectionCard
              title="Job Description"
              subtitle="Paste the job description for better skill-gap analysis"
            >
              <form
                onSubmit={handleSaveJobDescription}
                className="space-y-5 flex flex-col flex-1"
              >
                <Textarea
                  label="Job Description Text"
                  value={jobDescriptionText}
                  onChange={(e) => {
                    setJobDescriptionText(e.target.value);
                    setJdMessage("");
                  }}
                  className="flex-1 min-h-[350px]"
                  placeholder="Paste target job description here..."
                />

                {jdMessage ? (
                  <p className="text-sm text-green-400">{jdMessage}</p>
                ) : null}

                <div className="mt-auto">
                  <Button type="submit" loading={savingJd}>
                    Save Job Description
                  </Button>
                </div>
              </form>
            </SectionCard>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
