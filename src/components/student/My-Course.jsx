import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Fixed: Added missing import
import "./styles.css";
export default function MyCourses() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses] = useState([
    {
      name: "Math 101",
      desc: "Basic Math concepts including algebra, geometry, and trigonometry.",
      lessons: 12,
      completedLessons: 6,
      grade: "B+",
      duration: "3h 20m",
      lessonList: [
        "Numbers",
        "Algebra",
        "Geometry",
        "Trigonometry",
        "Probability",
        "Statistics",
      ],
      status: "active",
    },
    {
      name: "Programming 101",
      desc: "Introduction to Python programming for beginners.",
      lessons: 15,
      completedLessons: 15,
      grade: "A",
      duration: "4h 00m",
      lessonList: [
        "Variables",
        "Loops",
        "Functions",
        "Lists",
        "Dictionaries",
        "Classes",
      ],
      status: "completed",
    },
    {
      name: "Physics 201",
      desc: "Mechanics & Thermodynamics with practical applications.",
      lessons: 18,
      completedLessons: 9,
      grade: "B",
      duration: "5h 10m",
      lessonList: [
        "Kinematics",
        "Dynamics",
        "Work & Energy",
        "Thermodynamics",
        "Momentum",
      ],
      status: "active",
    },
    {
      name: "Web Development",
      desc: "Full-stack web development with HTML, CSS, and JavaScript.",
      lessons: 20,
      completedLessons: 10,
      grade: "A-",
      duration: "6h 30m",
      lessonList: [
        "HTML Basics",
        "CSS Styling",
        "JavaScript Fundamentals",
        "React Basics",
        "Node.js",
      ],
      status: "active",
    },
    {
      name: "Data Science",
      desc: "Introduction to data analysis and machine learning concepts.",
      lessons: 16,
      completedLessons: 4,
      grade: "B+",
      duration: "4h 45m",
      lessonList: [
        "Python for Data",
        "Pandas",
        "NumPy",
        "Data Visualization",
        "ML Basics",
      ],
      status: "active",
    },
    {
      name: "Digital Marketing",
      desc: "Modern marketing strategies for the digital age.",
      lessons: 14,
      completedLessons: 14,
      grade: "A",
      duration: "3h 50m",
      lessonList: [
        "SEO",
        "Social Media",
        "Content Marketing",
        "Email Marketing",
        "Analytics",
      ],
      status: "completed",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const closer = (e) => {
      if (window.innerWidth <= 992) {
        if (
          !e.target.closest("#sidebar") &&
          !e.target.closest("#mobileMenuToggle")
        )
          setSidebarOpen(false);
      }
    };
    document.addEventListener("click", closer);
    return () => document.removeEventListener("click", closer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  const filtered =
    filter === "all" ? courses : courses.filter((c) => c.status === filter);

  const progressPercent = (c) =>
    Math.round((c.completedLessons / c.lessons) * 100);

  const gradeBadgeClass = (grade) => {
    const first = grade.charAt(0);
    if (first === "A") return "A";
    if (first === "B") return "B";
    return "";
  };

  const viewLessons = (index) => {
    setCurrent(index);
    setModal(true);
  };
  const closeModal = () => setModal(false);

  const continueCourse = (index) => {
    alert(
      `Continuing course: ${courses[index].name}\n\nRedirecting to the next lesson...`
    );
  };

  return (
    <>
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>
      <aside
        id="sidebar"
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>{sidebarCollapsed ? "" : "E-Learn"}</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li>
              <Link to="/StudentDashboard" onClick={handleMenuClick}>
                <i className="fas fa-tachometer-alt" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/All-Courses" onClick={handleMenuClick}>
                <i className="fas fa-layer-group" />
                <span>All Courses</span>
              </Link>
            </li>
            <li className="active">
              <Link to="/My-Course" onClick={handleMenuClick}>
                <i className="fas fa-book" />
                <span>My Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/Assignments" onClick={handleMenuClick}>
                <i className="fas fa-tasks" />
                <span>Assignments</span>
              </Link>
            </li>
            <li>
              <Link to="/Grades" onClick={handleMenuClick}>
                <i className="fas fa-graduation-cap" />
                <span>Grades</span>
              </Link>
            </li>
            <li>
              <Link to="/Certificates" onClick={handleMenuClick}>
                <i className="fas fa-certificate" />
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer" />
            <li>
              <Link to="/Setting" onClick={handleMenuClick}>
                <i className="fas fa-cog" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleMenuClick}>
                <i className="fas fa-sign-out-alt" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div
              id="desktopMenuToggle"
              className="icon d-none d-lg-flex"
              onClick={() => setSidebarCollapsed((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div className="welcome">
              <h2>My Courses</h2>
              <p className="d-none d-md-block">
                Manage and track your enrolled courses
              </p>
            </div>
          </div>

          <div className="user-area">
            <a href="#" className="icon position-relative">
              <i className="fas fa-bell" />
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope" />
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt" />
            </a>
            <a href="#">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </a>
          </div>
        </header>

        <div className="courses-section">
          <div className="section-header">
            <h2>My Enrolled Courses</h2>
            <div className="filter-controls">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`filter-btn ${
                  filter === "completed" ? "active" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="courses-grid">
            {filtered.map((c, i) => {
              const completed = c.completedLessons === c.lessons;
              const progress = Math.round(
                (c.completedLessons / c.lessons) * 100
              );
              return (
                <div className="course-card" key={i}>
                  {completed && <div className="ribbon">COMPLETED</div>}
                  <div
                    className={`course-card-header ${
                      completed ? "completed" : ""
                    }`}
                  >
                    {c.name}
                  </div>
                  <div className="course-card-content">
                    <p>{c.desc}</p>
                    <div className="progress-container">
                      <div
                        className={`progress-circle ${
                          completed ? "completed" : ""
                        }`}
                      >
                        {progress}%
                      </div>
                      <div className="course-info">
                        <div className="info-item">
                          <i className="fas fa-book" />
                          <span>
                            Lessons: {c.completedLessons}/{c.lessons}
                          </span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-star" />
                          <span>
                            Grade:{" "}
                            <span
                              className={`grade-badge ${gradeBadgeClass(
                                c.grade
                              )}`}
                            >
                              {c.grade}
                            </span>
                          </span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-clock" />
                          <span>Duration: {c.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="course-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => viewLessons(i)}
                      >
                        <i className="fas fa-eye" /> View Lessons
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => continueCourse(i)}
                      >
                        <i className="fas fa-play" /> Continue
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {modal && (
        <div
          className="lesson-modal"
          style={{ display: "flex" }}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {current !== null &&
                  `${courses[current].name} - Lessons (${courses[current].lessons})`}
              </h3>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="lessons-list">
              {current !== null &&
                courses[current].lessonList.map((lesson, idx) => {
                  const completed = idx < courses[current].completedLessons;
                  return (
                    <li key={idx}>
                      <i
                        className={`fas ${
                          completed ? "fa-check-circle" : "fa-circle"
                        }`}
                      />
                      <span>
                        {idx + 1}. {lesson}
                      </span>
                      {completed && (
                        <span
                          style={{
                            marginLeft: "auto",
                            color: "var(--success-color)",
                          }}
                        >
                          <i className="fas fa-check" />
                        </span>
                      )}
                    </li>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
