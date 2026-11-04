export const validateResumeResponse = (data) => {

  if (!data || typeof data !== "object") {
    return false;
  }

  if (
    typeof data.match_score !== "number" ||
    data.match_score < 0 ||
    data.match_score > 100
  ) {
    return false;
  }

  const requiredArrays = [
    "matching_skills",
    "missing_skills",
    "strengths",
    "suggestions"
  ];

  for (const field of requiredArrays) {
    if (
      !Array.isArray(data[field]) ||
      !data[field].every(item => typeof item === "string")
    ) {
      return false;
    }
  }

  return true;
};