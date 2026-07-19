import { motion } from "framer-motion";

const colorStyles = {
  blue: "from-blue-500/15 to-cyan-500/5 text-blue-600",
  purple: "from-purple-500/15 to-violet-500/5 text-purple-600",
  green: "from-emerald-500/15 to-green-500/5 text-emerald-600",
  yellow: "from-amber-500/15 to-orange-500/5 text-amber-600",
  red: "from-rose-500/15 to-red-500/5 text-rose-600",
  orange: "from-orange-500/15 to-amber-500/5 text-orange-600",
  slate: "from-slate-500/15 to-slate-400/5 text-slate-600",
};

function StatCard({ icon: Icon, label, value, description, color = "blue", progress }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-linear-to-br p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className={`inline-flex rounded-xl bg-white/80 p-2 shadow-sm ${colorStyles[color]}`}>
        <Icon size={18} />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 min-h-5 text-xs text-slate-500">
        {description}
      </p>

      {progress !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`h-full rounded-full ${
              color === "green"
                ? "bg-emerald-500"
                : color === "yellow"
                  ? "bg-amber-500"
                  : "bg-rose-500"
            }`}
          />
        </div>
      )}
    </motion.div>
  );
}

export default StatCard;