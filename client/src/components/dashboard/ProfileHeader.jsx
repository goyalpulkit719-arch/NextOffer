import { motion } from "framer-motion";
import { History, RefreshCw, Trophy } from "lucide-react";

function ProfileHeader({
  title,
  username,
  subtitle,
  onRefresh,
  onHistory,
  isRefreshing,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-lg shadow-slate-900/15">
          <Trophy size={22} />
        </div>

        <div>
          <p className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {username || "Competitive programming profile"}
            {subtitle && ` · ${subtitle}`}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onHistory}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <History size={16} />
          History
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isRefreshing ? "animate-spin" : ""}
          />
          {isRefreshing ? "Refreshing" : "Refresh"}
        </motion.button>
      </div>
    </div>
  );
}

export default ProfileHeader;