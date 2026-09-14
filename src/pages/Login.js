import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/students/login`,
        {
          email: email,
          password: password,
        }
      );

      const user = response.data;

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "INSTRUCTOR") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* LEFT SIDE */}
        <div className="login-intro">
          <div className="login-logo">🎓</div>

          <span className="login-tag">WELCOME BACK</span>

          <h1>
            Continue your
            <span> learning journey.</span>
          </h1>

          <p>
            Sign in to access your courses, track your progress
            and keep moving towards your goals.
          </p>

          <div className="login-benefits">
            <div>
              <span>✓</span>
              Access your enrolled courses
            </div>

            <div>
              <span>✓</span>
              Track your learning progress
            </div>

            <div>
              <span>✓</span>
              Learn at your own pace
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="login-card">

          <div className="login-card-header">
            <h2>Welcome back 👋</h2>
            <p>Sign in to your CoursePortal account</p>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-submit"
            >
              Sign In →
            </button>

          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;