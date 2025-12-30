import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ManagerDashboard = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/dashboard" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/head" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    { icon: "fas fa-certificate", label: "Certificates", link: "/certificate" },
    { icon: "fas fa-chart-line", label: "Announcement", link: "/announcement" },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytic" },
    { icon: "fas fa-chart-line", label: "Reports", link: "/reports" },
    { icon: "fas fa-cog", label: "Settings", link: "/settings" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];
  const kpiData = [
    { icon: "fas fa-building-columns", label: "Departments", value: "6" },
    { icon: "fas fa-book", label: "Total Courses", value: "28" },
    {
      icon: "fas fa-person-chalkboard",
      label: "Teacher-Led Courses",
      value: "18",
    },
    { icon: "fas fa-laptop", label: "Self-Paced Courses", value: "10" },
    { icon: "fas fa-user-tie", label: "Total Teachers", value: "25" },
    { icon: "fas fa-user-plus", label: "New Teacher Requests", value: "3" },
    { icon: "fas fa-user-graduate", label: "Total Students", value: "820" },
    { icon: "fas fa-user-clock", label: "New Student Requests", value: "12" },
  ];

  const departmentData = [
    {
      name: "Computer Science",
      courses: 8,
      teachers: 7,
      students: 230,
      teacherRequests: 1,
      studentRequests: 4,
    },
    {
      name: "Design",
      courses: 5,
      teachers: 4,
      students: 160,
      teacherRequests: 0,
      studentRequests: 3,
    },
    {
      name: "Business",
      courses: 4,
      teachers: 5,
      students: 140,
      teacherRequests: 1,
      studentRequests: 2,
    },
    {
      name: "Mathematics",
      courses: 3,
      teachers: 3,
      students: 120,
      teacherRequests: 1,
      studentRequests: 0,
    },
    {
      name: "Languages",
      courses: 4,
      teachers: 4,
      students: 170,
      teacherRequests: 0,
      studentRequests: 3,
    },
  ];

  const pendingRequests = [
    {
      name: "Dr. Laura James",
      role: "Teacher",
      department: "Computer Science",
      date: "Nov 8, 2025",
    },
    {
      name: "Mark Liu",
      role: "Student",
      department: "Design",
      date: "Nov 9, 2025",
    },
    {
      name: "Sarah Green",
      role: "Student",
      department: "Business",
      date: "Nov 9, 2025",
    },
    {
      name: "James Patel",
      role: "Teacher",
      department: "Mathematics",
      date: "Nov 10, 2025",
    },
  ];

  const upcomingEvents = [
    { title: "Orientation Session", date: "12 Nov 2025" },
    { title: "Department Meeting", date: "15 Nov 2025" },
    { title: "Workshop: Online Teaching", date: "20 Nov 2025" },
    { title: "Certificate Distribution", date: "25 Nov 2025" },
  ];

  // --------------  SIDEBAR TOGGLE LOGIC --------------
  const toggleDesktopSidebar = () => setSidebarCollapsed((s) => !s);
  const toggleMobileSidebar = () => setSidebarOpen((s) => !s);

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.querySelector(".sidebar");
        const mobileBtn = document.querySelector(".mobile-menu-btn");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          mobileBtn &&
          !mobileBtn.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // --------------  RENDER --------------
  return (
    <div className="manager-dashboard">
      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.link}
              className={location.pathname === item.link ? "active" : ""}
            >
              <Link to={item.link} onClick={handleMenuItemClick}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="icon menu-toggle" onClick={toggleDesktopSidebar}>
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h1 className="h5 mb-0 fw-bold">Manager Dashboard</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Welcome back, <strong>Mr. Smith</strong> — today's academy
                summary at a glance.
              </p>
            </div>
          </div>

          <div className="user-area">
            <div className="icon position-relative">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>
            <div className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </div>
            <Link to="/settings" className="user-avatar-link">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Manager Avatar"
                className="user-avatar"
              />
            </Link>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="content-area">
          <div className="kpi-grid">
            {kpiData.map((item, idx) => (
              <div key={idx} className="dashboard-card">
                <div className="card-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">{item.label}</h3>
                  <p className="card-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Department Overview */}
          <div className="data-section">
            <h2 className="section-title">Department Overview</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th className="text-center">Total Courses</th>
                    <th className="text-center">Teachers</th>
                    <th className="text-center">Students</th>
                    <th className="text-center">New Requests</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td className="text-center">{d.courses}</td>
                      <td className="text-center">{d.teachers}</td>
                      <td className="text-center">{d.students}</td>
                      <td className="text-center">
                        {d.teacherRequests > 0 && (
                          <span className="status-badge status-teacher">
                            {d.teacherRequests} Teacher
                            {d.teacherRequests > 1 ? "s" : ""}
                          </span>
                        )}
                        {d.studentRequests > 0 && (
                          <span className="status-badge status-student">
                            {d.studentRequests} Student
                            {d.studentRequests > 1 ? "s" : ""}
                          </span>
                        )}
                        {d.teacherRequests === 0 && d.studentRequests === 0 && (
                          <span className="text-muted">No requests</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="data-section">
            <h2 className="section-title">Pending Join Requests</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="text-center">Role</th>
                    <th>Requested Department</th>
                    <th className="text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td className="text-center">
                        <span
                          className={`status-badge ${
                            r.role === "Teacher"
                              ? "status-teacher"
                              : "status-student"
                          }`}
                        >
                          {r.role}
                        </span>
                      </td>
                      <td>{r.department}</td>
                      <td className="text-center">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="data-section">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map((e, i) => (
                <div key={i} className="event-item">
                  <span className="event-title">{e.title}</span>
                  <span className="event-date">{e.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        :root {
          --primary-color: #1a237e;
          --secondary-color: #38bdf8;
          --light-bg: #f4f7fb;
          --dark-text: #1e293b;
          --gray-text: #64748b;
          --card-bg: #ffffff;
          --shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          --radius: 10px;
        }
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: var(--light-bg);
          color: var(--dark-text);
          overflow-x: hidden;
        }

        /* ----------  SIDEBAR  ---------- */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, var(--primary-color), #1a237e);
          color: #fff;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1030;
          transition: width 0.3s, transform 0.3s;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .sidebar::-webkit-scrollbar {
          display: none;
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar-header {
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 1.4rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 60px;
          transition: all 0.3s;
        }
        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          padding: 1.2rem 0;
        }
        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .menu li a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.5rem;
          color: #e2e8f0;
          text-decoration: none;
          transition: all 0.3s;
          border-left: 4px solid transparent;
          white-space: nowrap;
        }
        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: var(--secondary-color);
          color: #fff;
        }
        .sidebar.collapsed .menu li a {
          padding: 0.9rem;
          justify-content: center;
        }
        .sidebar.collapsed .menu li a span {
          display: none;
        }

        .main-content {
          margin-left: 260px;
          min-height: 100vh;
          transition: margin-left 0.3s;
          padding: 20px;
          width: calc(100vw - 260px);
          box-sizing: border-box;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .main-content::-webkit-scrollbar {
          display: none;
        }
        .sidebar.collapsed ~ .main-content {
          margin-left: 70px;
          width: calc(100vw - 70px);
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1040;
          background: var(--primary-color);
          color: #fff;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* ----------  TOPBAR  ---------- */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          min-height: 60px;
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 1.5rem;
          width: 100%;
          box-sizing: border-box;
          gap: 15px;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }
        .welcome {
          min-width: 0;
        }
        .welcome h1 {
          font-size: 1.4rem;
          color: var(--dark-text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .welcome p {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 2px 0 0;
        }
        .icon {
          background: #eff6ff;
          color: var(--primary-color);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .icon:hover {
          background: var(--primary-color);
          color: #fff;
        }
        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary-color);
          object-fit: cover;
          flex-shrink: 0;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .dashboard-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .card-icon {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--primary-color)
          );
          padding: 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .card-icon i {
          font-size: 24px;
          color: #fff;
        }
        .card-label {
          font-size: 14px;
          color: var(--gray-text);
          margin: 0 0 4px;
          font-weight: 500;
        }
        .card-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark-text);
          margin: 0;
          line-height: 1;
        }

        /* ----------  DATA SECTIONS  ---------- */
        .data-section {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: var(--shadow);
          width: 100%;
          box-sizing: border-box;
        }
        .section-title {
          font-size: 18px;
          color: var(--dark-text);
          margin: 0 0 15px;
          font-weight: 600;
        }
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        .table th,
        .table td {
          padding: 12px 16px;
          text-align: left;
          font-size: 14px;
          white-space: nowrap;
        }
        .table th {
          background: #f8fafc;
          font-weight: 600;
          color: var(--dark-text);
          border-bottom: 2px solid #e2e8f0;
        }
        .table td {
          border-bottom: 1px solid #e2e8f0;
          color: var(--gray-text);
        }
        .table tbody tr:hover {
          background-color: #f9fafb;
        }
        .table tbody tr:last-child td {
          border-bottom: none;
        }
        .text-center {
          text-align: center !important;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
          margin: 2px;
        }
        .status-teacher {
          background: #d1fae5;
          color: #065f46;
        }
        .status-student {
          background: #dbeafe;
          color: #1e40af;
        }

        /* ----------  EVENTS LIST  ---------- */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .event-item:last-child {
          border-bottom: none;
        }
        .event-title {
          font-size: 14px;
          color: var(--dark-text);
          font-weight: 500;
        }
        .event-date {
          font-size: 13px;
          color: var(--primary-color);
          background: #eff6ff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 500;
        }

        @media (max-width: 1199.98px) {
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 991.98px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            margin-left: 0 !important;
            width: 100vw !important;
            padding: 15px;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .topbar {
            margin-top: 55px;
            padding: 1rem;
            gap: 10px;
          }
          .topbar-left {
            gap: 0.75rem;
          }
          .welcome h1 {
            font-size: 1.2rem;
          }
          .icon {
            width: 36px;
            height: 36px;
          }
          .user-avatar {
            width: 36px;
            height: 36px;
          }
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 15px;
          }
        }

        @media (max-width: 767.98px) {
          .main-content {
            padding: 12px;
          }
          .topbar {
            padding: 0.8rem;
            margin-top: 50px;
            min-height: 55px;
          }
          .welcome h1 {
            font-size: 1.1rem;
            max-width: 180px;
          }
          .icon {
            width: 34px;
            height: 34px;
          }
          .user-avatar {
            width: 34px;
            height: 34px;
          }
          .mobile-menu-btn {
            width: 36px;
            height: 36px;
            font-size: 16px;
            top: 12px;
            left: 12px;
          }
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }
          .dashboard-card {
            padding: 16px;
          }
          .card-icon {
            padding: 10px;
          }
          .card-icon i {
            font-size: 20px;
          }
          .card-value {
            font-size: 24px;
          }
          .data-section {
            padding: 16px;
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
          }
          .table th,
          .table td {
            padding: 10px 12px;
            font-size: 13px;
          }
        }

        /* Extra small devices (portrait phones, less than 576px) */
        @media (max-width: 575.98px) {
          .topbar {
            flex-wrap: wrap;
            padding: 0.75rem;
            margin-top: 50px;
            gap: 8px;
          }
          .topbar-left {
            width: 100%;
            justify-content: space-between;
          }
          .welcome {
            flex: 1;
            min-width: 0;
          }
          .welcome h1 {
            font-size: 1rem;
            max-width: 160px;
          }
          .welcome p {
            font-size: 0.75rem;
          }
          .user-area {
            width: 100%;
            justify-content: flex-end;
          }
          .mobile-menu-btn {
            width: 34px;
            height: 34px;
            font-size: 15px;
            top: 10px;
            left: 10px;
          }
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .dashboard-card {
            padding: 14px;
            gap: 8px;
          }
          .card-label {
            font-size: 12px;
          }
          .card-value {
            font-size: 20px;
          }
          .data-section {
            padding: 14px;
          }
          .section-title {
            font-size: 15px;
            margin-bottom: 12px;
          }
          .table th,
          .table td {
            padding: 8px 10px;
            font-size: 12px;
          }
          .status-badge {
            font-size: 11px;
            padding: 3px 8px;
          }
          .event-title {
            font-size: 13px;
          }
          .event-date {
            font-size: 12px;
            padding: 3px 8px;
          }
        }

        /* Extra extra small devices (less than 375px) */
        @media (max-width: 374.98px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          .topbar {
            padding: 0.6rem;
          }
          .welcome h1 {
            font-size: 0.9rem;
            max-width: 120px;
          }
          .icon {
            width: 32px;
            height: 32px;
          }
          .user-avatar {
            width: 32px;
            height: 32px;
          }
          .mobile-menu-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;
