const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job");

dotenv.config();

const jobs = [
  {
    title: "Junior Full Stack Developer",
    company: "TechNova Solutions",
    location: "Bengaluru",
    workMode: "Hybrid",
    experience: "0–2 Years",
    salary: "₹4–7 LPA",
    category: "Full Stack",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Git",
      "REST APIs",
    ],
    description:
      "Build and maintain modern web applications using frontend and backend technologies.",
    responsibilities: [
      "Develop responsive web applications",
      "Build REST APIs",
      "Work with MongoDB",
      "Collaborate with development teams",
    ],
    requirements: [
      "Good knowledge of JavaScript",
      "Basic React and Node.js knowledge",
      "Understanding of databases",
      "Knowledge of Git",
    ],
    applicationUrl: "https://example.com/jobs/full-stack-developer",
  },

  {
    title: "Frontend Developer",
    company: "WebCraft Technologies",
    location: "Noida",
    workMode: "On-site",
    experience: "0–1 Years",
    salary: "₹3.5–6 LPA",
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
      "REST APIs",
    ],
    description:
      "Create responsive and user-friendly frontend interfaces for web applications.",
    responsibilities: [
      "Develop responsive interfaces",
      "Implement UI designs",
      "Integrate APIs",
      "Optimize frontend performance",
    ],
    requirements: [
      "Strong HTML and CSS fundamentals",
      "JavaScript knowledge",
      "Basic React knowledge",
      "Understanding of responsive design",
    ],
    applicationUrl: "https://example.com/jobs/frontend-developer",
  },

  {
    title: "React Developer",
    company: "DigitalCore Labs",
    location: "Remote",
    workMode: "Remote",
    experience: "0–2 Years",
    salary: "₹4–8 LPA",
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "REST APIs",
    ],
    description:
      "Develop scalable React applications and integrate modern web APIs.",
    responsibilities: [
      "Build React components",
      "Integrate REST APIs",
      "Create reusable UI components",
      "Fix application issues",
    ],
    requirements: [
      "JavaScript fundamentals",
      "React.js knowledge",
      "HTML and CSS",
      "Git and GitHub",
    ],
    applicationUrl: "https://example.com/jobs/react-developer",
  },

  {
    title: "Node.js Backend Developer",
    company: "CloudMatrix",
    location: "Gurugram",
    workMode: "Hybrid",
    experience: "0–2 Years",
    salary: "₹4–7.5 LPA",
    category: "Backend",
    skills: [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "SQL",
      "REST APIs",
      "Git",
      "JWT",
    ],
    description:
      "Develop backend services and APIs for scalable web applications.",
    responsibilities: [
      "Develop REST APIs",
      "Build backend services",
      "Work with MongoDB",
      "Implement authentication",
    ],
    requirements: [
      "Node.js fundamentals",
      "Express knowledge",
      "MongoDB or SQL",
      "REST API knowledge",
    ],
    applicationUrl: "https://example.com/jobs/nodejs-backend",
  },

  {
    title: "Java Developer Trainee",
    company: "EnterpriseSoft",
    location: "Pune",
    workMode: "On-site",
    experience: "Fresher",
    salary: "₹3–5 LPA",
    category: "Java",
    skills: [
      "Java",
      "OOP",
      "SQL",
      "Git",
      "REST APIs",
      "Data Structures",
    ],
    description:
      "Join the development team as a Java trainee and work on enterprise applications.",
    responsibilities: [
      "Develop Java applications",
      "Write SQL queries",
      "Understand object-oriented programming",
      "Work with development teams",
    ],
    requirements: [
      "Java fundamentals",
      "OOP concepts",
      "Basic SQL",
      "Problem-solving skills",
    ],
    applicationUrl: "https://example.com/jobs/java-trainee",
  },

  {
    title: "Software Developer Intern",
    company: "InnovateX Labs",
    location: "Lucknow",
    workMode: "Hybrid",
    experience: "Student/Fresher",
    salary: "₹15K–25K/month",
    category: "Software",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "SQL",
    ],
    description:
      "Work with the software development team on real-world web application projects.",
    responsibilities: [
      "Assist in application development",
      "Write and test code",
      "Work with databases",
      "Participate in code reviews",
    ],
    requirements: [
      "Basic programming knowledge",
      "HTML, CSS and JavaScript",
      "Basic SQL",
      "Git knowledge",
    ],
    applicationUrl: "https://example.com/jobs/software-intern",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Job.deleteMany({});

    const createdJobs = await Job.insertMany(jobs);

    console.log(`${createdJobs.length} jobs inserted successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Job seeding error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedJobs();