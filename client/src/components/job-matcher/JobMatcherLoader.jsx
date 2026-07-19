import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function JobMatcherLoader() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 via-white to-blue-50 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-3 text-white">
            <Sparkles size={23} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              🤖 Matching your resume with this role...
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Evaluating skills, projects, ATS compatibility, and qualification gaps.
            </p>
          </div>
        </div>
      </section>

      <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default JobMatcherLoader;