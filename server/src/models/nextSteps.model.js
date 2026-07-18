    import mongoose from "mongoose";

    const nextStepsSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            companyName: {
                type: String,
                required: true,
                trim: true,
            },

            normalizedCompany: {
                type: String,
                required: true,
                index: true
            },

            resumeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resume",
                default: null,
            },

            roadmap: {
                currentObjective: {
                    type: String,
                    required: true,
                },

                placementReadiness: {
                    score: {
                        type: Number,
                        required: true,
                        min: 0,
                        max: 100,
                    },
                    level: {
                        type: String,
                        required: true,
                    },
                    reason: {
                        type: String,
                        required: true,
                    },
                },

                estimatedTimeline: {
                    type: String,
                    required: true,
                },

                currentStage: {
                    stage: {
                        type: String,
                        required: true,
                        enum: [
                            "Foundation",
                            "Skill Building",
                            "Interview Preparation",
                            "Application Ready",
                        ],
                    },
                    reason: {
                        type: String,
                        required: true,
                    }
                },

                biggestGaps: [
                    {
                        gap: {
                            type: String,
                            required: true,
                        },
                        priority: {
                            type: String,
                            required: true,
                            enum: ["High", "Medium", "Low"],
                        },
                        reason: {
                            type: String,
                            required: true,
                        },
                    },
                ],

                dsaRoadmap: [
                    {
                        topic: {
                            type: String,
                            required: true,
                        },
                        priority: {
                            type: String,
                            required: true,
                            enum: ["High", "Medium", "Low"],
                        },
                        difficulty: {
                            type: String,
                            required: true,
                            enum: ["Easy", "Medium", "Hard"],
                        },
                        reason: {
                            type: String,
                            required: true,
                        },
                        recommendedQuestionCount: {
                            type: Number,
                            required: true,
                        },
                    },
                ],

                contestStrategy: [
                    {
                        type: String,
                    },
                ],

                companySpecificFocus: [
                    {
                        area: {
                            type: String,
                            required: true,
                        },
                        allocation: {
                            type: String,
                            required: true,
                        },
                        reason: {
                            type: String,
                            required: true,
                        },
                    },
                ],

                weeklyActionPlan: [
                    {
                        week: {
                            type: String,
                            required: true,
                        },

                        dsa: {
                            type: String,
                            required: true,
                        },

                        coreSubject: {
                            type: String,
                            required: true,
                        },

                        contestActivity: {
                            type: String,
                            required: true,
                        },

                        resumeOrProjectTask: {
                            type: String,
                            required: true,
                        },
                    },
                ],

                monthlyMilestones: [
                    {
                        type: String,
                    },
                ],

                interviewPreparationStrategy: [
                    {
                        area: {
                            type: String,
                            required: true,
                        },
                        strategy: {
                            type: String,
                            required: true,
                        },
                    },
                ],

                resumeActionPlan: {
                    type: String,
                    required: true,
                },
            },

            generatedAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
    );

    nextStepsSchema.index({
        userId: 1,
        companyName: 1,
        resumeId: 1,
    });

    const NextSteps = mongoose.model("NextSteps", nextStepsSchema);

    export default NextSteps;