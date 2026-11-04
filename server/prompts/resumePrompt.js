
export const buildResumePrompt = (resume, jobDescription) => {
  return `
ROLE:
You are an expert ATS Resume Analyzer and Career Advisor.

CONTEXT:
A job seeker wants to understand how well their resume
matches a specific job description.

TASK:
Analyze the candidate's resume against the job description.

INSTRUCTIONS:
1. Identify skills that match the job requirements.
2. Identify important missing skills.
3. Evaluate relevant experience.
4. Identify the candidate's strengths.
5. Suggest practical resume improvements.

CONSTRAINTS:
1. Do not invent skills, qualifications, or experience.
2. Use only the information provided.
3. Do not assume missing information.
4. Keep recommendations relevant to the job.
5. Evaluate the resume fairly.

CANDIDATE RESUME:
"""
${resume}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

ANALYSIS REQUIREMENT:
Provide an honest and clear comparison of the resume
with the job description.
`;
};
