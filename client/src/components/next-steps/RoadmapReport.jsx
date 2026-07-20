import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";

const priorityColors = {
  High: "bg-rose-50 text-rose-700 border-rose-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Low: "bg-blue-50 text-blue-700 border-blue-100",
};

const stageColors = {
  Foundation: "bg-blue-50 text-blue-700",
  "Skill Building": "bg-violet-50 text-violet-700",
  "Interview Preparation": "bg-amber-50 text-amber-700",
  "Application Ready": "bg-emerald-50 text-emerald-700",
};

function PriorityBadge({ priority }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${priorityColors[priority]}`}>
      {priority}
    </span>
  );
}

function RoadmapReport({
  data,
  hasResume,
  onUploadResume,
  readOnly = false,
}) {
  const roadmap = data.roadmap;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <section className="rounded-2xl border border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-violet-900 p-6 text-white shadow-lg md:p-8">
        <p className="text-sm font-semibold text-violet-200">AI Placement Roadmap</p>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">{data.companyName}</h2>
            <p className="mt-2 max-w-2xl text-slate-300">{roadmap.currentObjective}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-slate-300">Readiness</p>
              <p className="mt-1 text-2xl font-bold">{roadmap.placementReadiness.score}%</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-slate-300">Timeline</p>
              <p className="mt-1 font-bold">{roadmap.estimatedTimeline}</p>
            </div>
          </div>
        </div>

        <span className={`mt-6 inline-block rounded-full px-3 py-1.5 text-sm font-bold ${stageColors[roadmap.currentStage.stage]}`}>
          {roadmap.currentStage.stage}
        </span>
      </section>

      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 to-blue-50 p-6">
        <div className="flex gap-3">
          <Compass className="shrink-0 text-violet-600" size={22} />
          <div>
            <h3 className="font-bold text-slate-900">Current Objective</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{roadmap.currentObjective}</p>
            <p className="mt-3 text-sm text-slate-500">{roadmap.currentStage.reason}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Placement Readiness</h3>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#2563eb ${roadmap.placementReadiness.score * 3.6}deg, #e2e8f0 0deg)`,
            }}
          >
            <div className="flex h-22 w-22 items-center justify-center rounded-full bg-white text-2xl font-bold text-slate-900">
              {roadmap.placementReadiness.score}
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-900">{roadmap.placementReadiness.level}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{roadmap.placementReadiness.reason}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Biggest Gaps</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {roadmap.biggestGaps?.map((gap) => (
            <motion.article key={gap.gap} whileHover={{ y: -3 }} className="rounded-2xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <AlertTriangle className="shrink-0 text-rose-600" size={19} />
                  <div>
                    <p className="font-semibold text-slate-900">{gap.gap}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{gap.reason}</p>
                  </div>
                </div>
                <PriorityBadge priority={gap.priority} />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">DSA Roadmap</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadmap.dsaRoadmap?.map((topic) => (
            <motion.article key={topic.topic} whileHover={{ y: -3 }} className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <Code2 className="text-blue-600" size={20} />
                <PriorityBadge priority={topic.priority} />
              </div>
              <p className="mt-4 font-semibold text-slate-900">{topic.topic}</p>
              <p className="mt-2 text-sm text-slate-500">{topic.difficulty} · {topic.recommendedQuestionCount} questions</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{topic.reason}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="grid gap-7 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Contest Strategy</h3>
          <div className="mt-5 space-y-3">
            {roadmap.contestStrategy?.map((item) => (
              <p key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
                <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Company Specific Focus</h3>
          <div className="mt-5 space-y-3">
            {roadmap.companySpecificFocus?.map((item) => (
              <div key={item.area} className="rounded-xl bg-violet-50 p-4">
                <div className="flex justify-between gap-3">
                  <p className="font-semibold text-slate-900">{item.area}</p>
                  <span className="font-bold text-violet-700">{item.allocation}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Weekly Action Plan</h3>
        <div className="mt-5 space-y-4 border-l-2 border-violet-100">
          {roadmap.weeklyActionPlan?.map((week, index) => (
            <div key={week.week} className="relative pl-10">
              <div className="absolute -left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                {index + 1}
              </div>
              <motion.article whileHover={{ y: -2 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">{week.week}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["DSA", week.dsa],
                    ["Core Subject", week.coreSubject],
                    ["Contest Activity", week.contestActivity],
                    ["Resume / Project", week.resumeOrProjectTask],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-7 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Monthly Milestones</h3>
          <div className="mt-5 space-y-3">
            {roadmap.monthlyMilestones?.map((item, index) => (
              <p key={item} className="flex gap-3 rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
                <span className="font-bold text-blue-600">{index + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Interview Preparation</h3>
          <div className="mt-5 space-y-3">
            {roadmap.interviewPreparationStrategy?.map((item) => (
              <div key={item.area} className="rounded-xl bg-amber-50 p-4">
                <p className="font-semibold text-slate-900">{item.area}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.strategy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {hasResume ? (
        <section className="rounded-2xl border border-emerald-100 bg-linear-to-r from-emerald-50 to-white p-6">
          <div className="flex gap-3">
            <Sparkles className="shrink-0 text-emerald-600" size={22} />
            <div>
              <h3 className="font-bold text-slate-900">Resume Action Plan</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{roadmap.resumeActionPlan}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-violet-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-slate-900">
                <Upload size={19} className="text-blue-600" />
                Unlock Personalized Resume Advice
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Upload your resume to receive focused improvement suggestions tailored to this roadmap and target company.
              </p>
            </div>
            {!readOnly && (
            <button
                onClick={onUploadResume}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                Upload Resume
            </button>
            )}
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default RoadmapReport;