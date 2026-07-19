import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RatingTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const contest = payload[0].payload;
  const isPositive = contest.ratingChange > 0;
  const isNegative = contest.ratingChange < 0;

  return (
    <div className="min-w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <p className="font-semibold text-slate-900">{contest.contestName}</p>
      <p className="mt-1 text-xs text-slate-500">
        {format(new Date(contest.contestDate), "dd MMM yyyy")}
      </p>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-500">Current rating</p>
          <p className="text-xl font-bold text-slate-900">{contest.rating}</p>
        </div>

        <span
          className={`rounded-lg px-2 py-1 text-xs font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : isNegative
                ? "bg-rose-50 text-rose-600"
                : "bg-slate-100 text-slate-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {contest.ratingChange}
        </span>
      </div>
    </div>
  );
}

function RatingChart({ contestHistory, title, color }) {
  const chartData = contestHistory.map((contest) => ({
    ...contest,
    label: format(new Date(contest.contestDate), "dd MMM"),
  }));

  if (!chartData.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p className="font-medium text-slate-700">No contest history yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Participate in contests to see your rating trend here.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">
          Rating movement across your recent contests
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 30, right: 18, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id={`rating-gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={22}
            />

            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip content={<RatingTooltip />} />

            <Area
              type="monotone"
              dataKey="rating"
              stroke={color}
              strokeWidth={3}
              fill={`url(#rating-gradient-${color})`}
              animationDuration={900}
              dot={({ cx, cy, payload }) => (
                <g key={`${payload.contestName}-${payload.contestDate}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="white"
                    stroke={color}
                    strokeWidth={2.5}
                  />

                  {payload.ratingChange > 40 && (
                    <g>
                      <rect
                        x={cx - 17}
                        y={cy - 35}
                        width="34"
                        height="18"
                        rx="7"
                        fill="#dcfce7"
                      />
                      <text
                        x={cx}
                        y={cy - 22}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#16a34a"
                      >
                        +{payload.ratingChange}
                      </text>
                    </g>
                  )}
                </g>
              )}
              activeDot={{ r: 6, strokeWidth: 3, stroke: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}

export default RatingChart;