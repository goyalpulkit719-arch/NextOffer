import mongoose from "mongoose";

const leetcodeHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        totalSolved: {
            type: Number,
            default: 0,
        },

        easySolved: {
            type: Number,
            default: 0,
        },

        mediumSolved: {
            type: Number,
            default: 0,
        },

        hardSolved: {
            type: Number,
            default: 0,
        },

        contestRating: {
            type: Number,
            default: 0,
        },

        contestsAttended: {
            type: Number,
            default: 0,
        },

        totalActiveDays: {
            type: Number,
            default: 0,
        },

        fetchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

leetcodeHistorySchema.index({
    user: 1,
    fetchedAt: -1,
});

export const LeetcodeHistory = mongoose.model(
    "LeetcodeHistory",
    leetcodeHistorySchema
);