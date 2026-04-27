import api from "./api";

export async function saveResume(payload) {
  const response = await api.post("/documents/resume", payload);
  return response.data;
}

export async function getLatestResume() {
  const response = await api.get("/documents/resume/latest");
  return response.data;
}

export async function saveJobDescription(payload) {
  const response = await api.post("/documents/job-description", payload);
  return response.data;
}

export async function getLatestJobDescription() {
  const response = await api.get("/documents/job-description/latest");
  return response.data;
}

export async function getDashboard() {
  const response = await api.get("/dashboard");
  return response.data;
}