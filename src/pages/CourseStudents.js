import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CourseStudents.css";

function CourseStudents() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const loggedUser = JSON.parse(userData);

    if (loggedUser.role !== "INSTRUCTOR") {
      navigate("/login");
      return;
    }

    setUser(loggedUser);
    loadCourseStudents();
  }, [courseId, navigate]);

  const loadCourseStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const courseResponse = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/courses/${courseId}`
      );

      setCourse(courseResponse.data);

      const enrollmentResponse = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/enrollments/course/${courseId}`
      );

      setStudents(enrollmentResponse.data || []);
    } catch (err) {
      console.error("Course students error:", err);
      setError("Unable to load students for this course.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const completedStudents = students.filter(
    (enrollment) => enrollment.status === "COMPLETED"
  ).length;

  const activeStudents = students.filter(
    (enrollment) => enrollment.status === "ENROLLED"
  ).length;

  const averageProgress =
    students.length > 0
      ? Math.round(
          students.reduce(
            (total, enrollment) =>
              total + (enrollment.progress || 0),
            0
          ) / students.length
        )
      : 0;

  return (
    <div className="course-students-page">

      <div className="course-students-container">

        <div className="course-students-heading">

          <div>
            <span>COURSE MANAGEMENT</span>

            <h1>
              Course <span>Students</span>
            </h1>

            <p>
              View enrolled students and their learning progress.
            </p>
          </div>

          <Link
            to="/instructor/courses"
            className="course-students-back-btn"
          >
            ← My Courses
          </Link>

        </div>


        {loading && (
          <div className="course-students-message">
            <div className="course-students-spinner"></div>
            <p>Loading students...</p>
          </div>
        )}


        {!loading && error && (
          <div className="course-students-message">

            <div className="course-students-error-icon">
              !
            </div>

            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              className="course-students-retry"
              onClick={loadCourseStudents}
            >
              Try Again
            </button>

          </div>
        )}


        {!loading && !error && course && (
          <>
            <section className="course-summary-card">

              <div className="course-summary-icon">
                📘
              </div>

              <div className="course-summary-info">

                <span>COURSE</span>

                <h2>{course.title}</h2>

                <p>
                  {course.description ||
                    "No course description available."}
                </p>

              </div>

            </section>


            <section className="course-student-stats">

              <div className="course-student-stat">

                <div className="course-stat-icon">
                  👥
                </div>

                <div>
                  <span>Total Students</span>
                  <strong>{students.length}</strong>
                </div>

              </div>


              <div className="course-student-stat">

                <div className="course-stat-icon">
                  ▶
                </div>

                <div>
                  <span>Active Students</span>
                  <strong>{activeStudents}</strong>
                </div>

              </div>


              <div className="course-student-stat">

                <div className="course-stat-icon">
                  ✓
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{completedStudents}</strong>
                </div>

              </div>


              <div className="course-student-stat">

                <div className="course-stat-icon">
                  📈
                </div>

                <div>
                  <span>Average Progress</span>
                  <strong>{averageProgress}%</strong>
                </div>

              </div>

            </section>


            <section className="students-section">

              <div className="students-section-heading">

                <div>
                  <h2>Enrolled Students</h2>

                  <p>
                    Students currently enrolled in this course.
                  </p>
                </div>

              </div>


              {students.length === 0 ? (

                <div className="no-students">

                  <div className="no-students-icon">
                    👥
                  </div>

                  <h3>No students yet</h3>

                  <p>
                    No students have enrolled in this course yet.
                  </p>

                </div>

              ) : (

                <div className="students-table-wrapper">

                  <table className="students-table">

                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Enrolled</th>
                      </tr>
                    </thead>

                    <tbody>

                      {students.map((enrollment) => {

                        const student = enrollment.student;

                        const progress =
                          enrollment.progress || 0;

                        return (
                          <tr key={enrollment.id}>

                            <td>

                              <div className="student-name-cell">

                                <div className="student-avatar">
                                  {(student?.name || "S")
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>

                                <strong>
                                  {student?.name ||
                                    "Student"}
                                </strong>

                              </div>

                            </td>


                            <td>
                              {student?.email ||
                                "Not available"}
                            </td>


                            <td>

                              <div className="student-progress-cell">

                                <div className="student-progress-top">
                                  <span>
                                    {progress}%
                                  </span>
                                </div>

                                <div className="student-progress-track">

                                  <div
                                    className="student-progress-fill"
                                    style={{
                                      width: `${progress}%`
                                    }}
                                  ></div>

                                </div>

                              </div>

                            </td>


                            <td>

                              <span
                                className={
                                  enrollment.status ===
                                  "COMPLETED"
                                    ? "student-status completed"
                                    : "student-status active"
                                }
                              >
                                {enrollment.status}
                              </span>

                            </td>


                            <td>
                              {enrollment.enrollDate
                                ? new Date(
                                    enrollment.enrollDate
                                  ).toLocaleDateString()
                                : "—"}
                            </td>

                          </tr>
                        );

                      })}

                    </tbody>

                  </table>

                </div>

              )}

            </section>

          </>
        )}

      </div>

    </div>
  );
}

export default CourseStudents;