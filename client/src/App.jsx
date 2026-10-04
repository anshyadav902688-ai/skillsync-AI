
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SkillAnalysis from "./pages/SkillAnalysis";
import LearningRoadmap from "./pages/LearningRoadmap";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobMatching from "./pages/JobMatching";
import InterviewPrep from "./pages/InterviewPrep";
import Settings from "./pages/Settings";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">

        <div className="logo">
          <div className="logo-icon">
            <BrainCircuit size={24} />
          </div>

          <span>
            Skill<span>Sync</span> AI
          </span>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">

          <button
            className="login-btn"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Log In
          </button>

          <button
            className="signup-btn"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Get Started
            <ArrowRight size={17} />
          </button>

        </div>

      </header>

      {/* Main */}
      <main>

        {/* Hero */}
        <section className="hero">

          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="hero-content">

            <div className="badge">
              <Sparkles size={15} />
              AI-Powered Career Intelligence
            </div>

            <h1>
              Build Your Skills.
              <br />
              <span>Shape Your Future.</span>
            </h1>

            <p className="hero-text">
              SkillSync AI analyzes your skills, projects, resume and career
              goals to create a personalized roadmap for your placement
              journey.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Start Your Career Journey
                <ArrowRight size={19} />
              </button>

              <button
                className="secondary-btn"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                Explore Platform
                <ChevronRight size={18} />
              </button>

            </div>

            <div className="trust-row">

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Free Career Analysis
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Personalized Roadmap
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Smart Recommendations
              </div>

            </div>

          </div>

          {/* Dashboard Preview */}
          <div className="dashboard-preview">

            <div className="dashboard-top">

              <div>
                <p className="small-label">
                  CAREER DASHBOARD
                </p>

                <h3>
                  Welcome back, Student
                </h3>
              </div>

              <div className="profile-circle">
                AY
              </div>

            </div>

            <div className="dashboard-grid">

              <div className="score-card">

                <div className="card-header">
                  <span>
                    Career Readiness
                  </span>

                  <Target size={18} />
                </div>

                <div className="score">
                  <strong>78</strong>
                  <span>/100</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>

                <p>
                  Good progress! Keep improving your skills.
                </p>

              </div>

              <div className="stats-card">

                <div className="stat-icon">
                  <TrendingUp size={20} />
                </div>

                <span>
                  Skill Growth
                </span>

                <strong>
                  +24%
                </strong>

                <small>
                  This month
                </small>

              </div>

              <div className="stats-card">

                <div className="stat-icon purple">
                  <FileText size={20} />
                </div>

                <span>
                  Resume Score
                </span>

                <strong>
                  86%
                </strong>

                <small>
                  ATS optimized
                </small>

              </div>

            </div>

            <div className="dashboard-bottom">

              <div>

                <div className="section-title">
                  <span>
                    Skill Analysis
                  </span>

                  <small>
                    View details
                  </small>
                </div>

                <div className="skill-list">

                  <div className="skill-row">

                    <span>
                      JavaScript
                    </span>

                    <div className="mini-progress">
                      <div style={{ width: "88%" }}></div>
                    </div>

                    <b>
                      88%
                    </b>

                  </div>

                  <div className="skill-row">

                    <span>
                      React
                    </span>

                    <div className="mini-progress">
                      <div style={{ width: "72%" }}></div>
                    </div>

                    <b>
                      72%
                    </b>

                  </div>

                  <div className="skill-row">

                    <span>
                      Node.js
                    </span>

                    <div className="mini-progress">
                      <div style={{ width: "54%" }}></div>
                    </div>

                    <b>
                      54%
                    </b>

                  </div>

                </div>

              </div>

              <div className="ai-card">

                <div className="ai-icon">
                  <Sparkles size={19} />
                </div>

                <div>

                  <span>
                    AI Recommendation
                  </span>

                  <p>
                    Learn REST APIs and Node.js to improve
                    your full-stack readiness.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Features */}
        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <div className="badge">
              <Zap size={15} />
              Everything You Need
            </div>

            <h2>
              Your complete{" "}
              <span>
                career intelligence
              </span>{" "}
              platform
            </h2>

            <p>
              One intelligent platform to understand where you are,
              identify what you need, and plan where you want to go.
            </p>

          </div>

          <div className="feature-grid">

            <FeatureCard
              icon={<Target />}
              title="Career Readiness Score"
              text="Measure your overall placement readiness using skills, projects, resume and profile data."
            />

            <FeatureCard
              icon={<Search />}
              title="Skill Gap Analysis"
              text="Discover the skills you are missing for your desired career role."
            />

            <FeatureCard
              icon={<GraduationCap />}
              title="Personalized Roadmap"
              text="Get a structured learning path based on your current skills and career goals."
            />

            <FeatureCard
              icon={<FileText />}
              title="AI Resume Analysis"
              text="Analyze your resume and identify areas that can improve ATS compatibility."
            />

            <FeatureCard
              icon={<LayoutDashboard />}
              title="Smart Job Matching"
              text="Find relevant opportunities based on your skills, experience and target role."
            />

            <FeatureCard
              icon={<Users />}
              title="Interview Preparation"
              text="Practice role-specific interview questions and improve your confidence."
            />

          </div>

        </section>

        {/* How It Works */}
        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <div className="badge">
              <BrainCircuit size={15} />
              Simple Process
            </div>

            <h2>
              From student to{" "}
              <span>
                career-ready
              </span>
            </h2>

            <p>
              SkillSync AI turns your current profile into an
              actionable career plan.
            </p>

          </div>

          <div className="steps">

            <Step
              number="01"
              title="Build Your Profile"
              text="Add your education, skills, projects, certifications and career goals."
            />

            <Step
              number="02"
              title="Analyze Your Skills"
              text="Our recommendation engine identifies your strengths and skill gaps."
            />

            <Step
              number="03"
              title="Follow Your Roadmap"
              text="Complete personalized learning recommendations and track your progress."
            />

            <Step
              number="04"
              title="Get Placement Ready"
              text="Improve your resume, prepare for interviews and discover suitable opportunities."
            />

          </div>

        </section>

        {/* CTA */}
        <section
          className="cta-section"
          id="about"
        >

          <div className="cta-content">

            <Sparkles size={30} />

            <h2>
              Ready to sync your skills with your future?
            </h2>

            <p>
              Start building a smarter and more personalized
              career journey today.
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Get Started with SkillSync AI
              <ArrowRight size={19} />
            </button>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer>

        <div className="logo">

          <div className="logo-icon">
            <BrainCircuit size={20} />
          </div>

          <span>
            Skill<span>Sync</span> AI
          </span>

        </div>

        <p>
          AI-Based Smart Placement Recommendation System
        </p>

        <span>
          © 2026 SkillSync AI
        </span>

      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <button>
        Explore
        <ArrowRight size={15} />
      </button>

    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="step-card">

      <span>
        {number}
      </span>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/skill-analysis"
          element={<SkillAnalysis />}
        />
        <Route
  path="/learning-roadmap"
  element={<LearningRoadmap />}
/>
<Route
  path="/resume-analysis"
  element={<ResumeAnalysis />}
/>
<Route
  path="/job-matching"
  element={<JobMatching />}
/>
<Route
  path="/interview-prep"
  element={<InterviewPrep />}
/>
<Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

