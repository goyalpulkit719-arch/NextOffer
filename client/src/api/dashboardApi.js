import api from "./axios";

export const getLeetcodeDashboard = async () => {
  const { data } = await api.get("/leetcode");
  return data;
};

export const getLeetcodeHistory = async () => {
  const { data } = await api.get("/leetcode/history");
  return data;
};

export const refreshLeetcodeProfile = async () => {
  const { data } = await api.get("/leetcode/refresh");
  return data;
};

export const getCodeforcesDashboard = async () => {
  const { data } = await api.get("/codeforces");
  return data;
};

export const getCodeforcesHistory = async () => {
  const { data } = await api.get("/codeforces/history");
  return data;
};

export const refreshCodeforcesProfile = async () => {
  const { data } = await api.get("/codeforces/refresh");
  return data;
};