import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeachersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [teachers, setTeachers] = useState([
    {
      name: "Alice Johnson",
      email: "alice@academy.com",
      course: "Web Development",
      department: "IT",
      category: "Frontend",
      status: "Pending",
    },
    {
      name: "Bob Smith",
      email: "bob@academy.com",
      course: "Graphic Design",
      department: "Design",
      category: "Visual",
      status: "Approved",
    },
    {
      name: "Carol Lee",
      email: "carol@academy.com",
      course: "UI/UX Design",
      department: "Design",
      category: "UX",
      status: "Pending",
    },
    {
      name: "David Kim",
      email: "david@academy.com",
      course: "Python Programming",
      department: "IT",
      category: "Backend",
      status: "Rejected",
    },
    {
      name: "Emma Wilson",
      email: "emma@academy.com",
      course: "Data Science",
      department: "IT",
      category: "Analytics",
      status: "Approved",
    },
    {
      name: "Frank Miller",
      email: "frank@academy.com",
      course: "Mobile Development",
      department: "IT",
      category: "Mobile",
      status: "Pending",
    },
  ]);

  const [filters, setFilters] = useState({
    activeFilter: "All",
    searchQuery: "",
  });

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "index.html" },
    {
      icon: "fas fa-layer-group",
      label: "Departments",
      link: "departments.html",
    },
    { icon: "fas fa-book", label: "Courses", link: "courses.html" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "head.html" },
    {
      icon: "fas fa-chalkboard-teacher",
      label: "Teachers",
      link: "teachers.html",
      active: true,
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

  const filterButtons = [
    { id: "All", label: "All", variant: "primary" },
    { id: "Pending", label: "Pending", variant: "warning" },
    { id: "Approved", label: "Approved", variant: "success" },
    { id: "Rejected", label: "Rejected", variant: "danger" },
  ];

  const totalTeachers = teachers.length;
  const pendingApprovals = teachers.filter(
    (t) => t.status === "Pending"
  ).length;

  // Filter teachers based on current filters
  const filteredTeachers = teachers.filter((teacher) => {
    // Status filter
    if (
      filters.activeFilter !== "All" &&
      teacher.status !== filters.activeFilter
    )
      return false;

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(query) ||
        teacher.email.toLowerCase().includes(query) ||
        teacher.course.toLowerCase().includes(query) ||
        teacher.department.toLowerCase().includes(query) ||
        teacher.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleFilterChange = (filterId) => {
    setFilters((prev) => ({
      ...prev,
      activeFilter: filterId,
    }));
  };

  const handleSearch = () => {};

  const handleApproveTeacher = (index) => {
    const updatedTeachers = teachers.map((teacher, i) => {
      if (i === index) {
        return { ...teacher, status: "Approved" };
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
    showToast("Teacher approved successfully!", "success");
  };

  const handleRejectTeacher = (index) => {
    const updatedTeachers = teachers.map((teacher, i) => {
      if (i === index) {
        return { ...teacher, status: "Rejected" };
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
    showToast("Teacher rejected.", "warning");
  };

  // Show toast notification
  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${
      type === "success" ? "success" : type === "warning" ? "warning" : "info"
    } border-0`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    const container = document.createElement("div");
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    container.appendChild(toast);
    document.body.appendChild(container);

    // Using Bootstrap Toast directly
    const bsToast = new window.bootstrap.Toast(toast);
    bsToast.show();

    toast.addEventListener("hidden.bs.toast", function () {
      container.remove();
    });
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

  return (
    <div className="app container-fluid p-0">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn d-lg-none"
        onClick={toggleMobileSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <div className="menu-wrapper">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar - Matching the exact same height as departments page */}
        <header className="topbar container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="topbar-left d-flex align-items-center">
                <div
                  className="icon d-none d-lg-flex"
                  onClick={toggleDesktopSidebar}
                >
                  <i className="fas fa-bars"></i>
                </div>
                <div className="welcome">
                  <h1 className="mb-1">Teacher Dashboard</h1>
                  <p className="d-none d-md-block mb-0">
                    Browse, filter and manage every teacher in the academy.
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
                <a href="managerProfile.html">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Manager Avatar"
                    className="user-avatar"
                  />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="container-fluid">
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-chalkboard-teacher"></i>
                <h3>Total Teachers</h3>
                <p>{totalTeachers}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-hourglass-half"></i>
                <h3>Pending Approvals</h3>
                <p>{pendingApprovals}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-check-circle"></i>
                <h3>Active Teachers</h3>
                <p>{teachers.filter((t) => t.status === "Approved").length}</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="row g-2 mb-4 align-items-center">
            <div className="col-12 col-md-8 mb-2 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name, Email, Course, Dept, Category"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  <i className="fas fa-search me-1"></i> Search
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex gap-2 flex-wrap">
                {filterButtons.map((button) => (
                  <button
                    key={button.id}
                    className={`btn btn-sm ${
                      filters.activeFilter === button.id
                        ? `btn-${button.variant}`
                        : `btn-outline-${button.variant}`
                    }`}
                    onClick={() => handleFilterChange(button.id)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Teachers Table */}
          <section className="data-section">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher, index) => (
                      <tr key={index}>
                        <td data-label="Name">{teacher.name}</td>
                        <td data-label="Email">{teacher.email}</td>
                        <td data-label="Course">{teacher.course}</td>
                        <td data-label="Department">{teacher.department}</td>
                        <td data-label="Category">{teacher.category}</td>
                        <td data-label="Status">
                          <span className={`status ${teacher.status}`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="action-buttons d-flex gap-2 flex-wrap">
                            <a
                              href={`teacher-detail.html?id=${index}`}
                              className="action-btn details"
                            >
                              <i className="fas fa-eye me-1"></i> Details
                            </a>
                            {teacher.status === "Pending" && (
                              <>
                                <button
                                  className="action-btn approve"
                                  onClick={() => handleApproveTeacher(index)}
                                >
                                  <i className="fas fa-check me-1"></i> Approve
                                </button>
                                <button
                                  className="action-btn reject"
                                  onClick={() => handleRejectTeacher(index)}
                                >
                                  <i className="fas fa-times me-1"></i> Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No teachers found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
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

        .app {
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
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 10px 0;
        }
        .menu-wrapper::-webkit-scrollbar {
          display: none;
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
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .main-content::-webkit-scrollbar {
          display: none;
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

        /* ========= KPI CARDS ========= */
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

        .dashboard-card i {
          font-size: 32px;
          margin-bottom: 12px;
          color: #1a237e;
        }

        .dashboard-card h3 {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .dashboard-card p {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
        }

        /* ========= DATA SECTION ========= */
        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        /* ========= TABLE ========= */
        .table-container {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .table-container::-webkit-scrollbar {
          display: none;
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

        /* ========= STATUS BADGES ========= */
        .status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .status.Pending {
          background: #f59e0b;
          color: white;
        }

        .status.Approved {
          background: #10b981;
          color: white;
        }

        .status.Rejected {
          background: #ef4444;
          color: white;
        }

        /* ========= ACTION BUTTONS ========= */
        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-btn {
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
        }

        .action-btn.details {
          background: #1a237e;
        }

        .action-btn.details:hover {
          background: #1a237e;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(26, 35, 126, 0.2);
        }

        .action-btn.approve {
          background: #10b981;
        }

        .action-btn.approve:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
        }

        .action-btn.reject {
          background: #ef4444;
        }

        .action-btn.reject:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
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

          th,
          td {
            padding: 12px 14px;
            font-size: 0.85rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 6px;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Mobile (≤ 576px) */
        @media (max-width: 576px) {
          .topbar {
            padding: 0.8rem;
            min-height: 65px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
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

            .action-buttons {
              flex-direction: row;
              justify-content: center;
              gap: 6px;
              width: 100%;
            }

            .action-btn {
              padding: 6px 12px;
              font-size: 12px;
              flex: 1;
              min-width: 70px;
            }
          }

          /* Filter buttons mobile */
          .d-flex.gap-2 {
            flex-direction: column;
            gap: 5px !important;
          }

          .btn-sm {
            width: 100%;
            margin-bottom: 5px;
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

          .section-title {
            font-size: 1rem;
          }

          .button-bar {
            gap: 8px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 5px;
          }

          .action-btn {
            width: 100%;
            padding: 6px 10px;
            font-size: 11px;
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

          .action-btn {
            padding: 5px 8px;
            font-size: 10px;
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

export default TeachersPage;
