import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/courses/${id}`
      );

      setCourse(response.data);
    } catch (err) {
      console.error("Course error:", err);
      setError("Unable to load course details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== "STUDENT") {
      setMessage("Only students can enroll in courses.");
      return;
    }

    try {
      setEnrolling(true);
      setMessage("");

      await axios.post(
        "https://courseportal-yfsf.onrender.com/api/enrollments",
        {
          student: {
            id: user.id
          },
          course: {
            id: course.id
          }
        }
      );

      setMessage("Successfully enrolled in this course!");

    } catch (err) {
      console.error("Enrollment error:", err);
      setMessage("Unable to enroll in this course.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="course-details-page">
        <div className="course-details-message">
          <div className="loading-spinner"></div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-page">
        <div className="course-details-message">
          <div className="message-icon">!</div>

          <h3>Course not found</h3>

          <p>
            {error || "This course does not exist."}
          </p>

          <Link
            to="/courses"
            className="back-courses-btn"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-page">

      {/* BREADCRUMB */}
      <div className="course-details-container breadcrumb-container">
        <Link to="/courses" className="breadcrumb-link">
          Courses
        </Link>

        <span> / </span>

        <span>{course.title}</span>
      </div>

      {/* COURSE HERO */}
      <section className="course-details-hero">
        <div className="course-details-container">

          <div className="details-grid">

            {/* COURSE INFORMATION */}
            <div className="details-main">

              <span className="details-badge">
                COURSE
              </span>

              <h1>{course.title}</h1>

              <p className="details-description">
                {course.description ||
                  "Start learning and develop valuable skills with this course."}
              </p>

              <div className="details-meta">

                <div className="meta-item">
                  <span className="meta-icon">⏱</span>

                  <div>
                    <small>Duration</small>
                    <strong>
                      {course.duration || "Flexible"}
                    </strong>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">👤</span>

                  <div>
                    <small>Instructor</small>
                    <strong>
                      {course.instructor?.name ||
                        "Course Instructor"}
                    </strong>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">📚</span>

                  <div>
                    <small>Learning</small>
                    <strong>Self-paced</strong>
                  </div>
                </div>

              </div>

            </div>

            {/* ENROLLMENT CARD */}
            <div className="enroll-card">

              <div className="details-course-icon">
                📘
              </div>

              <div className="price">
                {course.price
                  ? `₹${course.price}`
                  : "Free"}
              </div>

              <p>
                Full course access
              </p>

              {message && (
                <div className="enrollment-message">
                  {message}
                </div>
              )}

              <button
                className="enroll-btn"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling
                  ? "Enrolling..."
                  : "Enroll Now →"}
              </button>

              <div className="enroll-features">

                <div>✓ Course access</div>
                <div>✓ Track your progress</div>
                <div>✓ Learn at your own pace</div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="course-benefits-section">
        <div className="course-details-container">

          <h2>What you'll get</h2>

          <div className="benefits-grid">

            <div className="benefit-card">

              <div>📖</div>

              <h3>Structured Learning</h3>

              <p>
                Follow a clear learning path designed
                around the course.
              </p>

            </div>

            <div className="benefit-card">

              <div>📊</div>

              <h3>Progress Tracking</h3>

              <p>
                Keep track of your learning progress
                through your dashboard.
              </p>

            </div>

            <div className="benefit-card">

              <div>🎯</div>

              <h3>Learn at Your Pace</h3>

              <p>
                Learn whenever you have time and
                continue at your own pace.
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default CourseDetails;