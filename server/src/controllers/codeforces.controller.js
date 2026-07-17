import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { CodeforcesProfile } from "../models/codeforcesProfile.model.js";
import { CodeforcesHistory } from "../models/codeforcesHistory.model.js";

import { fetchCodeforcesProfile, fetchCodeforcesContestHistory, fetchCodeforcesSubmissions } from "../services/codeforces.service.js";

const CODEFORCES_CACHE_DURATION = 12 * 60 * 60 * 1000;

const CODEFORCES_REFRESH_DURATION = 30 * 60 * 1000;


const fetchLatestCodeforcesData = async (username) => {

    const [profile, contest, submissions] = await Promise.all([
        fetchCodeforcesProfile(username),
        fetchCodeforcesContestHistory(username),
        fetchCodeforcesSubmissions(username),
    ]);

    return {
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


export const getCodeforcesDashboard = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("codeforcesUsername");

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    const username = user.codeforcesUsername;

    let profile = await CodeforcesProfile.findOne({
        user: req.user._id,
    });

    if (!profile) {

        const latestData = await fetchLatestCodeforcesData(username);

        profile = await CodeforcesProfile.create({
            user: req.user._id,
            ...latestData,
        });

        await createHistorySnapshot(req.user._id, latestData);

        return res.status(201).json({
            success: true,
            message: "Codeforces profile fetched successfully.",
            data: profile,
        });
    }

    const cacheExpired =
        Date.now() - profile.lastFetchedAt.getTime() >=
        CODEFORCES_CACHE_DURATION;

    if (!cacheExpired) {
        return res.status(200).json({
            success: true,
            message: "Codeforces profile fetched successfully.",
            data: profile,
        });
    }

    const latestData = await fetchLatestCodeforcesData(username);

    if (hasProfileChanged(profile, latestData)) {
        await createHistorySnapshot(req.user._id, latestData);
    }

    Object.assign(profile, latestData);

    await profile.save();

    return res.status(200).json({
        success: true,
        message: "Codeforces profile updated successfully.",
        data: profile,
    });

});


export const refreshCodeforcesProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("codeforcesUsername");

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    const profile = await CodeforcesProfile.findOne({
        user: req.user._id,
    });

    if (!profile) {
        const error = new Error("Codeforces profile not found.");
        error.statusCode = 404;
        throw error;
    }

    const nextRefresh =
        profile.lastFetchedAt.getTime() + CODEFORCES_REFRESH_DURATION;

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

    const latestData = await fetchLatestCodeforcesData(
        user.codeforcesUsername
    );

    if (hasProfileChanged(profile, latestData)) {
        await createHistorySnapshot(req.user._id, latestData);
    }

    Object.assign(profile, latestData);

    await profile.save();

    return res.status(200).json({
        success: true,
        message: "Codeforces profile refreshed successfully.",
        data: profile,
    });

});


export const getCodeforcesHistory = asyncHandler(async (req, res) => {

    const history = await CodeforcesHistory.find({
        user: req.user._id,
    }).sort({ fetchedAt: -1 });

    return res.status(200).json({
        success: true,
        message: "Codeforces history fetched successfully.",
        data: history,
    });

});


export const updateCodeforcesUsername = asyncHandler(async (req, res) => {

    const { codeforcesUsername } = req.body;

    if (!codeforcesUsername?.trim()) {
        const error = new Error("Codeforces username is required.");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
    }

    if (user.codeforcesUsername === codeforcesUsername.trim()) {
        const error = new Error("This username is already linked.");
        error.statusCode = 400;
        throw error;
    }

    try {
        await fetchCodeforcesProfile(codeforcesUsername.trim());
    } catch (err) {
        const error = new Error("Invalid Codeforces username.");
        error.statusCode = 400;
        throw error;
    }

    user.codeforcesUsername = codeforcesUsername.trim();

    await user.save();

    await CodeforcesProfile.deleteOne({
        user: req.user._id,
    });

    await CodeforcesHistory.deleteMany({
        user: req.user._id,
    });

    return res.status(200).json({
        success: true,
        message: "Codeforces username updated successfully.",
        data: null,
    });

});