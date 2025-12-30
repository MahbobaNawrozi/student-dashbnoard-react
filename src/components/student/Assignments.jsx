import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ADD THIS IMPORT
import "./styles.css";
export default function Assignments() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      title: "Math 101 - Homework 1",
      desc: "Solve 10 algebra problems and submit solutions as PDF. Show all your work step by step.",
      due: "2025-10-25",
      submitted: false,
      feedback: null,
    },
    {
      title: "Physics 201 - Lab Report",
      desc: "Complete mechanics lab experiment and submit detailed report with observations and calculations.",
      due: "2025-10-28",
      submitted: false,
      feedback: null,
    },
    {
      title: "Programming 101 - Project 1",
      desc: "Create a Python program that manages a todo list with add, remove, and view functionality.",
      due: "2025-11-02",
      submitted: true,
      feedback: "Great job! Excellent code structure. 9/10 points.",
    },
    {
      title: "History 102 - Essay Assignment",
      desc: "Write a 1000-word essay on the causes of World War I with proper citations.",
      due: "2025-11-05",
      submitted: false,
      feedback: null,
    },
    {
      title: "Chemistry 101 - Lab Analysis",
      desc: "Analyze the chemical reactions from last week's experiment and submit your findings.",
      due: "2025-11-08",
      submitted: true,
      feedback: "Good analysis but missing conclusion section. 7/10 points.",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    const closer = (e) => {
      if (window.innerWidth <= 992) {
        if (
          !e.target.closest("#sidebar") &&
          !e.target.closest("#mobileMenuToggle")
        )
          setSidebarOpen(false);
      }
    };
    document.addEventListener("click", closer);
    return () => document.removeEventListener("click", closer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ADD THIS MISSING FUNCTION
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  const [expanded, setExpanded] = useState({});
  const toggleExpand = (index) =>
    setExpanded((p) => ({ ...p, [index]: !p[index] }));

  const openModal = (index) => {
    setCurrent(index);
    setFile(null);
    setLink("");
    setModal(true);
  };
  const closeModal = () => setModal(false);

  const submitAssignment = () => {
    if (!file && !link.trim())
      return alert("Please upload a file or enter a link to submit!");
    const updated = [...assignments];
    updated[current].submitted = true;
    updated[
      current
    ].feedback = `Submitted successfully on ${new Date().toLocaleDateString()}. ${
      file ? "File uploaded: " + file.name + " " : ""
    }${link.trim() ? "Link provided: " + link.trim() : ""}`;
    setAssignments(updated);
    closeModal();
  };

  return (
    <>
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>

      <aside
        id="sidebar"
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>{sidebarCollapsed ? "" : "E-Learn"}</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li>
              <Link to="/StudentDashboard" onClick={handleMenuClick}>
                <i className="fas fa-tachometer-alt" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/All-Courses" onClick={handleMenuClick}>
                <i className="fas fa-layer-group" />
                <span>All Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/My-Course" onClick={handleMenuClick}>
                <i className="fas fa-book" />
                <span>My Courses</span>
              </Link>
            </li>
            <li className="active">
              <Link to="/Assignments" onClick={handleMenuClick}>
                <i className="fas fa-tasks" />
                <span>Assignments</span>
              </Link>
            </li>
            <li>
              <Link to="/Grades" onClick={handleMenuClick}>
                <i className="fas fa-graduation-cap" />
                <span>Grades</span>
              </Link>
            </li>
            <li>
              <Link to="/Certificates" onClick={handleMenuClick}>
                <i className="fas fa-certificate" />
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer" />
            <li>
              <Link to="/Setting" onClick={handleMenuClick}>
                <i className="fas fa-cog" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleMenuClick}>
                <i className="fas fa-sign-out-alt" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div
              id="desktopMenuToggle"
              className="icon d-none d-lg-flex"
              onClick={() => setSidebarCollapsed((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div className="welcome">
              <h2>Assignments</h2>
              <p className="d-none d-md-block">
                View and submit your course assignments
              </p>
            </div>
          </div>

          <div className="user-area">
            <a href="#" className="icon position-relative">
              <i className="fas fa-bell" />
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope" />
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt" />
            </a>
            <a href="#">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </a>
          </div>
        </header>

        <section className="assignments-section">
          {assignments.map((a, i) => (
            <div className="assignment-item" key={i}>
              <div
                className="assignment-header"
                onClick={() => toggleExpand(i)}
              >
                <span className="assignment-title">{a.title}</span>
                <i
                  className="fas fa-chevron-down"
                  style={{
                    transform: expanded[i] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform .3s",
                  }}
                />
              </div>

              <div
                className="assignment-content"
                style={{ display: expanded[i] ? "flex" : "none" }}
              >
                <p>{a.desc}</p>
                <div className="assignment-info">
                  <span>
                    <i className="fas fa-calendar-alt" /> Due: {a.due}
                  </span>
                  <span
                    className={
                      a.submitted ? "status-submitted" : "status-pending"
                    }
                  >
                    Status: {a.submitted ? "Submitted" : "Pending"}
                  </span>
                </div>
                {a.feedback && (
                  <div className="feedback">
                    <i className="fas fa-comment-dots" /> Feedback: {a.feedback}
                  </div>
                )}
                <button onClick={() => openModal(i)}>
                  {a.submitted ? "View Submission" : "Submit Assignment"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
      {modal && (
        <div className="modal" style={{ display: "flex" }} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h3>{assignments[current]?.title}</h3>
            <p>{assignments[current]?.desc}</p>
            <p>
              <strong>Due Date:</strong>{" "}
              <span>{assignments[current]?.due}</span>
            </p>
            {assignments[current]?.feedback && (
              <div style={{ marginTop: "10px", color: "#388e3c" }}>
                {assignments[current].feedback}
              </div>
            )}

            <label>Upload File (optional):</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <label style={{ marginTop: "10px" }}>
              Or Submit a Link (optional):
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <button
              className="submit-btn"
              onClick={submitAssignment}
              disabled={assignments[current]?.submitted}
            >
              {assignments[current]?.submitted
                ? "Already Submitted"
                : "Submit Assignment"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
