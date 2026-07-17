import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { CodeforcesProfile } from "../models/codeforcesProfile.model.js";
import { CodeforcesHistory } from "../models/codeforcesHistory.model.js";

import { fetchCodeforcesProfile, fetchCodeforcesContestHistory, fetchCodeforcesSubmissions } from "../services/codeforces.service";

const CODEFORCES_CACHE_DURATION = 12 * 60 * 60 * 1000;

const CODEFORCES_REFRESH_DURATION = 30 * 60 * 1000;


const fetchLatestCodeforcesData = async (username) => {

    const [profile, contest, submissions] = await Promise.all([
        fetchCodeforcesProfile(username),
        fetchCodeforcesContestHistory(username),
        fetchCodeforcesSubmissions(username),
    ]);

    return {
        username,
        ...profile,
        ...contest,
        ...submissions,
        lastFetchedAt: new Date(),
    };
};

const hasProfileChanged = (existingProfile, latestProfile) => {

    return (
        existingProfile.currentRating !== latestProfile.currentRating ||
        existingProfile.maxRating !== latestProfile.maxRating ||
        existingProfile.totalSolved !== latestProfile.totalSolved ||
        existingProfile.contestsAttended !== latestProfile.contestsAttended
    );

};

const createHistorySnapshot = async (userId, profileData) => {

    await CodeforcesHistory.create({
        user: userId,

        currentRating: profileData.currentRating,

        maxRating: profileData.maxRating,

        totalSolved: profileData.totalSolved,

        contestsAttended: profileData.contestsAttended,

        fetchedAt: profileData.lastFetchedAt,
    });

};


