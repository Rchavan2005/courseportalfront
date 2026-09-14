import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const loggedUser = JSON.parse(userData);

    if (loggedUser.role !== "ADMIN") {
      navigate("/login");
      return;
    }

    setUser(loggedUser);
    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/admin/dashboard"
      );

      setDashboard(response.data);
    } catch (err) {
      console.error("Admin dashboard error:", err);
      setError("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-message">
          <div className="admin-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-message">
          <div className="admin-error-icon">!</div>

          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button
            className="admin-retry-btn"
            onClick={loadDashboard}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">

      <div className="admin-dashboard-container">

        {/* HEADER */}

        <section className="admin-welcome">

          <div>
            <span className="admin-tag">
              ADMIN DASHBOARD
            </span>

            <h1>
              Welcome, <span>{user.name}</span> 👋
            </h1>

            <p>
              Monitor CoursePortal and manage your
              learning platform from one place.
            </p>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={loadDashboard}
          >
            ↻ Refresh
          </button>

        </section>


        {/* MAIN STATISTICS */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👨‍🎓
            </div>

            <div>
              <span>Total Students</span>

              <strong>
                {dashboard?.totalStudents || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              👨‍🏫
            </div>

            <div>
              <span>Total Instructors</span>

              <strong>
                {dashboard?.totalInstructors || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              📚
            </div>

            <div>
              <span>Total Courses</span>

              <strong>
                {dashboard?.totalCourses || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              📝
            </div>

            <div>
              <span>Total Enrollments</span>

              <strong>
                {dashboard?.totalEnrollments || 0}
              </strong>
            </div>

          </div>

        </section>


        {/* PROGRESS STATISTICS */}

        <section className="admin-progress-stats">

          <div className="admin-progress-card">

            <div className="admin-progress-header">

              <div>
                <span>ACTIVE ENROLLMENTS</span>

                <h2>
                  {dashboard?.activeEnrollments || 0}
                </h2>
              </div>

              <div className="progress-icon">
                ▶
              </div>

            </div>

            <p>
              Students currently learning courses.
            </p>

          </div>


          <div className="admin-progress-card">

            <div className="admin-progress-header">

              <div>
                <span>COMPLETED ENROLLMENTS</span>

                <h2>
                  {dashboard?.completedEnrollments || 0}
                </h2>
              </div>

              <div className="progress-icon">
                ✓
              </div>

            </div>

            <p>
              Courses successfully completed by students.
            </p>

          </div>


          <div className="admin-progress-card">

            <div className="admin-progress-header">

              <div>
                <span>AVERAGE PROGRESS</span>

                <h2>
                  {Math.round(
                    dashboard?.averageProgress || 0
                  )}
                  %
                </h2>
              </div>

              <div className="progress-icon">
                📈
              </div>

            </div>

            <div className="admin-progress-track">

              <div
                className="admin-progress-fill"
                style={{
                  width: `${Math.min(
                    dashboard?.averageProgress || 0,
                    100
                  )}%`
                }}
              ></div>

            </div>

          </div>

        </section>


        {/* MANAGEMENT */}

        <section className="admin-management">

          <div className="admin-section-heading">

            <div>
              <h2>Platform Management</h2>

              <p>
                Manage the main areas of CoursePortal.
              </p>
            </div>

          </div>


          <div className="admin-management-grid">

            <Link
              to="/admin/students"
              className="admin-management-card"
            >

              <div className="management-icon">
                👨‍🎓
              </div>

              <div>
                <h3>Students</h3>

                <p>
                  View and manage registered students.
                </p>
              </div>

              <span>→</span>

            </Link>


            <Link
              to="/admin/instructors"
              className="admin-management-card"
            >

              <div className="management-icon">
                👨‍🏫
              </div>

              <div>
                <h3>Instructors</h3>

                <p>
                  View instructors and their courses.
                </p>
              </div>

              <span>→</span>

            </Link>


            <Link
              to="/admin/courses"
              className="admin-management-card"
            >

              <div className="management-icon">
                📚
              </div>

              <div>
                <h3>Courses</h3>

                <p>
                  Monitor courses available on the platform.
                </p>
              </div>

              <span>→</span>

            </Link>


            <Link
              to="/admin/enrollments"
              className="admin-management-card"
            >

              <div className="management-icon">
                📝
              </div>

              <div>
                <h3>Enrollments</h3>

                <p>
                  Monitor student course enrollments.
                </p>
              </div>

              <span>→</span>

            </Link>

          </div>

        </section>

      </div>

    </div>
  );
}

export default AdminDashboard;