import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./EditCourse.css";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    loadCourse(id);
  }, [id, navigate]);

  const loadCourse = async (courseId) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://courseportal-yfsf.onrender.com/api/courses/${courseId}`
      );

      const course = response.data;

      setForm({
        title: course.title || "",
        description: course.description || "",
        duration: course.duration || "",
        price: course.price || ""
      });
    } catch (err) {
      console.error("Load course error:", err);
      setError("Unable to load course details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setSaving(true);

      await axios.put(
        `https://courseportal-yfsf.onrender.com/api/courses/${id}`,
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
      console.error("Update course error:", err);

      if (err.response && err.response.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to update the course."
        );
      } else {
        setError("Unable to connect to the backend.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="edit-course-page">
        <div className="edit-course-message">
          <div className="edit-spinner"></div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-course-page">

      <div className="edit-course-container">

        <div className="edit-course-heading">

          <div>
            <span>COURSE MANAGEMENT</span>

            <h1>
              Edit <span>Course</span>
            </h1>

            <p>
              Update the information of your course.
            </p>
          </div>

          <Link
            to="/instructor/courses"
            className="edit-back-btn"
          >
            ← My Courses
          </Link>

        </div>


        <div className="edit-course-card">

          <div className="edit-card-header">

            <div className="edit-course-icon">
              ✏️
            </div>

            <div>
              <h2>Course Information</h2>

              <p>
                Make changes to your course details.
              </p>
            </div>

          </div>


          {error && (
            <div className="edit-course-error">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="edit-form-group">

              <label htmlFor="title">
                Course Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
              />

            </div>


            <div className="edit-form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>

            </div>


            <div className="edit-form-row">

              <div className="edit-form-group">

                <label htmlFor="duration">
                  Duration
                </label>

                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-form-group">

                <label htmlFor="price">
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-course-actions">

              <Link
                to="/instructor/courses"
                className="edit-cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="update-course-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes →"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCourse;