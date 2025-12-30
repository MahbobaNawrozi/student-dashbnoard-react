import React, { useState, useEffect, useRef } from "react";
import { Toast } from "bootstrap";

const ManagerReports = () => {
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reports data state
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "System Issue",
      category: "System",
      description: "Server downtime observed during peak hours.",
      priority: "High",
      date: "2025-11-03",
      status: "Reviewed",
      feedback: "Issue resolved, monitoring ongoing.",
    },
    {
      id: 2,
      title: "Student Complaint",
      category: "Student",
      description: "Complaint about online class scheduling.",
      priority: "Medium",
      date: "2025-11-02",
      status: "Pending",
      feedback: "",
    },
    {
      id: 3,
      title: "Teacher Request",
      category: "Teacher",
      description: "Request for additional teaching resources.",
      priority: "Low",
      date: "2025-11-01",
      status: "Reviewed",
      feedback: "Resources approved and allocated.",
    },
    {
      id: 4,
      title: "Website Bug",
      category: "System",
      description: "Login page not loading properly on mobile.",
      priority: "High",
      date: "2025-10-30",
      status: "Pending",
      feedback: "",
    },
  ]);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
  });

  // Summary calculations
  const totalReports = reports.length;
  const pendingFeedback = reports.filter((r) => r.status === "Pending").length;
  const reviewedReports = reports.filter((r) => r.status === "Reviewed").length;

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
    {
      icon: "fas fa-chart-line",
      label: "Reports",
      link: "reports.html",
      active: true,
    },
    { icon: "fas fa-cog", label: "Settings", link: "setting.html" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  // Refs for outside click detection
  const sidebarRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Form input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Show/hide form
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      // Reset form when hiding
      setFormData({
        title: "",
        category: "",
        priority: "",
        description: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.priority ||
      !formData.description
    ) {
      showToast("Please fill in all fields!", "warning");
      return;
    }

    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map((r) => r.id)) + 1 : 1,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      priority: formData.priority,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      feedback: "",
    };

    setReports([...reports, newReport]);
    setShowForm(false);
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
    });

    showToast("Report added successfully!", "success");
  };

  // Delete report
  const handleDeleteReport = (index) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((_, i) => i !== index);
      setReports(updatedReports);
      showToast("Report deleted successfully!", "warning");
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
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        window.innerWidth <= 992 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Responsive table data
  const getResponsiveTable = () => {
    if (window.innerWidth < 768) {
      return reports.map((report, index) => (
        <div key={index} className="card mb-3 d-md-none">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 className="mb-1 fw-bold">{report.title}</h6>
                <small className="text-muted">ID: {report.id}</small>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteReport(index)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            <div className="row g-2 mb-2">
              <div className="col-6">
                <small className="text-muted">Category</small>
                <div>{report.category}</div>
              </div>
              <div className="col-6">
                <small className="text-muted">Priority</small>
                <div>
                  <span
                    className={`priority-badge ${report.priority.toLowerCase()}`}
                  >
                    {report.priority}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <small className="text-muted">Description</small>
              <div className="text-truncate">{report.description}</div>
            </div>
            <div className="row g-2 mb-2">
              <div className="col-6">
                <small className="text-muted">Date</small>
                <div>{report.date}</div>
              </div>
              <div className="col-6">
                <small className="text-muted">Status</small>
                <div>
                  <span
                    className={`status-badge ${report.status.toLowerCase()}`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <small className="text-muted">Admin Feedback</small>
              <div className="feedback-text">
                {report.feedback || "Waiting for admin feedback..."}
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="reports-container">
      {/* Mobile Menu Button */}
      <button
        ref={mobileMenuBtnRef}
        className="mobile-menu-btn d-lg-none"
        onClick={toggleMobileSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
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
            <div
              className="icon d-none d-lg-block"
              onClick={toggleDesktopSidebar}
            >
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h1 className="h3 mb-0">Manager Reports</h1>
              <p className="text-muted mb-0 d-none d-md-block">
                Track, raise and manage every academy report.
              </p>
            </div>
          </div>
          <div className="user-area">
            <div className="icon position-relative me-2 me-md-3">
              <i className="fas fa-bell"></i>
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1">
                3
              </span>
            </div>
            <div className="icon d-none d-md-flex me-2 me-md-3">
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
            <div className="col-12 col-md-4">
              <div className="dashboard-card h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="h6 text-muted mb-1">Total Reports</h3>
                    <p className="h2 mb-0 fw-bold">{totalReports}</p>
                  </div>
                  <div className="icon bg-primary bg-opacity-10">
                    <i className="fas fa-file-alt text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="dashboard-card h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="h6 text-muted mb-1">Pending Feedback</h3>
                    <p className="h2 mb-0 fw-bold">{pendingFeedback}</p>
                  </div>
                  <div className="icon bg-warning bg-opacity-10">
                    <i className="fas fa-clock text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="dashboard-card h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="h6 text-muted mb-1">Reviewed Reports</h3>
                    <p className="h2 mb-0 fw-bold">{reviewedReports}</p>
                  </div>
                  <div className="icon bg-success bg-opacity-10">
                    <i className="fas fa-check-circle text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <section className="reports-section">
            <div className="section-header">
              <h3 className="h5 mb-0">All Reports</h3>
              <button
                className={`btn ${
                  showForm ? "btn-secondary" : "btn-primary"
                } btn-sm`}
                onClick={toggleForm}
              >
                <i className="fas fa-plus me-1"></i>
                {showForm ? "Cancel" : "Add Report"}
              </button>
            </div>

            {/* Add Report Form */}
            <div className={`add-report-form ${showForm ? "show" : ""}`}>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6 col-lg-3">
                    <label className="form-label">Report Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="title"
                      placeholder="Report Title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select form-select-sm"
                      id="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="System">System</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select form-select-sm"
                      id="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={new Date().toISOString().split("T")[0]}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control form-control-sm"
                    id="description"
                    placeholder="Report Description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={toggleForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success btn-sm">
                    <i className="fas fa-check me-1"></i> Save Report
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Cards View */}
            <div className="d-md-none">{getResponsiveTable()}</div>

            {/* Desktop Table View */}
            <div className="table-container d-none d-md-block">
              <div className="table-responsive">
                <table className="reports-table table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Admin Feedback</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index}>
                        <td className="fw-semibold">{report.id}</td>
                        <td>
                          <strong>{report.title}</strong>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {report.category}
                          </span>
                        </td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {report.description}
                        </td>
                        <td>
                          <span
                            className={`priority-badge ${report.priority.toLowerCase()}`}
                          >
                            {report.priority}
                          </span>
                        </td>
                        <td>{report.date}</td>
                        <td>
                          <span
                            className={`status-badge ${report.status.toLowerCase()}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td
                          className="feedback-text"
                          title={report.feedback || "No feedback yet"}
                        >
                          {report.feedback || (
                            <span className="text-muted fst-italic">
                              Waiting for admin feedback...
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteReport(index)}
                            title="Delete Report"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
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

        .reports-container {
          display: flex;
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* Sidebar - Professional with hidden scroll */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1a237e, #0d164b);
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
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          padding: 1.5rem 0;
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
          padding: 0.875rem 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s;
          border-left: 4px solid transparent;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: #4caf50;
          color: #fff;
        }

        .sidebar.collapsed .menu li a {
          padding: 0.875rem;
          justify-content: center;
        }

        .sidebar.collapsed .menu li a span {
          display: none;
        }

        /* Main Content */
        .main-content {
          margin-left: 260px;
          min-height: 100vh;
          transition: margin-left 0.3s ease;
          padding: 1.25rem;
          width: calc(100% - 260px);
          background: #f8f9fa;
        }

        .main-content.collapsed {
          margin-left: 70px;
          width: calc(100% - 70px);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1040;
          background: #1a237e;
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Topbar - Responsive */
        .topbar {
          display: flex;
          padding: 1rem 1.5rem;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          border: 1px solid #e9ecef;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .welcome {
          text-align: left;
        }

        .icon {
          background: #f8f9fa;
          color: #1a237e;
          padding: 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }

        .icon:hover {
          background: #1a237e;
          color: #fff;
          transform: translateY(-2px);
        }

        .user-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #1a237e;
          object-fit: cover;
        }

        /* Cards */
        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
          border-color: #1a237e;
        }

        /* Reports Section */
        .reports-section {
          background: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          margin-top: 1.5rem;
          border: 1px solid #e9ecef;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* Add Report Form */
        .add-report-form {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          border: 1px solid #e9ecef;
          display: none;
        }

        .add-report-form.show {
          display: block;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Table */
        .table-container {
          overflow-x: auto;
        }

        .reports-table th {
          background: #f8f9fa;
          color: #495057;
          font-weight: 600;
          padding: 0.875rem 1rem;
          white-space: nowrap;
          border-bottom: 2px solid #e9ecef;
        }

        .reports-table td {
          padding: 0.875rem 1rem;
          vertical-align: middle;
          border-bottom: 1px solid #e9ecef;
        }

        .reports-table tr:hover {
          background: #f8f9fa;
        }

        /* Status badges */
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .status-badge.reviewed {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        /* Priority badges */
        .priority-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }

        .priority-badge.low {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .priority-badge.medium {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .priority-badge.high {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        /* Feedback text */
        .feedback-text {
          color: #6c757d;
          font-size: 0.875rem;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Mobile Cards */
        .card {
          border: 1px solid #e9ecef;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .card-body {
          padding: 1rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .sidebar {
            width: 240px;
          }

          .main-content {
            margin-left: 240px;
            width: calc(100% - 240px);
            padding: 1rem;
          }

          .sidebar.collapsed {
            width: 70px;
          }

          .sidebar.collapsed ~ .main-content {
            margin-left: 70px;
            width: calc(100% - 70px);
          }

          .reports-table th,
          .reports-table td {
            padding: 0.75rem;
          }
        }

        @media (max-width: 992px) {
          .sidebar {
            transform: translateX(-100%);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            width: 280px;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding: 1rem;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .topbar {
            padding: 0.875rem;
            margin-bottom: 1rem;
          }

          .reports-section {
            padding: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 0.75rem;
          }

          .topbar {
            padding: 0.75rem;
          }

          .topbar-left .welcome h1 {
            font-size: 1.1rem;
          }

          .icon {
            width: 40px;
            height: 40px;
            padding: 0.625rem;
          }

          .user-avatar {
            width: 40px;
            height: 40px;
          }

          .mobile-menu-btn {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
          }

          .dashboard-card {
            padding: 1rem;
          }

          .dashboard-card .h2 {
            font-size: 1.75rem;
          }

          .reports-section {
            padding: 1rem;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .section-header .btn {
            align-self: flex-end;
          }

          .add-report-form {
            padding: 1rem;
          }
        }

        @media (max-width: 576px) {
          .main-content {
            padding: 0.5rem;
          }

          .topbar {
            padding: 0.625rem;
          }

          .topbar-left .welcome h1 {
            font-size: 1rem;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
          }

          .icon {
            width: 36px;
            height: 36px;
            padding: 0.5rem;
          }

          .mobile-menu-btn {
            top: 0.5rem;
            left: 0.5rem;
            width: 36px;
            height: 36px;
          }

          .dashboard-card .h2 {
            font-size: 1.5rem;
          }

          .dashboard-card .h6 {
            font-size: 0.875rem;
          }

          .reports-section {
            padding: 0.75rem;
          }

          .btn {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }

          .form-label {
            font-size: 0.875rem;
          }

          .form-control,
          .form-select {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .user-area {
            width: 100%;
            justify-content: flex-end;
          }

          .mobile-menu-btn {
            width: 34px;
            height: 34px;
            font-size: 1rem;
          }

          .sidebar-header {
            padding: 1rem;
            height: 60px;
          }

          .menu li a {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 360px) {
          .main-content {
            padding: 0.375rem;
          }

          .topbar {
            padding: 0.5rem;
          }

          .topbar-left .welcome h1 {
            font-size: 0.9rem;
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
            font-size: 0.875rem;
          }

          .dashboard-card {
            padding: 0.75rem;
          }

          .reports-section {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ManagerReports;
