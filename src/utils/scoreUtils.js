export function getScoreVariant(score = 0) {
  if (score >= 85) return "success";
  if (score >= 70) return "warning";
  return "danger";
}

export function getScoreTextColor(score = 0) {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-danger";
}