import React, { useState, useEffect } from "react";
import "./styles.css";
const Assignments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Essay on Climate Change",
      course: "English",
      due: "2025-11-05",
      assigned: "All Students",
      status: "Pending",
    },
    {
      id: 2,
      title: "Lab Report #3: Photosynthesis",
      course: "Science",
      due: "2025-11-10",
      assigned: "Group A",
      status: "Ongoing",
    },
    {
      id: 3,
      title: "World War II Historical Analysis",
      course: "History",
      due: "2025-11-12",
      assigned: "All Students",
      status: "Completed",
    },
    {
      id: 4,
      title: "Algebra Quiz: Quadratic Equations",
      course: "Mathematics",
      due: "2025-10-28",
      assigned: "Group B",
      status: "Overdue",
    },
    {
      id: 5,
      title: "Chemical Reactions Lab",
      course: "Chemistry",
      due: "2025-11-15",
      assigned: "All Students",
      status: "Pending",
    },
    {
      id: 6,
      title: "Physics Project: Newton's Laws",
      course: "Physics",
      due: "2025-11-20",
      assigned: "Advanced Group",
      status: "Ongoing",
    },
    {
      id: 7,
      title: "Biology Research Paper",
      course: "Biology",
      due: "2025-11-08",
      assigned: "All Students",
      status: "Completed",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    due: "",
    assigned: "All Students",
    description: "",
  });

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
      case "Pending":
        return "status-pending";
      case "Ongoing":
        return "status-ongoing";
      case "Completed":
        return "status-completed";
      case "Overdue":
        return "status-overdue";
      default:
        return "";
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    return (
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const calculateStats = () => {
    const total = assignments.length;
    const pending = assignments.filter((a) => a.status === "Pending").length;
    const completed = assignments.filter(
      (a) => a.status === "Completed"
    ).length;
    const overdue = assignments.filter((a) => a.status === "Overdue").length;
    return { total, pending, completed, overdue };
  };

  const { total, pending, completed, overdue } = calculateStats();

  const getTimelineAssignments = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return assignments
      .filter((assignment) => {
        const dueDate = new Date(assignment.due);
        return dueDate >= today && dueDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.due) - new Date(b.due));
  };

  const getTimelineClass = (assignment) => {
    const today = new Date().toISOString().split("T")[0];
    if (assignment.status === "Overdue") return "overdue";
    if (assignment.due === today) return "today";
    return "upcoming";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimelineDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      course: "",
      due: "",
      assigned: "All Students",
      description: "",
    });
    setIsEditing(false);
    setShowModal(true);

    // Set default due date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData((prev) => ({
      ...prev,
      due: tomorrow.toISOString().split("T")[0],
    }));
  };

  const handleEdit = (id) => {
    const assignment = assignments.find((a) => a.id === id);
    setFormData({
      title: assignment.title,
      course: assignment.course,
      due: assignment.due,
      assigned: assignment.assigned,
      description: assignment.description || "",
    });
    setEditingId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  const handleView = (id) => {
    const assignment = assignments.find((a) => a.id === id);
    alert(
      `Viewing: ${assignment.title}\nCourse: ${
        assignment.course
      }\nDue: ${formatDate(assignment.due)}\nStatus: ${assignment.status}`
    );
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.course ||
      !formData.due ||
      !formData.assigned
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Determine status based on due date
    const today = new Date().toISOString().split("T")[0];
    const status = formData.due < today ? "Overdue" : "Pending";

    if (isEditing) {
      setAssignments(
        assignments.map((a) =>
          a.id === editingId ? { ...a, ...formData, status } : a
        )
      );
    } else {
      const newAssignment = {
        id:
          assignments.length > 0
            ? Math.max(...assignments.map((a) => a.id)) + 1
            : 1,
        ...formData,
        status,
      };
      setAssignments([newAssignment, ...assignments]);
    }

    setShowModal(false);
    setFormData({
      title: "",
      course: "",
      due: "",
      assigned: "All Students",
      description: "",
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      course: "",
      due: "",
      assigned: "All Students",
      description: "",
    });
    setIsEditing(false);
    setEditingId(null);
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
              <h2>Assignments Management</h2>
              <p className="d-none d-md-block">
                Create, manage, and track all assignments
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

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Assignments</h3>
            <p>{total}</p>
            <div
              className="stat-trend"
              style={{ color: "#64748b", fontSize: "14px" }}
            >
              Active assignments
            </div>
          </div>
          <div className="stat-card">
            <h3>Pending Review</h3>
            <p>{pending}</p>
            <div
              className="stat-trend"
              style={{ color: "#f59e0b", fontSize: "14px" }}
            >
              Needs grading
            </div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completed}</p>
            <div
              className="stat-trend"
              style={{ color: "#10b981", fontSize: "14px" }}
            >
              Graded & returned
            </div>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p>{overdue}</p>
            <div
              className="stat-trend"
              style={{ color: "#ef4444", fontSize: "14px" }}
            >
              Past deadline
            </div>
          </div>
        </div>

        {/* Search and Add Bar */}
        <div className="search-add-bar">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="search-input"
              id="searchInput"
              placeholder="Search assignments by title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="add-btn"
            id="addAssignmentBtn"
            onClick={handleAddNew}
          >
            <i className="fas fa-plus"></i> Add New Assignment
          </button>
        </div>

        {/* Assignments Table Section */}
        <div className="assignments-section">
          <div className="section-header">
            <h2>All Assignments</h2>
          </div>
          <div className="table-responsive">
            <table className="assignments-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="assignmentTable">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td data-label="Title">{assignment.title}</td>
                    <td data-label="Course">{assignment.course}</td>
                    <td data-label="Due Date">{formatDate(assignment.due)}</td>
                    <td data-label="Assigned To">{assignment.assigned}</td>
                    <td data-label="Status">
                      <span
                        className={`status-badge ${getStatusClass(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleView(assignment.id)}
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEdit(assignment.id)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(assignment.id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h3>Upcoming Deadlines</h3>
          <div className="timeline-items" id="timelineList">
            {getTimelineAssignments().map((assignment) => (
              <div
                key={assignment.id}
                className={`timeline-item ${getTimelineClass(assignment)}`}
              >
                <div className="timeline-info">
                  <h4>{assignment.title}</h4>
                  <p>
                    {assignment.course} • {assignment.assigned}
                  </p>
                </div>
                <div className="timeline-date">
                  {formatTimelineDate(assignment.due)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add/Edit Assignment Modal */}
      {showModal && (
        <div className="modal" id="assignmentModal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditing ? "Edit Assignment" : "Create New Assignment"}</h2>
              <button
                className="close-btn"
                id="closeModal"
                onClick={handleModalClose}
              >
                &times;
              </button>
            </div>
            <div className="form-group">
              <label>Assignment Title</label>
              <input
                type="text"
                id="titleInput"
                placeholder="Enter assignment title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Course</label>
              <select
                id="courseSelect"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Select a course</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                id="dueDate"
                value={formData.due}
                onChange={(e) =>
                  setFormData({ ...formData, due: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Assign To</label>
              <select
                id="assignTo"
                value={formData.assigned}
                onChange={(e) =>
                  setFormData({ ...formData, assigned: e.target.value })
                }
              >
                <option value="All Students">All Students</option>
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
                <option value="Advanced Group">Advanced Group</option>
                <option value="Beginner Group">Beginner Group</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="description"
                placeholder="Provide assignment details, instructions, and requirements..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <button
              className="save-btn"
              id="saveAssignment"
              onClick={handleSave}
            >
              <i className="fas fa-save"></i>{" "}
              {isEditing ? "Update Assignment" : "Save Assignment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
