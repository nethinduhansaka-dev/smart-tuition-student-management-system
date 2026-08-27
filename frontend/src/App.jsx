import './App.css'

function App() {
  const handleGetStarted = () => {
    alert('Login page will be available soon.')
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* ================= NAVIGATION ================= */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">
            S
          </div>

          <div className="brand-info">
            <strong>STSMS</strong>
            <span>Smart Tuition Management</span>
          </div>
        </div>

        <button
          className="about-button"
          onClick={scrollToAbout}
        >
          About
        </button>
      </header>


      {/* ================= HERO ================= */}
      <section id="center">

        <div className="hero-content">

          <div className="badge">
            Tuition Institute Management Platform
          </div>

          <h1>
            Smart Tuition
            <span>Student Management System</span>
          </h1>

          <p className="description">
            A centralized web-based platform designed to simplify
            student, teacher, class, attendance, examination,
            payment, and report management for tuition institutes.
          </p>

          <button
            type="button"
            className="get-started"
            onClick={handleGetStarted}
          >
            Get Started
          </button>

          <div className="roles">
            <span>Student</span>
            <span>Teacher</span>
            <span>Administrator</span>
          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}
      <section id="about">

        <div className="about-header">

          <span className="section-label">
            ABOUT STSMS
          </span>

          <h2>
            One platform for tuition institute management
          </h2>

          <p>
            STSMS aims to provide a centralized platform for managing
            important academic and administrative information while
            reducing dependence on fragmented manual records.
          </p>

        </div>


        {/* ================= FEATURES ================= */}
        <div className="features">

          <div className="feature">
            <div className="feature-icon">
              👨‍🎓
            </div>

            <h3>Student Management</h3>

            <p>
              Manage student information and academic records
              in one centralized system.
            </p>
          </div>


          <div className="feature">
            <div className="feature-icon">
              📅
            </div>

            <h3>Attendance</h3>

            <p>
              Record and monitor student attendance efficiently.
            </p>
          </div>


          <div className="feature">
            <div className="feature-icon">
              📝
            </div>

            <h3>Examinations</h3>

            <p>
              Manage examination marks and student performance
              information.
            </p>
          </div>


          <div className="feature">
            <div className="feature-icon">
              💰
            </div>

            <h3>Payments</h3>

            <p>
              Maintain tuition fee and payment-related records.
            </p>
          </div>


          <div className="feature">
            <div className="feature-icon">
              👨‍🏫
            </div>

            <h3>Teacher Management</h3>

            <p>
              Organize teacher and class-related information.
            </p>
          </div>


          <div className="feature">
            <div className="feature-icon">
              📊
            </div>

            <h3>Reports</h3>

            <p>
              Provide useful academic and institutional reports.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer>

        <strong>
          Smart Tuition Student Management System
        </strong>

        <p>
          EER4189 – Software Design in Group Project
        </p>

        <small>
          Group 11 · The Open University of Sri Lanka
        </small>

      </footer>
    </>
  )
}

export default App