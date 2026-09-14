import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminInstructors.css";

function AdminInstructors() {
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);
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

    loadInstructors();
  }, [navigate]);

  const loadInstructors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/admin/instructors"
      );

      setInstructors(response.data || []);
    } catch (err) {
      console.error("Instructor loading error:", err);
      setError("Unable to load instructors.");
    } finally {
      setLoading(false);
    }
  };

  const filteredInstructors = instructors.filter((instructor) => {
    const name = instructor.name || "";
    const email = instructor.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="admin-instructors-page">
      <div className="admin-instructors-container">

        {/* HEADER */}

        <section className="admin-instructors-header">

          <div>
            <span className="admin-instructors-tag">
              ADMINISTRATION
            </span>

            <h1>
              Manage <span>Instructors</span>
            </h1>

            <p>
              View all instructors registered on CoursePortal.
            </p>
          </div>

          <Link
            to="/admin/dashboard"
            className="admin-instructors-back-btn"
          >
            ← Dashboard
          </Link>

        </section>


        {/* SUMMARY */}

        <section className="admin-instructor-summary">

          <div className="admin-instructor-summary-card">

            <div className="admin-instructor-icon">
              👨‍🏫
            </div>

            <div>
              <span>Total Instructors</span>
              <strong>{instructors.length}</strong>
            </div>

          </div>

          <div className="admin-instructor-summary-card">

            <div className="admin-instructor-icon">
              🔎
            </div>

            <div>
              <span>Showing</span>
              <strong>{filteredInstructors.length}</strong>
            </div>

          </div>

        </section>


        {/* MAIN SECTION */}

        <section className="admin-instructors-section">

          <div className="admin-instructors-section-top">

            <div>
              <h2>All Instructors</h2>

              <p>
                Instructors available on the platform.
              </p>
            </div>

            <div className="admin-instructor-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="admin-instructors-message">

              <div className="admin-instructors-spinner"></div>

              <p>Loading instructors...</p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="admin-instructors-message">

              <div className="admin-instructors-error-icon">
                !
              </div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button
                className="admin-instructors-retry-btn"
                onClick={loadInstructors}
              >
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredInstructors.length === 0 && (

              <div className="admin-instructors-message">

                <div className="admin-instructors-empty-icon">
                  👨‍🏫
                </div>

                <h3>
                  {search
                    ? "No instructors found"
                    : "No instructors registered"}
                </h3>

                <p>
                  {search
                    ? "Try another name or email."
                    : "Instructors will appear here after registration."}
                </p>

              </div>

            )}


          {/* TABLE */}

          {!loading &&
            !error &&
            filteredInstructors.length > 0 && (

              <div className="admin-instructors-table-wrapper">

                <table className="admin-instructors-table">

                  <thead>

                    <tr>
                      <th>Instructor</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>User ID</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredInstructors.map((instructor) => (

                      <tr key={instructor.id}>

                        <td>

                          <div className="admin-instructor-name-cell">

                            <div className="admin-instructor-avatar">
                              {(instructor.name || "I")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {instructor.name || "Instructor"}
                              </strong>

                              <span>
                                Instructor Account
                              </span>
                            </div>

                          </div>

                        </td>


                        <td>
                          <span className="admin-instructor-email">
                            {instructor.email || "Not available"}
                          </span>
                        </td>


                        <td>

                          <span className="admin-instructor-role">
                            {instructor.role || "INSTRUCTOR"}
                          </span>

                        </td>


                        <td>

                          <span className="admin-instructor-id">
                            #{instructor.id}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

        </section>

      </div>
    </div>
  );
}

export default AdminInstructors;