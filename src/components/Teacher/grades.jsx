import React, { useState, useEffect } from "react";
import "./styles.css";
const Grades = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [gradeValue, setGradeValue] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      studentId: "STU101",
      assignment: "Final Project",
      grade: 88,
      status: "completed",
    },
    {
      id: 2,
      name: "Michael Lee",
      studentId: "STU102",
      assignment: "Final Project",
      grade: null,
      status: "pending",
    },
    {
      id: 3,
      name: "Sarah Kim",
      studentId: "STU103",
      assignment: "Midterm Exam",
      grade: 91,
      status: "completed",
    },
    {
      id: 4,
      name: "David Brown",
      studentId: "STU104",
      assignment: "Quiz 3",
      grade: 76,
      status: "completed",
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

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  const getStatusClass = (status) => {
    return status === "completed" ? "completed" : "pending";
  };

  const getStatusText = (status) => {
    return status === "completed" ? "Graded" : "Pending";
  };

  const calculateStats = () => {
    const coursesTaught = 4; // Fixed value from original
    const studentsGraded = students.filter(
      (s) => s.status === "completed"
    ).length;
    const pendingGrades = students.filter((s) => s.status === "pending").length;

    const gradedStudents = students.filter(
      (s) => s.status === "completed" && s.grade !== null
    );
    const classAverage =
      gradedStudents.length > 0
        ? Math.round(
            gradedStudents.reduce((sum, s) => sum + s.grade, 0) /
              gradedStudents.length
          )
        : 85; // Default value from original

    return { coursesTaught, studentsGraded, pendingGrades, classAverage };
  };

  const { coursesTaught, studentsGraded, pendingGrades, classAverage } =
    calculateStats();

  const handleOpenModal = (student, assignment, grade) => {
    setCurrentStudent(student);
    setCurrentAssignment(assignment);
    setGradeValue(grade !== null ? grade.toString() : "");
    setShowModal(true);

    // Focus on input after modal opens
    setTimeout(() => {
      const input = document.getElementById("gradeInput");
      if (input) input.focus();
    }, 100);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentStudent(null);
    setCurrentAssignment(null);
    setGradeValue("");
  };

  const handleSaveGrade = () => {
    const newGrade = gradeValue.trim();

    if (newGrade === "" || isNaN(newGrade) || newGrade < 0 || newGrade > 100) {
      alert("Please enter a valid grade between 0 and 100.");
      return;
    }

    setStudents(
      students.map((student) =>
        student.name === currentStudent &&
        student.assignment === currentAssignment
          ? {
              ...student,
              grade: parseInt(newGrade),
              status: "completed",
            }
          : student
      )
    );

    alert(`Grade of ${newGrade}% saved for ${currentStudent}.`);
    handleModalClose();
  };

  const handleGradeInputChange = (e) => {
    setGradeValue(e.target.value);
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
              <h2>Grade Management</h2>
              <p className="d-none d-md-block">
                Track, manage, and update student grades
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
            <i className="fas fa-chalkboard-teacher"></i>
            <h3>Courses Taught</h3>
            <p>{coursesTaught}</p>
          </div>
          <div className="card">
            <i className="fas fa-user-graduate"></i>
            <h3>Students Graded</h3>
            <p>{studentsGraded}</p>
          </div>
          <div className="card">
            <i className="fas fa-hourglass-half"></i>
            <h3>Pending Grades</h3>
            <p>{pendingGrades}</p>
          </div>
          <div className="card">
            <i className="fas fa-percentage"></i>
            <h3>Class Average</h3>
            <p>{classAverage}%</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="overview">
          <div className="panel">
            <h3>Class Performance Overview</h3>
            <div className="metric">
              <span>
                <strong>Assignment Completion</strong>
                <span>90%</span>
              </span>
              <div className="progress">
                <div className="progress-bar" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="metric">
              <span>
                <strong>Average Participation</strong>
                <span>78%</span>
              </span>
              <div className="progress">
                <div className="progress-bar" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div className="metric">
              <span>
                <strong>Timely Submissions</strong>
                <span>88%</span>
              </span>
              <div className="progress">
                <div className="progress-bar" style={{ width: "88%" }}></div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Top Performing Students</h3>
            <ul>
              <li>
                🏅 <strong>Sarah Kim</strong> <span>94%</span>
              </li>
              <li>
                🥈 <strong>David Brown</strong> <span>91%</span>
              </li>
              <li>
                🥉 <strong>Alice Johnson</strong> <span>89%</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Student Grade Table */}
        <section className="grade-section">
          <div className="section-header">
            <h3>Students in "Web Development"</h3>
          </div>
          <div className="table-responsive">
            <table className="grade-table" id="gradeTable">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>ID</th>
                  <th>Assignment</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td data-label="Student Name">{student.name}</td>
                    <td data-label="ID">{student.studentId}</td>
                    <td data-label="Assignment">{student.assignment}</td>
                    <td data-label="Grade">
                      {student.grade !== null ? `${student.grade}%` : "—"}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`status ${getStatusClass(student.status)}`}
                      >
                        {getStatusText(student.status)}
                      </span>
                    </td>
                    <td data-label="Action">
                      <button
                        className="btn edit"
                        onClick={() =>
                          handleOpenModal(
                            student.name,
                            student.assignment,
                            student.grade
                          )
                        }
                      >
                        <i className="fas fa-edit"></i>{" "}
                        {student.status === "pending" ? "Grade" : "Edit"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Grade Modal */}
      {showModal && (
        <div className="modal" id="gradeModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3>Grade Student</h3>
            <p id="studentInfo">
              {currentStudent} — {currentAssignment}
            </p>
            <input
              type="number"
              id="gradeInput"
              placeholder="Enter Grade (0–100)"
              min="0"
              max="100"
              value={gradeValue}
              onChange={handleGradeInputChange}
            />
            <div className="modal-actions">
              <button className="btn save" onClick={handleSaveGrade}>
                <i className="fas fa-save"></i> Save Grade
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

export default Grades;
