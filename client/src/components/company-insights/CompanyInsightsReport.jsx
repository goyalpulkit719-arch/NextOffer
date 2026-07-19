import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ChevronDown,
  ExternalLink,
  Lightbulb,
  MapPin,
  Users,
} from "lucide-react";

const difficultyStyles = {
  Hard: "bg-rose-50 text-rose-700 border-rose-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Not Asked": "bg-slate-100 text-slate-600 border-slate-200",
};

const questionStyles = {
  Hard: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Easy: "bg-emerald-50 text-emerald-700",
};

const chipColors = ["blue", "emerald","amber", "violet","rose"];

function ReadMore({ text, limit = 260 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) {
    return null;
  }

  const isLong = text.length > limit;
  const visibleText = expanded || !isLong ? text : `${text.slice(0, limit)}...`;

  return (
    <div>
      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
        {visibleText}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

function Chip({ children, color = "blue" }) {
  const styles = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
    violet: "border-violet-100 bg-violet-50 text-violet-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
  };

  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium ${styles[color]}`}
    >
      {children}
    </motion.span>
  );
}

function DifficultyCard({ title, data }) {
  const [expanded, setExpanded] = useState(false);
  const level = data?.level || "Not Asked";

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      onClick={() => setExpanded((value) => !value)}
      className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-slate-900">{title}</p>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-bold ${difficultyStyles[level]}`}
        >
          {level}
        </span>
      </div>

      {expanded && (
        <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">
          {data?.reasoning || "No detailed reasoning available."}
        </p>
      )}
    </motion.button>
  );
}

