import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import "./StudentLayout.css";

function StudentLayout() {
  return (
    <div className="student-layout">
      <Header />

      <div className="student-content">
        <Sidebar role="STUDENT" />

        <main className="student-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default StudentLayout;