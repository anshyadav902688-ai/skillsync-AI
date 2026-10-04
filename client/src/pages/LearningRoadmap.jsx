import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function LearningRoadmap() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/skills/analyze",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAnalysis(response.data.analysis);
      } catch (err) {
        console.error("Learning roadmap error:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load your learning roadmap."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [navigate]);

  if (loading) {
    return (
      <div className="roadmap-loading">
        <div className="roadmap-loader"></div>
        <p>Generating your personalized roadmap...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roadmap-loading">
        <Target size={40} />

        <h2>Unable to load roadmap</h2>

        <p>{error}</p>

        <button
          className="roadmap-primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const missingSkills = analysis?.missingSkills || [];
  const recommendedSkills = analysis?.recommendedSkills || [];

  return (
    <div className="roadmap-page">

      {/* Header */}
      <header className="roadmap-header">

        <button
          className="roadmap-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="roadmap-eyebrow">
          <Sparkles size={15} />
          AI Career Planner
        </div>

        <h1>Learning Roadmap</h1>

        <p>
          Your personalized learning path based on your current
          skills and target career role.
        </p>

      </header>

      <main className="roadmap-container">

        {/* Hero */}
        <section className="roadmap-hero">

          <div>
            <span className="roadmap-label">
              TARGET ROLE
            </span>

            <h2>
              {analysis?.role || "Full Stack Developer"}
            </h2>

            <p>
              SkillSync AI has analyzed your profile and
              identified the skills you should focus on next.
            </p>
          </div>

          <div className="roadmap-score">
            <div className="roadmap-score-number">
              {analysis?.matchPercentage || 0}%
            </div>

            <span>Current Match</span>
          </div>

        </section>

        {/* Statistics */}
        <section className="roadmap-stats">

          <div className="roadmap-stat-card">

            <div className="roadmap-stat-icon">
              <Target size={20} />
            </div>

            <div>
              <strong>
                {missingSkills.length}
              </strong>

              <span>
                Skill Gaps
              </span>
            </div>

          </div>

          <div className="roadmap-stat-card">

            <div className="roadmap-stat-icon">
              <BookOpen size={20} />
            </div>

            <div>
              <strong>
                {recommendedSkills.length}
              </strong>

              <span>
                Recommended Skills
              </span>
            </div>

          </div>

          <div className="roadmap-stat-card">

            <div className="roadmap-stat-icon">
              <TrendingUp size={20} />
            </div>

            <div>
              <strong>
                {analysis?.readinessLevel || "Developing"}
              </strong>

              <span>
                Readiness Level
              </span>
            </div>

          </div>

        </section>

        {/* Learning Path */}
        <section className="roadmap-section">

          <div className="roadmap-section-heading">

            <span className="roadmap-label">
              PERSONALIZED PATH
            </span>

            <h2>
              Your Skill Development Roadmap
            </h2>

          </div>

          <div className="roadmap-timeline">

            {missingSkills.length > 0 ? (
              missingSkills.map((item, index) => (

                <div
                  className="roadmap-step"
                  key={item.skill}
                >

                  <div className="roadmap-step-number">
                    {index + 1}
                  </div>

                  <div className="roadmap-line"></div>

                  <div className="roadmap-step-card">

                    <div className="roadmap-step-top">

                      <div>

                        <span className="roadmap-phase">
                          PHASE {index + 1}
                        </span>

                        <h3>
                          {item.skill}
                        </h3>

                      </div>

                      <div className="roadmap-weight">
                        Weight: {item.weight}
                      </div>

                    </div>

                    <p>
                      Develop practical knowledge of{" "}
                      <strong>
                        {item.skill}
                      </strong>{" "}
                      and apply it through hands-on
                      practice and projects.
                    </p>

                    <div className="roadmap-meta">

                      <span>
                        <Clock3 size={15} />
                        1–2 Weeks
                      </span>

                      <span>
                        <BookOpen size={15} />
                        Practical Learning
                      </span>

                    </div>

                  </div>

                </div>

              ))
            ) : (
              <div className="roadmap-complete">

                <CheckCircle2 size={42} />

                <h3>
                  Excellent! Your required skills are covered.
                </h3>

                <p>
                  Continue improving your advanced skills
                  to become more competitive.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* Recommended Skills */}
        <section className="roadmap-section">

          <div className="roadmap-section-heading">

            <span className="roadmap-label">
              NEXT LEVEL
            </span>

            <h2>
              Recommended Advanced Skills
            </h2>

          </div>

          <div className="recommended-grid">

            {recommendedSkills.length > 0 ? (
              recommendedSkills.map((skill) => (

                <div
                  className="recommended-card"
                  key={skill}
                >

                  <div className="recommended-icon">
                    <Sparkles size={18} />
                  </div>

                  <div>

                    <h3>
                      {skill}
                    </h3>

                    <p>
                      Recommended to improve your
                      competitiveness for the target role.
                    </p>

                  </div>

                </div>

              ))
            ) : (
              <div className="recommended-card">

                <div className="recommended-icon">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <h3>
                    No additional skills yet
                  </h3>

                  <p>
                    Your current profile covers the
                    recommended skills.
                  </p>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* Research Section */}
        <section className="roadmap-research">

          <div className="roadmap-research-icon">
            <Target size={22} />
          </div>

          <div>

            <span>
              RESEARCH MODEL
            </span>

            <h3>
              Weighted Skill Gap Prioritization
            </h3>

            <p>
              SkillSync AI prioritizes missing skills
              according to their importance weight for
              the selected career role. Higher-weight
              skills are placed earlier in the roadmap.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
}

export default LearningRoadmap;