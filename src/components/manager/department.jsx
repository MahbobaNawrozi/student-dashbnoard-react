import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ELearningDepartments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [departments, setDepartments] = useState([
    {
      name: "Computer Science",
      head: "Dr. Alice Johnson",
      courses: 8,
      students: 220,
    },
    {
      name: "Business Administration",
      head: "Mr. Robert Green",
      courses: 5,
      students: 180,
    },
    { name: "Design", head: "Ms. Emma White", courses: 4, students: 120 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    head: "",
    courses: "",
    students: "",
  });

  const [summary, setSummary] = useState({
    totalDepts: 0,
    totalCourses: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    const totalDepts = departments.length;
    const totalCourses = departments.reduce(
      (sum, dept) => sum + dept.courses,
      0
    );
    const totalStudents = departments.reduce(
      (sum, dept) => sum + dept.students,
      0
    );

    setSummary({
      totalDepts,
      totalCourses,
      totalStudents,
    });
  }, [departments]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("dept", "").toLowerCase()]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.head.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newDept = {
      name: formData.name.trim(),
      head: formData.head.trim(),
      courses: parseInt(formData.courses) || 0,
      students: parseInt(formData.students) || 0,
    };

    if (editIndex !== null) {
      const updatedDepartments = [...departments];
      updatedDepartments[editIndex] = newDept;
      setDepartments(updatedDepartments);
    } else {
      setDepartments([...departments, newDept]);
    }

    setFormData({ name: "", head: "", courses: "", students: "" });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const dept = departments[index];
    setFormData({
      name: dept.name,
      head: dept.head,
      courses: dept.courses.toString(),
      students: dept.students.toString(),
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to remove this department?")) {
      const updatedDepartments = departments.filter((_, i) => i !== index);
      setDepartments(updatedDepartments);
    }
  };

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (
      window.innerWidth <= 992 &&
      !e.target.closest(".sidebar") &&
      !e.target.closest(".mobile-menu-btn")
    ) {
      setSidebarOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "index.html" },
    {
      icon: "fas fa-layer-group",
      label: "Departments",
      link: "departments.html",
      active: true,
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
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "certificate.html",
    },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "analytics.html" },
    { icon: "fas fa-chart-line", label: "Reports", link: "reports.html" },
    { icon: "fas fa-cog", label: "Settings", link: "setting.html" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  return (
    <div className="app container-fluid p-0" onClick={handleOutsideClick}>
      <button
        className="mobile-menu-btn d-lg-none"
        id="mobileMenuToggle"
        onClick={toggleMobileSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
        id="sidebar"
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
          <div className="menu-spacer"></div>
        </ul>
      </aside>

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
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
                  <h1 className="mb-1">Departments</h1>
                  <p className="d-none d-md-block mb-0">
                    Overview and management of every academy department.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-3 mt-lg-0">
              <div className="user-area d-flex justify-content-end align-items-center">
                <div className="icon me-2">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="icon me-2">
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

        {/* Cards */}
        <div className="container-fluid">
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-layer-group"></i>
                <h3>Total Departments</h3>
                <p id="totalDepts">{summary.totalDepts}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-book"></i>
                <h3>Total Courses</h3>
                <p id="totalCourses">{summary.totalCourses}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <div className="dashboard-card">
                <i className="fas fa-user-graduate"></i>
                <h3>Total Students</h3>
                <p id="totalStudents">{summary.totalStudents}</p>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <section className="data-section">
            <div className="button-bar">
              <h3 className="section-title mb-0">All Departments</h3>
              <button
                id="addDeptBtn"
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                <i className="fas fa-plus me-1"></i> Add Department
              </button>
            </div>

            <form
              id="addDeptForm"
              style={{ display: showForm ? "flex" : "none" }}
              onSubmit={handleSubmit}
              className="flex-column mt-3"
            >
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    id="deptName"
                    className="form-control"
                    placeholder="Department Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    id="deptHead"
                    className="form-control"
                    placeholder="Head of Department"
                    required
                    value={formData.head}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <input
                    type="number"
                    id="deptCourses"
                    className="form-control"
                    placeholder="Courses"
                    required
                    value={formData.courses}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="number"
                    id="deptStudents"
                    className="form-control"
                    placeholder="Students"
                    required
                    value={formData.students}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  id="saveDeptBtn"
                  type="submit"
                  className="btn btn-success"
                >
                  <i className="fas fa-check me-1"></i>
                  {editIndex !== null ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="cancel-btn btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: "",
                      head: "",
                      courses: "",
                      students: "",
                    });
                    setEditIndex(null);
                  }}
                >
                  <i className="fas fa-times me-1"></i> Cancel
                </button>
              </div>
            </form>

            <div className="table-responsive mt-4">
              <table id="departmentTable" className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Department Name</th>
                    <th scope="col">Head</th>
                    <th scope="col">Courses</th>
                    <th scope="col">Students</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept, index) => (
                    <tr key={index}>
                      <td data-label="Department Name">{dept.name}</td>
                      <td data-label="Head">{dept.head}</td>
                      <td data-label="Courses">{dept.courses}</td>
                      <td data-label="Students">{dept.students}</td>
                      <td data-label="Action">
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(index)}
                          >
                            <i className="fas fa-edit me-1"></i> Edit
                          </button>
                          <button
                            className="action-btn delete-btn btn btn-danger btn-sm"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="fas fa-trash me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

        .menu {
          list-style: none;
          margin-top: 1rem;
          padding: 0;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .menu::-webkit-scrollbar {
          display: none;
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

        .menu-spacer {
          flex-grow: 1;
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

        /* ========= KPI CARDS GRID ========= */
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

        /* ========= DATA SECTIONS ========= */
        .data-section {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 1.3rem;
          color: #1a237e;
          margin: 0;
          font-weight: 600;
        }

        .button-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
        }

        /* ========= FORM ========= */
        #addDeptForm {
          margin-top: 20px;
          background: #f8fafc;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          display: none;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        #saveDeptBtn {
          background: #10b981;
          color: #fff;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        #saveDeptBtn:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
        }

        .cancel-btn {
          background: #64748b;
          color: #fff;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cancel-btn:hover {
          background: #475569;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(100, 116, 139, 0.2);
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

        .delete-btn {
          background: #ef4444;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
        }

        .edit-btn {
          background: #1a237e;
        }

        .edit-btn:hover {
          background: #1a237e;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(26, 35, 126, 0.2);
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
        /* Large Desktop (≥ 1200px) */
        @media (min-width: 1200px) {
          .dashboard-card {
            padding: 24px;
          }
        }

        /* Desktop (≥ 992px) */
        @media (min-width: 992px) {
          .form-row {
            flex-wrap: nowrap;
          }
        }

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
          }

          .mobile-menu-btn {
            display: flex;
          }

          .button-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .button-bar h3 {
            text-align: center;
            margin-bottom: 10px;
          }

          .button-bar button {
            width: 100%;
          }
        }

        /* Tablet (≤ 768px) */
        @media (max-width: 768px) {
          .topbar {
            padding: 1rem;
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

          .section-title {
            font-size: 1.1rem;
          }

          #addDeptForm {
            padding: 15px;
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
          }

          #addDeptForm {
            padding: 14px;
          }

          .form-actions {
            flex-direction: column;
            gap: 8px;
          }

          #saveDeptBtn,
          .cancel-btn {
            width: 100%;
            justify-content: center;
          }

          /* Responsive table for mobile */
          @media (max-width: 576px) {
            table {
              display: block;
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
        }

        /* Extra Small Mobile (≤ 400px) */
        @media (max-width: 400px) {
          .topbar {
            padding: 0.7rem;
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

          .button-bar button {
            padding: 8px 12px;
            font-size: 13px;
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
      `}</style>
    </div>
  );
};

export default ELearningDepartments;
