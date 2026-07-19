import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function ResumePageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 via-white to-violet-50 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3 text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <p className="text-lg font-bold text-slate-900">
              Preparing your AI resume report
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Reviewing your resume data and building your analytics dashboard...
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="mt-7 h-28 w-28 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="mt-4 h-3 w-full rounded bg-slate-100" />
            <div className="mt-3 h-3 w-2/3 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ResumePageSkeleton;