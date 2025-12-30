import React, { useState, useEffect } from "react";
import { Toast } from "bootstrap";

const StudentsPage = () => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Students data state
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      dept: "CS",
      course: "Self-Paced",
      status: "active",
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      dept: "Business",
      course: "Teacher-Led",
      status: "graduated",
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Alice Green",
      dept: "CS",
      course: "Self-Paced",
      status: "pending",
      img: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Bob White",
      dept: "Design",
      course: "Teacher-Led",
      status: "inactive",
      img: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Michael Brown",
      dept: "Business",
      course: "Self-Paced",
      status: "active",
      img: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Lucy Gray",
      dept: "Design",
      course: "Teacher-Led",
      status: "graduated",
      img: "https://i.pravatar.cc/150?img=6",
    },
    {
      name: "Sarah Johnson",
      dept: "CS",
      course: "Teacher-Led",
      status: "active",
      img: "https://i.pravatar.cc/150?img=7",
    },
    {
      name: "Tom Wilson",
      dept: "Business",
      course: "Self-Paced",
      status: "pending",
      img: "https://i.pravatar.cc/150?img=8",
    },
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    activeTab: "all",
    status: "all",
    course: "all",
    search: "",
  });

  // Menu items
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
    },
    {
      icon: "fas fa-user-graduate",
      label: "Students",
      link: "students.html",
      active: true,
    },
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

  // Tabs data
  const tabs = [
    { id: "all", label: "All Students" },
    { id: "pending", label: "Pending" },
    { id: "selfpaced", label: "Self-Paced" },
    { id: "teacherled", label: "Teacher-Led" },
  ];

  // Calculate summary statistics
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const inactiveStudents = students.filter(
    (s) => s.status === "inactive"
  ).length;
  const graduatedStudents = students.filter(
    (s) => s.status === "graduated"
  ).length;
  const pendingStudents = students.filter((s) => s.status === "pending").length;

  // Filter students based on current filters
  const filteredStudents = students.filter((student) => {
    // Tab filter
    if (filters.activeTab === "pending" && student.status !== "pending")
      return false;
    if (
      filters.activeTab === "selfpaced" &&
      student.course.toLowerCase() !== "self-paced"
    )
      return false;
    if (
      filters.activeTab === "teacherled" &&
      student.course.toLowerCase() !== "teacher-led"
    )
      return false;

    // Status filter
    if (filters.status !== "all" && student.status !== filters.status)
      return false;

    // Course filter
    if (
      filters.course !== "all" &&
      student.course.toLowerCase().replace("-", "") !== filters.course
    )
      return false;

    // Search filter
    if (
      filters.search &&
      !student.name.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    return true;
  });

  // Handle tab change
  const handleTabChange = (tabId) => {
    setFilters((prev) => ({
      ...prev,
      activeTab: tabId,
    }));
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Student action handlers
  const handleViewStudent = (name) => {
    alert(`Viewing details for: ${name}`);
    // In a real app, this would navigate to student detail page
  };

  const handleApproveStudent = (name) => {
    const updatedStudents = students.map((student) => {
      if (student.name === name) {
        return { ...student, status: "active" };
      }
      return student;
    });

    setStudents(updatedStudents);
    showToast(`${name} has been approved!`, "success");
  };

  const handleDeleteStudent = (name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updatedStudents = students.filter(
        (student) => student.name !== name
      );
      setStudents(updatedStudents);
      showToast(`${name} has been deleted.`, "warning");
    }
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

    const bsToast = new Toast(toast);
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
    <div className="students-container">
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
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="icon" onClick={toggleDesktopSidebar}>
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h1>Student Dashboard</h1>
              <p>Browse, filter and manage every student in the academy.</p>
            </div>
          </div>
          <div className="user-area">
            <div className="icon position-relative">
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
            <div className="icon d-none d-md-flex">
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

        {/* Summary Cards */}
        <div className="container-fluid px-0 px-md-3">
          <div className="row g-3 mb-4">
            <div className="col-md-6 col-lg">
              <div className="dashboard-card">
                <h3>{totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="col-md-6 col-lg">
              <div className="dashboard-card">
                <h3>{activeStudents}</h3>
                <p>Active</p>
              </div>
            </div>
            <div className="col-md-6 col-lg">
              <div className="dashboard-card">
                <h3>{inactiveStudents}</h3>
                <p>Inactive</p>
              </div>
            </div>
            <div className="col-md-6 col-lg">
              <div className="dashboard-card">
                <h3>{graduatedStudents}</h3>
                <p>Graduated</p>
              </div>
            </div>
            <div className="col-md-6 col-lg">
              <div className="dashboard-card">
                <h3>{pendingStudents}</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${
                  filters.activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="row g-2 mb-4 align-items-center">
            <div className="col-md-3 col-sm-6 mb-2 mb-md-0">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="col-md-3 col-sm-6 mb-2 mb-md-0">
              <select
                className="form-select"
                value={filters.course}
                onChange={(e) => handleFilterChange("course", e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="selfpaced">Self-Paced</option>
                <option value="teacherled">Teacher-Led</option>
              </select>
            </div>
            <div className="col-md-4 col-sm-12 mb-2 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    // Search is already handled by the filteredStudents calculation
                  }
                }}
              />
            </div>
            <div className="col-md-2 col-sm-12">
              <button className="btn btn-primary w-100" onClick={() => {}}>
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>

          {/* Students Grid */}
          <div className="student-grid">
            {filteredStudents.map((student, index) => (
              <div key={index} className="student-card">
                <img src={student.img} alt={student.name} />
                <div className="content">
                  <h4>{student.name}</h4>
                  <p>
                    {student.dept} | {student.course}
                  </p>
                  <span className={`badge ${student.status}`}>
                    {student.status.charAt(0).toUpperCase() +
                      student.status.slice(1)}
                  </span>
                  <div className="actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewStudent(student.name)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    {student.status === "pending" && (
                      <button
                        className="approve-btn"
                        onClick={() => handleApproveStudent(student.name)}
                      >
                        <i className="fas fa-check"></i> Approve
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteStudent(student.name)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        :root {
          --sidebar-bg: #1a237e;
          --accent: #1a237e;
          --text: #333;
          --text-light: #555;
          --border: #eee;
          --card-bg: #fff;
          --shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
          --radius: 8px;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: #f5f6fa;
          overflow-x: hidden;
        }

        .students-container {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar - Professional with hidden scroll */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1a237e, #1a237e);
          color: #fff;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1030;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          padding: 1.8rem;
          background: rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          padding: 1.8rem 0;
        }

        .menu-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10px 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .menu-wrapper::-webkit-scrollbar {
          display: none;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
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
        }

        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: #1a237e;
          color: #fff;
        }

        .sidebar.collapsed .menu li a {
          padding: 1rem;
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
        /* Cards */
        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          height: 100%;
          text-align: center;
          border: 1px solid transparent;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
          border-color: #1a237e;
        }

        .dashboard-card h3 {
          font-size: 24px;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .dashboard-card p {
          font-size: 14px;
          color: #64748b;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 10px 20px;
          background: #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.2s;
          border: none;
        }

        .tab-btn.active {
          background: #1a237e;
          color: #fff;
        }

        .tab-btn:hover {
          opacity: 0.8;
        }

        /* Student Grid */
        .student-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .student-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s;
          position: relative;
        }

        .student-card:hover {
          transform: translateY(-8px);
        }

        .student-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .student-card .content {
          padding: 15px;
        }

        .student-card h4 {
          margin: 0 0 8px;
          font-size: 18px;
          color: #1a237e;
        }

        .student-card p {
          margin: 0 0 10px;
          font-size: 14px;
          color: #64748b;
        }

        .badge {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .badge.active {
          background: #10b981;
          color: white;
        }

        .badge.inactive {
          background: #ef4444;
          color: white;
        }

        .badge.graduated {
          background: #f59e0b;
          color: white;
        }

        .badge.pending {
          background: #1a237e;
          color: white;
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .actions button {
          flex: 1;
          border: none;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          min-width: 60px;
        }

        .actions button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .view-btn {
          background: #1a237e;
          color: #fff;
        }

        .approve-btn {
          background: #10b981;
          color: #fff;
        }

        .delete-btn {
          background: #ef4444;
          color: #fff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .sidebar {
            width: 240px;
          }

          .main-content {
            margin-left: 240px;
            width: calc(100% - 240px);
          }

          .sidebar.collapsed {
            width: 70px;
          }

          .sidebar.collapsed ~ .main-content {
            margin-left: 70px;
            width: calc(100% - 70px);
          }
        }

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
            padding: 1rem;
            min-height: 70px;
            margin-bottom: 1rem;
          }

          .welcome h1 {
            font-size: 1.4rem;
          }

          .welcome p {
            font-size: 0.85rem;
          }

          .dashboard-card {
            padding: 15px;
          }

          .student-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 12px;
          }

          .topbar {
            padding: 0.9rem;
            min-height: 60px;
          }

          .topbar h1 {
            font-size: 1.3rem;
          }

          .topbar p {
            display: none;
          }

          .icon {
            padding: 0.6rem;
            font-size: 0.9rem;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
          }

          .mobile-menu-btn {
            top: 15px;
            left: 15px;
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .dashboard-card {
            padding: 15px;
          }

          .welcome h1 {
            font-size: 1.2rem;
          }

          .student-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }

          .tabs {
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .main-content {
            padding: 10px;
          }

          .topbar {
            padding: 0.8rem;
            min-height: 55px;
          }

          .topbar h1 {
            font-size: 1.1rem;
          }

          .icon {
            padding: 0.5rem;
            font-size: 0.85rem;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
          }

          .user-area i.fa-envelope {
            display: none !important;
          }

          .mobile-menu-btn {
            top: 12px;
            left: 12px;
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .welcome h1 {
            font-size: 1rem;
          }

          /* Cards responsive */
          .row.g-3.mb-4 {
            margin-bottom: 12px !important;
          }

          .dashboard-card {
            padding: 12px;
          }

          .dashboard-card h3 {
            font-size: 20px;
          }

          .tabs {
            gap: 5px;
          }

          .tab-btn {
            padding: 8px 12px;
            font-size: 0.85rem;
          }

          .student-grid {
            grid-template-columns: 1fr;
          }

          .actions button {
            padding: 5px 8px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 8px;
          }

          .topbar {
            padding: 0.6rem;
            min-height: 50px;
          }

          .topbar h1 {
            font-size: 0.95rem;
            max-width: 140px;
          }

          .user-avatar {
            width: 30px;
            height: 30px;
          }

          .mobile-menu-btn {
            top: 10px;
            left: 10px;
            width: 34px;
            height: 34px;
            font-size: 14px;
          }

          .welcome h1 {
            font-size: 0.95rem;
          }

          .dashboard-card h3 {
            font-size: 18px;
          }

          .student-card h4 {
            font-size: 16px;
          }
        }

        @media (max-width: 360px) {
          .main-content {
            padding: 6px;
          }

          .topbar {
            padding: 0.5rem;
            min-height: 45px;
          }

          .topbar-left {
            gap: 0.5rem;
          }

          .icon {
            padding: 0.4rem;
            width: 32px;
            height: 32px;
          }

          .mobile-menu-btn {
            width: 32px;
            height: 32px;
            top: 8px;
            left: 8px;
          }

          .welcome h1 {
            font-size: 0.9rem;
            max-width: 120px;
          }

          .dashboard-card p {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentsPage;
