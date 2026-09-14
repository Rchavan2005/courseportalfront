import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ role }) {
  const studentLinks = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: "⌂",
    },
    {
      label: "Browse Courses",
      path: "/courses",
      icon: "▣",
    },
    {
      label: "My Enrollments",
      path: "/student/enrollments",
      icon: "✓",
    },
  ];

  const instructorLinks = [
    {
      label: "Dashboard",
      path: "/instructor/dashboard",
      icon: "⌂",
    },
    {
      label: "Manage Courses",
      path: "/instructor/courses",
      icon: "▣",
    },
    {
      label: "Add Course",
      path: "/instructor/courses/add",
      icon: "+",
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: "⌂",
    },
    {
      label: "Students",
      path: "/admin/students",
      icon: "♙",
    },
    {
      label: "Instructors",
      path: "/admin/instructors",
      icon: "♟",
    },
    {
      label: "Courses",
      path: "/admin/courses",
      icon: "▣",
    },
    {
      label: "Enrollments",
      path: "/admin/enrollments",
      icon: "✓",
    },
  ];

  let links = [];

  if (role === "STUDENT") {
    links = studentLinks;
  } else if (role === "INSTRUCTOR") {
    links = instructorLinks;
  } else if (role === "ADMIN") {
    links = adminLinks;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">CP</div>

        <div>
          <h3>CoursePortal</h3>
          <span>{role ? role.toLowerCase() : "portal"}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;