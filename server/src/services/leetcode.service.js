import axios from "axios";

export const fetchLeetcodeProfile = async(username) => {

    const {data} = await axios.get(`https://leetcode-api-pied.vercel.app/user/${username}`);

    const acceptedStats = Object.fromEntries(
        data.submitStats.acSubmissionNum.map((item) => [
            item.difficulty,
            item.count,
        ])
    )
    
    return {
        username: data.username,

        totalSolved: acceptedStats.All ?? 0,
        easySolved: acceptedStats.Easy ?? 0,
        mediumSolved: acceptedStats.Medium ?? 0,
        hardSolved: acceptedStats.Hard ?? 0,
    }

};

export const fetchLeetcodeContest = async (username) => {
    const { data } = await axios.get(
        `https://leetcode-api-pied.vercel.app/user/${username}/contests`
    );

    const history = data.userContestRankingHistory
    .sort((a, b) => a.contest.startTime - b.contest.startTime)
    .slice(-15);

    let previousRating = null;
    const contestHistory = history.map((contest) => {
        
        const newRatingChange =
            previousRating === null ? 0 : Math.round(contest.rating) - previousRating;

        previousRating =  Math.round(contest.rating);

        return {
            contestName: contest.contest.title,

            contestDate: new Date(contest.contest.startTime * 1000),

            rating: Math.round(contest.rating),

            ratingChange: newRatingChange,
        }
    });

    const maxContestRating =
        history.length > 0
            ? Math.max(...history.map((contest) => contest.rating))
            : 0;

    return {
        contestRating: Math.round(
            data.userContestRanking?.rating || 0
        ),

        maxContestRating: Math.round(maxContestRating),

        contestsAttended:
            data.userContestRanking?.attendedContestsCount || 0,

        contestHistory,
    };
};

export const fetchLeetcodeCalendar = async (username) => {
    const { data } = await axios.get(
        `https://leetcode-api-pied.vercel.app/user/${username}/calendar`
    );

    return {
        joinedYear: Math.min(...data.activeYears),

        maxStreak: data.streak,

        totalActiveDays: data.totalActiveDays,

        submissionCalendar: data.submissionCalendar,
    };
};

export const fetchLeetcodeSkills = async (username) => {
    const { data } = await axios.get(
        `https://leetcode-api-pied.vercel.app/user/${username}/skills`
    );

    const transformSkills = (skills) =>
        skills.map((skill) => ({
            topic: skill.tagName,
            solved: skill.problemsSolved,
        }));

    return {
        skills: {
            fundamental: transformSkills(data.fundamental),
            intermediate: transformSkills(data.intermediate),
            advanced: transformSkills(data.advanced),
        },
    };
};

