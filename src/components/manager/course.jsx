import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const sidebarRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [courses, setCourses] = useState([
    {
      title: "Algebra II",
      subject: "Mathematics",
      level: "Intermediate",
      type: "Self-Paced",
      instructor: "Mr. Smith",
      students: 120,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1509223197845-458d87318791",
    },
    {
      title: "Physics Fundamentals",
      subject: "Science",
      level: "Advanced",
      type: "Teacher-Led",
      instructor: "Dr. Wilson",
      students: 80,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1537432376769-00a2c5f0f9b4",
    },
    {
      title: "World History",
      subject: "History",
      level: "Beginner",
      type: "Teacher-Led",
      instructor: "Mrs. Brown",
      students: 95,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1549899593-ec9e4903c6f6",
    },
    {
      title: "English Literature",
      subject: "Language Arts",
      level: "Intermediate",
      type: "Self-Paced",
      instructor: "Mr. Green",
      students: 110,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    },
    {
      title: "Chemistry Basics",
      subject: "Science",
      level: "Beginner",
      type: "Teacher-Led",
      instructor: "Dr. Adams",
      students: 65,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1581091870627-3c88d9f1d6c3",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [filtered, setFiltered] = useState(courses);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "Science",
    level: "Beginner",
    type: "Self-Paced",
    instructor: "",
    imgUrl: "",
    desc: "",
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

  useEffect(() => {
    const res = courses.filter(
      (c) =>
        (!search || c.title.toLowerCase().includes(search.toLowerCase())) &&
        (!category || c.subject === category) &&
        (!level || c.level === level) &&
        (!type || c.type === type)
    );
    setFiltered(res);
  }, [search, category, level, type, courses]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const saveCourse = () => {
    if (!form.title.trim() || !form.instructor.trim()) {
      alert("Title & Instructor are required.");
      return;
    }
    const newCourse = {
      ...form,
      students: 0,
      rating: 0,
      img:
        form.imgUrl.trim() ||
        "https://images.unsplash.com/photo-1509223197845-458d87318791",
    };
    setCourses((prev) => [...prev, newCourse]);
    closeModal();
    setForm({
      title: "",
      subject: "Science",
      level: "Beginner",
      type: "Self-Paced",
      instructor: "",
      imgUrl: "",
      desc: "",
    });
  };

  const total = courses.length;
  const selfPaced = courses.filter((c) => c.type === "Self-Paced");
  const teacherLed = courses.filter((c) => c.type === "Teacher-Led");

  const viewSelfPaced = () => setType("Self-Paced");
  const viewTeacherLed = () => setType("Teacher-Led");

  // Get current page for active menu highlighting
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path.includes("course")) return "courses";
    if (path.includes("department")) return "departments";
    if (path.includes("head")) return "heads";
    if (path.includes("teacher")) return "teachers";
    if (path.includes("student")) return "students";
    if (path.includes("assignment")) return "assignments";
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
              <h1 className="h5 mb-0 fw-bold">All Courses</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Browse, filter and manage every course in the academy.
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

        {/* Filter bar */}
        <div className="filter-bar mb-4">
          <div className="d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "250px" }}
            />
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ maxWidth: "180px" }}
            >
              <option value="">All Subjects</option>
              <option>Science</option>
              <option>Mathematics</option>
              <option>History</option>
              <option>Language Arts</option>
            </select>
            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{ maxWidth: "180px" }}
            >
              <option value="">All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ maxWidth: "180px" }}
            >
              <option value="">All Types</option>
              <option>Self-Paced</option>
              <option>Teacher-Led</option>
            </select>
            <button className="btn btn-primary" onClick={openModal}>
              <i className="fas fa-plus" /> Add Course
            </button>
          </div>
        </div>

        <div className="content-area">
          <div className="row">
            {/* Courses grid */}
            <div className="col-lg-9">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filtered.map((c, idx) => {
                  const typeClass =
                    c.type === "Self-Paced" ? "bg-info" : "bg-success";
                  const typeIcon =
                    c.type === "Self-Paced"
                      ? "fa-clock"
                      : "fa-chalkboard-teacher";
                  return (
                    <div className="col" key={idx}>
                      <div className="card h-100 course-card">
                        <div
                          className="card-img-top course-img"
                          style={{
                            height: "180px",
                            backgroundImage: `url('${c.img}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{c.title}</h5>
                          <p className="card-text text-muted mb-1">
                            {c.subject} | {c.level}
                          </p>
                          <p className="card-text mb-2">
                            <i className="fas fa-user me-1"></i> {c.instructor}
                          </p>
                          <span className={`badge ${typeClass} mb-3`}>
                            <i className={`fas ${typeIcon} me-1`} /> {c.type}
                          </span>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="text-muted">
                              <i className="fas fa-users me-1"></i> {c.students}{" "}
                              students
                            </span>
                            <span className="text-warning">
                              <i className="fas fa-star me-1"></i> {c.rating}
                            </span>
                          </div>
                          <button className="btn btn-outline-primary w-100 mt-3">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights panel */}
            <div className="col-lg-3">
              <div className="data-section">
                <h3 className="h5 fw-bold mb-3">
                  <i className="fas fa-lightbulb me-2"></i> Course Insights
                </h3>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center p-3 bg-light rounded">
                    <i className="fas fa-book fs-4 text-primary me-3"></i>
                    <div>
                      <h6 className="mb-0">Total Courses</h6>
                      <span className="fs-5 fw-bold">{total}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center p-3 bg-light rounded">
                    <i className="fas fa-clock fs-4 text-info me-3"></i>
                    <div>
                      <h6 className="mb-0">Self-Paced Courses</h6>
                      <span className="fs-5 fw-bold">{selfPaced.length}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center p-3 bg-light rounded">
                    <i className="fas fa-chalkboard-teacher fs-4 text-success me-3"></i>
                    <div>
                      <h6 className="mb-0">Teacher-Led Courses</h6>
                      <span className="fs-5 fw-bold">{teacherLed.length}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center p-3 bg-light rounded">
                    <i className="fas fa-users fs-4 text-warning me-3"></i>
                    <div>
                      <h6 className="mb-0">Students in Self-Paced</h6>
                      <span className="fs-5 fw-bold">
                        {selfPaced.reduce((a, b) => a + b.students, 0)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center p-3 bg-light rounded">
                    <i className="fas fa-user-graduate fs-4 text-danger me-3"></i>
                    <div>
                      <h6 className="mb-0">Students in Teacher-Led</h6>
                      <span className="fs-5 fw-bold">
                        {teacherLed.reduce((a, b) => a + b.students, 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2 mt-4">
                  <button
                    className="btn btn-outline-info"
                    onClick={viewSelfPaced}
                  >
                    View Self-Paced
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={viewTeacherLed}
                  >
                    View Teacher-Led
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add-course modal */}
      {modalOpen && (
        <div className="modal-backdrop show d-flex align-items-center justify-content-center">
          <div
            className="modal-content bg-white rounded p-4"
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">Add New Course</h2>
              <button className="btn btn-close" onClick={closeModal}></button>
            </div>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Subject</label>
                <select
                  className="form-select"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                >
                  <option>Science</option>
                  <option>Mathematics</option>
                  <option>History</option>
                  <option>Language Arts</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Level</label>
                <select
                  className="form-select"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Course Type</label>
                <select
                  className="form-select"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>Self-Paced</option>
                  <option>Teacher-Led</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Instructor *</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.instructor}
                  onChange={(e) =>
                    setForm({ ...form, instructor: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Optional - leave blank for default"
                  value={form.imgUrl}
                  onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveCourse}>
                  Save Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .course-card {
          transition: transform 0.2s;
          border: 1px solid #e9ecef;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .course-img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .filter-bar {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin: 0 15px 15px 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
          overflow-y: auto !important;
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
          margin-left: 240px;
          height: 100vh;
          transition: margin-left 0.3s;
          display: flex;
          flex-direction: column;
          flex: 1;
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

        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 15px 15px 15px;
          margin-bottom: 15px;
        }

        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
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
        }
      `}</style>
    </div>
  );
};

export default Courses;
