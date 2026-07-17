import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";
import { LeetcodeProfile } from "../models/leetcodeProfile.model.js";
import { LeetcodeHistory } from "../models/leetcodeHistory.model.js";

import { fetchLeetcodeProfile, fetchLeetcodeContest, fetchLeetcodeCalendar, fetchLeetcodeSkills, } from "../services/leetcode.service.js";

const LEETCODE_CACHE_DURATION = 12 * 60 * 60 * 1000;
const LEETCODE_REFRESH_DURATION = 30 * 60 * 1000;

const fetchLatestLeetcodeData = async (username) => {
    const [profile, contest, calendar, skills] = await Promise.all([
        fetchLeetcodeProfile(username),
        fetchLeetcodeContest(username),
        fetchLeetcodeCalendar(username),
        fetchLeetcodeSkills(username),
    ]);

    return {
        username,
        ...profile,
        ...contest,
        ...calendar,
        ...skills,
        lastFetchedAt: new Date(),
    };
};

const hasProfileChanged = (existingProfile, latestProfile) => {
    return (
        existingProfile.totalSolved !== latestProfile.totalSolved ||
        existingProfile.easySolved !== latestProfile.easySolved ||
        existingProfile.mediumSolved !== latestProfile.mediumSolved ||
        existingProfile.hardSolved !== latestProfile.hardSolved ||
        existingProfile.contestRating !== latestProfile.contestRating ||
        existingProfile.contestsAttended !== latestProfile.contestsAttended ||
        existingProfile.totalActiveDays !== latestProfile.totalActiveDays
    );
};

const createHistorySnapshot = async (userId, profileData) => {
    await LeetcodeHistory.create({
        user: userId,
        totalSolved: profileData.totalSolved,
        easySolved: profileData.easySolved,
        mediumSolved: profileData.mediumSolved,
        hardSolved: profileData.hardSolved,
        contestRating: profileData.contestRating,
        contestsAttended: profileData.contestsAttended,
        totalActiveDays: profileData.totalActiveDays,
        fetchedAt: profileData.lastFetchedAt,
    });
};


export const getLeetcodeDashboard = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("leetcodeUsername");

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    const username = user.leetcodeUsername;

    let profile = await LeetcodeProfile.findOne({user: req.user._id});

    if(!profile) {
        const latestData = await fetchLatestLeetcodeData(username);

        profile = await LeetcodeProfile.create({
            user: req.user._id,
            ...latestData,
        });

        await createHistorySnapshot(req.user._id, latestData);

        return res.status(201).json({
            success: true,
            message: "LeetCode profile fetched successfully.",
            data: profile,
        });
    }

    const cacheExpired = Date.now() - profile.lastFetchedAt.getTime() >= LEETCODE_CACHE_DURATION;

    if(!cacheExpired) {
        return res.status(200).json({
            success: true,
            message: "LeetCode profile fetched successfully.",
            data: profile,
        });
    };

    const latestData = await fetchLatestLeetcodeData(usrename);

    if(hasProfileChanged(profile, latestData)) {
        await createHistorySnapshot(req.user._id, latestData);
    };

    
    Object.assign(profile, latestData);
    await profile.save();

    return res.status(200).json({
        success: true,
        message: "LeetCode profile updated successfully.",
        data: profile,
    });

});


export const refreshLeetcodeProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("leetcodeUsername");

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    const profile = await LeetcodeProfile.findOne({
        user: req.user._id,
    });

    if (!profile) {
        const error = new Error("LeetCode profile not found.");
        error.statusCode = 404;
        throw error;
    }


    const nextRefresh =
        profile.lastFetchedAt.getTime() + LEETCODE_REFRESH_DURATION;

    if (Date.now() < nextRefresh) {

        const remainingTime = Math.ceil(
            (nextRefresh - Date.now()) / 60000
        );

        return res.status(429).json({
            success: false,
            message: `You can refresh again in ${remainingTime} minute(s).`,
            remainingTime,
            data: profile,
        });
    }

    const latestData = await fetchLatestLeetcodeData(
        user.leetcodeUsername
    );

    if (hasProfileChanged(profile, latestData)) {
        await createHistorySnapshot(req.user._id, latestData);
    }

    Object.assign(profile, latestData);

    await profile.save();

    return res.status(200).json({
        success: true,
        message: "LeetCode profile refreshed successfully.",
        data: profile,
    });

});


export const getLeetcodeHistory = asyncHandler(async (req, res) => {

    const history = await LeetcodeHistory.find({
        user: req.user._id,
    })
        .sort({ fetchedAt: -1 });

    return res.status(200).json({
        success: true,
        message: "LeetCode history fetched successfully.",
        data: history,
    });

});


export const updateLeetcodeUsername = asyncHandler(async (req, res) => {

    const { leetcodeUsername } = req.body;

    if (!leetcodeUsername?.trim()) {
        const error = new Error("LeetCode username is required.");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    if (user.leetcodeUsername === leetcodeUsername.trim()) {
        const error = new Error("This username is already linked.");
        error.statusCode = 400;
        throw error;
    }

    try {
        await fetchLeetcodeProfile(leetcodeUsername.trim());
    } catch (err) {
        const error = new Error("Invalid LeetCode username.");
        error.statusCode = 400;
        throw error;
    }

    user.leetcodeUsername = leetcodeUsername.trim();

    await user.save();

    await LeetcodeProfile.deleteOne({
        user: req.user._id,
    });

    await LeetcodeHistory.deleteMany({
        user: req.user._id,
    });

    return res.status(200).json({
        success: true,
        message: "LeetCode username updated successfully.",
        data: null,
    });

});