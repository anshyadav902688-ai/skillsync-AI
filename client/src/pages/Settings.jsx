import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Lock,
  LogOut,
  Palette,
  Save,
  ShieldCheck,
  Target,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("account");

  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    notifications: true,
    jobAlerts: true,
    roadmapReminders: true,
    interviewReminders: true,
    darkMode: true,
    publicProfile: false,
    careerUpdates: true,
    targetRole: "Full Stack Developer",
    preferredLocation: "India",
  });

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        setSettings((prev) => ({
          ...prev,
          fullName: user.name || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error(
          "Unable to read user data:",
          error
        );
      }
    }

    const storedSettings =
      localStorage.getItem(
        "skillsyncSettings"
      );

    if (storedSettings) {
      try {
        setSettings((prev) => ({
          ...prev,
          ...JSON.parse(storedSettings),
        }));
      } catch (error) {
        console.error(
          "Unable to read settings:",
          error
        );
      }
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    await axios.put(
      "http://localhost:5000/api/profile",
      {
        name: settings.fullName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem(
      "skillsyncSettings",
      JSON.stringify(settings)
    );

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: settings.fullName,
        })
      );
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  } catch (error) {
    console.error(
      "Unable to save settings:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Unable to save settings."
    );
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      id: "account",
      label: "Account",
      description: "Personal information",
      icon: User,
    },
    {
      id: "career",
      label: "Career Preferences",
      description: "Jobs and career goals",
      icon: Target,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Alerts and reminders",
      icon: Bell,
    },
    {
      id: "appearance",
      label: "Appearance",
      description: "Interface preferences",
      icon: Palette,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      description: "Account protection",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="settings-page">
      <div className="settings-shell">

        {/* HEADER */}

        <div className="settings-header">
          <div>
            <div className="settings-eyebrow">
              <Lock size={14} />
              SYSTEM PREFERENCES
            </div>

            <h1>Settings</h1>

            <p>
              Manage your SkillSync AI account,
              career preferences, notifications
              and privacy controls.
            </p>
          </div>

          <button
            className="settings-save-btn"
            onClick={saveSettings}
          >
            {saved ? (
              <>
                <CheckCircle2 size={17} />
                Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="settings-layout">

          {/* SIDEBAR */}

          <aside className="settings-sidebar">
            <div className="settings-sidebar-title">
              SETTINGS
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`settings-menu-item ${
                    activeSection === item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveSection(item.id)
                  }
                >
                  <span className="settings-menu-icon">
                    <Icon size={18} />
                  </span>

                  <span className="settings-menu-text">
                    <strong>
                      {item.label}
                    </strong>

                    <small>
                      {item.description}
                    </small>
                  </span>

                  <ChevronRight size={16} />
                </button>
              );
            })}

            <div className="settings-divider" />

            <button
              className="settings-logout"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>

          {/* CONTENT */}

          <main className="settings-content">

            {/* ACCOUNT */}

            {activeSection === "account" && (
              <section className="settings-card">

                <div className="settings-card-header">
                  <div>
                    <h2>
                      Account Information
                    </h2>

                    <p>
                      Manage your basic
                      SkillSync AI account
                      information.
                    </p>
                  </div>

                  <div className="settings-card-icon">
                    <User size={20} />
                  </div>
                </div>

                <div className="settings-form-grid">

                  <div className="settings-field">
                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={
                        settings.fullName
                      }
                      onChange={(e) =>
                        updateSetting(
                          "fullName",
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="settings-field">
                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={
                        settings.email
                      }
                      disabled
                    />

                    <small>
                      Email is linked to your
                      account.
                    </small>
                  </div>

                </div>

                <div className="settings-info-box">
                  <ShieldCheck size={18} />

                  <div>
                    <strong>
                      Account protected
                    </strong>

                    <p>
                      Your account is protected
                      using secure authentication
                      and encrypted credentials.
                    </p>
                  </div>
                </div>

              </section>
            )}

            {/* CAREER */}

            {activeSection === "career" && (
              <section className="settings-card">

                <div className="settings-card-header">
                  <div>
                    <h2>
                      Career Preferences
                    </h2>

                    <p>
                      Tell SkillSync AI what
                      kind of career opportunities
                      you are targeting.
                    </p>
                  </div>

                  <div className="settings-card-icon">
                    <Target size={20} />
                  </div>
                </div>

                <div className="settings-form-grid">

                  <div className="settings-field">
                    <label>
                      Target Role
                    </label>

                    <select
                      value={
                        settings.targetRole
                      }
                      onChange={(e) =>
                        updateSetting(
                          "targetRole",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        Full Stack Developer
                      </option>

                      <option>
                        Frontend Developer
                      </option>

                      <option>
                        Backend Developer
                      </option>

                      <option>
                        Java Developer
                      </option>

                      <option>
                        Data Analyst
                      </option>
                    </select>
                  </div>

                  <div className="settings-field">
                    <label>
                      Preferred Location
                    </label>

                    <select
                      value={
                        settings.preferredLocation
                      }
                      onChange={(e) =>
                        updateSetting(
                          "preferredLocation",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        India
                      </option>

                      <option>
                        Remote
                      </option>

                      <option>
                        Delhi NCR
                      </option>

                      <option>
                        Bengaluru
                      </option>

                      <option>
                        Hyderabad
                      </option>

                      <option>
                        Pune
                      </option>

                      <option>
                        Mumbai
                      </option>
                    </select>
                  </div>

                </div>

                <Toggle
                  label="Career Updates"
                  description="Receive personalized career recommendations."
                  enabled={
                    settings.careerUpdates
                  }
                  onChange={(value) =>
                    updateSetting(
                      "careerUpdates",
                      value
                    )
                  }
                />

              </section>
            )}

            {/* NOTIFICATIONS */}

            {activeSection ===
              "notifications" && (
              <section className="settings-card">

                <div className="settings-card-header">
                  <div>
                    <h2>
                      Notifications
                    </h2>

                    <p>
                      Control how SkillSync AI
                      keeps you updated.
                    </p>
                  </div>

                  <div className="settings-card-icon">
                    <Bell size={20} />
                  </div>
                </div>

                <Toggle
                  label="All Notifications"
                  description="Enable or disable SkillSync AI notifications."
                  enabled={
                    settings.notifications
                  }
                  onChange={(value) =>
                    updateSetting(
                      "notifications",
                      value
                    )
                  }
                />

                <Toggle
                  label="Job Alerts"
                  description="Receive alerts for relevant job opportunities."
                  enabled={
                    settings.jobAlerts
                  }
                  onChange={(value) =>
                    updateSetting(
                      "jobAlerts",
                      value
                    )
                  }
                />

                <Toggle
                  label="Roadmap Reminders"
                  description="Get reminders about your learning roadmap."
                  enabled={
                    settings.roadmapReminders
                  }
                  onChange={(value) =>
                    updateSetting(
                      "roadmapReminders",
                      value
                    )
                  }
                />

                <Toggle
                  label="Interview Reminders"
                  description="Receive interview preparation reminders."
                  enabled={
                    settings.interviewReminders
                  }
                  onChange={(value) =>
                    updateSetting(
                      "interviewReminders",
                      value
                    )
                  }
                />

              </section>
            )}

            {/* APPEARANCE */}

            {activeSection ===
              "appearance" && (
              <section className="settings-card">

                <div className="settings-card-header">
                  <div>
                    <h2>
                      Appearance
                    </h2>

                    <p>
                      Customize the SkillSync AI
                      interface.
                    </p>
                  </div>

                  <div className="settings-card-icon">
                    <Palette size={20} />
                  </div>
                </div>

                <div className="appearance-preview">

                  <div className="appearance-preview-top">
                    <div className="preview-dot" />
                    <div className="preview-dot" />
                    <div className="preview-dot" />
                  </div>

                  <div className="preview-content">

                    <div className="preview-sidebar" />

                    <div className="preview-main">

                      <div className="preview-line large" />

                      <div className="preview-line" />

                      <div className="preview-grid">
                        <div />
                        <div />
                        <div />
                      </div>

                    </div>

                  </div>

                </div>

                <Toggle
                  label="Dark Mode"
                  description="Use the premium dark SkillSync AI interface."
                  enabled={
                    settings.darkMode
                  }
                  onChange={(value) =>
                    updateSetting(
                      "darkMode",
                      value
                    )
                  }
                />

              </section>
            )}

            {/* PRIVACY */}

            {activeSection ===
              "privacy" && (
              <section className="settings-card">

                <div className="settings-card-header">
                  <div>
                    <h2>
                      Privacy & Security
                    </h2>

                    <p>
                      Manage visibility and
                      security preferences.
                    </p>
                  </div>

                  <div className="settings-card-icon">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <Toggle
                  label="Public Career Profile"
                  description="Allow your career profile to be visible to recruiters."
                  enabled={
                    settings.publicProfile
                  }
                  onChange={(value) =>
                    updateSetting(
                      "publicProfile",
                      value
                    )
                  }
                />

                <div className="security-row">

                  <div className="security-icon">
                    <Lock size={19} />
                  </div>

                  <div>
                    <strong>
                      Password &
                      Authentication
                    </strong>

                    <p>
                      Your password is securely
                      hashed before storage.
                    </p>
                  </div>

                  <span className="security-status">
                    Protected
                  </span>

                </div>

                <div className="security-row">

                  <div className="security-icon">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <strong>
                      Session Security
                    </strong>

                    <p>
                      Authentication sessions
                      use secure JWT tokens.
                    </p>
                  </div>

                  <span className="security-status">
                    Active
                  </span>

                </div>

              </section>
            )}

            {/* ACTIONS */}

            <div className="settings-bottom-actions">

              <button
                className="settings-cancel-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                <X size={17} />
                Cancel
              </button>

              <button
                className="settings-save-btn"
                onClick={saveSettings}
              >
                <Save size={17} />
                Save Settings
              </button>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

const Toggle = ({
  label,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="settings-toggle-row">

      <div className="settings-toggle-info">
        <strong>{label}</strong>

        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`settings-toggle ${
          enabled ? "enabled" : ""
        }`}
        onClick={() =>
          onChange(!enabled)
        }
        aria-label={`Toggle ${label}`}
      >
        <span />
      </button>

    </div>
  );
};

export default Settings;