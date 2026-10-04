const Job = require("../models/Job");
const {
  searchJobs,
  extractSkills,
} = require("../services/adzunaService");

// Convert Adzuna job into SkillSync format
const normalizeAdzunaJob = (job) => {
  const description = job.description || "";

  const detectedSkills = extractSkills(job);

  return {
    id: job.id,

    title: job.title || "Software Developer",

    company:
      job.company?.display_name || "Company Not Disclosed",

    location:
      job.location?.display_name || "India",

    workMode: "On-site",

    experience: "Not specified",

    salary:
      job.salary_min || job.salary_max
        ? `₹${job.salary_min || "?"} - ₹${job.salary_max || "?"}`
        : "Not disclosed",

    category:
      job.category?.label || "Software",

    skills: detectedSkills,

    description,

    responsibilities: [],

    requirements: [],

    applicationUrl: job.redirect_url || "",

    isActive: true,
  };
};


// Get real jobs from Adzuna
const getJobs = async (req, res) => {
  try {
    const {
      search = "software developer",
      location = "India",
      page = 1,
    } = req.query;

    const data = await searchJobs({
      country: "in",
      what: search,
      where: location,
      page: Number(page),
      resultsPerPage: 20,
    });

    const jobs = (data.results || []).map(normalizeAdzunaJob);

    res.status(200).json({
      success: true,
      source: "Adzuna",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(
      "Adzuna job fetch error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch real jobs from Adzuna",
    });
  }
};


// Get a single MongoDB job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
};


module.exports = {
  getJobs,
  getJobById,
};