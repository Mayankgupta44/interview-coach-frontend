import api from "./api";

export async function uploadProfileImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}