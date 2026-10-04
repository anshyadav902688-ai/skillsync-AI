const express = require("express");

const {
  analyzeSkills,
} = require("../controllers/skillController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/analyze", protect, analyzeSkills);

module.exports = router;