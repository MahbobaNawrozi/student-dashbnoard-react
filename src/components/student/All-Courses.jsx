import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import {
  FaBars,
  FaTachometerAlt,
  FaLayerGroup,
  FaBook,
  FaTasks,
  FaGraduationCap,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaCheck,
  FaPlus,
  FaUsers,
  FaClock,
} from "react-icons/fa";

export default function AllCourses() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [courses, setCourses] = useState([
    {
      name: "Math 101",
      level: "Basic",
      desc: "Basic Math concepts including algebra, geometry, and arithmetic fundamentals.",
      lessons: 12,
      students: 45,
      duration: "3h 20m",
      enrolled: true,
      img: "https://picsum.photos/300/140?random=1",
    },
    {
      name: "Physics 201",
      level: "Intermediate",
      desc: "Mechanics and Thermodynamics principles with practical applications.",
      lessons: 18,
      students: 32,
      duration: "5h 10m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=2",
    },
    {
      name: "History 101",
      level: "Basic",
      desc: "World History overview from ancient civilizations to modern times.",
      lessons: 10,
      students: 50,
      duration: "2h 45m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=3",
    },
    {
      name: "Programming 101",
      level: "Basic",
      desc: "Introduction to Python programming with hands-on exercises.",
      lessons: 15,
      students: 60,
      duration: "4h 00m",
      enrolled: true,
      img: "https://picsum.photos/300/140?random=4",
    },
    {
      name: "Data Science 201",
      level: "Intermediate",
      desc: "Intermediate Data Science concepts including data analysis and visualization.",
      lessons: 20,
      students: 35,
      duration: "6h 30m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=5",
    },
    {
      name: "AI Advanced",
      level: "Advanced",
      desc: "Deep Learning Concepts with TensorFlow and neural networks.",
      lessons: 25,
      students: 22,
      duration: "8h 00m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=6",
    },
    {
      name: "Cybersecurity Pro",
      level: "Pro",
      desc: "Expert Cybersecurity training with penetration testing and defense strategies.",
      lessons: 30,
      students: 12,
      duration: "10h 15m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=7",
    },
    {
      name: "Web Development",
      level: "Intermediate",
      desc: "Full-stack web development with HTML, CSS, JavaScript and Node.js.",
      lessons: 22,
      students: 48,
      duration: "7h 30m",
      enrolled: false,
      img: "https://picsum.photos/300/140?random=8",
    },
  ]);

  /* ---------- category filter ---------- */
  const [category, setCategory] = useState("All");

  /* ---------- sidebar logic ---------- */
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
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Handle menu link clicks (close sidebar on mobile)
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  /* ---------- enroll handler ---------- */
  const enroll = (name) => {
    const updatedCourses = courses.map((course) => {
      if (course.name === name && !course.enrolled) {
        return { ...course, enrolled: true };
      }
      return course;
    });

    setCourses(updatedCourses);
    alert(`Successfully enrolled in ${name}!`);
  };

  /* ---------- level badge class ---------- */
  const levelClass = (level) => {
    switch (level) {
      case "Basic":
        return "level-basic";
      case "Intermediate":
        return "level-intermediate";
      case "Advanced":
        return "level-advanced";
      case "Pro":
        return "level-pro";
      default:
        return "";
    }
  };

  /* ---------- filtered courses ---------- */
  const filtered =
    category === "All" ? courses : courses.filter((c) => c.level === category);

  /* ---------- render ---------- */
  return (
    <>
      {/* ======  MOBILE MENU BUTTON  ====== */}
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <FaBars />
      </button>

      <aside
        id="sidebar"
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>{collapsed ? "" : "E-Learn"}</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li>
              <Link to="/StudentDashboard" onClick={handleMenuClick}>
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="active">
              <Link to="/All-Courses" onClick={handleMenuClick}>
                <FaLayerGroup />
                <span>All Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/My-Course" onClick={handleMenuClick}>
                <FaBook />
                <span>My Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/Assignments" onClick={handleMenuClick}>
                <FaTasks />
                <span>Assignments</span>
              </Link>
            </li>
            <li>
              <Link to="/Grades" onClick={handleMenuClick}>
                <FaGraduationCap />
                <span>Grades</span>
              </Link>
            </li>
            <li>
              <Link to="/Certificates" onClick={handleMenuClick}>
                <FaCertificate />
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer" />
            <li>
              <Link to="/Setting" onClick={handleMenuClick}>
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleMenuClick}>
                <FaSignOutAlt />
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
              onClick={() => setCollapsed((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <FaBars />
            </div>
            <div className="welcome">
              <h2>All Courses</h2>
              <p className="d-none d-md-block">
                Browse and enroll in available courses
              </p>
            </div>
          </div>

          <div className="user-area">
            <Link to="/notifications" className="icon position-relative">
              <FaBell />
              <span className="badge">3</span>
            </Link>
            <Link to="/messages" className="icon d-none d-md-flex">
              <FaEnvelope />
            </Link>
            <Link to="/calendar" className="icon d-none d-md-flex">
              <FaCalendarAlt />
            </Link>
            <Link to="/profile">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </Link>
          </div>
        </header>

        <div className="courses-section">
          <div className="category-tabs">
            <button
              className={category === "All" ? "active" : ""}
              onClick={() => setCategory("All")}
            >
              All
            </button>
            <button
              className={category === "Basic" ? "active" : ""}
              onClick={() => setCategory("Basic")}
            >
              Basic
            </button>
            <button
              className={category === "Intermediate" ? "active" : ""}
              onClick={() => setCategory("Intermediate")}
            >
              Intermediate
            </button>
            <button
              className={category === "Advanced" ? "active" : ""}
              onClick={() => setCategory("Advanced")}
            >
              Advanced
            </button>
            <button
              className={category === "Pro" ? "active" : ""}
              onClick={() => setCategory("Pro")}
            >
              Pro
            </button>
          </div>

          <div className="cards-container">
            {filtered.map((c, i) => (
              <div className="course-card" key={i}>
                <div style={{ position: "relative" }}>
                  <img src={c.img} alt={c.name} />
                  <span className={`level-badge ${levelClass(c.level)}`}>
                    {c.level}
                  </span>
                </div>
                <div className="course-card-content">
                  <h4>{c.name}</h4>
                  <p>{c.desc}</p>
                  <div className="course-card-info">
                    <span>
                      <FaBook /> {c.lessons} Lessons
                    </span>
                    <span>
                      <FaUsers /> {c.students} Students
                    </span>
                    <span>
                      <FaClock /> {c.duration}
                    </span>
                  </div>
                  <button
                    disabled={c.enrolled}
                    onClick={() => {
                      if (!c.enrolled) {
                        if (
                          confirm(
                            `Are you sure you want to enroll in "${c.name}"?`
                          )
                        ) {
                          enroll(c.name);
                        }
                      }
                    }}
                  >
                    {c.enrolled ? (
                      <>
                        <FaCheck /> Enrolled
                      </>
                    ) : (
                      <>
                        <FaPlus /> Enroll
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
