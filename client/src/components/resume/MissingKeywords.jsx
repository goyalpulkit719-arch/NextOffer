import { motion } from "framer-motion";

function MissingKeywords({ keywords }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Missing Keywords</h2>
      <p className="mt-1 text-sm text-slate-500">
        Skills and terms that could improve resume relevance.
      </p>

      <div className="mt-5 flex max-h-40 flex-wrap gap-2 overflow-y-auto pr-1">
        {keywords?.map((keyword) => (
          <motion.span
            key={keyword}
            whileHover={{ y: -2, scale: 1.03 }}
            className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700"
          >
            {keyword}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

export default MissingKeywords;