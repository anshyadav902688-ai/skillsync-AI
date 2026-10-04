const ROLE_REQUIREMENTS = {
  "Full Stack Developer": {
    requiredSkills: {
      HTML: 5,
      CSS: 5,
      JavaScript: 10,
      React: 10,
      "Node.js": 10,
      Express: 8,
      MongoDB: 8,
      SQL: 6,
      Git: 5,
      "REST APIs": 8,
    },

    recommendedSkills: [
      "TypeScript",
      "JWT",
      "Docker",
      "AWS",
      "Testing",
    ],
  },

  "Frontend Developer": {
    requiredSkills: {
      HTML: 10,
      CSS: 10,
      JavaScript: 15,
      React: 15,
      Git: 5,
      "Responsive Design": 8,
      "REST APIs": 7,
      "UI/UX": 5,
    },

    recommendedSkills: [
      "TypeScript",
      "Next.js",
      "Testing",
      "Accessibility",
    ],
  },

  "Backend Developer": {
    requiredSkills: {
      JavaScript: 10,
      "Node.js": 15,
      Express: 10,
      MongoDB: 10,
      SQL: 10,
      "REST APIs": 15,
      Git: 5,
      JWT: 5,
    },

    recommendedSkills: [
      "Docker",
      "AWS",
      "Redis",
      "Testing",
    ],
  },

  "Java Developer": {
    requiredSkills: {
      Java: 20,
      OOP: 15,
      SQL: 10,
      "Spring Boot": 15,
      Git: 5,
      "REST APIs": 10,
      "Data Structures": 10,
    },

    recommendedSkills: [
      "Hibernate",
      "Microservices",
      "Docker",
      "AWS",
    ],
  },

  "Data Analyst": {
    requiredSkills: {
      SQL: 20,
      Excel: 15,
      Python: 15,
      Statistics: 15,
      "Data Visualization": 10,
      PowerBI: 10,
      "Data Cleaning": 5,
    },

    recommendedSkills: [
      "Tableau",
      "Machine Learning",
      "Pandas",
      "NumPy",
    ],
  },
};


/* -------------------------------------------
   SKILL NORMALIZATION
-------------------------------------------- */

function normalizeSkill(skill) {
  const normalized = String(skill)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  const aliases = {
    "react.js": "react",
    reactjs: "react",

    "node.js": "node.js",
    nodejs: "node.js",

    "express.js": "express",
    expressjs: "express",

    "rest api": "rest apis",
    "restful api": "rest apis",
    "restful apis": "rest apis",

    "mongo db": "mongodb",

    "power bi": "powerbi",

    "data-structures": "data structures",

    "responsive web design": "responsive design",

    "ui ux": "ui/ux",
    "ui/ux design": "ui/ux",
  };

  return aliases[normalized] || normalized;
}


/* -------------------------------------------
   SKILL MATCH CALCULATION
-------------------------------------------- */

function calculateSkillMatch(
  userSkills = [],
  role
) {
  const roleData = ROLE_REQUIREMENTS[role];

  if (!roleData) {
    throw new Error(
      "Role " + role + " is not supported."
    );
  }

  const normalizedUserSkills = new Set(
    userSkills
      .filter(Boolean)
      .map(normalizeSkill)
  );

  let earnedWeight = 0;
  let totalWeight = 0;

  const matchedSkills = [];
  const missingSkills = [];

  for (const [
    skill,
    weight,
  ] of Object.entries(
    roleData.requiredSkills
  )) {
    totalWeight += weight;

    const normalizedRequiredSkill =
      normalizeSkill(skill);

    if (
      normalizedUserSkills.has(
        normalizedRequiredSkill
      )
    ) {
      earnedWeight += weight;

      matchedSkills.push({
        skill,
        weight,
      });
    } else {
      missingSkills.push({
        skill,
        weight,
      });
    }
  }

  const matchPercentage =
    totalWeight === 0
      ? 0
      : Math.round(
          (earnedWeight / totalWeight) * 100
        );

  return {
    role,
    matchPercentage,
    earnedWeight,
    totalWeight,
    matchedSkills,
    missingSkills,
    recommendedSkills:
      roleData.recommendedSkills,
  };
}


/* -------------------------------------------
   CAREER RECOMMENDATION ENGINE
-------------------------------------------- */

function getCareerRecommendation(
  userSkills = [],
  targetRole = "Full Stack Developer"
) {
  const role = ROLE_REQUIREMENTS[targetRole]
    ? targetRole
    : "Full Stack Developer";

  const result = calculateSkillMatch(
    userSkills,
    role
  );

  let readinessLevel = "Beginner";

  if (result.matchPercentage >= 80) {
    readinessLevel = "Placement Ready";
  } else if (result.matchPercentage >= 60) {
    readinessLevel = "Almost Ready";
  } else if (result.matchPercentage >= 40) {
    readinessLevel = "Developing";
  } else {
    readinessLevel = "Needs Improvement";
  }

  const topGaps = [
    ...result.missingSkills,
  ]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  const improvementPriority =
    topGaps.map((gap, index) => ({
      priority: index + 1,
      skill: gap.skill,
      weight: gap.weight,
      reason:
        gap.weight >= 10
          ? "High-impact skill for the selected career role."
          : "Useful supporting skill for the selected career role.",
    }));

  return {
    ...result,

    readinessLevel,

    topSkillGaps: topGaps,

    improvementPriority,

    totalRequiredSkills:
      Object.keys(
        ROLE_REQUIREMENTS[role].requiredSkills
      ).length,

    matchedSkillCount:
      result.matchedSkills.length,

    missingSkillCount:
      result.missingSkills.length,

    researchModel: {
      name: "Weighted Skill Match Model",

      formula:
        "Skill Match % = (Matched Skill Weight / Total Required Skill Weight) × 100",

      methodology:
        "Each required skill is assigned a relevance weight according to the selected career role. The student's matched skill weights are divided by the total required skill weight to calculate the skill match percentage.",

      purpose:
        "The model identifies current skill strengths, detects skill gaps and prioritizes the most important skills for career preparation.",
    },
  };
}


/* -------------------------------------------
   EXPORTS
-------------------------------------------- */

module.exports = {
  ROLE_REQUIREMENTS,
  calculateSkillMatch,
  getCareerRecommendation,
};