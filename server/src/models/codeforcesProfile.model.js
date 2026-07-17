import mongoose from "mongoose";

const contestHistorySchema = new mongoose.Schema(
    {
        contestName: {
            type: String,
            required: true,
        },

        contestDate: {
            type: Date,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },

        ratingChange: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const codeforcesProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
            trim: true,
        },

        currentRating: {
            type: Number,
            default: 0,
        },

        maxRating: {
            type: Number,
            default: 0,
        },

        currentRank: {
            type: String,
            default: "",
        },

        maxRank: {
            type: String,
            default: "",
        },

        totalSolved: {
            type: Number,
            default: 0,
        },

        contestsAttended: {
            type: Number,
            default: 0,
        },

        contestHistory: {
            type: [contestHistorySchema],
            default: [],
        },

        submissionsLastWeek: {
            type: Number,
            default: 0,
        },

        submissionsLastMonth: {
            type: Number,
            default: 0,
        },
        joinedYear: {
            type: Number,
        },
        lastFetchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const CodeforcesProfile = mongoose.model(
    "CodeforcesProfile",
    codeforcesProfileSchema
);