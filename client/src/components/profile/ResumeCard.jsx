import { motion } from "framer-motion";
import { Check, ExternalLink, FileText, Upload } from "lucide-react";

function ResumeCard({ resume, onUploadResume, isUploading, error, onRetry }) {
  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <p className="font-semibold text-rose-700">Could not load resume</p>
        <p className="mt-1 text-sm text-rose-600">{error}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Try Again
        </button>
      </section>
    );
  }

  const hasResume = Boolean(resume);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
          <FileText size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">Resume</h2>
          <p className="mt-1 text-sm text-slate-500">
            {hasResume
              ? "This resume is used across your AI placement tools."
              : "Upload a resume to unlock personalized AI guidance."}
          </p>
        </div>
      </div>

      {hasResume ? (
        <>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <span className="truncate">{resume.originalName}</span>
            <ExternalLink size={17} className="shrink-0" />
          </a>

          <div className="mt-5 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              Resume Analyzer
            </p>
            <p className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              AI Job Matcher
            </p>
            <p className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              AI Next Steps
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Resume
            </a>

            <button
              type="button"
              disabled={isUploading}
              onClick={onUploadResume}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              <Upload size={16} />
              {isUploading ? "Uploading..." : "Update Resume"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-500">No resume uploaded.</p>

          <div className="mt-4 space-y-1 text-sm text-slate-500">
            <p>• Resume Analyzer</p>
            <p>• AI Job Matcher</p>
            <p>• AI Next Steps</p>
          </div>

          <button
            type="button"
            disabled={isUploading}
            onClick={onUploadResume}
            className="mt-6 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
          >
            <Upload size={16} />
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        </>
      )}
    </motion.section>
  );
}

export default ResumeCard;