import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  getCompanyInsightById,
  getCompanyInsightHistory,
} from "../api/CompanyInsightsApi";
import CompanyInsightsModal from "../components/company-insights/CompanyInsightsModal";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to load company history.";

function CompanyInsightsHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpeningAnalysis, setIsOpeningAnalysis] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);

      const response = await getCompanyInsightHistory();

      setHistory(response.data || []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleViewAnalysis = async (historyItem) => {
    try {
      setIsOpeningAnalysis(true);

      const insightId = historyItem.companyInsightId?._id;

      if (!insightId) {
        throw new Error("Company insight is no longer available.");
      }

      const response = await getCompanyInsightById(insightId);

      setSelectedInsight(response.data);
    } catch (requestError) {
      toast.error(getErrorMessage(requestError));
    } finally {
      setIsOpeningAnalysis(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-60 rounded-lg bg-slate-200" />
        <div className="h-36 rounded-2xl bg-slate-200" />
        <div className="h-36 rounded-2xl bg-slate-200" />
        <div className="h-36 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="font-bold text-rose-700">
          Could not load company history
        </h2>

        <p className="mt-1 text-sm text-rose-600">{error}</p>

        <button
          type="button"
          onClick={loadHistory}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-5 pb-10">
        <button
          type="button"
          onClick={() => navigate("/company-insights")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Company Insights
        </button>


        {!history.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Building2 size={25} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No company insights yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Search for a company to generate AI-powered interview insights.
            </p>

            <button
              type="button"
              onClick={() => navigate("/company-insights")}
              className="mt-6 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Go to Company Insights
            </button>
          </motion.section>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {history.map((item, index) => {
              const company = item.companyInsightId;

              if (!company) {
                return null;
              }

              const generatedOn = company.updatedAt || item.viewedAt;

              return (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                      <Building2 size={21} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {company.companyName}
                      </h2>

                      <p className="mt-3 text-sm text-slate-500">
                        Generated On
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {new Date(generatedOn).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isOpeningAnalysis}
                    onClick={() => handleViewAnalysis(item)}
                    className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isOpeningAnalysis ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Opening...
                      </>
                    ) : (
                      <>
                        View Analysis
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <CompanyInsightsModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
      />
    </>
  );
}

export default CompanyInsightsHistory;