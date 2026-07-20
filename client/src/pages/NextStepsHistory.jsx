import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  FileText,
  LoaderCircle,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getRoadmapAnalysis, getRoadmapHistory } from "../api/nextStepsApi";
import RoadmapModal from "../components/next-steps/RoadmapModal";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to load roadmap history.";

const stageColors = {
  Foundation: "bg-blue-50 text-blue-700",
  "Skill Building": "bg-violet-50 text-violet-700",
  "Interview Preparation": "bg-amber-50 text-amber-700",
  "Application Ready": "bg-emerald-50 text-emerald-700",
};

function NextStepsHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const response = await getRoadmapHistory();
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

  const openRoadmap = async (roadmapId) => {
    try {
      setIsOpening(true);
      const response = await getRoadmapAnalysis(roadmapId);
      setSelectedRoadmap(response.data);
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setIsOpening(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-60 rounded-lg bg-slate-200" />
        <div className="h-48 rounded-2xl bg-slate-200" />
        <div className="h-48 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="font-bold text-rose-700">
          Could not load roadmap history
        </h2>
        <p className="mt-1 text-sm text-rose-600">{error}</p>
        <button
          onClick={loadHistory}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
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
          onClick={() => navigate("/next-steps")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to AI Next Steps
        </button>

        {!history.length ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Target size={25} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No AI roadmaps generated yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Generate your first personalized roadmap to receive
              company-specific preparation guidance.
            </p>
            <button
              onClick={() => navigate("/next-steps")}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Go to AI Next Steps
            </button>
          </section>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {history.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex gap-3">
                  <div className="shrink-0 self-start rounded-xl bg-violet-50 p-3 text-violet-600">
                    <Target size={21} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-slate-900">
                      {item.companyName}
                    </h2>

                    {item.resume ? (
                      <a
                        href={item.resume.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        <FileText size={15} />
                        <span className="max-w-52 truncate">
                          {item.resume.originalName}
                        </span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">
                        No Resume Used
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                        {item.placementReadiness}% Readiness
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${stageColors[item.currentStage] || "bg-slate-100 text-slate-600"}`}
                      >
                        {item.currentStage}
                      </span>
                    </div>

                    <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={15} />
                      {new Date(item.analyzedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isOpening}
                  onClick={() => openRoadmap(item._id)}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-60"
                >
                  {isOpening ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      View Next Steps
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <RoadmapModal
        roadmap={selectedRoadmap}
        onClose={() => setSelectedRoadmap(null)}
      />
    </>
  );
}

export default NextStepsHistory;
