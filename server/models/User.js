const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    profile: {
      phone: {
        type: String,
        default: "",
      },

      university: {
        type: String,
        default: "",
      },

      degree: {
        type: String,
        default: "BCA",
      },

      graduationYear: {
        type: Number,
        default: null,
      },

      skills: {
        type: [String],
        default: [],
      },

      projects: {
        type: [String],
        default: [],
      },

      certifications: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);