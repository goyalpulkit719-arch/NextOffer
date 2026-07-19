import api from "./axios";

export const getCompanyInsights = async (companyName) => {
  const { data } = await api.post("/company-insight/analysis", {
    companyName,
  });

  return data;
};

export const getCompanyInsightHistory = async () => {
  const { data } = await api.get("/company-insight/history");
  return data;
};

export const getCompanyInsightById = async (insightId) => {
  const { data } = await api.get(`/company-insight/analysis/${insightId}`);
  return data;
};