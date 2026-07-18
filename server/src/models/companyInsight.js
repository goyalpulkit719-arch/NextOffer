import mongoose from "mongoose";

const companyInsightSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    normalizedName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    companyOverview: {
      founded: {
        type: String,
        default: "",
      },

      headquarters: {
        type: String,
        default: "",
      },

      employees: {
        type: String,
        default: "",
      },

      industry: {
        type: String,
        default: "",
      },

      about: {
        type: String,
        default: "",
      },
    },

    hiringProcess: [
      {
        round: {
            type: String,
            required: true,
        },

        duration: {
            type: String,
            default: "",
        },

        focus: [
            {
            type: String,
            },
        ],

        description: {
            type: String,
            required: true,
        },

        preparationTips: [
            {
            type: String,
            },
        ],
      }
    ],
    difficultyAnalysis: {
        dsa: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },

        oops: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },

        dbms: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },

        os: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },

        cn: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },

        systemDesign: {
            level: {
                type: String,
                default: "",
            },
            reasoning: {
                type: String,
                default: "",
            },
        },
        aptitude: {
            level: {
                type: String,
                default: "",
            },

            reasoning: {
                type: String,
                default: "",
            },
        },
    },

    importantDSATopics: [
      {
        type: String,
      },
    ],

    leetcodeQuestions: [
        {
            title: {
            type: String,
            required: true,
            },

            topic: {
            type: String,
            required: true,
            },

            difficulty: {
            type: String,
            required: true,
            },

            link: {
            type: String,
            required: true,
            },
        },
    ],

    coreSubjects: [
      {
        subject: {
          type: String,
          required: true,
        },

        topics: [
          {
            type: String,
          },
        ],
      },
    ],

    technicalSkills: [
      {
        type: String,
      },
    ],

    resumeTips: [
      {
        title: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },
      },
    ],

    workCulture: {
      type: String,
      default: "",
    },

    keyQualities: [
      {
        quality: {
          type: String,
          required: true,
        },

        explanation: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CompanyInsight = mongoose.model(
  "CompanyInsight",
  companyInsightSchema
);

export default CompanyInsight;