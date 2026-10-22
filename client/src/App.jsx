import "./App.css";

function App() {
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

        <form className="input-grid">
          <section className="panel">
            <label htmlFor="resume">Your resume</label>
            <p>Paste your resume text below.</p>
            <textarea
              id="resume"
              placeholder="Education,skills,projects,experience..."
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
              maxLength={10000}
              rows={12}
            />
            <small>/10000 characters</small>
          </section>

          <button className="analyze-button" type="submit">
            Analyze Resume
          </button>
        </form>
      </main>
    </>
  );
}

export default App;
