import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BrainCircuit,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: email.trim(),
          password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      if (!response.data.token) {
        setError(
          response.data.message ||
            "Login failed. No authentication token received."
        );
        return;
      }

      // Save authentication token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Redirect after successful login
      window.location.assign("/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to login. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="logo-icon">
            <BrainCircuit size={22} />
          </div>

          <span>
            Skill<span>Sync</span> AI
          </span>
        </div>

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Sign in to continue your career journey.
        </p>

        <form onSubmit={handleLogin}>

          <label htmlFor="login-email">
            Email Address
          </label>

          <div className="input-box">
            <Mail size={18} />

            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="login-password">
            Password
          </label>

          <div className="input-box">
            <Lock size={18} />

            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          <div className="forgot">
            <a href="#">
              Forgot password?
            </a>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={17} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;