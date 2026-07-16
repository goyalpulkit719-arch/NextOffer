const validateScore = (score, fieldName) => {
    if (
        typeof score !== "number" ||
        Number.isNaN(score) ||
        score < 0 ||
        score > 100
    ) {
        throw new Error(`${fieldName} score must be a number between 0 and 100.`);
    }
};

const validateResumeAnalysis = (analysis) => {

    if (!analysis || typeof analysis !== "object") {
        throw new Error("Invalid analysis received from Gemini.");
    }

    const requiredFields = [
        "placementReadiness",
        "ats",
        "strengths",
        "improvements",
        "sectionScores",
        "missingKeywords",
        "priorityFixes",
    ];

    for (const field of requiredFields) {
        if (!(field in analysis)) {
            throw new Error(`Missing "${field}" in Gemini response.`);
        }
    }

    // Placement Readiness

    validateScore(
        analysis.placementReadiness.score,
        "Placement Readiness"
    );

    const validLevels = [
        "Poor",
        "Needs Improvement",
        "Average",
        "Good",
        "Excellent",
    ];

    if (
        typeof analysis.placementReadiness.level !== "string" ||
        !validLevels.includes(analysis.placementReadiness.level)
    ) {
        throw new Error("Invalid placement readiness level.");
    }

    // ATS

    validateScore(
        analysis.ats.score,
        "ATS"
    );

    if (typeof analysis.ats.feedback !== "string") {
        throw new Error("Invalid ATS feedback.");
    }

    // Arrays

    if (
        !Array.isArray(analysis.strengths) ||
        analysis.strengths.length !== 4
    ) {
        throw new Error("Gemini must return exactly 4 strengths.");
    }

    if (
        !Array.isArray(analysis.improvements) ||
        analysis.improvements.length !== 4
    ) {
        throw new Error("Gemini must return exactly 4 improvements.");
    }

    if (
        !Array.isArray(analysis.missingKeywords) ||
        analysis.missingKeywords.length !== 10
    ) {
        throw new Error("Gemini must return exactly 10 missing keywords.");
    }

    if (
        !Array.isArray(analysis.priorityFixes) ||
        analysis.priorityFixes.length !== 4
    ) {
        throw new Error("Gemini must return exactly 4 priority fixes.");
    }

    // Section Scores

    const sections = [
        "projects",
        "skills",
        "atsCompatibility",
        "resumeStructure",
        "grammar",
    ];

    for (const section of sections) {

        if (!(section in analysis.sectionScores)) {
            throw new Error(`Missing "${section}" section.`);
        }

    }

    validateScore(
        analysis.sectionScores.projects.score,
        "Projects"
    );

    if (
        typeof analysis.sectionScores.projects.feedback !== "string"
    ) {
        throw new Error("Invalid Projects feedback.");
    }

    validateScore(
        analysis.sectionScores.skills.score,
        "Skills"
    );

    if (
        typeof analysis.sectionScores.skills.feedback !== "string"
    ) {
        throw new Error("Invalid Skills feedback.");
    }

    validateScore(
        analysis.sectionScores.atsCompatibility.score,
        "ATS Compatibility"
    );

    if (
        typeof analysis.sectionScores.atsCompatibility.feedback !== "string"
    ) {
        throw new Error("Invalid ATS Compatibility feedback.");
    }

    validateScore(
        analysis.sectionScores.resumeStructure.score,
        "Resume Structure"
    );

    if (
        typeof analysis.sectionScores.resumeStructure.feedback !== "string"
    ) {
        throw new Error("Invalid Resume Structure feedback.");
    }

    validateScore(
        analysis.sectionScores.grammar.score,
        "Grammar"
    );

    if (
        typeof analysis.sectionScores.grammar.feedback !== "string"
    ) {
        throw new Error("Invalid Grammar feedback.");
    }

    // Resume Structure Checks

    const checks = [
        "contact",
        "education",
        "skills",
        "projects",
        "experience",
        "achievements",
        "links",
    ];

    for (const check of checks) {

        if (
            typeof analysis.sectionScores.resumeStructure.checks?.[check] !== "boolean"
        ) {
            throw new Error(`Invalid resume structure check: ${check}.`);
        }

    }

    // Validate array contents

    analysis.strengths.forEach((item) => {
        if (typeof item !== "string") {
            throw new Error("Every strength must be a string.");
        }
    });

    analysis.improvements.forEach((item) => {
        if (typeof item !== "string") {
            throw new Error("Every improvement must be a string.");
        }
    });

    analysis.missingKeywords.forEach((item) => {
        if (typeof item !== "string") {
            throw new Error("Every missing keyword must be a string.");
        }
    });

    analysis.priorityFixes.forEach((item) => {

        if (
            !item ||
            typeof item.title !== "string" ||
            typeof item.reason !== "string"
        ) {
            throw new Error("Invalid priority fix.");
        }

    });

    return true;

};

export default validateResumeAnalysis;