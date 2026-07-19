import { useRef } from "react";
import { motion } from "framer-motion";
import { AtSign, LoaderCircle, Upload } from "lucide-react";

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

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {user.name}
          </h1>

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

export default ProfileHeaderCard;