import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminCourses.css";

function AdminCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
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

    loadCourses();
  }, [navigate]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/admin/courses"
      );

      setCourses(response.data || []);
    } catch (err) {
      console.error("Admin courses error:", err);
      setError("Unable to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const title = course.title || "";
    const description = course.description || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="admin-courses-page">
      <div className="admin-courses-container">

        {/* HEADER */}

        <section className="admin-courses-header">

          <div>
            <span className="admin-courses-tag">
              ADMINISTRATION
            </span>

            <h1>
              Manage <span>Courses</span>
            </h1>

            <p>
              View all courses available on the CoursePortal platform.
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="admin-courses-back-btn"
          >
            ← Dashboard
          </Link>

        </section>


        {/* SUMMARY */}

        <section className="admin-course-summary">

          <div className="admin-course-summary-card">

            <div className="admin-course-icon">
              📚
            </div>

            <div>
              <span>Total Courses</span>
              <strong>{courses.length}</strong>
            </div>

          </div>

          <div className="admin-course-summary-card">

            <div className="admin-course-icon">
              🔎
            </div>

            <div>
              <span>Showing</span>
              <strong>{filteredCourses.length}</strong>
            </div>

          </div>

        </section>


        {/* COURSES SECTION */}

        <section className="admin-courses-section">

          <div className="admin-courses-section-top">

            <div>
              <h2>All Courses</h2>

              <p>
                Courses created by instructors.
              </p>
            </div>

            <div className="admin-course-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="admin-courses-message">

              <div className="admin-courses-spinner"></div>

              <p>Loading courses...</p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="admin-courses-message">

              <div className="admin-courses-error-icon">
                !
              </div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button
                className="admin-courses-retry-btn"
                onClick={loadCourses}
              >
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredCourses.length === 0 && (

              <div className="admin-courses-message">

                <div className="admin-courses-empty-icon">
                  📚
                </div>

                <h3>
                  {search
                    ? "No courses found"
                    : "No courses available"}
                </h3>

                <p>
                  {search
                    ? "Try another course name."
                    : "Courses will appear here after instructors create them."}
                </p>

              </div>

            )}


          {/* COURSE CARDS */}

          {!loading &&
            !error &&
            filteredCourses.length > 0 && (

              <div className="admin-course-grid">

                {filteredCourses.map((course) => (

                  <div
                    className="admin-course-card"
                    key={course.id}
                  >

                    <div className="admin-course-card-top">

                      <div className="admin-course-book-icon">
                        📖
                      </div>

                      <span className="admin-course-id">
                        #{course.id}
                      </span>

                    </div>


                    <h3>
                      {course.title || "Untitled Course"}
                    </h3>


                    <p className="admin-course-description">
                      {course.description || "No description available."}
                    </p>


                    <div className="admin-course-details">

                      <div>
                        <span>Duration</span>
                        <strong>
                          {course.duration || "N/A"}
                        </strong>
                      </div>

                      <div>
                        <span>Price</span>
                        <strong>
                          {course.price !== undefined &&
                          course.price !== null
                            ? `₹${course.price}`
                            : "Free"}
                        </strong>
                      </div>

                    </div>


                    <div className="admin-course-instructor">

                      <div className="admin-course-instructor-avatar">
                        {(course.instructor?.name || "I")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <span>Instructor</span>

                        <strong>
                          {course.instructor?.name ||
                            "Not assigned"}
                        </strong>
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </section>

      </div>
    </div>
  );
}

export default AdminCourses;