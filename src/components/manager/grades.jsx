import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GradesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [grades, setGrades] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      course: "Data Structures",
      dept: "CS",
      assessment: "Mid-Term",
      score: 88,
    },
    {
      id: 2,
      student: "Bob Smith",
      course: "Marketing 101",
      dept: "Business",
      assessment: "Quiz 2",
      score: 72,
    },
    {
      id: 3,
      student: "Carol Lee",
      course: "Calculus II",
      dept: "Mathematics",
      assessment: "Final",
      score: 95,
    },
    {
      id: 4,
      student: "David Kim",
      course: "Web Development",
      dept: "IT",
      assessment: "Project",
      score: 67,
    },
    {
      id: 5,
      student: "Emma Wilson",
      course: "Physics I",
      dept: "Science",
      assessment: "Lab Report",
      score: 91,
    },
    {
      id: 6,
      student: "Frank Miller",
      course: "History 101",
      dept: "Humanities",
      assessment: "Essay",
      score: 78,
    },
  ]);

  const [filters, setFilters] = useState({
    course: "all",
    dept: "all",
    search: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    student: "",
    course: "",
    assessment: "",
    score: "",
  });

  const [nextId, setNextId] = useState(7);

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
    if (path.includes("announcement")) return "announcement";
    if (path.includes("analytic")) return "analytics";
    if (path.includes("report")) return "reports";
    if (path.includes("setting")) return "settings";
    return "dashboard";
  };

  const currentPage = getCurrentPage();

  const letterGrade = (score) =>
    score >= 90
      ? "A"
      : score >= 80
      ? "B"
      : score >= 70
      ? "C"
      : score >= 60
      ? "D"
      : "F";

  const gradeClass = (score) => {
    const grade = letterGrade(score);
    switch (grade) {
      case "A":
        return "badge bg-success";
      case "B":
        return "badge bg-primary";
      case "C":
        return "badge bg-warning";
      case "D":
        return "badge bg-danger";
      case "F":
        return "badge bg-dark";
      default:
        return "badge bg-secondary";
    }
  };

  const calculateKPI = () => {
    const totalEntries = grades.length;
    const avgGrade =
      grades.length > 0
        ? Math.round(grades.reduce((a, b) => a + b.score, 0) / grades.length)
        : 0;
    const topGrades = grades.filter((g) => g.score >= 90).length;
    const lowGrades = grades.filter((g) => g.score < 70).length;

    return { totalEntries, avgGrade, topGrades, lowGrades };
  };

  const kpi = calculateKPI();

  const filteredGrades = grades.filter((grade) => {
    if (filters.course !== "all" && grade.course !== filters.course)
      return false;
    if (filters.dept !== "all" && grade.dept !== filters.dept) return false;
    if (
      filters.search &&
      !grade.student.toLowerCase().includes(filters.search.toLowerCase()) &&
      !grade.course.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const courses = [...new Set(grades.map((g) => g.course))];
  const departments = [...new Set(grades.map((g) => g.dept))];
  const students = [...new Set(grades.map((g) => g.student))];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddGrade = () => {
    setForm({
      student: "",
      course: "",
      assessment: "",
      score: "",
    });
    setEditingId(null);
    setModalOpen(true);
  };

  const handleEditGrade = (id) => {
    const grade = grades.find((g) => g.id === id);
    setForm({
      student: grade.student,
      course: grade.course,
      assessment: grade.assessment,
      score: grade.score.toString(),
    });
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDeleteGrade = (id) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      setGrades(grades.filter((g) => g.id !== id));
    }
  };

  const handleSaveGrade = () => {
    const { student, course, assessment, score } = form;

    if (
      !student ||
      !course ||
      !assessment ||
      !score ||
      isNaN(parseInt(score)) ||
      parseInt(score) < 0 ||
      parseInt(score) > 100
    ) {
      alert("Please fill all fields correctly (score must be 0-100).");
      return;
    }

    let dept = "General";
    if (course.includes("Data") || course.includes("Web")) dept = "CS";
    else if (course.includes("Marketing") || course.includes("Economics"))
      dept = "Business";
    else if (course.includes("Calculus")) dept = "Mathematics";
    else if (course.includes("Physics") || course.includes("Chemistry"))
      dept = "Science";
    else if (course.includes("History")) dept = "Humanities";

    if (editingId) {
      setGrades(
        grades.map((grade) => {
          if (grade.id === editingId) {
            return {
              ...grade,
              student,
              course,
              dept,
              assessment,
              score: parseInt(score),
            };
          }
          return grade;
        })
      );
    } else {
      const newGrade = {
        id: nextId,
        student,
        course,
        dept,
        assessment,
        score: parseInt(score),
      };

      setGrades([...grades, newGrade]);
      setNextId(nextId + 1);
    }

    setModalOpen(false);
    setForm({
      student: "",
      course: "",
      assessment: "",
      score: "",
    });
    setEditingId(null);
  };

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
    <div className="manager-dashboard container-fluid p-0">
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
            <li className={currentPage === "announcement" ? "active" : ""}>
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
        {/* Topbar - Consistent with other pages */}
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
                  <h1 className="mb-1">Grades Dashboard</h1>
                  <p className="d-none d-md-block mb-0">
                    Enter, edit and analyze every student grade.
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

        <div className="container-fluid content-area">
          {/* KPI Cards - Responsive Grid */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-list"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Total Entries</h3>
                  <p className="fs-3 fw-bold mb-0">{kpi.totalEntries}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Average Grade</h3>
                  <p className="fs-3 fw-bold mb-0">
                    {grades.length === 0
                      ? "-"
                      : `${kpi.avgGrade} (${letterGrade(kpi.avgGrade)})`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">A+ / A</h3>
                  <p className="fs-3 fw-bold mb-0">{kpi.topGrades}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="dashboard-card text-center">
                <div className="card-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="card-info">
                  <h3 className="fs-6 text-muted mb-2">Below C</h3>
                  <p className="fs-3 fw-bold mb-0">{kpi.lowGrades}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <section className="data-section mb-4">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <select
                className="form-select"
                value={filters.course}
                onChange={(e) => handleFilterChange("course", e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={filters.dept}
                onChange={(e) => handleFilterChange("dept", e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Search student / course..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddGrade}>
                <i className="fas fa-plus me-1"></i> Add Grade
              </button>
            </div>

            {/* Grades Table - Responsive */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th data-label="Student">Student</th>
                    <th data-label="Course">Course</th>
                    <th data-label="Department">Department</th>
                    <th data-label="Assessment">Assessment</th>
                    <th data-label="Score">Score</th>
                    <th data-label="Grade">Grade</th>
                    <th data-label="Actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.length > 0 ? (
                    filteredGrades.map((grade) => (
                      <tr key={grade.id}>
                        <td data-label="Student">{grade.student}</td>
                        <td data-label="Course">{grade.course}</td>
                        <td data-label="Department">{grade.dept}</td>
                        <td data-label="Assessment">{grade.assessment}</td>
                        <td data-label="Score">{grade.score}</td>
                        <td data-label="Grade">
                          <span className={gradeClass(grade.score)}>
                            {letterGrade(grade.score)}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEditGrade(grade.id)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDeleteGrade(grade.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No grades found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
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
                {editingId ? "Edit Grade" : "Add Grade"}
              </h2>
              <button
                className="btn btn-close"
                onClick={() => setModalOpen(false)}
              ></button>
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
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student} value={student}>
                      {student}
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
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Assessment</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Final Exam"
                  value={form.assessment}
                  onChange={(e) =>
                    setForm({ ...form, assessment: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Score (0-100)</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="100"
                  value={form.score}
                  onChange={(e) => setForm({ ...form, score: e.target.value })}
                />
              </div>
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveGrade}>
                  Save Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

        /* ========= MODAL ========= */
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

          /* Filter buttons */
          .d-flex.flex-wrap.gap-2 {
            flex-direction: column;
          }

          .d-flex.flex-wrap.gap-2 > * {
            width: 100%;
            margin-bottom: 8px;
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

            .btn-group {
              width: 100%;
              justify-content: center;
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

export default GradesPage;
