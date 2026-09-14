import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./GuestLayout.css";

function GuestLayout() {
  return (
    <div className="guest-layout">
      <Header />

      <main className="guest-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default GuestLayout;