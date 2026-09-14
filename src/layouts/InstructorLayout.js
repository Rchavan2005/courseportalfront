import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import "./InstructorLayout.css";

function InstructorLayout() {
  return (
    <div className="instructor-layout">
      <Header />

      <div className="instructor-content">
        <Sidebar role="INSTRUCTOR" />

        <main className="instructor-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default InstructorLayout;