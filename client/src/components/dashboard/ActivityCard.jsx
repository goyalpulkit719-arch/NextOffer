import { Activity, CalendarDays, Flame } from "lucide-react";

function ActivityCard({
  weekly,
  monthly,
  totalDays,
  totalLabel = "Lifetime",
  totalDescription = "active days",
}) {
  const items = [
    {
      label: "This week",
      value: weekly || 0,
      description: "submissions",
      icon: Activity,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "This month",
      value: monthly || 0,
      description: "submissions",
      icon: Flame,
      color: "text-orange-600 bg-orange-50",
    },
    {
      label: totalLabel,
      value: totalDays || 0,
      description: totalDescription,
      icon: CalendarDays,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">Activity</h3>
      <p className="mt-1 text-sm text-slate-500">Your current practice rhythm</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {items.map(({ label, value, description, icon: Icon, color }) => (
          <div key={label} className="rounded-xl bg-slate-50 p-4">
            <div className={`inline-flex rounded-lg p-2 ${color}`}>
              <Icon size={16} />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {label}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityCard;