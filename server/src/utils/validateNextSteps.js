const validateNextSteps = (roadmap) => {

    if (!roadmap || typeof roadmap !== "object") {
        const error = new Error("Invalid AI response.");
        error.statusCode = 400;
        throw error;
    }

    if (!roadmap.currentObjective?.trim()) {
        const error = new Error("Invalid current objective.");
        error.statusCode = 400;
        throw error;
    }

    if (!roadmap.placementReadiness || typeof roadmap.placementReadiness !== "object") {
        const error = new Error("Invalid placement readiness.");
        error.statusCode = 400;
        throw error;
    }

    const { score, level, reason } = roadmap.placementReadiness;

    if (typeof score !== "number" || score < 0 || score > 100) {
        const error = new Error("Invalid placement readiness score.");
        error.statusCode = 400;
        throw error;
    }

    if (!level?.trim()) {
        const error = new Error("Invalid placement readiness level.");
        error.statusCode = 400;
        throw error;
    }

    if (!reason?.trim()) {
        const error = new Error("Invalid placement readiness reason.");
        error.statusCode = 400;
        throw error;
    }

    if (!roadmap.estimatedTimeline?.trim()) {
        const error = new Error("Invalid estimated timeline.");
        error.statusCode = 400;
        throw error;
    }

    if (!roadmap.currentStage || typeof roadmap.currentStage !== "object") {
        const error = new Error("Invalid current stage.");
        error.statusCode = 400;
        throw error;
    }

    const allowedStages = [
        "Foundation",
        "Skill Building",
        "Interview Preparation",
        "Application Ready",
    ];

    if (!allowedStages.includes(roadmap.currentStage.stage)) {
        const error = new Error("Invalid current stage.");
        error.statusCode = 400;
        throw error;
    }

    if (!roadmap.currentStage.reason?.trim()) {
        const error = new Error("Invalid current stage reason.");
        error.statusCode = 400;
        throw error;
    }

    if (!Array.isArray(roadmap.biggestGaps) || roadmap.biggestGaps.length < 3) {
        const error = new Error("Invalid biggest gaps.");
        error.statusCode = 400;
        throw error;
    }

    const allowedPriorities = ["High", "Medium", "Low"];

    roadmap.biggestGaps.forEach((gap) => {

        if (!gap.gap?.trim()) {
            const error = new Error("Invalid biggest gap.");
            error.statusCode = 400;
            throw error;
        }

        if (!allowedPriorities.includes(gap.priority)) {
            const error = new Error("Invalid biggest gap priority.");
            error.statusCode = 400;
            throw error;
        }

        if (!gap.reason?.trim()) {
            const error = new Error("Invalid biggest gap reason.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!Array.isArray(roadmap.dsaRoadmap) || roadmap.dsaRoadmap.length < 5) {
        const error = new Error("Invalid DSA roadmap.");
        error.statusCode = 400;
        throw error;
    }

    const allowedDifficulty = ["Easy", "Medium", "Hard"];

    roadmap.dsaRoadmap.forEach((topic) => {

        if (!topic.topic?.trim()) {
            const error = new Error("Invalid DSA topic.");
            error.statusCode = 400;
            throw error;
        }

        if (!allowedPriorities.includes(topic.priority)) {
            const error = new Error("Invalid DSA priority.");
            error.statusCode = 400;
            throw error;
        }

        if (!allowedDifficulty.includes(topic.difficulty)) {
            const error = new Error("Invalid DSA difficulty.");
            error.statusCode = 400;
            throw error;
        }

        if (!topic.reason?.trim()) {
            const error = new Error("Invalid DSA reason.");
            error.statusCode = 400;
            throw error;
        }

        if (
            typeof topic.recommendedQuestionCount !== "number" ||
            topic.recommendedQuestionCount <= 0
        ) {
            const error = new Error("Invalid recommended question count.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!Array.isArray(roadmap.contestStrategy) || roadmap.contestStrategy.length < 3) {
        const error = new Error("Invalid contest strategy.");
        error.statusCode = 400;
        throw error;
    }

    roadmap.contestStrategy.forEach((strategy) => {

        if (typeof strategy !== "string" || !strategy.trim()) {
            const error = new Error("Invalid contest strategy.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!Array.isArray(roadmap.companySpecificFocus) || roadmap.companySpecificFocus.length < 3) {
        const error = new Error("Invalid company specific focus.");
        error.statusCode = 400;
        throw error;
    }

    roadmap.companySpecificFocus.forEach((focus) => {

        if (!focus.area?.trim()) {
            const error = new Error("Invalid company focus area.");
            error.statusCode = 400;
            throw error;
        }

        if (!focus.allocation?.trim()) {
            const error = new Error("Invalid company focus allocation.");
            error.statusCode = 400;
            throw error;
        }

        if (!focus.reason?.trim()) {
            const error = new Error("Invalid company focus reason.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!Array.isArray(roadmap.weeklyActionPlan) || roadmap.weeklyActionPlan.length < 4) {
        const error = new Error("Invalid weekly action plan.");
        error.statusCode = 400;
        throw error;
    }

    roadmap.weeklyActionPlan.forEach((week) => {

        if (!week.week?.trim()) {
            const error = new Error("Invalid week.");
            error.statusCode = 400;
            throw error;
        }

        if (!week.dsa?.trim()) {
            const error = new Error("Invalid DSA plan.");
            error.statusCode = 400;
            throw error;
        }

        if (!week.coreSubject?.trim()) {
            const error = new Error("Invalid core subject plan.");
            error.statusCode = 400;
            throw error;
        }

        if (!week.contestActivity?.trim()) {
            const error = new Error("Invalid contest activity.");
            error.statusCode = 400;
            throw error;
        }

        if (!week.resumeOrProjectTask?.trim()) {
            const error = new Error("Invalid resume/project task.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!Array.isArray(roadmap.monthlyMilestones) || roadmap.monthlyMilestones.length < 3) {
        const error = new Error("Invalid monthly milestones.");
        error.statusCode = 400;
        throw error;
    }

    roadmap.monthlyMilestones.forEach((milestone) => {

        if (typeof milestone !== "string" || !milestone.trim()) {
            const error = new Error("Invalid monthly milestone.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (
        !Array.isArray(roadmap.interviewPreparationStrategy) ||
        roadmap.interviewPreparationStrategy.length < 3
    ) {
        const error = new Error("Invalid interview preparation strategy.");
        error.statusCode = 400;
        throw error;
    }

    roadmap.interviewPreparationStrategy.forEach((item) => {

        if (!item.area?.trim()) {
            const error = new Error("Invalid interview preparation area.");
            error.statusCode = 400;
            throw error;
        }

        if (!item.strategy?.trim()) {
            const error = new Error("Invalid interview preparation strategy.");
            error.statusCode = 400;
            throw error;
        }

    });

    if (!roadmap.resumeActionPlan?.trim()) {
        const error = new Error("Invalid resume action plan.");
        error.statusCode = 400;
        throw error;
    }

};

export default validateNextSteps;