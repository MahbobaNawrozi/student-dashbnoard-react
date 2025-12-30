import React, { useState, useEffect } from "react";
import "./styles.css";
const AllStudents = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      course: "Mathematics",
      grade: 89,
      attendance: 95,
    },
    {
      id: 2,
      name: "Brian Carter",
      course: "Physics",
      grade: 92,
      attendance: 97,
    },
    { id: 3, name: "Sophie Lee", course: "History", grade: 76, attendance: 85 },
    { id: 4, name: "David Kim", course: "Biology", grade: 88, attendance: 90 },
    {
      id: 5,
      name: "Emma Watson",
      course: "Chemistry",
      grade: 95,
      attendance: 99,
    },
    {
      id: 6,
      name: "Michael Brown",
      course: "Mathematics",
      grade: 82,
      attendance: 92,
    },
    {
      id: 7,
      name: "Sarah Wilson",
      course: "Physics",
      grade: 78,
      attendance: 88,
    },
    {
      id: 8,
      name: "James Taylor",
      course: "History",
      grade: 91,
      attendance: 94,
    },
    {
      id: 9,
      name: "Olivia Davis",
      course: "Biology",
      grade: 84,
      attendance: 89,
    },
    {
      id: 10,
      name: "Robert Miller",
      course: "Chemistry",
      grade: 73,
      attendance: 82,
    },
  ]);
  const [requests, setRequests] = useState([
    { name: "Liam Brown", course: "Mathematics" },
    { name: "Olivia Wilson", course: "Physics" },
    { name: "Noah Davis", course: "Chemistry" },
    { name: "Ava Martinez", course: "Biology" },
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const courses = [
    "all",
    "Mathematics",
    "Physics",
    "History",
    "Biology",
    "Chemistry",
  ];

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

  const getGradeClass = (grade) => {
    if (grade >= 90) return "grade-a";
    if (grade >= 80) return "grade-b";
    return "grade-c";
  };

  const getAttendanceClass = (attendance) => {
    if (attendance >= 95) return "attendance-high";
    if (attendance >= 85) return "attendance-medium";
    return "attendance-low";
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const calculateStats = () => {
    const total = filteredStudents.length;
    const avgAtt =
      total > 0
        ? filteredStudents.reduce(
            (sum, student) => sum + student.attendance,
            0
          ) / total
        : 0;
    const top =
      total > 0
        ? filteredStudents.reduce((a, b) => (a.grade > b.grade ? a : b))
        : null;
    const low =
      total > 0
        ? filteredStudents.reduce((a, b) => (a.grade < b.grade ? a : b))
        : null;

    return { total, avgAtt, top, low };
  };

  const { total, avgAtt, top, low } = calculateStats();

  const confirmRequest = (index) => {
    const request = requests[index];
    const newId =
      students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

    const newStudent = {
      id: newId,
      name: request.name,
      course: request.course,
      grade: Math.floor(Math.random() * 21) + 75,
      attendance: Math.floor(Math.random() * 16) + 80,
    };

    setStudents([...students, newStudent]);
    setRequests(requests.filter((_, i) => i !== index));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const rejectRequest = (index) => {
    if (window.confirm("Are you sure you want to reject this join request?")) {
      setRequests(requests.filter((_, i) => i !== index));
    }
  };

  const editStudent = (id) => {
    const student = students.find((s) => s.id === id);
    alert(
      `Edit student: ${student.name}\n\nThis would open an edit form for student ID: ${id}`
    );
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const viewStudent = (id) => {
    const student = students.find((s) => s.id === id);
    alert(
      `Student Details:\n\nID: ${student.id}\nName: ${student.name}\nCourse: ${student.course}\nGrade: ${student.grade}%\nAttendance: ${student.attendance}%`
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
                <a href="all-courses.html">All Courses</a>
                <a href="myCourses.html">My Courses</a>
              </div>
            </li>
            <li className="has-submenu open">
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
        {/* Topbar */}
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
              <h2>All Students Dashboard</h2>
              <p className="d-none d-md-block">
                Manage and monitor student performance
              </p>
            </div>
          </div>
          <div className="user-area">
            <a href="teacher.profile.html">
              <img src="https://i.pravatar.cc/100?img=8" alt="Teacher" />
            </a>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p id="totalStudents">{total}</p>
            <div
              className="stat-trend"
              style={{ color: "#64748b", fontSize: "14px" }}
            >
              Across all courses
            </div>
          </div>
          <div className="stat-card">
            <h3>Average Attendance</h3>
            <p id="avgAttendance">{avgAtt.toFixed(1)}%</p>
            <div
              className="stat-trend"
              style={{ color: "#64748b", fontSize: "14px" }}
            >
              Monthly average
            </div>
          </div>
          <div className="stat-card">
            <h3>Top Performer</h3>
            <p id="topPerformer">{top ? top.name : "-"}</p>
            <div
              className="stat-trend"
              style={{ color: "#10b981", fontSize: "14px" }}
            >
              Highest grade
            </div>
          </div>
          <div className="stat-card">
            <h3>Low Performer</h3>
            <p id="lowPerformer">{low ? low.name : "-"}</p>
            <div
              className="stat-trend"
              style={{ color: "#f59e0b", fontSize: "14px" }}
            >
              Needs attention
            </div>
          </div>
        </div>

        {/* Join Requests Button */}
        <button
          className="requests-btn"
          id="openRequestsModal"
          onClick={() => setShowRequestsModal(true)}
        >
          <i className="fas fa-user-clock"></i> View Join Requests
          <span
            className="badge"
            id="requestsCount"
            style={{
              background: "#ef4444",
              color: "white",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "12px",
              marginLeft: "5px",
              display: requests.length > 0 ? "inline-block" : "none",
            }}
          >
            {requests.length}
          </span>
        </button>

        {/* Students Table Section */}
        <div className="students-section">
          <div className="section-header">
            <h2>Student List</h2>
            <div className="search-filter">
              <input
                type="text"
                className="search-input"
                id="searchInput"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                id="courseFilter"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="History">History</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Attendance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="studentTable">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#64748b",
                      }}
                    >
                      <i
                        className="fas fa-user-slash"
                        style={{
                          fontSize: "24px",
                          marginBottom: "10px",
                          display: "block",
                        }}
                      ></i>
                      No students found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id.toString().padStart(3, "0")}</td>
                      <td>
                        <strong>{student.name}</strong>
                      </td>
                      <td>{student.course}</td>
                      <td>
                        <span
                          className={`grade-badge ${getGradeClass(
                            student.grade
                          )}`}
                        >
                          {student.grade}%
                        </span>
                      </td>
                      <td>
                        <span
                          className={`attendance-badge ${getAttendanceClass(
                            student.attendance
                          )}`}
                        >
                          {student.attendance}%
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit"
                            title="Edit student"
                            onClick={() => editStudent(student.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete"
                            title="Delete student"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button
                            className="action-btn view"
                            title="View details"
                            onClick={() => viewStudent(student.id)}
                            style={{ background: "#e0e7ff", color: "#3730a3" }}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Join Requests Modal */}
      {showRequestsModal && (
        <div className="modal" id="requestsModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Pending Student Join Requests</h3>
              <button
                className="close-btn"
                id="closeRequests"
                onClick={() => setShowRequestsModal(false)}
              >
                &times;
              </button>
            </div>
            <div id="requestsList" className="request-cards">
              {requests.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#64748b",
                  }}
                >
                  <i
                    className="fas fa-check-circle"
                    style={{
                      fontSize: "32px",
                      color: "#10b981",
                      marginBottom: "10px",
                      display: "block",
                    }}
                  ></i>
                  <p>No pending join requests</p>
                </div>
              ) : (
                requests.map((request, index) => (
                  <div key={index} className="request-card">
                    <div className="request-info">
                      <h4>{request.name}</h4>
                      <p>
                        Requested Course: <strong>{request.course}</strong>
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginTop: "5px",
                        }}
                      >
                        <i className="fas fa-clock"></i> Requested 2 days ago
                      </p>
                    </div>
                    <div className="request-actions">
                      <button
                        className="btn-confirm"
                        onClick={() => confirmRequest(index)}
                      >
                        <i className="fas fa-check"></i> Confirm
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => rejectRequest(index)}
                      >
                        <i className="fas fa-times"></i> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {showSuccessMessage && (
              <div
                className="success-message"
                id="successMsg"
                style={{ display: "flex" }}
              >
                <i className="fas fa-check-circle"></i> Student confirmed and
                added successfully!
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                className="btn-confirm"
                style={{ maxWidth: "200px" }}
                onClick={() => setShowRequestsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
