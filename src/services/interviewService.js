import api from "./api";

export async function createInterviewSession(payload) {
  const response = await api.post("/interviews", payload);
  return response.data;
}

export async function getMyInterviewSessions() {
  const response = await api.get("/interviews");
  return response.data;
}

export async function getInterviewSessionById(sessionId) {
  const response = await api.get(`/interviews/${sessionId}`);
  return response.data;
}