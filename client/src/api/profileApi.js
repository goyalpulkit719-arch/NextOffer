import api from "./axios";

export const updateLeetcodeUsername = async (leetcodeUsername) => {
  const { data } = await api.patch("/leetcode/username", {
    leetcodeUsername,
  });

  return data;
};

export const updateCodeforcesUsername = async (codeforcesUsername) => {
  const { data } = await api.patch("/codeforces/username", {
    codeforcesUsername,
  });

  return data;
};

export const getCurrentResume = async () => {
  const { data } = await api.get("/resume/current");
  return data;
};

export const uploadResume = async (formData) => {
  const { data } = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};