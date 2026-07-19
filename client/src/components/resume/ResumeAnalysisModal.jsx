import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import ResumeHeader from "./ResumeHeader";
import OverallScores from "./OverallScores";
import SectionScores from "./SectionScores";
import ResumeChecklist from "./ResumeChecklist";
import FeedbackCard from "./FeedbackCard";
import MissingKeywords from "./MissingKeywords";
import PriorityFixes from "./PriorityFixes";

function ResumeAnalysisModal({ resume, onClose }) {
  if (!resume) {
    return null;
  }

  const analysis = resume.analysis;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 md:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-7">
            <div>
              <p className="text-lg font-bold text-slate-900">
                Resume Analysis
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Read-only analysis for this resume version
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={21} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-7">
            <div className="space-y-6">
              <ResumeHeader resume={resume} />

              <OverallScores analysis={analysis} />

              <SectionScores sectionScores={analysis?.sectionScores} />

              <ResumeChecklist
                checks={analysis?.sectionScores?.resumeStructure?.checks}
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <FeedbackCard
                  title="Strengths"
                  icon="💪"
                  items={analysis?.strengths}
                  color="border-emerald-100 bg-emerald-50 text-emerald-800"
                />

                <FeedbackCard
                  title="Improvements"
                  icon="📈"
                  items={analysis?.improvements}
                  color="border-orange-100 bg-orange-50 text-orange-800"
                />
              </div>

              <MissingKeywords keywords={analysis?.missingKeywords} />

              <PriorityFixes fixes={analysis?.priorityFixes} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ResumeAnalysisModal;