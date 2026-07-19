import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { X } from "lucide-react";

const getDifferenceStyle = (value) => {
  if (value > 0) return "text-emerald-600";
  if (value < 0) return "text-rose-600";
  return "text-slate-400";
};

const Difference = ({ value, suffix = "" }) => (
  <span className={getDifferenceStyle(value)}>
    {value > 0 ? "+" : ""}
    {value}{suffix}
  </span>
);

function HistoryModal({ isOpen, onClose, history, platform }) {
  const isLeetcode = platform === "leetcode";
  const sortedHistory = [...history].sort(
    (first, second) => new Date(second.fetchedAt) - new Date(first.fetchedAt)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Profile history</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Saved profile snapshots, newest first
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-auto">
              {!sortedHistory.length ? (
                <p className="p-8 text-center text-sm text-slate-500">
                  No saved snapshots yet.
                </p>
              ) : (
                <table className="w-full min-w-225 text-left text-sm">
                  <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Solved</th>
                      {isLeetcode && <th className="px-5 py-3">Easy</th>}
                      {isLeetcode && <th className="px-5 py-3">Medium</th>}
                      {isLeetcode && <th className="px-5 py-3">Hard</th>}
                      <th className="px-5 py-3">Rating</th>
                      <th className="px-5 py-3">Difference</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {sortedHistory.map((item, index) => {
                      const previous = sortedHistory[index + 1];
                      const solvedDifference = previous
                        ? item.totalSolved - previous.totalSolved
                        : 0;
                      const ratingKey = isLeetcode ? "contestRating" : "currentRating";

                      return (
                        <tr key={item._id} className="hover:bg-slate-50">
                          <td className="px-5 py-4 text-slate-600">
                            {format(new Date(item.fetchedAt), "dd MMM yyyy, hh:mm a")}
                          </td>
                          <td className="px-5 py-4 font-semibold">{item.totalSolved}</td>
                          {isLeetcode && <td className="px-5 py-4">{item.easySolved}</td>}
                          {isLeetcode && <td className="px-5 py-4">{item.mediumSolved}</td>}
                          {isLeetcode && <td className="px-5 py-4">{item.hardSolved}</td>}
                          <td className="px-5 py-4 font-semibold">{item[ratingKey]}</td>
                          <td className="px-5 py-4 font-medium">
                            <Difference value={solvedDifference} suffix=" solved" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HistoryModal;