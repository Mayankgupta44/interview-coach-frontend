import api from "./api";

export async function getMyProfile() {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateMyProfile(payload) {
  const response = await api.put("/users/me", payload);
  return response.data;
}