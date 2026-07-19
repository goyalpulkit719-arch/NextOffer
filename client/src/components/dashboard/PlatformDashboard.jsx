import {
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Flame,
  Gauge,
  Medal,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import ProfileHeader from "./ProfileHeader";
import StatCard from "./StatCard";
import RatingChart from "./RatingChart";
import SkillsCard from "./SkillsCard";
import ActivityCard from "./ActivityCard";
import ContestTable from "./ContestTable";


function PlatformDashboard({
  platform,
  profile,
  error,
  isLoading,
  onRefresh,
  onHistory,
  isRefreshing,
}) {
  const isLeetcode = platform === "leetcode";

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-22 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-42 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="h-96 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
        <p className="font-semibold">Could not load {isLeetcode ? "LeetCode" : "Codeforces"} data</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const totalSolved = profile.totalSolved || 0;
  const contestHistory = profile.contestHistory || [];
  const activeDaysLast365 = isLeetcode
  ? Object.entries(profile.submissionCalendar || {}).filter(
      ([timestamp, submissions]) =>
        Number(timestamp) * 1000 >= Date.now() - 365 * 24 * 60 * 60 * 1000 &&
        Number(submissions) > 0
    ).length
  : 0;
  const firstContest = contestHistory[0];
  const lastContest = contestHistory[contestHistory.length - 1];
  const ratingChange = firstContest && lastContest
    ? lastContest.rating - firstContest.rating
    : 0;

  const strongestSkill = isLeetcode
    ? Object.values(profile.skills || {})
        .flat()
        .sort((first, second) => second.solved - first.solved)[0]
    : null;

  const stats = isLeetcode
    ? [
        {
          icon: CheckCircle2,
          label: "Total solved",
          value: totalSolved,
          description: "problems completed",
          color: "blue",
        },
        {
          icon: Target,
          label: "Easy",
          value: profile.easySolved || 0,
          description: "foundation problems",
          color: "green",
          progress: totalSolved ? ((profile.easySolved || 0) / totalSolved) * 100 : 0,
        },
        {
          icon: Zap,
          label: "Medium",
          value: profile.mediumSolved || 0,
          description: "interview-level problems",
          color: "yellow",
          progress: totalSolved ? ((profile.mediumSolved || 0) / totalSolved) * 100 : 0,
        },
        {
          icon: Flame,
          label: "Hard",
          value: profile.hardSolved || 0,
          description: "advanced challenges",
          color: "red",
          progress: totalSolved ? ((profile.hardSolved || 0) / totalSolved) * 100 : 0,
        },
        {
          icon: Gauge,
          label: "Contest rating",
          value: profile.contestRating || 0,
          description: "current rating",
          color: "blue",
        },
        {
          icon: Award,
          label: "Max rating",
          value: profile.maxContestRating || 0,
          description: "personal best",
          color: "purple",
        },
        {
          icon: Flame,
          label: "Max streak",
          value: profile.maxStreak || 0,
          description: "consecutive active days",
          color: "orange",
        },
        {
          icon: CalendarDays,
          label: "Active days",
          value: activeDaysLast365,
          description: "active in the last 365 days",
          color: "green",
        },
      ]
    : [
        {
          icon: CheckCircle2,
          label: "Problems solved",
          value: totalSolved,
          description: "unique accepted problems",
          color: "blue",
        },
        {
          icon: Gauge,
          label: "Current rating",
          value: profile.currentRating || 0,
          description: "current competitive rating",
          color: "blue",
        },
        {
          icon: Award,
          label: "Max rating",
          value: profile.maxRating || 0,
          description: "personal best rating",
          color: "purple",
        },
        {
          icon: Trophy,
          label: "Contests",
          value: profile.contestsAttended || 0,
          description: "rating contests attended",
          color: "orange",
        },
        {
          icon: Medal,
          label: "Current rank",
          value: profile.currentRank || "Unrated",
          description: "current Codeforces rank",
          color: "blue",
        },
        {
          icon: Trophy,
          label: "Max rank",
          value: profile.maxRank || "Unrated",
          description: "highest rank achieved",
          color: "purple",
        },
        {
          icon: BarChart3,
          label: "Last 7 days",
          value: profile.submissionsLastWeek || 0,
          description: "submissions made",
          color: "green",
        },
        {
          icon: CalendarDays,
          label: "Last 30 days",
          value: profile.submissionsLastMonth || 0,
          description: "submissions made",
          color: "yellow",
        },
      ];

  return (
    <div className="space-y-6">
      <ProfileHeader
        title={isLeetcode ? "LeetCode analytics" : "Codeforces analytics"}
        username={profile.username}
        subtitle={
          profile.joinedYear
            ? `Joined in ${profile.joinedYear}`
            : "Competitive programming profile"
        }
        onRefresh={onRefresh}
        onHistory={onHistory}
        isRefreshing={isRefreshing}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <RatingChart
        title={isLeetcode ? "LeetCode contest rating" : "Codeforces rating"}
        contestHistory={contestHistory}
        color={isLeetcode ? "#f97316" : "#2563eb"}
      />

      {isLeetcode && (
        <ActivityCard
          weekly={profile.submissionsLastWeek}
          monthly={profile.submissionsLastMonth}
          totalDays={activeDaysLast365}
          totalLabel="Last 365 days"
          totalDescription="active days"
        />
      )}

      {isLeetcode && <SkillsCard skills={profile.skills} />}

      <ContestTable contestHistory={contestHistory} />
    </div>
  );
}

export default PlatformDashboard;