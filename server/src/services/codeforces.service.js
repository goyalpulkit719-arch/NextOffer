import axios from "axios";

export const fetchCodeforcesProfile = async (username) => {

    const { data } = await axios.get(
        `https://codeforces.com/api/user.info?handles=${username}`
    );

    if (data.status !== "OK") {
        const error = new Error(data.comment || "Failed to fetch Codeforces data.");
        error.statusCode = 400;
        throw error;
    }
    
    const user = data.result[0];

    return {
        username: user.handle,

        currentRating: user.rating || 0,

        maxRating: user.maxRating || 0,

        currentRank: user.rank || "",

        maxRank: user.maxRank || "",
    };
};


export const fetchCodeforcesContestHistory = async (username) => {

    const { data } = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${username}`
    );

    if (data.status !== "OK") {
        const error = new Error(data.comment || "Failed to fetch Codeforces data.");
        error.statusCode = 400;
        throw error;
    }

    const history = data.result.slice(-15);

    const contestHistory = history.map((contest) => ({
        contestName: contest.contestName,

        contestDate: new Date(contest.ratingUpdateTimeSeconds * 1000),

        rating: contest.newRating,

        ratingChange: contest.newRating - contest.oldRating,
    }));

    return {
        contestsAttended: data.result.length,

        contestHistory,
    };
};


export const fetchCodeforcesSubmissions = async (username) => {

    const { data } = await axios.get(
        `https://codeforces.com/api/user.status?handle=${username}`
    );

    const submissions = data.result;

    let joinedYear = null;

    if (submissions.length > 0) {
        const oldestSubmission =
            submissions[submissions.length - 1];

        joinedYear = new Date(
            oldestSubmission.creationTimeSeconds * 1000
        ).getFullYear();
    }

    const now = Date.now();

    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    const solvedProblems = new Set();

    let submissionsLastWeek = 0;

    let submissionsLastMonth = 0;

    for (const submission of submissions) {

        const submissionTime =
            submission.creationTimeSeconds * 1000;

        if (submissionTime >= oneWeekAgo) {
            submissionsLastWeek++;
        }

        if (submissionTime >= oneMonthAgo) {
            submissionsLastMonth++;
        }

        if (submission.verdict !== "OK") {
            continue;
        }

        solvedProblems.add(
            `${submission.problem.contestId}-${submission.problem.index}`
        );
    }

    return {
        totalSolved: solvedProblems.size,

        submissionsLastWeek,

        submissionsLastMonth,

        joinedYear,
    };
};