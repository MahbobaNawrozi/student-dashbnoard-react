import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ManagerDashboard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Complete menuItems array
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

  // Complete kpiData array
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

  // Complete departmentData array
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

  // Complete pendingRequests array
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

  // Complete upcomingEvents array
  const upcomingEvents = [
    { title: "Orientation Session", date: "12 Nov 2025" },
    { title: "Department Meeting", date: "15 Nov 2025" },
    { title: "Workshop: Online Teaching", date: "20 Nov 2025" },
    { title: "Certificate Distribution", date: "25 Nov 2025" },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

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

  return (
    <>
      <style>{`
        :root {
          --sidebar-bg: #1a237e;
          --sidebar-head: #1a237e;
          --accent: #1a237e;
          --text: #333;
          --text-light: #555;
          --border: #eee;
          --card-bg: #fff;
          --shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
          --radius: 8px;
          --light-bg: #f5f6fa;
          --dark-text: #1e293b;
          --gray-text: #64748b;
          --primary-color: #1a237e;
          --secondary-color: #38bdf8;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          background: var(--light-bg);
          color: var(--text);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
          width: 100%;
        }
        
        /* ========== MAIN CONTAINER ========== */
        .manager-dashboard {
          min-height: 100vh;
          background: var(--light-bg);
          position: relative;
        }
        
        /* ========== MOBILE FIRST STYLES ========== */
        /* Main Content - Mobile First */
        .main-content {
          width: 100%;
          min-height: 100vh;
          transition: all 0.3s;
          padding: 0.5rem;
          margin-left: 0;
          background: var(--light-bg);
        }
        
        /* Topbar - Mobile First */
        .topbar {
          background: #fff;
          box-shadow: var(--shadow);
          border-radius: var(--radius);
          padding: 0.75rem;
          margin: 0 0 1rem 0;
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
        
        .welcome h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: var(--dark-text);
        }
        
        .welcome p {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0.25rem 0 0 0;
          display: none;
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
        
        .avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f8f9fa;
        }

        /* Content Area - Mobile First */
        .content-area {
          width: 100%;
          padding: 0;
          background: transparent;
        }

        /* KPI Grid - Mobile First */
        .kpi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
        }
        
        .dashboard-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          box-shadow: var(--shadow);
          transition: transform 0.2s;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          background: linear-gradient(135deg, var(--primary-color), #1a237e);
          padding: 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
        }
        
        .card-icon i {
          font-size: 20px;
          color: #fff;
        }
        
        .card-label {
          font-size: 13px;
          color: var(--gray-text);
          margin: 0 0 4px;
          font-weight: 500;
        }
        
        .card-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark-text);
          margin: 0;
          line-height: 1;
        }

        /* Data Sections - Mobile First */
        .data-section {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          margin: 0 0 1.5rem 0;
          box-shadow: var(--shadow);
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
          font-size: 16px;
          color: var(--dark-text);
          margin: 0 0 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-title i {
          color: var(--primary-color);
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          -webkit-overflow-scrolling: touch;
          background: #fff;
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          background: #fff;
        }
        
        .table th,
        .table td {
          padding: 0.75rem 0.5rem;
          text-align: left;
          font-size: 13px;
          background: #fff;
        }
        
        .table th {
          background: #f8fafc;
          font-weight: 600;
          color: var(--dark-text);
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }
        
        .table td {
          border-bottom: 1px solid #e2e8f0;
          color: var(--gray-text);
          vertical-align: middle;
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
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
        }
        
        .status-teacher {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-student {
          background: #dbeafe;
          color: #1e40af;
        }

        /* Events List - Mobile First */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .event-item:last-child {
          border-bottom: none;
        }
        
        .event-title {
          font-size: 13px;
          color: var(--dark-text);
          font-weight: 500;
        }
        
        .event-date {
          font-size: 12px;
          color: var(--primary-color);
          background: #eff6ff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Sidebar - Mobile First (hidden by default) */
        .sidebar {
          width: 280px;
          background: var(--sidebar-bg);
          color: #fff;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1030;
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
          transform: translateX(-100%);
          overflow: hidden;
        }
        
        .sidebar.open {
          transform: translateX(0);
        }
        
        .sidebar-header {
          padding: 1.25rem;
          background: var(--sidebar-head);
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        
        .nav-links {
          list-style: none;
          padding: 1rem 0;
          margin: 0;
          flex-grow: 1;
          overflow-y: auto;
          overflow-x: hidden;
          height: calc(100vh - 70px);
        }
        
        .nav-links::-webkit-scrollbar {
          width: 4px;
        }
        
        .nav-links::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-links::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        .nav-links li {
          margin: 0.25rem 0.75rem;
        }
        
        .nav-links li a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: all 0.3s;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
        }
        
        .nav-links li.active a,
        .nav-links li a:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        /* Sidebar Overlay */
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

        /* ========== SMALL TABLET (≥576px) ========== */
        @media (min-width: 576px) {
          .main-content {
            padding: 0.75rem;
          }
          
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .welcome p {
            display: block;
          }
          
          .card-icon {
            width: 56px;
            height: 56px;
          }
          
          .card-icon i {
            font-size: 24px;
          }
          
          .card-label {
            font-size: 14px;
          }
          
          .card-value {
            font-size: 28px;
          }
          
          .data-section {
            padding: 1.25rem;
          }
          
          .section-title {
            font-size: 18px;
          }
          
          .table th,
          .table td {
            padding: 0.75rem;
            font-size: 14px;
          }
          
          .status-badge {
            padding: 4px 10px;
            font-size: 12px;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .event-title {
            font-size: 14px;
          }
          
          .event-date {
            font-size: 13px;
          }
        }

        /* ========== DESKTOP (≥992px) ========== */
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
          
          .topbar {
            padding: 1rem 1.5rem;
            margin: 0 0 1.5rem 0;
          }
          
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.5rem;
            margin: 0 0 2rem 0;
          }
          
          .avatar-img {
            width: 40px;
            height: 40px;
            border: 3px solid #f8f9fa;
          }
          
          .welcome p {
            font-size: 0.9rem;
          }
        }

        /* ========== LARGE DESKTOP (≥1200px) ========== */
        @media (min-width: 1200px) {
          .main-content {
            padding: 1rem 2rem;
          }
          
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .content-area {
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .data-section {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 20px;
            margin: 0 0 1.25rem;
          }
        }

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .main-content {
            padding: 1.5rem 3rem;
          }
        }

        /* ========== EXTRA SMALL MOBILE (≤400px) ========== */
        @media (max-width: 400px) {
          .main-content {
            padding: 0.25rem;
          }
          
          .topbar {
            padding: 0.5rem;
            margin: 0 0 0.75rem 0;
          }
          
          .user-area i.fa-calendar-alt,
          .user-area i.fa-envelope {
            display: none !important;
          }
          
          .kpi-grid {
            gap: 0.5rem;
          }
          
          .dashboard-card {
            padding: 0.75rem;
            gap: 8px;
          }
          
          .card-icon {
            padding: 8px;
            width: 40px;
            height: 40px;
          }
          
          .card-icon i {
            font-size: 16px;
          }
          
          .card-value {
            font-size: 20px;
          }
          
          .card-label {
            font-size: 12px;
          }
          
          .data-section {
            padding: 0.75rem;
          }
          
          .section-title {
            font-size: 15px;
          }
          
          .table th,
          .table td {
            padding: 0.5rem 0.5rem;
            font-size: 12px;
          }
          
          .event-title {
            font-size: 12px;
          }
          
          .event-date {
            font-size: 11px;
            padding: 3px 8px;
          }
        }

        /* ========== VERY SMALL MOBILE (≤350px) ========== */
        @media (max-width: 350px) {
          .dashboard-card {
            flex-direction: row;
            text-align: left;
            align-items: center;
            gap: 0.75rem;
          }
          
          .card-icon {
            flex-shrink: 0;
          }
          
          .card-info {
            flex: 1;
            min-width: 0;
          }
          
          .card-label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .topbar-header h2 {
            font-size: 1rem;
          }
          
          .avatar-img {
            width: 32px;
            height: 32px;
          }
        }
        
        /* Animation */
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="manager-dashboard">
        {/* Overlay for mobile sidebar */}
        <div
          className={`sidebar-overlay ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`sidebar ${collapsed ? "collapsed" : ""} ${
            mobileOpen ? "open" : ""
          }`}
          id="sidebar"
        >
          <div className="sidebar-header">
            <span>E-Learn</span>
          </div>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link
                  to={item.link}
                  onClick={() =>
                    window.innerWidth <= 992 && setMobileOpen(false)
                  }
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Topbar */}
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

                <div className="welcome">
                  <h2 className="mb-0">
                    <span className="d-none d-sm-inline">
                      Manager Dashboard
                    </span>
                    <span className="d-inline d-sm-none">Dashboard</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Welcome back, <strong>Mr. Smith</strong> — today's academy
                    summary at a glance.
                  </p>
                </div>
              </div>
              <div className="user-area">
                <div className="notification-badge position-relative">
                  <i className="fas fa-bell fs-5"></i>
                  <span className="badge-counter">3</span>
                </div>
                <i className="fas fa-calendar-alt d-none d-md-inline-block fs-5"></i>
                <i className="fas fa-envelope d-none d-md-inline-block fs-5"></i>
                <Link to="/settings" className="d-inline-block">
                  <img
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Manager Avatar"
                    className="avatar-img"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="content-area">
            {/* KPI Cards */}
            <div className="kpi-grid">
              {kpiData.map((item, idx) => (
                <div key={idx} className="dashboard-card fade-in">
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
            <div className="data-section fade-in">
              <h2 className="section-title">
                <i className="fas fa-building-columns"></i>
                Department Overview
              </h2>
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
                          {d.teacherRequests === 0 &&
                            d.studentRequests === 0 && (
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
            <div className="data-section fade-in">
              <h2 className="section-title">
                <i className="fas fa-user-clock"></i>
                Pending Join Requests
              </h2>
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
            <div className="data-section fade-in">
              <h2 className="section-title">
                <i className="fas fa-calendar-day"></i>
                Upcoming Events
              </h2>
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
      </div>
    </>
  );
};

export default ManagerDashboard;
