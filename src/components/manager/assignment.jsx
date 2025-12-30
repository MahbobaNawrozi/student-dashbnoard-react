import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Assignments = () => {
  const sidebarRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Essay on Data Structures",
      course: "Data Structures",
      dueDate: "2025-11-25",
      maxScore: 100,
      description: "Compare arrays vs linked lists.",
      submissions: 45,
      totalStudents: 50,
    },
    {
      id: 2,
      title: "Marketing Plan",
      course: "Marketing 101",
      dueDate: "2025-11-20",
      maxScore: 100,
      description: "Create a full 4P plan.",
      submissions: 38,
      totalStudents: 40,
    },
    {
      id: 3,
      title: "Calculus Problem Set",
      course: "Calculus II",
      dueDate: "2025-11-18",
      maxScore: 50,
      description: "Chapter 5 integrals.",
      submissions: 30,
      totalStudents: 35,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    maxScore: 100,
  });

  const toggleDesktop = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992 && isMobileOpen) {
        if (
          !sidebarRef.current?.contains(e.target) &&
          !e.target.closest("#mobileMenuToggle")
        ) {
          setIsMobileOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = () => new Date().toISOString().slice(0, 10);
  const isOverdue = (d) => d < today();
  const statusClass = (sub, total, due) => {
    if (isOverdue(due) && sub < total) return "overdue";
    if (sub === total) return "submitted";
    return "pending";
  };
  const statusText = (sub, total, due) => {
    if (isOverdue(due) && sub < total) return "Overdue";
    if (sub === total) return "Submitted";
    return "Pending";
  };

  const totalAssignments = assignments.length;
  const totalSubmissions = assignments.reduce((a, b) => a + b.submissions, 0);
  const totalStudents = assignments.reduce((a, b) => a + b.totalStudents, 0);
  const overdueCount = assignments.filter(
    (a) => isOverdue(a.dueDate) && a.submissions < a.totalStudents
  ).length;
  const avgSubmission = totalStudents
    ? Math.round((totalSubmissions / totalStudents) * 100) + "%"
    : "-";

  const courses = [...new Set(assignments.map((a) => a.course))];

  const filtered = assignments
    .filter((a) => {
      if (statusFilter === "overdue")
        return isOverdue(a.dueDate) && a.submissions < a.totalStudents;
      if (statusFilter === "submitted")
        return a.submissions === a.totalStudents;
      if (statusFilter === "pending")
        return a.submissions < a.totalStudents && !isOverdue(a.dueDate);
      return true;
    })
    .filter((a) => courseFilter === "all" || a.course === courseFilter)
    .filter(
      (a) =>
        searchQuery === "" ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const openModal = (id = null) => {
    if (id) {
      const a = assignments.find((as) => as.id === id);
      setForm({
        title: a.title,
        course: a.course,
        description: a.description,
        dueDate: a.dueDate,
        maxScore: a.maxScore,
      });
      setEditingId(id);
    } else {
      setForm({
        title: "",
        course: "",
        description: "",
        dueDate: "",
        maxScore: 100,
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const saveAssignment = () => {
    if (
      !form.title.trim() ||
      !form.course ||
      !form.dueDate ||
      form.maxScore < 1
    ) {
      alert("Please fill all fields correctly.");
      return;
    }
    if (editingId) {
      setAssignments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      setAssignments((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          submissions: 0,
          totalStudents: 40,
        },
      ]);
    }
    closeModal();
  };

  const deleteAssignment = (id) => {
    if (!confirm("Delete this assignment?")) return;
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const submitAssignment = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id && a.submissions < a.totalStudents
          ? { ...a, submissions: a.submissions + 1 }
          : a
      )
    );
  };

  // Get current page for active menu highlighting
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path.includes("assignment")) return "assignments";
    if (path.includes("dashboard") || path === "/") return "dashboard";
    if (path.includes("department")) return "departments";
    if (path.includes("course")) return "courses";
    if (path.includes("head")) return "heads";
    if (path.includes("teacher")) return "teachers";
    if (path.includes("student")) return "students";
    if (path.includes("grade")) return "grades";
    if (path.includes("certificate")) return "certificates";
    if (path.includes("announcement")) return "announcement";
    if (path.includes("analytic")) return "analytics";
    if (path.includes("report")) return "reports";
    if (path.includes("setting")) return "settings";
    return "dashboard";
  };

  const currentPage = getCurrentPage();

  const handleMenuItemClick = (itemId) => {
    if (window.innerWidth <= 992) {
      setIsMobileOpen(false);
    }

    if (itemId === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      // Redirect to login page
    }
  };

  return (
    <div className="manager-dashboard">
      {/* Mobile Menu Button */}
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn"
        onClick={toggleMobile}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars" />
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <ul className="menu">
          <li className={currentPage === "dashboard" ? "active" : ""}>
            <Link to="/" onClick={() => handleMenuItemClick("dashboard")}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={currentPage === "departments" ? "active" : ""}>
            <Link
              to="/departments"
              onClick={() => handleMenuItemClick("departments")}
            >
              <i className="fas fa-layer-group"></i>
              <span>Departments</span>
            </Link>
          </li>
          <li className={currentPage === "courses" ? "active" : ""}>
            <Link to="/courses" onClick={() => handleMenuItemClick("courses")}>
              <i className="fas fa-book"></i>
              <span>Courses</span>
            </Link>
          </li>
          <li className={currentPage === "heads" ? "active" : ""}>
            <Link to="/heads" onClick={() => handleMenuItemClick("heads")}>
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Heads</span>
            </Link>
          </li>
          <li className={currentPage === "teachers" ? "active" : ""}>
            <Link
              to="/teachers"
              onClick={() => handleMenuItemClick("teachers")}
            >
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Teachers</span>
            </Link>
          </li>
          <li className={currentPage === "students" ? "active" : ""}>
            <Link
              to="/students"
              onClick={() => handleMenuItemClick("students")}
            >
              <i className="fas fa-user-graduate"></i>
              <span>Students</span>
            </Link>
          </li>
          <li className={currentPage === "assignments" ? "active" : ""}>
            <Link
              to="/assignments"
              onClick={() => handleMenuItemClick("assignments")}
            >
              <i className="fas fa-tasks"></i>
              <span>Assignments</span>
            </Link>
          </li>
          <li className={currentPage === "grades" ? "active" : ""}>
            <Link to="/grades" onClick={() => handleMenuItemClick("grades")}>
              <i className="fas fa-graduation-cap"></i>
              <span>Grades</span>
            </Link>
          </li>
          <li className={currentPage === "certificates" ? "active" : ""}>
            <Link
              to="/certificates"
              onClick={() => handleMenuItemClick("certificates")}
            >
              <i className="fas fa-certificate"></i>
              <span>Certificates</span>
            </Link>
          </li>
          <li className={currentPage === "announcement" ? "active" : ""}>
            <Link
              to="/announcements"
              onClick={() => handleMenuItemClick("announcement")}
            >
              <i className="fas fa-bullhorn"></i>
              <span>Announcements</span>
            </Link>
          </li>
          <li className={currentPage === "analytics" ? "active" : ""}>
            <Link
              to="/analytics"
              onClick={() => handleMenuItemClick("analytics")}
            >
              <i className="fas fa-chart-pie"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li className={currentPage === "reports" ? "active" : ""}>
            <Link to="/reports" onClick={() => handleMenuItemClick("reports")}>
              <i className="fas fa-chart-line"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li className={currentPage === "settings" ? "active" : ""}>
            <Link
              to="/settings"
              onClick={() => handleMenuItemClick("settings")}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("logout");
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
        <header className="topbar d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="icon me-3"
              onClick={toggleDesktop}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div>
              <h1 className="h5 mb-0 fw-bold">Assignments Dashboard</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Create, track and manage every student assignment.
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
            <Link to="/profile" className="d-inline-block">
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
          <div className="row g-3 mb-4">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Total Assignments</h3>
                  <p className="fs-3 fw-bold mb-0">{totalAssignments}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Submitted</h3>
                  <p className="fs-3 fw-bold mb-0">{totalSubmissions}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Overdue</h3>
                  <p className="fs-3 fw-bold mb-0">{overdueCount}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Avg Submission %</h3>
                  <p className="fs-3 fw-bold mb-0">{avgSubmission}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <div className="data-section mb-4">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search title / course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ maxWidth: "300px" }}
              />
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ maxWidth: "180px" }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="overdue">Overdue</option>
              </select>
              <select
                className="form-select"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                style={{ maxWidth: "180px" }}
              >
                <option value="all">All Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={() => openModal()}>
                <i className="fas fa-plus me-1"></i> New Assignment
              </button>
            </div>

            {/* Assignments Grid */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filtered.map((a) => {
                const subPct = Math.round(
                  (a.submissions / a.totalStudents) * 100
                );
                const statClass = statusClass(
                  a.submissions,
                  a.totalStudents,
                  a.dueDate
                );
                const statText = statusText(
                  a.submissions,
                  a.totalStudents,
                  a.dueDate
                );

                const statusBadgeClass =
                  {
                    overdue: "bg-danger",
                    submitted: "bg-success",
                    pending: "bg-warning",
                  }[statClass] || "bg-secondary";

                return (
                  <div className="col" key={a.id}>
                    <div className="card h-100 assignment-card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title mb-0">{a.title}</h5>
                          <span className={`badge ${statusBadgeClass}`}>
                            {statText}
                          </span>
                        </div>
                        <p className="card-text text-muted small mb-2">
                          <i className="fas fa-book me-1"></i> {a.course}
                        </p>
                        <p className="card-text text-muted small mb-3">
                          <i className="fas fa-calendar-alt me-1"></i> Due:{" "}
                          {a.dueDate} |<i className="fas fa-star me-1 ms-2"></i>{" "}
                          Max: {a.maxScore} pts
                        </p>
                        <p className="card-text mb-4">{a.description}</p>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">
                              Submissions: {a.submissions}/{a.totalStudents}
                            </small>
                            <small className="text-muted">{subPct}%</small>
                          </div>
                          <div className="progress" style={{ height: "6px" }}>
                            <div
                              className={`progress-bar ${statusBadgeClass}`}
                              style={{ width: `${subPct}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => submitAssignment(a.id)}
                            disabled={a.submissions >= a.totalStudents}
                          >
                            <i className="fas fa-check me-1"></i> Quick Submit
                          </button>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openModal(a.id)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteAssignment(a.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop show d-flex align-items-center justify-content-center">
          <div
            className="modal-content bg-white rounded p-4"
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">
                {editingId ? "Edit Assignment" : "New Assignment"}
              </h2>
              <button className="btn btn-close" onClick={closeModal}></button>
            </div>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Essay on Data Structures"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Course *</label>
                <select
                  className="form-select"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  required
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Brief description..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Due Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Max Score *</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={form.maxScore}
                  onChange={(e) =>
                    setForm({ ...form, maxScore: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveAssignment}>
                  Save Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Remove ugly scrollbar icons and styling */
        .manager-dashboard::-webkit-scrollbar,
        .sidebar::-webkit-scrollbar,
        .main-content::-webkit-scrollbar,
        .menu::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .manager-dashboard::-webkit-scrollbar-track,
        .sidebar::-webkit-scrollbar-track,
        .main-content::-webkit-scrollbar-track,
        .menu::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .manager-dashboard::-webkit-scrollbar-thumb,
        .sidebar::-webkit-scrollbar-thumb,
        .main-content::-webkit-scrollbar-thumb,
        .menu::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .manager-dashboard::-webkit-scrollbar-thumb:hover,
        .sidebar::-webkit-scrollbar-thumb:hover,
        .main-content::-webkit-scrollbar-thumb:hover,
        .menu::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        /* Hide scrollbar by default, show on hover */
        .sidebar {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        .main-content {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        /* Firefox scrollbar */
        @supports (scrollbar-width: thin) {
          .sidebar,
          .main-content {
            scrollbar-width: thin;
            scrollbar-color: #c1c1c1 #f1f1f1;
          }
        }

        .assignment-card {
          transition: transform 0.2s;
          border: 1px solid #e9ecef;
        }

        .assignment-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1050;
        }

        .modal-content {
          max-height: 90vh;
          overflow-y: auto;
        }

        .manager-dashboard {
          display: flex;
          min-height: 100vh;
          overflow: hidden; /* Prevent double scrolling */
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
          flex-shrink: 0; /* Prevent header from shrinking */
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
          overflow-y: auto; /* Allow menu to scroll */
          padding-bottom: 20px; /* Space at bottom */
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

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          padding: 20px 0;
        }

        .sidebar.collapsed .menu li a span {
          display: none;
        }

        .main-content {
          margin-left: 240px;
          min-height: 100vh;
          transition: margin-left 0.3s;
          width: calc(100vw - 240px);
          display: flex;
          flex-direction: column;
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

        .topbar {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin: 15px 15px 1.5rem 15px;
          padding: 1rem 1.5rem !important;
          min-height: 80px; /* Match departments page */
          flex-shrink: 0;
          display: flex;
          align-items: center;
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
        }

        .icon:hover {
          background: #1a237e;
          color: #fff;
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #1a237e;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
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

        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 15px 15px 15px;
        }

        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        .dashboard-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
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
          }

          .mobile-menu-btn {
            display: flex;
          }

          .topbar {
            margin-top: 70px;
          }
        }

        @media (max-width: 768px) {
          .topbar {
            padding: 1rem !important;
            min-height: 70px;
            margin: 12px 12px 15px 12px;
          }

          .dashboard-card {
            padding: 18px;
          }
        }

        @media (max-width: 576px) {
          .topbar {
            padding: 0.8rem !important;
            min-height: 65px;
            margin: 10px 8px 15px 8px;
          }

          .dashboard-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Assignments;
