import api from "./api";

export async function getRecommendations() {
  const response = await api.get("/recommendations");
  return response.data;
}

export async function generateRecommendations() {
  const response = await api.post("/recommendations/generate");
  return response.data;
}