import { useState } from "react";
import "./App.css";

function App() {

  const [resume,setResume]=useState("");
  const [jobDescription,setJobDescription]=useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);
  const [analysis, setAnalysis] = useState(null);

  async function handleAnalyzer(event){
    event.preventDefault();

    setError("");
    setAnalysis(null);

    if (!resume.trim() || !jobDescription.trim()) {
      setError("Please enter both your resume and the job description.");
      return;
    }

    setLoading(true);

    
  }

  return (
    <>
      <main className="app">
        <header className="hero">
          <span className="eyebrow">AI-POWERED CAREER TOOL</span>
          <h1>Resume Analyzer</h1>
          <p>
            Compare your resume with a job description and discover skills to
            highlight or develop.
          </p>
        </header>

        <form className="input-grid" onSubmit={handleAnalyzer}>
          <section className="panel">
            <label htmlFor="resume">Your resume</label>
            <p>Paste your resume text below.</p>
            <textarea
              id="resume"
              placeholder="Education,skills,projects,experience..."
              value={resume}
              onChange={(e)=>setResume(e.target.value)}
              maxLength={15000}
              rows={12}
            />
            <small>/15000 characters</small>
          </section>

          <section className="panel">
            <label htmlFor="job">Job Description</label>
            <p>Paste the requirements for your target role.</p>
            <textarea
              id="job"
              placeholder="Responsibilities, required skills..."
              value={jobDescription}
              onChange={(e)=>setJobDescription(e.target.value)}
              maxLength={10000}
              rows={12}
            />
            <small>/10000 characters</small>
          </section>

          <button className="analyze-button" type="submit" disabled={loading}>
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </form>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        {analysis && (
          <section className="results">
            <h2>Analysis Results</h2>

            <div className="score-card">
              <span>Estimated job match</span>
              <strong>{analysis.match_score}%</strong>
              <div
                className="progress"
                role="progressbar"
                aria-valuenow={analysis.match_score}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Estimated job match"
              >
                <div
                  className="progress-fill"
                  style={{ width: `${analysis.match_score}%` }}
                />
              </div>
            </div>

            <div className="result-grid">
              <ResultList
                title="Matching Skills"
                items={analysis.matching_skills}
              />
              <ResultList
                title="Missing or Unverified Skills"
                items={analysis.missing_skills}
              />
              <ResultList title="Resume Strengths" items={analysis.strengths} />
              <ResultList
                title="Improvement Suggestions"
                items={analysis.suggestions}
              />
            </div>

            <p className="disclaimer">
              AI-generated estimates are not hiring decisions. Review all
              findings for accuracy.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

function ResultList({ title, items }) {
  return (
    <article className="result-card">
      <h3>{title}</h3>

      {items ? (
        <ul>
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No items returned.</p>
      )}
    </article>
  );
}

export default App;
