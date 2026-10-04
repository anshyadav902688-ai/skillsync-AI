# 🚀 SkillSync AI

### AI-Based Smart Placement Recommendation & Career Readiness System

SkillSync AI is a full-stack intelligent career guidance and placement recommendation platform designed to help students understand their career readiness, identify skill gaps, discover relevant job opportunities, analyze resumes, build learning roadmaps, and prepare for interviews.

The system combines **skill analysis, weighted skill matching, career readiness scoring, resume analysis, job matching, and personalized recommendations** into a single platform.

---

## 🎯 Project Objective

Many students struggle to understand whether their current skills are sufficient for their target job role.

SkillSync AI addresses this problem by analyzing:

* Technical skills
* Projects
* Certifications
* Education
* Profile completeness
* Resume quality
* Job requirements

The system then generates personalized insights and recommendations to help students improve their employability.

---

## ✨ Key Features

### 👤 Student Profile

Students can maintain their professional profile including:

* Full name
* Email
* University
* Degree
* Graduation year
* Technical skills
* Projects
* Certifications

---

### 📊 Career Readiness Analysis

SkillSync AI calculates an overall career readiness score using a multi-factor research model.

**Career Readiness Score**

```text
Career Readiness =
(Skill Match × 50%)
+ (Projects × 20%)
+ (Certifications × 10%)
+ (Education × 10%)
+ (Profile Completeness × 10%)
```

The system categorizes students into:

|     Score | Readiness Level |
| --------: | --------------- |
|   85–100% | Placement Ready |
|    70–84% | Strong          |
|    50–69% | Developing      |
| Below 50% | Beginner        |

---

### 🧠 Intelligent Skill Matching

SkillSync AI uses a weighted skill-matching algorithm to compare student skills against the requirements of different career roles.

Supported roles include:

* Full Stack Developer
* Frontend Developer
* Backend Developer
* Java Developer
* Data Analyst

The system identifies:

* Matched skills
* Missing skills
* Recommended skills
* Skill match percentage
* Highest-impact skill gaps

---

### 💼 Real-Time Job Matching

The platform integrates with the **Adzuna Jobs API** to retrieve real job listings.

Users can explore:

* Job title
* Company
* Location
* Salary information
* Job description
* Required skills
* Job match percentage
* Application link

The platform compares the user's skills with detected job requirements to calculate job relevance.

---

### 📄 Resume Analysis

Users can upload their resume for automated analysis.

Supported formats:

* PDF
* DOCX

The system evaluates:

* Keyword relevance
* Resume sections
* Content quality
* Resume length
* ATS compatibility
* Career relevance

The system also provides:

* Resume strengths
* Improvement suggestions
* Matched keywords
* Detected sections
* ATS score
* Overall resume score

---

### 🗺️ Personalized Learning Roadmap

Based on the student's skill gaps, SkillSync AI generates a prioritized learning roadmap.

The roadmap helps students understand:

1. What they already know
2. What skills are missing
3. Which skills should be learned first
4. Which advanced skills can improve career opportunities

---

### 🎤 Interview Preparation

The platform provides an interview preparation section designed around the student's target career path.

It can be extended to provide:

* Technical questions
* HR questions
* Role-specific questions
* Mock interview preparation
* Interview tips
* Preparation progress

---

### ⚙️ Personalization Settings

Students can configure:

* Target role
* Preferred location
* Job alerts
* Roadmap reminders
* Interview reminders
* Career updates
* Public profile visibility
* Appearance preferences

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      Student        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │      Backend        │
                    └──────┬───────┬──────┘
                           │       │
                 ┌─────────┘       └─────────┐
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │    MongoDB      │        │ Recommendation  │
        │    Database     │        │     Engine      │
        └─────────────────┘        └────────┬────────┘
                                            │
                                            ▼
                                  ┌────────────────────┐
                                  │ Career Readiness   │
                                  │ Skill Matching     │
                                  │ Recommendations    │
                                  └─────────┬──────────┘
                                            │
                                            ▼
                                  ┌────────────────────┐
                                  │ External Services  │
                                  │                    │
                                  │ Adzuna Jobs API    │
                                  │ AI API (planned)   │
                                  └────────────────────┘
```

---

## 🧮 Research Model

### Weighted Skill Match

The skill recommendation engine uses weighted requirements for different job roles.

```text
Skill Match % =
(Matched Skill Weight /
 Total Required Skill Weight) × 100
```

This approach gives higher importance to critical skills instead of treating every skill equally.

For example:

```text
JavaScript → High Weight
React      → High Weight
Git        → Medium Weight
Docker     → Recommended
```

---

## 📈 Career Readiness Model

SkillSync AI combines multiple factors to produce a more comprehensive readiness score.

```text
                    Career Readiness
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
      Skills            Projects        Certifications
       50%                20%                10%
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
              Education       Profile Completion
                 10%                  10%
```

This multi-factor model reduces dependence on technical skills alone.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript ES6+
* HTML5
* CSS3
* React Router
* Axios
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt.js
* Multer
* PDF Parser
* Mammoth

### Database

* MongoDB
* Mongoose

### External Services

* Adzuna Jobs API
* AI API integration planned

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Compass
* npm

---

## 📁 Project Structure

```text
skillsync-ai/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SkillAnalysis.jsx
│   │   │   ├── LearningRoadmap.jsx
│   │   │   ├── ResumeAnalysis.jsx
│   │   │   ├── JobMatching.jsx
│   │   │   ├── InterviewPrep.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   │
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   │
│   ├── config/
│   │   ├── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── skillController.js
│   │   ├── resumeController.js
│   │   └── jobController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── services/
│   │   ├── recommendationService.js
│   │   └── adzunaService.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication

