import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Code2,
  GraduationCap,
  Layers3,
  Lightbulb,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function SkillAnalysis() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [careerReadiness, setCareerReadiness] = useState(null);

  const [targetRole, setTargetRole] =
    useState("Full Stack Developer");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalysis = async (selectedRole) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${API_URL}/skills/analyze`,
        {
          params: {
            targetRole: selectedRole,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      setAnalysis(response.data.analysis);
      setCareerReadiness(
        response.data.careerReadiness
      );
    } catch (err) {
      console.error(
        "Skill analysis error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load skill analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(targetRole);
  }, [targetRole]);

  if (loading) {
    return (
      <div className="page-loading">
        <Loader2
          size={32}
          className="loading-spinner"
        />
        <p>
          Analyzing your career readiness...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-main">
          <div className="error-state">
            <CircleAlert size={42} />
            <h2>Analysis unavailable</h2>
            <p>{error}</p>

            <button
              className="primary-btn"
              onClick={() =>
                fetchAnalysis(targetRole)
              }
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const matchedSkills =
    analysis?.matchedSkills || [];

  const missingSkills =
    analysis?.missingSkills || [];

  const topSkillGaps =
    analysis?.topSkillGaps || [];

  const recommendedSkills =
    analysis?.recommendedSkills || [];

  const matchPercentage =
    analysis?.matchPercentage || 0;

  const readinessScore =
    careerReadiness?.score || 0;

  const readinessLevel =
    careerReadiness?.level ||
    analysis?.readinessLevel ||
    "Beginner";

  const readinessComponents =
    careerReadiness?.components || {};

  const userSkills = user?.skills || [];

  return (
    <div className="dashboard-page">
      {/* -------------------------------------------
          SIDEBAR
      -------------------------------------------- */}

      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>SkillSync AI</strong>
            <span>Career Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <TrendingUp size={18} />
            Dashboard
          </button>

          <button className="active">
            <Brain size={18} />
            Skill Analysis
          </button>

          <button
            onClick={() =>
              navigate("/learning-roadmap")
            }
          >
            <Layers3 size={18} />
            Learning Roadmap
          </button>

          <button
            onClick={() =>
              navigate("/resume-analysis")
            }
          >
            <Target size={18} />
            Resume Analysis
          </button>

          <button>
            <Code2 size={18} />
            Job Matching
          </button>

          <button>
            <UserCheck size={18} />
            Interview Prep
          </button>

          <button>
            <GraduationCap size={18} />
            Career Profile
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <div>
              <strong>
                {user?.name || "Student"}
              </strong>
              <span>Student Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* -------------------------------------------
          MAIN
      -------------------------------------------- */}

      <main className="dashboard-main">
        {/* HEADER */}

        <header className="dashboard-header">
          <div>
            <span className="skill-analysis-label">
              AI CAREER ANALYSIS
            </span>

            <h1>Skill & Career Analysis</h1>

            <p>
              Evaluate your technical skills,
              identify career gaps and measure
              your overall placement readiness.
            </p>
          </div>

          <div className="role-selector">
            <label>
              <Target size={16} />
              Target Career Role
            </label>

            <div className="role-select-wrapper">
              <select
                value={targetRole}
                onChange={(event) =>
                  setTargetRole(
                    event.target.value
                  )
                }
              >
                <option>
                  Full Stack Developer
                </option>

                <option>
                  Frontend Developer
                </option>

                <option>
                  Backend Developer
                </option>

                <option>
                  Java Developer
                </option>

                <option>
                  Data Analyst
                </option>
              </select>

              <ChevronDown size={17} />
            </div>
          </div>
        </header>

        {/* -------------------------------------------
            HERO SCORE
        -------------------------------------------- */}

        <section className="skill-analysis-hero">
          <div className="skill-hero-content">
            <span className="skill-analysis-label">
              CAREER READINESS
            </span>

            <h2>
              Your career readiness is{" "}
              <span>
                {readinessScore}/100
              </span>
            </h2>

            <p>
              Your score combines technical skill
              alignment, projects, certifications,
              education and profile completeness
              using a multi-factor research model.
            </p>

            <div className="skill-hero-meta">
              <div className="readiness-status">
                <ShieldCheck size={19} />

                <div>
                  <strong>
                    {readinessLevel}
                  </strong>

                  <span>
                    Based on the multi-factor
                    readiness model
                  </span>
                </div>
              </div>

              <div className="target-role-pill">
                <Target size={16} />
                {targetRole}
              </div>
            </div>
          </div>

          <div className="skill-score-circle">
            <div
              className="skill-score-ring"
              style={{
                "--score":
                  `${readinessScore * 3.6}deg`,
              }}
            >
              <div className="skill-score-inner">
                <strong>
                  {readinessScore}
                </strong>

                <span>Readiness</span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------
            OVERVIEW CARDS
        -------------------------------------------- */}

        <section className="skill-overview-grid">
          <OverviewCard
            icon={<Target size={21} />}
            title="Career Match"
            value={`${matchPercentage}%`}
            description={`Skill alignment for ${targetRole}`}
          />

          <OverviewCard
            icon={<CheckCircle2 size={21} />}
            title="Matched Skills"
            value={matchedSkills.length}
            description="Required skills already covered"
          />

          <OverviewCard
            icon={<CircleAlert size={21} />}
            title="Skill Gaps"
            value={missingSkills.length}
            description="Skills recommended for improvement"
          />

          <OverviewCard
            icon={<Lightbulb size={21} />}
            title="Recommendations"
            value={recommendedSkills.length}
            description="Additional skills to explore"
          />
        </section>

        {/* -------------------------------------------
            READINESS BREAKDOWN
        -------------------------------------------- */}

        <section className="readiness-breakdown">
          <div className="readiness-breakdown-header">
            <div>
              <span className="skill-analysis-label">
                RESEARCH MODEL
              </span>

              <h2>
                Career Readiness Breakdown
              </h2>

              <p>
                Your overall score is calculated
                using five weighted factors.
              </p>
            </div>

            <div className="research-badge">
              <Brain size={17} />
              Weighted Multi-Factor Model
            </div>
          </div>

          <div className="readiness-factor-grid">
            <ReadinessFactor
              title="Technical Skills"
              score={
                readinessComponents.skillScore
              }
              weight="50%"
              icon={<Code2 size={18} />}
            />

            <ReadinessFactor
              title="Projects"
              score={
                readinessComponents.projectScore
              }
              weight="20%"
              icon={<Layers3 size={18} />}
            />

            <ReadinessFactor
              title="Certifications"
              score={
                readinessComponents.certificationScore
              }
              weight="10%"
              icon={<ShieldCheck size={18} />}
            />

            <ReadinessFactor
              title="Education"
              score={
                readinessComponents.educationScore
              }
              weight="10%"
              icon={<GraduationCap size={18} />}
            />

            <ReadinessFactor
              title="Profile Completeness"
              score={
                readinessComponents.profileCompletion
              }
              weight="10%"
              icon={<UserCheck size={18} />}
            />
          </div>
        </section>

        {/* -------------------------------------------
            CURRENT SKILLS
        -------------------------------------------- */}

        <section className="analysis-two-column">
          <div className="analysis-panel">
            <div className="analysis-panel-header">
              <div>
                <span className="skill-analysis-label">
                  CURRENT PROFILE
                </span>

                <h2>Your Technical Skills</h2>

                <p>
                  Skills currently stored in your
                  SkillSync AI profile.
                </p>
              </div>

              <div className="panel-count">
                {userSkills.length}
              </div>
            </div>

            {userSkills.length > 0 ? (
              <div className="skill-chip-list">
                {userSkills.map(
                  (skill, index) => (
                    <div
                      className="skill-chip matched"
                      key={`${skill}-${index}`}
                    >
                      <CheckCircle2
                        size={15}
                      />
                      {skill}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="empty-analysis">
                <CircleAlert size={28} />

                <p>
                  No technical skills have been
                  added to your profile yet.
                </p>
              </div>
            )}
          </div>

          {/* AI INSIGHT */}

          <div className="analysis-panel ai-insight-panel">
            <div className="analysis-panel-header">
              <div>
                <span className="skill-analysis-label">
                  AI INSIGHT
                </span>

                <h2>
                  What Your Score Means
                </h2>
              </div>

              <div className="ai-icon">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="ai-insight-content">
              {readinessScore >= 85 ? (
                <>
                  <strong>
                    You are placement ready.
                  </strong>

                  <p>
                    Your profile demonstrates
                    strong technical alignment and
                    supporting career evidence.
                    Focus on interview preparation
                    and advanced role-specific
                    skills.
                  </p>
                </>
              ) : readinessScore >= 70 ? (
                <>
                  <strong>
                    You are close to placement
                    readiness.
                  </strong>

                  <p>
                    Your foundation is strong.
                    Closing the highest-priority
                    skill gaps can significantly
                    improve your career readiness.
                  </p>
                </>
              ) : readinessScore >= 50 ? (
                <>
                  <strong>
                    You are currently developing.
                  </strong>

                  <p>
                    You have a useful foundation,
                    but several important areas
                    should be improved before
                    placement applications.
                  </p>
                </>
              ) : (
                <>
                  <strong>
                    Your profile needs improvement.
                  </strong>

                  <p>
                    Start with the highest-weighted
                    missing skills and strengthen
                    your projects and profile
                    evidence.
                  </p>
                </>
              )}

              <div className="ai-insight-action">
                <Sparkles size={15} />
                Personalized using your profile
                data
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------
            SKILL GAP ANALYSIS
        -------------------------------------------- */}

        <section className="skill-gap-section">
          <div className="section-heading-row">
            <div>
              <span className="skill-analysis-label">
                GAP DETECTION
              </span>

              <h2>
                Skill Gap Analysis
              </h2>

              <p>
                These skills are currently missing
                for your selected career role.
              </p>
            </div>

            <div className="gap-summary">
              <CircleAlert size={17} />
              {missingSkills.length} gaps detected
            </div>
          </div>

          {missingSkills.length > 0 ? (
            <div className="skill-gap-grid">
              {missingSkills.map(
                (item, index) => (
                  <div
                    className="skill-gap-card"
                    key={`${item.skill}-${index}`}
                  >
                    <div className="gap-card-top">
                      <div className="gap-skill-icon">
                        <XCircle size={18} />
                      </div>

                      <div>
                        <strong>
                          {item.skill}
                        </strong>

                        <span>
                          Required skill
                        </span>
                      </div>
                    </div>

                    <div className="gap-card-bottom">
                      <span>
                        Relevance weight
                      </span>

                      <strong>
                        {item.weight}
                      </strong>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="success-analysis">
              <CheckCircle2 size={28} />

              <div>
                <strong>
                  No major skill gaps detected.
                </strong>

                <p>
                  Your current skills match all
                  required skills for this role.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* -------------------------------------------
            TOP PRIORITY GAPS
        -------------------------------------------- */}

        {topSkillGaps.length > 0 && (
          <section className="priority-section">
            <div className="section-heading-row">
              <div>
                <span className="skill-analysis-label">
                  PRIORITIZED LEARNING
                </span>

                <h2>
                  Highest-Impact Skill Gaps
                </h2>

                <p>
                  Focus on these skills first for
                  maximum improvement.
                </p>
              </div>
            </div>

            <div className="priority-list">
              {topSkillGaps.map(
                (gap, index) => (
                  <div
                    className="priority-item"
                    key={`${gap.skill}-${index}`}
                  >
                    <div className="priority-number">
                      {index + 1}
                    </div>

                    <div className="priority-info">
                      <strong>
                        {gap.skill}
                      </strong>

                      <span>
                        Weight: {gap.weight}
                      </span>
                    </div>

                    <div className="priority-reason">
                      {gap.weight >= 10
                        ? "High-impact skill for your selected career role."
                        : "Useful supporting skill for your selected career role."}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* -------------------------------------------
            RECOMMENDED SKILLS
        -------------------------------------------- */}

        <section className="recommendation-section">
          <div className="section-heading-row">
            <div>
              <span className="skill-analysis-label">
                FUTURE SKILLS
              </span>

              <h2>
                Recommended Skills
              </h2>

              <p>
                Additional technologies that can
                strengthen your career profile.
              </p>
            </div>
          </div>

          {recommendedSkills.length > 0 ? (
            <div className="learning-path-grid">
              {recommendedSkills.map(
                (skill, index) => (
                  <LearningStep
                    key={`${skill}-${index}`}
                    number={index + 1}
                    title={skill}
                    description={
                      getSkillDescription(
                        skill
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="success-analysis">
              <CheckCircle2 size={28} />

              <div>
                <strong>
                  Your skill profile is well
                  aligned.
                </strong>

                <p>
                  Continue improving your existing
                  skills and building practical
                  projects.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* -------------------------------------------
            RESEARCH MODEL
        -------------------------------------------- */}

        <section className="research-model-card">
          <div className="research-model-icon">
            <Brain size={25} />
          </div>

          <div className="research-model-content">
            <span className="skill-analysis-label">
              RESEARCH & METHODOLOGY
            </span>

            <h2>
              Multi-Factor Career Readiness
              Model
            </h2>

            <p>
              SkillSync AI evaluates career
              readiness using multiple measurable
              factors instead of relying only on
              technical skills.
            </p>

            <div className="research-formula">
              <strong>Formula</strong>

              <code>
                Career Readiness = Skill Match ×
                50% + Projects × 20% +
                Certifications × 10% + Education ×
                10% + Profile Completeness × 10%
              </code>
            </div>

            <div className="research-method-grid">
              <ResearchMethod
                title="Technical Skills"
                value="50%"
              />

              <ResearchMethod
                title="Projects"
                value="20%"
              />

              <ResearchMethod
                title="Certifications"
                value="10%"
              />

              <ResearchMethod
                title="Education"
                value="10%"
              />

              <ResearchMethod
                title="Profile"
                value="10%"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------
            NEXT STEP
        -------------------------------------------- */}

        <section className="next-step-card">
          <div>
            <span className="skill-analysis-label">
              RECOMMENDED NEXT STEP
            </span>

            <h2>
              Build your personalized learning
              roadmap
            </h2>

            <p>
              Use your identified skill gaps to
              generate a structured career
              preparation path.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/learning-roadmap")
            }
          >
            View Learning Roadmap
            <ArrowRight size={17} />
          </button>
        </section>

        {/* FOOTER */}

        <footer className="dashboard-footer">
          <span>
            SkillSync AI · AI-Based Smart Placement
            Recommendation System
          </span>

          <span>
            Research-driven career intelligence
          </span>
        </footer>
      </main>
    </div>
  );
}


/* -------------------------------------------
   OVERVIEW CARD
-------------------------------------------- */

function OverviewCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="skill-overview-card">
      <div className="overview-card-icon">
        {icon}
      </div>

      <div className="overview-card-content">
        <span>{title}</span>

        <strong>{value}</strong>

        <p>{description}</p>
      </div>
    </div>
  );
}


/* -------------------------------------------
   READINESS FACTOR
-------------------------------------------- */

function ReadinessFactor({
  title,
  score = 0,
  weight,
  icon,
}) {
  const safeScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100
  );

  return (
    <div className="readiness-factor">
      <div className="readiness-factor-top">
        <div className="readiness-factor-title">
          <div className="factor-icon">
            {icon}
          </div>

          <strong>{title}</strong>
        </div>

        <span>
          Weight {weight}
        </span>
      </div>

      <div className="readiness-factor-score">
        {safeScore}/100
      </div>

      <div className="readiness-factor-bar">
        <div
          style={{
            width: `${safeScore}%`,
          }}
        ></div>
      </div>
    </div>
  );
}


/* -------------------------------------------
   LEARNING STEP
-------------------------------------------- */

function LearningStep({
  number,
  title,
  description,
}) {
  return (
    <div className="learning-step">
      <div className="learning-step-number">
        {number}
      </div>

      <div className="learning-step-content">
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

      <ArrowRight
        size={18}
        className="learning-arrow"
      />
    </div>
  );
}


/* -------------------------------------------
   RESEARCH METHOD
-------------------------------------------- */

function ResearchMethod({
  title,
  value,
}) {
  return (
    <div className="research-method-item">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}


/* -------------------------------------------
   SKILL DESCRIPTION
-------------------------------------------- */

function getSkillDescription(skill) {
  const descriptions = {
    TypeScript:
      "Add stronger type safety and maintainability to JavaScript applications.",

    "Next.js":
      "Learn production-ready React development with routing, optimization and modern web architecture.",

    Testing:
      "Improve software quality through automated unit, integration and application testing.",

    Accessibility:
      "Build inclusive web applications that are usable by people with different abilities.",

    Docker:
      "Learn containerization and consistent application deployment workflows.",

    AWS:
      "Understand cloud deployment, hosting and scalable application infrastructure.",

    Redis:
      "Learn caching and high-performance data access for backend applications.",

    JWT:
      "Strengthen authentication and secure API access using token-based authorization.",

    Express:
      "Build structured and scalable backend APIs with Express.js.",

    "REST APIs":
      "Develop professional APIs for communication between frontend and backend systems.",

    Hibernate:
      "Learn Java object-relational mapping for enterprise backend applications.",

    Microservices:
      "Understand scalable distributed backend architecture.",

    Pandas:
      "Use Python data tools for data cleaning, analysis and manipulation.",

    NumPy:
      "Build foundations for numerical computing and data analysis.",

    Tableau:
      "Create interactive dashboards and communicate analytical insights visually.",

    "Machine Learning":
      "Develop predictive models and strengthen data-driven decision making.",
  };

  return (
    descriptions[skill] ||
    `Develop practical ${skill} skills to improve your career readiness and role alignment.`
  );
}


export default SkillAnalysis;