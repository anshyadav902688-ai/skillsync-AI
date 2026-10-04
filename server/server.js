const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

// Skill analysis routes
app.use("/api/skills", skillRoutes);

// Resume analysis routes
app.use("/api/resume", resumeRoutes);

//Jobs routes
app.use("/api/jobs", jobRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SkillSync AI Backend is running successfully!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `SkillSync AI server running on http://localhost:${PORT}`
  );
});