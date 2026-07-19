import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

function ResumeReadyCard({ resume, onAnalyze, isAnalyzing }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <FileText size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Current Resume</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your resume is ready for AI analysis.
          </p>
        </div>
      </div>

      <a
        href={resume.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        <span className="truncate">{resume.originalName}</span>
        <ExternalLink size={17} className="shrink-0" />
      </a>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          "Placement Readiness",
          "ATS Score",
          "Section Scores",
          "Resume Structure",
          "Missing Keywords",
          "Priority Fixes",
        ].map((item) => (
          <p key={item} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600" />
            {item}
          </p>
        ))}
      </div>

      <button
        type="button"
        disabled={isAnalyzing}
        onClick={onAnalyze}
        className="mt-8 flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAnalyzing ? (
          <>
            <LoaderCircle size={17} className="animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          <>
            <Sparkles size={17} />
            Analyze Resume
          </>
        )}
      </button>
    </motion.section>
  );
}

export default ResumeReadyCard;