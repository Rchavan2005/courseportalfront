import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ Learn • Practice • Grow
          </div>

          <h1>
            Learn Skills.
            <br />
            <span>Build Your Future.</span>
          </h1>

          <p>
            Discover quality courses and track your
            learning journey in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/courses"
              className="btn-primary hero-primary"
            >
              Explore Courses →
            </Link>

            <Link
              to="/register"
              className="btn-outline"
            >
              Get Started
            </Link>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-circle">

            <div className="learning-card">
              🎓
              <span>Keep Learning</span>
            </div>

            <div className="plant plant-one">🌿</div>
            <div className="plant plant-two">🌱</div>

            <div className="laptop">
              💻
            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section" id="about">

        <div className="section-heading">

          <span>WHY COURSEPORTAL?</span>

          <h2>
            Everything you need to learn better
          </h2>

        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">📚</div>

            <h3>Learn from Anywhere</h3>

            <p>
              Access your courses and learning
              resources whenever you need them.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>

            <h3>Quality Courses</h3>

            <p>
              Explore carefully structured courses
              designed for practical learning.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Track Your Progress</h3>

            <p>
              Monitor your learning progress and
              see how far you've come.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>

            <h3>Build Your Career</h3>

            <p>
              Develop useful skills that help you
              move closer to your career goals.
            </p>
          </div>

        </div>

      </section>


      {/* POPULAR COURSES */}

      <section className="popular-section">

        <div className="section-title-row">

          <div>
            <span>START LEARNING</span>

            <h2>Popular Courses</h2>
          </div>

          <Link to="/courses">
            View All →
          </Link>

        </div>

        <div className="course-preview-grid">

          <div className="home-course-card">

            <div className="course-image java">
              ☕
            </div>

            <div className="course-content">

              <h3>Java Full Stack</h3>

              <p>
                Java, Spring Boot, React and MySQL
              </p>

              <div className="course-info">
                <span>◷ 8 Weeks</span>
                <strong>₹999</strong>
              </div>

              <Link to="/courses">
                View Details
              </Link>

            </div>

          </div>


          <div className="home-course-card">

            <div className="course-image python">
              🐍
            </div>

            <div className="course-content">

              <h3>Python Programming</h3>

              <p>
                Learn Python from basics to projects
              </p>

              <div className="course-info">
                <span>◷ 6 Weeks</span>
                <strong>₹799</strong>
              </div>

              <Link to="/courses">
                View Details
              </Link>

            </div>

          </div>


          <div className="home-course-card">

            <div className="course-image ml">
              🤖
            </div>

            <div className="course-content">

              <h3>Machine Learning</h3>

              <p>
                Build practical ML models and projects
              </p>

              <div className="course-info">
                <span>◷ 10 Weeks</span>
                <strong>₹1,199</strong>
              </div>

              <Link to="/courses">
                View Details
              </Link>

            </div>

          </div>


          <div className="home-course-card">

            <div className="course-image web">
              💻
            </div>

            <div className="course-content">

              <h3>Web Development</h3>

              <p>
                HTML, CSS, JavaScript and React
              </p>

              <div className="course-info">
                <span>◷ 6 Weeks</span>
                <strong>₹899</strong>
              </div>

              <Link to="/courses">
                View Details
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta-section">

        <div>

          <h2>
            Ready to start learning?
          </h2>

          <p>
            Join thousands of learners and take
            the next step in your career.
          </p>

          <Link to="/courses">
            Explore Courses →
          </Link>

        </div>

        <div className="cta-illustration">
          📚
        </div>

      </section>

    </div>
  );
}

export default Home;