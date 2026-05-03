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

export async function submitAudioAnswer(sessionId, questionId, audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "answer.webm");

  const res = await api.post(
    `/interviews/${sessionId}/answers/${questionId}/audio`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "answer.webm");

  const response = await api.post("/audio/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function submitAudioTranscriptAnswer(
  sessionId,
  questionId,
  payload
) {
  const response = await api.post(
    `/interviews/${sessionId}/answers/${questionId}/audio-transcript`,
    payload
  );

  return response.data;
}