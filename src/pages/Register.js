import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${API_BASE_URL}/api/students`,
        form
      );

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);

      if (err.response) {
        console.error("Backend response:", err.response.data);

        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">

        {/* LEFT SIDE */}
        <div className="register-intro">

          <div className="register-logo">
            🎓
          </div>

          <span className="register-tag">
            START LEARNING
          </span>

          <h1>
            Build your
            <span> future with learning.</span>
          </h1>

          <p>
            Create your CoursePortal account and discover
            courses designed to help you learn new skills
            and achieve your goals.
          </p>

          <div className="register-benefits">

            <div>
              <span>✓</span>
              Learn from structured courses
            </div>

            <div>
              <span>✓</span>
              Track your learning progress
            </div>

            <div>
              <span>✓</span>
              Learn anytime, anywhere
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-card">

          <div className="register-card-header">
            <h2>Create your account</h2>

            <p>
              Join CoursePortal and start learning today
            </p>
          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          {success && (
            <div className="register-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label htmlFor="role">
                Account Type
              </label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="STUDENT">
                  Student
                </option>

                <option value="INSTRUCTOR">
                  Instructor
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="register-submit"
            >
              Create Account →
            </button>

          </form>

          <div className="register-divider">
            <span>or</span>
          </div>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;