import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AddCourse.css";

function AddCourse() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "INSTRUCTOR") {
      setError("Only instructors can create courses.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://courseportal-yfsf.onrender.com/api/courses",
        {
          title: form.title,
          description: form.description,
          duration: form.duration,
          price: form.price,
          instructor: {
            id: user.id
          }
        }
      );

      navigate("/instructor/courses");
    } catch (err) {
      console.error("Add course error:", err);

      if (err.response && err.response.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to create the course."
        );
      } else {
        setError("Unable to connect to the backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="add-course-page">

      <div className="add-course-container">

        <div className="add-course-heading">

          <div>
            <span>COURSE MANAGEMENT</span>

            <h1>
              Create a <span>New Course</span>
            </h1>

            <p>
              Add a new course for students to discover
              and learn from.
            </p>
          </div>

          <Link
            to="/instructor/courses"
            className="back-courses-btn"
          >
            ← My Courses
          </Link>

        </div>


        <div className="add-course-layout">

          <div className="add-course-info">

            <div className="add-course-icon">
              📚
            </div>

            <h2>
              Share your knowledge
            </h2>

            <p>
              Create a structured course and help
              students build useful skills.
            </p>

            <div className="course-tips">

              <div>
                <span>✓</span>
                Use a clear course title
              </div>

              <div>
                <span>✓</span>
                Add a useful description
              </div>

              <div>
                <span>✓</span>
                Mention the course duration
              </div>

              <div>
                <span>✓</span>
                Set an appropriate price
              </div>

            </div>

          </div>


          <div className="add-course-card">

            <div className="add-course-card-header">
              <h2>Course Information</h2>
              <p>Enter the details of your new course.</p>
            </div>


            {error && (
              <div className="add-course-error">
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              <div className="add-form-group">
                <label htmlFor="title">
                  Course Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Java Full Stack Development"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="add-form-group">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe what students will learn..."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>


              <div className="add-form-row">

                <div className="add-form-group">
                  <label htmlFor="duration">
                    Duration
                  </label>

                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="e.g. 8 Weeks"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="add-form-group">
                  <label htmlFor="price">
                    Price
                  </label>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="e.g. 999"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="add-course-actions">

                <Link
                  to="/instructor/courses"
                  className="cancel-course-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="save-course-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create Course →"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddCourse;