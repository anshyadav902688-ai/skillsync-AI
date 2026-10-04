const User = require("../models/User");

// Get current student's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server error while fetching profile",
    });
  }
};

// Update current student's profile
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      university,
      degree,
      graduationYear,
      skills,
      projects,
      certifications,
    } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name;

    user.profile.phone = phone ?? user.profile.phone;
    user.profile.university = university ?? user.profile.university;
    user.profile.degree = degree ?? user.profile.degree;
    user.profile.graduationYear =
      graduationYear ?? user.profile.graduationYear;

    user.profile.skills = Array.isArray(skills)
      ? skills
      : user.profile.skills;

    user.profile.projects = Array.isArray(projects)
      ? projects
      : user.profile.projects;

    user.profile.certifications = Array.isArray(certifications)
      ? certifications
      : user.profile.certifications;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Server error while updating profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};