import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },
    
    originalName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    isCurrent: {
      type: Boolean,
      default: true,
    },

    isAnalyzed: {
      type: Boolean,
      default: false,
    },

    analysis: {
      placementReadiness: {
        score: {
          type: Number,
          min: 0,
          max: 100,
        },

        level: {
          type: String,
          enum: ["Poor", "Needs Improvement", "Average", "Good", "Excellent"],
        },
      },

      ats: {
        score: {
          type: Number,
          min: 0,
          max: 100,
        },

        feedback: {
          type: String,
          default: "",
        },
      },

      strengths: [
        {
          type: String,
        },
      ],

      improvements: [
        {
          type: String,
        },
      ],

      sectionScores: {
        projects: {
          score: Number,
          feedback: String,
        },

        skills: {
          score: Number,
          feedback: String,
        },

        atsCompatibility: {
          score: Number,
          feedback: String,
        },

        resumeStructure: {
          score: Number,
          feedback: String,

          checks: {
            contact: Boolean,
            education: Boolean,
            skills: Boolean,
            projects: Boolean,
            experience: Boolean,
            achievements: Boolean,
            links: Boolean,
          },
        },

        grammar: {
          score: Number,
          feedback: String,
        },
      },

      missingKeywords: [
        {
          type: String,
        },
      ],

      priorityFixes: [
        {
          title: String,
          reason: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
