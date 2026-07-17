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

const topicSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true,
        },

        solved: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const leetcodeProfileSchema = new mongoose.Schema(
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

        maxContestRating: {
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

        joinedYear: {
            type: Number,
        },

        maxStreak: {
            type: Number,
            default: 0,
        },

        totalActiveDays: {
            type: Number,
            default: 0,
        },

        submissionCalendar: {
            type: Map,
            of: Number,
            default: {},
        },

        skills: {
            fundamental: {
                type: [topicSchema],
                default: [],
            },

            intermediate: {
                type: [topicSchema],
                default: [],
            },

            advanced: {
                type: [topicSchema],
                default: [],
            },
        },

        lastFetchedAt: {
            type: Date,
            default: Date.now,
        },
        
        submissionsLastWeek: {
            type: Number,
            default: 0,
        },

        submissionsLastMonth: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const LeetcodeProfile = mongoose.model(
    "LeetcodeProfile",
    leetcodeProfileSchema
);