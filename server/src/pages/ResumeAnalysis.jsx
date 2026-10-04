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
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = (selectedFile) => {
    setError("");
    setAnalysis(null);

    if (!selectedFile) return;

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

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
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
      <div className="resume-header">
        <button
          className="resume-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="resume-eyebrow">
          <Sparkles size={16} />
          AI Resume Intelligence
        </div>

        <h1>
          Resume <span>Analysis</span>
        </h1>

        <p>
          Upload your resume and let SkillSync AI evaluate its
          structure, technical keywords, ATS compatibility, and
          career readiness.
        </p>
      </div>

      <div className="resume-container">
        <div className="resume-upload-card">
          <div className="resume-upload-heading">
            <div>
              <span className="resume-label">STEP 01</span>
              <h2>Upload your resume</h2>
              <p>
                Supported formats: PDF, DOC and DOCX. Maximum
                file size: 5 MB.
              </p>
            </div>

            <div className="resume-upload-icon">
              <Upload size={24} />
            </div>
          </div>

          {!file ? (
            <div
              className={`resume-dropzone ${
                dragActive ? "active" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="resume-drop-icon">
                <FileText size={30} />
              </div>

              <h3>Drop your resume here</h3>

              <p>
                or{" "}
                <label className="resume-browse">
                  browse files
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    hidden
                  />
                </label>
              </p>
            </div>
          ) : (
            <div className="resume-selected">
              <div className="resume-file-icon">
                <FileText size={24} />
              </div>

              <div className="resume-file-info">
                <strong>{file.name}</strong>
                <span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <button
                className="resume-remove"
                onClick={removeFile}
                type="button"
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
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="resume-results">
            <div className="resume-results-header">
              <div>
                <span className="resume-label">STEP 02</span>
                <h2>Analysis Results</h2>
              </div>

              <div className="resume-success">
                <CheckCircle2 size={17} />
                Analysis Complete
              </div>
            </div>

            <div className="resume-score-grid">
              <ScoreCard
                icon={<Target size={21} />}
                label="Overall Score"
                value={analysis.overallScore}
                suffix="/100"
              />

              <ScoreCard
                icon={<FileText size={21} />}
                label="ATS Compatibility"
                value={analysis.atsCompatibility}
                suffix="%"
              />

              <ScoreCard
                icon={<TrendingUp size={21} />}
                label="Career Relevance"
                value={analysis.careerRelevance}
                suffix="%"
              />
            </div>

            <div className="resume-analysis-grid">
              <div className="resume-insight-card">
                <div className="resume-card-heading">
                  <CheckCircle2 size={20} />
                  <h3>Strengths</h3>
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
                  <h3>Areas to Improve</h3>
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

            <div className="resume-ai-recommendation">
              <div className="resume-ai-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <span>AI RECOMMENDATION</span>
                <h3>Improve your placement readiness</h3>
                <p>{analysis.recommendation}</p>
              </div>
            </div>

            <div className="resume-research">
              <div className="resume-research-icon">
                <Target size={20} />
              </div>

              <div>
                <span>RESEARCH MODEL</span>
                <h3>{analysis.researchModel.name}</h3>
                <p>{analysis.researchModel.formula}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ icon, label, value, suffix }) {
  return (
    <div className="resume-score-card">
      <div className="resume-score-icon">{icon}</div>

      <span>{label}</span>

      <strong>
        {value}
        <span>{suffix}</span>
      </strong>

      <div className="resume-progress">
        <div
          className="resume-progress-fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>

      <small>AI evaluated</small>
    </div>
  );
}

export default ResumeAnalysis;