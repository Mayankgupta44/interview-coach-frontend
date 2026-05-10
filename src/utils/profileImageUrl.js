import { API_BASE_URL } from "./constants";

export function getProfileImageUrl(profileImageUrl) {
  if (!profileImageUrl) return "";

  const imageUrl = String(profileImageUrl).trim();

  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:") ||
    imageUrl.startsWith("data:")
  ) {
    return imageUrl;
  }

  const backendBaseUrl = API_BASE_URL
    .replace(/\/api\/?$/, "")
    .replace(/\/$/, "");

  const cleanImageUrl = imageUrl.replace(/^\/+/, "");

  return `${backendBaseUrl}/${cleanImageUrl}`;
}