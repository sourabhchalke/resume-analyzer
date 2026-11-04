
import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  async function handleAnalyzer(event) {
    event.preventDefault();

    setError("");
    setAnalysis(null);

    if (!resume.trim() || !jobDescription.trim()) {
      setError(
        "Please enter both your resume and the job description."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume,
            jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Resume analysis failed."
        );
      }

      if (!data.analysis) {
        throw new Error(
          "The server returned no analysis. Please try again."
        );
      }

      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Frontend API Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const matchScore = Number(analysis?.match_score);
  const safeScore = Number.isFinite(matchScore)
    ? Math.max(0, Math.min(100, matchScore))
    : 0;

  return (
    <main className="app">
      <header className="hero">
        <span className="eyebrow">
          AI-POWERED CAREER TOOL
        </span>

        <h1>Resume Analyzer</h1>

        <p>
          Turn your next job application into a smarter move.
          Compare your resume with a job description and discover
          the skills you should highlight or develop.
        </p>
      </header>

      <form className="input-grid" onSubmit={handleAnalyzer}>
        <section className="panel">
          <label htmlFor="resume">
            Your Resume
          </label>

          <p>
            Start with your experience, education, skills, and
            projects.
          </p>

          <textarea
            id="resume"
            name="resume"
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            maxLength={15000}
            rows={12}
            required
            aria-describedby="resume-count"
          />

          <small id="resume-count">
            {resume.length.toLocaleString()}/15,000 characters
          </small>
        </section>

        <section className="panel">
          <label htmlFor="job">
            Target Job Description
          </label>

          <p>
            Add the role requirements to identify relevant
            skills and potential gaps.
          </p>

          <textarea
            id="job"
            name="jobDescription"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={10000}
            rows={12}
            required
            aria-describedby="job-count"
          />

          <small id="job-count">
            {jobDescription.length.toLocaleString()}/10,000 characters
          </small>
        </section>

        <button
          className="analyze-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Analyzing your resume..."
            : "Analyze My Resume"}
        </button>
      </form>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      {analysis && (
        <section
          className="results"
          aria-labelledby="results-heading"
          aria-live="polite"
        >
          <h2 id="results-heading">
            Your Analysis Results
          </h2>

          <div className="score-card">
            <span>Estimated Job Match</span>

            <strong>{safeScore}%</strong>

            <div
              className="progress"
              role="progressbar"
              aria-valuenow={safeScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Estimated job match"
            >
              <div
                className="progress-fill"
                style={{ width: `${safeScore}%` }}
              />
            </div>
          </div>

          <div className="result-grid">
            <ResultList
              className="matching-skills"
              title="Matching Skills"
              items={analysis.matching_skills}
            />

            <ResultList
              title="Missing or Unverified Skills"
              items={analysis.missing_skills}
            />

            <ResultList
              title="Resume Strengths"
              items={analysis.strengths}
            />

            <ResultList
              title="Improvement Suggestions"
              items={analysis.suggestions}
            />
          </div>

          <p className="disclaimer">
            Disclaimer: This Resume Analyzer is an independent
            demonstration project developed by Sourabh Chalke for
            educational and portfolio purposes. It demonstrates
            React.js, Node.js, Express.js, MongoDB, and Google Gemini
            AI integration. Resume text and job descriptions are sent
            to the configured AI service to generate the analysis.
            Avoid submitting sensitive personal information.
            Data handling and retention depend on the application's
            backend and the configured service. AI-generated scores
            and recommendations are estimates, not hiring decisions
            or guarantees of employment. Please verify all findings
            before using them in job applications.
          </p>
        </section>
      )}
    </main>
  );
}

function ResultList({ title, items, className = "" }) {
  const safeItems = Array.isArray(items)
    ? items.filter(
        (item) => typeof item === "string" && item.trim()
      )
    : [];

  return (
    <article className={`result-card ${className}`.trim()}>
      <h3>{title}</h3>

      {safeItems.length > 0 ? (
        <ul>
          {safeItems.map((item, index) => (
            <li key={`${item}-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items returned for this section.</p>
      )}
    </article>
  );
}

export default App;
