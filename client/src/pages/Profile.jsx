import { useEffect, useState } from "react";
import axios from "axios";
import {
User,
Mail,
Phone,
GraduationCap,
Calendar,
Save,
Plus,
X,
ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
const navigate = useNavigate();

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");

const [form, setForm] = useState({
name: "",
email: "",
phone: "",
university: "",
degree: "",
graduationYear: "",
skills: [],
projects: [],
certifications: [],
});

const [newSkill, setNewSkill] = useState("");
const [newProject, setNewProject] = useState("");
const [newCertification, setNewCertification] = useState("");

const token = localStorage.getItem("token");

useEffect(() => {
if (!token) {
navigate("/login");
return;
}


fetchProfile();


}, []);

const fetchProfile = async () => {
try {
const response = await axios.get(`${API_URL}/profile`, {
headers: {
Authorization: `Bearer ${token}`,
},
});


  const user = response.data.user;

  setForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.profile?.phone || "",
    university: user.profile?.university || "",
    degree: user.profile?.degree || "",
    graduationYear: user.profile?.graduationYear || "",
    skills: user.profile?.skills || [],
    projects: user.profile?.projects || [],
    certifications: user.profile?.certifications || [],
  });

  localStorage.setItem("user", JSON.stringify(user));
} catch (error) {
  console.error("Fetch profile error:", error);

  setMessage("Unable to load profile.");
} finally {
  setLoading(false);
}


};

const handleChange = (event) => {
const { name, value } = event.target;


setForm((previous) => ({
  ...previous,
  [name]: value,
}));


};

const addItem = (type, value, setValue) => {
const item = value.trim();


if (!item) {
  return;
}

const alreadyExists = form[type].some(
  (existingItem) =>
    existingItem.toLowerCase() === item.toLowerCase()
);

if (!alreadyExists) {
  setForm((previous) => ({
    ...previous,
    [type]: [...previous[type], item],
  }));
}

setValue("");


};

const removeItem = (type, index) => {
setForm((previous) => ({
...previous,
[type]: previous[type].filter(
(_, itemIndex) => itemIndex !== index
),
}));
};

