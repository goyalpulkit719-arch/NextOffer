import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { setUser } from "../app/authSlice";
import { uploadResume } from "../api/profileApi";
import { analyzeResume, getCurrentResume } from "../api/resumeApi";

import ResumeEmptyState from "../components/resume/ResumeEmptyState";
import ResumeReadyCard from "../components/resume/ResumeReadyCard";
import ResumeHeader from "../components/resume/ResumeHeader";
import OverallScores from "../components/resume/OverallScores";
import SectionScores from "../components/resume/SectionScores";
import ResumeChecklist from "../components/resume/ResumeChecklist";
import FeedbackCard from "../components/resume/FeedbackCard";
import MissingKeywords from "../components/resume/MissingKeywords";
import PriorityFixes from "../components/resume/PriorityFixes";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

function ResumeAnalyzer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const resumeInputRef = useRef(null);

  const [pageState, setPageState] = useState("loading");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const loadCurrentResume = useCallback(async () => {
    if (!user.hasResume) {
      setResume(null);
      setPageState("empty");
      return;
    }

    try {
      setError("");
      setPageState("loading");

      const response = await getCurrentResume();
      const currentResume = response.data;

      if (!currentResume) {
        setResume(null);
        setPageState("empty");
        return;
      }

      setResume(currentResume);
      setPageState(currentResume.isAnalyzed ? "analyzed" : "ready");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setPageState("error");
    }
  }, [user.hasResume]);

  useEffect(() => {
    loadCurrentResume();
  }, [loadCurrentResume]);

  const handleUploadResume = async (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);

      dispatch(
        setUser({
          ...user,
          hasResume: true,
        })
      );

      toast.success("Resume uploaded successfully.");
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setIsUploading(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);

      const response = await analyzeResume();

      setResume(response.data);
      setPageState("analyzed");

      toast.success(response.message);
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (pageState === "loading") {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-52 rounded-2xl bg-slate-200" />
          <div className="h-52 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-72 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (pageState === "error") {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="font-bold text-rose-700">Could not load your resume</h2>
        <p className="mt-1 text-sm text-rose-600">{error}</p>

        <button
          type="button"
          onClick={loadCurrentResume}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-6 pb-10"
    >
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => handleUploadResume(event.target.files?.[0])}
      />

      {pageState === "empty" && (
        <ResumeEmptyState
          onUpload={() => resumeInputRef.current?.click()}
        />
      )}

      {pageState === "ready" && (
        <ResumeReadyCard
          resume={resume}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}

      {pageState === "analyzed" && (
        <>
          <ResumeHeader resume={resume} />

          <OverallScores analysis={resume.analysis} />

          <SectionScores sectionScores={resume.analysis?.sectionScores} />

          <ResumeChecklist
            checks={resume.analysis?.sectionScores?.resumeStructure?.checks}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <FeedbackCard
              title="Strengths"
              icon="💪"
              items={resume.analysis?.strengths}
              color="border-emerald-100 bg-emerald-50 text-emerald-800"
            />

            <FeedbackCard
              title="Improvements"
              icon="📈"
              items={resume.analysis?.improvements}
              color="border-orange-100 bg-orange-50 text-orange-800"
            />
          </div>

          <MissingKeywords keywords={resume.analysis?.missingKeywords} />

          <PriorityFixes fixes={resume.analysis?.priorityFixes} />
        </>
      )}
    </motion.div>
  );
}

export default ResumeAnalyzer;