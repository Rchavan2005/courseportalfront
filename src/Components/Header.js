import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const getDashboardPath = () => {
    if (!user) {
      return "/login";
    }

    if (user.role === "ADMIN") {
      return "/admin/dashboard";
    }

    if (user.role === "INSTRUCTOR") {
      return "/instructor/dashboard";
    }

    return "/student/dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">

      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            🎓
          </div>

          <span>CoursePortal</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="header-nav">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/courses" className="nav-link">
            Courses
          </Link>

          <Link to="/about" className="nav-link">
            About
          </Link>

          {/* DASHBOARD - ONLY FOR LOGGED-IN USERS */}
          {user && (
            <button
              className="nav-dashboard"
              onClick={() => navigate(getDashboardPath())}
            >
              Dashboard
            </button>
          )}

          {/* USER NAME */}
          {user && (
            <span className="header-user">
              {user.name}
            </span>
          )}

          {/* LOGIN / REGISTER FOR GUEST */}
          {!user && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link to="/register" className="nav-register">
                Register
              </Link>
            </>
          )}

          {/* LOGOUT */}
          {user && (
            <button
              className="header-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Header;