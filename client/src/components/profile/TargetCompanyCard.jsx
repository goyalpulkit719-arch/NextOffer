import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Target } from "lucide-react";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Unable to update target company.";

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
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target size={19} className="text-violet-600" />
            <h2 className="text-lg font-bold text-slate-900">Target Company</h2>
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
          onClick={() => {
            setError("");
            setIsEditing((currentValue) => !currentValue);
          }}
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

export default TargetCompanyCard;