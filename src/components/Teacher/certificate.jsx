import React, { useState, useEffect } from "react";
import "./styles.css";
const Certificates = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      studentName: "Sarah Kim",
      course: "Web Development Mastery",
      completionDate: "Oct 10, 2025",
      status: "issued",
    },
    {
      id: 2,
      studentName: "David Brown",
      course: "Data Science Essentials",
      completionDate: "Oct 25, 2025",
      status: "requested",
    },
    {
      id: 3,
      studentName: "Lisa Wong",
      course: "UI/UX Design",
      completionDate: "Oct 29, 2025",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Michael Chen",
      course: "Digital Marketing",
      completionDate: "Nov 1, 2025",
      status: "issued",
    },
    {
      id: 5,
      studentName: "Emma Johnson",
      course: "Python Programming",
      completionDate: "Nov 3, 2025",
      status: "requested",
    },
  ]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.getElementById("sidebar");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          !mobileMenuToggle?.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "requested":
        return "requested";
      case "issued":
        return "issued";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Not Requested";
      case "requested":
        return "Pending Manager";
      case "issued":
        return "Issued";
      default:
        return status;
    }
  };

  const calculateStats = () => {
    const completed = certificates.length;
    const requested = certificates.filter(
      (c) => c.status === "requested"
    ).length;
    const issued = certificates.filter((c) => c.status === "issued").length;
    const awaiting = requested; // Same as requested count
    return { completed, requested, issued, awaiting };
  };

  const { completed, requested, issued, awaiting } = calculateStats();

  const handleRequestCertificate = (studentName, courseName) => {
    setCurrentStudent(studentName);
    setCurrentCourse(courseName);
    setShowModal(true);
  };

  const handleSubmitRequest = () => {
    setCertificates(
      certificates.map((cert) =>
        cert.studentName === currentStudent && cert.course === currentCourse
          ? { ...cert, status: "requested" }
          : cert
      )
    );
    setShowModal(false);
    alert(
      `Certificate request for ${currentStudent} submitted for manager confirmation.`
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStudent(null);
    setCurrentCourse(null);
  };

  const handleViewCertificate = (studentName, courseName, status) => {
    alert(
      `Viewing Certificate:\nStudent: ${studentName}\nCourse: ${courseName}\nStatus: ${getStatusText(
        status
      )}`
    );
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    const parent = e.currentTarget.parentElement;
    parent.classList.toggle("open");

    // Close other submenus
    document.querySelectorAll(".has-submenu").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("open");
      }
    });
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
        id="sidebar"
      >
        <div className="sidebar-header">
          <h2>E-Learn</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li className="active">
              <a href="#">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="has-submenu">
              <a href="#" className="submenu-toggle" onClick={toggleSubmenu}>
                <i className="fas fa-layer-group"></i>
                <span>Courses</span>
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "auto" }}
                ></i>
              </a>
              <div className="submenu">
                <a href="../student-dashboard/all-courses.html">All Courses</a>
                <a href="myCourses.html">My Courses</a>
              </div>
            </li>
            <li className="has-submenu">
              <a href="#" className="submenu-toggle" onClick={toggleSubmenu}>
                <i className="fas fa-user-graduate"></i>
                <span>Students</span>
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "auto" }}
                ></i>
              </a>
              <div className="submenu">
                <a href="all-students.html">All Students</a>
                <a href="student-details.html">Student Details</a>
              </div>
            </li>
            <li>
              <a href="assignment.html">
                <i className="fas fa-tasks"></i>
                <span>Assignments</span>
              </a>
            </li>
            <li>
              <a href="grades.html">
                <i className="fas fa-graduation-cap"></i>
                <span>Grades</span>
              </a>
            </li>
            <li>
              <a href="certificates.html">
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </a>
            </li>
            <div className="menu-spacer"></div>
            <li>
              <a href="settings.html">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar - WITH IMPORTANT ICONS */}
        <header className="topbar">
          <div className="topbar-left">
            <div
              className="icon"
              id="desktopMenuToggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h2>Certificate Management</h2>
              <p className="d-none d-md-block">
                Issue, manage, and track student certificates
              </p>
            </div>
          </div>
          <div className="user-area">
            {/* IMPORTANT ICONS FOR SMALL SCREENS */}
            <a href="#" className="icon position-relative d-none d-sm-flex">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt"></i>
            </a>
            <a href="teacher.profile.html">
              <img src="https://i.pravatar.cc/100?img=8" alt="Teacher" />
            </a>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="cards">
          <div className="card">
            <i className="fas fa-users"></i>
            <h3>Students Completed</h3>
            <p>{completed}</p>
          </div>
          <div className="card">
            <i className="fas fa-certificate"></i>
            <h3>Certificates Requested</h3>
            <p>{requested + issued}</p>
          </div>
          <div className="card">
            <i className="fas fa-check-circle"></i>
            <h3>Certificates Approved</h3>
            <p>{issued}</p>
          </div>
          <div className="card">
            <i className="fas fa-clock"></i>
            <h3>Awaiting Manager</h3>
            <p>{awaiting}</p>
          </div>
        </section>

        {/* Student Certificate Table */}
        <section className="certificate-section">
          <div className="section-header">
            <h3>Completed Students</h3>
          </div>
          <div className="table-responsive">
            <table className="certificate-table" id="certificateTable">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Completion Date</th>
                  <th>Certificate Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td data-label="Student Name">{cert.studentName}</td>
                    <td data-label="Course">{cert.course}</td>
                    <td data-label="Completion Date">{cert.completionDate}</td>
                    <td data-label="Certificate Status">
                      <span className={`status ${getStatusClass(cert.status)}`}>
                        {getStatusText(cert.status)}
                      </span>
                    </td>
                    <td data-label="Action">
                      {cert.status === "pending" ? (
                        <button
                          className="btn request"
                          onClick={() =>
                            handleRequestCertificate(
                              cert.studentName,
                              cert.course
                            )
                          }
                        >
                          <i className="fas fa-paper-plane"></i> Request
                        </button>
                      ) : (
                        <button
                          className="btn view"
                          onClick={() =>
                            handleViewCertificate(
                              cert.studentName,
                              cert.course,
                              cert.status
                            )
                          }
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Request Confirmation Modal */}
      {showModal && (
        <div className="modal" id="requestModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3>Request Certificate</h3>
            <p id="modalInfo">
              Request certificate for {currentStudent} — "{currentCourse}"?
              <br />
              (Manager confirmation required.)
            </p>
            <div className="modal-actions">
              <button className="btn request" onClick={handleSubmitRequest}>
                <i className="fas fa-paper-plane"></i> Confirm Request
              </button>
              <button className="btn cancel" onClick={handleModalClose}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
