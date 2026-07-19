import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const checkLabels = {
  contact: "Contact",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  links: "Links",
};

function ResumeChecklist({ checks }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900">Resume Structure</h2>
      <p className="mt-1 text-sm text-slate-500">
        Essential sections detected by the AI reviewer.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(checkLabels).map(([key, label]) => {
          const exists = checks?.[key];

          return (
            <div
              key={key}
              className={`flex items-center gap-2 rounded-xl p-3 text-sm font-medium ${
                exists
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {exists ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
              {label}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default ResumeChecklist;