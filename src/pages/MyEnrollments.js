import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./MyEnrollments.css";

function MyEnrollments() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const loggedUser = JSON.parse(userData);
    setUser(loggedUser);

    loadEnrollments(loggedUser.id);
  }, [navigate]);

  const loadEnrollments = async (studentId) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/enrollments/student/${studentId}`
      );

      setEnrollments(response.data);
    } catch (err) {
      console.error("Enrollment error:", err);
      setError("Unable to load your enrollments.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="my-enrollments-page">

      <section className="enrollments-header">
        <div>
          <span className="enrollments-tag">
            MY LEARNING
          </span>

          <h1>
            My <span>Enrollments</span>
          </h1>

          <p>
            View your enrolled courses and track your
            learning progress.
          </p>
        </div>

        <Link
          to="/courses"
          className="explore-btn"
        >
          Explore Courses →
        </Link>
      </section>


      {loading && (
        <div className="enrollments-message">
          <div className="enrollment-spinner"></div>
          <p>Loading your enrollments...</p>
        </div>
      )}


      {!loading && error && (
        <div className="enrollments-message">
          <div className="error-icon">!</div>

          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button
            className="retry-enrollment-btn"
            onClick={() => loadEnrollments(user.id)}
          >
            Try Again
          </button>
        </div>
      )}


      {!loading &&
        !error &&
        enrollments.length === 0 && (
          <div className="enrollments-message">
            <div className="empty-enrollment-icon">
              📚
            </div>

            <h3>No enrollments yet</h3>

            <p>
              You haven't enrolled in any courses.
              Start learning today.
            </p>

            <Link
              to="/courses"
              className="start-course-btn"
            >
              Browse Courses
            </Link>
          </div>
        )}


      {!loading &&
        !error &&
        enrollments.length > 0 && (
          <section className="enrollments-section">

            <div className="enrollment-section-heading">
              <div>
                <h2>Enrolled Courses</h2>

                <p>
                  {enrollments.length} course
                  {enrollments.length !== 1
                    ? "s"
                    : ""}{" "}
                  in your learning list
                </p>
              </div>
            </div>


            <div className="enrollments-grid">

              {enrollments.map((enrollment) => {
                const course = enrollment.course;
                const progress =
                  enrollment.progress || 0;

                return (
                  <div
                    className="enrollment-card"
                    key={enrollment.id}
                  >

                    <div className="enrollment-card-top">

                      <div className="enrollment-course-icon">
                        📘
                      </div>

                      <span
                        className={
                          enrollment.status ===
                          "COMPLETED"
                            ? "enrollment-status completed"
                            : "enrollment-status active"
                        }
                      >
                        {enrollment.status}
                      </span>

                    </div>


                    <h3>
                      {course?.title ||
                        "Course"}
                    </h3>


                    <p className="enrollment-description">
                      {course?.description ||
                        "Continue your learning journey with this course."}
                    </p>


                    <div className="enrollment-details">

                      <div>
                        <span>Duration</span>
                        <strong>
                          {course?.duration ||
                            "Flexible"}
                        </strong>
                      </div>

                      <div>
                        <span>Instructor</span>
                        <strong>
                          {course?.instructor
                            ?.name ||
                            "Instructor"}
                        </strong>
                      </div>

                    </div>


                    <div className="enrollment-progress">

                      <div className="progress-heading">
                        <span>
                          Learning Progress
                        </span>

                        <strong>
                          {progress}%
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-value"
                          style={{
                            width: `${progress}%`
                          }}
                        ></div>
                      </div>

                    </div>


                    <div className="enrollment-footer">

                      <span>
                        {progress >= 100
                          ? "Course completed"
                          : "Keep learning"}
                      </span>

                      {course?.id && (
                        <Link
                          to={`/courses/${course.id}`}
                          className="continue-btn"
                        >
                          View Course →
                        </Link>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          </section>
        )}

    </div>
  );
}

export default MyEnrollments;