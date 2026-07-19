import { motion } from "framer-motion";
import { Check, Upload, X } from "lucide-react";

function CompletionCard({ hasResume, onUploadResume }) {
  const progress = hasResume ? 100 : 75;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 via-white to-violet-50 p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {hasResume ? "🎉 Profile complete" : "🚀 Profile completion"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {hasResume
              ? "All AI placement features are available."
              : "Add your resume to unlock the complete placement workspace."}
          </p>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-blue-600 shadow-sm">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-violet-600"
        />
      </div>

      {!hasResume && (
        <>
          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {["LeetCode", "Codeforces", "Target Company"].map((item) => (
              <p key={item} className="flex items-center gap-2 text-emerald-700">
                <Check size={16} />
                {item}
              </p>
            ))}

            <p className="flex items-center gap-2 text-slate-400">
              <X size={16} />
              Resume
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-white/80 p-4">
            <p className="font-semibold text-slate-800">
              Upload your resume to unlock
            </p>

            <div className="mt-2 space-y-1 text-sm text-slate-500">
              <p>• Resume Analyzer</p>
              <p>• AI Job Matcher</p>
              <p>• AI Next Steps</p>
            </div>

            <button
              type="button"
              onClick={onUploadResume}
              className="mt-4 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Upload size={16} />
              Upload Resume
            </button>
          </div>
        </>
      )}
    </motion.section>
  );
}

export default CompletionCard;