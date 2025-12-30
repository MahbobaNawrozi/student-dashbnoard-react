import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Index() {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const shouldCollapse = window.innerWidth <= 992;
      setCollapsed(shouldCollapse);
      if (window.innerWidth > 992) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const teachers = [
    "Alice Johnson",
    "Bob Smith",
    "Carol Lee",
    "David Brown",
    "Eve Wilson",
  ];
  const courses = [
    "Web Development",
    "Marketing 101",
    "UI/UX Design",
    "Data Science",
    "AI Fundamentals",
  ];
  const students = [
    { name: "John Doe", status: "active" },
    { name: "Sarah Connor", status: "active" },
    { name: "Mike Ross", status: "graduated" },
    { name: "Rachel Zane", status: "active" },
    { name: "Harvey Specter", status: "graduated" },
    { name: "Donna Paulsen", status: "active" },
  ];

  const stats = {
    totalTeachers: teachers.length,
    totalCourses: courses.length,
    pendingTasks: Math.floor(Math.random() * 10),
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    graduatedStudents: students.filter((s) => s.status === "graduated").length,
  };

  const navLinks = [
    {
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      to: "/index",
      active: true,
    },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
  ];

  const css = `
    :root {
      --sidebar-bg: #1a237e;
      --sidebar-head: #151c6a;
      --accent: #1a237e;
      --accent-light: #303f9f;
      --text: #2c3e50;
      --text-light: #7b8a8b;
      --border: #ecf0f1;
      --card-bg: #fff;
      --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.05);
      --radius: 12px;
      --transition: all 0.3s ease;
    }

    * {
      box-sizing: border-box;
    }

    body {
      background: #f8f9fa;
      color: var(--text);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .main-content {
      width: 100%;
      min-height: 100vh;
      transition: var(--transition);
      padding: 0.5rem;
      margin-left: 0;
    }

    .topbar {
      background: #fff;
      box-shadow: var(--shadow-light);
      border-radius: var(--radius);
      padding: 0.75rem;
      margin: 0 0 1rem;
      position: sticky;
      top: 0.5rem;
      z-index: 1020;
      width: 100%;
    }

    .topbar-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .mobile-menu-toggle {
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text);
      transition: var(--transition);
      padding: 0.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .desktop-menu-toggle {
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text);
      padding: 0.5rem;
      border-radius: 8px;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .user-area {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .notification-badge {
      position: relative;
      cursor: pointer;
    }

    .badge-counter {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #e74c3c;
      color: white;
      font-size: 0.6rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f8f9fa;
      transition: var(--transition);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 0.75rem;
      padding: 0;
      width: 100%;
    }

    .stat-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow-light);
      padding: 1rem;
      transition: var(--transition);
      border: 1px solid transparent;
      width: 100%;
    }

    .stat-title {
      font-size: 0.875rem;
      color: var(--text-light);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
    }

    .section-card,
    .shortcuts,
    .performance,
    .events {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow-light);
      padding: 1rem;
      margin: 0 0 1rem;
      width: 100%;
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-title i {
      color: var(--accent);
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin: 0;
      padding: 0;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }

    .courses-table {
      width: 100%;
      min-width: 600px;
      border-collapse: separate;
      border-spacing: 0;
    }

    .courses-table th {
      background: #f8f9fa;
      padding: 0.75rem 0.5rem;
      font-weight: 600;
      color: var(--text);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--border);
    }

    .courses-table td {
      padding: 0.75rem 0.5rem;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
      font-size: 0.85rem;
    }

    .badge {
      padding: 0.3rem 0.65rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .shortcut-btns {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .shortcut-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: var(--radius);
      color: var(--text-light);
      transition: var(--transition);
      cursor: pointer;
      text-decoration: none !important;
      border: none;
      width: 100%;
    }

    .shortcut-btn i {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .shortcut-btn span {
      font-weight: 500;
      font-size: 0.85rem;
    }

    .perf-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .perf-metric {
      text-align: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: var(--radius);
      transition: var(--transition);
    }

    .perf-metric .val {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .perf-metric .lbl {
      font-size: 0.85rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .perf-bar .row {
      margin-bottom: 0.75rem;
      align-items: center;
    }

    .perf-bar .bar {
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
    }

    .events ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .events ul li {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: var(--transition);
    }

    .event-title {
      font-weight: 500;
      color: var(--text);
      font-size: 0.9rem;
      flex: 1;
      margin-right: 0.5rem;
    }

    .event-date {
      background: #f8f9fa;
      color: var(--text);
      padding: 0.35rem 0.75rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      min-width: 80px;
      text-align: center;
      flex-shrink: 0;
    }

    .date-full {
      display: none;
    }
    
    .date-short {
      display: inline;
    }

    .sidebar {
      width: 280px;
      background: var(--sidebar-bg);
      color: #fff;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1030;
      transition: var(--transition);
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-header {
      padding: 1.5rem;
      background: var(--sidebar-head);
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-links {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
      flex-grow: 1;
    }

    .nav-links li {
      margin: 0.25rem 0.75rem;
    }

    .nav-links li a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      transition: var(--transition);
      border-radius: 8px;
      font-weight: 500;
    }

    .bottom-link {
      padding: 1rem;
      margin: 0;
      list-style: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bottom-link li a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      transition: var(--transition);
      border-radius: 8px;
      font-weight: 500;
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1029;
      backdrop-filter: blur(3px);
    }

    .sidebar-overlay.open {
      display: block;
    }

    @media (min-width: 576px) {
      .main-content {
        padding: 0 0.75rem;
      }
      
      .topbar {
        padding: 0.875rem 1rem;
        margin: 0 0 1.25rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin: 0 0 1.25rem;
      }
      
      .stat-card {
        padding: 1.25rem;
      }
      
      .stat-value {
        font-size: 1.75rem;
      }
      
      .section-card,
      .shortcuts,
      .performance,
      .events {
        padding: 1.25rem;
        margin: 0 0 1.25rem;
      }
      
      .section-title {
        font-size: 1.2rem;
        margin-bottom: 1.25rem;
      }
      
      .shortcut-btns {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.875rem;
      }
      
      .shortcut-btn {
        padding: 1.25rem;
      }
      
      .shortcut-btn i {
        font-size: 1.75rem;
      }
      
      .perf-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.875rem;
      }
      
      .perf-metric {
        padding: 1rem;
      }
      
      .perf-metric .val {
        font-size: 1.75rem;
      }
      
      .event-title {
        font-size: 0.95rem;
      }
      
      .event-date {
        font-size: 0.85rem;
        min-width: 90px;
        padding: 0.4rem 0.875rem;
      }
    }

    @media (min-width: 992px) {
      .mobile-menu-toggle {
        display: none !important;
      }
      
      .desktop-menu-toggle {
        display: flex !important;
      }
      
      .sidebar {
        transform: translateX(0);
        width: 250px;
      }
      
      .sidebar.collapsed {
        width: 70px;
      }
      
      .sidebar.collapsed .sidebar-header span {
        display: none;
      }
      
      .sidebar.collapsed .nav-links li a span {
        display: none;
      }
      
      .sidebar.collapsed .nav-links li a {
        justify-content: center;
        padding: 0.875rem;
      }
      
      .sidebar.collapsed .nav-links li a i {
        font-size: 1.2rem;
      }
      
      .sidebar-overlay {
        display: none !important;
      }
      
      .main-content {
        margin-left: 250px;
        width: calc(100vw - 250px);
        padding: 1rem 1.5rem;
      }
      
      .sidebar.collapsed ~ .main-content {
        margin-left: 70px;
        width: calc(100vw - 70px);
      }
      
      .topbar,
      .stats-grid,
      .section-card,
      .shortcuts,
      .performance,
      .events {
        width: 100%;
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
      }
      
      .topbar {
        padding: 1rem 1.5rem;
        margin: 0 0 1.5rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 0 0 1.5rem;
      }
      
      .user-avatar {
        width: 40px;
        height: 40px;
        border: 3px solid #f8f9fa;
      }
      
      .shortcut-btns {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
      }
      
      .perf-grid {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
      }
      
      .courses-table th,
      .courses-table td {
        padding: 0.875rem 0.75rem;
      }
      
      .courses-table td {
        font-size: 1rem;
      }
      
      .event-title {
        font-size: 1rem;
      }
      
      .date-full {
        display: inline;
      }
      
      .date-short {
        display: none;
      }
    }

    @media (min-width: 1200px) {
      .main-content {
        padding: 1rem 2rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .shortcut-btns {
        grid-template-columns: repeat(4, 1fr);
      }
      
      .perf-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (min-width: 1400px) {
      .main-content {
        padding: 1rem 2.5rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    @media (max-width: 400px) {
      .main-content {
        padding: 0 0.25rem;
      }
      
      .topbar {
        padding: 0.5rem;
        margin: 0 0 0.5rem;
      }
      
      .stats-grid,
      .section-card,
      .shortcuts,
      .performance,
      .events {
        padding: 0.75rem;
        margin: 0 0 0.5rem;
      }
      
      .stat-card {
        padding: 0.875rem;
      }
      
      .stat-value {
        font-size: 1.25rem;
      }
      
      .section-title {
        font-size: 1rem;
      }
      
      .event-date {
        min-width: 65px;
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
      }
    }

    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div
        className={`sidebar-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "open" : ""
        }`}
        id="sidebar"
      >
        <div className="sidebar-header">
          <span>Computer Dept Head</span>
        </div>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to} className={link.active ? "active" : ""}>
              <a
                href={link.to}
                onClick={() => window.innerWidth <= 992 && setMobileOpen(false)}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="bottom-link">
          <li>
            <a href="#" onClick={() => alert("Logging out...")}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="topbar-header">
              <div
                className="mobile-menu-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <i className="fas fa-bars"></i>
              </div>

              <div
                className="desktop-menu-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <i className="fas fa-bars"></i>
              </div>

              <h2 className="mb-0">
                <span className="d-none d-md-inline">Department Dashboard</span>
                <span className="d-inline d-md-none">Dashboard</span>
              </h2>
            </div>
            <div className="user-area">
              <div className="notification-badge position-relative">
                <i className="fas fa-bell fs-5"></i>
                <span className="badge-counter">3</span>
              </div>
              <i className="fas fa-calendar-alt d-none d-md-inline-block fs-5"></i>
              <i className="fas fa-envelope d-none d-md-inline-block fs-5"></i>
              <a href="/profile.head" className="d-inline-block">
                <img
                  src="https://i.pravatar.cc/300?img=12"
                  alt="User Avatar"
                  className="user-avatar"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="stats-grid fade-in">
          <div className="stat-card">
            <div className="stat-title">Total Teachers</div>
            <div className="stat-value">{stats.totalTeachers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Active Courses</div>
            <div className="stat-value">{stats.totalCourses}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Pending Approvals</div>
            <div className="stat-value">{stats.pendingTasks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Total Students</div>
            <div className="stat-value">{stats.totalStudents}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Active Students</div>
            <div className="stat-value">{stats.activeStudents}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Graduated Students</div>
            <div className="stat-value">{stats.graduatedStudents}</div>
          </div>
        </div>

        <div className="section-card fade-in">
          <div className="section-title">
            <i className="fas fa-book-open"></i>
            Courses Overview
          </div>
          <div className="table-wrapper">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Teacher</th>
                  <th>Students</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Web Development</td>
                  <td>Abdul</td>
                  <td>120</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <small className="text-muted ms-2">80%</small>
                  </td>
                </tr>
                <tr>
                  <td>Graphic Design Basics</td>
                  <td>Sana</td>
                  <td>65</td>
                  <td>
                    <span className="badge upcoming">Upcoming</span>
                  </td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>English Speaking</td>
                  <td>Javed</td>
                  <td>200</td>
                  <td>
                    <span className="badge completed">Completed</span>
                  </td>
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <small className="text-muted ms-2">100%</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="shortcuts fade-in">
          <div className="section-title">
            <i className="fas fa-bolt"></i>
            Quick Shortcuts
          </div>
          <div className="shortcut-btns">
            <button
              className="shortcut-btn"
              onClick={() => alert("Open New Course Form")}
            >
              <i className="fas fa-plus-circle"></i>
              <span>Create Course</span>
            </button>
            <button
              className="shortcut-btn"
              onClick={() => alert("Open Approval Queue")}
            >
              <i className="fas fa-clipboard-check"></i>
              <span>Approve Tasks</span>
            </button>
            <button
              className="shortcut-btn"
              onClick={() => alert("Generate Reports")}
            >
              <i className="fas fa-chart-pie"></i>
              <span>View Reports</span>
            </button>
            <button
              className="shortcut-btn"
              onClick={() => alert("Schedule Meeting")}
            >
              <i className="fas fa-calendar-plus"></i>
              <span>Schedule Meeting</span>
            </button>
          </div>
        </div>

        <div className="performance fade-in">
          <div className="section-title">
            <i className="fas fa-chart-line"></i>
            Performance Summary (Last 6 Months)
          </div>
          <div className="perf-grid">
            <div className="perf-metric">
              <div className="val">87%</div>
              <div className="lbl">Avg Attendance</div>
            </div>
            <div className="perf-metric">
              <div className="val">92%</div>
              <div className="lbl">Course Completion</div>
            </div>
            <div className="perf-metric">
              <div className="val">4.6</div>
              <div className="lbl">Feedback Score</div>
            </div>
            <div className="perf-metric">
              <div className="val">78%</div>
              <div className="lbl">Exam Pass Rate</div>
            </div>
          </div>
          <div className="perf-bar">
            {[
              "Month 1",
              "Month 2",
              "Month 3",
              "Month 4",
              "Month 5",
              "Month 6",
            ].map((month, index) => (
              <div className="row align-items-center mb-2" key={month}>
                <div className="col-4 col-md-2">
                  <small className="text-muted">{month}</small>
                </div>
                <div className="col-8 col-md-10">
                  <div className="bar">
                    <div style={{ width: `${65 + index * 5}%` }}></div>
                  </div>
                  <small className="text-muted float-end">
                    {65 + index * 5}%
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="events fade-in">
          <div className="section-title">
            <i className="fas fa-calendar-day"></i>
            Upcoming Events & Deadlines
          </div>
          <ul>
            {[
              {
                title: "Faculty Meeting",
                date: "12 Nov 2025",
                short: "12 Nov",
              },
              {
                title: "Submit Evaluation Reports",
                date: "15 Nov 2025",
                short: "15 Nov",
              },
              {
                title: "New Course Proposal Deadline",
                date: "20 Nov 2025",
                short: "20 Nov",
              },
              {
                title: "Workshop: Teaching Techniques",
                date: "25 Nov 2025",
                short: "25 Nov",
              },
              {
                title: "End of Semester Exams",
                date: "30 Nov 2025",
                short: "30 Nov",
              },
            ].map((event) => (
              <li key={event.title}>
                <span className="event-title">{event.title}</span>
                <span className="event-date">
                  <span className="date-full">{event.date}</span>
                  <span className="date-short">{event.short}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
