import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Analytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);
  const enrolmentChartRef = useRef(null);
  const popularityChartRef = useRef(null);

  // Get current page for active menu highlighting
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path.includes("dashboard") || path === "/") return "dashboard";
    if (path.includes("department")) return "departments";
    if (path.includes("course")) return "courses";
    if (path.includes("head")) return "heads";
    if (path.includes("teacher")) return "teachers";
    if (path.includes("student")) return "students";
    if (path.includes("assignment")) return "assignments";
    if (path.includes("grade")) return "grades";
    if (path.includes("certificate")) return "certificates";
    if (path.includes("announcement")) return "announcements";
    if (path.includes("analytic")) return "analytics";
    if (path.includes("report")) return "reports";
    if (path.includes("setting")) return "settings";
    return "dashboard";
  };

  const currentPage = getCurrentPage();

  // Toggle sidebar on desktop
  const handleDesktopToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle sidebar on mobile
  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) {
      setMobileMenuOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 992) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          mobileMenuToggleRef.current &&
          !mobileMenuToggleRef.current.contains(event.target)
        ) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Initialize charts
  useEffect(() => {
    let enrolmentChart, popularityChart;

    if (enrolmentChartRef.current) {
      enrolmentChart = new Chart(enrolmentChartRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
          ],
          datasets: [
            {
              label: "New Enrolments",
              data: [120, 190, 150, 210, 240, 220, 250, 280, 320, 310, 340],
              borderColor: "#1a237e",
              backgroundColor: "rgba(26, 35, 126, 0.08)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    if (popularityChartRef.current) {
      popularityChart = new Chart(popularityChartRef.current, {
        type: "doughnut",
        data: {
          labels: [
            "Computer Science",
            "Design",
            "Business",
            "Languages",
            "Mathematics",
          ],
          datasets: [
            {
              data: [38, 24, 18, 12, 8],
              backgroundColor: [
                "#1a237e",
                "#4caf50",
                "#ff9800",
                "#9c27b0",
                "#f44336",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
          },
        },
      });
    }

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (enrolmentChart) enrolmentChart.destroy();
      if (popularityChart) popularityChart.destroy();
    };
  }, []);

  const kpiCards = [
    {
      icon: "fas fa-user-graduate",
      title: "Avg. Course Completion",
      value: "87%",
    },
    {
      icon: "fas fa-clock",
      title: "Avg. Study Time / Week",
      value: "4h 12m",
    },
    {
      icon: "fas fa-star",
      title: "Overall Satisfaction",
      value: "4.8 / 5",
    },
  ];

  const topStudents = [
    { name: "Alice Nguyen", course: "Data Structures", grade: "98%" },
    { name: "Mike Johnson", course: "Marketing 101", grade: "96%" },
    { name: "Sara Ali", course: "Calculus II", grade: "95%" },
    { name: "John Smith", course: "Web Development", grade: "94%" },
    { name: "Emma Wilson", course: "UI/UX Design", grade: "93%" },
  ];

  return (
    <div className="manager-dashboard container-fluid p-0">
      {/* Mobile Menu Button */}
      <button
        ref={mobileMenuToggleRef}
        className="mobile-menu-btn d-lg-none"
        onClick={handleMobileToggle}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          mobileMenuOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li className={currentPage === "dashboard" ? "active" : ""}>
              <Link to="/" onClick={handleMenuItemClick}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={currentPage === "departments" ? "active" : ""}>
              <Link to="/departments" onClick={handleMenuItemClick}>
                <i className="fas fa-layer-group"></i>
                <span>Departments</span>
              </Link>
            </li>
            <li className={currentPage === "courses" ? "active" : ""}>
              <Link to="/courses" onClick={handleMenuItemClick}>
                <i className="fas fa-book"></i>
                <span>Courses</span>
              </Link>
            </li>
            <li className={currentPage === "heads" ? "active" : ""}>
              <Link to="/heads" onClick={handleMenuItemClick}>
                <i className="fas fa-chalkboard-teacher"></i>
                <span>Heads</span>
              </Link>
            </li>
            <li className={currentPage === "teachers" ? "active" : ""}>
              <Link to="/teachers" onClick={handleMenuItemClick}>
                <i className="fas fa-chalkboard-teacher"></i>
                <span>Teachers</span>
              </Link>
            </li>
            <li className={currentPage === "students" ? "active" : ""}>
              <Link to="/students" onClick={handleMenuItemClick}>
                <i className="fas fa-user-graduate"></i>
                <span>Students</span>
              </Link>
            </li>
            <li className={currentPage === "assignments" ? "active" : ""}>
              <Link to="/assignments" onClick={handleMenuItemClick}>
                <i className="fas fa-tasks"></i>
                <span>Assignments</span>
              </Link>
            </li>
            <li className={currentPage === "grades" ? "active" : ""}>
              <Link to="/grades" onClick={handleMenuItemClick}>
                <i className="fas fa-graduation-cap"></i>
                <span>Grades</span>
              </Link>
            </li>
            <li className={currentPage === "certificates" ? "active" : ""}>
              <Link to="/certificates" onClick={handleMenuItemClick}>
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </Link>
            </li>
            <li className={currentPage === "announcements" ? "active" : ""}>
              <Link to="/announcements" onClick={handleMenuItemClick}>
                <i className="fas fa-bullhorn"></i>
                <span>Announcements</span>
              </Link>
            </li>
            <li className={currentPage === "analytics" ? "active" : ""}>
              <Link to="/analytics" onClick={handleMenuItemClick}>
                <i className="fas fa-chart-pie"></i>
                <span>Analytics</span>
              </Link>
            </li>
            <li className={currentPage === "reports" ? "active" : ""}>
              <Link to="/reports" onClick={handleMenuItemClick}>
                <i className="fas fa-chart-line"></i>
                <span>Reports</span>
              </Link>
            </li>
            <li className={currentPage === "settings" ? "active" : ""}>
              <Link to="/settings" onClick={handleMenuItemClick}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick();
                  console.log("Logout clicked");
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
        <header className="topbar container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="topbar-left d-flex align-items-center">
                <div
                  className="icon d-none d-lg-flex"
                  onClick={handleDesktopToggle}
                >
                  <i className="fas fa-bars"></i>
                </div>
                <div className="welcome">
                  <h1 className="mb-1">Analytics Dashboard</h1>
                  <p className="d-none d-md-block mb-0">
                    Deep-dive metrics for <strong>Mr. Smith</strong> — all
                    numbers updated live.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-3 mt-lg-0">
              <div className="user-area d-flex justify-content-end align-items-center">
                <div className="icon me-2 position-relative">
                  <i className="fas fa-bell"></i>
                  <span
                    className="badge bg-danger"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      fontSize: "0.6rem",
                      padding: "2px 5px",
                    }}
                  >
                    3
                  </span>
                </div>
                <div className="icon me-2 d-none d-md-flex">
                  <i className="fas fa-envelope"></i>
                </div>
                <Link to="/profile" className="d-inline-block">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Manager Avatar"
                    className="user-avatar"
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="container-fluid content-area">
          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            {kpiCards.map((card, index) => (
              <div key={index} className="col-12 col-sm-6 col-xl-4">
                <div className="dashboard-card text-center">
                  <div className="card-icon">
                    <i className={card.icon}></i>
                  </div>
                  <div className="card-info">
                    <h3 className="fs-6 text-muted mb-2">{card.title}</h3>
                    <p className="fs-3 fw-bold mb-0">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-6">
              <section className="data-section">
                <h2 className="section-title">Monthly Enrolment Trend</h2>
                <div className="chart-container">
                  <canvas ref={enrolmentChartRef}></canvas>
                </div>
              </section>
            </div>
            <div className="col-12 col-lg-6">
              <section className="data-section">
                <h2 className="section-title">
                  Course Popularity (Current Semester)
                </h2>
                <div className="chart-container">
                  <canvas ref={popularityChartRef}></canvas>
                </div>
              </section>
            </div>
          </div>

          {/* Table Section */}
          <div className="row">
            <div className="col-12">
              <section className="data-section">
                <h2 className="section-title">Top Performing Students</h2>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th data-label="Student">Student</th>
                        <th data-label="Course">Course</th>
                        <th data-label="Grade" className="text-center">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topStudents.map((student, index) => (
                        <tr key={index}>
                          <td data-label="Student">{student.name}</td>
                          <td data-label="Course">{student.course}</td>
                          <td data-label="Grade" className="text-center">
                            <span className="badge bg-primary">
                              {student.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          display: flex;
          min-height: 100vh;
          background: #f4f7fb;
          color: #1e293b;
          transition: all 0.3s ease;
          overflow-x: hidden;
        }

        .manager-dashboard {
          display: flex;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }

        /* ========= SIDEBAR ========= */
        .sidebar {
          width: 240px;
          background: linear-gradient(180deg, #1a237e, #1a237e);
          color: #fff;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          transition: width 0.3s ease, transform 0.3s ease;
          overflow-y: auto;
          z-index: 1030;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          text-align: center;
          padding: 1.8rem;
          background: rgba(255, 255, 255, 0.1);
          font-size: 1.5rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
        }

        .menu-wrapper {
          flex: 1;
          overflow-y: auto;
          padding: 10px 0;
        }

        .menu {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .menu li a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #e2e8f0;
          text-decoration: none;
          transition: all 0.3s;
          border-left: 4px solid transparent;
          white-space: nowrap;
          overflow: hidden;
        }

        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: #38bdf8;
          color: #fff;
        }

        .sidebar.collapsed .menu li a span {
          display: none;
        }

        /* ========= MAIN CONTENT ========= */
        .main-content {
          margin-left: 240px;
          min-height: 100vh;
          transition: margin-left 0.3s ease;
          width: calc(100vw - 240px);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .main-content.collapsed {
          margin-left: 70px;
          width: calc(100vw - 70px);
        }

        /* ========= TOPBAR ========= */
        .topbar {
          padding: 1.2rem 1.5rem;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          width: 100%;
          margin: 0 0 20px 0;
          min-height: 80px;
        }

        .welcome h1 {
          font-size: 1.6rem;
          color: #1e293b;
          margin: 0;
          font-weight: 600;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .welcome p {
          font-size: 0.95rem;
          color: #64748b;
          margin: 5px 0 0 0;
          opacity: 0.8;
        }

        .icon {
          background: #eff6ff;
          color: #1a237e;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .icon:hover {
          background: #1a237e;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(26, 35, 126, 0.2);
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #1a237e;
          object-fit: cover;
          flex-shrink: 0;
        }

        /* ========= CONTENT AREA ========= */
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 15px 15px 15px;
        }

        /* ========= DASHBOARD CARDS ========= */
        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          text-align: center;
          border: 1px solid transparent;
          height: 100%;
        }

        .dashboard-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
          border-color: #1a237e;
        }

        .card-icon {
          background: linear-gradient(135deg, #1a237e, #1a237e);
          padding: 12px;
          border-radius: 10px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .card-icon i {
          font-size: 24px;
          color: #fff;
        }

        /* ========= DATA SECTION ========= */
        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .section-title {
          font-size: 1.2rem;
          color: #1a237e;
          margin: 0 0 20px 0;
          font-weight: 600;
        }

        /* ========= CHART CONTAINER ========= */
        .chart-container {
          position: relative;
          height: 300px;
          width: 100%;
          flex: 1;
        }

        /* ========= TABLE ========= */
        .table-responsive {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          font-size: 0.95rem;
        }

        th,
        td {
          padding: 16px 20px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          background: #f8fafc;
          color: #1a237e;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        tr {
          transition: background 0.2s;
        }

        tr:hover {
          background: #f9fafb;
        }

        /* ========= MOBILE MENU BUTTON ========= */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1040;
          background: #1a237e;
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .mobile-menu-btn:hover {
          background: #1a237e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* ========= CLEAN SCROLLBARS ========= */
        .sidebar::-webkit-scrollbar,
        .main-content::-webkit-scrollbar,
        .menu-wrapper::-webkit-scrollbar,
        .content-area::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .sidebar::-webkit-scrollbar-track,
        .main-content::-webkit-scrollbar-track,
        .menu-wrapper::-webkit-scrollbar-track,
        .content-area::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb,
        .main-content::-webkit-scrollbar-thumb,
        .menu-wrapper::-webkit-scrollbar-thumb,
        .content-area::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover,
        .main-content::-webkit-scrollbar-thumb:hover,
        .menu-wrapper::-webkit-scrollbar-thumb:hover,
        .content-area::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Firefox scrollbar */
        .sidebar,
        .main-content,
        .menu-wrapper,
        .content-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }

        /* ========= RESPONSIVE BREAKPOINTS ========= */
        /* Tablet (≤ 992px) */
        @media (max-width: 992px) {
          .sidebar {
            transform: translateX(-100%);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding: 15px;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .topbar {
            margin: 15px 15px 20px 15px;
            width: calc(100% - 30px);
          }

          .container-fluid {
            padding-left: 15px;
            padding-right: 15px;
          }

          /* Adjust chart legend position for tablet */
          .chart-container canvas {
            max-height: 280px;
          }
        }

        /* Tablet (≤ 768px) */
        @media (max-width: 768px) {
          .topbar {
            padding: 1rem;
            min-height: 70px;
            margin: 12px 12px 15px 12px;
            width: calc(100% - 24px);
          }

          .welcome h1 {
            font-size: 1.4rem;
          }

          .welcome p {
            font-size: 0.85rem;
          }

          .user-area {
            gap: 0.8rem;
          }

          .icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .user-avatar {
            width: 40px;
            height: 40px;
          }

          .mobile-menu-btn {
            top: 15px;
            left: 15px;
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .dashboard-card {
            padding: 18px;
          }

          .data-section {
            padding: 18px;
          }

          .chart-container {
            height: 250px;
          }

          th,
          td {
            padding: 12px 14px;
            font-size: 0.85rem;
          }
        }

        /* Mobile (≤ 576px) */
        @media (max-width: 576px) {
          .topbar {
            padding: 0.8rem;
            min-height: 65px;
            margin: 10px 8px 15px 8px;
            width: calc(100% - 16px);
          }

          .topbar-left {
            gap: 0.8rem;
          }

          .welcome h1 {
            font-size: 1.2rem;
          }

          .welcome p {
            display: none;
          }

          .icon {
            width: 36px;
            height: 36px;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
          }

          .user-area {
            justify-content: flex-end;
          }

          .mobile-menu-btn {
            top: 12px;
            left: 12px;
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .dashboard-card {
            padding: 16px;
          }

          .dashboard-card h3 {
            font-size: 15px;
          }

          .dashboard-card p {
            font-size: 24px;
          }

          .data-section {
            padding: 16px;
            margin-bottom: 15px;
          }

          .chart-container {
            height: 220px;
          }

          .section-title {
            font-size: 1.1rem;
            margin-bottom: 15px;
          }

          /* Responsive table for mobile */
          @media (max-width: 576px) {
            .table-responsive {
              overflow-x: auto;
            }

            table {
              display: block;
              min-width: 100%;
            }

            thead {
              display: none;
            }

            tr {
              display: block;
              margin-bottom: 10px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 10px;
              background: #fff;
            }

            td {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 6px 8px;
              border-bottom: 1px solid #f1f5f9;
              text-align: right;
              white-space: normal;
            }

            td:last-child {
              border-bottom: none;
              justify-content: center;
              padding-top: 10px;
            }

            td::before {
              content: attr(data-label);
              font-weight: 600;
              color: #1a237e;
              margin-right: 8px;
              text-align: left;
              flex: 1;
              font-size: 13px;
            }
          }
        }

        /* Extra Small Mobile (≤ 400px) */
        @media (max-width: 400px) {
          .topbar {
            padding: 0.7rem;
            min-height: 60px;
            margin: 8px 6px 12px 6px;
            width: calc(100% - 12px);
          }

          .topbar-left {
            gap: 0.6rem;
          }

          .welcome h1 {
            font-size: 1.1rem;
          }

          .user-avatar {
            width: 34px;
            height: 34px;
          }

          .mobile-menu-btn {
            top: 10px;
            left: 10px;
            width: 34px;
            height: 34px;
            font-size: 15px;
          }

          .dashboard-card {
            padding: 14px;
          }

          .data-section {
            padding: 14px;
          }

          .chart-container {
            height: 200px;
          }

          td {
            padding: 5px 6px;
            font-size: 12px;
          }

          td::before {
            font-size: 12px;
            margin-right: 5px;
          }
        }

        /* Very Small Mobile (≤ 320px) */
        @media (max-width: 320px) {
          .topbar {
            margin: 6px 5px 10px 5px;
            width: calc(100% - 10px);
            padding: 0.6rem;
          }

          .mobile-menu-btn {
            top: 8px;
            left: 8px;
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .dashboard-card {
            padding: 12px;
          }

          .data-section {
            padding: 12px;
          }

          .chart-container {
            height: 180px;
          }

          td {
            padding: 4px 5px;
            font-size: 11px;
          }

          td::before {
            font-size: 11px;
            margin-right: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
