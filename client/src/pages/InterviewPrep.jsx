import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  Code2,
  Lightbulb,
  MessageSquare,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const QUESTION_BANK = {
  Technical: [
    {
      question:
        "What is the difference between let, const and var in JavaScript?",
      answer:
        "var is function scoped, while let and const are block scoped. let allows reassignment, whereas const does not allow reassignment after initialization.",
      difficulty: "Easy",
    },
    {
      question:
        "What is the difference between == and === in JavaScript?",
      answer:
        "== performs type conversion before comparison, while === compares both value and data type without implicit type conversion.",
      difficulty: "Easy",
    },
    {
      question:
        "What is the purpose of REST APIs?",
      answer:
        "REST APIs allow different software systems to communicate using HTTP methods such as GET, POST, PUT and DELETE.",
      difficulty: "Easy",
    },
    {
      question:
        "What is MongoDB and how is it different from SQL databases?",
      answer:
        "MongoDB is a NoSQL document database that stores data as flexible JSON-like documents, while SQL databases use structured tables and relational schemas.",
      difficulty: "Medium",
    },
    {
      question:
        "Explain the difference between authentication and authorization.",
      answer:
        "Authentication verifies who a user is, while authorization determines what that authenticated user is allowed to access.",
      difficulty: "Medium",
    },
    {
      question:
        "What is middleware in Express.js?",
      answer:
        "Middleware is a function that runs during the request-response cycle and can modify the request, response, execute logic or pass control to the next middleware.",
      difficulty: "Medium",
    },
  ],
  HR: [
    {
      question:
        "Tell me about yourself.",
      answer:
        "Give a concise introduction covering your BCA education, technical skills, important projects, strengths and the type of role you are targeting.",
      difficulty: "Easy",
    },
    {
      question:
        "Why should we hire you?",
      answer:
        "Focus on your technical foundation, project experience, willingness to learn, problem-solving ability and how you can contribute as a fresher.",
      difficulty: "Easy",
    },
    {
      question:
        "What are your strengths?",
      answer:
        "Mention strengths that can be supported with examples, such as quick learning, problem solving, time management and consistency.",
      difficulty: "Easy",
    },
    {
      question:
        "What is your weakness?",
      answer:
        "Choose a genuine but manageable weakness and explain the specific steps you are taking to improve it.",
      difficulty: "Easy",
    },
  ],
  Project: [
    {
      question:
        "Explain your SkillSync AI project.",
      answer:
        "Explain the problem, objective, technology stack, major modules, recommendation model, database, authentication and how the system helps students prepare for placements.",
      difficulty: "Medium",
    },
    {
      question:
        "Why did you choose React for your project?",
      answer:
        "React provides reusable components, efficient UI updates and a structured way to build scalable interactive interfaces.",
      difficulty: "Easy",
    },
    {
      question:
        "How does your skill matching system work?",
      answer:
        "The system normalizes user skills, compares them with weighted role requirements and calculates a percentage based on matched skill weights.",
      difficulty: "Medium",
    },
    {
      question:
        "How did you use MongoDB in your project?",
      answer:
        "MongoDB stores user accounts, profile information, skills, projects and other career-related data in flexible document structures.",
      difficulty: "Easy",
    },
  ],
};