function HiringRound({ round, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
        {index + 1}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900">{round.round}</p>
            <p className="mt-1 text-sm text-slate-500">{round.duration}</p>
          </div>
          <ChevronDown
            size={19}
            className={`shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {round.focus?.map((topic, index) => (
            <Chip key={topic} color={chipColors[index % chipColors.length]}>
              {topic}
            </Chip>
          ))}
        </div>

        {expanded && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="text-sm leading-6 text-slate-600">
              {round.description}
            </p>

            <p className="mt-4 text-sm font-semibold text-slate-800">
              Preparation Tips
            </p>

            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {round.preparationTips?.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
}

function SubjectAccordion({ subject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-900">{subject.subject}</p>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {expanded && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {subject.topics?.map((topic) => (
            <Chip key={topic} color="emerald">
              {topic}
            </Chip>
          ))}
        </div>
      )}
    </button>
  );
}

function CompanyInsightsReport({ insight }) {
  const overview = insight.companyOverview || {};
  const difficulty = insight.difficultyAnalysis || {};

  const summary = [
    insight.hiringProcess?.[0]
      ? `${insight.hiringProcess[0].round} is typically an important early stage.`
      : "",
    insight.importantDSATopics?.length
      ? `Prioritize ${insight.importantDSATopics.slice(0, 3).join(", ")}.`
      : "",
    insight.technicalSkills?.length
      ? `Build practical strength in ${insight.technicalSkills.slice(0, 3).join(", ")}.`
      : "",
    "Use the hiring rounds and preparation tips below to build a focused plan.",
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-slate-900 via-slate-800 to-violet-900 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-violet-200">
              Company Preparation Report
            </p>
            <h2 className="mt-2 text-3xl font-bold">{insight.companyName}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {overview.about}
            </p>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:w-96">
            <p className="rounded-xl bg-white/10 p-3">
              <Building2 size={16} className="mb-2 text-violet-200" />
              {overview.industry}
            </p>
            <p className="rounded-xl bg-white/10 p-3">
              <MapPin size={16} className="mb-2 text-violet-200" />
              {overview.headquarters}
            </p>
            <p className="rounded-xl bg-white/10 p-3">
              Founded
              <br />
              <span className="font-semibold">{overview.founded}</span>
            </p>
            <p className="rounded-xl bg-white/10 p-3">
              <Users size={16} className="mb-2 text-violet-200" />
              {overview.employees}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 to-blue-50 p-6">
        <div className="flex gap-3">
          <Lightbulb className="shrink-0 text-violet-600" size={22} />
          <div>
            <h3 className="font-bold text-slate-900">AI Preparation Summary</h3>
            <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {summary.map((line) => (
                <p key={line}>• {line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">
          Interview Difficulty
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["DSA", difficulty.dsa],
            ["OOPS", difficulty.oops],
            ["DBMS", difficulty.dbms],
            ["OS", difficulty.os],
            ["CN", difficulty.cn],
            ["System Design", difficulty.systemDesign],
            ["Aptitude", difficulty.aptitude],
          ].map(([title, data]) => (
            <DifficultyCard key={title} title={title} data={data} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Hiring Process</h3>
        <div className="mt-5 space-y-4 border-l-2 border-violet-100">
          {insight.hiringProcess?.map((round, index) => (
            <HiringRound
              key={`${round.round}-${index}`}
              round={round}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">
          Important DSA Topics
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {insight.importantDSATopics?.map((topic, index) => (
            <Chip key={topic} color={chipColors[index % chipColors.length]}>
              {topic}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">
          Recommended LeetCode Questions
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insight.leetcodeQuestions?.map((question) => (
            <motion.article
              key={question.link}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">{question.title}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">{question.topic}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${questionStyles[question.difficulty] || "bg-slate-100 text-slate-600"}`}
                >
                  {question.difficulty}
                </span>
              </div>
              <a
                href={question.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Open Question <ExternalLink size={15} />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Core Subjects</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {insight.coreSubjects?.map((subject) => (
            <SubjectAccordion key={subject.subject} subject={subject} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Technical Skills</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {insight.technicalSkills?.map((skill, index) => (
            <Chip
              key={skill}
              color={chipColors[(index + 1) % chipColors.length]}
            >
              {skill}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Resume Tips</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insight.resumeTips?.map((tip, index) => {
            const cardColors = [
              "border-blue-100 from-blue-50 to-white",
              "border-violet-100 from-violet-50 to-white",
              "border-emerald-100 from-emerald-50 to-white",
              "border-amber-100 from-amber-50 to-white",
              "border-rose-100 from-rose-50 to-white",
            ];

            const iconColors = [
              "bg-blue-600",
              "bg-violet-600",
              "bg-emerald-600",
              "bg-amber-500",
              "bg-rose-600",
            ];

            return (
              <motion.article
                key={tip.title}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border bg-linear-to-br p-5 shadow-sm transition hover:shadow-md ${
                  cardColors[index % cardColors.length]
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white ${
                    iconColors[index % iconColors.length]
                  }`}
                >
                  {index + 1}
                </div>

                <p className="mt-4 font-semibold text-slate-900">{tip.title}</p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tip.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm md:p-8">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-200/40 blur-2xl" />

        <div className="relative">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
            COMPANY CULTURE
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Work Culture
          </h3>

          <div className="mt-4 border-l-4 border-violet-500 pl-4">
            <ReadMore text={insight.workCulture} limit={380} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900">Key Qualities</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insight.keyQualities?.map((quality, index) => {
            const qualityColors = [
              "border-blue-100 bg-blue-50",
              "border-violet-100 bg-violet-50",
              "border-emerald-100 bg-emerald-50",
              "border-amber-100 bg-amber-50",
              "border-rose-100 bg-rose-50",
            ];

            const numberColors = [
              "bg-blue-600",
              "bg-violet-600",
              "bg-emerald-600",
              "bg-amber-500",
              "bg-rose-600",
            ];

            return (
              <motion.article
                key={quality.quality}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
                  qualityColors[index % qualityColors.length]
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      numberColors[index % numberColors.length]
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {quality.quality}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {quality.explanation}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}

export default CompanyInsightsReport;
