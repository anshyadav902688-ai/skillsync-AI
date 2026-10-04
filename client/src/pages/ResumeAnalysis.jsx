import { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ResumeAnalysis() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setAnalysis(null);

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Resume file must be smaller than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    setError("");
  };

  const analyzeResume = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      setAnalysis(null);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setAnalysis(response.data.analysis);
      } else {
        setError(
          response.data.message || "Resume analysis failed."
        );
      }
    } catch (err) {
      console.error("Resume analysis error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to analyze resume. Please check that the backend is running."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="resume-page">

      {/* Header */}
      <header className="resume-header">

        <button
          className="resume-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="resume-eyebrow">
          <Sparkles size={15} />
          AI Resume Intelligence
        </div>

        <h1>
          Resume <span>Analysis</span>
        </h1>

        <p>
          Upload your resume and let SkillSync AI evaluate its
          quality, ATS readiness and career relevance.
        </p>

      </header>

      <main className="resume-container">

        {/* Upload Section */}
        <section className="resume-upload-card">

          <div className="resume-upload-heading">

            <div>
              <span className="resume-label">
                RESUME ANALYZER
              </span>

              <h2>
                Upload your resume
              </h2>

              <p>
                Supported formats: PDF, DOC and DOCX · Maximum 5 MB
              </p>
            </div>

            <div className="resume-upload-icon">
              <Upload size={25} />
            </div>

          </div>

          {!file ? (
            <label className="resume-dropzone">

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
              />

              <div className="resume-drop-icon">
                <FileText size={28} />
              </div>

              <h3>
                Drop your resume here
              </h3>

              <p>
                or click to browse from your computer
              </p>

              <span className="resume-browse">
                Choose Resume
              </span>

            </label>
          ) : (
            <div className="resume-selected">

              <div className="resume-file-icon">
                <FileText size={25} />
              </div>

              <div className="resume-file-info">
                <strong>
                  {file.name}
                </strong>

                <span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <button
                className="resume-remove"
                onClick={removeFile}
                type="button"
                title="Remove resume"
              >
                <X size={18} />
              </button>

            </div>
          )}

          {error && (
            <div className="resume-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            className="resume-analyze-btn"
            onClick={analyzeResume}
            disabled={!file || analyzing}
          >
            {analyzing ? (
              <>
                <span className="resume-button-spinner"></span>
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze My Resume
              </>
            )}
          </button>

        </section>

        {/* Results */}
        {analysis && (
          <section className="resume-results">

            <div className="resume-results-header">

              <div>
                <span className="resume-label">
                  AI ANALYSIS COMPLETE
                </span>

                <h2>
                  Your Resume Performance
                </h2>
              </div>

              <div className="resume-success">
                <CheckCircle2 size={18} />
                Analysis Complete
              </div>

            </div>

            {/* Main Scores */}
            <div className="resume-score-grid">

              <ScoreCard
                icon={<Target size={21} />}
                label="Overall Resume Score"
                value={analysis.overallScore}
                suffix="/100"
              />

              <ScoreCard
                icon={<TrendingUp size={21} />}
                label="ATS Compatibility"
                value={analysis.atsCompatibility}
                suffix="%"
              />

              <ScoreCard
                icon={<Sparkles size={21} />}
                label="Career Relevance"
                value={analysis.careerRelevance}
                suffix="%"
              />

            </div>

            {/* Research Evaluation Factors */}
            <div className="resume-factor-grid">

              <FactorCard
                title="Keyword Score"
                score={analysis.keywordScore}
                weight="40%"
                description="Technical and ATS keyword coverage"
              />

              <FactorCard
                title="Section Score"
                score={analysis.sectionScore}
                weight="35%"
                description="Resume structure and important sections"
              />

              <FactorCard
                title="Content Score"
                score={analysis.contentScore}
                weight="25%"
                description="Resume content length and completeness"
              />

            </div>

            {/* Insights */}
            <div className="resume-analysis-grid">

              <div className="resume-insight-card">

                <div className="resume-card-heading">
                  <CheckCircle2 size={20} />
                  Strengths
                </div>

                {analysis.strengths.map((item, index) => (
                  <div
                    className="resume-insight-item positive"
                    key={index}
                  >
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </div>
                ))}

              </div>

              <div className="resume-insight-card">

                <div className="resume-card-heading warning">
                  <AlertCircle size={20} />
                  Improvements
                </div>

                {analysis.improvements.map((item, index) => (
                  <div
                    className="resume-insight-item warning"
                    key={index}
                  >
                    <AlertCircle size={17} />
                    <span>{item}</span>
                  </div>
                ))}

              </div>

            </div>

            {/* AI Recommendation */}
            <div className="resume-ai-recommendation">

              <div className="resume-ai-icon">
                <Sparkles size={22} />
              </div>

              <div>

                <span>
                  AI RECOMMENDATION
                </span>

                <h3>
                  {analysis.recommendation}
                </h3>

                <p>
                  {analysis.recommendationText}
                </p>

              </div>

            </div>

            {/* Research Model */}
            <div className="resume-research">

              <div className="resume-research-icon">
                <Target size={21} />
              </div>

              <div>

                <span>
                  RESEARCH MODEL
                </span>

                <h3>
                  {analysis.researchModel.name}
                </h3>

                <p>
                  {analysis.researchModel.formula}
                </p>

              </div>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

/* Score Card */

function ScoreCard({
  icon,
  label,
  value,
  suffix,
}) {
  return (
    <div className="resume-score-card">

      <div className="resume-score-icon">
        {icon}
      </div>

      <span>
        {label}
      </span>

      <strong>
        {value}
        <span>{suffix}</span>
      </strong>

      <div className="resume-progress">
        <div
          className="resume-progress-fill"
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>

      <small>
        AI evaluated
      </small>

    </div>
  );
}

/* Research Factor Card */

function FactorCard({
  title,
  score,
  weight,
  description,
}) {
  return (
    <div className="resume-factor-card">

      <div className="resume-factor-top">

        <div>
          <span>
            {title}
          </span>

          <small>
            Weight: {weight}
          </small>
        </div>

        <strong>
          {score}
        </strong>

      </div>

      <div className="resume-progress">
        <div
          className="resume-progress-fill"
          style={{
            width: `${score}%`,
          }}
        ></div>
      </div>

      <p>
        {description}
      </p>

    </div>
  );
}

export default ResumeAnalysis;