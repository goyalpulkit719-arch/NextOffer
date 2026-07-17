import mongoose from "mongoose";

const codeforcesHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        currentRating: {
            type: Number,
            default: 0,
        },

        maxRating: {
            type: Number,
            default: 0,
        },

        totalSolved: {
            type: Number,
            default: 0,
        },

        contestsAttended: {
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

codeforcesHistorySchema.index({
    user: 1,
    fetchedAt: -1,
});

export const CodeforcesHistory = mongoose.model(
    "CodeforcesHistory",
    codeforcesHistorySchema
);