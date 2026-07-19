import {
  eachDayOfInterval,
  format,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";

const getColor = (count) => {
  if (!count) return "bg-slate-100";
  if (count <= 2) return "bg-emerald-200";
  if (count <= 5) return "bg-emerald-400";
  if (count <= 10) return "bg-emerald-500";
  return "bg-emerald-700";
};

function SubmissionHeatmap({ submissionCalendar, calendarAvailable }) {
  if (!calendarAvailable) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900">Submission activity</h3>
        <div className="mt-5 rounded-xl bg-slate-50 p-8 text-center">
          <p className="font-medium text-slate-700">Calendar is unavailable</p>
          <p className="mt-1 text-sm text-slate-500">
            Your LeetCode submission calendar may be private.
          </p>
        </div>
      </section>
    );
  }

  const today = startOfDay(new Date());
  const startDate = startOfWeek(subDays(today, 364));
  const days = eachDayOfInterval({ start: startDate, end: today });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">Submission activity</h3>
          <p className="mt-1 text-sm text-slate-500">Your last 12 months</p>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500">
          Less
          {["bg-slate-100", "bg-emerald-200", "bg-emerald-400", "bg-emerald-500", "bg-emerald-700"].map((color) => (
            <span key={color} className={`h-3 w-3 rounded-sm ${color}`} />
          ))}
          More
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="grid min-w-175 grid-flow-col grid-rows-7 gap-1">
          {days.map((day) => {
            const timestamp = Math.floor(day.getTime() / 1000);
            const submissions = submissionCalendar?.[timestamp] || 0;

            return (
              <div
                key={timestamp}
                title={`${format(day, "dd MMM yyyy")}: ${submissions} submissions`}
                className={`h-3 w-3 rounded-sm transition hover:ring-2 hover:ring-slate-400 ${getColor(submissions)}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SubmissionHeatmap;