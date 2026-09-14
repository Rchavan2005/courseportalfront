import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStudent.css";

function AdminStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://courseportal-yfsf.onrender.com/api/admin/students"
      );

      setStudents(response.data);
    } catch (err) {
      console.error("Error loading students:", err);
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-students-page">

      <div className="admin-page-header">
        <div>
          <span className="admin-page-tag">ADMINISTRATION</span>
          <h1>Students</h1>
          <p>View and manage registered students.</p>
        </div>

        <div className="student-count">
          <strong>{students.length}</strong>
          <span>Total Students</span>
        </div>
      </div>

      {loading && (
        <div className="admin-message">
          Loading students...
        </div>
      )}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="admin-table-card">

          {students.length === 0 ? (
            <div className="admin-empty">
              <div className="empty-icon">♙</div>
              <h3>No students found</h3>
              <p>
                There are currently no registered students.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>

                      <td>
                        <div className="student-name">
                          <div className="student-avatar">
                            {student.name
                              ? student.name.charAt(0).toUpperCase()
                              : "S"}
                          </div>

                          <span>
                            {student.name || "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td>
                        {student.email || "N/A"}
                      </td>

                      <td>
                        <span className="role-badge">
                          {student.role || "STUDENT"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default AdminStudent;