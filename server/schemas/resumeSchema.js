
export const resumeSchema = {
  type: "OBJECT",
  properties: {
    match_score: {
      type: "NUMBER",
      description: "Resume match score between 0 and 100"
    },
    matching_skills: {
      type: "ARRAY",
      items: {
        type: "STRING"
      }
    },
    missing_skills: {
      type: "ARRAY",
      items: {
        type: "STRING"
      }
    },
    strengths: {
      type: "ARRAY",
      items: {
        type: "STRING"
      }
    },
    suggestions: {
      type: "ARRAY",
      items: {
        type: "STRING"
      }
    }
  },
  required: [
    "match_score",
    "matching_skills",
    "missing_skills",
    "strengths",
    "suggestions"
  ],
  propertyOrdering: [
    "match_score",
    "matching_skills",
    "missing_skills",
    "strengths",
    "suggestions"
  ]
};
