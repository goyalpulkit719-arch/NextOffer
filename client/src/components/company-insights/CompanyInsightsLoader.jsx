import { motion } from "framer-motion";
import { Bot } from "lucide-react";

function CompanyInsightsLoader({ companyName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 via-white to-blue-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-3 text-white shadow-lg shadow-violet-500/20">
            <Bot size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              🤖 Researching {companyName}...
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Analyzing interview experiences, preparation patterns and hiring insights...
            </p>
          </div>
        </div>
      </section>

      <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default CompanyInsightsLoader;