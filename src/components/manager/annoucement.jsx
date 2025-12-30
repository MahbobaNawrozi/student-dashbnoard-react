// Announcements.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Announcements = () => {
  const sidebarRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to New Semester",
      content:
        "Classes start on 15 Jan 2025. Check your dashboards for timetables.",
      audience: "All",
      priority: "Normal",
      date: "2025-01-10",
      expiry: "2025-01-20",
      pinned: true,
    },
    {
      id: 2,
      title: "System Maintenance",
      content:
        "The platform will be offline tonight 02:00-04:00 AM for upgrades.",
      audience: "All",
      priority: "High",
      date: "2025-01-08",
      expiry: "2025-01-09",
      pinned: false,
    },
    {
      id: 3,
      title: "Teacher Training Workshop",
      content: "Mandatory workshop for all teaching staff on 20 Jan.",
      audience: "Teachers",
      priority: "Normal",
      date: "2025-01-05",
      expiry: "2025-01-19",
      pinned: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    audience: "All",
    priority: "Normal",
    expiry: "",
  });

  // Sidebar toggles
  const toggleDesktop = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  // Close sidebar on outside click (mobile)
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

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Utility functions
  const today = () => new Date().toISOString().slice(0, 10);
  const isExpired = (d) => d && d < today();
  const isActive = (ann) => !isExpired(ann.expiry);

  // KPI counts
  const totalPosts = announcements.length;
  const activePosts = announcements.filter(isActive).length;
  const pinnedPosts = announcements.filter((a) => a.pinned).length;
  const expiredPosts = announcements.filter((a) => !isActive(a)).length;

  // Filtered & sorted announcements
  const filtered = announcements
    .filter((a) => {
      if (statusFilter === "pinned") return a.pinned;
      if (statusFilter === "expired") return !isActive(a);
      if (statusFilter === "active") return isActive(a);
      return true;
    })
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  // Modal handlers
  const openModal = (id = null) => {
    if (id) {
      const a = announcements.find((an) => an.id === id);
      setForm({
        title: a.title,
        content: a.content,
        audience: a.audience,
        priority: a.priority,
        expiry: a.expiry || "",
      });
      setEditingId(id);
    } else {
      setForm({
        title: "",
        content: "",
        audience: "All",
        priority: "Normal",
        expiry: "",
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const saveAnnouncement = () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required.");
      return;
    }
    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, ...form, expiry: form.expiry || null }
            : a
        )
      );
    } else {
      setAnnouncements((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          date: today(),
          expiry: form.expiry || null,
          pinned: false,
        },
      ]);
    }
    closeModal();
  };

  const deleteAnnouncement = (id) => {
    if (!confirm("Delete this announcement?")) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const togglePin = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  };

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
        id="sidebar"
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <ul className="menu">
          <li className={currentPage === "dashboard" ? "active" : ""}>
            <Link to="/">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={currentPage === "departments" ? "active" : ""}>
            <Link to="/departments">
              <i className="fas fa-layer-group"></i>
              <span>Departments</span>
            </Link>
          </li>
          <li className={currentPage === "courses" ? "active" : ""}>
            <Link to="/courses">
              <i className="fas fa-book"></i>
              <span>Courses</span>
            </Link>
          </li>
          <li className={currentPage === "heads" ? "active" : ""}>
            <Link to="/heads">
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Heads</span>
            </Link>
          </li>
          <li className={currentPage === "teachers" ? "active" : ""}>
            <Link to="/teachers">
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Teachers</span>
            </Link>
          </li>
          <li className={currentPage === "students" ? "active" : ""}>
            <Link to="/students">
              <i className="fas fa-user-graduate"></i>
              <span>Students</span>
            </Link>
          </li>
          <li className={currentPage === "assignments" ? "active" : ""}>
            <Link to="/assignments">
              <i className="fas fa-tasks"></i>
              <span>Assignments</span>
            </Link>
          </li>
          <li className={currentPage === "grades" ? "active" : ""}>
            <Link to="/grades">
              <i className="fas fa-graduation-cap"></i>
              <span>Grades</span>
            </Link>
          </li>
          <li className={currentPage === "announcements" ? "active" : ""}>
            <Link to="/announcements">
              <i className="fas fa-bullhorn"></i>
              <span>Announcements</span>
            </Link>
          </li>
          <li className={currentPage === "certificates" ? "active" : ""}>
            <Link to="/certificates">
              <i className="fas fa-certificate"></i>
              <span>Certificates</span>
            </Link>
          </li>
          <li className={currentPage === "analytics" ? "active" : ""}>
            <Link to="/analytics">
              <i className="fas fa-chart-pie"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li className={currentPage === "reports" ? "active" : ""}>
            <Link to="/reports">
              <i className="fas fa-chart-line"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li className={currentPage === "settings" ? "active" : ""}>
            <Link to="/settings">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("Logout clicked");
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
              <h1 className="h5 mb-0 fw-bold">Announcements</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Create, publish and manage academy-wide announcements.
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
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Total Posts</h3>
                  <p className="fs-3 fw-bold mb-0">{totalPosts}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Active</h3>
                  <p className="fs-3 fw-bold mb-0">{activePosts}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-thumbtack"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Pinned</h3>
                  <p className="fs-3 fw-bold mb-0">{pinnedPosts}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Expired</h3>
                  <p className="fs-3 fw-bold mb-0">{expiredPosts}</p>
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
                placeholder="Search title / content..."
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
                <option value="active">Active</option>
                <option value="pinned">Pinned</option>
                <option value="expired">Expired</option>
              </select>
              <button className="btn btn-primary" onClick={() => openModal()}>
                <i className="fas fa-plus me-1"></i> New Announcement
              </button>
            </div>

            {/* Announcements Grid */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filtered.map((a) => (
                <div className="col" key={a.id}>
                  <div className="card h-100 announcement-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title mb-0">{a.title}</h5>
                        <div>
                          {a.pinned && (
                            <span className="badge bg-warning me-1">
                              Pinned
                            </span>
                          )}
                          {!isActive(a) && (
                            <span className="badge bg-secondary">Expired</span>
                          )}
                        </div>
                      </div>
                      <p className="card-text text-muted small mb-2">
                        <i className="fas fa-calendar-alt me-1"></i> {a.date} |
                        <i className="fas fa-users me-1 ms-2"></i> {a.audience}{" "}
                        |
                        <span
                          className={`ms-2 badge ${
                            a.priority === "High"
                              ? "bg-danger"
                              : a.priority === "Urgent"
                              ? "bg-danger"
                              : "bg-info"
                          }`}
                        >
                          {a.priority}
                        </span>
                      </p>
                      <p className="card-text mb-4">{a.content}</p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                          {a.expiry ? `Expires: ${a.expiry}` : "No expiry"}
                        </div>
                        <div className="btn-group">
                          <button
                            className={`btn btn-sm ${
                              a.pinned ? "btn-warning" : "btn-outline-warning"
                            }`}
                            onClick={() => togglePin(a.id)}
                            title={a.pinned ? "Un-pin" : "Pin"}
                          >
                            <i className="fas fa-thumbtack"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => openModal(a.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteAnnouncement(a.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop show d-flex align-items-center justify-content-center">
          <div
            className="modal-content bg-white rounded p-4"
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">
                {editingId ? "Edit Announcement" : "New Announcement"}
              </h2>
              <button className="btn btn-close" onClick={closeModal}></button>
            </div>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Semester Start Date"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Content *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Detailed message..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Audience</label>
                <select
                  className="form-select"
                  value={form.audience}
                  onChange={(e) =>
                    setForm({ ...form, audience: e.target.value })
                  }
                >
                  <option value="All">All Users</option>
                  <option value="Students">Students Only</option>
                  <option value="Teachers">Teachers Only</option>
                  <option value="Managers">Managers Only</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveAnnouncement}>
                  Save Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ADD CSS HERE ==================== */}
      <style>{`
        /* Base styles */
        .manager-dashboard {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        /* Sidebar with custom scrollbar */
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
          overflow-y: auto;
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .sidebar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
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
          flex-shrink: 0;
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

        /* Main Content */
        .main-content {
          margin-left: 240px;
          height: 100vh;
          transition: margin-left 0.3s;
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        .main-content.collapsed {
          margin-left: 80px;
        }

        /* Mobile Menu Button */
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

        /* Topbar */
        .topbar {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin: 15px 15px 1.5rem 15px;
          padding: 1rem 1.5rem !important;
          min-height: 70px;
          flex-shrink: 0;
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

        /* Content Area with custom scrollbar */
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 15px 15px 15px;
          margin-bottom: 15px;
        }

        .content-area::-webkit-scrollbar {
          width: 8px;
        }

        .content-area::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .content-area::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        .content-area::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        .content-area {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        /* Dashboard Cards */
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
          color: #fff;
        }

        .card-icon {
          background: linear-gradient(135deg, #1a237e, #1a237e);
          padding: 12px;
          border-radius: 10px;
          display: inline-block;
          margin-bottom: 10px;
        }

        /* Data Section */
        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        /* Announcement Cards */
        .announcement-card {
          transition: transform 0.2s;
          border: 1px solid #e9ecef;
        }
        
        .announcement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1050;
        }

        .modal-content {
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Responsive */
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
            margin-top: 60px;
          }

          .sidebar::-webkit-scrollbar,
          .content-area::-webkit-scrollbar {
            display: none;
          }

          .sidebar,
          .content-area {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Announcements;
