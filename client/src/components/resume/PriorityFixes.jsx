import { motion } from "framer-motion";
import { Star } from "lucide-react";

function PriorityFixes({ fixes }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Priority Fixes</h2>
        <p className="mt-1 text-sm text-slate-500">
          The highest-impact improvements for your resume.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fixes?.map((fix, index) => (
          <motion.article
            key={`${fix.title}-${index}`}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50 to-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Star size={17} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">{fix.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {fix.reason}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default PriorityFixes;