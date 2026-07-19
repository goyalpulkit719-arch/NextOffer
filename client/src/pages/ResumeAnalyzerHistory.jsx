import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getResumeAnalysis,
  getResumeHistory,
} from "../api/resumeApi";
import ResumeAnalysisModal from "../components/resume/ResumeAnalysisModal";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to load resume history.";

function ResumeAnalyzerHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpeningAnalysis, setIsOpeningAnalysis] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);

      const response = await getResumeHistory();

      setHistory(response.data || []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleViewAnalysis = async (resume) => {
    try {
      setIsOpeningAnalysis(true);

      const response = await getResumeAnalysis(resume._id);

      setSelectedResume({
        ...response.data,
        fileUrl: resume.fileUrl,
      });
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setIsOpeningAnalysis(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-52 rounded-lg bg-slate-200" />
        <div className="h-44 rounded-2xl bg-slate-200" />
        <div className="h-44 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="font-bold text-rose-700">
          Could not load resume history
        </h2>

        <p className="mt-1 text-sm text-rose-600">{error}</p>

        <button
          type="button"
          onClick={loadHistory}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-5 pb-10">
        <button
          type="button"
          onClick={() => navigate("/resume-analyzer")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Go to Resume Analyzer
        </button>

        {!history.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FileText size={25} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No resume history yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your previous resume versions will appear here after you upload
              and analyze multiple resumes.
            </p>
          </motion.section>
        ) : (
          <div className="space-y-4">
            {history.map((resume, index) => (
              <motion.article
                key={resume._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <FileText size={20} className="shrink-0 text-rose-500" />

                      <a
                        href={resume.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-semibold text-blue-600 transition hover:underline"
                      >
                        {resume.originalName}
                      </a>

                      {resume.isCurrent && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                      Analyzed on{" "}
                      <span className="font-medium text-slate-700">
                        {new Date(resume.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-blue-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          Placement Readiness
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-900">
                          {resume.analysis?.placementReadiness?.score || 0}
                        </p>
                        <p className="text-sm font-medium text-blue-700">
                          {resume.analysis?.placementReadiness?.level || "Not rated"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-violet-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                          ATS Score
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-900">
                          {resume.analysis?.ats?.score || 0}
                        </p>
                        <p className="text-sm font-medium text-violet-700">
                          AI compatibility score
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isOpeningAnalysis}
                    onClick={() => handleViewAnalysis(resume)}
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isOpeningAnalysis ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Opening...
                      </>
                    ) : (
                      <>
                        View Analysis
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <ResumeAnalysisModal
        resume={selectedResume}
        onClose={() => setSelectedResume(null)}
      />
    </>
  );
}

export default ResumeAnalyzerHistory;