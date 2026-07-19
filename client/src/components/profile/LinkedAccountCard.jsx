import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to update this username.";

function LinkedAccountCard({ type, username, icon: Icon, color, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(username || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(username || "");
  }, [username]);

  const handleSave = async () => {
    if (!value.trim()) {
      setError(`${type} username is required.`);
      return;
    }

    try {
      setError("");
      setIsSaving(true);

      await onSave(value.trim());

      setIsEditing(false);
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
            <h2 className="font-semibold text-slate-900">{type}</h2>
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

export default LinkedAccountCard;