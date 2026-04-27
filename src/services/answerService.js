import api from "./api";

export async function submitAnswer(sessionId, questionId, payload) {
  const response = await api.post(
    `/interviews/${sessionId}/answers/${questionId}`,
    payload
  );
  return response.data;
}

export async function getAnswerByQuestionId(sessionId, questionId) {
  const response = await api.get(
    `/interviews/${sessionId}/answers/${questionId}`
  );
  return response.data;
}

export async function getAnswersBySessionId(sessionId) {
  const response = await api.get(`/interviews/${sessionId}/answers`);
  return response.data;
}