SkillSync AI uses secure authentication with:

* JWT tokens
* bcrypt password hashing
* Protected API routes
* Token-based authorization

Authentication flow:

```text
Register
   ↓
Password Hashing
   ↓
MongoDB
   ↓
Login
   ↓
JWT Token
   ↓
Protected APIs
```

---

## 🔌 Main API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Profile

```text
GET  /api/profile
PUT  /api/profile
```

### Skill Analysis

```text
GET /api/skills/analyze
```

Example:

```text
/api/skills/analyze?targetRole=Full%20Stack%20Developer
```

### Resume

```text
POST /api/resume/analyze
```

### Jobs

```text
GET /api/jobs
GET /api/jobs/:id
```

Example:

```text
/api/jobs?search=software%20developer&location=India
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

```bash
cd skillsync-ai
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

Create:

```text
server/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/skillsync_ai

JWT_SECRET=your_jwt_secret

ADZUNA_APP_ID=your_adzuna_app_id

ADZUNA_APP_KEY=your_adzuna_app_key
```

**Never upload `.env` to GitHub.**

Add it to `.gitignore`:

```text
.env
node_modules
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5179
```

The exact frontend port may change if another application is already using the default Vite port.

---

## 🧪 Testing

The system can be tested through the following modules:

### Authentication Testing

* User registration
* User login
* Invalid credentials
* Protected routes

### Profile Testing

* Update profile
* Add skills
* Add projects
* Add certifications

### Recommendation Testing

* Different target roles
* Skill matching
* Missing skill detection
* Readiness calculation

### Resume Testing

* PDF upload
* DOCX upload
* Invalid file type
* Resume scoring

### Job Testing

* Real job retrieval
* Location filtering
* Skill detection
* Job matching

---

## 📊 Example Career Analysis

A student's profile may produce:

```text
Target Role:
Full Stack Developer

Skill Match:
68%

Projects:
80%

Certifications:
70%

Education:
100%

Profile Completion:
90%

Career Readiness:
76%

Readiness Level:
Strong
```

The system can then recommend:

```text
Priority Skills

1. Express.js
2. REST APIs
3. TypeScript
4. Docker
5. AWS
```

---

## 🎓 Academic / Research Relevance

SkillSync AI demonstrates the practical application of:

* Artificial Intelligence concepts
* Recommendation systems
* Weighted scoring algorithms
* Natural language processing concepts
* Full-stack web development
* Database management
* REST API architecture
* Authentication and authorization
* Data-driven decision support

The project can be used as a **BCA final-year research and development project** focused on intelligent career recommendation systems.

---

## 🔮 Future Scope

Future versions can introduce:

### 🤖 Advanced AI Recommendation

* LLM-based career recommendations
* Natural language resume understanding
* Personalized AI career assistant
* Intelligent skill extraction

### 📄 Advanced Resume Intelligence

* ATS optimization
* Job-specific resume scoring
* Automatic resume improvement
* Resume keyword recommendations

### 🎤 AI Mock Interviews

* AI interviewer
* Voice-based interview
* Answer evaluation
* Confidence analysis
* Personalized feedback

### 📊 Advanced Analytics

* Student performance analytics
* Skill demand trends
* Industry skill trends
* Placement probability prediction

### 🏢 Recruiter Module

* Recruiter dashboard
* Candidate search
* Candidate filtering
* Skill-based recruitment
* Candidate comparison

### 👨‍💼 Admin Panel

* Student management
* Job management
* Skill management
* Platform analytics
* System monitoring

---

## 🌐 Deployment

Planned deployment architecture:

```text
                GitHub
                   │
          ┌────────┴────────┐
          ▼                 ▼
       Vercel           Backend Host
      Frontend             │
                           ▼
                       MongoDB
                           │
                           ▼
                    External APIs
```

Frontend can be deployed using **Vercel**, while the backend can be deployed using a suitable Node.js hosting platform.

---

## 🔒 Security Considerations

The application follows several security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Protected backend routes
* Environment variables for API credentials
* Input validation
* File-type validation
* Temporary resume file cleanup
* No sensitive API credentials stored in frontend code

---

## 📸 Screenshots

Add screenshots of the following modules after deployment:

```text
01 — Landing Page
02 — Login
03 — Registration
04 — Dashboard
05 — Profile
06 — Skill Analysis
07 — Career Readiness
08 — Learning Roadmap
09 — Resume Analysis
10 — Job Matching
11 — Interview Preparation
12 — Settings
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

## 👨‍💻 Developer

**Amresh Yadav**

BCA — Shri Ramswaroop Memorial University
Lucknow, Uttar Pradesh, India

### Interests

* Full Stack Development
* Artificial Intelligence
* Software Engineering
* Web Development
* Career Technology

---

## 📜 Project Status

```text
🟢 Authentication             Completed
🟢 Student Profile            Completed
🟢 Skill Analysis             Completed
🟢 Career Readiness Model     Completed
🟢 Learning Roadmap           Completed
🟢 Resume Analysis            Completed
🟢 Real Job Matching          Completed
🟢 Settings                   Completed
🟡 Interview Preparation      In Development
🟡 Advanced AI Features      Planned
🟡 Admin Panel                Planned
🟡 Production Deployment     Planned
```

---

## ⭐ Conclusion

SkillSync AI provides an integrated approach to student career development by combining **skill analysis, career readiness evaluation, resume intelligence, real-world job matching, and personalized learning recommendations**.

The platform aims to bridge the gap between a student's current skill set and industry requirements by providing measurable, data-driven, and personalized career guidance.

---

### ⭐ If you find this project useful, consider giving the repository a star.
