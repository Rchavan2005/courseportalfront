import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="footer-logo">
            🎓 CoursePortal
          </div>

          <p>
            Learn. Grow. Achieve.
          </p>

          <span>
            Your learning journey starts here.
          </span>

        </div>

        <div className="footer-column">

          <h4>Platform</h4>

          <a href="/courses">Courses</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>

        </div>

        <div className="footer-column">

          <h4>Support</h4>

          <a href="/">Help Center</a>
          <a href="/">Contact</a>
          <a href="/">FAQ</a>

        </div>

        <div className="footer-column">

          <h4>Connect</h4>

          <a href="/">GitHub</a>
          <a href="/">LinkedIn</a>
          <a href="/">Instagram</a>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CoursePortal. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;