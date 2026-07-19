import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  AtSign,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  FileText,
  LoaderCircle,
  Pencil,
  Target,
  Trophy,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import ResumeCard from "../components/profile/ResumeCard";
import { updateAvatar, updateTargetCompany } from "../api/authApi";
import {
  getCurrentResume,
  updateCodeforcesUsername,
  updateLeetcodeUsername,
  uploadResume,
} from "../api/profileApi";
import { setUser } from "../app/authSlice";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

function ProfileHeaderCard({ user, onAvatarChange, isAvatarUpdating }) {
  const avatarInputRef = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 text-4xl font-bold text-white shadow-lg shadow-blue-500/25">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => onAvatarChange(event.target.files?.[0])}
          />

          <button
            type="button"
            disabled={isAvatarUpdating}
            onClick={() => avatarInputRef.current?.click()}
            className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAvatarUpdating ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            Change Avatar
          </button>
        </div>

        <div className="min-w-0">
          <p className="text-3xl font-bold tracking-tight text-slate-900">
            {user.name}
          </p>

          <p className="mt-2 flex items-center gap-2 text-slate-500">
            <AtSign size={16} />
            {user.email}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Member since{" "}
            <span className="font-medium text-slate-700">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "recently"}
            </span>
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function CompletionCard({ hasResume, onUploadResume }) {
  const progress = hasResume ? 100 : 75;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 via-white to-violet-50 p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-slate-900">
            {hasResume ? "🎉 Profile complete" : "🚀 Profile completion"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {hasResume
              ? "All placement features are ready to use."
              : "One final step unlocks your complete AI placement workspace."}
          </p>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-blue-600 shadow-sm">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-violet-600"
        />
      </div>

      {!hasResume && (
        <>
          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {["LeetCode", "Codeforces", "Target Company"].map((item) => (
              <p key={item} className="flex items-center gap-2 text-emerald-700">
                <Check size={16} />
                {item}
              </p>
            ))}

            <p className="flex items-center gap-2 text-slate-400">
              <X size={16} />
              Resume
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-white/80 p-4">
            <p className="font-semibold text-slate-800">
              Upload your resume to unlock
            </p>

            <div className="mt-2 grid gap-1 text-sm text-slate-500">
              <p>• Resume Analyzer</p>
              <p>• AI Job Matcher</p>
              <p>• AI Next Steps</p>
            </div>

            <button
              type="button"
              onClick={onUploadResume}
              className="mt-4 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Upload size={16} />
              Upload Resume
            </button>
          </div>
        </>
      )}
    </motion.section>
  );
}

function LinkedAccountCard({ type, username, icon: Icon, color, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(username || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(username || "");
  }, [username]);

  const handleSave = async () => {
    setError("");

    if (!value.trim()) {
      setError(`${type} username is required.`);
      return;
    }

    try {
      setIsSaving(true);
      await onSave(value.trim());
      setIsEditing(false);
      toast.success(`${type} username updated.`);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-3 ${color}`}>
            <Icon size={21} />
          </div>

          <div>
            <p className="font-semibold text-slate-900">{type}</p>
            <p className="mt-1 text-sm text-slate-500">
              {username || "No username added"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setIsEditing((currentValue) => !currentValue);
          }}
          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-t border-slate-100 pt-5">
              <label className="text-sm font-medium text-slate-700">
                Username
              </label>

              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
              />

              {error && (
                <p className="mt-2 text-sm text-rose-600">{error}</p>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSave}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setValue(username || "");
                    setError("");
                    setIsEditing(false);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// function ResumeCard({ resume, onUploadResume }) {
//   const hasResume = Boolean(resume);

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 0, y: 0 }}
//       className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
//     >
//       <div className="flex items-center gap-3">
//         <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
//           <FileText size={22} />
//         </div>

//         <div>
//           <p className="text-lg font-bold text-slate-900">Resume</p>
//           <p className="mt-1 text-sm text-slate-500">
//             {hasResume
//               ? "This resume is used across your AI placement tools."
//               : "Upload a resume to unlock personalized AI analysis."}
//           </p>
//         </div>
//       </div>

//       {hasResume ? (
//         <>
//           <a
//             href={resume.fileUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
//           >
//             <span className="truncate">{resume.originalName}</span>
//             <ExternalLink size={17} className="shrink-0" />
//           </a>

//           <div className="mt-5 grid gap-2 text-sm text-slate-600">
//             <p className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Resume Analyzer</p>
//             <p className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> AI Job Matcher</p>
//             <p className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> AI Next Steps</p>
//           </div>

//           <div className="mt-6 flex flex-wrap gap-3">
//             <a
//               href={resume.fileUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
//             >
//               View Resume
//             </a>

//             <button
//               type="button"
//               onClick={onUploadResume}
//               className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
//             >
//               Update Resume
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <p className="mt-6 text-sm text-slate-500">No resume uploaded.</p>

//           <div className="mt-4 grid gap-1 text-sm text-slate-500">
//             <p>• Resume Analyzer</p>
//             <p>• AI Job Matcher</p>
//             <p>• AI Next Steps</p>
//           </div>

//           <button
//             type="button"
//             onClick={onUploadResume}
//             className="mt-6 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
//           >
//             <Upload size={16} />
//             Upload Resume
//           </button>
//         </>
//       )}
//     </motion.section>
//   );
// }

function TargetCompanyCard({ company, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(company || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(company || "");
  }, [company]);

  const handleSave = async () => {
    if (!value.trim()) {
      setError("Target company is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      await onSave(value.trim());
      setIsEditing(false);
      toast.success("Target company updated.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target size={19} className="text-violet-600" />
            <p className="text-lg font-bold text-slate-900">Target Company</p>
          </div>

          <p className="mt-4 text-xl font-semibold text-slate-800">
            {company || "Not set"}
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            This company is used as the default company when generating AI Next Steps.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((currentValue) => !currentValue)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Change Company
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-slate-100 pt-5">
              <label className="text-sm font-medium text-slate-700">
                Company
              </label>

              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-500"
              />

              {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSave}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setValue(company || "");
                    setError("");
                    setIsEditing(false);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const resumeInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [isResumeLoading, setIsResumeLoading] = useState(true);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);
  const [isResumeUploading, setIsResumeUploading] = useState(false);

  const loadResume = async () => {
    try {
      setIsResumeLoading(true);

      const response = await getCurrentResume();

      setResume(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsResumeLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

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
      resumeInputRef.current.value = "";
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
          <p className="text-lg font-bold text-slate-900">Linked Accounts</p>
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
          isUploading={isResumeUploading}
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