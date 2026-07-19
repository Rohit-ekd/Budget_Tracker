import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/register", formData);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <section className="auth-panel">
          <span className="auth-kicker">Fresh start</span>
          <h1 className="auth-hero-title">Build better money habits from day one.</h1>
          <p className="auth-hero-text">
            Create your account to start tracking transactions, spotting trends,
            and staying in control of your monthly budget.
          </p>

          <div className="auth-points">
            <div className="auth-point">
              <strong>Simple tracking</strong>
              <span>Add income and expenses without a cluttered workflow.</span>
            </div>
            <div className="auth-point">
              <strong>Clear insights</strong>
              <span>Turn everyday entries into a useful monthly picture.</span>
            </div>
          </div>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="auth-badge">Create account</span>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">
            Register to start tracking your budget with a lighter, cleaner flow.
          </p>

          <div className="auth-form">
            <label className="auth-field">
              <span className="auth-label">Name</span>
              <input
                className="auth-input"
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <p className="auth-helper">
              Your account helps keep your budget history organized in one place.
            </p>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="auth-footer">
              <span>Already have an account?</span>
              <Link to="/">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