function InterviewPrep() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [category, setCategory] = useState("Technical");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/skills/analyze",
          {
            params: {
              targetRole: "Full Stack Developer",
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error(
          "Interview preparation error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const questions = QUESTION_BANK[category];

  const question = questions[currentQuestion];

  const progress = Math.round(
    (completed.length / questions.length) * 100
  );

  const skillCount = user?.skills?.length || 0;

  const handleComplete = () => {
    if (!completed.includes(currentQuestion)) {
      setCompleted([
        ...completed,
        currentQuestion,
      ]);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
    }
  };

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setCurrentQuestion(0);
    setCompleted([]);
    setShowAnswer(false);
  };

  const readinessMessage = useMemo(() => {
    if (!analysis) {
      return "Start practicing to improve your interview confidence.";
    }

    if (analysis.matchPercentage >= 80) {
      return "Your technical profile is strong. Focus on communication and project-based questions.";
    }

    if (analysis.matchPercentage >= 60) {
      return "You have a solid foundation. Strengthen your missing technical skills before interviews.";
    }

    return "Build your core technical skills first, then practice role-specific interview questions.";
  }, [analysis]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner" />
        <p>Preparing your interview workspace...</p>
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
            <Trophy size={18} />
            <span>Learning Roadmap</span>
          </Link>

          <Link
            to="/resume-analysis"
            className="sidebar-link"
          >
            <UserCheck size={18} />
            <span>Resume Analysis</span>
          </Link>

          <Link
            to="/job-matching"
            className="sidebar-link"
          >
            <MessageSquare size={18} />
            <span>Job Matching</span>
          </Link>

          <Link
            to="/interview-prep"
            className="sidebar-link active"
          >
            <Brain size={18} />
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
            AI Interview Coach
          </div>

          <p className="career-intelligence-text">
            Practice technical, HR and project
            questions based on your career profile.
          </p>
        </div>
      </aside>

      {/* MAIN */}

      <main className="dashboard-main interview-page">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <p className="skill-analysis-label">
              INTERVIEW INTELLIGENCE
            </p>

            <h1>Interview Prep</h1>

            <p>
              Practice placement questions and
              build confidence before your next
              interview.
            </p>
          </div>
        </div>

        {/* HERO */}

        <section className="interview-hero">
          <div className="interview-hero-content">
            <div className="interview-hero-icon">
              <Brain size={25} />
            </div>

            <div>
              <span className="interview-eyebrow">
                AI INTERVIEW COACH
              </span>

              <h2>
                Practice smarter. Interview
                stronger.
              </h2>

              <p>
                Prepare with technical, HR and
                project-based questions designed
                around your career profile.
              </p>
            </div>
          </div>

          <div className="interview-readiness">
            <span>Technical Match</span>

            <strong>
              {analysis?.matchPercentage || 0}%
            </strong>

            <small>
              Full Stack Developer
            </small>
          </div>
        </section>

        {/* STATS */}

        <section className="interview-stats">
          <div className="interview-stat">
            <Code2 size={19} />

            <div>
              <span>Technical Skills</span>
              <strong>{skillCount}</strong>
            </div>
          </div>

          <div className="interview-stat">
            <MessageSquare size={19} />

            <div>
              <span>Question Bank</span>
              <strong>
                {Object.values(
                  QUESTION_BANK
                ).flat().length}
              </strong>
            </div>
          </div>

          <div className="interview-stat">
            <CheckCircle2 size={19} />

            <div>
              <span>Practiced</span>
              <strong>
                {completed.length}
              </strong>
            </div>
          </div>

          <div className="interview-stat">
            <Target size={19} />

            <div>
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}

        <section className="interview-category-grid">
          {[
            {
              id: "Technical",
              icon: <Code2 size={20} />,
              title: "Technical",
              text: "Programming, APIs, databases and web development.",
            },
            {
              id: "HR",
              icon: <UserCheck size={20} />,
              title: "HR & Behavioral",
              text: "Self-introduction, strengths and workplace questions.",
            },
            {
              id: "Project",
              icon: <Trophy size={20} />,
              title: "Project Viva",
              text: "Practice explaining your projects and research model.",
            },
          ].map((item) => (
            <button
              key={item.id}
              className={`interview-category ${
                category === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                changeCategory(item.id)
              }
            >
              <div className="interview-category-icon">
                {item.icon}
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <ChevronDown size={17} />
            </button>
          ))}
        </section>

        {/* QUESTION */}

        <section className="interview-workspace">
          <div className="interview-question-panel">
            <div className="interview-question-header">
              <div>
                <span className="skill-analysis-label">
                  QUESTION {currentQuestion + 1} OF{" "}
                  {questions.length}
                </span>

                <div className="interview-question-tags">
                  <span>
                    {category}
                  </span>

                  <span>
                    {question.difficulty}
                  </span>
                </div>
              </div>

              <div className="question-progress">
                {currentQuestion + 1}/
                {questions.length}
              </div>
            </div>

            <h2>{question.question}</h2>

            <div className="interview-actions">
              <button
                className="interview-answer-button"
                onClick={() =>
                  setShowAnswer(!showAnswer)
                }
              >
                <Lightbulb size={17} />

                {showAnswer
                  ? "Hide Guidance"
                  : "Show Guidance"}
              </button>

              <button
                className="interview-complete-button"
                onClick={handleComplete}
              >
                <CheckCircle2 size={17} />

                {completed.includes(
                  currentQuestion
                )
                  ? "Completed"
                  : "Mark Completed"}
              </button>

              <button
                className="interview-next-button"
                onClick={handleNext}
              >
                Next Question
                <ArrowRight size={16} />
              </button>
            </div>

            {showAnswer && (
              <div className="interview-answer">
                <div className="answer-icon">
                  <Lightbulb size={17} />
                </div>

                <div>
                  <strong>
                    Suggested Approach
                  </strong>

                  <p>{question.answer}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}

          <aside className="interview-side-panel">
            <div className="interview-side-heading">
              <Sparkles size={17} />

              <span>AI Preparation Insight</span>
            </div>

            <p>
              {readinessMessage}
            </p>

            <div className="interview-side-divider" />

            <h4>Recommended Focus</h4>

            {(
              analysis?.topSkillGaps || []
            )
              .slice(0, 4)
              .map((gap, index) => (
                <div
                  className="focus-item"
                  key={gap.skill}
                >
                  <span>{index + 1}</span>

                  <div>
                    <strong>
                      {gap.skill}
                    </strong>

                    <small>
                      High-priority improvement
                    </small>
                  </div>
                </div>
              ))}

            {(!analysis?.topSkillGaps ||
              analysis.topSkillGaps.length ===
                0) && (
              <div className="focus-item">
                <span>✓</span>

                <div>
                  <strong>
                    Maintain your current skills
                  </strong>

                  <small>
                    Focus on interview communication.
                  </small>
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* INTERVIEW TIPS */}

        <section className="interview-tips-card">
          <div className="interview-tips-icon">
            <Lightbulb size={21} />
          </div>

          <div>
            <span className="research-badge">
              INTERVIEW STRATEGY
            </span>

            <h3>
              Use the STAR method for behavioral
              questions
            </h3>

            <p>
              Structure your answer using Situation,
              Task, Action and Result. For technical
              questions, explain your approach first,
              then provide the implementation or
              example.
            </p>
          </div>
        </section>

        {/* CTA */}

        <section className="interview-cta">
          <div>
            <span>READY FOR THE NEXT STEP?</span>

            <h2>
              Strengthen your profile before
              applying.
            </h2>

            <p>
              Review your skill gaps and continue
              your personalized learning roadmap.
            </p>
          </div>

          <Link
            to="/learning-roadmap"
            className="primary-btn"
          >
            Open Learning Roadmap
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default InterviewPrep;