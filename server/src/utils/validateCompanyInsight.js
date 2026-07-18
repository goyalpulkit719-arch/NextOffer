const validateCompanyInsight = (analysis) => {
  if (!analysis || typeof analysis !== "object") {
    throw new Error("Invalid AI response.");
  }

  const requiredFields = [
    "companyName",
    "companyOverview",
    "hiringProcess",
    "difficultyAnalysis",
    "importantDSATopics",
    "leetcodeQuestions",
    "coreSubjects",
    "technicalSkills",
    "resumeTips",
    "workCulture",
    "keyQualities",
  ];

  for (const field of requiredFields) {
    if (!(field in analysis)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

export default validateCompanyInsight;