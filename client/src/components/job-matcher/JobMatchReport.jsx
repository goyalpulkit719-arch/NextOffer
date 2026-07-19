import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Lightbulb,
  Target,
  TriangleAlert,
} from "lucide-react";

const verdictStyles = {
  "Excellent Fit": "bg-emerald-50 text-emerald-700",
  "Strong Fit": "bg-blue-50 text-blue-700",
  "Moderate Fit": "bg-amber-50 text-amber-700",
  "Weak Fit": "bg-orange-50 text-orange-700",
  "Poor Fit": "bg-rose-50 text-rose-700",
};

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-blue-50 text-blue-700",
};

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

function InsightCard({ item, type }) {
  const isMatching = type === "matching";
  const isStrength = type === "strength";

  const icon = isMatching || isStrength
    ? <CheckCircle2 size={19} />
    : <TriangleAlert size={19} />;

  const color = isMatching || isStrength
    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
    : "border-orange-100 bg-orange-50 text-orange-700";

  return (
    <motion.article
      whileHover={{ y: -3 }}
      className={`rounded-2xl border p-5 shadow-sm ${color}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icon}</div>
        <div>
          <p className="font-semibold text-slate-900">
            {item.qualification || item.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.explanation}
          </p>

          {item.importance && (
            <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${priorityStyles[item.importance]}`}>
              {item.importance} Priority
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function JobMatchReport({ result }) {
  const suggestions = [...(result.suggestions || [])].sort(
    (first, second) =>
      priorityOrder[first.priority] - priorityOrder[second.priority]
  );

  const scoreColor =
    result.matchPercentage >= 75
      ? "#10b981"
      : result.matchPercentage >= 60
        ? "#2563eb"
        : result.matchPercentage >= 40
          ? "#f59e0b"
          : "#f43f5e";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <section className="rounded-2xl border border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-violet-900 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-200">AI Job Match Report</p>
            <h2 className="mt-2 text-3xl font-bold">{result.jobTitle}</h2>
            <p className="mt-2 text-slate-300">{result.companyName}</p>

            <span className={`mt-5 inline-block rounded-full px-3 py-1.5 text-sm font-bold ${verdictStyles[result.verdict]}`}>
              {result.verdict}
            </span>
          </div>

          <div
            className="flex h-40 w-40 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${scoreColor} ${result.matchPercentage * 3.6}deg, rgba(255,255,255,0.15) 0deg)`,
            }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-slate-900">
              <span className="text-4xl font-bold">{result.matchPercentage}%</span>
              <span className="mt-1 text-xs text-slate-400">Match Score</span>
            </div>
          </div>
        </div>
      </section>

      {result.resumeId && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-700">Resume Used for Analysis</p>
          <a
            href={result.resumeId.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
          >
            <FileText size={17} />
            {result.resumeId.originalName}
            <ExternalLink size={15} />
          </a>
        </section>
      )}

      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 to-blue-50 p-6">
        <div className="flex gap-3">
          <Lightbulb className="shrink-0 text-violet-600" size={22} />
          <div>
            <h3 className="font-bold text-slate-900">Overall AI Analysis</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {result.overallAnalysis}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Matching Qualifications</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {result.matchingQualifications?.map((item) => (
            <InsightCard key={item.qualification} item={item} type="matching" />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Missing Qualifications</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {result.missingQualifications?.map((item) => (
            <InsightCard key={item.qualification} item={item} type="missing" />
          ))}
        </div>
      </section>

      <div className="grid gap-7 lg:grid-cols-2">
        <section>
          <h3 className="text-xl font-bold text-slate-900">Strengths</h3>
          <div className="mt-4 space-y-3">
            {result.strengths?.map((item) => (
              <InsightCard key={item.title} item={item} type="strength" />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-900">Weaknesses</h3>
          <div className="mt-4 space-y-3">
            {result.weaknesses?.map((item) => (
              <InsightCard key={item.title} item={item} type="weakness" />
            ))}
          </div>
        </section>
      </div>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Recommendations</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {suggestions.map((suggestion) => (
            <motion.article
              key={suggestion.title}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-blue-600 p-2 text-white">
                    <Target size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{suggestion.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {suggestion.description}
                    </p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${priorityStyles[suggestion.priority]}`}>
                  {suggestion.priority}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default JobMatchReport;