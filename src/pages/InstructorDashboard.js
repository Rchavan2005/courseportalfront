import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InstructorDashboard.css";

function InstructorDashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/courses"
      );

      const allCourses = response.data || [];

      // Show only courses created by the logged-in instructor
      const instructorCourses = allCourses.filter(
        (course) =>
          course.instructor &&
          user &&
          course.instructor.id === user.id
      );

      setCourses(instructorCourses);
    } catch (error) {
      console.error("Error loading courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    navigate("/instructor/courses/add");
  };

  const handleManageCourses = () => {
    navigate("/instructor/courses");
  };

  return (
    <div className="instructor-dashboard">

      {/* HERO SECTION */}
      <section className="instructor-hero">

        <div className="hero-content">

          <span className="dashboard-tag">
            INSTRUCTOR DASHBOARD
          </span>

          <h1>
            Welcome,{" "}
            <span>
              {user?.name || "Instructor"}
            </span>{" "}
            👋
          </h1>

          <p>
            Manage your courses and help students continue
            their learning journey.
          </p>

        </div>

        {/* RIGHT SIDE ADD COURSE BUTTON */}
        <button
          className="add-course-btn"
          onClick={handleAddCourse}
        >
          + Add Course
        </button>

      </section>


      {/* STATISTICS */}
      <section className="instructor-stats">

        <div className="instructor-stat-card">
          <div className="stat-icon">
            📚
          </div>

          <div>
            <span>Total Courses</span>
            <strong>{courses.length}</strong>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="stat-icon">
            👥
          </div>

          <div>
            <span>Total Students</span>
            <strong>0</strong>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="stat-icon">
            📈
          </div>

          <div>
            <span>Published Courses</span>
            <strong>{courses.length}</strong>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="stat-icon">
            🎯
          </div>

          <div>
            <span>Teaching</span>
            <strong>Active</strong>
          </div>
        </div>

      </section>


      {/* MY COURSES */}
      <section className="my-courses-section">

        <div className="section-heading">

          <div>
            <h2>My Courses</h2>

            <p>
              Courses created by you
            </p>
          </div>

          <button
            className="manage-courses-link"
            onClick={handleManageCourses}
          >
            Manage Courses →
          </button>

        </div>


        {loading ? (
          <div className="dashboard-message">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (

          <div className="empty-course-state">

            <div className="empty-course-icon">
              📚
            </div>

            <h3>
              No courses yet
            </h3>

            <p>
              Start creating your first course.
            </p>

            <button
              className="add-course-btn secondary"
              onClick={handleAddCourse}
            >
              + Create Your First Course
            </button>

          </div>

        ) : (

          <div className="instructor-course-grid">

            {courses.map((course) => (

              <div
                className="instructor-course-card"
                key={course.id}
              >

                <div className="course-card-top">

                  <div className="course-icon">
                    📘
                  </div>

                  <span className="course-label">
                    COURSE
                  </span>

                </div>

                <h3>
                  {course.title}
                </h3>

                <p>
                  {course.description}
                </p>

                <div className="course-card-footer">

                  <span>
                    {course.duration || "Flexible"}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/instructor/courses/edit/${course.id}`
                      )
                    }
                  >
                    Edit →
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default InstructorDashboard;