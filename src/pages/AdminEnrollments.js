import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminEnrollments.css";

function AdminEnrollments() {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== "ADMIN") {
      navigate("/login");
      return;
    }

    loadEnrollments();
  }, [navigate]);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/admin/enrollments"
      );

      setEnrollments(response.data || []);
    } catch (err) {
      console.error("Admin enrollments error:", err);
      setError("Unable to load enrollments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const studentName = enrollment.student?.name || "";
    const studentEmail = enrollment.student?.email || "";
    const courseTitle = enrollment.course?.title || "";
    const status = enrollment.status || "";

    const matchesSearch =
      studentName.toLowerCase().includes(search.toLowerCase()) ||
      studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      courseTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getProgress = (progress) => {
    const value = Number(progress);

    if (Number.isNaN(value)) {
      return 0;
    }

    return Math.min(Math.max(value, 0), 100);
  };

  return (
    <div className="admin-enrollments-page">
      <div className="admin-enrollments-container">

        {/* HEADER */}

        <section className="admin-enrollments-header">

          <div>
            <span className="admin-enrollments-tag">
              ADMINISTRATION
            </span>

            <h1>
              Manage <span>Enrollments</span>
            </h1>

            <p>
              Monitor student course enrollments and learning progress.
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="admin-enrollments-back-btn"
          >
            ← Dashboard
          </Link>

        </section>


        {/* SUMMARY */}

        <section className="admin-enrollment-summary">

          <div className="admin-enrollment-summary-card">

            <div className="admin-enrollment-icon">
              📋
            </div>

            <div>
              <span>Total Enrollments</span>
              <strong>{enrollments.length}</strong>
            </div>

          </div>

          <div className="admin-enrollment-summary-card">

            <div className="admin-enrollment-icon">
              🟢
            </div>

            <div>
              <span>Active</span>
              <strong>
                {
                  enrollments.filter(
                    (e) => e.status === "ENROLLED"
                  ).length
                }
              </strong>
            </div>

          </div>

          <div className="admin-enrollment-summary-card">

            <div className="admin-enrollment-icon">
              ✓
            </div>

            <div>
              <span>Completed</span>
              <strong>
                {
                  enrollments.filter(
                    (e) => e.status === "COMPLETED"
                  ).length
                }
              </strong>
            </div>

          </div>

        </section>


        {/* MAIN SECTION */}

        <section className="admin-enrollments-section">

          <div className="admin-enrollments-section-top">

            <div>
              <h2>All Enrollments</h2>

              <p>
                Student enrollment records and progress.
              </p>
            </div>

            <div className="admin-enrollment-controls">

              <div className="admin-enrollment-search">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search student or course..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <select
                className="admin-enrollment-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="ENROLLED">Enrolled</option>
                <option value="COMPLETED">Completed</option>
              </select>

            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="admin-enrollments-message">

              <div className="admin-enrollments-spinner"></div>

              <p>Loading enrollments...</p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="admin-enrollments-message">

              <div className="admin-enrollments-error-icon">
                !
              </div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button
                className="admin-enrollments-retry-btn"
                onClick={loadEnrollments}
              >
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredEnrollments.length === 0 && (

              <div className="admin-enrollments-message">

                <div className="admin-enrollments-empty-icon">
                  📋
                </div>

                <h3>
                  {search || statusFilter !== "ALL"
                    ? "No enrollments found"
                    : "No enrollments yet"}
                </h3>

                <p>
                  {search || statusFilter !== "ALL"
                    ? "Try changing your search or filter."
                    : "Enrollment records will appear here when students enroll in courses."}
                </p>

              </div>

            )}


          {/* TABLE */}

          {!loading &&
            !error &&
            filteredEnrollments.length > 0 && (

              <div className="admin-enrollments-table-wrapper">

                <table className="admin-enrollments-table">

                  <thead>

                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Enrollment Date</th>
                      <th>Progress</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredEnrollments.map((enrollment) => {

                      const progress = getProgress(
                        enrollment.progress
                      );

                      return (
                        <tr key={enrollment.id}>

                          {/* STUDENT */}

                          <td>

                            <div className="admin-enrollment-student">

                              <div className="admin-enrollment-avatar">
                                {(enrollment.student?.name || "S")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <strong>
                                  {enrollment.student?.name ||
                                    "Unknown Student"}
                                </strong>

                                <span>
                                  {enrollment.student?.email ||
                                    "No email"}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* COURSE */}

                          <td>

                            <div className="admin-enrollment-course">

                              <div className="admin-enrollment-course-icon">
                                📚
                              </div>

                              <strong>
                                {enrollment.course?.title ||
                                  "Unknown Course"}
                              </strong>

                            </div>

                          </td>


                          {/* DATE */}

                          <td>

                            <span className="admin-enrollment-date">

                              {enrollment.enrollDate
                                ? new Date(
                                    enrollment.enrollDate
                                  ).toLocaleDateString()
                                : "N/A"}

                            </span>

                          </td>


                          {/* PROGRESS */}

                          <td>

                            <div className="admin-enrollment-progress">

                              <div className="admin-progress-top">

                                <span>
                                  Progress
                                </span>

                                <strong>
                                  {progress}%
                                </strong>

                              </div>

                              <div className="admin-progress-track">

                                <div
                                  className="admin-progress-fill"
                                  style={{
                                    width: `${progress}%`
                                  }}
                                ></div>

                              </div>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`admin-enrollment-status ${
                                enrollment.status ===
                                "COMPLETED"
                                  ? "completed"
                                  : "enrolled"
                              }`}
                            >
                              {enrollment.status ||
                                "ENROLLED"}
                            </span>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

        </section>

      </div>
    </div>
  );
}

export default AdminEnrollments;