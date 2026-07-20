import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import RoadmapReport from "./RoadmapReport";

function RoadmapModal({ roadmap, onClose }) {
  if (!roadmap) {
    return null;
  }

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
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-7">
            <div>
              <p className="text-lg font-bold text-slate-900">
                AI Next Steps Roadmap
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Read-only personalized preparation roadmap
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <X size={21} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-7">
            <RoadmapReport
              data={roadmap}
              hasResume={Boolean(roadmap.resume)}
              readOnly
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RoadmapModal;