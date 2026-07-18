import mongoose from "mongoose";

const userCompanyHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    companyInsightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyInsight",
        required: true,
    },

    viewedAt: {
        type: Date,
        default: Date.now,
    }
});

const companyHistory = mongoose.model("CompanyHistory", userCompanyHistorySchema);

export default companyHistory;