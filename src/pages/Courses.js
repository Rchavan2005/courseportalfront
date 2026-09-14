import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/courses"
      );

      setCourses(response.data);
      setError("");
    } catch (err) {
      console.error(err);
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
    <div className="courses-page">

      <section className="courses-hero">
        <div className="courses-hero-content">
          <span className="courses-tag">
            EXPLORE COURSES
          </span>

          <h1>
            Learn skills that
            <span> move you forward.</span>
          </h1>

          <p>
            Explore our courses, build new skills and take
            the next step in your learning journey.
          </p>
        </div>
      </section>

      <section className="courses-section">

        <div className="courses-top">

          <div>
            <h2>All Courses</h2>

            <p>
              {courses.length} course
              {courses.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="course-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>

        {loading && (
          <div className="courses-message">
            <div className="loading-spinner"></div>
            <p>Loading courses...</p>
          </div>
        )}

        {!loading && error && (
          <div className="courses-message">
            <div className="message-icon">!</div>

            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              className="retry-btn"
              onClick={loadCourses}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredCourses.length === 0 && (
            <div className="courses-message">

              <div className="message-icon">
                📚
              </div>

              <h3>
                {search
                  ? "No courses found"
                  : "No courses available yet"}
              </h3>

              <p>
                {search
                  ? "Try another search keyword."
                  : "Courses will appear here when they are added."}
              </p>

            </div>
          )}

        {!loading &&
          !error &&
          filteredCourses.length > 0 && (
            <div className="courses-grid">

              {filteredCourses.map((course) => (
                <div
                  className="course-card"
                  key={course.id}
                >

                  <div className="course-image">

                    <div className="course-icon">
                      📘
                    </div>

                    <span className="course-badge">
                      COURSE
                    </span>

                  </div>

                  <div className="course-content">

                    <h3>
                      {course.title}
                    </h3>

                    <p className="course-description">
                      {course.description ||
                        "Learn valuable skills with this course."}
                    </p>

                    <div className="course-info">

                      <span>
                        ⏱ {course.duration || "Flexible"}
                      </span>

                      <span>
                        ₹{course.price || "Free"}
                      </span>

                    </div>

                    <div className="course-footer">

                      <span className="course-instructor">
                        👤{" "}
                        {course.instructor?.name ||
                          "Course Instructor"}
                      </span>

                      <Link
                        to={`/courses/${course.id}`}
                        className="view-course-btn"
                      >
                        View Course →
                      </Link>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </section>

    </div>
  );
}

export default Courses;