import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";

function ResumeHeader({ resume }) {
  const updatedDate = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
          <FileText size={24} />
        </div>

        <div className="min-w-0">
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-xl font-bold text-slate-900 transition hover:text-blue-600"
          >
            {resume.originalName}
          </a>

          <p className="mt-1 text-sm text-slate-500">
            Last updated {updatedDate}
          </p>
        </div>
      </div>

      <a
        href={resume.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        View Resume
        <ExternalLink size={16} />
      </a>
    </motion.section>
  );
}

export default ResumeHeader;