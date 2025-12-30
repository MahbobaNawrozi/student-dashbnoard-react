import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export default function StudentDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [today, setToday] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setToday(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /* ----- responsive sidebar ----- */
  useEffect(() => {
    const closer = (e) => {
      if (window.innerWidth <= 992) {
        if (
          !e.target.closest("#sidebar") &&
          !e.target.closest("#mobileMenuToggle")
        ) {
          setSidebarOpen(false);
        }
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

  /* ----- handlers ----- */
  const toggleDesktop = () => setCollapsed((v) => !v);
  const toggleMobile = () => setSidebarOpen((v) => !v);

  // Close sidebar on mobile when clicking a link
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  const markAttendance = () => alert("Attendance marked successfully!");
  const viewAllCourses = () => alert("Navigating to All-Courses page…");

  /* ---------- render ---------- */
  return (
    <>
      {/* ----- mobile hamburger ----- */}
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={toggleMobile}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
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
            <li className="active">
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
            <li>
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

      {/* ----- main content ----- */}
      <main className="main-content">
        {/* ---- topbar ---- */}
        <header className="topbar">
          <div className="topbar-left">
            <div
              id="desktopMenuToggle"
              className="icon d-none d-lg-flex"
              onClick={toggleDesktop}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div className="welcome">
              <h2>
                Welcome, <span>Alice Johnson</span>
              </h2>
              <p className="d-none d-md-block">
                Track your learning journey and performance
              </p>
            </div>
          </div>

          <div className="user-area">
            <Link to="/notifications" className="icon position-relative">
              <i className="fas fa-bell" />
              <span className="badge">3</span>
            </Link>
            <Link to="/messages" className="icon d-none d-md-flex">
              <i className="fas fa-envelope" />
            </Link>
            <Link to="/calendar" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt" />
            </Link>
            <Link to="/profile">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </Link>
          </div>
        </header>

        {/* ---- stats ---- */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Enrolled Courses</h3>
            <p>5</p>
            <div className="stat-trend">+1 this month</div>
          </div>
          <div className="stat-card">
            <h3>Assignments Due</h3>
            <p>2</p>
            <div className="stat-trend">Next: Math 101</div>
          </div>
          <div className="stat-card">
            <h3>Average Grade</h3>
            <p>88%</p>
            <div className="stat-trend">+2% from last term</div>
          </div>
          <div className="stat-card">
            <h3>Certificates Earned</h3>
            <p>3</p>
            <div className="stat-trend">2 in progress</div>
          </div>
        </div>

        {/* ---- attendance ---- */}
        <div className="attendance-widget">
          <div className="attendance-header">
            <div className="attendance-info">
              <h2>
                <i className="fas fa-calendar-check" /> Attendance Tracker
              </h2>
              <p>Your weekly attendance performance summary</p>
            </div>
            <button className="attendance-action" onClick={markAttendance}>
              <i className="fas fa-plus-circle" /> Mark Attendance
            </button>
          </div>

          <div className="attendance-body">
            <div className="attendance-left">
              <div className="date-display">
                <div className="date-num">{today.getDate()}</div>
                <div className="date-meta">
                  <h4>{days[today.getDay()]}</h4>
                  <p>
                    {months[today.getMonth()]} {today.getFullYear()}
                  </p>
                </div>
              </div>

              <div className="week-overview">
                <h5>This Week</h5>
                <div className="week-days">
                  <span className="dot present">M</span>
                  <span className="dot absent">T</span>
                  <span className="dot present">W</span>
                  <span className="dot upcoming">Th</span>
                  <span className="dot upcoming">F</span>
                </div>
              </div>
            </div>

            <div className="attendance-right">
              <div className="stat-circle-card">
                <div className="circle attendance" style={{ "--val": 83 }}>
                  <div className="inside-circle">
                    <i className="fas fa-user-check" />
                    <h3>83%</h3>
                  </div>
                </div>
                <p>Attendance</p>
              </div>
              <div className="stat-circle-card">
                <div className="circle leave" style={{ "--val": 3 }}>
                  <div className="inside-circle">
                    <i className="fas fa-bed" />
                    <h3>03</h3>
                  </div>
                </div>
                <p>Leaves</p>
              </div>
              <div className="stat-circle-card">
                <div className="circle ongoing" style={{ "--val": 23 }}>
                  <div className="inside-circle">
                    <i className="fas fa-hourglass-half" />
                    <h3>23</h3>
                  </div>
                </div>
                <p>Ongoing Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- courses ---- */}
        <div className="courses-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button className="attendance-action" onClick={viewAllCourses}>
              <i className="fas fa-eye" /> View All
            </button>
          </div>
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Tier</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Web Development</td>
                  <td>Intermediate</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: "75%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>
                      75%
                    </span>
                  </td>
                  <td>
                    <span className="status active">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>Data Science</td>
                  <td>Beginner</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: "45%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>
                      45%
                    </span>
                  </td>
                  <td>
                    <span className="status in-progress">In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>UI/UX Design</td>
                  <td>Advanced</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: "100%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>
                      100%
                    </span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing</td>
                  <td>Beginner</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: "60%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>
                      60%
                    </span>
                  </td>
                  <td>
                    <span className="status active">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>Mobile App Dev</td>
                  <td>Intermediate</td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: "30%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>
                      30%
                    </span>
                  </td>
                  <td>
                    <span className="status in-progress">In Progress</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
