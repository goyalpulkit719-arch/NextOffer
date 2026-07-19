import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Code2, Trophy } from "lucide-react";
import { toast } from "sonner";

import { updateAvatar, updateTargetCompany } from "../api/authApi";
import {
  getCurrentResume,
  updateCodeforcesUsername,
  updateLeetcodeUsername,
  uploadResume,
} from "../api/profileApi";
import { setUser } from "../app/authSlice";

import ProfileHeaderCard from "../components/profile/ProfileHeaderCard";
import CompletionCard from "../components/profile/CompletionCard";
import LinkedAccountCard from "../components/profile/LinkedAccountCard";
import ResumeCard from "../components/profile/ResumeCard";
import TargetCompanyCard from "../components/profile/TargetCompanyCard";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const resumeInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [isResumeLoading, setIsResumeLoading] = useState(true);
  const [resumeError, setResumeError] = useState("");
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);

  const loadResume = useCallback(async () => {
    try {
      setResumeError("");
      setIsResumeLoading(true);

      const response = await getCurrentResume();

      setResume(response.data);
    } catch (error) {
      setResumeError(getErrorMessage(error));
    } finally {
      setIsResumeLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  const handleAvatarChange = async (file) => {
    if (!file) {
      return;
    }

    try {
      setIsAvatarUpdating(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await updateAvatar(formData);

      dispatch(setUser(response.data));
      toast.success(response.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsAvatarUpdating(false);
    }
  };

  const handleResumeUpload = async (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      return;
    }

    try {
      setIsResumeUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);
      await loadResume();

      toast.success("Resume updated.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsResumeUploading(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  const saveLeetcodeUsername = async (leetcodeUsername) => {
    await updateLeetcodeUsername(leetcodeUsername);

    dispatch(
      setUser({
        ...user,
        leetcodeUsername,
      })
    );
  };

  const saveCodeforcesUsername = async (codeforcesUsername) => {
    await updateCodeforcesUsername(codeforcesUsername);

    dispatch(
      setUser({
        ...user,
        codeforcesUsername,
      })
    );
  };

  const saveTargetCompany = async (targetCompany) => {
    const response = await updateTargetCompany(targetCompany);
    dispatch(setUser(response.data));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl space-y-6 pb-10"
    >
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => handleResumeUpload(event.target.files?.[0])}
      />

      <ProfileHeaderCard
        user={user}
        onAvatarChange={handleAvatarChange}
        isAvatarUpdating={isAvatarUpdating}
      />

      <CompletionCard
        hasResume={Boolean(resume)}
        onUploadResume={() => resumeInputRef.current?.click()}
      />

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Linked Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update the competitive programming usernames connected to your account.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <LinkedAccountCard
            type="LeetCode"
            username={user.leetcodeUsername}
            icon={Code2}
            color="bg-orange-50 text-orange-600"
            onSave={saveLeetcodeUsername}
          />

          <LinkedAccountCard
            type="Codeforces"
            username={user.codeforcesUsername}
            icon={Trophy}
            color="bg-blue-50 text-blue-600"
            onSave={saveCodeforcesUsername}
          />
        </div>
      </section>

      {isResumeLoading ? (
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      ) : (
        <ResumeCard
          resume={resume}
          error={resumeError}
          isUploading={isResumeUploading}
          onRetry={loadResume}
          onUploadResume={() => resumeInputRef.current?.click()}
        />
      )}

      <TargetCompanyCard
        company={user.targetCompany}
        onSave={saveTargetCompany}
      />
    </motion.div>
  );
}

export default Profile;