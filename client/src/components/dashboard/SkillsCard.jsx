import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const categoryConfig = {
  fundamental: {
    title: "Fundamental",
    color: "bg-emerald-500",
    light: "bg-emerald-50 text-emerald-700",
  },
  intermediate: {
    title: "Intermediate",
    color: "bg-violet-500",
    light: "bg-violet-50 text-violet-700",
  },
  advanced: {
    title: "Advanced",
    color: "bg-red-500",
    light: "bg-red-50 text-rose-700",
  },
};

function SkillList({ skills, category, limit }) {
  const config = categoryConfig[category];
  const sortedSkills = [...(skills || [])].sort((a, b) => b.solved - a.solved);
  const visibleSkills = limit ? sortedSkills.slice(0, limit) : sortedSkills;
  const highestSolved = sortedSkills[0]?.solved || 1;

  return (
    <div className="space-y-3">
      {visibleSkills.map((skill) => (
        <div key={skill.topic}>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-700">{skill.topic}</span>
            <span className="text-slate-500">{skill.solved} solved</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(skill.solved / highestSolved) * 100}%` }}
              className={`h-full rounded-full ${config.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsCard({ skills }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSkills = Object.values(skills || {}).some((items) => items?.length);

  if (!hasSkills) {
    return null;
  }

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900">Top skills</h3>
            <p className="mt-1 text-sm text-slate-500">
              Topics where you have solved the most problems
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {Object.entries(categoryConfig).map(([category, config]) => (
            <div key={category}>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.light}`}>
                {config.title}
              </span>
              <div className="mt-4">
                <SkillList skills={skills?.[category]} category={category} limit={3} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">All skills</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your LeetCode topic performance
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-7 grid gap-8 md:grid-cols-3">
                {Object.entries(categoryConfig).map(([category, config]) => (
                  <div key={category}>
                    <p className="mb-4 font-semibold text-slate-900">
                      {config.title}
                    </p>
                    <SkillList skills={skills?.[category]} category={category} />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SkillsCard;