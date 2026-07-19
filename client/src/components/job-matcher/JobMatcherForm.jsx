import { BriefcaseBusiness, Building2, FileText, Sparkles } from "lucide-react";

function JobMatcherForm({ formData, onChange, onSubmit, isLoading }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
          <BriefcaseBusiness size={23} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Match your resume to a role
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Compare your current resume with a job description using AI.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Building2 size={16} />
              Company Name
            </span>

            <input
              required
              name="companyName"
              value={formData.companyName}
              onChange={onChange}
              disabled={isLoading}
              placeholder="e.g. Amazon"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </label>

          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <BriefcaseBusiness size={16} />
              Job Title
            </span>

            <input
              required
              name="jobTitle"
              value={formData.jobTitle}
              onChange={onChange}
              disabled={isLoading}
              placeholder="e.g. Software Engineer Intern"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </label>
        </div>

        <label>
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText size={16} />
            Job Description
          </span>

          <textarea
            required
            name="jobDescription"
            value={formData.jobDescription}
            onChange={onChange}
            disabled={isLoading}
            rows={9}
            placeholder="Paste the complete job description here..."
            className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-violet-500 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={17} />
          Analyze Match
        </button>
      </form>
    </section>
  );
}

export default JobMatcherForm;