const handleSave = async () => {
setSaving(true);
setMessage("");


try {
  const response = await axios.put(`${API_URL}/profile`, {
      name: form.name,
      phone: form.phone,
      university: form.university,
      degree: form.degree,
      graduationYear: form.graduationYear,
      skills: form.skills,
      projects: form.projects,
      certifications: form.certifications,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const updatedUser = response.data.user;

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setForm({
    name: updatedUser.name || "",
    email: updatedUser.email || "",
    phone: updatedUser.profile?.phone || "",
    university: updatedUser.profile?.university || "",
    degree: updatedUser.profile?.degree || "",
    graduationYear:
      updatedUser.profile?.graduationYear || "",
    skills: updatedUser.profile?.skills || [],
    projects: updatedUser.profile?.projects || [],
    certifications:
      updatedUser.profile?.certifications || [],
  });

  setMessage("Profile updated successfully.");
} catch (error) {
  console.error("Profile save error:", error);

  setMessage(
    error.response?.data?.message ||
      "Failed to update profile."
  );
} finally {
  setSaving(false);
}


};

const completionItems = [
form.name,
form.email,
form.phone,
form.university,
form.degree,
form.graduationYear,
form.skills.length,
form.projects.length,
form.certifications.length,
];

const completedItems = completionItems.filter(
(item) => item !== "" && item !== 0
).length;

const completion = Math.round(
(completedItems / completionItems.length) * 100
);

if (loading) {
return ( <div className="profile-loading"> <div className="profile-loader"></div> <p>Loading your profile...</p> </div>
);
}

return ( <div className="profile-page"> <header className="profile-header"> <div>
<button
className="profile-back"
onClick={() => navigate("/dashboard")}
> <ArrowLeft size={18} />
Dashboard </button>


      <h1>My Profile</h1>

      <p>
        Manage your personal information, education,
        skills and achievements.
      </p>
    </div>

    <button
      className="profile-save-btn"
      onClick={handleSave}
      disabled={saving}
    >
      <Save size={18} />
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </header>

  {message && (
    <div
      className={`profile-message ${
        message.includes("successfully")
          ? "success"
          : "error"
      }`}
    >
      {message}
    </div>
  )}

  <section className="profile-card profile-completion-card">
    <div className="profile-card-title">
      <div className="profile-icon">
        <span>✓</span>
      </div>

      <div>
        <h2>Profile Completion</h2>

        <p>
          Complete your profile for better AI
          recommendations.
        </p>
      </div>
    </div>

    <div className="profile-completion-value">
      <strong>{completion}%</strong>

      <div className="profile-completion-bar">
        <div
          style={{
            width: `${completion}%`,
          }}
        ></div>
      </div>
    </div>
  </section>

  <div className="profile-grid">
    <section className="profile-card">
      <div className="profile-card-title">
        <div className="profile-icon">
          <User size={20} />
        </div>

        <div>
          <h2>Personal Information</h2>
          <p>Your basic account information</p>
        </div>
      </div>

      <div className="profile-form-grid">
        <div className="profile-field">
          <label>Full Name</label>

          <div className="profile-input">
            <User size={17} />

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="profile-field">
          <label>Email Address</label>

          <div className="profile-input disabled">
            <Mail size={17} />

            <input
              type="email"
              value={form.email}
              disabled
            />
          </div>
        </div>

        <div className="profile-field">
          <label>Phone Number</label>

          <div className="profile-input">
            <Phone size={17} />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="profile-card">
      <div className="profile-card-title">
        <div className="profile-icon">
          <GraduationCap size={20} />
        </div>

        <div>
          <h2>Education</h2>
          <p>Your academic information</p>
        </div>
      </div>

      <div className="profile-form-grid">
        <div className="profile-field">
          <label>University / College</label>

          <div className="profile-input">
            <GraduationCap size={17} />

            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              placeholder="Enter university"
            />
          </div>
        </div>

        <div className="profile-field">
          <label>Degree</label>

          <div className="profile-input">
            <GraduationCap size={17} />

            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="e.g. BCA"
            />
          </div>
        </div>

        <div className="profile-field">
          <label>Graduation Year</label>

          <div className="profile-input">
            <Calendar size={17} />

            <input
              type="number"
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
              placeholder="2027"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="profile-card full-width">
      <div className="profile-card-title">
        <div className="profile-icon">
          <span>⚡</span>
        </div>

        <div>
          <h2>Technical Skills</h2>
          <p>
            Add the technical skills you currently have.
          </p>
        </div>
      </div>

      <div className="add-item-row">
        <input
          value={newSkill}
          onChange={(event) =>
            setNewSkill(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              addItem(
                "skills",
                newSkill,
                setNewSkill
              );
            }
          }}
          placeholder="e.g. JavaScript"
        />

        <button
          type="button"
          onClick={() =>
            addItem(
              "skills",
              newSkill,
              setNewSkill
            )
          }
        >
          <Plus size={17} />
          Add
        </button>
      </div>

      <div className="tag-container">
        {form.skills.map((skill, index) => (
          <div className="profile-tag" key={index}>
            {skill}

            <button
              type="button"
              onClick={() =>
                removeItem("skills", index)
              }
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {form.skills.length === 0 && (
          <span className="empty-text">
            No skills added yet.
          </span>
        )}
      </div>
    </section>

    <section className="profile-card full-width">
      <div className="profile-card-title">
        <div className="profile-icon">
          <span>💻</span>
        </div>

        <div>
          <h2>Projects</h2>
          <p>
            Add projects that demonstrate your practical
            experience.
          </p>
        </div>
      </div>

      <div className="add-item-row">
        <input
          value={newProject}
          onChange={(event) =>
            setNewProject(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              addItem(
                "projects",
                newProject,
                setNewProject
              );
            }
          }}
          placeholder="e.g. SkillSync AI"
        />

        <button
          type="button"
          onClick={() =>
            addItem(
              "projects",
              newProject,
              setNewProject
            )
          }
        >
          <Plus size={17} />
          Add
        </button>
      </div>

      <div className="tag-container">
        {form.projects.map((project, index) => (
          <div
            className="profile-tag project-tag"
            key={index}
          >
            {project}

            <button
              type="button"
              onClick={() =>
                removeItem("projects", index)
              }
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {form.projects.length === 0 && (
          <span className="empty-text">
            No projects added yet.
          </span>
        )}
      </div>
    </section>

    <section className="profile-card full-width">
      <div className="profile-card-title">
        <div className="profile-icon">
          <span>🏆</span>
        </div>

        <div>
          <h2>Certifications</h2>
          <p>
            Add certificates, workshops and achievements.
          </p>
        </div>
      </div>

      <div className="add-item-row">
        <input
          value={newCertification}
          onChange={(event) =>
            setNewCertification(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              addItem(
                "certifications",
                newCertification,
                setNewCertification
              );
            }
          }}
          placeholder="e.g. Web Development Certificate"
        />

        <button
          type="button"
          onClick={() =>
            addItem(
              "certifications",
              newCertification,
              setNewCertification
            )
          }
        >
          <Plus size={17} />
          Add
        </button>
      </div>

      <div className="tag-container">
        {form.certifications.map(
          (certificate, index) => (
            <div
              className="profile-tag certificate-tag"
              key={index}
            >
              {certificate}

              <button
                type="button"
                onClick={() =>
                  removeItem(
                    "certifications",
                    index
                  )
                }
              >
                <X size={14} />
              </button>
            </div>
          )
        )}

        {form.certifications.length === 0 && (
          <span className="empty-text">
            No certifications added yet.
          </span>
        )}
      </div>
    </section>
  </div>

  <div className="profile-bottom-actions">
    <button
      className="profile-secondary-btn"
      onClick={() => navigate("/dashboard")}
    >
      <ArrowLeft size={17} />
      Back to Dashboard
    </button>

    <button
      className="profile-save-btn"
      onClick={handleSave}
      disabled={saving}
    >
      <Save size={18} />
      {saving ? "Saving..." : "Save Profile"}
    </button>
  </div>
</div>


);
}

export default Profile;
