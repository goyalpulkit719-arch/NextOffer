import api from "./axios";

export const analyzeJobMatch = async (jobData) => {
  const { data } = await api.post("/job-match/analyze", jobData);
  return data;
};

export const getJobMatchHistory = async () => {
  const { data } = await api.get("/job-match/history");
  return data;
};

export const getJobMatchAnalysis = async (jobMatchId) => {
  const { data } = await api.get(`/job-match/analysis/${jobMatchId}`);
  return data;
};