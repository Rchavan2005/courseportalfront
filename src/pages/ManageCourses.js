import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageCourses.css";

function ManageCourses() {
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

  /* =========================
     ADD COURSE
     SAME PATH FOR BOTH BUTTONS
  ========================= */
  const handleAddCourse = () => {
    navigate("/instructor/courses/add");
  };

  /* =========================
     EDIT COURSE
  ========================= */
  const handleEditCourse = (courseId) => {
    navigate(`/instructor/courses/edit/${courseId}`);
  };

  /* =========================
     COURSE STUDENTS
  ========================= */
  const handleViewStudents = (courseId) => {
    navigate(`/instructor/courses/students/${courseId}`);
  };

  return (
    <div className="manage-courses-page">

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="manage-courses-content">

        {/* HERO */}
        <section className="manage-courses-hero">

          <div className="manage-hero-content">

            <span className="manage-tag">
              COURSE MANAGEMENT
            </span>

            <h1>
              Manage <span>Courses</span>
            </h1>

            <p>
              Create, update and manage the courses you teach.
            </p>

          </div>

          {/* RIGHT SIDE ADD COURSE BUTTON */}
          <button
            className="manage-add-course-btn"
            onClick={handleAddCourse}
          >
            + Add Course
          </button>

        </section>


        {/* =========================
            COURSE SECTION
        ========================= */}

        <section className="manage-course-section">

          <div className="manage-section-header">

            <div>
              <h2>
                Your Courses
              </h2>

              <p>
                {courses.length} course
                {courses.length !== 1 ? "s" : ""} created by you
              </p>
            </div>

          </div>


          {/* LOADING */}
          {loading && (
            <div className="manage-message">
              Loading courses...
            </div>
          )}


          {/* EMPTY STATE */}
          {!loading && courses.length === 0 && (
            <div className="manage-empty-state">

              <div className="manage-empty-icon">
                📚
              </div>

              <h3>
                No courses yet
              </h3>

              <p>
                Create your first course to start teaching students.
              </p>

              {/* SAME PATH AS SIDEBAR ADD COURSE */}
              <button
                className="manage-add-course-btn secondary"
                onClick={handleAddCourse}
              >
                + Create Your First Course
              </button>

            </div>
          )}


          {/* COURSES */}
          {!loading && courses.length > 0 && (
            <div className="manage-course-grid">

              {courses.map((course) => (

                <div
                  className="manage-course-card"
                  key={course.id}
                >

                  {/* CARD TOP */}
                  <div className="manage-course-top">

                    <div className="manage-course-icon">
                      📘
                    </div>

                    <span>
                      ID #{course.id}
                    </span>

                  </div>


                  {/* COURSE INFO */}
                  <div className="manage-course-info">

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>

                  </div>


                  {/* COURSE DETAILS */}
                  <div className="manage-course-details">

                    <div>
                      <span>
                        Duration
                      </span>

                      <strong>
                        {course.duration || "Flexible"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Price
                      </span>

                      <strong>
                        ₹{course.price || 0}
                      </strong>
                    </div>

                  </div>


                  {/* ACTIONS */}
                  <div className="manage-course-actions">

                    <button
                      className="manage-edit-btn"
                      onClick={() =>
                        handleEditCourse(course.id)
                      }
                    >
                      Edit Course
                    </button>

                    <button
                      className="manage-students-btn"
                      onClick={() =>
                        handleViewStudents(course.id)
                      }
                    >
                      Students
                    </button>

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

export default ManageCourses;