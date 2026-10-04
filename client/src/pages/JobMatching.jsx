import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleAlert,
  Code2,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function JobMatching() {
  const navigate = useNavigate();

  const [userSkills, setUserSkills] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [skillResponse, profileResponse, jobsResponse] =
  await Promise.all([
    axios.get(
      `${API_URL}/skills/analyze`,
      {
        params: {
          targetRole: "Full Stack Developer",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

    axios.get(
      `${API_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

    axios.get(
      `${API_URL}/jobs`,
      {
        params: {
          search: "software developer",
          location: "India",
          page: 1,
        },
      }
    ),
  ]);

       const skillData = skillResponse.data;
const profileData = profileResponse.data;

const profileSkills =
  profileData.profile?.skills ||
  profileData.user?.profile?.skills ||
  profileData.user?.skills ||
  skillData.user?.skills ||
  [];

setUserSkills(profileSkills);

setAnalysis(
  skillData.analysis || null
);

        setJobs(
          jobsResponse.data.jobs || []
        );
      } catch (error) {
        console.error(
          "Job matching data error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
        setJobsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

 const normalizeSkill = (skill) => {
  const value = String(skill)
    .toLowerCase()
    .trim()
    .replace(/[.\-_]/g, " ")
    .replace(/\s+/g, " ");

  const aliases = {
    "react js": "react",
    reactjs: "react",
    "node js": "node",
    nodejs: "node",
    "express js": "express",
    expressjs: "express",
    "mongo db": "mongodb",
    "rest api": "rest",
    "rest apis": "rest",
    "restful api": "rest",
    "restful apis": "rest",
    github: "git",
  };

  return aliases[value] || value;
};

const normalizedUserSkills = useMemo(
  () =>
    new Set(
      userSkills.map(normalizeSkill)
    ),
  [userSkills]
);

  const normalizeJob = (job) => {
    const title =
      job.title || "Software Developer";

    const company =
      job.company || "Company Not Disclosed";

    const location =
      job.location || "Location not specified";

    const skills = Array.isArray(job.skills)
      ? job.skills
      : [];

    const category =
      job.category || "Software";

    return {
      ...job,

      // Adzuna uses "id", not MongoDB "_id"
      id: job.id || job._id,

      title,

      company,

      location,

      type:
        title
          .toLowerCase()
          .includes("intern") ||
        title
          .toLowerCase()
          .includes("trainee")
          ? "Internship"
          : "Full Time",

      mode:
        job.workMode || "On-site",

      experience:
        job.experience || "Not specified",

      skills,

      salary:
        job.salary || "Not disclosed",

      category,

      applicationUrl:
        job.applicationUrl ||
        job.redirect_url ||
        "",

      source:
        job.source || "Adzuna",
    };
  };

  const normalizedJobs = useMemo(
    () => jobs.map(normalizeJob),
    [jobs]
  );


    const calculateMatch = (job) => {
  if (!job.skills || job.skills.length === 0) {
    return null;
  }

  const matched = job.skills.filter((skill) =>
    normalizedUserSkills.has(
      normalizeSkill(skill)
    )
  ).length;

  return Math.round(
    (matched / job.skills.length) * 100
  );
};

  const jobsWithMatch = useMemo(
    () =>
      normalizedJobs
        .map((job) => ({
          ...job,
          match: calculateMatch(job),
        }))
        .sort((a, b) => {
  if (a.match === null) return 1;
  if (b.match === null) return -1;

  return b.match - a.match;
}),
    [normalizedJobs, normalizedUserSkills]
  );

  const filteredJobs = useMemo(() => {
    return jobsWithMatch.filter((job) => {
      const searchValue =
        search.toLowerCase().trim();

      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.description,
        ...job.skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesCategory =
        category === "All" ||
        job.category === category;

      const matchesMode =
        mode === "All" ||
        job.mode === mode;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMode
      );
    });
  }, [
    jobsWithMatch,
    search,
    category,
    mode,
  ]);

  const topMatch = jobsWithMatch[0];

  const scoredJobs = jobsWithMatch.filter(
  (job) => job.match !== null
);

const averageMatch =
  scoredJobs.length > 0
    ? Math.round(
        scoredJobs.reduce(
          (sum, job) => sum + job.match,
          0
        ) / scoredJobs.length
      )
    : 0;

  const strongMatches =
    jobsWithMatch.filter(
      (job) => job.match >= 60
    ).length;

  const getMatchClass = (score) => {
    if (score >= 80) return "match-excellent";
    if (score >= 60) return "match-good";
    if (score >= 40) return "match-medium";
    return "match-low";
  };

  const handleViewOpportunity = (job) => {
    if (job.applicationUrl) {
      window.open(
        job.applicationUrl,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    alert(
      `Application link is not available for ${job.title}.`
    );
  };

  if (loading || jobsLoading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner" />

        <p>
          Fetching real job opportunities...
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Sparkles size={20} />
          </div>

          <div className="sidebar-brand-text">
            <h2 className="sidebar-brand-title">
              SkillSync AI
            </h2>

            <p className="sidebar-brand-subtitle">
              Career Intelligence
            </p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">
            Workspace
          </div>

          <Link
            to="/dashboard"
            className="sidebar-link"
          >
            <Target size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/skill-analysis"
            className="sidebar-link"
          >
            <Code2 size={18} />
            <span>Skill Analysis</span>
          </Link>

          <Link
            to="/learning-roadmap"
            className="sidebar-link"
          >
            <TrendingUp size={18} />
            <span>Learning Roadmap</span>
          </Link>

          <Link
            to="/resume-analysis"
            className="sidebar-link"
          >
            <BriefcaseBusiness size={18} />
            <span>Resume Analysis</span>
          </Link>

          <Link
            to="/job-matching"
            className="sidebar-link active"
          >
            <Search size={18} />
            <span>Job Matching</span>
          </Link>

          <Link
            to="/interview-prep"
            className="sidebar-link"
          >
            <CheckCircle2 size={18} />
            <span>Interview Prep</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <Target size={18} />
            <span>Career Profile</span>
          </Link>
        </nav>

        <div className="sidebar-divider" />

        <div className="career-intelligence">
          <div className="career-intelligence-title">
            <Sparkles size={15} />
            AI Career Intelligence
          </div>

          <p className="career-intelligence-text">
            Real job opportunities are ranked
            using your current technical skills
            and career profile.
          </p>
        </div>
      </aside>

      {/* MAIN */}

      <main className="dashboard-main job-matching-page">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <p className="skill-analysis-label">
              CAREER OPPORTUNITIES
            </p>

            <h1>Job Matching</h1>

            <p>
              Discover real job opportunities
              matched with your current skills.
            </p>
          </div>
        </div>

        {/* HERO */}

        <section className="job-match-hero">
          <div className="job-match-hero-content">
            <div className="job-match-icon">
              <Sparkles size={25} />
            </div>

            <div>
              <span className="job-match-eyebrow">
                AI-POWERED REAL-TIME MATCHING
              </span>

              <h2>
                Real opportunities, ranked
                intelligently.
              </h2>

              <p>
                SkillSync AI fetches live job
                listings and compares their
                required skills with your
                technical profile.
              </p>
            </div>
          </div>

          <div className="job-match-hero-score">
            <span>Top Match</span>

            <strong>
              {topMatch?.match || 0}%
            </strong>

            <small>
              {topMatch?.title ||
                "No matching role yet"}
            </small>
          </div>
        </section>

        {/* STATS */}

        <section className="job-stats-grid">
          <div className="job-stat-card">
            <div className="job-stat-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <span>Live Roles</span>

              <strong>
                {jobsWithMatch.length}
              </strong>
            </div>
          </div>

          <div className="job-stat-card">
            <div className="job-stat-icon">
              <Target size={19} />
            </div>

            <div>
              <span>Average Match</span>

              <strong>
                {averageMatch}%
              </strong>
            </div>
          </div>

          <div className="job-stat-card">
            <div className="job-stat-icon">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <span>Strong Matches</span>

              <strong>
                {strongMatches}
              </strong>
            </div>
          </div>

          <div className="job-stat-card">
            <div className="job-stat-icon">
              <Code2 size={19} />
            </div>

            <div>
              <span>Your Skills</span>

              <strong>
                {userSkills.length}
              </strong>
            </div>
          </div>
        </section>

        {/* FILTERS */}

        <section className="job-filter-panel">
          <div className="job-search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search jobs, companies or skills..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="job-filter-control">
            <Filter size={16} />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="All">
                All Categories
              </option>

              <option value="Full Stack">
                Full Stack
              </option>

              <option value="Frontend">
                Frontend
              </option>

              <option value="Backend">
                Backend
              </option>

              <option value="Java">
                Java
              </option>

              <option value="Software">
                Software
              </option>
            </select>
          </div>

          <div className="job-filter-control">
            <MapPin size={16} />

            <select
              value={mode}
              onChange={(e) =>
                setMode(e.target.value)
              }
            >
              <option value="All">
                All Modes
              </option>

              <option value="Remote">
                Remote
              </option>

              <option value="Hybrid">
                Hybrid
              </option>

              <option value="On-site">
                On-site
              </option>
            </select>
          </div>
        </section>

        {/* AI PROFILE */}

        {analysis && (
          <section className="job-ai-banner">
            <div className="job-ai-banner-icon">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>
                AI Matching Profile
              </strong>

              <p>
                Your current{" "}
                <b>
                  {analysis.matchPercentage}%
                </b>{" "}
                technical match for the Full
                Stack Developer role is being
                used as part of your opportunity
                recommendations.
              </p>
            </div>

            <Link
              to="/skill-analysis"
              className="job-ai-link"
            >
              Improve Skills
              <ArrowRight size={15} />
            </Link>
          </section>
        )}

        {/* SOURCE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "18px",
            fontSize: "13px",
            opacity: 0.75,
          }}
        >
          <Sparkles size={14} />

          <span>
            Live job data powered by Adzuna
          </span>
        </div>

        {/* JOB LIST */}

        <section className="job-results-section">
          <div className="section-heading-row">
            <div>
              <span className="skill-analysis-label">
                LIVE OPPORTUNITIES
              </span>

              <h2>
                Jobs matched to your profile
              </h2>
            </div>

            <span className="job-result-count">
              {filteredJobs.length} roles
            </span>
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <article
                className="job-card"
                key={job.id}
              >
                <div className="job-card-main">
                  <div className="company-logo">
                    {job.company
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="job-card-content">
                    <div className="job-title-row">
                      <div>
                        <h3>{job.title}</h3>

                        <p>
                          {job.company}
                        </p>
                      </div>

                      <div
                        className={`job-match-badge ${
  job.match === null
    ? "match-low"
    : getMatchClass(job.match)
}`}
                      >
                        <Target size={14} />

                    {job.match === null ? "N/A" : `${job.match}% Match`}
                      </div>
                    </div>

                    <div className="job-meta">
                      <span>
                        <MapPin size={14} />

                        {job.location}
                      </span>

                      <span>
                        <BriefcaseBusiness
                          size={14}
                        />

                        {job.type}
                      </span>

                      <span>
                        {job.mode}
                      </span>

                      <span>
                        {job.experience}
                      </span>
                    </div>

                    <div className="job-skill-list">
                      {job.skills.length > 0 ? (
                        job.skills.map(
                          (skill) => {
                            const matched =
                              normalizedUserSkills.has(
                                String(skill)
                                  .toLowerCase()
                                  .trim()
                              );

                            return (
                              <span
                                className={
                                  matched
                                    ? "job-skill matched"
                                    : "job-skill"
                                }
                                key={`${job.id}-${skill}`}
                              >
                                {matched ? (
                                  <CheckCircle2
                                    size={12}
                                  />
                                ) : (
                                  <XCircle
                                    size={12}
                                  />
                                )}

                                {skill}
                              </span>
                            );
                          }
                        )
                      ) : (
                        <span className="job-skill">
                          Skills not specified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="job-card-side">
                  <span className="job-salary">
                    {job.salary}
                  </span>

                  <button
                    className="job-view-button"
                    onClick={() =>
                      handleViewOpportunity(
                        job
                      )
                    }
                  >
                    View Opportunity

                    <ExternalLink size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty-analysis">
              <CircleAlert size={28} />

              <h3>
                No matching jobs found
              </h3>

              <p>
                Try changing your search or
                filters.
              </p>
            </div>
          )}
        </section>

        {/* RESEARCH MODEL */}

        <section className="job-research-card">
          <div className="research-model-icon">
            <BrainIcon />
          </div>

          <div>
            <span className="research-badge">
              RESEARCH MODULE
            </span>

            <h3>
              Skill-Based Job Matching Model
            </h3>

            <p>
              The system calculates job
              relevance by comparing the
              student's available technical
              skills with the skills detected
              from live job descriptions.
            </p>

            <div className="job-formula">
              Match Score = Matched Required
              Skills ÷ Total Detected Skills ×
              100
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function BrainIcon() {
  return <Sparkles size={22} />;
}

export default JobMatching;