import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search } from "lucide-react";
import { toast } from "sonner";

import { getCompanyInsights } from "../api/CompanyInsightsApi";
import CompanyInsightsLoader from "../components/company-insights/CompanyInsightsLoader";
import CompanyInsightsReport from "../components/company-insights/CompanyInsightsReport";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to generate company insights.";

function CompanyInsights() {
  const [companyName, setCompanyName] = useState("");
  const [insight, setInsight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    try {
      setIsLoading(true);
      setInsight(null);

      const response = await getCompanyInsights(companyName.trim());

      setInsight(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CompanyInsightsLoader companyName={companyName} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7 pb-10">

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex md:items-center md:gap-3"
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <Building2 size={19} className="text-slate-400" />

          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="Enter a company name, for example Amazon"
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 md:mt-0 md:w-auto"
        >
          <Search size={17} />
          Get Insights
        </button>
      </form>

      {insight ? (
        <CompanyInsightsReport insight={insight} />
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Search size={24} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Research your target company
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Search for a company to generate a focused preparation report for
            software engineering and internship roles.
          </p>
        </motion.section>
      )}
    </div>
  );
}

export default CompanyInsights;