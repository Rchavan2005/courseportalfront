import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   LAYOUTS
========================= */
import GuestLayout from "./layouts/GuestLayout";
import StudentLayout from "./layouts/StudentLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import AdminLayout from "./layouts/AdminLayout";

/* =========================
   GUEST / PUBLIC PAGES
========================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";

/* =========================
   STUDENT PAGES
========================= */
import StudentDashboard from "./pages/StudentDashboard";
import MyEnrollments from "./pages/MyEnrollments";

/* =========================
   INSTRUCTOR PAGES
========================= */
import InstructorDashboard from "./pages/InstructorDashboard";
import ManageCourses from "./pages/ManageCourses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import CourseStudents from "./pages/CourseStudents";

/* =========================
   ADMIN PAGES
========================= */
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudent from "./pages/AdminStudent";
import AdminInstructors from "./pages/AdminInstructors";
import AdminCourses from "./pages/AdminCourses";
import AdminEnrollments from "./pages/AdminEnrollments";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            GUEST / PUBLIC ROUTES
        ================================================== */}

        <Route element={<GuestLayout />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* ALL COURSES */}
          <Route
            path="/courses"
            element={<Courses />}
          />

          {/* COURSE DETAILS */}
          <Route
            path="/courses/:id"
            element={<CourseDetails />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

        </Route>


        {/* ==================================================
            STUDENT ROUTES
        ================================================== */}

        <Route element={<StudentLayout />}>

          {/* STUDENT DASHBOARD */}
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          {/* STUDENT ENROLLMENTS */}
          <Route
            path="/student/enrollments"
            element={<MyEnrollments />}
          />

        </Route>


        {/* ==================================================
            INSTRUCTOR ROUTES
        ================================================== */}

        <Route element={<InstructorLayout />}>

          {/* INSTRUCTOR DASHBOARD */}
          <Route
            path="/instructor/dashboard"
            element={<InstructorDashboard />}
          />

          {/* MANAGE COURSES */}
          <Route
            path="/instructor/courses"
            element={<ManageCourses />}
          />

          {/* ADD COURSE */}
          <Route
            path="/instructor/courses/add"
            element={<AddCourse />}
          />

          {/* EDIT COURSE */}
          <Route
            path="/instructor/courses/edit/:id"
            element={<EditCourse />}
          />

          {/* COURSE STUDENTS */}
          <Route
            path="/instructor/courses/students/:courseId"
            element={<CourseStudents />}
          />

        </Route>


        {/* ==================================================
            ADMIN ROUTES
        ================================================== */}

        <Route element={<AdminLayout />}>

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          {/* ADMIN STUDENTS */}
          <Route
            path="/admin/students"
            element={<AdminStudent />}
          />

          {/* ADMIN INSTRUCTORS */}
          <Route
            path="/admin/instructors"
            element={<AdminInstructors />}
          />

          {/* ADMIN COURSES */}
          <Route
            path="/admin/courses"
            element={<AdminCourses />}
          />

          {/* ADMIN ENROLLMENTS */}
          <Route
            path="/admin/enrollments"
            element={<AdminEnrollments />}
          />

        </Route>


      </Routes>

    </BrowserRouter>
  );
}

export default App;