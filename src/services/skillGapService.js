import api from "./api";

export async function analyzeSkillGap(payload = {}) {
  const response = await api.post("/skill-gap/analyze", payload);
  return response.data;
}

export async function getLatestSkillGapReport() {
  const response = await api.get("/skill-gap/latest");
  return response.data;
}