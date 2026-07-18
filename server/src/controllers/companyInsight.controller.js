import asyncHandler from "express-async-handler";
import CompanyInsight from "../models/CompanyInsight.js";
import { generateCompanyInsight } from "../services/companyInsight.service.js";

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

    await companyInsight.save();
  } else {
    companyInsight = await CompanyInsight.create({
      ...insight,
      normalizedName: officialNormalizedName,
    });
  }

  res.status(200).json({
    success: true,
    message: "Company insights fetched successfully.",
    data: companyInsight,
  });
});