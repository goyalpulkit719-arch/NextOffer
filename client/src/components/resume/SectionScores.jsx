import { motion } from "framer-motion";
import {
  Code2,
  FileCheck2,
  Languages,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    key: "projects",
    title: "Projects",
    icon: Code2,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "skills",
    title: "Skills",
    icon: FileCheck2,
    color: "bg-violet-500",
    lightColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "atsCompatibility",
    title: "ATS Compatibility",
    icon: ShieldCheck,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "resumeStructure",
    title: "Resume Structure",
    icon: LayoutTemplate,
    color: "bg-orange-500",
    lightColor: "bg-orange-50 text-orange-600",
  },
  {
    key: "grammar",
    title: "Grammar",
    icon: Languages,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-600",
  },
];

function SectionScores({ sectionScores }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Section Scores</h2>
        <p className="mt-1 text-sm text-slate-500">
          Detailed AI evaluation across the important resume sections.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map(({ key, title, icon: Icon, color, lightColor }) => {
          const section = sectionScores?.[key] || {};
          const score = section.score || 0;

          return (
            <motion.article
              key={key}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex min-w-52 items-center gap-3">
                  <div className={`rounded-xl p-3 ${lightColor}`}>
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      AI section score
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm leading-6 text-slate-500">
                      {section.feedback || "No feedback available."}
                    </p>

                    <p className="shrink-0 text-3xl font-bold text-slate-900">
                      {score}
                    </p>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default SectionScores;