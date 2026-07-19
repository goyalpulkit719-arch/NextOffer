import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { setUser } from "../app/authSlice";
import { uploadResume } from "../api/profileApi";
import { analyzeJobMatch } from "../api/jobMatcherApi";

import ResumeEmptyState from "../components/resume/ResumeEmptyState";
import JobMatcherForm from "../components/job-matcher/JobMatcherForm";
import JobMatcherLoader from "../components/job-matcher/JobMatcherLoader";
import JobMatchReport from "../components/job-matcher/JobMatchReport";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to analyze this job match.";

function JobMatcher() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const resumeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
  });
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUploadResume = async (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      return;
    }

    try {
      setIsUploading(true);

      const formDataUpload = new FormData();
      formDataUpload.append("resume", file);

      await uploadResume(formDataUpload);

      dispatch(
        setUser({
          ...user,
          hasResume: true,
        })
      );

      toast.success("Resume uploaded. You can now analyze job matches.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploading(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsAnalyzing(true);
      setResult(null);

      const response = await analyzeJobMatch(formData);

      setResult(response.data);
      toast.success(response.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!user.hasResume) {
    return (
      <>
        <input
          ref={resumeInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => handleUploadResume(event.target.files?.[0])}
        />

        <div className="mx-auto max-w-4xl pb-10">
          <ResumeEmptyState
            onUpload={() => {
              if (!isUploading) {
                resumeInputRef.current?.click();
              }
            }}
          />
        </div>
      </>
    );
  }

  if (isAnalyzing) {
    return <JobMatcherLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-7 pb-10"
    >

      {!result ? (
        <JobMatcherForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isAnalyzing}
        />
      ) : (
        <JobMatchReport result={result} />
      )}
    </motion.div>
  );
}

export default JobMatcher;