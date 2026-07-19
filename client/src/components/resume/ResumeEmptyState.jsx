import { motion } from "framer-motion";
import { FileText, Sparkles, Upload } from "lucide-react";

function ResumeEmptyState({ onUpload }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 via-white to-violet-50 p-8 text-center shadow-sm md:p-12"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
        <FileText size={30} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No resume uploaded
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
        Upload your resume to unlock AI-powered placement analysis and
        personalized improvement guidance.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-xl border border-blue-100 bg-white/80 p-4 text-left text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Sparkles size={15} className="text-blue-600" />
          Placement Readiness
        </p>
        <p className="mt-2 flex items-center gap-2">
          <Sparkles size={15} className="text-blue-600" />
          ATS Score and section analysis
        </p>
        <p className="mt-2 flex items-center gap-2">
          <Sparkles size={15} className="text-blue-600" />
          Keywords and personalized fixes
        </p>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="mx-auto mt-7 flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        <Upload size={17} />
        Upload Resume
      </button>
    </motion.section>
  );
}

export default ResumeEmptyState;