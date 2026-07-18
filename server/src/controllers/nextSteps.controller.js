import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";
import Resume from "../models/resume.model.js";
import { LeetcodeProfile } from "../models/leetcodeProfile.model.js";
import { CodeforcesProfile } from "../models/codeforcesProfile.model.js";
import CompanyInsight from "../models/CompanyInsight.model.js";
import NextSteps from "../models/nextSteps.model.js";

import downloadPdf from "../utils/downloadPdf.js";
import generateNextSteps from "../services/nextSteps.service.js";
import { generateCompanyInsight } from "../services/companyInsight.service.js";

export const generateRoadmap = asyncHandler(async (req, res) => {

  const { companyName } = req.body;

  const user = await User.findById(req.user.id);
	
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const finalCompanyName = companyName?.trim() || user.targetCompany?.trim();

  if (!finalCompanyName) {
    const error = new Error("Target company is required.");
    error.statusCode = 400;
    throw error;
  }

  const leetcodeProfile = await LeetcodeProfile.findOne({
    user: user._id,
  });

  if (!leetcodeProfile) {
    const error = new Error("LeetCode profile not found.");
    error.statusCode = 404;
    throw error;
  }

  const codeforcesProfile = await CodeforcesProfile.findOne({
    user: user._id,
  });

  if (!codeforcesProfile) {
    const error = new Error("Codeforces profile not found.");
    error.statusCode = 404;
    throw error;
  }

  const normalizedName = finalCompanyName.trim().toLowerCase();

  let companyInsight = await CompanyInsight.findOne({
    normalizedName,
  });

  if (
    !companyInsight ||
    companyInsight.updatedAt.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000
  ) {
    const generatedInsight = await generateCompanyInsight(finalCompanyName);

    const officialNormalizedName = generatedInsight.companyName
      .trim()
      .toLowerCase();

    companyInsight = await CompanyInsight.findOne({
      normalizedName: officialNormalizedName,
    });

    if (companyInsight) {
      Object.assign(companyInsight, {
        ...generatedInsight,
        normalizedName: officialNormalizedName,
      });

      await companyInsight.save();
    } else {
      companyInsight = await CompanyInsight.create({
        ...generatedInsight,
        normalizedName: officialNormalizedName,
      });
    }
  }

  let currentResume = user.currentResume;

  if (user.currentResume) {
    currentResume = await Resume.findById(user.currentResume);
} 

  const existingRoadmap = await NextSteps.findOne({
    userId: user._id,
    normalizedCompany: companyInsight.normalizedName,
    resumeId: currentResume?._id || null,
  }).sort({ createdAt: -1 });

  if (existingRoadmap) {
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    if (existingRoadmap.updatedAt.getTime() > oneMonthAgo) {
      return res.status(200).json({
        success: true,
        message: "Roadmap fetched successfully.",
        data: existingRoadmap,
      });
    }
  }
  const roadmap = await generateNextSteps({
    companyName: finalCompanyName,
    companyInsight,
    leetcodeProfile,
    codeforcesProfile,
    resumeUrl: currentResume?.fileUrl,
  });

  if (existingRoadmap) {
    existingRoadmap.roadmap = roadmap;

    await existingRoadmap.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap regenerated successfully.",
      data: existingRoadmap,
    });
  }

  const newRoadmap = await NextSteps.create({
    userId: user._id,
    companyName: companyInsight.companyName,
    normalizedCompany: companyInsight.normalizedName, 
    resumeId: currentResume?._id || null,
    roadmap,
  });

  res.status(201).json({
    success: true,
    message: "Roadmap generated successfully.",
    data: newRoadmap,
  });
});


export const getRoadmapHistory = asyncHandler(async (req, res) => {

    const history = await NextSteps.find({
        userId: req.user.id,
    })
    .populate({
        path: "resumeId",
        select: "originalName fileUrl",
    })
    .sort({ updatedAt: -1 });

    const formattedHistory = history.map((item) => ({
        _id: item._id,
        companyName: item.companyName,
        resume: item.resumeId
            ? {
                originalName: item.resumeId.originalName,
                fileUrl: item.resumeId.fileUrl,
            }
            : null,
        currentStage: item.roadmap.currentStage.stage,
        placementReadiness: item.roadmap.placementReadiness.score,
        analyzedAt: item.updatedAt,
    }));

    res.status(200).json({
        success: true,
        message: "Roadmap history fetched successfully.",
        data: formattedHistory,
    });

});


export const getRoadmapAnalysis = asyncHandler(async (req, res) => {

    const { roadmapId } = req.params;

    const roadmap = await NextSteps.findOne({
        _id: roadmapId,
        userId: req.user.id,
    }).populate({
        path: "resumeId",
        select: "originalName fileUrl",
    });

    if (!roadmap) {
        const error = new Error("Roadmap not found.");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        success: true,
        message: "Roadmap fetched successfully.",
        data: {
            _id: roadmap._id,
            companyName: roadmap.companyName,
            analyzedAt: roadmap.updatedAt,
            resume: roadmap.resumeId
                ? {
                    originalName: roadmap.resumeId.originalName,
                    fileUrl: roadmap.resumeId.fileUrl,
                }
                : null,
            roadmap: roadmap.roadmap,
        },
    });

});