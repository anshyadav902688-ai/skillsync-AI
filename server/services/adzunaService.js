const axios = require("axios");

const ADZUNA_BASE_URL =
  "https://api.adzuna.com/v1/api/jobs";

const SKILL_ALIASES = {
  HTML: ["html", "html5"],
  CSS: ["css", "css3"],
  JavaScript: [
    "javascript",
    "java script",
    "ecmascript",
  ],
  React: [
    "react",
    "react.js",
    "reactjs",
  ],
  "Node.js": [
    "node",
    "node.js",
    "nodejs",
  ],
  Express: [
    "express",
    "express.js",
    "expressjs",
  ],
  MongoDB: [
    "mongodb",
    "mongo db",
    "mongo",
  ],
  SQL: [
    "sql",
    "mysql",
    "postgresql",
    "postgres",
  ],
  Java: ["java"],
  Python: ["python"],
  Git: ["git"],
  GitHub: ["github"],
  "REST APIs": [
    "rest api",
    "rest apis",
    "restful api",
    "restful apis",
  ],
  TypeScript: [
    "typescript",
    "type script",
  ],
  AWS: [
    "aws",
    "amazon web services",
  ],
  Docker: ["docker"],
  "Data Structures": [
    "data structures",
    "data structure",
    "dsa",
  ],
  "Spring Boot": [
    "spring boot",
    "springboot",
  ],
  "UI/UX": [
    "ui/ux",
    "ui ux",
    "user experience",
    "user interface",
  ],
  "Responsive Design": [
    "responsive design",
    "responsive web",
  ],
};

const extractSkills = (job) => {
  const text = `
    ${job.title || ""}
    ${job.description || ""}
    ${job.category?.label || ""}
  `.toLowerCase();

  const detectedSkills = [];

  Object.entries(SKILL_ALIASES).forEach(
    ([skill, aliases]) => {
      const found = aliases.some((alias) => {
  const escapedAlias = alias
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapedAlias}([^a-z0-9]|$)`,
    "i"
  );

  return pattern.test(text);
});

      if (found) {
        detectedSkills.push(skill);
      }
    }
  );

  return detectedSkills;
};

const searchJobs = async ({
  country = "in",
  what = "software developer",
  where = "",
  page = 1,
  resultsPerPage = 20,
}) => {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error(
      "Adzuna API credentials are missing."
    );
  }

  const url =
    `${ADZUNA_BASE_URL}/${country}/search/${page}`;

  const response = await axios.get(url, {
    params: {
      app_id: appId,
      app_key: appKey,
      what,
      where,
      results_per_page: resultsPerPage,
      "content-type": "application/json",
    },
  });

  return response.data;
};

module.exports = {
  searchJobs,
  extractSkills,
};