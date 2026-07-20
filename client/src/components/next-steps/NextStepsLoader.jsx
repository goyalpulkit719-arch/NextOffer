import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const loadingSteps = [
  "Analyzing your profile...",
  "Reviewing coding progress...",
  "Researching company...",
  "Building your personalized roadmap...",
];

function NextStepsLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 via-white to-blue-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-3 text-white shadow-lg shadow-violet-500/20">
            <Sparkles size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Creating your placement roadmap
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your personalized preparation strategy is being generated.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center gap-3 rounded-xl bg-white/80 p-3 text-sm text-slate-600"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                {index + 1}
              </span>
              {step}
            </motion.div>
          ))}
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

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default NextStepsLoader;