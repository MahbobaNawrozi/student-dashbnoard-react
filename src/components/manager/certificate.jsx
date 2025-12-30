import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Certificates = () => {
  const sidebarRef = useRef(null);
  const contentAreaRef = useRef(null);
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [certificates, setCertificates] = useState([
    // ... your certificates data (same as before)
    {
      id: 1,
      student: "Alice Johnson",
      course: "Data Structures",
      issueDate: "2025-11-01",
      expiryDate: "2026-11-01",
      grade: "A+",
      status: "issued",
      downloaded: false,
    },
    {
      id: 2,
      student: "Bob Smith",
      course: "Marketing 101",
      issueDate: "2025-10-15",
      expiryDate: null,
      grade: "B",
      status: "pending",
      downloaded: false,
    },
    {
      id: 3,
      student: "Carol Lee",
      course: "Calculus II",
      issueDate: "2025-09-20",
      expiryDate: "2025-12-20",
      grade: "A",
      status: "downloaded",
      downloaded: true,
    },
    {
      id: 4,
      student: "David Kim",
      course: "Web Development",
      issueDate: "2025-08-10",
      expiryDate: "2025-08-10",
      grade: "A-",
      status: "expired",
      downloaded: true,
    },
    {
      id: 5,
      student: "Emma Wilson",
      course: "UI/UX Design",
      issueDate: "2025-11-05",
      expiryDate: null,
      grade: "A+",
      status: "issued",
      downloaded: false,
    },
    {
      id: 6,
      student: "Frank Miller",
      course: "Machine Learning",
      issueDate: "2025-10-28",
      expiryDate: "2026-10-28",
      grade: "B+",
      status: "issued",
      downloaded: true,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    student: "",
    course: "",
    issueDate: "",
    expiryDate: "",
    grade: "",
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

  const today = () => new Date().toISOString().split("T")[0];
  const isExpired = (d) => d && new Date(d) < new Date();

  const totalIssued = certificates.length;
  const pendingReq = certificates.filter((c) => c.status === "pending").length;
  const downloaded = certificates.filter((c) => c.downloaded).length;
  const expired = certificates.filter((c) => isExpired(c.expiryDate)).length;

  const students = [...new Set(certificates.map((c) => c.student))];
  const courses = [...new Set(certificates.map((c) => c.course))];

  const filtered = certificates.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    const q = searchQuery.toLowerCase();
    if (
      q &&
      !c.student.toLowerCase().includes(q) &&
      !c.course.toLowerCase().includes(q) &&
      !c.status.toLowerCase().includes(q)
    )
      return false;
    return true;
  });

  const openModal = (id = null) => {
    if (id) {
      const c = certificates.find((cert) => cert.id === id);
      setForm({
        student: c.student,
        course: c.course,
        issueDate: c.issueDate,
        expiryDate: c.expiryDate || "",
        grade: c.grade,
      });
      setEditingId(id);
    } else {
      setForm({
        student: "",
        course: "",
        issueDate: today(),
        expiryDate: "",
        grade: "",
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const saveCertificate = () => {
    if (
      !form.student ||
      !form.course ||
      !form.issueDate ||
      !form.grade.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (editingId) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, ...form, expiryDate: form.expiryDate || null }
            : c
        )
      );
    } else {
      setCertificates((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          expiryDate: form.expiryDate || null,
          status: "pending",
          downloaded: false,
        },
      ]);
    }
    closeModal();
  };

  const deleteCertificate = (id) => {
    if (!confirm("Delete this certificate?")) return;
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  const issueCert = (id) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "issued", issueDate: today() } : c
      )
    );
  };

  const downloadCert = (id) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, downloaded: true, status: "downloaded" } : c
      )
    );
    alert("Certificate downloaded (simulated).");
  };

  const [btnText, setBtnText] = useState("Issue Certificate");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 360) setBtnText(<i className="fas fa-plus" />);
      else if (window.innerWidth <= 480)
        setBtnText(
          <>
            <i className="fas fa-plus me-1" /> Issue
          </>
        );
      else
        setBtnText(
          <>
            <i className="fas fa-plus me-1" /> Issue Certificate
          </>
        );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 992) {
      sidebarRef.current?.classList.remove("collapsed");
    }
  }, []);

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
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/departments" ? "active" : ""}>
            <Link to="/departments">
              <i className="fas fa-layer-group"></i>
              <span>Departments</span>
            </Link>
          </li>
          <li className={location.pathname === "/courses" ? "active" : ""}>
            <Link to="/courses">
              <i className="fas fa-book"></i>
              <span>Courses</span>
            </Link>
          </li>
          <li className={location.pathname === "/heads" ? "active" : ""}>
            <Link to="/heads">
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Heads</span>
            </Link>
          </li>
          <li className={location.pathname === "/teachers" ? "active" : ""}>
            <Link to="/teachers">
              <i className="fas fa-chalkboard-teacher"></i>
              <span>Teachers</span>
            </Link>
          </li>
          <li className={location.pathname === "/students" ? "active" : ""}>
            <Link to="/students">
              <i className="fas fa-user-graduate"></i>
              <span>Students</span>
            </Link>
          </li>
          <li className={location.pathname === "/assignments" ? "active" : ""}>
            <Link to="/assignments">
              <i className="fas fa-tasks"></i>
              <span>Assignments</span>
            </Link>
          </li>
          <li className={location.pathname === "/grades" ? "active" : ""}>
            <Link to="/grades">
              <i className="fas fa-graduation-cap"></i>
              <span>Grades</span>
            </Link>
          </li>
          <li className={location.pathname === "/certificates" ? "active" : ""}>
            <Link to="/certificates">
              <i className="fas fa-certificate"></i>
              <span>Certificates</span>
            </Link>
          </li>
          <li className={location.pathname === "/analytics" ? "active" : ""}>
            <Link to="/analytics">
              <i className="fas fa-chart-pie"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li className={location.pathname === "/reports" ? "active" : ""}>
            <Link to="/reports">
              <i className="fas fa-chart-line"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li
            className={location.pathname === "/announcements" ? "active" : ""}
          >
            <Link to="/announcements">
              <i className="fas fa-bullhorn"></i>
              <span>Announcements</span>
            </Link>
          </li>
          <li className={location.pathname === "/settings" ? "active" : ""}>
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
              <h1 className="h5 mb-0 fw-bold">Certificates</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Issue, track and manage student certificates
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

        {/* Main Content Area */}
        <div className="content-area" ref={contentAreaRef}>
          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Total Issued</h3>
                  <p className="fs-3 fw-bold mb-0">{totalIssued}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Pending Requests</h3>
                  <p className="fs-3 fw-bold mb-0">{pendingReq}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-download"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Downloaded</h3>
                  <p className="fs-3 fw-bold mb-0">{downloaded}</p>
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
                  <p className="fs-3 fw-bold mb-0">{expired}</p>
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
                placeholder="Search student / course / status..."
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
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
                <option value="downloaded">Downloaded</option>
                <option value="expired">Expired</option>
              </select>
              <button className="btn btn-primary" onClick={() => openModal()}>
                {btnText}
              </button>
            </div>

            {/* Certificates Grid */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filtered.map((c) => {
                const isExp = isExpired(c.expiryDate);
                const badgeClass =
                  c.status === "issued" && !isExp
                    ? "bg-success"
                    : c.status === "pending"
                    ? "bg-warning"
                    : isExp
                    ? "bg-secondary"
                    : "bg-info";
                const badgeText =
                  c.status === "issued" && !isExp
                    ? "Valid"
                    : c.status === "pending"
                    ? "Pending"
                    : isExp
                    ? "Expired"
                    : "Downloaded";
                return (
                  <div className="col" key={c.id}>
                    <div className="card h-100 certificate-card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title mb-0">{c.course}</h5>
                          <span className={`badge ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </div>
                        <p className="card-text text-muted small mb-2">
                          <i className="fas fa-user me-1"></i> {c.student}
                        </p>
                        <p className="card-text text-muted small mb-2">
                          <i className="fas fa-calendar-alt me-1"></i> Issued:{" "}
                          {c.issueDate}
                        </p>
                        {c.expiryDate && (
                          <p className="card-text text-muted small mb-3">
                            <i className="fas fa-calendar-times me-1"></i>{" "}
                            Expires: {c.expiryDate}
                          </p>
                        )}
                        <p className="card-text mb-4">
                          <strong>Grade:</strong> {c.grade}
                        </p>

                        <div className="d-flex justify-content-between">
                          <div>
                            {c.status === "issued" && !c.downloaded && (
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => downloadCert(c.id)}
                              >
                                <i className="fas fa-download me-1"></i>{" "}
                                Download
                              </button>
                            )}
                            {c.status === "pending" && (
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => issueCert(c.id)}
                              >
                                <i className="fas fa-check me-1"></i> Issue
                              </button>
                            )}
                          </div>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openModal(c.id)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteCertificate(c.id)}
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
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">
                {editingId ? "Edit Certificate" : "Issue Certificate"}
              </h2>
              <button className="btn btn-close" onClick={closeModal}></button>
            </div>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Student</label>
                <select
                  className="form-select"
                  value={form.student}
                  onChange={(e) =>
                    setForm({ ...form, student: e.target.value })
                  }
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Course</label>
                <select
                  className="form-select"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Issue Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.issueDate}
                  onChange={(e) =>
                    setForm({ ...form, issueDate: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.expiryDate}
                  onChange={(e) =>
                    setForm({ ...form, expiryDate: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Grade / Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. A+ or 92%"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveCertificate}>
                  Save Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles with Custom Scrollbars */}
      <style>{`
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

        /* Custom scrollbar for sidebar */
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

        /* Firefox */
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

        /* Custom scrollbar for content area */
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

        /* Firefox */
        .content-area {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

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

        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        .certificate-card {
          transition: transform 0.2s;
          border: 1px solid #e9ecef;
        }
        
        .certificate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

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

        /* Custom scrollbar for modal */
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

          /* Hide scrollbar on mobile for better UX */
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

export default Certificates;
