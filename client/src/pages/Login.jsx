import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect only if token is valid on server
    if (!token) return;

    (async () => {
      try {
        await API.get("/auth/me");
        navigate("/dashboard");
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <section className="auth-panel">
          <span className="auth-kicker">Budget clarity</span>
          <h1 className="auth-hero-title">Welcome back to smarter spending.</h1>
          <p className="auth-hero-text">
            Sign in to review your balance, monitor monthly habits, and keep
            every transaction in one clean workspace.
          </p>

          <div className="auth-points">
            <div className="auth-point">
              <strong>Fast overview</strong>
              <span>See income, expenses, and balance at a glance.</span>
            </div>
            <div className="auth-point">
              <strong>Useful filters</strong>
              <span>Find entries by month, title, or category in seconds.</span>
            </div>
          </div>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="auth-badge">Sign in</span>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">
            Login to continue managing your personal budget.
          </p>

          <div className="auth-form">
            <label className="auth-field">
              <span className="auth-label">Email</span>
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Password</span>
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <p className="auth-helper">
              Secure login for your personal expense and income history.
            </p>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>

            <div className="auth-footer">
              <span>Don't have an account?</span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
