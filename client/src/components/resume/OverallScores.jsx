import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

function ScoreCard({ title, score, level, icon: Icon, color, text }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${color.light}`}>
          <Icon size={22} />
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-bold ${color.light}`}>
          {level}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${color.hex} ${score * 3.6}deg, #e2e8f0 0deg)`,
          }}
        >
          <div className="flex h-22 w-22 items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-slate-900">{score}</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg text-slate-900">{title}</p>
          <p className="mt-2 text-sm text-slate-500">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function OverallScores({ analysis }) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <ScoreCard
        title="Placement Readiness"
        score={analysis.placementReadiness?.score || 0}
        level={analysis.placementReadiness?.level || "Not rated"}
        icon={Award}
        color={{
          hex: "#2563eb",
          light: "bg-blue-50 text-blue-700",
        }}
        text="Formulated overall placement readiness score"
      />

      <ScoreCard
        title="ATS Score"
        score={analysis.ats?.score || 0}
        level={analysis.ats?.score >= 75 ? "Excellent" : "Improving"}
        icon={ShieldCheck}
        color={{
          hex: "#7c3aed",
          light: "bg-violet-50 text-violet-700",
        }}
        text="AI-evaluated resume quality score"
      />
    </section>
  );
}

export default OverallScores;