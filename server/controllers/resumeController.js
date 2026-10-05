const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const analyzeResume = async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume file.",
      });
    }

    filePath = req.file.path;

    let resumeText = "";

    // PDF

if (req.file.mimetype === "application/pdf") {

  const dataBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: dataBuffer,
  });

  const pdfData = await parser.getText();

  resumeText = pdfData.text;

  await parser.destroy();
    }

    // DOCX
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      resumeText = result.value;
    }

    // DOC
    else if (req.file.mimetype === "application/msword") {
      return res.status(400).json({
        success: false,
        message:
          "Old .doc files are not supported yet. Please upload PDF or DOCX.",
      });
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Only PDF and DOCX files are supported.",
      });
    }

    resumeText = resumeText.trim();

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract text from this resume. Please upload a text-based PDF or DOCX.",
      });
    }

    const text = resumeText.toLowerCase();

    // ==========================================
    // 1. TECHNICAL KEYWORD EVALUATION - 40%
    // ==========================================

    const keywords = [
      "education",
      "skills",
      "project",
      "experience",
      "certification",
      "javascript",
      "html",
      "css",
      "java",
      "sql",
      "github",
      "linkedin",
    ];

    const matchedKeywords = keywords.filter((keyword) =>
      text.includes(keyword)
    );

    const keywordScore = Math.min(
      Math.round(
        (matchedKeywords.length / keywords.length) * 100
      ),
      100
    );

    // ==========================================
    // 2. RESUME SECTION EVALUATION - 35%
    // ==========================================

    const sections = {
      education: text.includes("education"),
      skills: text.includes("skills"),
      projects: text.includes("project"),
      experience:
        text.includes("experience") ||
        text.includes("internship"),
      certifications:
        text.includes("certification") ||
        text.includes("certificate"),
    };

    const sectionCount = Object.values(sections).filter(
      Boolean
    ).length;

    const sectionScore = Math.round(
      (sectionCount / Object.keys(sections).length) * 100
    );

    // ==========================================
    // 3. CONTENT/LENGTH EVALUATION - 25%
    // ==========================================

    let lengthScore = 40;

    if (resumeText.length >= 1200) {
      lengthScore = 100;
    } else if (resumeText.length >= 700) {
      lengthScore = 80;
    } else if (resumeText.length >= 400) {
      lengthScore = 60;
    }

    // ==========================================
    // 4. FINAL WEIGHTED RESUME SCORE
    // ==========================================

    const overallScore = Math.round(
      keywordScore * 0.4 +
        sectionScore * 0.35 +
        lengthScore * 0.25
    );

    // ==========================================
    // 5. ATS COMPATIBILITY
    // ==========================================

    const atsCompatibility = Math.min(
      Math.round(
        keywordScore * 0.6 +
          sectionScore * 0.4
      ),
      100
    );

    // ==========================================
    // 6. CAREER RELEVANCE
    // ==========================================

    const careerRelevance = Math.min(
      Math.round(
        sectionScore * 0.5 +
          keywordScore * 0.3 +
          lengthScore * 0.2
      ),
      100
    );

    // ==========================================
    // 7. STRENGTHS
    // ==========================================

    const strengths = [];

    if (sections.education) {
      strengths.push(
        "Education section detected and structured"
      );
    }

    if (sections.skills) {
      strengths.push(
        "Clear technical skills section"
      );
    }

    if (sections.projects) {
      strengths.push(
        "Relevant academic projects included"
      );
    }

    if (matchedKeywords.length >= 6) {
      strengths.push(
        "Good use of technical keywords"
      );
    }

    if (sections.experience) {
      strengths.push(
        "Experience or internship information detected"
      );
    }

    if (strengths.length === 0) {
      strengths.push(
        "Resume text was successfully extracted"
      );
    }

    // ==========================================
    // 8. IMPROVEMENTS
    // ==========================================

    const improvements = [];

    if (!text.includes("achievement") &&
        !text.includes("result")) {
      improvements.push(
        "Add measurable achievements to projects"
      );
    }

    if (sections.projects) {
      improvements.push(
        "Improve project descriptions with action words"
      );
    }

    if (!sections.certifications) {
      improvements.push(
        "Add relevant certifications if available"
      );
    }

    if (resumeText.length > 2500) {
      improvements.push(
        "Keep the resume focused and concise"
      );
    }

    if (!text.includes("github")) {
      improvements.push(
        "Add your GitHub profile"
      );
    }

    if (!text.includes("linkedin")) {
      improvements.push(
        "Add your LinkedIn profile"
      );
    }

    if (improvements.length === 0) {
      improvements.push(
        "Continue improving measurable project impact"
      );
    }

    // ==========================================
    // 9. RESEARCH MODEL
    // ==========================================

    const researchModel = {
      name: "Resume Readiness Evaluation",

      formula:
        "Overall Score = Keyword Score × 40% + Section Score × 35% + Content Score × 25%",

      factors: {
        keywordScore,
        keywordWeight: "40%",

        sectionScore,
        sectionWeight: "35%",

        contentScore: lengthScore,
        contentWeight: "25%",
      },
    };

    // ==========================================
    // 10. AI RECOMMENDATION
    // ==========================================

    let recommendation =
      "Improve your project impact";

    let recommendationText =
      "Add measurable results, technologies used and your specific contribution to each project. This can improve recruiter readability and ATS relevance.";

    if (overallScore >= 80) {
      recommendation =
        "Your resume is placement ready";

      recommendationText =
        "Your resume has a strong structure and good technical relevance. Focus on measurable achievements and role-specific keywords.";
    }

    else if (overallScore >= 60) {
      recommendation =
        "Your resume has a good foundation";

      recommendationText =
        "Strengthen project descriptions, measurable achievements and role-specific technical keywords to improve your placement readiness.";
    }

    // ==========================================
    // 11. FINAL RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,

      message: "Resume analyzed successfully",

      analysis: {
        overallScore,

        atsCompatibility,

        careerRelevance,

        keywordScore,

        sectionScore,

        contentScore: lengthScore,

        strengths,

        improvements,

        matchedKeywords,

        detectedSections: sections,

        resumeLength: resumeText.length,

        recommendation,

        recommendationText,

        researchModel,
      },
    });
  }

  catch (error) {
    console.error(
      "Resume analysis error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error: error.message,
    });
  }

  finally {
    // Delete temporary uploaded file
    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = {
  analyzeResume,
};