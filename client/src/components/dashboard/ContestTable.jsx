import { format } from "date-fns";

function ContestTable({ contestHistory }) {
  if (!contestHistory?.length) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900">Recent contests</h3>
        <p className="mt-1 text-sm text-slate-500">
          Latest rating updates from your contest history
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-165 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Contest</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Rating</th>
              <th className="px-5 py-3 font-semibold">Change</th>
              <th className="px-5 py-3 font-semibold">Result</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {[...contestHistory].reverse().map((contest) => {
              const positive = contest.ratingChange > 0;
              const negative = contest.ratingChange < 0;

              return (
                <tr key={`${contest.contestName}-${contest.contestDate}`} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {contest.contestName}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {format(new Date(contest.contestDate), "dd MMM yyyy")}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {contest.rating}
                  </td>
                  <td className={`px-5 py-4 font-semibold ${
                    positive
                      ? "text-emerald-600"
                      : negative
                        ? "text-rose-600"
                        : "text-slate-500"
                  }`}>
                    {positive ? "+" : ""}
                    {contest.ratingChange}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      positive
                        ? "bg-emerald-50 text-emerald-700"
                        : negative
                          ? "bg-rose-50 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                    }`}>
                      {positive ? "Improved" : negative ? "Decreased" : "No change"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ContestTable;