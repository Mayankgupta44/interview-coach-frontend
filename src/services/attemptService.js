import api from "./api";

export async function submitAttempt(sessionId, questionId, payload) {
  const response = await api.post(
    `/interviews/${sessionId}/questions/${questionId}/attempts`,
    payload,
  );

  return response.data;
}

export async function getSessionAttempts(sessionId) {
  const response = await api.get(`/interviews/${sessionId}/attempts`);
  return response.data;
}

export async function submitAudioAttempt(sessionId, questionId, payload) {
  const response = await api.post(
    `/interviews/${sessionId}/questions/${questionId}/attempts/audio-transcript`,
    payload,
  );

  return response.data;
}