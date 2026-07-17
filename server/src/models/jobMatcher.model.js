import mongoose from "mongoose";

const jobMatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    matchPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    verdict: {
      type: String,
      enum: [
        "Excellent Fit",
        "Strong Fit",
        "Moderate Fit",
        "Weak Fit",
        "Poor Fit",
      ],
      required: true,
    },

    overallAnalysis: {
      type: String,
      required: true,
      trim: true,
    },

    matchingQualifications: [
      {
        qualification: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],

    missingQualifications: [
      {
        qualification: {
          type: String,
          required: true,
        },
        importance: {
          type: String,
          enum: ["High", "Medium", "Low"],
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],

    strengths: [
      {
        title: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],

    weaknesses: [
      {
        title: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],

    suggestions: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const JobMatch = mongoose.model("JobMatch", jobMatchSchema);

export default JobMatch;