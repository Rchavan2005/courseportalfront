import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-tag">
            ABOUT COURSEPORTAL
          </span>

          <h1>
            Learn today.
            <span> Grow tomorrow.</span>
          </h1>

          <p>
            CoursePortal is an online learning platform designed
            to make learning simple, structured and accessible.
          </p>

        </div>

      </section>

      {/* MAIN CONTENT */}
      <section className="about-content">

        <div className="about-intro">

          <div>
            <span className="section-tag">
              OUR PLATFORM
            </span>

            <h2>
              A better way to learn and teach.
            </h2>
          </div>

          <p>
            CoursePortal connects students and instructors through
            a simple online learning environment. Students can
            explore courses, enroll in them and track their progress,
            while instructors can create and manage their courses.
          </p>

        </div>

        {/* FEATURES */}
        <div className="about-features">

          <div className="about-feature-card">

            <div className="feature-icon">
              📚
            </div>

            <h3>
              Learn
            </h3>

            <p>
              Discover structured courses and develop useful
              skills at your own pace.
            </p>

          </div>

          <div className="about-feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Track Progress
            </h3>

            <p>
              Keep track of your learning journey and see
              how far you have progressed.
            </p>

          </div>

          <div className="about-feature-card">

            <div className="feature-icon">
              👨‍🏫
            </div>

            <h3>
              Teach
            </h3>

            <p>
              Instructors can create courses and help students
              build valuable knowledge and skills.
            </p>

          </div>

        </div>

        {/* CTA */}
        <div className="about-cta">

          <div>

            <span>
              START YOUR JOURNEY
            </span>

            <h2>
              Ready to start learning?
            </h2>

            <p>
              Explore our available courses and find something
              that matches your learning goals.
            </p>

          </div>

          <Link
            to="/courses"
            className="about-cta-button"
          >
            Explore Courses →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;