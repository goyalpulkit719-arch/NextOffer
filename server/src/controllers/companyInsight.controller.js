import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import CompanyInsight from "../models/CompanyInsight.model.js";
import companyHistory from "../models/companyHistory.model.js";
import { generateCompanyInsight } from "../services/companyInsight.service.js";

const updateCompanyHistory = async (userId, companyInsightId) => {
    await companyHistory.findOneAndUpdate(
        {
            userId,
            companyInsightId,
        },
        {
            viewedAt: new Date(),
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        }
    );
};

export const getCompanyInsight = asyncHandler(async (req, res) => {
  const { companyName } = req.body;

  if (!companyName?.trim()) {
    const error = new Error("Company name is required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedName = companyName.trim().toLowerCase();

  let companyInsight = await CompanyInsight.findOne({ normalizedName });

  if (companyInsight) {
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    if (companyInsight.updatedAt.getTime() > oneMonthAgo) {
      await updateCompanyHistory(req.user.id, companyInsight._id);
      return res.status(200).json({
        success: true,
        message: "Company insights fetched successfully.",
        data: companyInsight,
      });
    }
  }

  const insight = await generateCompanyInsight(companyName);

  const officialNormalizedName = insight.companyName.trim().toLowerCase();

  companyInsight = await CompanyInsight.findOne({
    normalizedName: officialNormalizedName,
  });

  if (companyInsight) {
    Object.assign(companyInsight, {
      ...insight,
      normalizedName: officialNormalizedName,
    });
    await updateCompanyHistory(req.user.id, companyInsight._id);

    await companyInsight.save();
  } else {
    companyInsight = await CompanyInsight.create({
      ...insight,
      normalizedName: officialNormalizedName,
    });
    await updateCompanyHistory(req.user.id, companyInsight._id);
  }

  res.status(200).json({
    success: true,
    message: "Company insights fetched successfully.",
    data: companyInsight,
  });
});


export const getCompanyHistory = asyncHandler(async (req, res) => {
  const history = await companyHistory.find({
    userId: req.user._id,
  })
    .populate({
      path: "companyInsightId",
      select: "companyName",
    })
    .sort({ viewedAt: -1 });

  res.status(200).json({
    success: true,
    message: "Company history fetched successfully.",
    data: history,
  });
});

export const getCompanyInsightById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid company insight ID.");
    error.statusCode = 400;
    throw error;
  }

  const companyInsight = await CompanyInsight.findById(id);

  if (!companyInsight) {
    const error = new Error("Company insight not found.");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Company insight fetched successfully.",
    data: companyInsight,
  });
});