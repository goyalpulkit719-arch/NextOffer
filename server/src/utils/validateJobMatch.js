const validateJobMatch = (analysis) => {

    if (!analysis || typeof analysis !== "object") {
        throw new Error("Invalid job match analysis.");
    }

    const {
        matchPercentage,
        verdict,
        overallAnalysis,
        matchingQualifications,
        missingQualifications,
        strengths,
        weaknesses,
        suggestions,
    } = analysis;

    if (
        typeof matchPercentage !== "number" ||
        matchPercentage < 0 ||
        matchPercentage > 100
    ) {
        throw new Error("Invalid match percentage.");
    }

    const validVerdicts = [
        "Excellent Fit",
        "Strong Fit",
        "Moderate Fit",
        "Weak Fit",
        "Poor Fit",
    ];

    if (!validVerdicts.includes(verdict)) {
        throw new Error("Invalid verdict.");
    }

    if (
        typeof overallAnalysis !== "string" ||
        !overallAnalysis.trim()
    ) {
        throw new Error("Invalid overall analysis.");
    }

    if (
        !Array.isArray(matchingQualifications) ||
        matchingQualifications.length !== 4
    ) {
        throw new Error(
            "Matching qualifications must contain exactly 4 items."
        );
    }

    if (
        !Array.isArray(missingQualifications) ||
        missingQualifications.length !== 4
    ) {
        throw new Error(
            "Missing qualifications must contain exactly 4 items."
        );
    }

    if (
        !Array.isArray(strengths) ||
        strengths.length !== 4
    ) {
        throw new Error(
            "Strengths must contain exactly 4 items."
        );
    }

    if (
        !Array.isArray(weaknesses) ||
        weaknesses.length !== 4
    ) {
        throw new Error(
            "Weaknesses must contain exactly 4 items."
        );
    }

    if (
        !Array.isArray(suggestions) ||
        suggestions.length !== 4
    ) {
        throw new Error(
            "Suggestions must contain exactly 4 items."
        );
    }

};

export default validateJobMatch;