import api from "./axios";

export const generateNextSteps = async (companyName) => {
  const { data } = await api.post("/next-steps/generate", {
    companyName,
  });

  return data;
};

export const getRoadmapHistory = async () => {
  const { data } = await api.get("/next-steps/history");
  return data;
};

export const getRoadmapAnalysis = async (roadmapId) => {
  const { data } = await api.get(`/next-steps/analysis/${roadmapId}`);
  return data;
};