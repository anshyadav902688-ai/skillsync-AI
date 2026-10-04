const express = require("express");

const {
  analyzeResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");
const uploadResume = require("../middleware/resumeUpload");

const router = express.Router();

router.post(
  "/analyze",
  protect,
  uploadResume.single("resume"),
  analyzeResume
);

module.exports = router;