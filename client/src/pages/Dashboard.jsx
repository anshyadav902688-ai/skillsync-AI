
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  UserRound,
  Target,
  BookOpen,
  FileText,
  BriefcaseBusiness,
  Mic2,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  CircleAlert,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [skillAnalysis, setSkillAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Load real user profile from MongoDB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileUser = response.data.user;

        setUser(profileUser);

        localStorage.setItem(
          "user",
          JSON.stringify(profileUser)
        );
      } catch (error) {
        console.error(
          "Unable to load dashboard profile:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Load real skill analysis
  useEffect(() => {
    const fetchSkillAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
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

        setSkillAnalysis(response.data.analysis);
      } catch (error) {
        console.error(
          "Unable to load skill analysis:",
          error
        );
      } finally {
        setAnalysisLoading(false);
      }
    };

    fetchSkillAnalysis();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : "Student";

  const userSkills = user?.profile?.skills || [];

  const profile = user?.profile || {};

  const skillScore =
    skillAnalysis?.matchPercentage ?? 0;

  const readinessLevel =
    skillAnalysis?.readinessLevel || "Developing";

  const matchedSkills =
    skillAnalysis?.matchedSkills || [];

  const missingSkills =
    skillAnalysis?.missingSkills || [];

  const recommendedSkills =
    skillAnalysis?.recommendedSkills || [];

  const topSkillGaps =
    skillAnalysis?.topSkillGaps || [];

  const totalSkills =
    userSkills.length;

  const profileCompletion = calculateProfileCompletion(
    user,
    userSkills
  );

  return (
    <div className="dashboard-page">

      {/* Mobile Overlay */}
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${
          mobileMenu ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Sparkles size={20} />
          </div>

          <div>
            <h2>SkillSync</h2>
            <span>AI Career Platform</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">

          <div className="nav-section-title">
            MAIN
          </div>

          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
            onClick={() => navigate("/dashboard")}
          />

          <SidebarItem
            icon={<UserRound size={18} />}
            label="My Profile"
            onClick={() => navigate("/profile")}
          />

          <SidebarItem
            icon={<Target size={18} />}
            label="Skill Analysis"
            onClick={() => navigate("/skill-analysis")}
          />

          <SidebarItem
            icon={<BookOpen size={18} />}
            label="Learning Roadmap"
            onClick={() => navigate("/learning-roadmap")}
          />

    

          <div className="nav-section-title">
            CAREER
          </div>

          <SidebarItem
            icon={<FileText size={18} />}
            label="Resume Analysis"
            onClick={() => navigate("/resume-analysis")}
          />

          <SidebarItem
            icon={<BriefcaseBusiness size={18} />}
            label="Job Matching"
            onClick={() => navigate("/job-matching")}
          />

          <SidebarItem
            icon={<Mic2 size={18} />}
            label="Interview Prep"
             onClick={() => navigate("/interview-prep")}
          />

          <div className="nav-section-title">
            SYSTEM
          </div>

          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
             onClick={() => navigate("/settings")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-ai-card">
            <div className="ai-card-icon">
              <BrainCircuit size={19} />
            </div>

            <div>
              <strong>AI Career Assistant</strong>
              <span>Coming soon</span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={21} />
          </button>

          <div className="header-left">
            <span className="header-label">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back, {firstName}
              <span className="wave">👋</span>
            </h1>

            <p>
              Track your career readiness and build
              skills for your dream role.
            </p>
          </div>

          <div className="header-right">

            <button className="header-icon-button">
              <Search size={19} />
            </button>

            <button className="header-icon-button notification-button">
              <Bell size={19} />
              <span />
            </button>

            <div
              className="header-avatar"
              onClick={() => navigate("/profile")}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>

          </div>
        </header>

        {/* Loading */}
        {profileLoading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner" />
            <p>Loading your career dashboard...</p>
          </div>
        ) : (
          <>

            {/* Statistics */}
            <section className="dashboard-stats">

              <StatCard
                icon={<Target size={20} />}
                title="Career Readiness"
                value={`${skillScore}/100`}
                trend={
                  skillScore > 0
                    ? `${readinessLevel}`
                    : "Start analysis"
                }
                trendPositive={skillScore >= 60}
              />

              <StatCard
                icon={<TrendingUp size={20} />}
                title="Total Skills"
                value={totalSkills}
                trend={
                  totalSkills > 0
                    ? "Profile skills"
                    : "Add skills"
                }
                trendPositive={totalSkills > 0}
              />

              <StatCard
                icon={<FileText size={20} />}
                title="Resume Score"
                value="—"
                trend="Not analyzed"
                trendPositive={false}
              />

              <StatCard
                icon={<Award size={20} />}
                title="Profile"
                value={`${profileCompletion}%`}
                trend={
                  profileCompletion >= 80
                    ? "Almost complete"
                    : "Complete profile"
                }
                trendPositive={
                  profileCompletion >= 80
                }
              />

            </section>

            {/* Main Grid */}
            <section className="dashboard-grid">

              {/* Skill Analysis */}
              <div className="dashboard-card skill-card">

                <div className="card-header">

                  <div>
                    <span className="card-eyebrow">
                      AI ANALYSIS
                    </span>

                    <h2>Skill Analysis</h2>

                    <p>
                      Your current skill match for
                      Full Stack Developer.
                    </p>
                  </div>

                  <button
                    className="card-action"
                    onClick={() =>
                      navigate("/skill-analysis")
                    }
                  >
                    View analysis
                    <ChevronRight size={16} />
                  </button>

                </div>

                {analysisLoading ? (
                  <div className="mini-loading">
                    <div className="loading-spinner small" />
                    <span>
                      Analyzing your skills...
                    </span>
                  </div>
                ) : (
                  <div className="skill-list">

                    {matchedSkills.length === 0 &&
                    missingSkills.length === 0 ? (
                      <div className="empty-state">
                        <Target size={28} />

                        <h3>
                          No skills added yet
                        </h3>

                        <p>
                          Add your technical skills
                          in your profile to start
                          the AI analysis.
                        </p>

                        <button
                          className="primary-button small"
                          onClick={() =>
                            navigate("/profile")
                          }
                        >
                          Update Profile
                        </button>
                      </div>
                    ) : (
                      <>
                        {matchedSkills
                          .slice(0, 5)
                          .map((item) => (
                            <SkillRow
                              key={item.skill}
                              name={item.skill}
                              level="Matched"
                              percentage={100}
                              status="good"
                            />
                          ))}

                        {missingSkills
                          .slice(0, 3)
                          .map((item) => (
                            <SkillRow
                              key={item.skill}
                              name={item.skill}
                              level="Needs improvement"
                              percentage={0}
                              status="warning"
                            />
                          ))}
                      </>
                    )}

                  </div>
                )}

              </div>

              {/* Career Readiness */}
              <div className="dashboard-card readiness-card">

                <div className="card-header">
                  <div>
                    <span className="card-eyebrow">
                      CAREER READINESS
                    </span>

                    <h2>Placement Score</h2>
                  </div>
                </div>

                <div className="readiness-content">

                  <div
                    className="readiness-circle"
                    style={{
                      "--score": `${skillScore * 3.6}deg`,
                    }}
                  >
                    <div>
                      <strong>
                        {skillScore}
                      </strong>

                      <span>/100</span>
                    </div>
                  </div>

                  <div className="readiness-info">

                    <span className="readiness-status">
                      {readinessLevel}
                    </span>

                    <h3>
                      {skillScore >= 80
                        ? "You are placement ready!"
                        : skillScore >= 60
                        ? "You are almost ready!"
                        : "Keep building your skills."}
                    </h3>

                    <p>
                      Your readiness score is
                      calculated using the SkillSync
                      weighted skill-matching model.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* Second Row */}
            <section className="dashboard-grid second-grid">

              {/* AI Recommendation */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <span className="card-eyebrow">
                      PERSONALIZED
                    </span>

                    <h2>AI Recommendation</h2>

                    <p>
                      Focus on these areas to improve
                      your placement readiness.
                    </p>
                  </div>

                  <div className="ai-icon">
                    <Sparkles size={19} />
                  </div>

                </div>

                <div className="recommendation-list">

                  {topSkillGaps.length > 0 ? (
                    topSkillGaps
                      .slice(0, 3)
                      .map((gap, index) => (
                        <RecommendationItem
                          key={gap.skill}
                          number={index + 1}
                          title={`Improve ${gap.skill}`}
                          description={`Build stronger ${gap.skill} knowledge to improve your role match.`}
                        />
                      ))
                  ) : (
                    <>
                      <RecommendationItem
                        number={1}
                        title="Complete your profile"
                        description="Add education, projects and certifications."
                      />

                      <RecommendationItem
                        number={2}
                        title="Analyze your resume"
                        description="Get an AI-based resume readiness score."
                      />

                      <RecommendationItem
                        number={3}
                        title="Practice interviews"
                        description="Prepare for technical and HR interviews."
                      />
                    </>
                  )}

                </div>

                <button
                  className="outline-button full-width"
                  onClick={() =>
                    navigate("/skill-analysis")
                  }
                >
                  Explore Skill Analysis
                  <ChevronRight size={16} />
                </button>

              </div>

              {/* Profile Overview */}
              <div className="dashboard-card profile-overview-card">

                <div className="card-header">

                  <div>
                    <span className="card-eyebrow">
                      YOUR PROFILE
                    </span>

                    <h2>Profile Overview</h2>
                  </div>

                  <button
                    className="card-action"
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    Edit
                    <ChevronRight size={16} />
                  </button>

                </div>

                <div className="profile-overview">

                  <div className="profile-main-avatar">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>
                      {user?.name || "Student"}
                    </h3>

                    <p>
                      {profile.degree ||
                        "BCA Student"}
                    </p>

                    <span>
                      {profile.university ||
                        "University not added"}
                    </span>
                  </div>

                </div>

                <div className="profile-details">

                  <ProfileDetail
                    label="Graduation"
                    value={
                      profile.graduationYear ||
                      "Not added"
                    }
                  />

                  <ProfileDetail
                    label="Projects"
                    value={
                      profile.projects?.length ||
                      0
                    }
                  />

                  <ProfileDetail
                    label="Certifications"
                    value={
                      profile.certifications
                        ?.length || 0
                    }
                  />

                  <ProfileDetail
                    label="Skills"
                    value={totalSkills}
                  />

                </div>

                <div className="profile-progress">

                  <div className="progress-header">
                    <span>
                      Profile completion
                    </span>

                    <strong>
                      {profileCompletion}%
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${profileCompletion}%`,
                      }}
                    />
                  </div>

                </div>

              </div>

            </section>

            {/* Roadmap + Checklist */}
            <section className="dashboard-grid bottom-grid">

              {/* Roadmap */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <span className="card-eyebrow">
                      LEARNING
                    </span>

                    <h2>Recommended Roadmap</h2>

                    <p>
                      Your next learning priorities.
                    </p>
                  </div>

                  <BookOpen size={20} />
                </div>

                <div className="roadmap-list">

                  <RoadmapItem
                    number="01"
                    title={
                      topSkillGaps[0]?.skill ||
                      "Complete Skill Analysis"
                    }
                    description={
                      topSkillGaps[0]
                        ? `Improve your ${topSkillGaps[0].skill} skills.`
                        : "Analyze your skills against your target role."
                    }
                    completed={false}
                  />

                  <RoadmapItem
                    number="02"
                    title={
                      topSkillGaps[1]?.skill ||
                      "Build Projects"
                    }
                    description={
                      topSkillGaps[1]
                        ? `Practice ${topSkillGaps[1].skill} through projects.`
                        : "Add practical projects to strengthen your profile."
                    }
                    completed={false}
                  />

                  <RoadmapItem
                    number="03"
                    title={
                      recommendedSkills[0] ||
                      "Prepare for Interviews"
                    }
                    description={
                      recommendedSkills[0]
                        ? `Explore ${recommendedSkills[0]} as a recommended skill.`
                        : "Practice technical and HR interview questions."
                    }
                    completed={false}
                  />

                </div>

              </div>

              {/* Placement Checklist */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <span className="card-eyebrow">
                      PLACEMENT
                    </span>

                    <h2>Placement Checklist</h2>

                    <p>
                      Complete these steps before
                      applying.
                    </p>
                  </div>

                  <CheckCircle2 size={20} />
                </div>

                <div className="checklist">

                  <CheckItem
                    completed={profileCompletion >= 80}
                    text="Complete student profile"
                  />

                  <CheckItem
                    completed={
                      (profile.projects?.length || 0) >= 2
                    }
                    text="Add at least 2 projects"
                  />

                  <CheckItem
                    completed={false}
                    text="Upload and analyze resume"
                  />

                  <CheckItem
                    completed={totalSkills >= 5}
                    text="Complete skill assessment"
                  />

                  <CheckItem
                    completed={false}
                    text="Practice interview questions"
                  />

                </div>

                <div className="checklist-progress">

                  <span>
                    {
                      [
                        profileCompletion >= 80,
                        (profile.projects?.length || 0) >= 2,
                        false,
                        totalSkills >= 5,
                        false,
                      ].filter(Boolean).length
                    }{" "}
                    of 5 completed
                  </span>

                </div>

              </div>

            </section>

            {/* Research Model */}
            <section className="research-banner">

              <div className="research-icon">
                <BrainCircuit size={24} />
              </div>

              <div className="research-content">

                <span>
                  RESEARCH ENGINE
                </span>

                <h3>
                  AI-Based Weighted Skill Matching
                </h3>

                <p>
                  SkillSync calculates career
                  readiness using weighted role
                  requirements, matched skills and
                  skill gaps to generate personalized
                  recommendations.
                </p>

              </div>

              <div className="research-formula">
                <span>
                  Skill Match
                </span>

                <strong>
                  Matched Weight
                </strong>

                <small>
                  ───────── × 100
                </small>

                <strong>
                  Total Required Weight
                </strong>
              </div>

            </section>

          </>
        )}

        {/* Footer */}
        <footer className="dashboard-footer">

          <div>
            <strong>
              <Sparkles size={15} />
              SkillSync AI
            </strong>

            <span>
              Smart career readiness platform
              for students.
            </span>
          </div>

          <span>
            © 2026 SkillSync AI
          </span>

        </footer>

      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`sidebar-nav-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>

      {active && (
        <div className="nav-active-line" />
      )}
    </button>
  );
}

function StatCard({
  icon,
  title,
  value,
  trend,
  trendPositive,
}) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">

        <span>{title}</span>

        <strong>{value}</strong>

        <small
          className={
            trendPositive
              ? "positive"
              : "neutral"
          }
        >
          {trend}
        </small>

      </div>

    </div>
  );
}

function SkillRow({
  name,
  level,
  percentage,
  status,
}) {
  return (
    <div className="skill-row">

      <div className="skill-row-top">

        <div>
          <strong>{name}</strong>

          <span>{level}</span>
        </div>

        <span>
          {percentage}%
        </span>

      </div>

      <div className="skill-progress">

        <div
          className={`skill-progress-fill ${status}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

function RecommendationItem({
  number,
  title,
  description,
}) {
  return (
    <div className="recommendation-item">

      <div className="recommendation-number">
        {number}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

      <ChevronRight size={17} />

    </div>
  );
}

function ProfileDetail({
  label,
  value,
}) {
  return (
    <div className="profile-detail">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}

function RoadmapItem({
  number,
  title,
  description,
  completed,
}) {
  return (
    <div className="roadmap-item">

      <div
        className={`roadmap-number ${
          completed ? "completed" : ""
        }`}
      >
        {completed ? (
          <CheckCircle2 size={17} />
        ) : (
          number
        )}
      </div>

      <div className="roadmap-content">

        <strong>{title}</strong>

        <p>{description}</p>

      </div>

      <ChevronRight size={17} />

    </div>
  );
}

function CheckItem({
  completed,
  text,
}) {
  return (
    <div
      className={`check-item ${
        completed ? "completed" : ""
      }`}
    >
      {completed ? (
        <CheckCircle2 size={19} />
      ) : (
        <CircleAlert size={19} />
      )}

      <span>{text}</span>

    </div>
  );
}

/* ---------------- Helpers ---------------- */

function calculateProfileCompletion(
  user,
  skills
) {
  if (!user) {
    return 0;
  }

  const profile = user.profile || {};

  const checks = [
    Boolean(user.name),
    Boolean(user.email),
    Boolean(profile.phone),
    Boolean(profile.university),
    Boolean(profile.degree),
    Boolean(profile.graduationYear),
    skills.length > 0,
    (profile.projects?.length || 0) > 0,
    (profile.certifications?.length || 0) > 0,
  ];

  const completed = checks.filter(Boolean).length;

  return Math.round(
    (completed / checks.length) * 100
  );
}

export default Dashboard;

