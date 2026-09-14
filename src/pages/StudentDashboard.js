import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const loggedUser = JSON.parse(userData);
    setUser(loggedUser);

    fetchEnrollments(loggedUser.id);
  }, [navigate]);

  const fetchEnrollments = async (studentId) => {
    try {
      const response = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/enrollments/student/${studentId}`
      );

      setEnrollments(response.data);
    } catch (err) {
      console.error("Error loading enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  const completedCourses = enrollments.filter(
    (enrollment) => enrollment.status === "COMPLETED"
  ).length;

  const activeCourses = enrollments.filter(
    (enrollment) => enrollment.status === "ENROLLED"
  ).length;

  const averageProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce(
            (total, enrollment) =>
              total + (enrollment.progress || 0),
            0
          ) / enrollments.length
        )
      : 0;

  if (!user) {
    return null;
  }

  return (
    <div className="student-dashboard">

      {/* WELCOME */}
      <section className="student-welcome">
        <div>
          <span className="dashboard-tag">
            STUDENT DASHBOARD
          </span>

          <h1>
            Welcome back,{" "}
            <span>{user.name}</span> 👋
          </h1>

          <p>
            Keep learning, track your progress and
            continue building your skills.
          </p>
        </div>

        <Link
          to="/courses"
          className="browse-courses-btn"
        >
          Browse Courses →
        </Link>
      </section>

      {/* STATISTICS */}
      <section className="student-stats">

        <div className="student-stat-card">
          <div className="stat-icon">📚</div>

          <div>
            <span>Total Courses</span>
            <strong>{enrollments.length}</strong>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">▶</div>

          <div>
            <span>Active Courses</span>
            <strong>{activeCourses}</strong>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>Completed</span>
            <strong>{completedCourses}</strong>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">📈</div>

          <div>
            <span>Average Progress</span>
            <strong>{averageProgress}%</strong>
          </div>
        </div>

      </section>

      {/* MAIN CONTENT */}
      <section className="student-content">

        <div className="section-heading">
          <div>
            <h2>My Learning</h2>
            <p>
              Continue where you left off.
            </p>
          </div>

          <Link to="/student/enrollments">
            View All →
          </Link>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="student-message">
            <div className="dashboard-spinner"></div>
            <p>Loading your courses...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && enrollments.length === 0 && (
          <div className="student-message">

            <div className="empty-learning-icon">
              📚
            </div>

            <h3>No courses yet</h3>

            <p>
              You haven't enrolled in any courses.
              Start learning today.
            </p>

            <Link
              to="/courses"
              className="start-learning-btn"
            >
              Explore Courses
            </Link>

          </div>
        )}

        {/* ENROLLMENTS */}
        {!loading && enrollments.length > 0 && (
          <div className="learning-grid">

            {enrollments.slice(0, 4).map((enrollment) => {

              const progress = enrollment.progress || 0;
              const course = enrollment.course;

              return (
                <div
                  className="learning-card"
                  key={enrollment.id}
                >

                  <div className="learning-card-top">

                    <div className="learning-icon">
                      📘
                    </div>

                    <span
                      className={
                        enrollment.status === "COMPLETED"
                          ? "status-completed"
                          : "status-active"
                      }
                    >
                      {enrollment.status}
                    </span>

                  </div>

                  <h3>
                    {course?.title || "Course"}
                  </h3>

                  <p>
                    {course?.description ||
                      "Continue your learning journey."}
                  </p>

                  <div className="progress-header">
                    <span>Progress</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`
                      }}
                    ></div>
                  </div>

                  <div className="learning-footer">

                    <span>
                      {progress === 100
                        ? "Completed"
                        : "Keep going!"}
                    </span>

                    {course?.id && (
                      <Link
                        to={`/courses/${course.id}`}
                      >
                        View →
                      </Link>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

    </div>
  );
}

export default StudentDashboard;