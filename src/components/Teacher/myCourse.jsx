import React, { useState, useEffect } from "react";
import "./styles.css";
const MyCourses = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Algebra II",
      subject: "Mathematics",
      students: 34,
      img: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=300&fit=crop",
      desc: "Deep dive into advanced algebra concepts including quadratic equations, polynomials, and functions.",
      approved: true,
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      subject: "Science",
      students: 28,
      img: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=600&h=300&fit=crop",
      desc: "Explore motion, energy, and matter through hands-on experiments and theoretical concepts.",
      approved: true,
    },
    {
      id: 3,
      title: "Creative Writing",
      subject: "English",
      students: 22,
      img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=300&fit=crop",
      desc: "Develop storytelling skills and creative expression through various writing exercises.",
      approved: false,
    },
    {
      id: 4,
      title: "Introduction to Programming",
      subject: "Computer Science",
      students: 45,
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      desc: "Learn the basics of programming with Python and fundamental computer science concepts.",
      approved: true,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    img: "",
    desc: "",
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
    switch (status.toLowerCase()) {
      case "ongoing":
        return "ongoing";
      case "pending":
        return "pending";
      case "completed":
        return "completed";
      default:
        return "";
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setFormData({
      title: "",
      subject: "",
      img: "",
      desc: "",
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      subject: "",
      img: "",
      desc: "",
    });
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveCourse = () => {
    const { title, subject, img, desc } = formData;

    if (!title.trim() || !subject.trim()) {
      alert("Please fill in all required fields (Course Title and Subject).");
      return;
    }

    const newCourse = {
      id: courses.length + 1,
      title: title.trim(),
      subject: subject.trim(),
      img:
        img.trim() ||
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=300&fit=crop",
      desc: desc.trim(),
      students: 0,
      approved: false,
    };

    setCourses((prev) => [...prev, newCourse]);
    handleModalClose();
    alert(
      `"${title}" has been submitted for manager approval. You'll be notified once it's approved.`
    );
  };

  const handleViewCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      alert(
        `Viewing Course: ${course.title}\nSubject: ${course.subject}\nStudents: ${course.students}\n\n${course.desc}`
      );
    }
  };

  const handleApproveSim = (index) => {
    const courseToUpdate = courses[index];
    if (!courseToUpdate.approved) {
      const updatedCourses = [...courses];
      updatedCourses[index] = {
        ...courseToUpdate,
        approved: true,
        students: Math.floor(Math.random() * 30) + 10, // Add random students
      };
      setCourses(updatedCourses);
      alert(`Course "${courseToUpdate.title}" has been approved!`);
    }
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
              <h2>My Courses</h2>
              <p className="d-none d-md-block">
                Manage and create your teaching courses
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

        {/* Search and Add Bar */}
        <div className="search-add-bar">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="search-input"
              id="searchCourse"
              placeholder="Search courses by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="add-btn"
            id="addCourseBtn"
            onClick={handleOpenModal}
          >
            <i className="fas fa-plus"></i> Add New Course
          </button>
        </div>

        {/* Course Grid */}
        <section className="courses-grid" id="courseGrid">
          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-book-open"></i>
              <h3>No Courses Found</h3>
              <p>
                No courses match your search criteria. Try a different search
                term.
              </p>
            </div>
          ) : (
            filteredCourses.map((course, index) => {
              const placeholderImg =
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=300&fit=crop";

              return (
                <div key={course.id} className="course-card">
                  {!course.approved && (
                    <div className="pending-banner">
                      <i className="fas fa-clock"></i>
                      <span>Pending manager approval</span>
                    </div>
                  )}

                  <div
                    className="course-img"
                    style={{
                      backgroundImage: `url('${course.img || placeholderImg}')`,
                    }}
                  ></div>

                  <div className="course-body">
                    <h3>{course.title}</h3>
                    <p>{course.desc}</p>
                    <p>
                      <strong>Subject:</strong> {course.subject}
                    </p>
                  </div>

                  <div className="course-footer">
                    <span className="students-count">
                      <i className="fas fa-user-graduate"></i>
                      {course.students} student
                      {course.students !== 1 ? "s" : ""}
                    </span>

                    {!course.approved ? (
                      <button
                        className="view-btn"
                        style={{ cursor: "not-allowed" }}
                        disabled
                      >
                        <i className="fas fa-clock"></i> Awaiting Approval
                      </button>
                    ) : (
                      <button
                        className="view-btn"
                        onClick={() => handleViewCourse(course.id)}
                      >
                        <i className="fas fa-eye"></i> View Course
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Add Course Modal */}
        {showModal && (
          <div className="modal" id="courseModal" style={{ display: "flex" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Course</h2>
                <button
                  className="close-btn"
                  id="closeModal"
                  onClick={handleModalClose}
                >
                  &times;
                </button>
              </div>
              <div className="form-group">
                <label>Course Title *</label>
                <input
                  type="text"
                  id="courseTitle"
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  id="courseSubject"
                  placeholder="e.g., Mathematics, Science, English"
                  value={formData.subject}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  id="courseImg"
                  placeholder="Optional - Add course image URL"
                  value={formData.img}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  id="courseDesc"
                  rows="4"
                  placeholder="Brief description of the course..."
                  value={formData.desc}
                  onChange={handleFormChange}
                />
              </div>
              <button
                className="submit-btn"
                id="saveCourse"
                onClick={handleSaveCourse}
              >
                <i className="fas fa-paper-plane"></i> Submit for Manager
                Approval
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
