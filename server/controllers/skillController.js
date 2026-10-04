const User = require("../models/User");

const {
  getCareerRecommendation,
} = require("../services/recommendationService");


/* -------------------------------------------
   CAREER READINESS CALCULATION
-------------------------------------------- */

function calculateCareerReadiness(user, skillAnalysis) {
  const profile = user.profile || {};

  // 1. Technical Skill Match — 50%
  const skillScore =
    skillAnalysis.matchPercentage || 0;


  // 2. Projects — 20%
  const projects = Array.isArray(profile.projects)
    ? profile.projects
    : [];

  let projectScore = 0;

  if (projects.length >= 3) {
    projectScore = 100;
  } else if (projects.length === 2) {
    projectScore = 80;
  } else if (projects.length === 1) {
    projectScore = 60;
  }


  // 3. Certifications — 10%
  const certifications = Array.isArray(
    profile.certifications
  )
    ? profile.certifications
    : [];

  let certificationScore = 0;

  if (certifications.length >= 3) {
    certificationScore = 100;
  } else if (certifications.length === 2) {
    certificationScore = 85;
  } else if (certifications.length === 1) {
    certificationScore = 70;
  }


  // 4. Education — 10%
  let educationScore = 0;

  if (
    profile.university &&
    profile.degree &&
    profile.graduationYear
  ) {
    educationScore = 100;
  } else if (
    profile.university &&
    profile.degree
  ) {
    educationScore = 80;
  } else if (profile.degree) {
    educationScore = 60;
  }


  // 5. Profile Completeness — 10%
  const completionFields = [
    user.name,
    profile.phone,
    profile.university,
    profile.degree,
    profile.graduationYear,
    profile.skills?.length > 0,
    profile.projects?.length > 0,
    profile.certifications?.length > 0,
  ];

  const completedFields =
    completionFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields /
      completionFields.length) *
      100
  );


  // Final weighted score
  const careerReadinessScore = Math.round(
    skillScore * 0.50 +
      projectScore * 0.20 +
      certificationScore * 0.10 +
      educationScore * 0.10 +
      profileCompletion * 0.10
  );


  // Readiness level
  let readinessLevel = "Needs Improvement";

  if (careerReadinessScore >= 85) {
    readinessLevel = "Placement Ready";
  } else if (careerReadinessScore >= 70) {
    readinessLevel = "Strong";
  } else if (careerReadinessScore >= 50) {
    readinessLevel = "Developing";
  } else {
    readinessLevel = "Beginner";
  }


  return {
    score: careerReadinessScore,

    level: readinessLevel,

    profileCompletion,

    components: {
      skillScore,
      projectScore,
      certificationScore,
      educationScore,
      profileCompletion,
    },

    weights: {
      skills: 50,
      projects: 20,
      certifications: 10,
      education: 10,
      profile: 10,
    },

    researchModel: {
      name: "Multi-Factor Career Readiness Model",

      formula:
        "Career Readiness = Skill Match × 50% + Projects × 20% + Certifications × 10% + Education × 10% + Profile Completeness × 10%",

      purpose:
        "The model combines technical skill alignment with practical projects, certifications, education and profile completeness to estimate overall career readiness.",
    },
  };
};


/* -------------------------------------------
   SKILL ANALYSIS CONTROLLER
-------------------------------------------- */

const analyzeSkills = async (req, res) => {
  try {
    const targetRole =
      req.query.targetRole ||
      "Full Stack Developer";


    // Find current user
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Get user's skills
    const userSkills =
      user.profile?.skills || [];


    // Run skill recommendation engine
    const analysis =
      getCareerRecommendation(
        userSkills,
        targetRole
      );


    // Calculate overall career readiness
    const careerReadiness =
      calculateCareerReadiness(
        user,
        analysis
      );


    // Send complete analysis
    res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: userSkills,
      },

      analysis,

      careerReadiness,
    });

  } catch (error) {
    console.error(
      "Skill analysis error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Skill analysis failed",
    });
  }
};


module.exports = {
  analyzeSkills,
  calculateCareerReadiness,
};