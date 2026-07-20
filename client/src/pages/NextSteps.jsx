import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Building2, Sparkles } from "lucide-react";

import { setUser } from "../app/authSlice";
import { uploadResume } from "../api/profileApi";
import { generateNextSteps } from "../api/nextStepsApi";
import NextStepsLoader from "../components/next-steps/NextStepsLoader";
import RoadmapReport from "../components/next-steps/RoadmapReport";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to generate roadmap.";

function NextSteps() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const resumeInputRef = useRef(null);

  const [companyName, setCompanyName] = useState(user.targetCompany || "");
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (event) => {
    event.preventDefault();

    if (!companyName.trim()) {
      toast.error("Please enter a target company.");
      return;
    }

    try {
      setIsLoading(true);
      setRoadmap(null);

      const response = await generateNextSteps(companyName.trim());

      setRoadmap(response.data);
      toast.success(response.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadResume = async (file) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);

      dispatch(setUser({ ...user, hasResume: true }));
      toast.success("Resume uploaded successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  if (isLoading) {
    return <NextStepsLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-7 pb-10"
    >
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => handleUploadResume(event.target.files?.[0])}
      />

      {!roadmap ? (
        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <Sparkles size={23} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Build your roadmap
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Start with your target company.
              </p>
            </div>
          </div>

          {!user.hasResume && (
            <div className="mt-7 rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-violet-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    <Sparkles size={19} className="text-blue-600" />
                    Unlock personalized resume recommendations
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    You can generate a roadmap without a resume, but uploading
                    one lets NextOffer include personalized resume improvements
                    for your target company.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Upload Resume
                </button>
              </div>
            </div>
          )}

          <label className="mt-7 block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Building2 size={16} />
              Target Company
            </span>
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="e.g. Amazon"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-violet-500"
            />
          </label>

          <button className="mt-5 flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
            <Sparkles size={17} />
            Generate Roadmap
          </button>
        </form>
      ) : (
        <RoadmapReport
          data={roadmap}
          hasResume={user.hasResume}
          onUploadResume={() => resumeInputRef.current?.click()}
        />
      )}
    </motion.div>
  );
}

export default NextSteps;
