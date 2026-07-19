import api from "./axios";

export const getCurrentResume = async () => {
  const { data } = await api.get("/resume/current");
  return data;
};

export const analyzeResume = async () => {
  const { data } = await api.get("/resume/analyze");
  return data;
};

export const getResumeHistory = async () => {
  const { data } = await api.get("/resume/history");
  return data;
};

export const getResumeAnalysis = async (resumeId) => {
  const { data } = await api.get(`/resume/analysis/${resumeId}`);
  return data;
};