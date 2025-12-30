import React, { useState, useEffect } from "react";

const HeadDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [departments, setDepartments] = useState([
    {
      name: "Computer Science",
      head: "Dr. Alice Johnson",
      courses: 18,
      students: 620,
      pending: 3,
      performance: "Excellent",
    },
    {
      name: "Electrical Engineering",
      head: "Dr. Ryan Patel",
      courses: 15,
      students: 540,
      pending: 2,
      performance: "Good",
    },
    {
      name: "Business Administration",
      head: "Dr. Susan Torres",
      courses: 12,
      students: 710,
      pending: 5,
      performance: "Good",
    },
    {
      name: "Mechanical Engineering",
      head: "Dr. David Kim",
      courses: 10,
      students: 480,
      pending: 1,
      performance: "Average",
    },
    {
      name: "Information Technology",
      head: "Dr. Maria Gomez",
      courses: 16,
      students: 590,
      pending: 4,
      performance: "Excellent",
    },
    {
      name: "Design & Architecture",
      head: "Prof. Emma Brown",
      courses: 8,
      students: 320,
      pending: 0,
      performance: "Good",
    },
    {
      name: "Mathematics",
      head: "Dr. John Park",
      courses: 9,
      students: 410,
      pending: 1,
      performance: "Average",
    },
    {
      name: "Physics",
      head: "Dr. Carol Lee",
      courses: 7,
      students: 280,
      pending: 2,
      performance: "Poor",
    },
  ]);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");

  // KPI calculations
  const totalDepartments = departments.length;
  const totalCourses = departments.reduce((sum, dept) => sum + dept.courses, 0);
  const totalStudents = departments.reduce(
    (sum, dept) => sum + dept.students,
    0
  );
  const totalPending = departments.reduce((sum, dept) => sum + dept.pending, 0);

  // Filter departments based on search
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menu items
  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "index.html" },
    {
      icon: "fas fa-layer-group",
      label: "Departments",
      link: "departments.html",
    },
    { icon: "fas fa-book", label: "Courses", link: "courses.html" },
    {
      icon: "fas fa-chalkboard-teacher",
      label: "Heads",
      link: "head.html",
      active: true,
    },
    {
      icon: "fas fa-chalkboard-teacher",
      label: "Teachers",
      link: "teachers.html",
    },
    { icon: "fas fa-user-graduate", label: "Students", link: "students.html" },
    { icon: "fas fa-tasks", label: "Assignments", link: "assignments.html" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "grades.html" },
    {
      icon: "fas fa-chart-line",
      label: "Announcement",
      link: "announcement.html",
    },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "certificate.html",
    },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "analytics.html" },
    { icon: "fas fa-chart-line", label: "Reports", link: "reports.html" },
    { icon: "fas fa-cog", label: "Settings", link: "setting.html" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  // Action handlers
  const handleViewDepartment = (index) => {
    const dept = filteredDepartments[index];
    alert(
      `Department: ${dept.name}\nHead: ${dept.head}\nCourses: ${dept.courses}\nStudents: ${dept.students}\nPending Approvals: ${dept.pending}\nPerformance: ${dept.performance}`
    );
  };

  const handleEditDepartment = (index) => {
    const dept = filteredDepartments[index];
    if (window.confirm(`Edit ${dept.name} department?`)) {
      const newName = prompt("Enter new department name:", dept.name);
      if (newName) {
        const updatedDepartments = [...departments];
        const originalIndex = departments.findIndex(
          (d) => d.name === dept.name
        );
        if (originalIndex !== -1) {
          updatedDepartments[originalIndex] = {
            ...updatedDepartments[originalIndex],
            name: newName,
          };
          setDepartments(updatedDepartments);
        }
      }
    }
  };

  const handleDeleteDepartment = (index) => {
    const dept = filteredDepartments[index];
    if (window.confirm(`Are you sure you want to delete ${dept.name}?`)) {
      const updatedDepartments = departments.filter(
        (d) => d.name !== dept.name
      );
      setDepartments(updatedDepartments);
    }
  };

  const handleAddDepartment = () => {
    alert("Add Department form would open here in a real application.");
  };

  const handleExportData = () => {
    alert("Export functionality would download a CSV/Excel file.");
  };

  // Sidebar toggle handlers
  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (mobile)
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

  // Initialize table layout
  useEffect(() => {
    const convertTableForMobile = () => {
      const table = document.getElementById("deptTableMain");
      if (table) {
        if (window.innerWidth <= 768) {
          table.classList.add("stack-table");
        } else {
          table.classList.remove("stack-table");
        }
      }
    };

    convertTableForMobile();
    window.addEventListener("resize", convertTableForMobile);

    return () => window.removeEventListener("resize", convertTableForMobile);
  }, []);

  return (
    <div className="head-dashboard">
      {/* Mobile Menu Button */}
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
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? "active" : ""}>
              <a href={item.link} onClick={handleMenuItemClick}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
        <header className="topbar d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="icon me-3" onClick={toggleDesktopSidebar}>
              <i className="fas fa-bars"></i>
            </div>
            <div>
              <h1 className="h5 mb-0 fw-bold">Department Overview</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Head Dashboard — quick insights at a glance.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center user-area">
            <div className="icon position-relative me-2">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>
            <div className="icon me-2 d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </div>
            <a href="managerProfile.html" className="d-inline-block">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Manager Avatar"
                className="user-avatar"
              />
            </a>
          </div>
        </header>

        {/* Content Container */}
        <div className="container-fluid px-3">
          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="dashboard-card text-center">
                <i className="fas fa-building text-primary mb-2"></i>
                <h3 className="fs-6 text-muted mb-2">Total Departments</h3>
                <p className="fs-3 fw-bold mb-0">{totalDepartments}</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="dashboard-card text-center">
                <i className="fas fa-book-open text-primary mb-2"></i>
                <h3 className="fs-6 text-muted mb-2">Total Courses</h3>
                <p className="fs-3 fw-bold mb-0">{totalCourses}</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="dashboard-card text-center">
                <i className="fas fa-user-graduate text-primary mb-2"></i>
                <h3 className="fs-6 text-muted mb-2">Active Students</h3>
                <p className="fs-3 fw-bold mb-0">{totalStudents}</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="dashboard-card text-center">
                <i className="fas fa-hourglass-half text-primary mb-2"></i>
                <h3 className="fs-6 text-muted mb-2">Pending Approvals</h3>
                <p className="fs-3 fw-bold mb-0">{totalPending}</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="row g-2 mb-4 align-items-center">
            <div className="col-md-6 col-lg-4 mb-2 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search department by name or head..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      // Search is already handled by the filteredDepartments
                    }
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {}}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 mb-2 mb-md-0">
              <button
                className="btn btn-outline-primary w-100"
                onClick={handleExportData}
              >
                <i className="fas fa-download me-1"></i> Export
              </button>
            </div>
            <div className="col-md-3 col-lg-2 mb-2 mb-md-0">
              <button
                className="btn btn-success w-100"
                onClick={handleAddDepartment}
              >
                <i className="fas fa-plus me-1"></i> Add New
              </button>
            </div>
          </div>

          {/* Department Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Department Summary</h5>
                <span className="badge bg-primary">
                  Total: <span>{filteredDepartments.length}</span>
                </span>
              </div>

              <div className="table-responsive">
                <table className="table table-hover mb-0" id="deptTableMain">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="dept-name">
                        Department
                      </th>
                      <th scope="col" className="dept-head">
                        Head of Dept.
                      </th>
                      <th scope="col" className="text-center dept-courses">
                        Courses
                      </th>
                      <th scope="col" className="text-center">
                        Students
                      </th>
                      <th scope="col" className="text-center dept-pending">
                        Pending
                      </th>
                      <th scope="col" className="text-center">
                        Performance
                      </th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartments.map((dept, index) => (
                      <tr key={index}>
                        <td className="dept-name" data-label="Department">
                          <div className="fw-bold">{dept.name}</div>
                          <small className="text-muted dept-id">
                            Dept ID: CS{100 + index}
                          </small>
                        </td>
                        <td className="dept-head" data-label="Head">
                          {dept.head}
                        </td>
                        <td
                          className="text-center fw-bold dept-courses"
                          data-label="Courses"
                        >
                          {dept.courses}
                        </td>
                        <td
                          className="text-center fw-bold"
                          data-label="Students"
                        >
                          {dept.students}
                        </td>
                        <td
                          className="text-center dept-pending"
                          data-label="Pending"
                        >
                          {dept.pending > 0 ? (
                            <span className="badge bg-warning text-dark">
                              {dept.pending}
                            </span>
                          ) : (
                            <span className="badge bg-success">0</span>
                          )}
                        </td>
                        <td className="text-center" data-label="Performance">
                          <span className={`status status-${dept.performance}`}>
                            {dept.performance}
                          </span>
                        </td>
                        <td className="text-center" data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewDepartment(index)}
                              title="View"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleEditDepartment(index)}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteDepartment(index)}
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>

      <style jsx>{`
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
        }

        body {
          background: #f4f7fb;
          color: #1e293b;
          overflow-x: hidden;
          font-family: "Poppins", sans-serif;
        }

        .head-dashboard {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 240px;
          background: linear-gradient(180deg, #1a237e, #1a237e);
          color: #fff;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1030;
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar-header {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
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
        }

        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: #1a237e;
          color: #fff;
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          letter-spacing: -1px;
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
        }

        /* =========  TOPBAR ========= */
        .topbar {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin: 15px 15px 1.5rem 15px;
          padding: 1rem 1.5rem !important;
          min-height: 70px;
        }

        .icon {
          background: #eff6ff;
          color: #1a237e;
          padding: 0.7rem;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon:hover {
          background: #1a237e;
          color: #fff;
        }

        .user-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid #1a237e;
          flex-shrink: 0;
        }

        .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* =========  DASHBOARD CARDS ========= */
        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s;
          height: 100%;
        }

        .dashboard-card:hover {
          transform: translateY(-4px);
        }

        .dashboard-card i {
          font-size: 28px;
          margin-bottom: 10px;
          color: #1a237e;
        }

        /* =========  STATUS BADGES ========= */
        .status {
          padding: 5px 10px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          display: inline-block;
        }

        .status-Excellent {
          background: #10b981;
        }

        .status-Good {
          background: #1a237e;
        }

        .status-Average {
          background: #f59e0b;
        }

        .status-Poor {
          background: #ef4444;
        }

        /* =========  IMPROVED TABLE RESPONSIVENESS ========= */
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Stack table on mobile */
        @media (max-width: 768px) {
          /* Hide less important columns on mobile */
          .mobile-hide {
            display: none;
          }

          /* Make table cells stack */
          .stack-table {
            display: block;
          }

          .stack-table thead {
            display: none;
          }

          .stack-table tbody,
          .stack-table tr,
          .stack-table td {
            display: block;
            width: 100%;
          }

          .stack-table tr {
            margin-bottom: 1rem;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 0.75rem;
            background: white;
          }

          .stack-table td {
            border: none;
            padding: 0.5rem 0;
            position: relative;
            padding-left: 45%;
          }

          .stack-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 0.75rem;
            width: 40%;
            padding-right: 10px;
            font-weight: 600;
            color: #495057;
          }

          /* Make action buttons fit better */
          .action-buttons {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
        }

        /* Medium screens - hide some columns */
        @media (max-width: 992px) and (min-width: 769px) {
          .tablet-hide {
            display: none;
          }
        }

        /* Small screens - show only essential columns */
        @media (max-width: 576px) {
          .table-responsive {
            border: 0;
          }

          /* Compact action buttons */
          .action-buttons .btn {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
          }

          /* Adjust spacing */
          .card-body {
            padding: 1rem;
          }
        }

        /* =========  RESPONSIVE BREAKPOINTS (Mobile-specific) ========= */
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
            width: 100%;
            padding: 0;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            top: 15px;
            left: 15px;
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .topbar {
            padding: 0.8rem !important;
            margin: 10px 10px 1rem 10px;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
          }

          .welcome p {
            display: none;
          }

          /* Hide some table columns on mobile */
          .dept-id,
          .dept-pending {
            display: none !important;
          }
        }

        @media (max-width: 576px) {
          .mobile-menu-btn {
            top: 12px;
            left: 12px;
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .topbar {
            padding: 0.6rem !important;
            margin: 8px 8px 0.8rem 8px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
          }

          .user-area i.fa-envelope {
            display: none !important;
          }

          /* Further simplify table on very small screens */
          .dept-courses {
            display: none !important;
          }
        }

        @media (max-width: 400px) {
          .mobile-menu-btn {
            top: 10px;
            left: 10px;
            width: 34px;
            height: 34px;
            font-size: 14px;
          }

          .topbar {
            padding: 0.5rem !important;
            margin: 6px 6px 0.6rem 6px;
          }

          .user-avatar {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeadDashboard;
